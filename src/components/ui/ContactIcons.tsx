import { cn } from '@/lib/utils';

/**
 * The three glyphs the footer's contact column draws.
 *
 * Every one is on the same 24 box at 22px with a 1.8 stroke, so the column reads
 * level regardless of how many lines the address wraps to. `mt-1` (`lg:mt-[4px]`)
 * is what sits each glyph on the cap height of its first line rather than on the
 * line box, which is a 4px difference and visible.
 *
 * Stroke-based and inheriting `currentColor`, so a colour change is a class
 * rather than a new asset.
 */

const GLYPH =
  'h-[22px] w-[22px] shrink-0 mt-1 lg:mt-[4px] transition-colors duration-200';

type GlyphProps = { className?: string };

export function LocationGlyph({ className }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(GLYPH, className)}
    >
      <path d="M20 10.5c0 5-6.2 10.4-7.4 11.4a1 1 0 0 1-1.2 0C10.2 20.9 4 15.5 4 10.5a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10.2" r="2.8" />
    </svg>
  );
}

export function MailGlyph({ className }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(GLYPH, className)}
    >
      <rect x="2" y="4.5" width="20" height="15" rx="2.5" />
      <path d="m2.5 6 9.5 7 9.5-7" />
    </svg>
  );
}

export function PhoneGlyph({ className }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(GLYPH, className)}
    >
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
    </svg>
  );
}
