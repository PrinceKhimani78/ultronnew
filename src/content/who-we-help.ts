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
  body: 'Whether you’re entering the UAE market or expanding globally, we deliver tailored financial and business advisory solutions every step of the way.',
  cta: { label: 'ABOUT US', href: '#about' },
};

export const WHO_WE_HELP_CARDS: readonly WhoWeHelpItem[] = [
  {
    id: 'international-entrepreneurs',
    title: 'International Entrepreneurs',
    description:
      'Whether you’re relocating or expanding into the UAE, we help establish the right business structure, navigate regulations, and secure the financial foundation needed for long-term success.',
    size: 'wide',
    order: 1,
  },
  {
    id: 'foreign-investors',
    title: 'Foreign Investors',
    description:
      'From market entry and company formation to banking and investment advisory, we help overseas investors confidently build and grow their presence in the UAE.',
    size: 'standard',
    order: 2,
  },
  {
    id: 'smes-growing-businesses',
    title: 'SMEs & Growing Businesses',
    description:
      'As your business scales, so do its financial and operational challenges. We provide strategic guidance, banking solutions, and financial support to help you grow with confidence.',
    size: 'standard',
    order: 3,
  },
  {
    id: 'startups-founders',
    title: 'Startups & Founders',
    description:
      'Building a business requires more than registration. We support founders with business setup, banking, financial planning, and practical advice from day one.',
    size: 'wide',
    order: 4,
  },
  {
    id: 'high-net-worth',
    title: 'High-Net-Worth Individuals',
    description:
      'For clients with complex financial requirements, we offer tailored advisory services, tax-efficient structuring, wealth-related financing, and bespoke banking solutions.',
    size: 'tall',
    order: 5,
  },
  {
    id: 'global-companies',
    title: 'Global Companies Expanding to the UAE',
    description:
      'International businesses rely on us to simplify UAE market entry through company formation, corporate banking, financial advisory, and ongoing strategic support.',
    size: 'tall',
    order: 6,
  },
] as const;
