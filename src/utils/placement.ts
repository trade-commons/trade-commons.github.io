/**
 * Which page is responsible for showing each tier.
 *
 * Two tiers are shown away from the component catalogue, each beside the thing that gives it
 * meaning. This map is the single statement of that, and the pages assert against it, because the
 * failure it exists to prevent has already happened once: test suites were filtered off the
 * Components page and silently appeared on no page at all.
 *
 * A tier missing from this map fails the build. A tier assigned to a page the page does not render
 * fails the build. Adding a tier therefore forces a decision about where it is seen.
 */
export const TIER_PAGE = {
  library: '/components',
  service: '/components',
  application: '/components',
  template: '/components',
  operations: '/components',
  tooling: '/conformance',
  organisation: '/governance',
} as const;

export type Placed = { id: string; data: { tier: string } };

/** Every entry must have a destination. */
export function assertAllTiersPlaced(entries: Placed[]) {
  const unplaced = entries.filter((entry) => !(entry.data.tier in TIER_PAGE));
  if (unplaced.length > 0) {
    const named = unplaced.map((e) => `${e.id} (${e.data.tier})`).join(', ');
    throw new Error(`placement: no page is responsible for ${named}. Add the tier to TIER_PAGE.`);
  }
}

/** Entries this page is responsible for, with a check that none were dropped on the way. */
export function entriesFor<T extends Placed>(entries: T[], page: string, shown: T[]) {
  const owed = entries.filter((entry) => TIER_PAGE[entry.data.tier as keyof typeof TIER_PAGE] === page);
  const have = new Set(shown.map((entry) => entry.id));
  const missing = owed.filter((entry) => !have.has(entry.id));
  if (missing.length > 0) {
    const named = missing.map((e) => `${e.id} (${e.data.tier})`).join(', ');
    throw new Error(`placement: ${page} is responsible for ${named} and does not show them.`);
  }
  return owed;
}
