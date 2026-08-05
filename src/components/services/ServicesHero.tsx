import { PageHero } from '@/components/ui/PageHero';
import { SERVICES_PAGE } from '@/content/services-page';

/**
 * The Services page hero. A thin content wrapper around the shared
 * `PageHero` — see that component for the geometry, typography and motion
 * this renders. Kept as its own file (rather than calling `PageHero` inline
 * from `app/services/page.tsx`) so every route keeps the same one-hero-
 * component-per-page shape as the rest of the site.
 */
export function ServicesHero() {
  return (
    <PageHero
      id="services-hero"
      headingId="services-hero-heading"
      heading={SERVICES_PAGE.hero.heading}
      body={SERVICES_PAGE.hero.body}
    />
  );
}
