import { SITE, WHATSAPP_URL } from '@/content/site';
import type { HeadingSegment } from '@/types/content';

/**
 * Home page copy, reconciled against the Figma design.
 *
 * Headings are stored as `HeadingSegment[]` rather than as one string, because
 * the design colours individual words. See `types/content.ts` for the rationale.
 */

export const HOME_HERO = {
  /**
   * Carries the firm name explicitly: the home page shares a segment with the
   * root layout, so `title.template` does not apply to it.
   */
  metaTitle: `${SITE.name} — UAE company formation, banking and compliance`,
  metaDescription:
    'End-to-end business advisory for banking, company setup, compliance and financial structuring in the UAE. We handle what others won’t.',

  heading: [
    { text: 'Where ' },
    { text: 'Complex ', accent: true },
    { text: 'Becomes ', accent: true },
    { text: 'Possible.' },
  ] as readonly HeadingSegment[],

  body: 'End-to-end business advisory for banking, company setup, compliance and financial structuring in the UAE. We handle what others won’t.',

  cta: { label: 'WhatsApp Us Now', href: WHATSAPP_URL },

  /**
   * Client-supplied figures, replacing the numbers taken from the design comp.
   *
   * These are now the firm's own claims rather than invented placeholders, so
   * the hard "must not ship" block is lifted. They remain performance claims on
   * a financial services site: the firm should be able to evidence "130+" and
   * "35+" on request, and the figures need a review date so they do not quietly
   * go stale.
   */
  stats: [
    { icon: 'bank', value: '130+', label: 'Bank Accounts Opened' },
    { icon: 'briefcase', value: '35+', label: 'Business Setups Structured' },
    { icon: 'globe', value: 'All', label: 'Nationalities Welcome' },
    { icon: 'check', value: 'End-to-End', label: 'Solutions Delivered' },
  ],
} as const;

export const WHAT_WE_DELIVER = {
  eyebrow: 'WHAT WE DELIVER',
  items: [
    {
      segments: [
        { text: 'We simplify ', accent: false },
        { text: 'complex ', accent: false },
        { text: 'business setups.', accent: true },
      ],
    },
    {
      segments: [
        { text: 'We open doors to ', accent: false },
        { text: 'UAE corporate banking.', accent: true },
      ],
    },
    {
      segments: [
        { text: 'We structure businesses for ', accent: false },
        { text: 'long-term growth.', accent: true },
      ],
    },
    {
      segments: [
        { text: 'We turn ', accent: false },
        { text: 'financial ', accent: true },
        { text: 'complexity into clarity.', accent: false },
      ],
    },
    {
      segments: [
        { text: 'We help ambitious businesses expand with ', accent: false },
        { text: 'confidence.', accent: true },
      ],
    },
  ],
  scrollLabel: 'SCROLL TO EXPLORE',
} as const;

export const WHO_WE_HELP = {
  eyebrow: 'Serving global clients',
  heading: [
    { text: 'Who We ' },
    { text: 'Help', accent: true },
  ] as readonly HeadingSegment[],
  body: 'We don’t have a typical client. What we have is a typical situation: something that should have worked, didn’t.',
  cta: { label: 'About us', href: '#about' },
  /**
   * Five audiences, client-approved. `image` is set on three of them: only
   * three illustrations were supplied, and illustrating some but not all is
   * also what the design does — a picture on every card flattens the grid's
   * rhythm.
   *
   * `alt` is empty on all of them because each illustration restates its card's
   * heading; announcing "globe with businessman and city skyline" to a screen
   * reader adds nothing a reader of the heading does not already have.
   */
  audiences: [
    {
      title: 'UAE-Based SMEs & Operating Businesses',
      body: 'Revenue is coming in, operations are running, then a bank flags the account or a loan gets declined with no clear explanation. We find the trigger and resolve it.',
      image: '/brand/audience-entrepreneurs.webp',
    },
    {
      title: 'Founders & Entrepreneurs',
      body: 'The idea, capital and plan are all there. What’s missing is a structure that a UAE bank will actually approve. We fix that before it becomes a bigger problem.',
      image: '/brand/audience-startups.webp',
    },
    {
      title: 'Resident & Non-Resident Investors',
      body: 'Multi-jurisdiction income and assets across countries, a profile no single bank’s checklist was built for. We present it in a way that satisfies compliance without losing the nuance.',
      image: '/brand/audience-uae-expansion.webp',
    },
    {
      title: 'Family Offices & Multi-Entity Groups',
      body: 'Holding companies, trusts and entities spread across jurisdictions, built for control and succession, not simplicity. We design and reposition these so they hold up under scrutiny.',
    },
    {
      title: 'Real Estate Professionals',
      body: 'Mortgage cases that stall after valuation. Strong financials, but income that lenders struggle to categorise. We handle the repositioning and see it through.',
    },
  ],
} as const;

