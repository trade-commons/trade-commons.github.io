#!/usr/bin/env python3
"""Derive the site's brand assets from the masters in src/assets/brand-kit/.

Run this by hand after changing a master, and commit what it writes. It is not part of
`npm run build`, which only needs node; this needs Pillow:

    python3 -m pip install --user Pillow
    python3 scripts/build-brand.py

The masters are raster artwork that was composited on white and then given an alpha channel by
background removal. The alpha it came with is wrong: half the canvas sits at alpha 1 to 40 instead
of 0, which reads as a milky rectangle on any dark background, and every stroke carries a white
halo. So nothing here uses the supplied alpha. Each master is flattened back onto white and the
white is knocked out properly, which restores the colour under the matte as well as the edge.

Small sizes get an optical correction. The mark is five nodes over five overlapping arcs, and at
16px those strokes land below one pixel and turn to mush. Lifting the alpha curve thickens them
enough to read. At 48px and above the correction is off.
"""

import json
import sys
from pathlib import Path

try:
    import numpy as np
    from PIL import Image, ImageFilter
except ImportError:  # pragma: no cover
    sys.exit('This script needs Pillow and numpy: python3 -m pip install --user Pillow numpy')

ROOT = Path(__file__).resolve().parent.parent
KIT = ROOT / 'src' / 'assets' / 'brand-kit'
BRAND = ROOT / 'src' / 'assets' / 'brand'
PUBLIC = ROOT / 'public'

INK = (11, 37, 64)        # --color-brand-800, the wordmark ink
PAGE = (247, 249, 250)    # --color-gray-50


def unmatte(path: Path) -> Image.Image:
    """Flatten the master onto white, then knock the white back out with a real alpha."""
    src = Image.open(path).convert('RGBA')
    flat = Image.new('RGBA', src.size, (255, 255, 255, 255))
    flat.alpha_composite(src)

    c = np.asarray(flat.convert('RGB')).astype(np.float64)
    a = 1.0 - c.min(axis=2) / 255.0
    rgb = (c - (1.0 - a)[..., None] * 255.0) / np.maximum(a, 1e-6)[..., None]
    out = np.dstack([np.clip(rgb, 0, 255), np.clip(a * 255.0, 0, 255)]).astype(np.uint8)
    return Image.fromarray(out, 'RGBA')


def trim(im: Image.Image, threshold: int = 8) -> Image.Image:
    """Crop to the artwork, ignoring alpha too faint to see."""
    mask = im.getchannel('A').point(lambda v: 255 if v > threshold else 0)
    return im.crop(mask.getbbox())


def square(im: Image.Image, size: int, margin: float = 0.06) -> Image.Image:
    """Fit the artwork into a square canvas with even breathing room."""
    inner = round(size * (1 - 2 * margin))
    w, h = im.size
    scale = inner / max(w, h)
    fitted = im.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)
    canvas = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    canvas.paste(fitted, ((size - fitted.width) // 2, (size - fitted.height) // 2))
    return canvas


def monochrome(im: Image.Image, rgb: tuple[int, int, int]) -> Image.Image:
    """Repaint the artwork one flat colour, keeping its shape."""
    solid = Image.new('RGBA', im.size, (*rgb, 255))
    solid.putalpha(im.getchannel('A'))
    return solid


def downscale(im: Image.Image, size: int) -> Image.Image:
    """Shrink the mark, thickening the strokes where the size cannot carry them."""
    dilate, gain = {16: (5, 1.5), 32: (3, 1.25), 48: (3, 1.1)}.get(size, (0, 1.0))
    if dilate:
        thick = im.getchannel('A').filter(ImageFilter.MaxFilter(dilate))
        im = Image.merge('RGBA', (*im.split()[:3], thick))
    small = im.resize((size, size), Image.LANCZOS)
    if gain != 1.0:
        a = np.asarray(small.getchannel('A')).astype(np.float64) / 255.0
        lifted = np.clip(1.0 - (1.0 - a) ** gain, 0, 1)
        small = Image.merge(
            'RGBA', (*small.split()[:3], Image.fromarray((lifted * 255).astype(np.uint8)))
        )
    return small


def flatten(im: Image.Image, rgb: tuple[int, int, int]) -> Image.Image:
    bg = Image.new('RGBA', im.size, (*rgb, 255))
    bg.alpha_composite(im)
    return bg.convert('RGB')


def main() -> None:
    BRAND.mkdir(parents=True, exist_ok=True)
    written = []

    def save(im, path, **kw):
        im.save(path, **kw)
        written.append(path.relative_to(ROOT))

    icon = square(trim(unmatte(KIT / 'icon-transparent.png')), 512)
    save(icon, BRAND / 'icon.png')
    # The footer sits on brand-800, where the navy half of the mark all but disappears. A flat
    # white version keeps the shape legible without a white disc propping it up.
    save(monochrome(icon, (255, 255, 255)), BRAND / 'icon-light.png')

    lockup = trim(unmatte(KIT / 'logo-horizontal-transparent.png'))
    save(lockup, BRAND / 'logo-horizontal.png')

    save(downscale(icon, 16), PUBLIC / 'favicon-16.png')
    save(downscale(icon, 32), PUBLIC / 'favicon-32.png')
    save(icon.resize((192, 192), Image.LANCZOS), PUBLIC / 'icon-192.png')
    save(icon, PUBLIC / 'icon-512.png')

    # iOS ignores alpha and composites on black, so this one ships opaque and unrounded.
    save(flatten(square(trim(unmatte(KIT / 'icon-transparent.png')), 180, margin=0.10),
                 (255, 255, 255)), PUBLIC / 'apple-touch-icon.png')

    ico = PUBLIC / 'favicon.ico'
    downscale(icon, 48).save(ico, format='ICO',
                             sizes=[(16, 16), (32, 32), (48, 48)],
                             append_images=[downscale(icon, 16), downscale(icon, 32)])
    written.append(ico.relative_to(ROOT))

    # Social card: the lockup on the page background, over the ink band the site's footer uses.
    og = Image.new('RGBA', (1200, 630), (*PAGE, 255))
    band = 54
    og.paste(Image.new('RGBA', (1200, band), (*INK, 255)), (0, 630 - band))
    w = 880
    art = lockup.resize((w, round(lockup.height * w / lockup.width)), Image.LANCZOS)
    og.alpha_composite(art, ((1200 - w) // 2, (630 - band - art.height) // 2))
    save(og.convert('RGB'), PUBLIC / 'og-image.png')

    manifest = {
        'name': 'Global Trade Commons',
        'short_name': 'Trade Commons',
        'start_url': '/',
        'display': 'browser',
        'background_color': '#FFFFFF',
        'theme_color': '#0B2540',
        'icons': [
            {'src': '/icon-192.png', 'sizes': '192x192', 'type': 'image/png'},
            {'src': '/icon-512.png', 'sizes': '512x512', 'type': 'image/png'},
            {'src': '/apple-touch-icon.png', 'sizes': '180x180', 'type': 'image/png'},
        ],
    }
    (PUBLIC / 'site.webmanifest').write_text(json.dumps(manifest, indent=2) + '\n')
    written.append((PUBLIC / 'site.webmanifest').relative_to(ROOT))

    for path in written:
        print(f'  {path}')


if __name__ == '__main__':
    main()
