import { PageHero } from '@/components/ui/PageHero';

/**
 * The Contact page hero.
 * Reuses the shared `PageHero` secondary-page component matching Figma design tokens
 * with standard centered alignment identical to Services and Partner pages.
 */
export function ContactHero() {
  return (
    <PageHero
      id="contact-hero"
      headingId="contact-hero-heading"
      eyebrow="CONTACT ULTRON FINANCIALS"
      heading={[
        { text: 'Let’s Find the ' },
        { text: 'Right Way Forward', accent: true },
        { text: '.' },
      ]}
    />
  );
}
