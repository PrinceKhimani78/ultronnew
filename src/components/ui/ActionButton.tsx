import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

/**
 * The site's one call-to-action button.
 *
 * Every CTA on every page resolves here — hero, band headers, the contact form's
 * submit, the 404. The single exception is the header's "Book a call" pill,
 * which is chrome rather than a page action and keeps its own cream treatment.
 *
 * Geometry is the comp's: a full pill on brand teal, the label left, a 28px
 * white disc right, and 16px between them. Three details are load-bearing:
 *
 *   - **No border.** The ring this component used to carry has gone. The lift
 *     comes entirely from `0 10px 24px rgba(3,85,81,.22)`, so the box is exactly
 *     the padding plus the content and the 999px radius reads as a true pill.
 *   - **`justify-between`, not `gap` alone.** At intrinsic width the two are
 *     indistinguishable, but the moment a width is imposed — `fullWidth` on the
 *     form submit — `justify-between` is what pins the label left and the disc
 *     right instead of centring the pair. The brief is explicit that the icon
 *     must never move the text.
 *   - **The disc is `overflow-hidden`.** The arrow animation slides one glyph
 *     out through the top-right corner while its twin enters from bottom-left;
 *     without the clip both are briefly visible outside the circle.
 *
 * `motion-reduce` collapses the swap rather than jumping: the outgoing arrow
 * keeps its opacity and the incoming twin is removed from the box entirely, so
 * nothing translates for a visitor who asked for less movement.
 */

/** The comp's diagonal arrow, drawn inside the white disc. */
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

const BASE_SURFACE = [
  'group inline-flex items-center justify-between rounded-[999px] gap-3 sm:gap-4 border-0 whitespace-nowrap',
  'text-[15px] sm:text-[16px] lg:text-[17px] leading-none font-bold tracking-[0.02em] uppercase',
  'transition-[background-color,transform] duration-500 ease-[ease]',
  'active:scale-[0.98]',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DCCB8E]',
  'py-[14px] pr-[16px] pl-[20px] lg:pr-[18px] lg:pl-[24px]',
].join(' ');

const VARIANTS = {
  teal: 'border-0 bg-[#035551] text-white hover:bg-[#02443F] shadow-[0_10px_24px_rgba(3,85,81,0.22)]',
  cream:
    'border-2 border-[#035551] bg-[#FDFBEE] text-[#035551] hover:bg-[#F5F1D7] shadow-[0px_4px_9px_0px_rgba(0,0,0,0.20)]',
};

export type ActionButtonProps = {
  children: ReactNode;
  /** Renders an anchor. Omit for a `<button>` — the form submit's case. */
  href?: string;
  /**
   * Spans the container instead of hugging its label. Off by default: the brief
   * asks buttons to fit their content unless a layout explicitly needs the full
   * measure, which only the consultation form's submit does.
   */
  fullWidth?: boolean;
  type?: 'button' | 'submit';
  variant?: 'teal' | 'cream';
  className?: string;
};

function ButtonBody({
  children,
  variant = 'teal',
}: {
  children: ReactNode;
  variant?: 'teal' | 'cream';
}) {
  return (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={cn(
          'relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full',
          variant === 'cream'
            ? 'bg-[#035551] text-[#FDFBEE]'
            : 'bg-white text-[#035551]',
        )}
      >
        {/* Leaves through the top-right corner. */}
        <ArrowUpRightIcon className="h-[13px] w-[13px] transition-transform duration-300 ease-[ease] group-hover:translate-x-full group-hover:-translate-y-full group-hover:opacity-0 motion-reduce:transform-none motion-reduce:group-hover:opacity-100" />
        {/* Arrives from the bottom-left. Removed outright under reduced motion. */}
        <ArrowUpRightIcon className="absolute h-[13px] w-[13px] -translate-x-full translate-y-full opacity-0 transition-all duration-300 ease-[ease] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:hidden" />
      </span>
    </>
  );
}

export function ActionButton({
  children,
  href,
  fullWidth = false,
  type = 'button',
  variant = 'teal',
  className,
}: ActionButtonProps) {
  const classes = cn(
    BASE_SURFACE,
    VARIANTS[variant],
    fullWidth && 'w-full',
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        <ButtonBody variant={variant}>{children}</ButtonBody>
      </a>
    );
  }

  return (
    <button type={type} className={cn(classes, 'cursor-pointer')}>
      <ButtonBody variant={variant}>{children}</ButtonBody>
    </button>
  );
}
