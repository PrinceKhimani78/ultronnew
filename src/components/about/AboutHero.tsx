import { PageHero } from '@/components/ui/PageHero';
import { ABOUT_PAGE } from '@/content/about-page';

/**
 * The About page hero.
 *
 * Deliberately NOT the About hero drawn in the Figma file — the brief for
 * this page reuses the Services page's hero shape (see `PageHero`) with
 * About's own heading and body, so the two secondary pages open identically.
 */
export function AboutHero() {
  return (
    <PageHero
      id="about-hero"
      headingId="about-hero-heading"
      heading={ABOUT_PAGE.hero.heading}
      body={ABOUT_PAGE.hero.body}
    />
  );
}
