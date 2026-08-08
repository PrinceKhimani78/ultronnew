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
    body: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
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
