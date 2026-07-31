import { cn } from '@/lib/utils';

/**
 * Vertical rhythm and background. Owns spacing *between* bands so that no
 * section component has to know what sits above or below it.
 */

type SectionProps = React.ComponentPropsWithoutRef<'section'> & {
  /** `tight` for a strip, `spacious` for a band that should breathe. */
  spacing?: 'tight' | 'default' | 'spacious';
  tone?: 'surface' | 'raised' | 'brand';
};

/**
 * The vertical scale, in one place. Three steps, each stated at mobile, tablet
 * and desktop, so a section never has to invent its own numbers.
 *
 * The values are the comp's, not a guess: its bands run 52–65px of lead-in and
 * 88–130px of run-out, which is an inter-section gap of roughly 145px. Symmetric
 * 72px padding lands on the same rhythm without the asymmetry, which existed in
 * the comp only because of where each heading happened to sit.
 *
 *   tight     32 / 40 / 48
 *   default   44 / 56 / 72
 *   spacious  56 / 72 / 96
 */
const SPACING = {
  tight: 'py-8 sm:py-10 lg:py-12',
  default: 'py-11 sm:py-14 lg:py-18',
  spacious: 'py-14 sm:py-18 lg:py-24',
} as const;

const TONES = {
  surface: 'bg-surface text-ink',
  raised: 'bg-surface-raised text-ink',
  // Inverted band. `text-surface` rather than white keeps it in the palette.
  brand: 'bg-brand text-surface',
} as const;

export function Section({
  spacing = 'default',
  tone = 'surface',
  className,
  ...props
}: SectionProps) {
  return (
    <section
      data-header-tone={tone === 'brand' ? 'dark' : undefined}
      className={cn('relative', SPACING[spacing], TONES[tone], className)}
      {...props}
    />
  );
}
