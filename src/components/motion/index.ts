/**
 * The site's motion system.
 *
 * Four things, one vocabulary:
 *
 *   `Reveal`       one block, once, as it enters view
 *   `Stagger` +    a flat list arriving one after another
 *   `StaggerItem`
 *   `Parallax`     10–30px of drift against the scroll
 *
 * Every distance, duration and curve lives in `config.ts`. Nothing should set
 * those at a call site — a duration chosen inline is a decision nobody can
 * audit, and twenty of them is how a motion system stops feeling like one.
 */

export { Reveal } from './Reveal';
export { Stagger, StaggerItem } from './Stagger';
export { Parallax } from './Parallax';
export {
  DURATION,
  EASE_OUT_EXPO,
  STAGGER,
  VIEWPORT,
  revealVariants,
  type RevealDirection,
  type RevealKind,
} from './config';
export { useMotionScale } from './useMotionScale';
