import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { ArrowUpRightIcon } from './icons';

/**
 * Shared primitives for `/home-design-preview`.
 *
 * Every colour is written as a literal hex rather than a theme token. That is
 * deliberate: this page is a fidelity reference for one specific comp, and it
 * must keep showing that comp even if the site's tokens are retuned. It also
 * means the page cannot influence — or be influenced by — the live site's
 * palette, which is the style isolation the brief asks for.
 *
 * The comp is a fixed 1280px canvas with content inset 85px on both sides, so
 * the measure is 1110px — the exact width of its Who We Help grid. Everything
 * here is expressed as that measure plus responsive gutters, so the 1280px
 * rendering is dimensionally identical to the source while narrower viewports
 * reflow instead of scaling.
 */

export const DESIGN_INK = '#000000';
export const DESIGN_BRAND = '#035551';
export const DESIGN_CREAM = '#FDFBEE';
export const DESIGN_GOLD = '#C9B37E';
export const DESIGN_SAND = '#DCCB8E';
export const DESIGN_MUTED = '#5A5A5A';

type Segment = { readonly text: string; readonly tone: 'ink' | 'brand' };

export function DesignContainer({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[1110px] px-5 sm:px-8 lg:px-10 xl:px-0',
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * The comp draws its section labels as a literal run of hyphens followed by two
 * spaces — "----  SERVING GLOBAL CLIENTS". Reproduced as a drawn rule plus the
 * label, so the dashes cannot be read out as punctuation by a screen reader
 * and the rule scales with the type instead of depending on a glyph.
 */
export function DesignEyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 text-[16px] leading-none font-normal',
        className,
      )}
      style={{ color: DESIGN_GOLD }}
    >
      <span
        aria-hidden="true"
        className="inline-block h-px w-8 shrink-0"
        style={{ backgroundColor: DESIGN_GOLD }}
      />
      {children}
    </p>
  );
}

/** Two-tone heading. The comp colours individual words, not whole headings. */
export function DesignHeadingText({
  segments,
  brandColor = DESIGN_BRAND,
  inkColor = DESIGN_INK,
}: {
  segments: readonly Segment[];
  brandColor?: string;
  inkColor?: string;
}) {
  return (
    <>
      {segments.map((segment, index) => (
        <span
          key={index}
          style={{ color: segment.tone === 'brand' ? brandColor : inkColor }}
        >
          {segment.text}
        </span>
      ))}
    </>
  );
}

type DesignButtonProps = {
  children: ReactNode;
  href: string;
  /** `solid` is the teal fill; `outline` is the cream fill with a teal ring. */
  variant?: 'solid' | 'outline';
  /** The comp uses a full pill everywhere except the contact CTA, which is 10px. */
  radius?: 'pill' | 'rounded';
  className?: string;
};

/**
 * The comp's button: a 44px-high lozenge with the label at 18px/700 and a
 * ringed arrow disc to its right.
 *
 * The ring on both the button and the disc is an *inset* box-shadow, not a
 * border — a border would grow the box and break the 44px height and the
 * 179/196px widths the comp specifies.
 */
export function DesignButton({
  children,
  href,
  variant = 'solid',
  radius = 'pill',
  className,
}: DesignButtonProps) {
  const isSolid = variant === 'solid';

  return (
    <a
      href={href}
      className={cn(
        'group inline-flex h-11 items-center gap-4 pr-5 pl-[27px] text-[18px] leading-none font-bold whitespace-nowrap transition-opacity duration-200 hover:opacity-90',
        radius === 'pill' ? 'rounded-full' : 'rounded-[10px]',
        className,
      )}
      style={{
        backgroundColor: isSolid ? DESIGN_BRAND : DESIGN_CREAM,
        color: isSolid ? '#ffffff' : DESIGN_BRAND,
        boxShadow: isSolid
          ? `inset 0 0 0 2px ${DESIGN_BRAND}, 0 4px 9px 0 rgba(0,0,0,0.25)`
          : `inset 0 0 0 2px ${DESIGN_BRAND}, 0 4px 9px 0 rgba(0,0,0,0.2)`,
      }}
    >
      {children}
      <span
        aria-hidden="true"
        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
        style={{
          boxShadow: `inset 0 0 0 3px ${isSolid ? '#ffffff' : DESIGN_BRAND}`,
        }}
      >
        <ArrowUpRightIcon className="h-[11px] w-[11px]" />
      </span>
    </a>
  );
}
