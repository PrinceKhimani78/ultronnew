import type { HeadingSegment } from '@/types/content';

/**
 * How the engagement runs, start to finish. Client-approved copy.
 *
 * `duration` has been removed. The earlier steps carried invented timelines
 * ("Week 1–2", "Week 2–8") which the client's copy does not state, and a
 * delivery estimate a firm has not committed to is exactly the kind of claim
 * this project has been careful not to fabricate. Reinstate the field only if
 * the firm supplies real figures.
 */

export type ProcessStep = {
  /** Rendered as the visible numeral. Kept in content so the order is data. */
  step: string;
  title: string;
  body: string;
  /**
   * Illustration shown opposite the card on the timeline. Decorative — each one
   * restates its step's title, so it carries an empty `alt`.
   */
  image: string;
};

export const PROCESS_INTRO = {
  eyebrow: 'Our approach',
  /** The design sets the firm name in caps within the heading. */
  heading: [
    { text: 'How ' },
    { text: 'ULTRON ', accent: true },
    { text: 'Works' },
  ] as readonly HeadingSegment[],
  body: 'Four stages, one team. You are not handed between departments and you will not re-explain your situation to a new account manager.',
} as const;

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    step: '01',
    title: 'Initial Consultation',
    body: 'We listen before we advise. You tell us what happened, what’s been tried, and what’s actually needed.',
    image: '/brand/process-consultation.webp',
  },
  {
    step: '02',
    title: 'Strategy and Planning',
    body: 'We assess feasibility and trace the case back to its root cause, then rebuild the structure, documentation or application the way it actually needs to be presented. If a case isn’t solvable, you hear that first.',
    image: '/brand/process-strategy.webp',
  },
  {
    step: '03',
    title: 'Execution and Co-ordination',
    body: 'We approach the institutions with genuine appetite for your profile, submit your case, and manage it actively through the approval process.',
    image: '/brand/process-execution.webp',
  },
  {
    step: '04',
    title: 'Ongoing Support',
    body: 'We stay engaged through compliance queries and conditions until it’s resolved, and remain available for whatever comes next.',
    image: '/brand/process-support.webp',
  },
] as const;
