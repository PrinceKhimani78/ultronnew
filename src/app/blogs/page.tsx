import { BlogHero } from '@/components/blog/BlogHero';
import { BlogListingContainer } from '@/components/blog/BlogListingContainer';
import { CtaContact } from '@/components/home/CtaContact';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { BLOG_PAGE } from '@/content/blog-page';
import { getPublishedBlogPosts } from '@/lib/cms-data';
import { blogPageGraph } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: BLOG_PAGE.metaTitle,
  description: BLOG_PAGE.metaDescription,
  path: '/blogs',
});

/**
 * Editorial Blog Page.
 *
 * Alternates between horizontal featured articles and 3-column article grids,
 * followed by pagination and the unified CtaContact conversion band.
 */
export default async function BlogsPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <>
      <JsonLd schema={blogPageGraph()} />

      <main id="content" className="flex-1">
        {/* Page Hero */}
        <BlogHero />

        {/* Editorial Blog Listing Section */}
        <Section
          id="blog-listing"
          className="bg-white pt-12 pb-16 text-black sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-28"
        >
          <Container width="wide">
            <BlogListingContainer posts={posts} />
          </Container>
        </Section>

        {/* End-of-Page Consultation Band */}
        <CtaContact />
      </main>
    </>
  );
}
