// @ts-check
import { fileURLToPath } from 'node:url';

import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import autoprefixer from 'autoprefixer';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://trade-commons.github.io',
  trailingSlash: 'never',
  scopedStyleStrategy: 'where',

  // One locale today. Adding a second is this list plus a content folder, not a restructure:
  // set `locales: ['en', 'fr']`, add `content/fr/`, and surface the switcher in Header.astro.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  // /registers was published before the page became the Testing journey. Keep the old URL working.
  redirects: {
    '/registers': '/testing',
  },

  integrations: [sitemap()],

  fonts: [
    {
      name: 'Source Serif 4',
      cssVariable: '--font-serif',
      provider: fontProviders.google(),
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['latin'],
      optimizedFallbacks: false,
    },
    {
      name: 'Inter',
      cssVariable: '--font-sans',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      optimizedFallbacks: false,
    },
  ],

  vite: {
    css: {
      // Sass does not use Vite's resolve aliases, so `@use 'styles/mixins.scss'` needs src/ on the
      // load path. Astro 7 no longer leaks the tsconfig `@/` alias into the Sass compiler.
      preprocessorOptions: {
        scss: {
          loadPaths: [fileURLToPath(new URL('./src', import.meta.url))],
        },
      },
      postcss: {
        plugins: [autoprefixer({})],
      },
    },
    build: {
      cssCodeSplit: false,
    },
  },
});
