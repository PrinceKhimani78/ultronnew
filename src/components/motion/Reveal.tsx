'use client';

import {
  useEffect,
  useState,
  type AnimationEvent,
  type CSSProperties,
  type ReactNode,
} from 'react';

import { cn } from '@/lib/utils';

import { REVEAL_CLASS } from './config';
import { useReveal } from './useReveal';

/**
 * One block, revealed once as it enters the viewport.
 *
 * Renders `data-reveal` on the server — which is what the CSS in `globals.css`
 * hides and what the `<noscript>` block in the root layout un-hides — then adds
 * Animate.css's `animate__animated animate__fadeInUp` when the observer fires.
 *
 * **`data-revealed` is the finish line.** When the animation ends the element
 * gets that attribute and the Animate.css classes come back off. Both halves
 * matter: the attribute releases the `opacity: 0` rule, and dropping the classes
 * means a page the reader has scrolled past holds no animations and no promoted
 * compositor layers. This is the brief's "remove hidden state after animation".
 *
 * **Wrap, do not insert.** `as` and `className` exist so this component can BE
 * the element it animates — a grid cell, a list item, a column — rather than
 * adding a div inside one. An extra div in a grid is a layout change.
 */

type RevealProps = {
  children: ReactNode;
  /**
   * Milliseconds to hold before starting. Stagger siblings by passing an
   * index-derived delay; `STAGGER_MS` is the house step.
   */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'ul' | 'ol' | 'article' | 'span';
  /** Override the fraction that must be visible. Defaults to `REVEAL_AMOUNT`. */
  amount?: number;
  id?: string;
  /**
   * Passed through for form containers. Password managers inject markup next to
   * fields before React hydrates, and the flag is already on those wrappers.
   */
  suppressHydrationWarning?: boolean;
  /**
   * Inherited presentation the element already carried — a background, a
   * min-height, a text colour. This component BECOMES the element it animates,
   * so anything the original node styled inline has to be able to come with it.
   */
  style?: CSSProperties;
};

export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
  amount,
  id,
  suppressHydrationWarning,
  style,
}: RevealProps) {
  const { ref, revealed } = useReveal<HTMLElement>(amount);
  const [finished, setFinished] = useState(false);

  // Cast to one concrete tag so the element's props resolve. Every member of
  // the union takes the same attributes used here, and the callback ref is
  // contravariant in its parameter, so an `HTMLElement` handler satisfies the
  // more specific ref each tag declares.
  const Component = as as 'div';

  const animating = revealed && !finished;

  useEffect(() => {
    if (revealed && !finished) {
      const timer = setTimeout(() => {
        setFinished(true);
      }, delay + 1000);
      return () => clearTimeout(timer);
    }
  }, [revealed, finished, delay]);

  return (
    <Component
      id={id}
      ref={ref}
      data-reveal=""
      // Present only once the animation has actually ended, never merely because
      // it was scheduled — an element whose delay is still counting down must
      // stay hidden.
      data-revealed={finished ? '' : undefined}
      suppressHydrationWarning={suppressHydrationWarning}
      className={cn(className, animating && REVEAL_CLASS)}
      style={
        animating && delay ? { ...style, animationDelay: `${delay}ms` } : style
      }
      // `animationend` bubbles, so a child's own animation would otherwise mark
      // this element finished while it is still mid-flight.
      onAnimationEnd={(event: AnimationEvent<HTMLElement>) => {
        if (event.target === event.currentTarget) setFinished(true);
      }}
    >
      {children}
    </Component>
  );
}
