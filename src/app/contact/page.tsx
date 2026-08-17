import type { Metadata } from 'next';

import { ContactFormSection } from '@/components/contact/ContactFormSection';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactProcess } from '@/components/contact/ContactProcess';
import { DirectContactInfo } from '@/components/contact/DirectContactInfo';
import { getSiteSettings } from '@/lib/cms-data';

export const metadata: Metadata = {
  title: 'Contact Ultron Financials | Financial & Business Support Dubai',
  description:
    'Contact Ultron Financials to discuss banking, business setup, financing or a complex financial situation in the UAE.',
  alternates: {
    canonical: '/contact',
  },
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  return (
    <main id="main-content">
      <ContactHero />
      <ContactFormSection />
      <DirectContactInfo settings={settings} />
      <ContactProcess />
    </main>
  );
}
