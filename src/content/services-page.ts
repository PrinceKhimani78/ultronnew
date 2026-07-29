import type { HeadingSegment } from '@/types/content';

/**
 * Copy for the Services route.
 *
 * The service catalogue itself lives in `content/services.ts` — this file holds
 * only what is specific to the page that presents it, so the home page's Core
 * Services band and this route cannot drift into describing the firm
 * differently.
 *
 * The design carries lorem ipsum in the hero subtitle and the intro paragraph.
 * Both are written here as real copy at the same length and rhythm; replace if
 * the client has approved different wording.
 */

export const SERVICES_PAGE = {
  metaTitle: 'Services',
  metaDescription:
    'Business banking, company setup, financial advisory, tax structuring, business finance and mortgages for businesses operating in or entering the UAE.',

  hero: {
    heading: [
      { text: 'Our ' },
      { text: 'Services', accent: true },
    ] as readonly HeadingSegment[],
    body: 'Six disciplines, delivered by one firm, so nothing falls between two advisers who each assumed the other had it. Every engagement is led by a named adviser and quoted against a written scope.',
  },

  intro: {
    eyebrow: 'What we offer',
    heading: [
      { text: 'Our Services ' },
      { text: 'Include', accent: true },
    ] as readonly HeadingSegment[],
    body: 'We work with businesses entering the UAE and with those already here whose structure no longer fits. That ranges from a first licence and a first bank account through to restructuring an entity that was formed into the wrong jurisdiction. Where a file has already been declined elsewhere, we establish why before going back.',
  },

  /** Labels for the per-card disclosure. Kept here so no component hardcodes copy. */
  card: {
    expandLabel: 'View more',
    collapseLabel: 'View less',
    benefitsLabel: 'Key benefits',
  },
} as const;
