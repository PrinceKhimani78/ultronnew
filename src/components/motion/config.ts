/**
 * The site's motion vocabulary, in one file.
 *
 * Every reveal on the site resolves to a variant produced here. That is the
 * whole point: a duration or a distance chosen at a call site is a decision
 * nobody can audit, and twenty of them is why motion systems drift into feeling
 * arbitrary. Change a number here and the whole site moves together.
 *
 * Three rules the values encode:
 *
 *   1. **Short travel.** Nothing flies in from off-screen. The longest move is
 *      40px, and most are half that. Distance reads as effort; a premium page
 *      should look like it was always there and simply resolved.
 *   2. **Compositor-only properties.** `transform`, `opacity` and `filter`.
 *      Never width, height, margin or top — those relayout the page on every
 *      frame and are what makes a scroll feel cheap.
 *   3. **Once.** Every reveal is `once: true`. Re-animating on each pass turns
 *      motion into decoration, and it lets observers retire as the visitor
 *      scrolls instead of living for the life of the page.
 */

/**
 * easeOutExpo. Nearly all of the movement happens in the first third of the
 * duration and the rest is settle, which is what reads as weight — a symmetric
 * `ease-in-out` reads as a slideshow.
 *
 * The same curve as `--ease-house` in `globals.css`, so CSS transitions (button
 * hovers, card lifts) and Framer reveals share one feel.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Per the brief: sections 0.9s, cards 0.75s, images 0.9s, buttons 0.6s. */
export const DURATION = {
  section: 0.9,
  text: 0.8,
  card: 0.75,
  image: 0.9,
  button: 0.6,
  icon: 0.6,
} as const;

/** Delay between siblings. 80ms reads as a sequence; past ~140ms it reads as a queue. */
export const STAGGER = {
  tight: 0.08,
  loose: 0.12,
} as const;

/**
 * `amount: 0.2` — a fifth of the element must be in view. Low enough that a
 * tall band starts as its top edge clears the fold, high enough that a short
 * card is not already fully read before it animates.
 */
export const VIEWPORT = { once: true, amount: 0.2 } as const;

/** Bento columns slide 20px, per the brief. Sideways moves never also move on Y. */
const SIDE_DISTANCE = 20;

export type RevealKind = keyof typeof KIND;
export type RevealDirection = 'up' | 'left' | 'right' | 'none';

/**
 * `rotateX` and `blur` are set on `section` only.
 *
 * The tilt needs perspective to be visible at all, and at 4° across a full band
 * it is felt rather than seen — applied to a 300px card it would read as a flip.
 * The blur is the one non-transform property here; it is also the most
 * expensive, which is why it is confined to the largest, least frequent elements
 * and dropped entirely below the desktop breakpoint.
 */
const KIND = {
  section: {
    y: 40,
    duration: DURATION.section,
    scale: 0.98,
    rotateX: 4,
    blur: 4,
  },
  text: { y: 24, duration: DURATION.text, scale: 1, rotateX: 0, blur: 0 },
  card: { y: 24, duration: DURATION.card, scale: 0.98, rotateX: 0, blur: 0 },
  image: { y: 20, duration: DURATION.image, scale: 0.97, rotateX: 0, blur: 0 },
  button: { y: 12, duration: DURATION.button, scale: 1, rotateX: 0, blur: 0 },
  icon: { y: 0, duration: DURATION.icon, scale: 0.9, rotateX: 0, blur: 0 },
  /**
   * The process timeline's illustration discs. A hair less shrink than `image`
   * and no rise at all: they are pinned opposite a spine node, and a disc that
   * drifts up into position visibly detaches from the dot it belongs to.
   */
  circle: { y: 0, duration: DURATION.image, scale: 0.95, rotateX: 0, blur: 0 },
} as const;

/**
 * Builds the hidden/visible pair for one element.
 *
 * `scale` is the responsive movement multiplier from `useMotionScale` — 1 on
 * desktop, 0.8 on tablet, 0.6 on mobile, and 0 when the visitor has asked for
 * reduced motion. At 0 every transform collapses to its resting value and the
 * element simply fades, which is the honest reading of that preference: they
 * asked for less movement, not for no feedback that something arrived.
 *
 * Both states always declare `filter`, even when it is `blur(0px)`. Animating
 * from an undefined filter to a defined one gives a visible jump on the first
 * frame in Chromium.
 */
export function revealVariants({
  kind = 'section',
  direction = 'up',
  scale = 1,
  delay = 0,
}: {
  kind?: RevealKind;
  direction?: RevealDirection;
  scale?: number;
  delay?: number;
}) {
  const spec = KIND[kind];
  const still = scale === 0;
  const travel = (value: number) => Math.round(value * scale);

  // Blur is desktop-only. It is the single most expensive thing in this system,
  // and the brief asks for 40% less movement on mobile with no lag.
  const blurPx = !still && scale >= 1 ? spec.blur : 0;

  return {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? travel(spec.y) : 0,
      x:
        direction === 'left'
          ? -travel(SIDE_DISTANCE)
          : direction === 'right'
            ? travel(SIDE_DISTANCE)
            : 0,
      scale: still ? 1 : spec.scale,
      rotateX: still ? 0 : spec.rotateX,
      filter: `blur(${blurPx}px)`,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: spec.duration,
        delay,
        ease: EASE_OUT_EXPO,
      },
    },
  };
}

/**
 * Depth for the `section` tilt. Without a perspective the `rotateX` is a no-op,
 * because a rotation about the X axis of a flat plane is invisible under
 * orthographic projection.
 */
export const TRANSFORM_PERSPECTIVE = 1200;
