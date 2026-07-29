import type { HeadingSegment } from '@/types/content';

/**
 * How the engagement runs, start to finish. Approved copy.
 */

export type ProcessStep = {
  /** Rendered as the visible numeral. Kept in content so the order is data. */
  step: string;
  title: string;
  body: string;
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
    body: "We listen before we advise. What happened, what's already been tried, and what you actually need before any recommendation is made.",
    image: '/brand/process-consultation.webp',
  },
  {
    step: '02',
    title: 'Strategy and Planning',
    body: "We assess feasibility and identify the real root cause. Then we rebuild the structure, documentation or application exactly how it should be presented. If it isn't solvable, that's the first thing we tell you.",
    image: '/brand/process-strategy.webp',
  },
  {
    step: '03',
    title: 'Execution and Co-ordination',
    body: 'We approach banks and lenders with genuine appetite for your profile. We manage the process actively rather than waiting for updates.',
    image: '/brand/process-execution.webp',
  },
  {
    step: '04',
    title: 'Ongoing Support',
    body: 'We stay involved through every compliance request until the matter is fully resolved.',
    image: '/brand/process-support.webp',
  },
] as const;
