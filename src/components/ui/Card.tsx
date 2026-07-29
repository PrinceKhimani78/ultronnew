import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Surface primitive. Holds no layout opinion beyond padding — a grid decides
 * where cards sit, the card decides only how it looks.
 */

const card = cva('rounded-2xl transition-shadow duration-300 ease-house', {
  variants: {
    variant: {
      bordered: 'border border-line bg-surface-raised',
      // Raised sits on the page without an outline. Used where a border would
      // add a fourth line to an already busy grid.
      raised: 'bg-surface-raised shadow-soft',
      // For use inside a `Section tone="brand"` band only.
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
