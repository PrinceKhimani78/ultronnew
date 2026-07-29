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

const SPACING = {
  tight: 'py-12 sm:py-16',
  default: 'py-20 sm:py-28',
  spacious: 'py-28 sm:py-36',
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
      className={cn('relative', SPACING[spacing], TONES[tone], className)}
      {...props}
    />
  );
}
