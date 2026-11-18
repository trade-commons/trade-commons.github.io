import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * The component catalogue.
 *
 * Components live across four homes: a standards body's own infrastructure, this organisation, a
 * community's own infrastructure, and a vendor's own repositories. The catalogue spans all four, so
 * an entry frequently points somewhere other than `trade-commons`.
 *
 * This schema is the governance gate. Adding a component is a pull request against one file, and the
 * entry is where somebody states who is accountable, which is why `maintainer` is required and has
 * no default.
 */
const catalogue = defineCollection({
  loader: file('./content/catalogue.yaml'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    summary: z.string(),

    // The three tiers classify by what you do with the component, and the axis is scope.
    // A library is imported and runs in your process. A service is one capability, deployed and
    // operated, exposing a network API, and it composes into something larger. An application is
    // everything a role needs to do a job: it assembles services and libraries, or stands alone if
    // it needs nothing over the network, and it implements no protocol of its own.
    //
    // The test for the service and application boundary: could an organisation deploy this alone
    // and have the capability it set out to get? An identifier resolver alone is not a job. Being a
    // registrar is.
    tier: z.enum([
      'library',
      'service',
      'application',
      'tooling',
      'template',
      'organisation',
    ]),

    // `proposed` means it appears in the repository architecture and does not exist yet: no
    // repository, no code, nobody committed to building it. `planned` means a repository exists and
    // work has not started.
    maturity: z.enum(['production', 'beta', 'prototype', 'planned', 'proposed']),

    // Where the code actually lives today, not where it is expected to end up. Absent only for a
    // proposed component, which by definition has nowhere to point; the refinement below enforces
    // that, so a real component cannot be added without saying where it is.
    home: z
      .object({
        org: z.string(),
        url: z.url(),
      })
      .optional(),

    // Lets the site be read by standard: what exists for the WCO Data Model, what exists for UNTP,
    // and what exists whatever the standard.
    standards: z.array(z.string()).default([]),

    // How the capability is reached. A UI is a presentation of a component and never a separate
    // component, since anything a person can do through it should also be reachable over the API.
    interfaces: z.array(z.enum(['api', 'ui'])).default([]),

    // For an application, the catalogue entries it assembles. Empty where an application composes
    // nothing over the network, which is the offline-first case. This is also what makes the
    // no-protocol-code rule checkable: an application assembles, it does not implement.
    composedOf: z.array(z.string()).default([]),

    licence: z.string().optional(),

    // Who answers when it breaks. A real component nobody is accountable for should not be listed.
    // A proposed component has no maintainer yet, which is most of what makes it proposed.
    maintainer: z.string().optional(),

    // True only where the Commons runs a hosted instance. Hosting creates obligations about data
    // handling, jurisdiction and liability, so it is recorded explicitly rather than inferred.
    operated: z.boolean().default(false),

    // A pending move, donation or graduation, or for a proposed component the reasoning behind it.
    // Dated where a date exists, absent where none does, rather than implying a schedule that has
    // not been agreed.
    disposition: z.string().optional(),
  })
  .superRefine((entry, ctx) => {
    // Anything that is not proposed is claimed to exist, and a claim that something exists has to
    // say where it is and who answers for it.
    if (entry.maturity === 'proposed') return;

    if (!entry.home) {
      ctx.addIssue({
        code: 'custom',
        path: ['home'],
        message: `"${entry.id}" is not proposed, so it must record where it lives.`,
      });
    }

    if (!entry.maintainer) {
      ctx.addIssue({
        code: 'custom',
        path: ['maintainer'],
        message: `"${entry.id}" is not proposed, so it must name a maintainer.`,
      });
    }
  })
  .superRefine((entry, ctx) => {
    // Only an application assembles other entries. A service is one capability by definition.
    if (entry.composedOf.length > 0 && entry.tier !== 'application') {
      ctx.addIssue({
        code: 'custom',
        path: ['composedOf'],
        message: `"${entry.id}" is a ${entry.tier}, so it cannot be composed of other components.`,
      });
    }
  }),
});

/**
 * Registers the ecosystem relies on.
 *
 * Separate from the component catalogue because a register is not a component. These are UN/CEFACT
 * public goods with their legal and administrative home in the UNECE secretariat, they reside on
 * UNECE sites, and the Commons neither owns nor hosts any of them. Listing them in the same table as
 * things the Commons builds would imply a relationship that does not exist, which is why the
 * schema has no maintainer, no licence and no tier: none of those are the Commons' to state.
 */
