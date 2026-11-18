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
  registers.yaml          one entry per register; none of them are ours
  specifications.yaml     the normative specifications this work supports
  roles.yaml              who runs what, and who it serves
  journey.yaml            the steps from built to listed in a register
  value.yaml              the UN/CEFACT business cases, linked and never restated
  blocks/*.md             page prose, kept as Markdown so translation stays prose
src/
  content.config.ts       the collection schemas; the governance gate
  utils/placement.ts      which page shows which tier; asserted at build time
scripts/check-links.mjs   every internal link resolves; runs as part of the build
  config.ts               site-wide strings and per-page titles
  layouts/                Layout, Header, Footer
  components/             Hero, Section, Heading, Button, CatalogueList, Icon
  pages/                  one file per route
  styles/                 global.scss (design tokens), mixins.scss
public/                   favicons, share card, anything served verbatim
src/assets/logo.png       the mark; Astro emits WebP at the sizes used
```

Prose belongs in `content/blocks/`, not in a page component. A page component arranges content; it
does not hold it. That is what keeps the site editable by someone who does not write Astro, and what
makes a translation a file copy rather than a code change.

## Running it

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/, then checks every internal link
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

The three tiers classify by what you do with a component, and the axis is scope. A **library** you
import; it runs in your process with nothing to deploy. A **service** is one capability: you deploy
and operate it, it exposes a network API, and it composes into something larger. An **application**
is everything a role needs to do a job; it assembles services and libraries through `composedOf`, or
stands alone where it needs nothing over the network, and it implements no protocol of its own.

The test for the service and application boundary is whether an organisation could deploy the thing
alone and have the capability it set out to get. An identifier resolver alone is not a job. Being a
registrar is. A user interface is recorded in `interfaces` and is never a separate component, since
anything a person can do through it should also be reachable over the API.

Two conventions worth keeping. `home` records where a component is today, because a catalogue that
records intentions is a roadmap and a roadmap is a commitment somebody has to honour. And a
`proposed` component carries no `home` and no `maintainer`, because it has neither; the schema
enforces the converse, so anything claiming to be more than proposed must say where it lives and who
answers for it.

## Adding a register

Registers are a separate collection, in `content/registers.yaml`, and they are deliberately not
components. Every one of them is a UN/CEFACT public good whose legal and administrative home is the
UNECE secretariat, residing on a UNECE site. The Commons neither owns nor hosts any of them, which is
why the schema has no `maintainer`, no `licence` and no `tier`: none of those are the Commons' to
state. Listing a register in the same table as things the Commons builds would imply a relationship
that does not exist.

```yaml
- id: some-register
  name: Some Register
  abbreviation: SR               # optional
  status: operational            # operational | proposed
  registers: >-                  # what the registered thing actually is
    The things this register registers.
  summary: >-
    What question it answers for a verifier.
  authority: UN/CEFACT, secretariat hosted by UNECE
  host:
    site: untp.unece.org         # the UNECE site it resides on
    url: https://untp.unece.org
  url: https://untp.unece.org/registers/sr   # the register itself; omitted when proposed
  note: >-                       # optional
    Anything a reader would otherwise misread.
```

An `operational` register must link to itself and a `proposed` one must not, because a link to a
register that does not exist is the most direct way to mislead a reader. The schema enforces both
directions.

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

- The palette predates the logo. `src/styles/global.scss` is petrol and ochre, chosen as a
  placeholder before there was a mark; the logo's accents are a bright blue globe with red, orange,
  pink and green. They coexist without clashing badly, but nobody picked them together.
- The mark softens below about 32px, because it carries a lot of line detail. A simplified variant
  for the 16px favicon would read better if one is ever drawn.
- The derived images in `public/` were generated from `src/assets/logo.png` with Pillow. Regenerate
  them if the mark changes; they are not built from source automatically.
- No contact address. `config.contactEmail` is empty, and the code of conduct and security policy
  both point at an address this site does not yet publish. That needs an address the foundation owns
  rather than an individual's.
- The forming notice in `src/config.ts` comes off once the charter is executed.
