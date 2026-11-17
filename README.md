# trade-commons.github.io

The Global Trade Commons organisation site, and the component catalogue it is built from.

Published at <https://trade-commons.github.io> by GitHub Pages from the `main` branch.

## Why this repository is the first one

Components live across four homes: a standards body's own infrastructure, this organisation, a
community's own infrastructure, and a vendor's own repositories. A hand-maintained page of links
across four homes is wrong within a month, so the site builds its navigation from a catalogue file
instead. That makes this repository a registry with a website attached rather than a website on its
own.

Adding a component is a pull request against `content/catalogue.yaml`, which is a light governance
gate in the right place: the entry is where somebody states who is accountable when the component
breaks, which is why `maintainer` is required and has no default. The Zod schema in
`src/content.config.ts` is what enforces it, and the build fails on an entry that does not satisfy
it.

## Layout

```
content/
  catalogue.yaml          one entry per component, wherever it lives
  blocks/*.md             page prose, kept as Markdown so translation stays prose
src/
  content.config.ts       the catalogue schema; the governance gate
  config.ts               site-wide strings and per-page titles
  layouts/                Layout, Header, Footer
  components/             Hero, Section, Heading, Button, CatalogueList, Icon
  pages/                  one file per route
  styles/                 global.scss (design tokens), mixins.scss
public/                   favicon and anything served verbatim
```

Prose belongs in `content/blocks/`, not in a page component. A page component arranges content; it
does not hold it. That is what keeps the site editable by someone who does not write Astro, and what
makes a translation a file copy rather than a code change.

## Running it

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run check      # astro check
npm run format     # prettier
```

Node 22.23.4 or later, which is what Astro 7 requires.

This site is on Astro 7 while the UNTP sector sites it is modelled on are still on Astro 6. One
consequence is visible in `astro.config.mjs`: Astro 7 no longer leaks the tsconfig `@/` alias into the
Sass compiler, so `mixins.scss` is reached through an explicit `loadPaths` entry and imported as
`@use 'styles/mixins.scss'`. Astro 6 carries a critical advisory with no fix inside that major, which
is why the versions diverge.

## Adding a component to the catalogue

Append an entry to `content/catalogue.yaml` and open a pull request.

```yaml
- id: some-component            # stable slug, never reused
  name: Some Component
  summary: >-
    What it does, in a sentence or two. What it is for, not how it works.
  tier: service                 # library | service | application | tooling | template | register
  maturity: beta                # production | beta | prototype | planned | normative
  home:
    org: trade-commons          # where the code IS, not where it is expected to end up
    url: https://github.com/trade-commons/some-component
  standards:
    - UNTP
  licence: Apache-2.0
  maintainer: Who answers when it breaks
  operated: false               # true only where the Commons runs a hosted instance
  disposition: >-               # optional: a pending move, donation or graduation
    Offered as a contribution, not yet completed.
```

Two conventions worth keeping. `home` records where a component is today, because a catalogue that
records intentions is a roadmap and a roadmap is a commitment somebody has to honour. And nothing is
listed at maturity `planned` until there is a repository behind it.

## Internationalisation

`astro.config.mjs` configures i18n routing with one locale, `en`, and `prefixDefaultLocale: false`,
so English is served at the root and nothing is prefixed today. Adding a locale is three steps: add it
to `locales`, add `content/<locale>/blocks/` with the translated Markdown, and surface a switcher in
`Header.astro`. The switcher is not written yet because there is nothing to switch to.

Page prose lives in Markdown for this reason. A translator receives a file, not a string table.

## Licences

The site code is GPL-3.0, inherited by copying structure and components from the UNTP sector sites
(`untp-agrifood`, `untp-metals`, `untp-textiles`), which are GPL-3.0. Components in the rest of the
organisation are Apache-2.0, for the express patent grant that matters when competing vendors
contribute to shared infrastructure. The difference is deliberate rather than an oversight: nothing
imports a website, so the patent-grant reasoning that governs the component repositories does not
apply here.

Site prose in `content/` is CC BY 4.0.

## Outstanding

- No visual identity. The palette in `src/styles/global.scss` is a restrained placeholder, chosen to
  be unlike UNECE cyan and UN blue so the Commons does not read as a standards body's own site, and
  the header is a typographic lockup rather than a logo. Both are meant to be replaced.
- No contact address. `config.contactEmail` is empty, and the code of conduct and security policy
  both point at an address this site does not yet publish. That needs an address the foundation owns
  rather than an individual's.
- The forming notice in `src/config.ts` comes off once the charter is executed.
