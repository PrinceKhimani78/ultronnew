import { PageHero } from '@/components/ui/PageHero';
import { PARTNER_PAGE } from '@/content/partner-page';

/**
 * The Partner page hero.
 * Reuses the shared `PageHero` secondary-page component matching Figma design tokens
 * with standard centered alignment identical to Services and About pages.
 */
export function PartnerHero() {
  return (
    <PageHero
      id="partner-hero"
      headingId="partner-hero-heading"
      heading={PARTNER_PAGE.hero.heading}
      body={PARTNER_PAGE.hero.body}
    />
  );
}
