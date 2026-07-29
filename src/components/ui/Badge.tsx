import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Small label. `accent` uses `accent-deep` rather than `accent`, because the
 * lighter gold measures ~2:1 on surface and would fail AA as text.
 */

const badge = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide',
  {
    variants: {
      variant: {
        brand: 'bg-brand/8 text-brand',
        accent: 'bg-accent/15 text-accent-deep',
        muted: 'bg-ink/5 text-ink-muted',
        inverted: 'bg-surface/10 text-surface',
      },
    },
    defaultVariants: { variant: 'brand' },
  },
);

type BadgeProps = React.ComponentPropsWithRef<'span'> &
  VariantProps<typeof badge>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badge({ variant }), className)} {...props} />;
}
