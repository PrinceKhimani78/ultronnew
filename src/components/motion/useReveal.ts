'use client';

import { useCallback, useEffect, useState } from 'react';

import { REVEAL_AMOUNT, TALL_ELEMENT_RATIO } from './config';

/**
 * Watches one element and reports the first time it enters the viewport.
 *
 * This is the whole reveal engine. Everything else in this folder is a
 * component that renders `data-reveal`, waits on this hook and then puts the
 * Animate.css classes on.
 *
 * Three things it does that a naive observer does not:
 *
 *   - **Retires itself.** The observer disconnects inside its own callback, on
 *     the first intersection. The brief asks for animate-once; disconnecting is
 *     how that is enforced rather than merely intended, and it means a long page
 *     sheds its observers as the reader moves down it instead of carrying every
 *     one of them to the bottom.
 *   - **Handles elements taller than the screen.** A threshold is a fraction of
 *     the element. A 1.5-viewport-tall band can never be 20% visible, so it
 *     would sit at `opacity: 0` forever. Anything that big is observed at
 *     threshold 0 instead. See `TALL_ELEMENT_RATIO`.
 *   - **Fails open.** If `IntersectionObserver` is missing the content is shown
 *     immediately. A missing browser API must never be able to hide the page.
 *
 * The node is held in state rather than a ref so that the effect re-runs when
 * the element itself changes, not only when `amount` does. With a plain ref a
 * conditionally rendered or remounted child would attach to nothing.
 */

type UseRevealResult<T extends HTMLElement> = {
  /** Attach to the element that should reveal. */
  ref: (node: T | null) => void;
  /** `false` until the element has been seen; latches `true` and never resets. */
  revealed: boolean;
};

export function useReveal<T extends HTMLElement = HTMLElement>(
  amount: number = REVEAL_AMOUNT,
): UseRevealResult<T> {
  const [node, setNode] = useState<T | null>(null);
  const [revealed, setRevealed] = useState(false);

  const ref = useCallback((next: T | null) => {
    setNode(next);

    // No observer support: show the content rather than hide it behind a
    // capability check. A page that is blank without a browser API is broken,
    // not progressively enhanced.
    //
    // The check lives in the ref callback rather than in the effect below for
    // two reasons. A ref callback only ever runs in the browser, so it cannot
    // resolve `true` during SSR and ship pre-animated markup; and setting state
    // synchronously inside an effect body is exactly the cascading-render
    // pattern React asks callers to avoid.
    if (next && typeof IntersectionObserver === 'undefined') setRevealed(true);
  }, []);

  useEffect(() => {
    if (!node || revealed || typeof IntersectionObserver === 'undefined')
      return;

    const tooTall =
      node.getBoundingClientRect().height >
      window.innerHeight * TALL_ELEMENT_RATIO;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setRevealed(true);
        observer.disconnect();
      },
      { threshold: tooTall ? 0 : amount },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, amount, revealed]);

  return { ref, revealed };
}
