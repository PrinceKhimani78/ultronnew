import { cn } from '@/lib/utils';

/**
 * The measure.
 *
 * A thin wrapper over `.page-shell` in `globals.css`, which is the single
 * definition of the page's max-width and gutters for the entire site. This
 * component no longer carries either number — if it did, it would be a second
 * opinion about where the page edge is, and a second opinion is how the header,
 * the content and the footer ended up on three different vertical lines.
 *
 * The header and footer use `.page-shell` directly rather than this component,
 * because neither renders a plain `div` at that level. They are still on the
 * same measure for exactly that reason.
 */

type ContainerProps = React.ComponentPropsWithoutRef<'div'> & {
  /**
   * `narrow` is for reading — roughly 68 characters, past which the eye loses
   * the start of the next line. `default` and `wide` are both the full page
   * measure; they are kept distinct so a future narrowing of one does not
   * silently move the other.
   */
  width?: 'narrow' | 'default' | 'wide';
};

/**
 * `narrow` overrides the shell's max-width. It can, without `!important`,
 * because `.page-shell` is declared in the `components` cascade layer and
 * `max-w-3xl` is a utility — utilities are layered after components.
 *
 * `default` and `wide` add nothing: the shell already is the page measure.
 */
const WIDTHS = {
  narrow: 'max-w-3xl',
  default: '',
  wide: '',
} as const;

export function Container({
  width = 'default',
  className,
  ...props
}: ContainerProps) {
  return (
    <div className={cn('page-shell', WIDTHS[width], className)} {...props} />
  );
}
