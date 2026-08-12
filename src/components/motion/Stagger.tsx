'use client';

import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useState,
  type AnimationEvent,
  type CSSProperties,
  type ReactNode,
} from 'react';

import { cn } from '@/lib/utils';

import { REVEAL_CLASS, STAGGER_MS } from './config';
import { useReveal } from './useReveal';

/**
 * A list whose children arrive one after another.
 *
 * Use this for genuinely flat runs — form fields, footer links, stat cards,
 * benefit bullets. One observer watches the container and every child derives
 * its delay from its own position, which is what makes the sequence hold no
 * matter how many items there are.
 *
 * `Stagger` renders the element the list already had — pass the `<ul>`'s own
 * classes through `className` and set `as="ul"`. It must never add a wrapper.
 *
 * For a grid whose cards sit at different nesting depths, or where source order
 * is not reveal order, pass an index-derived `delay` to `Reveal` at each card
 * instead. That stays deterministic at any depth; this does not, because the
 * index a child receives is its position among *this* element's direct
 * children.
 */

type StaggerContextValue = {
  /** The container has entered the viewport. */
  started: boolean;
  /** Milliseconds between siblings. */
  step: number;
  /** Milliseconds before the first child starts. */
  offset: number;
};

const StaggerContext = createContext<StaggerContextValue | null>(null);

/** Position among the container's direct children. Injected, never passed. */
const StaggerIndexContext = createContext(0);

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'ul' | 'ol' | 'dl';
  /** Milliseconds between siblings. The brief's range is 80–120ms. */
  step?: number;
  /** Milliseconds before the first child starts. */
  delay?: number;
  amount?: number;
  /**
   * Passed through for form containers. Password managers inject markup next to
   * fields before React hydrates; the flag is already on those wrappers and
   * replacing one with an animated element must not silently drop it.
   */
  suppressHydrationWarning?: boolean;
  /** Inherited presentation the list already carried, e.g. a text colour. */
  style?: CSSProperties;
};

export function Stagger({
  children,
  className,
  as = 'div',
  step = STAGGER_MS,
  delay = 0,
  amount,
  suppressHydrationWarning,
  style,
}: StaggerProps) {
  const { ref, revealed } = useReveal<HTMLElement>(amount);

  // Cast to one concrete tag so the element's props resolve; see the same note
  // in `Reveal`.
  const Component = as as 'div';

  return (
    <StaggerContext.Provider value={{ started: revealed, step, offset: delay }}>
      <Component
        ref={ref}
        className={className}
        style={style}
        suppressHydrationWarning={suppressHydrationWarning}
      >
        {/*
          Index is injected through context rather than cloned onto the child.
          `cloneElement` would collide with any `className` or `style` the item
          already sets, and a provider adds no DOM node — so the list's own
          layout is untouched, which is the whole contract of this component.
        */}
        {Children.map(children, (child, index) =>
          isValidElement(child) ? (
            <StaggerIndexContext.Provider value={index}>
              {child}
            </StaggerIndexContext.Provider>
          ) : (
            child
          ),
        )}
      </Component>
    </StaggerContext.Provider>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'span';
  /** See the note on `Stagger`. */
  suppressHydrationWarning?: boolean;
  style?: CSSProperties;
};

/**
 * One member of a `Stagger`.
 *
 * It runs no observer of its own — that is what makes the parent alone decide
 * when the sequence begins, and it is why a run of six fields costs one observer
 * rather than six. Outside a `Stagger` it degrades to a plain immediate reveal
 * rather than throwing, so a refactor that lifts an item out of its list shows
 * content instead of hiding it.
 */
export function StaggerItem({
  children,
  className,
  as = 'div',
  suppressHydrationWarning,
  style,
}: StaggerItemProps) {
  const sequence = useContext(StaggerContext);
  const index = useContext(StaggerIndexContext);
  const [finished, setFinished] = useState(false);

  const Component = as as 'div';

  const started = sequence?.started ?? true;
  const delay = sequence ? sequence.offset + index * sequence.step : 0;
  const animating = started && !finished;

  return (
    <Component
      data-reveal=""
      data-revealed={finished ? '' : undefined}
      suppressHydrationWarning={suppressHydrationWarning ?? true}
      className={cn(className, animating && REVEAL_CLASS)}
      style={
        animating && delay ? { ...style, animationDelay: `${delay}ms` } : style
      }
      onAnimationEnd={(event: AnimationEvent<HTMLElement>) => {
        if (event.target === event.currentTarget) setFinished(true);
      }}
    >
      {children}
    </Component>
  );
}
