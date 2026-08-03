'use client';

import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * How far things are allowed to move, as a multiplier on every distance in
 * `config.ts`.
 *
 *   desktop   1     the designed values
 *   tablet    0.8
 *   mobile    0.6   the brief's "reduce movement by 40%"
 *   reduced   0     pure fade, no transform at all
 *
 * Stagger and duration are deliberately NOT scaled. The brief asks for less
 * movement on small screens, not for faster or flatter sequencing — a phone
 * shows fewer cards at once, so the one-after-another rhythm is more of the
 * effect there, not less.
 *
 * It returns 1 on the server and on the first client render, then corrects in an
 * effect. That order matters: a hook that read `window.innerWidth` during render
 * would produce different markup on the server than in the browser, which is a
 * hydration mismatch. The correction lands before any reveal fires, because
 * `whileInView` waits on an IntersectionObserver callback and effects run first.
 */

const MOBILE = '(max-width: 639px)';
const TABLET = '(max-width: 1023px)';

export function useMotionScale(): number {
  const prefersReducedMotion = useReducedMotion();
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const mobile = window.matchMedia(MOBILE);
    const tablet = window.matchMedia(TABLET);

    const update = () => {
      setScale(mobile.matches ? 0.6 : tablet.matches ? 0.8 : 1);
    };

    update();
    mobile.addEventListener('change', update);
    tablet.addEventListener('change', update);

    return () => {
      mobile.removeEventListener('change', update);
      tablet.removeEventListener('change', update);
    };
  }, []);

  return prefersReducedMotion ? 0 : scale;
}
