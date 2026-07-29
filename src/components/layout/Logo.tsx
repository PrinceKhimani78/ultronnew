import Image from 'next/image';

import { SITE } from '@/content/site';
import { cn } from '@/lib/utils';

/**
 * The brand lockup.
 *
 * Replaces the geometric SVG approximation that stood in before the real
 * artwork arrived. Two colourways, both with a transparent background so the
 * mark sits on the header pill, the footer and the cream page without a plate
 * behind it:
 *
 *   `cream` — for the dark green header bar and footer
 *   `green` — for light backgrounds
 *
 * The wordmark is part of the image, so the file carries the name. That makes
 * it content, not decoration, and it needs a real `alt` — except where a
 * neighbouring link label already announces the company, which is why `alt` can
 * be suppressed via `decorative`.
 */

const LOCKUPS = {
  cream: '/brand/logo-lockup-cream.webp',
  green: '/brand/logo-lockup-green.webp',
} as const;

const ICONS = {
  cream: '/brand/logo-icon-cream.webp',
  green: '/brand/logo-icon-green.webp',
} as const;

/** Intrinsic dimensions of the generated assets, so no box is guessed. */
const LOCKUP = { width: 640, height: 177 };
const ICON = { width: 192, height: 192 };

type LogoProps = {
  tone?: 'cream' | 'green';
  /** Monogram only, for tight spaces. */
  markOnly?: boolean;
  /**
   * The lockup contains the company name. When an ancestor link already carries
   * that name as its accessible label, repeating it here makes a screen reader
   * announce the company twice.
   */
  decorative?: boolean;
  className?: string;
};

export function Logo({
  tone = 'cream',
  markOnly = false,
  decorative = true,
  className,
}: LogoProps) {
  const src = markOnly ? ICONS[tone] : LOCKUPS[tone];
  const { width, height } = markOnly ? ICON : LOCKUP;

  return (
    <Image
      src={src}
      alt={decorative ? '' : SITE.name}
      aria-hidden={decorative || undefined}
      width={width}
      height={height}
      // The header is above the fold on every page; never lazy-load it.
      priority
      className={cn('w-auto', markOnly ? 'h-9' : 'h-10', className)}
    />
  );
}
