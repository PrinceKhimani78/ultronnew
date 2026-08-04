/**
 * The site's motion system.
 *
 * Four things, one vocabulary:
 *
 *   `Reveal`       one block, once, as it enters view
 *   `Stagger` +    a list arriving one after another
 *   `StaggerItem`
 *   `Parallax`     10–30px of drift against the scroll
 *   `useReveal`    the IntersectionObserver underneath all of the above
 *
 * The entrance itself is Animate.css `fadeInUp`, subtle, 0.8s, `ease-out`,
 * once — defined in `globals.css` and named in `config.ts`. Nothing should pick
 * a different animation, distance or duration at a call site; a gesture chosen
 * inline is a decision nobody can audit, and twenty of them is how a motion
 * system stops feeling like one. The only thing a call site chooses is `delay`.
 */

export { Reveal } from './Reveal';
export { Stagger, StaggerItem } from './Stagger';
export { Parallax } from './Parallax';
export {
  REVEAL_AMOUNT,
  REVEAL_CLASS,
  STAGGER_MS,
  TALL_ELEMENT_RATIO,
} from './config';
export { useReveal } from './useReveal';
export { useMotionScale } from './useMotionScale';
