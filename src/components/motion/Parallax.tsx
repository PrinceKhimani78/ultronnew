'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';

import { useMotionScale } from './useMotionScale';

/**
 * Drifts its contents against the scroll, by 10–30px.
 *
 * The whole effect is that the element travels slightly slower than the page, so
 * the band reads as having depth rather than as a flat sheet. Past ~30px it
 * stops being depth and starts being a moving part, which is the line between
 * this and the sort of motion the brief calls flashy.
 *
 * The offset runs `start end` → `end start`: progress is 0 when the element's
 * top first touches the bottom of the viewport and 1 when its bottom leaves the
 * top. Mapping `[+distance, -distance]` across that range puts the element at
 * exactly its laid-out position when it is centred, so nothing is ever displaced
 * at rest and there is no layout shift to correct.
 *
 * This is the one scroll-linked animation on the site — everything else runs
 * once. It is bounded by the element's own passage through the viewport, so it
 * is not the "infinite scroll animation" the brief rules out, and `useTransform`
 * writes to a MotionValue rather than to React state, so it never re-renders.
 *
 * Under reduced motion `useMotionScale` returns 0, which collapses the range to
 * `[0, 0]` and the element simply sits still.
 */

type ParallaxProps = {
  children: ReactNode;
  /** Peak displacement in px, before the responsive scale. Keep to 10–30. */
  distance?: number;
  className?: string;
};

export function Parallax({
  children,
  distance = 20,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scale = useMotionScale();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const travel = distance * scale;
  const y = useTransform(scrollYProgress, [0, 1], [travel, -travel]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
