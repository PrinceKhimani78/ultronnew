import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { BlogPost } from '@/content/blogs';

export type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#035551]/30 hover:shadow-xl">
      <div>
        {/* Top Article Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#023F3D]/10">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
          {/* Subtle brand tint overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#023F3D]/20 via-transparent to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-30" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wider text-[#035551] uppercase shadow-sm backdrop-blur-md">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* Date & Reading time */}
          <div className="flex items-center gap-2.5 text-xs font-medium text-[#737373]">
            <span>{post.date}</span>
            <span className="h-1 w-1 rounded-full bg-[#C9B37E]" />
            <span>{post.readTime}</span>
          </div>

          {/* Title */}
          <h3 className="font-display mt-3 text-[20px] leading-[130%] font-bold text-[#1A1A1A] transition-colors duration-200 group-hover:text-[#035551]">
            <Link
              href={`/blogs/${post.slug}`}
              className="after:absolute after:inset-0 focus:outline-none"
            >
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="mt-3 line-clamp-3 text-[14px] leading-[160%] text-[#5A5A5A]">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Bottom Bar with Circular Arrow */}
      <div className="flex items-center justify-between border-t border-[#E5E7EB] px-6 py-4">
        <span className="text-xs font-semibold text-[#035551] transition-colors duration-200 group-hover:text-[#023F3D]">
          Read Article
        </span>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#035551]/10 text-[#035551] transition-all duration-300 group-hover:bg-[#035551] group-hover:text-white">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}
