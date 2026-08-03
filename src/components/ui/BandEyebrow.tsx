import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * The section label that opens the cream bands — a short gold rule, then the
 * label at 16px.
 *
 * The comp draws this as a literal run of hyphens followed by two spaces
 * ("----  SERVING GLOBAL CLIENTS"). Reproduced as a drawn rule plus the label,
 * so the dashes are not read out as punctuation by a screen reader and the rule
 * scales with the type rather than depending on a glyph.
 *
 * Distinct from `SectionHeading`'s `Eyebrow`, which is the 12px uppercase
 * treatment the dark process band uses. Both appear in the design; this is not
 * a second opinion about the same element.
 */

/** Decorative gold. Never carries meaning on its own — it fails AA as text. */
const GOLD = '#C9B37E';

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
      style={{ color: GOLD }}
    >
      <span
        aria-hidden="true"
        className="inline-block h-px w-8 shrink-0"
        style={{ backgroundColor: GOLD }}
      />
      {children}
    </p>
  );
}
