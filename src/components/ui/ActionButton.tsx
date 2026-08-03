import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * The site's call-to-action button.
 *
 * One component, two sources. The geometry is the comp's — a 44px lozenge with
 * the label at 18px/700 and a ringed arrow disc to its right, which is what
 * `/home-design-preview` draws in the hero band, the Who We Help header and the
 * contact band. The hover behaviour is the diagonal arrow swap already built for
 * the live hero, kept because it is the "reusable animated button" the brief
 * asks every CTA except the navbar to use.
 *
 * Two details are load-bearing and easy to lose:
 *
 *   - the 2px ring on the button and the 3px ring on the disc are INSET
 *     box-shadows, not borders. A border grows the box and breaks both the 44px
 *     height and the comp's 179/196px widths.
 *   - the disc is `overflow-hidden`, because the swap animation slides one arrow
 *     out through the top-right corner while its twin enters from bottom-left.
 *     Without the clip both arrows are visible outside the circle mid-transition.
 *
 * `motion-reduce` collapses the swap to a static arrow rather than to a jump:
 * the outgoing arrow keeps its opacity and the incoming twin is removed from the
 * box entirely, so nothing translates.
 */

/**
 * The comp's diagonal arrow: 15×15 inside a 20×20 ring, 3px stroke.
 *
 * Declared here rather than imported from the preview's `icons.tsx` — `ui/`
 * primitives may not reach into a page's component folder, and this is now the
 * shared definition rather than a preview-only one.
 */
function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

const BRAND = '#035551';
const CREAM = '#FDFBEE';

export type ActionButtonProps = {
  children: ReactNode;
  href: string;
  /** `solid` is the teal fill; `outline` is the cream fill with a teal ring. */
  variant?: 'solid' | 'outline';
  /** The comp uses a full pill everywhere except the contact CTA, which is 10px. */
  radius?: 'pill' | 'rounded';
  className?: string;
};

export function ActionButton({
  children,
  href,
  variant = 'solid',
  radius = 'pill',
  className,
}: ActionButtonProps) {
  const isSolid = variant === 'solid';
  const ringColor = isSolid ? '#ffffff' : BRAND;

  return (
    <a
      href={href}
      className={cn(
        'group inline-flex h-11 items-center gap-4 pr-5 pl-[27px]',
        'text-[18px] leading-none font-bold whitespace-nowrap',
        'ease-house transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#035551]',
        radius === 'pill' ? 'rounded-full' : 'rounded-[10px]',
        className,
      )}
      style={{
        backgroundColor: isSolid ? BRAND : CREAM,
        color: isSolid ? '#ffffff' : BRAND,
        boxShadow: isSolid
          ? `inset 0 0 0 2px ${BRAND}, 0 4px 9px 0 rgba(0,0,0,0.25)`
          : `inset 0 0 0 2px ${BRAND}, 0 4px 9px 0 rgba(0,0,0,0.2)`,
      }}
    >
      {children}
      <span
        aria-hidden="true"
        className="relative flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-full"
        style={{ boxShadow: `inset 0 0 0 3px ${ringColor}` }}
      >
        {/* Leaves through the top-right corner. */}
        <ArrowUpRightIcon className="ease-house h-[11px] w-[11px] transition-transform duration-300 group-hover:translate-x-full group-hover:-translate-y-full group-hover:opacity-0 motion-reduce:transform-none motion-reduce:group-hover:opacity-100" />
        {/* Arrives from the bottom-left. Removed outright under reduced motion. */}
        <ArrowUpRightIcon className="ease-house absolute h-[11px] w-[11px] -translate-x-full translate-y-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:hidden" />
      </span>
    </a>
  );
}
