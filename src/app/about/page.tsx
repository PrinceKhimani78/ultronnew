import { AboutFoundation } from '@/components/about/AboutFoundation';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutTeam } from '@/components/about/AboutTeam';
import { CtaContact } from '@/components/home/CtaContact';
import { JsonLd } from '@/components/seo/JsonLd';
import { ABOUT_PAGE } from '@/content/about-page';
import { aboutPageGraph } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  // The root layout's `title.template` appends the firm name to this.
  title: ABOUT_PAGE.metaTitle,
  description: ABOUT_PAGE.metaDescription,
  path: '/about',
});

/**
 * About.
 *
 * Reuses `CtaContact` from the home page rather than building a second
 * conversion band, for the same reason `ServicesPage` does: PROJECT.md
 * requires every page to end in a consultation booking, and a near-identical
 * copy of that band is exactly the duplication the charter forbids.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd schema={aboutPageGraph()} />

      <main id="content" className="flex-1">
        <AboutHero />
        <AboutFoundation />
        <AboutTeam />
        <CtaContact />
      </main>
    </>
  );
}
