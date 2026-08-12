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
      body="Tell us what you are trying to achieve, where the process has become difficult, or what has already been declined. Our team will review your situation and give you a clear feasibility direction."
    />
  );
}
