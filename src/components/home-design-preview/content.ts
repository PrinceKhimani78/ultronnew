/**
 * Copy for `/home-design-preview`, transcribed verbatim from the Claude Design
 * export `Ulttron-Home.dc.html`.
 *
 * Deliberately NOT read from `src/content/*`. That directory holds the live
 * site's client-approved copy, which has already moved on from this comp — the
 * comp still carries the pre-approval figures ("100+", "30+"), the older
 * audience names, and two lorem ipsum blocks. Pointing this page at the shared
 * content would silently "fix" those differences and destroy the very
 * comparison the page exists to make.
 *
 * So: this file is a faithful record of the design, including its placeholders.
 * Nothing here should be promoted to the live site without client sign-off.
 */

/** ⚠️ Comp-era figures, superseded on the live site by 130+ / 35+. */
export const HERO = {
  headingLines: [
    [
      { text: 'Where ', tone: 'ink' },
      { text: 'Complex', tone: 'brand' },
    ],
    [
      { text: 'Becomes ', tone: 'brand' },
      { text: 'Possible.', tone: 'ink' },
    ],
  ],
  stats: [
    { icon: 'bank', label: '100+ Complex Bank Accounts Opened' },
    { icon: 'briefcase', label: '30+ Structured Business Setups' },
    { icon: 'globe', label: 'All Nationalities Welcome' },
  ],
  body: 'End-to-end business advisory for banking, company setup, compliance and financial structuring in the UAE. We handle what others won’t.',
  cta: 'EXPLORE',
} as const;

export const WHO_WE_HELP = {
  eyebrow: 'SERVING GLOBAL CLIENTS',
  heading: [
    { text: 'Who We ', tone: 'ink' },
    { text: 'Help', tone: 'brand' },
  ],
  body: 'Whether you’re entering the UAE market or expanding globally, we deliver tailored financial and business advisory solutions every step of the way.',
  cta: 'ABOUT US',
  /**
   * The comp's grid is asymmetric and hand-placed: the left column runs
   * wide / two-up / wide, the right column runs one fixed card above one that
   * stretches to fill. `span` records which of the two the card belongs to so
   * the layout is data-driven rather than six hard-coded slots.
   */
  cards: [
    {
      column: 'left',
      span: 'full',
      title: 'International Entrepreneurs',
      body: 'Whether you’re relocating or expanding into the UAE, we help establish the right business structure, navigate regulations, and secure the financial foundation needed for long-term success.',
    },
    {
      column: 'left',
      span: 'half',
      title: 'Foreign Investors',
      body: 'From market entry and company formation to banking and investment advisory, we help overseas investors confidently build and grow their presence in the UAE.',
    },
    {
      column: 'left',
      span: 'half',
      title: 'SMEs & Growing Businesses',
      body: 'As your business scales, so do its financial and operational challenges. We provide strategic guidance, banking solutions, and financial support to help you grow with confidence.',
    },
    {
      column: 'left',
      span: 'full',
      title: 'Startups & Founders',
      body: 'Building a business requires more than registration. We support founders with business setup, banking, financial planning, and practical advice from day one.',
    },
    {
      column: 'right',
      span: 'full',
      title: 'High-Net-Worth Individuals',
      body: 'For clients with complex financial requirements, we offer tailored advisory services, tax-efficient structuring, wealth-related financing, and bespoke banking solutions.',
    },
    {
      column: 'right',
      span: 'grow',
      title: 'Global Companies Expanding to the UAE',
      body: 'International businesses rely on us to simplify UAE market entry through company formation, corporate banking, financial advisory, and ongoing strategic support.',
    },
  ],
} as const;

