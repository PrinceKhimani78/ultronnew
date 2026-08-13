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
    body: 'For law firms, wealth managers and corporate service providers who need a UAE execution partner they can put their name behind.',
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
