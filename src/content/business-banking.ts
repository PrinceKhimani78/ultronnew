import type { HeadingSegment } from '@/types/content';
import type { ProcessStep } from './process';

export const BUSINESS_BANKING_HERO = {
  eyebrow: 'BUSINESS BANKING',
  heading: [
    { text: 'Business ' },
    { text: 'Banking', accent: true },
  ] as readonly HeadingSegment[],
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
  ctaLabel: 'Get a Same-Day Feasibility Read',
  ctaHref: '#contact',
  trustStats: [
    { label: 'Bank Accounts Opened', value: '130+' },
    { label: 'Application Success', value: 'High Appetite' },
    { label: 'Fee Model', value: 'Success-Based' },
  ],
} as const;

export const BANKING_PROBLEMS = {
  eyebrow: 'THE REAL ROADBLOCKS',
  heading: [
    { text: 'The Banking Problems That ' },
    { text: 'Slow Businesses Down', accent: true },
  ] as readonly HeadingSegment[],
  introduction:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Business banking challenges rarely begin with one missing document. They usually come from a mismatch between company structure and bank criteria. Without proper alignment, applications face unexpected delays, compliance flags, or outright rejections.',
} as const;

export type SolutionDeskItem = {
  id: string;
  number: string;
  title: string;
  label: string;
  heading: string;
  description: string;
  whatWeAddress: readonly string[];
  ctaLabel: string;
  ctaHref: string;
};

export const ULTRON_SOLUTION_DESK = {
  eyebrow: 'OUR BUSINESS BANKING SUPPORT',
  heading: [
    { text: 'How ' },
    { text: 'Ultron Works', accent: true },
  ] as readonly HeadingSegment[],
  description:
    'Every banking case has a different obstacle. Ultron identifies what is preventing progress, builds the right strategy and provides focused support for the situation at hand.',
  items: [
    {
      id: 'opening-strategy',
      number: '01',
      title: 'Account Opening Strategy',
      label: 'NEW ACCOUNT APPLICATIONS',
      heading: 'Build the Application Around the Right Bank',
      description:
        'We assess the company, ownership profile, business activity and expected transactions before identifying suitable banking options.',
      whatWeAddress: [
        'Bank suitability',
        'Company and shareholder profile',
        'Expected account activity',
        'Required supporting evidence',
        'Application positioning',
      ],
      ctaLabel: 'Discuss Your Banking Case',
      ctaHref: '#contact',
    },
    {
      id: 'rejection-review',
      number: '02',
      title: 'Rejection Review',
      label: 'PREVIOUSLY DECLINED CASES',
      heading: 'Understand the Rejection Before Reapplying',
      description:
        'Repeated applications without addressing the underlying concern can make the case more difficult. We review the previous approach and identify likely weaknesses before recommending the next move.',
      whatWeAddress: [
        'Previous application history',
        'Likely risk indicators',
        'Ownership and activity concerns',
        'Documentation inconsistencies',
        'Reapplication strategy',
      ],
      ctaLabel: 'Review My Rejected Application',
      ctaHref: '#contact',
    },
    {
      id: 'compliance-prep',
      number: '03',
      title: 'Compliance Preparation',
      label: 'APPLICATION READINESS',
      heading: 'Present a Clear and Defensible Business Profile',
      description:
        'We organize the information banks need to understand the company, its commercial purpose, source of funds and expected transaction activity.',
      whatWeAddress: [
        'Source-of-funds evidence',
        'Business activity explanation',
        'Ownership documentation',
        'Transaction profile',
        'Supporting compliance records',
      ],
      ctaLabel: 'Check My Application Readiness',
      ctaHref: '#contact',
    },
    {
      id: 'issue-resolution',
      number: '04',
      title: 'Account Issue Resolution',
      label: 'EXISTING ACCOUNT CONCERNS',
      heading: 'Bring Structure to Restrictions and Reviews',
      description:
        'When an existing account is restricted or placed under review, we help organize the response and support clearer communication around the bank’s concerns.',
      whatWeAddress: [
        'Compliance information requests',
        'Restricted account activity',
        'Delayed transactions',
        'Missing supporting evidence',
        'Bank communication support',
      ],
      ctaLabel: 'Discuss an Account Issue',
      ctaHref: '#contact',
    },
    {
      id: 'growth-support',
      number: '05',
      title: 'Banking Growth Support',
      label: 'BUSINESS EXPANSION',
      heading: 'Strengthen the Banking Setup as the Business Grows',
      description:
        'Growing companies may need additional accounts, facilities or a banking structure that better reflects their developing operations.',
      whatWeAddress: [
        'Additional operating accounts',
        'Banking facility requirements',
        'Changing transaction volumes',
        'International activity',
        'Long-term banking structure',
      ],
      ctaLabel: 'Plan My Banking Expansion',
      ctaHref: '#contact',
    },
  ] as readonly SolutionDeskItem[],
} as const;

