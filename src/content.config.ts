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

    // The three tiers plus the kinds that are not components a person runs.
    // An application contains no protocol code; it calls a library or a service.
    tier: z.enum(['library', 'service', 'application', 'tooling', 'template', 'register']),

    // `normative` marks a specification or register governed by a standards body. Such an entry is
    // listed so the catalogue is navigable, never because the Commons holds authority over it.
    maturity: z.enum(['production', 'beta', 'prototype', 'planned', 'normative']),

    home: z.object({
      // Where the code actually lives today, not where it is expected to end up.
      org: z.string(),
      url: z.url(),
    }),

    // Lets the site be read by standard: what exists for the WCO Data Model, what exists for UNTP,
    // and what exists whatever the standard.
    standards: z.array(z.string()).default([]),

    licence: z.string().optional(),

    // Who answers when it breaks. A component nobody is accountable for should not be listed.
    maintainer: z.string(),

    // True only where the Commons runs a hosted instance. Hosting creates obligations about data
    // handling, jurisdiction and liability, so it is recorded explicitly rather than inferred.
    operated: z.boolean().default(false),

    // A pending move, donation or graduation. Dated where a date exists, absent where none does,
    // rather than implying a schedule that has not been agreed.
    disposition: z.string().optional(),
  }),
});

export const collections = { catalogue };
