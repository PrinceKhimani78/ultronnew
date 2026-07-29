import { CtaContact } from '@/components/home/CtaContact';
import { JsonLd } from '@/components/seo/JsonLd';
import { ServicesGrid } from '@/components/services/ServicesGrid';
import { ServicesHero } from '@/components/services/ServicesHero';
import { SERVICES_PAGE } from '@/content/services-page';
import { servicesPageGraph } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  // The root layout's `title.template` appends the firm name to this.
  title: SERVICES_PAGE.metaTitle,
  description: SERVICES_PAGE.metaDescription,
  path: '/services',
});

/**
 * Services.
 *
 * Reuses `CtaContact` from the home page rather than building a second
 * conversion band: PROJECT.md requires every page to end in a consultation
 * booking, and a near-identical copy of that band is exactly the duplication the
 * charter forbids.
 */
export default function ServicesPage() {
  return (
    <>
      <JsonLd schema={servicesPageGraph()} />

      <main id="content" className="flex-1">
        <ServicesHero />
        <ServicesGrid />
        <CtaContact />
      </main>
    </>
  );
}
