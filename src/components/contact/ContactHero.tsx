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
      heading={[{ text: 'Contact ' }, { text: 'Us', accent: true }]}
      body="Share your situation with our advisory team for clear, practical guidance on UAE company setup, corporate banking, and compliance."
    />
  );
}
