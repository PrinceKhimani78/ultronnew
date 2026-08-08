import { BlogCard } from '@/components/blog/BlogCard';
import { BlogHero } from '@/components/blog/BlogHero';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { FeaturedBlogCard } from '@/components/blog/FeaturedBlogCard';
import { CtaContact } from '@/components/home/CtaContact';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { JsonLd } from '@/components/seo/JsonLd';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { HeadingText } from '@/components/ui/SectionHeading';
import { BLOG_PAGE } from '@/content/blog-page';
import { BLOG_POSTS } from '@/content/blogs';
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
export default function BlogsPage() {
  const featuredPost1 = BLOG_POSTS[0];
  const gridRow1 = BLOG_POSTS.slice(1, 4);
  const featuredPost2 = BLOG_POSTS[4];
  const gridRow2 = BLOG_POSTS.slice(5, 8);

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
            {/* Section Header */}
            <Reveal>
              <BandEyebrow style={{ color: '#C9B37E' }}>
                {BLOG_PAGE.listing.eyebrow}
              </BandEyebrow>
              <h2 className="font-display mt-3.5 text-[32px] leading-[105%] font-extrabold tracking-[-0.02em] text-black sm:text-[40px] lg:text-[48px]">
                <HeadingText
                  segments={BLOG_PAGE.listing.heading}
                  accentClassName="text-[#035551]"
                />
              </h2>
            </Reveal>

            {/* Alternating Layout Structure */}
            <div className="mt-10 space-y-12 sm:mt-12 sm:space-y-16 lg:space-y-20">
              {/* 1. First Featured Article (Image Left) */}
              {featuredPost1 && (
                <Reveal delay={STAGGER_MS} amount={0.1}>
                  <FeaturedBlogCard post={featuredPost1} imagePosition="left" />
                </Reveal>
              )}

              {/* 2. First Row of 3 Smaller Article Cards */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {gridRow1.map((post, index) => (
                  <Reveal
                    key={post.id}
                    delay={index * STAGGER_MS}
                    amount={0.1}
                    className="flex h-full"
                  >
                    <BlogCard post={post} />
                  </Reveal>
                ))}
              </div>

              {/* 3. Second Featured Article (Image Position REVERSED - Image Right) */}
              {featuredPost2 && (
                <Reveal delay={STAGGER_MS} amount={0.1}>
                  <FeaturedBlogCard
                    post={featuredPost2}
                    imagePosition="right"
                  />
                </Reveal>
              )}

              {/* 4. Second Row of 3 Smaller Article Cards */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {gridRow2.map((post, index) => (
                  <Reveal
                    key={post.id}
                    delay={index * STAGGER_MS}
                    amount={0.1}
                    className="flex h-full"
                  >
                    <BlogCard post={post} />
                  </Reveal>
                ))}
              </div>
            </div>

            {/* 5. Pagination */}
            <Reveal delay={STAGGER_MS * 2}>
              <BlogPagination totalPages={4} initialPage={1} />
            </Reveal>
          </Container>
        </Section>

        {/* End-of-Page Consultation Band */}
        <CtaContact />
      </main>
    </>
  );
}
