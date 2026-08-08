import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CtaContact } from '@/components/home/CtaContact';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { JsonLd } from '@/components/seo/JsonLd';
import { BLOG_POSTS } from '@/content/blogs';
import { breadcrumbSchema, organizationSchema } from '@/lib/json-ld';
import { absoluteUrl, buildMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
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
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

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
        <Section className="bg-[#FDFBEE] pt-[200px] pb-16 sm:pt-[220px] sm:pb-20 lg:pt-[240px]">
          <Container width="wide">
            {/* Back link */}
            <Reveal>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#035551] transition-colors hover:text-[#023F3D]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all insights
              </Link>
            </Reveal>

            {/* Header info */}
            <Reveal className="mt-6 max-w-4xl">
              <div className="flex items-center gap-3 text-xs font-semibold tracking-wider text-[#035551] uppercase">
                <span className="rounded-full bg-[#035551]/10 px-3 py-1">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              <h1 className="font-display mt-4 text-[32px] leading-[115%] font-extrabold text-[#1A1A1A] sm:text-[44px] lg:text-[52px]">
                {post.title}
              </h1>

              <p className="mt-6 text-[18px] leading-[170%] text-[#5A5A5A]">
                {post.excerpt}
              </p>
            </Reveal>

            {/* Featured Image */}
            <Reveal className="mt-10 max-w-5xl">
              <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#023F3D]/10 shadow-lg">
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
        <Section className="bg-white pt-12 pb-20">
          <Container width="wide" className="max-w-4xl">
            <article className="prose prose-lg max-w-none text-[#333333]">
              <p className="text-[17px] leading-[180%] text-[#5A5A5A]">
                Navigating the financial and regulatory landscape in the United
                Arab Emirates requires strict adherence to institutional
                standards, comprehensive documentation, and proactive risk
                management.
              </p>

              <h2 className="font-display mt-10 text-[26px] font-bold text-[#1A1A1A]">
                Key Advisory Considerations
              </h2>

              <p className="mt-4 text-[16px] leading-[175%] text-[#5A5A5A]">
                Whether you are establishing a new mainland presence,
                structuring a freezone holding company, or undergoing an annual
                compliance audit, banking underwriting officers look for
                transparency, proof of economic substance, and clear ultimate
                beneficial ownership (UBO) declaration.
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
                <h3 className="font-display text-[20px] font-bold text-[#035551]">
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
          </Container>
        </Section>

        <CtaContact />
      </main>
    </>
  );
}
