'use client';

import { useState } from 'react';

import { BlogCard } from '@/components/blog/BlogCard';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { FeaturedBlogCard } from '@/components/blog/FeaturedBlogCard';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { HeadingText } from '@/components/ui/SectionHeading';
import { BLOG_PAGE } from '@/content/blog-page';
import type { BlogPost } from '@/content/blogs';

type Props = {
  posts: BlogPost[];
};

export function BlogListingContainer({ posts }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(posts.length / itemsPerPage) || 1;

  // Slice posts for current page
  const pagePosts = posts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Position 1: Featured article selection
  const featuredPost1 =
    pagePosts.find((p) => p.featured) || pagePosts[0] || null;

  // Remaining articles for positions 2–8 on current page
  const remaining = featuredPost1
    ? pagePosts.filter((p) => p.id !== featuredPost1.id)
    : pagePosts;

  const gridRow1 = remaining.slice(0, 3);
  const horizontalPost = remaining[3] || null;
  const gridRow2 = remaining.slice(4, 7);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    if (typeof window !== 'undefined') {
      const listingElement = document.getElementById('blog-listing');
      if (listingElement) {
        listingElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
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
        {/* 1. Large Featured Article (Position 1, Image Left) */}
        {featuredPost1 && (
          <Reveal delay={STAGGER_MS} amount={0.1}>
            <FeaturedBlogCard post={featuredPost1} imagePosition="left" />
          </Reveal>
        )}

        {/* 2. First Row of 3 Standard Article Cards (Positions 2–4) */}
        {gridRow1.length > 0 && (
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
        )}

        {/* 3. Full-Width Horizontal Article Card (Position 5, Image Right) */}
        {horizontalPost && (
          <Reveal delay={STAGGER_MS} amount={0.1}>
            <FeaturedBlogCard post={horizontalPost} imagePosition="right" />
          </Reveal>
        )}

        {/* 4. Second Row of 3 Standard Article Cards (Positions 6–8) */}
        {gridRow2.length > 0 && (
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
        )}
      </div>

      {/* 5. Pagination - Only rendered if more than 1 page exists */}
      {totalPages > 1 && (
        <Reveal delay={STAGGER_MS * 2}>
          <BlogPagination
            totalPages={totalPages}
            initialPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Reveal>
      )}
    </>
  );
}
