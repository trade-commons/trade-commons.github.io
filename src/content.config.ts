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

    // The three tiers, plus the kinds that are not components a person runs.
    // An application contains no protocol code; it calls a library or a service.
    tier: z.enum([
      'library',
      'service',
      'application',
      'tooling',
      'template',
      'operations',
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

export const collections = { catalogue, registers };
