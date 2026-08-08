import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { BlogPost } from '@/content/blogs';
import { cn } from '@/lib/utils';

export type FeaturedBlogCardProps = {
  post: BlogPost;
  imagePosition?: 'left' | 'right';
};

export function FeaturedBlogCard({
  post,
  imagePosition = 'left',
}: FeaturedBlogCardProps) {
  const isRight = imagePosition === 'right';

  return (
    <article className="group relative w-full overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition-all duration-300 hover:border-[#035551]/30 hover:shadow-xl">
      <div
        className={cn(
          'flex flex-col lg:flex-row lg:items-stretch',
          isRight && 'lg:flex-row-reverse',
        )}
      >
        {/* Featured Image (~50% width on desktop) */}
        <div className="relative min-h-[260px] w-full overflow-hidden bg-[#023F3D]/10 sm:min-h-[320px] lg:w-1/2">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          {/* Subtle brand tint overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#023F3D]/30 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

          {/* Category Badge over image */}
          <div className="absolute top-4 left-4 z-10 sm:top-6 sm:left-6">
            <span className="inline-block rounded-full bg-white/90 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#035551] uppercase shadow-sm backdrop-blur-md">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content (~50% width on desktop) */}
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 lg:w-1/2 lg:p-10">
          <div>
            {/* Date & Reading time */}
            <div className="flex items-center gap-3 text-xs font-medium text-[#737373]">
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-[#C9B37E]" />
              <span>{post.readTime}</span>
            </div>

            {/* Title */}
            <h3 className="font-display mt-3 text-[24px] leading-[120%] font-bold text-[#1A1A1A] transition-colors duration-200 group-hover:text-[#035551] sm:text-[28px] lg:text-[32px]">
              <Link
                href={`/blogs/${post.slug}`}
                className="after:absolute after:inset-0 focus:outline-none"
              >
                {post.title}
              </Link>
            </h3>

            {/* Excerpt */}
            <p className="mt-4 text-[15px] leading-[170%] text-[#5A5A5A] sm:text-[16px]">
              {post.excerpt}
            </p>
          </div>

          {/* Bottom Bar with Circular Arrow Button */}
          <div className="mt-8 flex items-center justify-between border-t border-[#E5E7EB] pt-6">
            <span className="text-sm font-semibold text-[#035551] transition-colors duration-200 group-hover:text-[#023F3D]">
              Read Article
            </span>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#035551]/10 text-[#035551] transition-all duration-300 group-hover:bg-[#035551] group-hover:text-white">
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
