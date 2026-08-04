/**
 * The site's motion vocabulary, in one file.
 *
 * There is exactly one entrance on this site: Animate.css `fadeInUp`, subtle,
 * 0.8s, `ease-out`, once. Sections, cards, headings, form fields and footer
 * columns all use it — what varies between them is only *when* they start, and
 * that is the stagger below.
 *
 * Three rules the values encode:
 *
 *   1. **Short travel.** The rise is 24px (18px on phones), set as
 *      `--reveal-distance` in `globals.css`. Stock `fadeInUp` travels 100% of
 *      the element's own height; that is the dramatic bottom-slide the brief
 *      rules out, and it is why the keyframe is redefined there.
 *   2. **Compositor-only properties.** `opacity` and a `translate3d`. Never
 *      width, height, margin or top — those relayout the page on every frame
 *      and are what makes a scroll feel cheap.
 *   3. **Once.** Every observer disconnects on its first intersection, and the
 *      element is marked `data-revealed` when its animation ends. Nothing
 *      replays on the way back up.
 */

/**
 * The two Animate.css classes, together, as one string.
 *
 * Kept here rather than typed at call sites so the site cannot drift into a
 * second entrance animation: changing the gesture is one edit in this file.
 */
export const REVEAL_CLASS = 'animate__animated animate__fadeInUp';

/**
 * Milliseconds between siblings in a sequence.
 *
 * The brief's range is 80–120ms. 100 sits in the middle: below ~80ms a run of
 * cards reads as one block arriving, and past ~140ms it reads as a queue the
 * reader is waiting on.
 */
export const STAGGER_MS = 100;

/**
 * A fifth of the element must be in view before it starts.
 *
 * Low enough that a tall band begins as its top edge clears the fold, high
 * enough that a short card is not already fully read before it animates.
 */
export const REVEAL_AMOUNT = 0.2;

/**
 * Anything taller than this share of the viewport is observed at threshold 0.
 *
 * An IntersectionObserver threshold is a fraction of the *element*, not of the
 * screen. A section 1.5 viewports tall can never be 20% visible, so a literal
 * 0.2 would mean it never reveals at all. Above this ratio the trigger falls
 * back to "any part of it has entered", which for an element that size is the
 * same moment a reader would call it on screen.
 */
export const TALL_ELEMENT_RATIO = 0.9;
