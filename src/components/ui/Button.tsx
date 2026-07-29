import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * The unified Button component styled to match Figma design specifications:
 * - 44px height (size: md)
 * - 1000px / full rounded border radius
 * - 2px #035551 border
 * - #FDFBEE background
 * - 0px 4px 9px 0px rgba(0,0,0,0.20) drop shadow
 * - Circular dark teal icon badge on the right
 */

const button = cva(
  [
    'inline-flex items-center justify-center gap-2.5 rounded-full',
    'font-semibold tracking-[0.1em] uppercase whitespace-nowrap select-none',
    'transition-all duration-200 ease-house active:translate-y-px',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-brand text-surface shadow-[0px_4px_9px_0px_rgba(0,0,0,0.15)] hover:bg-brand-deep',
        outline:
          'bg-surface text-brand border-2 border-brand shadow-[0px_4px_9px_0px_rgba(0,0,0,0.20)] hover:bg-surface/90 hover:shadow-[0px_6px_12px_0px_rgba(0,0,0,0.25)]',
        light:
          'bg-surface text-brand border-2 border-brand shadow-[0px_4px_9px_0px_rgba(0,0,0,0.20)] hover:bg-surface/90',
        ghost: 'text-ink hover:bg-brand/5',
      },
      size: {
        sm: 'h-10 px-4 text-[0.7rem]',
        md: 'h-[44px] px-6 text-xs',
        lg: 'h-12 px-7 text-xs',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

const badge = cva(
  'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5',
  {
    variants: {
      variant: {
        primary: 'bg-surface/20 text-surface',
        outline: 'bg-brand text-surface',
        light: 'bg-brand text-surface',
        ghost: 'bg-brand/10 text-brand',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
);

type ButtonProps = React.ComponentPropsWithRef<'button'> &
  VariantProps<typeof button> & {
    asChild?: boolean;
    arrow?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  arrow = false,
  children,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button';

  return (
    <Component
      className={cn(
        button({ variant, size }),
        arrow && 'group pr-2.5',
        className,
      )}
      {...props}
    >
      <Slottable>{children}</Slottable>
      {arrow ? (
        <span aria-hidden="true" className={badge({ variant })}>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      ) : null}
    </Component>
  );
}
