/**
 * The service catalogue — the six services with exact approved content.
 */

export type ServiceProcessStep = {
  step: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

/**
 * Per-section teal highlight phrases.
 * Each value is the exact phrase (case-insensitive substring) inside the
 * associated heading that should render in Ultron teal (#035551).
 * Leave a field undefined to render that heading entirely in near-black.
 */
export type ServiceHighlights = {
  hero?: string;
  advantages?: string;
  process?: string;
  whyUltron?: string;
  faqs?: string;
  cta?: string;
};

export type Service = {
  slug: string;
  number: string;
  title: string;
  headline: string;
  tagline: string;
  description: string;
  benefits: readonly string[];
  advantages: {
    headline: string;
    subtext: string;
  };
  process: {
    headline: string;
    subtext: string;
    steps: readonly ServiceProcessStep[];
  };
  whyUltron: {
    introduction: string;
    points: readonly string[];
  };
  faqs: readonly ServiceFaqItem[];
  cta: {
    headline: string;
    subtext: string;
    buttonLabel: string;
  };
  /** Teal highlight phrases for each section heading. Optional — absent = plain black. */
  highlights?: ServiceHighlights;
};

export const SERVICES: readonly Service[] = [
  {
    slug: 'business-banking',
    number: '1',
    title: 'Business Banking',
    headline: 'Banking Built Around Your Actual Profile',
    tagline:
      'Corporate accounts for nationalities and activities standard applications struggle with.',
    description:
      'Corporate accounts for nationalities and activities standard applications struggle with.',
    benefits: [
      'Structuring for complex ownership and multi jurisdiction income',
      'Documentation reviewed before it reaches a bank',
      'Introductions to banks with real appetite for your profile',
      'Support through every compliance query',
      'One direct point of contact throughout',
    ],
    advantages: {
      headline: 'Why Businesses Come to Us for Banking',
      subtext: 'Most rejections come down to positioning, not eligibility.',
    },
    process: {
      headline: 'How We Get Your Account Approved',
      subtext: 'A process built on why applications actually fail.',
      steps: [
        {
          step: 'STEP 01',
          title: 'Initial Review',
          description: 'We flag anything a bank might question.',
          imageSrc: '/brand/banking-process-01.jpg',
          imageAlt: 'Initial Review',
        },
        {
          step: 'STEP 02',
          title: 'Positioning',
          description:
            'We rebuild the application to answer those questions upfront.',
          imageSrc: '/brand/banking-process-02.jpg',
          imageAlt: 'Positioning',
        },
        {
          step: 'STEP 03',
          title: 'Submission',
          description:
            'We approach banks with genuine appetite for your profile.',
          imageSrc: '/brand/banking-process-03.jpg',
          imageAlt: 'Submission',
        },
        {
          step: 'STEP 04',
          title: 'Resolution',
          description: 'We stay involved until the account is active.',
          imageSrc: '/brand/banking-process-04.jpg',
          imageAlt: 'Resolution',
        },
      ],
    },
    whyUltron: {
      introduction:
        'Account decisions come down to how a case is built, not just whether you qualify.',
      points: [
        'We address the reason behind a decline, not just the paperwork',
        'We approach only banks that fit your profile',
        'We stay engaged until the account is open',
      ],
    },
    faqs: [
      {
        question: 'Can you help if my application was declined?',
        answer: 'Yes, we review why and rebuild the case before reapplying.',
      },
      {
        question: 'Do you work with higher risk activities?',
        answer: 'Yes, provided the business is legitimate.',
      },
      {
        question: 'How long does account opening take?',
        answer:
          'It depends on your profile, we will give a realistic estimate upfront.',
      },
      {
        question: "Will you tell me honestly if my case won't work?",
        answer: 'Yes, we assess feasibility before taking on a case.',
      },
      {
        question: 'Do I need a company already set up?',
        answer: 'No, we can factor banking into the setup itself.',
      },
    ],
    cta: {
      headline: 'Start With a Structure That Works',
      subtext: 'Tell us about your business and we will map out the setup.',
      buttonLabel: 'Talk to Us',
    },
    highlights: {
      hero: 'Around Your',
      advantages: 'for Banking',
      process: 'Approved',
      whyUltron: 'Choose Us',
      faqs: 'Questions',
    },
  },
  {
    slug: 'business-setup',
    number: '2',
    title: 'Business Setup',
    headline: 'Company Structures Built to Actually Operate',
    tagline:
      'Mainland, free zone and offshore formation, structured for how you will bank and grow.',
    description:
      'Mainland, free zone and offshore formation, structured for how you will bank and grow.',
    benefits: [
      'Jurisdiction and licence selection matched to your activity',
      'Ownership structuring built to survive bank scrutiny',
      'Full handling of registration and documentation',
      'Setup coordinated with account opening',
      'One advisor from first call to operational readiness',
    ],
    advantages: {
      headline: 'What Sets Our Setup Process Apart',
      subtext:
        'The structure behind the licence matters more than the licence itself.',
    },
    process: {
      headline: 'From Idea to Operational Business',
      subtext: 'A sequence built to avoid rework later.',
      steps: [
        {
          step: 'STEP 01',
          title: 'Consultation',
          description: 'We understand your activity and banking plans.',
          imageSrc: '/brand/setup-process-01.jpg',
          imageAlt: 'Consultation',
        },
        {
          step: 'STEP 02',
          title: 'Structuring',
          description: 'We design the jurisdiction and ownership structure.',
          imageSrc: '/brand/setup-process-02.jpg',
          imageAlt: 'Structuring',
        },
        {
          step: 'STEP 03',
          title: 'Registration',
          description: 'We manage filings and government processes.',
          imageSrc: '/brand/setup-process-03.jpg',
          imageAlt: 'Registration',
        },
        {
          step: 'STEP 04',
          title: 'Handover',
          description: 'We coordinate your transition into banking.',
          imageSrc: '/brand/setup-process-04.jpg',
          imageAlt: 'Handover',
        },
      ],
    },
    whyUltron: {
      introduction:
        'Most setup problems surface later, at the bank or at renewal. We structure for what comes after.',
      points: [
        'Structures built with banking in mind from day one',
        'Direct involvement in registration, not outsourced',
        'Support continues after the company is formed',
      ],
    },
    faqs: [
      {
        question: 'Which jurisdiction is right for me?',
        answer:
          'It depends on your activity and banking needs, we will assess and recommend.',
      },
      {
        question: 'Can you restructure an existing company?',
        answer: 'Yes, we regularly fix setups causing banking issues.',
      },
      {
        question: 'How long does formation take?',
        answer:
          'It depends on jurisdiction, we will give a realistic timeline.',
      },
      {
        question: 'Will I be able to open an account after setup?',
        answer: 'Yes, we structure with banking in mind from the start.',
      },
      {
        question: 'Do you handle visas too?',
        answer: 'We ensure the structure supports visa processes correctly.',
      },
    ],
    cta: {
      headline: 'Start With a Structure That Works',
      subtext: 'Tell us about your business and we will map out the setup.',
      buttonLabel: 'Talk to Us',
    },
    highlights: {
      hero: 'Built to Actually Operate',
      advantages: 'Setup Process Apart',
      process: 'Operational Business',
      whyUltron: 'Choose Us',
      faqs: 'Questions',
    },
  },
  {
    slug: 'business-finance',
    number: '3',
    title: 'Business Finance',
    headline: 'Financing Matched to Lenders Who Actually Say Yes',
    tagline:
      'Secured and unsecured business loans, matched to real lender appetite.',
    description:
      'Secured and unsecured business loans, matched to real lender appetite.',
    benefits: [
      'Secured and unsecured facilities, including POS finance',
      'Working capital finance options',
      'Lender shortlisting based on real appetite',
      'Documentation structured for underwriting',
      'Managed through to funding',
    ],
    advantages: {
      headline: 'How We Approach Business Financing',
      subtext: 'We narrow the field before we submit anything.',
    },
    process: {
      headline: 'How We Get a Facility Approved',
      subtext: 'A process built around lender fit.',
      steps: [
        {
          step: 'STEP 01',
          title: 'Assessment',
          description: 'We review your financing need and financials.',
          imageSrc: '/brand/finance-process-01.jpg',
          imageAlt: 'Assessment',
        },
        {
          step: 'STEP 02',
          title: 'Structuring',
          description: 'We prepare documentation for underwriting.',
          imageSrc: '/brand/finance-process-02.jpg',
          imageAlt: 'Structuring',
        },
        {
          step: 'STEP 03',
          title: 'Matching',
          description: 'We approach lenders that genuinely fit.',
          imageSrc: '/brand/finance-process-03.jpg',
          imageAlt: 'Matching',
        },
        {
          step: 'STEP 04',
          title: 'Funding',
          description: 'We manage the process through to disbursement.',
          imageSrc: '/brand/finance-process-04.jpg',
          imageAlt: 'Funding',
        },
      ],
    },
    whyUltron: {
      introduction:
        'Financing outcomes come down to fit, not just financial strength.',
      points: [
        'Lenders shortlisted by real appetite, not a mailout',
        'Documentation structured the way underwriting reads it',
        'Involvement through to disbursement',
      ],
    },
    faqs: [
      {
        question: 'What financing do you arrange?',
        answer: 'Secured and unsecured business loans and POS finance.',
      },
      {
        question: 'Been declined before?',
        answer:
          'A decline often reflects lender mismatch, we reassess and refit.',
      },
      {
        question: 'How much can I qualify for?',
        answer:
          'Depends on financials and sector, we will give a realistic range.',
      },
      {
        question: 'How long does it take?',
        answer: 'Varies by lender, a structured application moves faster.',
      },
      {
        question: 'UAE lenders only?',
        answer: 'Mostly, though we consider others where they genuinely fit.',
      },
    ],
    cta: {
      headline: 'Start With a Structure That Works',
      subtext: 'Tell us about your business and we will map out the setup.',
      buttonLabel: 'Talk to Us',
    },
    highlights: {
      hero: 'Lenders Who Actually Say Yes',
      advantages: 'Business Financing',
      process: 'Facility Approved',
      whyUltron: 'Choose Us',
      faqs: 'Questions',
    },
  },
  {
    slug: 'real-estate-mortgages',
    number: '4',
    title: 'Real Estate Mortgages',
    headline: "Mortgages for Cases That Don't Fit a Standard Checklist",
    tagline:
      'Residential, commercial and off plan mortgages, including cases stalled elsewhere.',
    description:
      'Residential, commercial and off plan mortgages, including cases stalled elsewhere.',
    benefits: [
      'Mortgages for residents and non-residents',
      'Commercial mortgages for offices, warehouses and retail units',
      'Off plan mortgages with staged disbursement',
      'Equity release and loan against property',
      'Repositioning of stalled cases',
    ],
    advantages: {
      headline: 'Why Mortgage Cases Come to Us',
      subtext: 'Declines usually come down to presentation, not viability.',
    },
    process: {
      headline: 'How We Move a Mortgage Case Forward',
      subtext: 'A process built to fix what went wrong before.',
      steps: [
        {
          step: 'STEP 01',
          title: 'Case Review',
          description: 'We assess income, assets and prior flags.',
          imageSrc: '/brand/process-consultation.webp',
          imageAlt: 'Case Review',
        },
        {
          step: 'STEP 02',
          title: 'Repositioning',
          description: 'We restructure how the case is presented.',
          imageSrc: '/brand/process-strategy.webp',
          imageAlt: 'Repositioning',
        },
        {
          step: 'STEP 03',
          title: 'Lender Matching',
          description: 'We approach lenders that genuinely fit.',
          imageSrc: '/brand/process-execution.webp',
          imageAlt: 'Lender Matching',
        },
        {
          step: 'STEP 04',
          title: 'Completion',
          description: 'We manage the process through to disbursement.',
          imageSrc: '/brand/process-support.webp',
          imageAlt: 'Completion',
        },
      ],
    },
    whyUltron: {
      introduction:
        'Mortgage cases fail on presentation, not qualification. We build for that.',
      points: [
        'Cases reviewed for the specific reason they stalled',
        'Coverage across residential, commercial and off plan',
        'Managed through to disbursement',
      ],
    },
    faqs: [
      {
        question: 'Declined before?',
        answer:
          'Yes we can help, we review why and restructure before reapplying.',
      },
      {
        question: 'Do you work with non-residents?',
        answer: 'Yes, this is a large part of what we handle.',
      },
      {
        question: 'Off plan financing?',
        answer: 'Yes, coordinated with developer documentation.',
      },
      {
        question: 'Multi jurisdiction income?',
        answer: 'Yes, we present it in a way lenders can assess.',
      },
      {
        question: 'Commercial mortgages?',
        answer: 'Yes, including offices, warehouses and retail units.',
      },
    ],
    cta: {
      headline: 'Start With a Structure That Works',
      subtext: 'Tell us about your business and we will map out the setup.',
      buttonLabel: 'Talk to Us',
    },
    highlights: {
      hero: "Don't Fit a Standard Checklist",
      advantages: 'Mortgage Cases',
      process: 'Mortgage Case Forward',
      whyUltron: 'Choose Us',
      faqs: 'Questions',
    },
  },
  {
    slug: 'trade-finance',
    number: '5',
    title: 'Trade Finance',
    headline: 'Trade Finance That Keeps Cash Flow Moving',
    tagline:
      'Invoice discounting, letters of credit, bank guarantees and supplier payment finance.',
    description:
      'Invoice discounting, letters of credit, bank guarantees and supplier payment finance.',
    benefits: [
      'Invoice discounting against receivables',
      'Letters of credit for import and export',
      'Bank guarantees for contracts and tenders',
      'Supplier payment finance',
      'Overdraft facilities for working capital',
    ],
    advantages: {
      headline: 'What Our Trade Finance Covers',
      subtext: 'Facilities matched to how your trade cycle actually runs.',
    },
    process: {
      headline: 'How We Structure a Trade Finance Facility',
      subtext: 'Built around your trade cycle, not a standard product.',
      steps: [
        {
          step: 'STEP 01',
          title: 'Assessment',
          description: 'We review your trade cycle and financing need.',
          imageSrc: '/brand/process-consultation.webp',
          imageAlt: 'Assessment',
        },
        {
          step: 'STEP 02',
          title: 'Structuring',
          description: 'We match the facility type to your requirement.',
          imageSrc: '/brand/process-strategy.webp',
          imageAlt: 'Structuring',
        },
        {
          step: 'STEP 03',
          title: 'Lender Matching',
          description: 'We approach institutions with trade finance appetite.',
          imageSrc: '/brand/process-execution.webp',
          imageAlt: 'Lender Matching',
        },
        {
          step: 'STEP 04',
          title: 'Activation',
          description: 'We manage the process through to activation.',
          imageSrc: '/brand/process-support.webp',
          imageAlt: 'Activation',
        },
      ],
    },
    whyUltron: {
      introduction:
        'Trade finance only works if the facility matches the trade cycle. We structure for that fit.',
      points: [
        'Facilities matched to how your trade cycle runs',
        'Coverage across LCs, guarantees and discounting',
        'Managed through to activation',
      ],
    },
    faqs: [
      {
        question: 'What is invoice discounting?',
        answer:
          'Financing raised against unpaid invoices to release cash faster.',
      },
      {
        question: 'Do you arrange import and export LCs?',
        answer: 'Yes, both.',
      },
      {
        question: 'What are bank guarantees used for?',
        answer: 'Contracts, tenders and supplier commitments.',
      },
      {
        question: 'Can you help with supplier payment terms?',
        answer: 'Yes, we structure supplier payment finance facilities.',
      },
      {
        question: 'Do you work with SMEs?',
        answer: 'Yes, alongside larger trading operations.',
      },
    ],
    cta: {
      headline: 'Start With a Structure That Works',
      subtext: 'Tell us about your business and we will map out the setup.',
      buttonLabel: 'Talk to Us',
    },
    highlights: {
      hero: 'Keeps Cash Flow Moving',
      advantages: 'Trade Finance Covers',
      process: 'Trade Finance Facility',
      whyUltron: 'Choose Us',
      faqs: 'Questions',
    },
  },
  {
    slug: 'compliance-regulatory-advisory',
    number: '6',
    title: 'Compliance & Regulatory Advisory',
    headline: 'Compliance That Holds Up Under Scrutiny',
    tagline:
      'AML, ESR, UBO compliance and transaction monitoring for UAE businesses.',
    description:
      'AML, ESR, UBO compliance and transaction monitoring for UAE businesses.',
    benefits: [
      'AML and CFT compliance reviews',
      'Economic Substance Regulations filings',
      'UBO declaration and compliance support',
      'Transaction monitoring frameworks',
      'Regulatory filing support and documentation',
    ],
    advantages: {
      headline: 'What Our Compliance Advisory Covers',
      subtext:
        'Built around your actual risk exposure, not a generic checklist.',
    },
    process: {
      headline: 'How We Manage Your Compliance Position',
      subtext: 'A structured review, not a one off filing.',
      steps: [
        {
          step: 'STEP 01',
          title: 'Review',
          description: 'We assess your current compliance position.',
          imageSrc: '/brand/process-consultation.webp',
          imageAlt: 'Review',
        },
        {
          step: 'STEP 02',
          title: 'Gap Analysis',
          description: 'We identify exposure and missing filings.',
          imageSrc: '/brand/process-strategy.webp',
          imageAlt: 'Gap Analysis',
        },
        {
          step: 'STEP 03',
          title: 'Remediation',
          description: 'We put the required framework in place.',
          imageSrc: '/brand/process-execution.webp',
          imageAlt: 'Remediation',
        },
        {
          step: 'STEP 04',
          title: 'Ongoing Support',
          description: 'We manage filings as they come due.',
          imageSrc: '/brand/process-support.webp',
          imageAlt: 'Ongoing Support',
        },
      ],
    },
    whyUltron: {
      introduction:
        'Compliance gaps surface at the worst time, during a bank review or audit. We close them before that happens.',
      points: [
        'Reviews based on your actual risk exposure',
        'Coverage across AML, ESR, UBO and transaction monitoring',
        'Ongoing support, not a one time filing',
      ],
    },
    faqs: [
      {
        question: 'Do I need a BREA assessment?',
        answer:
          'It applies to certain regulated activities, we will confirm if it applies to you.',
      },
      {
        question: 'Do you handle ESR filings?',
        answer: 'Yes, including notification and reporting.',
      },
      {
        question: 'What is UBO compliance?',
        answer:
          'Declaring your ultimate beneficial owners to the relevant authority.',
      },
      {
        question: 'Can you help with an existing compliance gap?',
        answer: 'Yes, we assess and remediate.',
      },
      {
        question: 'Is this ongoing or one time?',
        answer: 'Both, depending on your regulatory obligations.',
      },
    ],
    cta: {
      headline: 'Start With a Structure That Works',
      subtext: 'Tell us about your business and we will map out the setup.',
      buttonLabel: 'Talk to Us',
    },
    highlights: {
      hero: 'Holds Up Under Scrutiny',
      advantages: 'Compliance Advisory Covers',
      process: 'Compliance Position',
      whyUltron: 'Choose Us',
      faqs: 'Questions',
    },
  },
] as const;
