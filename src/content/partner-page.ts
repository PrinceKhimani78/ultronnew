import type { HeadingSegment } from '@/types/content';

export const PARTNER_PAGE = {
  metaTitle:
    'Partner With Us | Strategic Partnerships & Institutional Affiliations',
  metaDescription:
    'Collaborate with Ultron Financials. We partner with law firms, wealth managers, corporate service providers, and family offices for UAE company formation, banking, and compliance.',

  hero: {
    heading: [
      { text: 'Partner With ' },
      { text: 'Ultron', accent: true },
    ] as readonly HeadingSegment[],
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },

  formSection: {
    eyebrow: 'PARTNER WITH US',
    heading: [
      { text: 'Let’s Build Better ' },
      { text: 'Outcomes Together.', accent: true },
    ] as readonly HeadingSegment[],
    consentText:
      'I agree to be contacted by Ultron Financials regarding this partnership enquiry.',
    submitText: 'SUBMIT PARTNER ENQUIRY',
    successMessage:
      'Thank you. Your enquiry has been received. Our team will review your message and contact you shortly.',
  },
} as const;
