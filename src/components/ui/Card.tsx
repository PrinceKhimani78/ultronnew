import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Surface primitive. Holds no layout opinion beyond padding — a grid decides
 * where cards sit, the card decides only how it looks.
 */

const card = cva('rounded-2xl transition-shadow duration-300 ease-house', {
  variants: {
    variant: {
      // The teal hairline is gone — cards carry the shared golden shadow and
      // no visible border. `--color-line` still exists for rules and dividers,
      // which is where a hairline in that colour does belong.
      bordered: 'bg-surface-raised card-shadow-center',
      // Raised sits on the page without an outline. `shadow-soft` was tinted
      // with the brand teal; this is the same site-wide golden shadow.
      raised: 'bg-surface-raised card-shadow-center',
      // For use inside a `Section tone="brand"` band only. No golden shadow
      // here: on a dark teal ground it reads as a glow, not a lift.
      inverted: 'border border-surface/15 bg-surface/5',
    },
    padding: {
      md: 'p-6',
      lg: 'p-8',
    },
    interactive: {
      true: 'hover:shadow-lift',
      false: '',
    },
  },
  defaultVariants: { variant: 'bordered', padding: 'lg', interactive: false },
});

type CardProps = React.ComponentPropsWithRef<'div'> & VariantProps<typeof card>;

export function Card({
  className,
  variant,
  padding,
  interactive,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(card({ variant, padding, interactive }), className)}
      {...props}
    />
  );
}
