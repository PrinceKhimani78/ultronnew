import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * The section label that opens the cream bands — two hyphens, then the label at
 * 16px.
 *
 * The prefix is two literal U+002D HYPHEN-MINUS characters, not a drawn rule.
 * It was a 1px-tall `<span>` with a background colour; the brief asks for real
 * typed characters, so no border, pseudo-element or SVG stands in for them.
 *
 * They sit in an `aria-hidden` span for one reason: they are decoration, and a
 * screen reader would otherwise announce them as punctuation before every
 * section label on the site. The characters are still ordinary text in the DOM
 * — `aria-hidden` hides them from assistive tech, it does not make them a
 * pseudo-element.
 *
 * Colour is inherited rather than set, so the hyphens can never drift from the
 * label they belong to.
 *
 * Distinct from `SectionHeading`'s `Eyebrow`, which is the uppercase treatment
 * the dark process band uses. Both appear in the design; this is not a second
 * opinion about the same element.
 */

/** Brand teal green (#035551). */
const BRAND = '#035551';

export function BandEyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        // `uppercase` is a design decision, not a content one — the comp sets
        // every band label in caps. Applying it here means the content files do
        // not have to agree with each other about casing, and they did not:
        // "SERVING GLOBAL CLIENTS" against "Get started".
        'flex items-center gap-2 text-[16px] leading-none font-normal uppercase',
        className,
      )}
      style={{ color: BRAND }}
    >
      <span aria-hidden="true" className="shrink-0">
        --
      </span>
      {children}
    </p>
  );
}
