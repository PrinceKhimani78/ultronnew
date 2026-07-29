'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * Fade-and-rise as an element scrolls into view.
 *
 * Deliberately not Framer Motion. This does one thing — transition opacity and a
 * small translate once, on intersection — and Framer cost 58KB gzipped to do it,
 * which was 24% of the page's entire JavaScript. PROJECT.md's seventh
 * code-quality rule ("if it saves fewer than fifty lines, write the fifty
 * lines") decides this. Framer stays in the dependency list for work that
 * genuinely needs it: presence and exit transitions on the contact form, and any
 * future modal.
 *
 * **One observer for the whole page.** Every instance shares the module-level
 * observer below rather than constructing its own — around twenty separate
 * observers were previously being created and each one is an independent
 * callback the browser must service during scroll. The reveal action is
 * identical for every element, so there is nothing per-instance to store.
 *
 * The animation itself lives in `globals.css` against `[data-reveal]`, so this
 * component ships no style objects and the reduced-motion escape hatch is a
 * media query rather than a runtime branch. A `<noscript>` block in the root
 * layout forces every element visible when scripting is off.
 */

type RevealProps = {
  children: React.ReactNode;
  /** Stagger siblings by passing an index-derived delay, in seconds. */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'article';
};

/** Reveal slightly before the element reaches the fold, so it is never abrupt. */
const ROOT_MARGIN = '0px 0px -80px 0px';

let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver() {
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.reveal = 'visible';
        // Once only. Re-animating on every pass is what makes motion read as
        // decoration rather than confidence — and it keeps the observer's
        // working set shrinking as the visitor scrolls.
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: ROOT_MARGIN },
  );

  return sharedObserver;
}

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
}: RevealProps) {
  const nodeRef = useRef<HTMLElement | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    nodeRef.current = node;
  }, []);

  useEffect(() => {
    const element = nodeRef.current;
    if (!element) return;

    // Reveal immediately rather than leaving content hidden if the API is absent.
    if (typeof IntersectionObserver === 'undefined') {
      element.dataset.reveal = 'visible';
      return;
    }

    const observer = getSharedObserver();
    observer.observe(element);
    // Unobserve only this element — the observer is shared and outlives it.
    return () => observer.unobserve(element);
  }, []);

  return (
    <Tag
      ref={setRef}
      data-reveal=""
      style={{ '--reveal-delay': `${delay}s` } as React.CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}
