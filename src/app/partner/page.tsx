import { PartnerEnquirySection } from '@/components/partner/PartnerEnquirySection';
import { PartnerHero } from '@/components/partner/PartnerHero';
import { JsonLd } from '@/components/seo/JsonLd';
import { PARTNER_PAGE } from '@/content/partner-page';
import { partnerPageGraph } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: PARTNER_PAGE.metaTitle,
  description: PARTNER_PAGE.metaDescription,
  path: '/partner',
});

/**
 * Partner page.
 *
 * Page Structure:
 * 1. PartnerHero ("PARTNER WITH ULTRON" hero, left-aligned)
 * 2. PartnerEnquirySection ("PARTNER WITH US" full-width dark teal form section)
 * 3. Footer
 */
export default function PartnerPage() {
  return (
    <>
      <JsonLd schema={partnerPageGraph()} />

      <main id="content" className="flex-1">
        <PartnerHero />
        <PartnerEnquirySection />
      </main>
    </>
  );
}