export const SERVICES_INTRO = {
  eyebrow: 'Our Core Services',
  heading: [
    { text: 'Our Core ' },
    { text: 'Services', accent: true },
  ] as readonly HeadingSegment[],
  description:
    'Specialised financial, banking and business advisory services designed for entrepreneurs, investors and companies operating in the UAE.',
  cta: { label: 'Explore services', href: '#contact' },
} as const;

export const ABOUT = {
  eyebrow: 'About Ultron',
  heading: [
    { text: 'We handle what ' },
    { text: 'others won’t', accent: true },
    { text: '.' },
  ] as readonly HeadingSegment[],
  body: [
    `${SITE.name} is a corporate advisory firm in the UAE. We advise international businesses on market entry — choosing the right jurisdiction, forming the entity, opening corporate banking, and holding the compliance calendar afterwards.`,
    'Every engagement is led by a named adviser who stays with the file, and we quote a fixed fee against a written scope so the number you agree is the number you pay.',
  ],
  points: [
    'One named adviser for the life of the relationship',
    'Fixed fees against an approved written scope',
    'We will tell you when the UAE is the wrong answer',
  ],
} as const;

/**
 * The differentiator band. Not present in the reviewed Figma frames — retained
 * from the agreed twelve-section brief and restyled to the reconciled design
 * language. See HOME_PAGE_REVIEW.md.
 */
export const COMPLEX_CASES = {
  eyebrow: 'Complex case expertise',
  heading: [
    { text: 'The files other agents ' },
    { text: 'decline', accent: true },
    { text: '.' },
  ] as readonly HeadingSegment[],
  body: 'Volume operators are built for a standard formation with a clean shareholder and a simple corridor. When a file leaves that shape, it stalls. These are the cases we are built for.',
  cases: [
    {
      title: 'Multi-jurisdiction shareholders',
      body: 'Corporate shareholders held across several countries, requiring attested chains of ownership and a look-through the bank will accept.',
    },
    {
      title: 'Previously rejected banking',
      body: 'An account application already declined once. We establish why before reapplying, because a second identical file gets a second identical answer.',
    },
    {
      title: 'Restructuring an existing entity',
      body: 'A UAE company formed into the wrong jurisdiction or licence, needing migration without interrupting trade or invalidating visas.',
    },
    {
      title: 'Regulated and high-risk activities',
      body: 'Sectors carrying additional approvals or enhanced due diligence, where the licence and the banking must be sequenced together.',
    },
  ],
} as const;

/** Not present in the reviewed Figma frames — see HOME_PAGE_REVIEW.md. */
export const WHY_CHOOSE = {
  eyebrow: 'Why clients choose us',
  heading: [
    { text: 'Precision, not ' },
    { text: 'volume', accent: true },
    { text: '.' },
  ] as readonly HeadingSegment[],
  reasons: [
    {
      title: 'A named adviser, not a ticket queue',
      body: 'The person who scopes your structure signs off your first compliance filing. You will not re-explain your business to a new account manager.',
    },
    {
      title: 'Fixed fees against a written scope',
      body: 'You approve the scope and the fee before anything is filed. No headline price that grows once the work is underway.',
    },
    {
      title: 'Banking treated as the hard part',
      body: 'Because it is. We select the bank against your profile and build the file to that bank’s standard, in parallel with formation.',
    },
    {
      title: 'We decline work that will not hold',
      body: 'If the structure you want cannot be defended, we say so before you pay for it. That is the whole value of a boutique.',
    },
  ],
} as const;

export const CTA_CONTACT = {
  eyebrow: 'Get started',
  heading: [
    { text: 'Start Your UAE Business ' },
    { text: 'Journey ', accent: true },
    { text: 'Today', accent: true },
  ] as readonly HeadingSegment[],
  /** Client-approved copy, replacing the design's lorem ipsum. */
  body: 'Most of our best work starts with a client who was told no elsewhere. Share your situation and we will give you an honest assessment.',
  cta: { label: 'Contact us', href: `mailto:${SITE.email}` },
  form: {
    title: 'Get a free consultation',
    submitLabel: 'Submit enquiry',
    /**
     * ⚠️ A response-time promise the firm has not stated in its own copy.
     * TODO(client): confirm one working day is accurate, or delete this line —
     * an unmet commitment on the conversion band is worse than no commitment.
     */
    reassurance: 'We reply to every enquiry within one working day.',
  },
} as const;
