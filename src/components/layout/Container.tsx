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
  default: 'max-w-[1348px]',
  wide: 'max-w-[1348px]',
} as const;

/**
 * Gutters are the comp's, not a rounded approximation of them: the design frame
 * is 1280 wide with its content inset 85px, and it draws the page edge at 20 /
 * 32 / 40px as the viewport narrows. `xl:px-0` is what lets the 1348px measure
 * actually reach 1348 on a wide screen — with a gutter still applied it never
 * does, and every section sits a few pixels narrower than the design.
 */
const GUTTERS = 'mx-auto w-full px-5 sm:px-8 lg:px-10 xl:px-0';

export function Container({
  width = 'default',
  className,
  ...props
}: ContainerProps) {
  return <div className={cn(GUTTERS, WIDTHS[width], className)} {...props} />;
}
