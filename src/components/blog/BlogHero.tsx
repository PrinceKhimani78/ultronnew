import { PageHero } from '@/components/ui/PageHero';
import { BLOG_PAGE } from '@/content/blog-page';

/**
 * The Blog page hero.
 * Reuses `PageHero` to ensure 100% visual and structural consistency across secondary routes.
 */
export function BlogHero() {
  return (
    <PageHero
      id="blog-hero"
      headingId="blog-hero-heading"
      heading={BLOG_PAGE.hero.heading}
      body={BLOG_PAGE.hero.body}
    />
  );
}
