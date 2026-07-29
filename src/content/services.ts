/**
 * The service catalogue — the six services named in the design.
 *
 * The Core Services band renders this as a tabbed interface on desktop and an
 * accordion on mobile. `number` is the visible ordinal in the panel heading
 * ("3. Financial Advisory").
 */

export type Service = {
  slug: string;
  /** Visible ordinal, e.g. "3". */
  number: string;
  title: string;
  /** Panel heading / headline. */
  headline: string;
  tagline: string;
  /** One paragraph describing the service. */
  description: string;
  benefits: readonly string[];
};

export const SERVICES: readonly Service[] = [
  {
    slug: 'business-banking',
    number: '1',
    title: 'Business Banking',
    headline: 'Business Bank Account Opening',
    tagline: 'Corporate Accounts That Actually Open',
    description:
      'UAE and offshore accounts for all nationalities including complex profiles. We structure your file to maximise approval chances across multiple banks.',
    benefits: [
      'Account opening for all nationalities, including profiles other banks decline',
      'Root-cause analysis before resubmission, not blind reapplication',
      'Documentation and compliance narrative restructured to satisfy screening',
      'Access to banks with genuine risk appetite for your profile',
      'Support through compliance queries until the account is funded',
    ],
  },
  {
    slug: 'business-setup',
    number: '2',
    title: 'Business Setup',
    headline: 'Business Setup',
    tagline: 'The Right Structure, Chosen Before It Is Filed',
    description:
      'Mainland, freezone and offshore company formation across UAE jurisdictions. From licence selection to full operational readiness.',
    benefits: [
      'Jurisdiction and licence selection matched to your activity and banking needs',
      'Ownership and structuring designed for control, not just incorporation paperwork',
      'End-to-end handling from registration to operational readiness',
      'Structures built to hold up under bank and regulator scrutiny',
      'One point of contact from setup through to account opening',
    ],
  },
  {
    slug: 'financial-advisory',
    number: '3',
    title: 'Financial Advisory',
    headline: 'Financial Advisory',
    tagline: 'Strategic Financial Guidance That Drives Growth',
    description:
      'Strategic financial guidance for businesses operating in or relocating to the UAE. Structuring, planning and advisory tailored to your goals.',
    benefits: [
      'Feasibility assessment before any recommendation',
      'Structuring guidance built around your specific goals, not templates',
      'Advisory across banking, financing and corporate structuring under one roof',
      'Honest assessment upfront, including when a case is not solvable',
      'Ongoing strategic support as your business or structure evolves',
    ],
  },
  {
    slug: 'tax-structuring-advisory',
    number: '4',
    title: 'Tax Structuring Advisory',
    headline: 'Tax Structuring Advisory',
    tagline: 'A Position You Can Defend',
    description:
      'Advisory guidance on UAE VAT and Corporate Tax obligations. We help you understand your position, structure efficiently and reduce exposure.',
    benefits: [
      'Clarity on your UAE VAT and Corporate Tax position',
      'Structuring guidance to reduce exposure within regulatory limits',
      'Cross-border considerations factored in where relevant',
      'Practical guidance, not generic compliance checklists',
      'Direct access to advisors who understand UAE regulatory detail',
    ],
  },
  {
    slug: 'business-finance',
    number: '5',
    title: 'Business Finance',
    headline: 'Business Finance',
    tagline: 'Funding Matched To The Business, Not The Brochure',
    description:
      'Secured and unsecured business loan advisory. We identify the right lenders and structure your application for optimal outcomes.',
    benefits: [
      'Access to secured and unsecured lending options, including POS finance',
      'Trade finance solutions: invoice discounting, letters of credit, bank guarantees, supplier payment finance',
      'Lender matching based on real appetite for your profile, not a generic list',
      'Application and documentation structured for approval',
      'Support through submission until funding is resolved',
    ],
  },
  {
    slug: 'real-estate-mortgages',
    number: '6',
    title: 'Real Estate Mortgages',
    headline: 'Real Estate Mortgages',
    tagline: 'Property Finance For Residents And Non-Residents',
    description:
      'Mortgage advisory for residents and non-residents. Approvals for profiles and properties that other brokers struggle to place.',
    benefits: [
      'Mortgage advisory for residents and non-residents, including multi-jurisdiction income',
      'Commercial mortgage financing for offices, warehouses, retail units and labour camps',
      'Off-plan mortgages and staged disbursement coordination with developers',
      'Equity release, loan against property, lease rental discounting and mortgage buy-outs',
      'Repositioning of cases stalled elsewhere on valuation or income categorisation',
    ],
  },
] as const;
