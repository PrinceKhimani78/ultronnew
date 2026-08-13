import type { HeadingSegment } from '@/types/content';

export const BLOG_PAGE = {
  metaTitle: 'Ultron Insights | UAE Banking, Structuring & Compliance Advisory',
  metaDescription:
    'Practical insights on banking, business structuring, compliance and financial challenges in the UAE for founders, investors, and international businesses.',

  hero: {
    eyebrow: 'ULTRON INSIGHTS',
    heading: [
      { text: 'Ultron ' },
      { text: 'Blogs', accent: true },
    ] as readonly HeadingSegment[],
    body: 'Real-world guidance on UAE banking, business setup, tax structuring and compliance, written from the cases we handle, not from the rulebook.',
  },

  listing: {
    eyebrow: 'Latest Articles',
    heading: [
      { text: 'Featured ' },
      { text: 'Insights', accent: true },
    ] as readonly HeadingSegment[],
  },

  pagination: {
    prevLabel: 'Previous',
    nextLabel: 'Next',
  },
} as const;
