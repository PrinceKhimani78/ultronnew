import type { Metadata } from 'next';

import { ContactHero } from '@/components/contact/ContactHero';
import { ContactProcess } from '@/components/contact/ContactProcess';
import { ContactReassuranceStrip } from '@/components/contact/ContactReassuranceStrip';
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
      <DirectContactInfo />
      <ContactProcess />
      <ContactReassuranceStrip />
    </main>
  );
}
