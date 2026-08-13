import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BlogCard } from '@/components/blog/BlogCard';
import { CtaContact } from '@/components/home/CtaContact';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { JsonLd } from '@/components/seo/JsonLd';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { getBlogPostBySlug, getPublishedBlogPosts } from '@/lib/cms-data';
import { breadcrumbSchema, organizationSchema } from '@/lib/json-ld';
import { absoluteUrl, buildMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: `${post.title} | Ultron Insights`,
    description: post.excerpt,
    path: `/blogs/${post.slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPublishedBlogPosts();
  const otherPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      {
        '@type': 'BlogPosting',
        '@id': absoluteUrl(`/blogs/${post.slug}`),
        headline: post.title,
        description: post.excerpt,
        image: post.imageUrl,
        datePublished: post.date,
        publisher: { '@id': absoluteUrl('/#organization') },
      },
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blogs', path: '/blogs' },
        { name: post.title, path: `/blogs/${post.slug}` },
      ]),
    ],
  };

  return (
    <>
      <JsonLd schema={jsonLdGraph} />

      <main id="content" className="flex-1">
        {/* Hero & Centered Article Header */}
        <Section className="bg-[#FDFBEE] pt-[180px] pb-16 sm:pt-[200px] sm:pb-20 lg:pt-[220px]">
          <Container width="wide">
            {/* Back link - Centered */}
            <Reveal className="flex justify-center">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#035551] transition-colors hover:text-[#023F3D]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all insights
              </Link>
            </Reveal>

            {/* Header info - Centered */}
            <Reveal className="mx-auto mt-6 max-w-4xl text-center">
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold tracking-wider text-[#035551] uppercase">
                <span className="rounded-full bg-[#035551]/10 px-3.5 py-1">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              <h1 className="heading-h1 mt-4 text-center text-[#1A1A1A]">
                {post.title}
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-center text-[18px] leading-[170%] text-[#5A5A5A] sm:text-[20px]">
                {post.excerpt}
              </p>
            </Reveal>

            {/* Featured Image - Centered & Full Width */}
            <Reveal className="mx-auto mt-12 max-w-5xl">
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#023F3D]/10 shadow-xl">
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </Reveal>
          </Container>
        </Section>

        {/* Article Body Content */}
        <Section className="bg-white py-16 sm:py-20">
          <Container width="wide" className="max-w-4xl">
            {post.content ? (
              <article
                className="prose prose-lg max-w-none text-[#333333]"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <article className="prose prose-lg max-w-none text-[#333333]">
                <p className="text-[18px] leading-[180%] text-[#404040] sm:text-[19px]">
                  Navigating the financial and regulatory landscape in the
                  United Arab Emirates requires strict adherence to
                  institutional standards, comprehensive documentation, and
                  proactive risk management.
                </p>

                <h2 className="heading-h2 mt-10 text-[#1A1A1A]">
                  Key Advisory Considerations
                </h2>

                <p className="mt-4 text-[16px] leading-[175%] text-[#5A5A5A]">
                  Whether you are establishing a new mainland presence,
                  structuring a freezone holding company, or undergoing an
                  annual compliance audit, banking underwriting officers look
                  for transparency, proof of economic substance, and clear
                  ultimate beneficial ownership (UBO) declaration.
                </p>

                <ul className="mt-6 space-y-3 pl-6 text-[16px] text-[#333333]">
                  <li>
                    • Clear identification of primary suppliers and client base.
                  </li>
                  <li>
                    • Verified source of funds declarations with supporting
                    audited accounts.
                  </li>
                  <li>
                    • Alignment between registered trade license activities and
                    actual transaction flows.
                  </li>
                </ul>

                <div className="mt-10 rounded-xl border border-[#035551]/20 bg-[#FDFBEE] p-6 sm:p-8">
                  <h3 className="heading-h3--compact text-[#035551]">
                    Need dedicated advisory on this topic?
                  </h3>
                  <p className="mt-2 text-[15px] text-[#5A5A5A]">
                    Our senior advisory team reviews complex banking and
                    structuring files prior to submission.
                  </p>
                  <div className="mt-5">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center rounded-lg bg-[#035551] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#023F3D]"
                    >
                      Book a Consultation
                    </a>
                  </div>
                </div>
              </article>
            )}
          </Container>
        </Section>

        {/* Related Articles Section (Grid Layout) */}
        {otherPosts.length > 0 ? (
          <Section className="border-t border-[#035551]/10 bg-[#FDFBEE] py-16 sm:py-20 lg:py-24">
            <Container width="wide">
              <Reveal className="mx-auto mb-12 max-w-3xl text-center">
                <BandEyebrow className="justify-center">
                  EXPLORE MORE ARTICLES
                </BandEyebrow>
                <h2 className="heading-h2 mt-3 text-[#023F3D]">
                  Related Insights & Articles
                </h2>
                <p className="mt-3 text-[16px] text-[#5A5A5A]">
                  Stay informed on UAE business setup, banking strategies, and
                  compliance frameworks.
                </p>
              </Reveal>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {otherPosts.map((otherPost, idx) => (
                  <Reveal key={otherPost.id} delay={idx * 100}>
                    <BlogCard post={otherPost} />
                  </Reveal>
                ))}
              </div>
            </Container>
          </Section>
        ) : null}

        {/* Final CTA */}
        <CtaContact />
      </main>
    </>
  );
}
