'use client';

import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';

import {
  STAGGER,
  TRANSFORM_PERSPECTIVE,
  VIEWPORT,
  revealVariants,
  type RevealDirection,
  type RevealKind,
} from './config';
import { useMotionScale } from './useMotionScale';

/**
 * A flat list whose children arrive one after another.
 *
 * Use this for genuinely flat runs — form fields, footer links, benefit bullets.
 * For a bento grid, where cards sit at different nesting depths and each needs
 * its own direction, pass an index-derived `delay` to `Reveal` instead: Framer's
 * `staggerChildren` only sequences a motion element's *direct* variant children,
 * and a grid whose right-hand track is a nested flex column does not satisfy
 * that. An explicit delay is deterministic at any depth.
 *
 * `Stagger` renders the element the list already had — pass the `<ul>`'s own
 * classes through `className` and set `as="ul"`. It must never add a wrapper.
 *
 * The parent's own variants are empty objects: it exists to hold the timing and
 * the viewport trigger, not to move. Only `StaggerItem` transforms, which keeps
 * the number of animated layers down.
 */

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'ul' | 'ol' | 'dl';
  /** Seconds between siblings. The brief's range is 0.08–0.12. */
  stagger?: number;
  /** Seconds before the first child starts. */
  delayChildren?: number;
  amount?: number;
  /**
   * Passed through for form containers. Password managers inject markup next to
   * fields before React hydrates; the flag is already on those wrappers and
   * replacing one with a motion element must not silently drop it.
   */
  suppressHydrationWarning?: boolean;
  /** Inherited presentation the list already carried, e.g. a text colour. */
  style?: CSSProperties;
};

export function Stagger({
  children,
  className,
  as = 'div',
  stagger = STAGGER.tight,
  delayChildren = 0,
  amount,
  suppressHydrationWarning,
  style,
}: StaggerProps) {
  const Component = motion[as];

  return (
    <Component
      data-reveal=""
      className={className}
      style={style}
      suppressHydrationWarning={suppressHydrationWarning}
      initial="hidden"
      whileInView="visible"
      viewport={amount === undefined ? VIEWPORT : { ...VIEWPORT, amount }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </Component>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'span';
  variant?: RevealKind;
  direction?: RevealDirection;
  /** See the note on `Stagger`. */
  suppressHydrationWarning?: boolean;
  /** Merged over the perspective this component sets. */
  style?: CSSProperties;
};

/**
 * One member of a `Stagger`.
 *
 * It declares no `initial` or `whileInView` of its own — that is what makes it
 * inherit the parent's state through Framer's motion context, and it is why the
 * parent alone decides when the sequence begins. Give it those props and it
 * detaches from the sequence and animates on its own schedule.
 */
export function StaggerItem({
  children,
  className,
  as = 'div',
  variant = 'card',
  direction = 'up',
  suppressHydrationWarning,
  style,
}: StaggerItemProps) {
  const scale = useMotionScale();
  const Component = motion[as];

  return (
    <Component
      data-reveal=""
      className={className}
      suppressHydrationWarning={suppressHydrationWarning}
      variants={revealVariants({ kind: variant, direction, scale })}
      style={{ transformPerspective: TRANSFORM_PERSPECTIVE, ...style }}
    >
      {children}
    </Component>
  );
}
