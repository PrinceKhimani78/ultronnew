/**
 * Client testimonials.
 *
 * The array is intentionally EMPTY. It previously held invented quotes; those
 * have been removed rather than left in place with a warning, because
 * placeholder testimonials are the single most likely thing to reach production
 * unnoticed — they read as finished copy.
 *
 * The `Testimonials` section renders nothing while this array is empty, so the
 * page has no gap and no lorem band.
 *
 * TODO(client): supply real, permissioned client quotes. For each one capture:
 *   - the exact wording the client approved, in writing
 *   - the attribution they consented to (name, role, company — or role and
 *     sector only, if they prefer not to be named)
 *   - the date consent was given, for the engagement record
 *
 * TWO HARD RULES when this is populated:
 *
 * 1. No `Review` or `AggregateRating` JSON-LD may be added until the quotes are
 *    real AND collected through a documented process. Marking up invented or
 *    solicited-but-unverified reviews as structured data is a search-policy
 *    violation that risks a manual penalty against the entire domain — a far
 *    worse outcome than having no review markup at all. `lib/json-ld.ts`
 *    deliberately omits both node types.
 * 2. Do not invent attribution to make a real quote look more impressive. A
 *    genuine quote from "Founder, logistics business" is worth more than a
 *    fabricated one from a named company, and carries no legal exposure.
 */

export type Testimonial = {
  quote: string;
  /** Whatever attribution the client consented to. */
  attribution: string;
  location: string;
};

export const TESTIMONIALS_INTRO = {
  eyebrow: 'Client experience',
  heading: 'What clients say',
} as const;

export const TESTIMONIALS: readonly Testimonial[] = [];
