import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * The one button.
 *
 * A second button component is how a design system dies, so new appearances are
 * added as `cva` variants here rather than as new files. The design's circular
 * arrow badge is an `arrow` prop for the same reason — it appears on four
 * different buttons across the page and would otherwise be copied four times.
 *
 * Ref is a plain prop; React 19 dropped the `forwardRef` requirement.
 */

const button = cva(
  // Sizes below all clear the 44px touch target. Focus is deliberately absent:
  // `globals.css` sets one `:focus-visible` treatment for the whole site, and a
  // per-component ring would be a second answer to a settled question.
  [
    'inline-flex items-center justify-center gap-3 rounded-full',
    'font-medium tracking-[0.12em] uppercase whitespace-nowrap select-none',
    'transition-[background-color,color,border-color,transform] duration-200',
    'ease-house active:translate-y-px',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-brand text-surface hover:bg-brand-deep',
        outline: 'border-brand/25 text-brand hover:bg-brand/5 border',
        light: 'bg-surface text-brand hover:bg-surface/90',
        ghost: 'text-ink hover:bg-brand/5',
      },
      size: {
        sm: 'px-5 py-3 text-[0.7rem]',
        md: 'px-6 py-3.5 text-xs',
        lg: 'px-7 py-4 text-xs',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

/** The badge sits inside the pill, tinted against whatever the pill is. */
const badge = cva(
  'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
  {
    variants: {
      variant: {
        primary: 'bg-surface/15',
        outline: 'bg-brand text-surface',
        light: 'bg-brand text-surface',
        ghost: 'bg-brand/10',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
);

type ButtonProps = React.ComponentPropsWithRef<'button'> &
  VariantProps<typeof button> & {
    /**
     * Render as the child element instead of a `<button>`. Use for links that
     * look like buttons — a navigation target must stay an `<a>`.
     */
    asChild?: boolean;
    /** Appends the design's circular arrow badge. */
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
      className={cn(button({ variant, size }), arrow && 'pr-2', className)}
      {...props}
    >
      {/*
        `Slottable` marks which child is the one to merge into, so the arrow can
        sit beside it. Wrapping both in a plain fragment instead looks correct
        and silently breaks `asChild`: Slot cannot see through a Fragment to find
        the element, so it merges nothing and the button renders as bare,
        unstyled text. Every `asChild` button on the page was affected.
      */}
      <Slottable>{children}</Slottable>
      {arrow ? (
        <span aria-hidden="true" className={badge({ variant })}>
          <ArrowUpRight className="h-4 w-4" />
        </span>
      ) : null}
    </Component>
  );
}
