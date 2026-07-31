import type { HeadingSegment } from '@/types/content';

export type WhoWeHelpItem = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  size?: 'wide' | 'tall' | 'standard';
  order: number;
};

export const WHO_WE_HELP_HEADER = {
  eyebrow: 'SERVING GLOBAL CLIENTS',
  heading: [
    { text: 'Who We ' },
    { text: 'Help', accent: true },
  ] as readonly HeadingSegment[],
  body: "We don't have a typical client. What we have is a typical situation: something that should have worked, didn't.",
  cta: { label: 'ABOUT US', href: '#about' },
};

export const WHO_WE_HELP_CARDS: readonly WhoWeHelpItem[] = [
  {
    id: 'uae-smes-operating-businesses',
    title: 'UAE-Based SMEs & Operating Businesses',
    description:
      'Revenue is coming in, operations are running, then a bank flags the account or a loan gets declined with no clear explanation. We find the trigger and resolve it.',
    size: 'wide',
    order: 1,
  },
  {
    id: 'high-net-worth',
    title: 'Family Offices & Multi-Entity Groups',
    description:
      'Holding companies, trusts and entities spread across jurisdictions, built for control and succession, not simplicity. We design and reposition these so they hold up under scrutiny.',
    size: 'tall',
    order: 2,
  },
  {
    id: 'foreign-investors',
    title: 'Founders & Entrepreneurs',
    description:
      "The idea, the capital and the plan are all there. What's missing is a structure a UAE bank will actually approve. We fix that before it becomes a bigger problem.",
    size: 'standard',
    order: 3,
  },
  {
    id: 'smes-growing-businesses',
    title: 'Resident & Non-Resident Investors',
    description:
      "Multi-jurisdiction income and assets, spread across a profile no single bank's checklist was built for. We present it in a way that satisfies compliance without losing the nuance.",
    size: 'standard',
    order: 4,
  },
  {
    id: 'startups-founders',
    title: 'Real Estate Professionals',
    description:
      "Mortgage cases that stall after valuation. Strong financials, but income the lenders can't categorise. We handle the repositioning and see it through.",
    size: 'wide',
    order: 5,
  },
  {
    id: 'global-companies',
    title: 'Global Companies Expanding to the UAE',
    description:
      'International businesses rely on us to simplify UAE market entry through company formation, corporate banking, financial advisory, and ongoing strategic support.',
    size: 'standard',
    order: 6,
  },
] as const;