export type DifferentiatorItem = {
  id: string;
  title: string;
  description: string;
  proofPoint?: string;
};

export const WHY_CHOOSE_ULTRON = {
  eyebrow: 'WHY ULTRON FINANCIALS',
  heading: [
    { text: 'Why Businesses Choose ' },
    { text: 'Ultron Financials', accent: true },
  ] as readonly HeadingSegment[],
  items: [
    {
      id: 'strategy',
      title: 'Bank-Specific Application Strategy',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.',
      proofPoint: 'Targeted appetite matching',
    },
    {
      id: 'complex-cases',
      title: 'Complex Case Experience',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
      proofPoint: 'Root-cause analysis expertise',
    },
    {
      id: 'compliance-led',
      title: 'Compliance-Led Preparation',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
      proofPoint: 'Senior advisor oversight',
    },
    {
      id: 'feasibility',
      title: 'Clear Feasibility Assessment',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      proofPoint: 'No upfront false claims',
    },
    {
      id: 'coordination',
      title: 'End-to-End Coordination',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.',
      proofPoint: 'Complete turnkey support',
    },
    {
      id: 'ongoing-support',
      title: 'Support Beyond Submission',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
      proofPoint: 'Dedicated relationship lead',
    },
  ] as readonly DifferentiatorItem[],
} as const;

export const BANKING_PROCESS_INTRO = {
  eyebrow: 'A CLEAR PATH FORWARD',
  heading: [
    { text: 'Step-by-Step ' },
    { text: 'Banking Process', accent: true },
  ] as readonly HeadingSegment[],
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
} as const;

export const BANKING_PROCESS_STEPS: readonly ProcessStep[] = [
  {
    step: '01',
    title: 'Initial Feasibility Review',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/brand/process-consultation.webp',
  },
  {
    step: '02',
    title: 'Business and Shareholder Assessment',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    image: '/brand/process-strategy.webp',
  },
  {
    step: '03',
    title: 'Bank Selection Strategy',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
    image: '/brand/process-execution.webp',
  },
  {
    step: '04',
    title: 'Document Preparation',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui.',
    image: '/brand/process-support.webp',
  },
  {
    step: '05',
    title: 'Application Coordination',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.',
    image: '/brand/process-consultation.webp',
  },
  {
    step: '06',
    title: 'Follow-Up and Account Support',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
    image: '/brand/process-strategy.webp',
  },
] as const;

export type FaqItem = {
  question: string;
  answer: string;
};

export const BANKING_FAQS: readonly FaqItem[] = [
  {
    question: 'How long does it take to open a UAE business bank account?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    question: 'Can Ultron help if my previous application was rejected?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.',
  },
  {
    question:
      'Which documents are normally required for a UAE business bank account?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.',
  },
  {
    question: 'Can non-UAE residents open a business bank account?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod semper.',
  },
  {
    question: 'Does every UAE company qualify for every bank?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.',
  },
  {
    question: 'Can you assist with an existing restricted or frozen account?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Maecenas sed diam eget risus varius blandit sit amet non magna.',
  },
  {
    question: 'Do I need to visit the UAE during the account opening process?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur. Etiam porta sem malesuada magna mollis euismod.',
  },
  {
    question: 'How does the initial feasibility assessment work?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Nullabam id dolor id nibh ultricies vehicula ut id elit.',
  },
];

export const BANKING_CTA = {
  eyebrow: 'YOUR NEXT STEP',
  heading: [
    { text: 'Ready to Move Your Business ' },
    { text: 'Banking Forward?', accent: true },
  ] as readonly HeadingSegment[],
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  ctaLabel: 'Get a Same-Day Feasibility Read',
  ctaHref: '#contact',
} as const;
