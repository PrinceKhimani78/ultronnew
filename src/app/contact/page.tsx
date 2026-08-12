import type { Metadata } from 'next';

import { ContactFormSection } from '@/components/contact/ContactFormSection';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactProcess } from '@/components/contact/ContactProcess';
import { DirectContactInfo } from '@/components/contact/DirectContactInfo';

export const metadata: Metadata = {
  title: 'Contact Ultron Financials | Financial & Business Support Dubai',
  description:
    'Contact Ultron Financials to discuss banking, business setup, financing or a complex financial situation in the UAE.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <ContactHero />
      <ContactFormSection />
      <DirectContactInfo />
      <ContactProcess />
    </main>
  );
}
