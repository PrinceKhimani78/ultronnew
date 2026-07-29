import { cn } from '@/lib/utils';

/**
 * The measure. Sole owner of max-width and horizontal gutters in the codebase —
 * if a section sets its own `px-*`, two files now disagree about where the page
 * edge is, and they will drift.
 */

type ContainerProps = React.ComponentPropsWithoutRef<'div'> & {
  /**
   * `narrow` is for reading — roughly 68 characters, past which the eye loses
   * the start of the next line. `wide` is for grids that need the room.
   */
  width?: 'narrow' | 'default' | 'wide';
};

const WIDTHS = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
} as const;

export function Container({
  width = 'default',
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-8 lg:px-12',
        WIDTHS[width],
        className,
      )}
      {...props}
    />
  );
}