const registers = defineCollection({
  loader: file('./content/registers.yaml'),
  schema: z
    .object({
      id: z.string(),
      name: z.string(),
      abbreviation: z.string().optional(),
      summary: z.string(),

      // What the registered thing is. The most common way to misread a register is to assume it
      // registers something other than what it does.
      registers: z.string(),

      // `operational` is published and resolvable; `proposed` is intended and does not exist.
      status: z.enum(['operational', 'proposed']),

      // Who governs it. Never the Commons.
      authority: z.string(),

      // The UNECE site the register resides on, named even for a proposed register because the
      // intended host is known before the register is.
      host: z.object({
        site: z.string(),
        url: z.url(),
      }),

      // The register itself. Absent while proposed, because there is nothing to link to.
      url: z.url().optional(),

      note: z.string().optional(),
    })
    .superRefine((entry, ctx) => {
      if (entry.status === 'operational' && !entry.url) {
        ctx.addIssue({
          code: 'custom',
          path: ['url'],
          message: `"${entry.id}" is operational, so it must link to the register itself.`,
        });
      }

      if (entry.status === 'proposed' && entry.url) {
        ctx.addIssue({
          code: 'custom',
          path: ['url'],
          message: `"${entry.id}" is proposed, so it cannot link to a register that does not exist.`,
        });
      }
    }),
});

/**
 * The normative specifications the Commons provides tooling for.
 *
 * Listed so a visitor can reach the specification itself in one click. Like the registers, none of
 * these belong to the Commons, which is why `authority` is required and there is no field for a
 * maintainer or a version: the owning body states both, on its own site.
 */
const specifications = defineCollection({
  loader: file('./content/specifications.yaml'),
  schema: z.object({
    id: z.string(),

    // A file-loaded collection comes back sorted by id, so the sequence has to be stated.
    order: z.number().int().positive(),

    name: z.string(),
    abbreviation: z.string(),
    summary: z.string(),
    authority: z.string(),
    url: z.url(),
    note: z.string().optional(),
  }),
});

/**
 * Who runs what, and who it serves.
 *
 * The catalogue is organised by what a component is. This collection is the same material organised
 * by the job somebody has, because an organisation arriving at the site knows its own role long
 * before it knows which component it needs. References into the catalogue and across roles are
 * checked at build time on the page, since a per-entry schema cannot see other entries.
 */
const roles = defineCollection({
  loader: file('./content/roles.yaml'),
  schema: z.object({
    id: z.string(),
    order: z.number().int().positive(),
    name: z.string(),
    summary: z.string(),

    // Catalogue entries this role deploys or uses.
    operates: z.array(z.string()).default([]),

    // Roles that consume what this one publishes or operates.
    serves: z.array(z.string()).default([]),

    // Business cases on the Value page that argue for this role adopting. A role that can see what
    // it would run and not why it would bother is half a page.
    value: z.array(z.string()).default([]),

    // The UN register this role is listed in, where there is one. Most roles are listed nowhere,
    // and the ones that are differ in which register takes them, which is the clearest expression
    // of how much authority each kind of registry actually carries.
    register: z.string().optional(),

    note: z.string().optional(),
  }),
});

/**
 * The sequence that ends in a register entry.
 *
 * The registers are the destination of this sequence and not a separate subject, so the two are
 * presented on one page. Component references are checked against the catalogue at build time.
 */
const journey = defineCollection({
  loader: file('./content/journey.yaml'),
  schema: z.object({
    id: z.string(),
    order: z.number().int().positive(),
    name: z.string(),
    summary: z.string(),

    // Catalogue entries that serve this step. Empty where the Commons supplies nothing for it,
    // which is worth showing rather than hiding.
    components: z.array(z.string()).default([]),
  }),
});

/**
 * The business case, as its owners state it.
 *
 * Deliberately no figures. UNTP and UNVTD maintain their own cases with their own methodology, and
 * UNVTD keeps every number in one place so published cases cannot drift from the evidence. An entry
 * here summarises the shape of an argument and links to the page that owns it, so there is nothing
 * to keep in step.
 */
const value = defineCollection({
  loader: file('./content/value.yaml'),
  schema: z.object({
    id: z.string(),
    order: z.number().int().positive(),
    suite: z.enum(['UNTP', 'UNVTD']),
    audience: z.string(),
    name: z.string(),
    summary: z.string(),
    url: z.url(),
  }),
});

export const collections = { catalogue, registers, specifications, roles, journey, value };