export const CORE_SERVICES = {
  eyebrow: 'WHAT WE OFFER',
  heading: [
    { text: 'Our Core ', tone: 'ink' },
    { text: 'Services', tone: 'brand' },
  ],
  cta: 'VIEW MORE',
  /**
   * The comp draws only the third panel (Financial Advisory) — it is a static
   * frame, so the other five tabs have no detail content in the export. Rather
   * than invent five panels, the tab list is interactive and every tab shows
   * the one panel the design actually specifies, flagged in the UI. See the
   * note in DesignCoreServices.tsx.
   */
  tabs: [
    'Business Banking',
    'Business Setup',
    'Financial Advisory',
    'Tax Structuring Advisory',
    'Business Finance',
    'Real Estate Mortgages',
  ],
  activeIndex: 2,
  panel: {
    index: '3. Financial Advisory',
    title: 'Strategic Financial Guidance That Drives Growth',
    body: 'Every business reaches a stage where expert financial insight becomes essential. We help you make informed decisions, strengthen financial performance, and create strategies that support sustainable growth.',
    benefitsLabel: 'KEY BENEFITS',
    benefits: [
      'Financial planning and business analysis',
      'Cash flow and profitability strategies',
      'Growth and expansion planning',
      'Risk identification and mitigation',
      'Expert guidance for critical business decisions',
    ],
  },
} as const;

/**
 * ⚠️ The comp repeats "Initial Consultation" in all four timeline cards — the
 * frame was built before the step copy existed. Transcribed as drawn; the four
 * real step names live in `src/content/process.ts` on the live site.
 */
export const HOW_IT_WORKS = {
  eyebrow: 'OUR APPROACH',
  heading: 'How ULTRON Works',
  steps: [
    {
      title: 'Initial Consultation',
      body: 'Every engagement begins with a conversation. We take the time to understand your objectives, business structure, and unique requirements before recommending the right path forward.',
      image: '/assets/home-design-preview/process-1.webp',
    },
    {
      title: 'Initial Consultation',
      body: 'Every engagement begins with a conversation. We take the time to understand your objectives, business structure, and unique requirements before recommending the right path forward.',
      image: '/assets/home-design-preview/process-2.webp',
    },
    {
      title: 'Initial Consultation',
      body: 'Every engagement begins with a conversation. We take the time to understand your objectives, business structure, and unique requirements before recommending the right path forward.',
      image: '/assets/home-design-preview/process-3.webp',
    },
    {
      title: 'Initial Consultation',
      body: 'Every engagement begins with a conversation. We take the time to understand your objectives, business structure, and unique requirements before recommending the right path forward.',
      image: '/assets/home-design-preview/process-4.webp',
    },
  ],
} as const;

/**
 * `as const` on CONTACT narrows each field to its own literal shape, so an
 * optional key present on only one of them would not exist on the union. Typed
 * explicitly so `full` is readable across the whole list.
 */
export type DesignFormField = {
  readonly name: string;
  readonly label: string;
  readonly type: 'text' | 'email' | 'tel';
  readonly required: boolean;
  /** Spans both columns of the comp's two-up grid. */
  readonly full?: boolean;
};

export const CONTACT = {
  eyebrow: 'GET STARTED',
  headingLines: [
    [{ text: 'Start Your UAE', tone: 'ink' }],
    [
      { text: 'Business ', tone: 'ink' },
      { text: 'Journey', tone: 'brand' },
    ],
    [{ text: 'Today', tone: 'brand' }],
  ],
  /** ⚠️ Lorem ipsum in the source comp. Kept for fidelity — do not ship. */
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  cta: 'CONTACT US',
  form: {
    title: 'GET A FREE CONSULTATION',
    submitLabel: 'SUBMIT ENQUIRY',
    fields: [
      { name: 'fullName', label: 'FULL NAME', type: 'text', required: true },
      { name: 'email', label: 'EMAIL ADDRESS', type: 'email', required: true },
      { name: 'phone', label: 'PHONE NUMBER', type: 'tel', required: true },
      {
        name: 'businessType',
        label: 'BUSINESS TYPE',
        type: 'text',
        required: true,
      },
      {
        name: 'service',
        label: 'SERVICE INTERESTED IN',
        type: 'text',
        required: true,
        full: true,
      },
    ] as readonly DesignFormField[],
    messageLabel: 'MESSAGE',
  },
} as const;
