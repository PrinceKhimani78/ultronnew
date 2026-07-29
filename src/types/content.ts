/**
 * Shapes shared between the content layer and the components that render it.
 *
 * These live here rather than in `content/` because `components/ui` primitives
 * need the type but must not import from `content/` — the ESLint boundary that
 * keeps primitives free of business meaning correctly rejects it, and a
 * type-only import would still couple the two directories.
 */

/**
 * One run of heading text, optionally emphasised.
 *
 * The design colours individual words in a heading. Storing the split as data
 * means no section hardcodes which word is emphasised, and a copy change cannot
 * silently move the emphasis onto the wrong word.
 *
 * Colour is decoration in every case: each heading must read identically in
 * monochrome, which is what keeps the treatment WCAG-safe.
 */
export type HeadingSegment = {
  text: string;
  accent?: boolean;
};
