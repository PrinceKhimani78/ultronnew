/**
 * The service catalogue — the six services named in the design.
 */

export type Service = {
  slug: string;
  /** Visible ordinal, e.g. "1". */
  number: string;
  title: string;
  /** Panel heading / headline. */
  headline: string;
  tagline: string;
  /** Description. */
  description: string;
  benefits: readonly string[];
};

export const SERVICES: readonly Service[] = [
  {
    slug: 'business-banking',
    number: '1',
    title: 'Business Banking',
    headline: "Accounts for Profiles Other Banks Won't Touch",
    tagline: "Accounts for Profiles Other Banks Won't Touch",
    description:
      'Corporate and individual account opening across every nationality and activity type, including profiles already declined elsewhere. We find out why a bank said no, then fix that before we file again.',
    benefits: [
      'Account opening for all nationalities and activity types, including profiles other banks decline outright',
      'Root-cause review before resubmission, never a blind reapplication',
      'Compliance narrative and source-of-funds documentation rebuilt to withstand screening',
      'Matched to banks with genuine appetite for your profile, not a generic shortlist',
      'Engaged through every compliance query until the account is live',
    ],
  },
  {
    slug: 'business-setup',
    number: '2',
    title: 'Business Setup',
    headline: 'Structure First, Paperwork Second',
    tagline: 'Structure First, Paperwork Second',
    description:
      'Mainland, free zone and offshore company formation across the UAE, built around how you plan to bank and operate, not just how you plan to register.',
    benefits: [
      'Jurisdiction and licence selection matched to your activity, ownership and banking plans',
      'Ownership structures designed to survive a bank’s due diligence',
      'Full handling from registration through operational readiness',
      'One point of contact across setup, licensing and account opening',
      'Structures reviewed for banking suitability before submission',
    ],
  },
  {
    slug: 'financial-advisory',
    number: '3',
    title: 'Financial Advisory',
    headline: 'Advice That Starts With a Feasibility Check',
    tagline: 'Advice That Starts With a Feasibility Check',
    description:
      'Strategic guidance across banking, financing and structuring decisions, built on an honest assessment before recommendations are made.',
    benefits: [
      'Feasibility assessed before strategy',
      'Banking, financing and structuring advice under one advisor',
      'Honest guidance, including when not to proceed',
      'Advice tailored to your circumstances',
      'Ongoing strategic support',
    ],
  },
  {
    slug: 'tax-structuring-advisory',
    number: '4',
    title: 'Tax Structuring Advisory',
    headline: 'Clarity on Where You Actually Stand',
    tagline: 'Clarity on Where You Actually Stand',
    description:
      'UAE VAT and Corporate Tax advisory that translates regulation into practical action.',
    benefits: [
      'VAT and Corporate Tax assessment',
      'Exposure reduction strategies',
      'Cross-border tax considerations',
      'Practical guidance',
      'Direct access to advisors',
    ],
  },
  {
    slug: 'business-finance',
    number: '5',
    title: 'Business Finance',
    headline: 'Lenders Matched to Your Actual Profile',
    tagline: 'Lenders Matched to Your Actual Profile',
    description:
      'Business finance and lender matching based on institutions that genuinely suit your profile.',
    benefits: [
      'Secured and unsecured finance',
      'Trade finance',
      'Lender matching',
      'Proper application structuring',
      'Support until funding',
    ],
  },
  {
    slug: 'real-estate-mortgages',
    number: '6',
    title: 'Real Estate Mortgages',
    headline: 'Mortgages Repositioned, Not Just Resubmitted',
    tagline: 'Mortgages Repositioned, Not Just Resubmitted',
    description:
      'Mortgage advisory for residents and non-residents, including stalled and complex cases.',
    benefits: [
      'Resident and non-resident mortgages',
      'Commercial mortgages',
      'Off-plan financing',
      'Equity release and refinancing',
      'Repositioning declined mortgage cases',
    ],
  },
] as const;
