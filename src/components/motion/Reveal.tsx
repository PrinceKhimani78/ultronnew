'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import {
  TRANSFORM_PERSPECTIVE,
  VIEWPORT,
  revealVariants,
  type RevealDirection,
  type RevealKind,
} from './config';
import { useMotionScale } from './useMotionScale';

/**
 * One block, revealed once as it enters the viewport.
 *
 * This replaces an IntersectionObserver + CSS implementation that existed to
 * avoid loading Framer Motion. That trade no longer pays: the site header uses
 * Framer on every route, so the library is already in the shared bundle and the
 * CSS version was a second animation system maintained to save a download that
 * had already happened. One system now, defined in `motion/config.ts`.
 *
 * **`data-reveal` is not decorative.** Framer writes its `initial` state as an
 * inline style during SSR, so with JavaScript disabled every element on the page
 * would stay at `opacity: 0` forever. The attribute is the hook for the
 * `<noscript>` rule in the root layout, whose `!important` beats a
 * non-important inline declaration and forces everything visible.
 *
 * **Wrap, do not insert.** `as` and `className` exist so this component can BE
 * the element it animates — a grid cell, a list item, a column — rather than
 * adding a div inside one. An extra div in a grid is a layout change, and the
 * brief forbids layout changes.
 */

type RevealProps = {
  children: ReactNode;
  /** Seconds. Stagger siblings by passing an index-derived delay. */
  delay?: number;
  /** Which set of distances and durations to use. See `KIND` in `config.ts`. */
  variant?: RevealKind;
  /** `up` is the default; `left`/`right` are the 20px bento column slides. */
  direction?: RevealDirection;
  className?: string;
  as?: 'div' | 'li' | 'article' | 'span';
  /** Override the fraction that must be visible. Defaults to 0.2. */
  amount?: number;
  id?: string;
};

export function Reveal({
  children,
  delay = 0,
  variant = 'section',
  direction = 'up',
  className,
  as = 'div',
  amount,
  id,
}: RevealProps) {
  const scale = useMotionScale();
  const Component = motion[as];

  return (
    <Component
      id={id}
      data-reveal=""
      className={className}
      variants={revealVariants({ kind: variant, direction, scale, delay })}
      initial="hidden"
      whileInView="visible"
      viewport={amount === undefined ? VIEWPORT : { ...VIEWPORT, amount }}
      // Without a perspective a rotateX on a flat plane is invisible. Set here
      // rather than in the variant so it is never animated — it is the camera,
      // not the subject.
      style={{ transformPerspective: TRANSFORM_PERSPECTIVE }}
    >
      {children}
    </Component>
  );
}
