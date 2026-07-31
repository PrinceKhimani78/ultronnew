'use client';

import { ArrowRight, CheckCircle2 } from 'lucide-react';

import type { WhoWeHelpItem } from '@/content/who-we-help';
import { AudienceArtwork } from './AudienceArtwork';

interface BentoCardProps {
  item: WhoWeHelpItem;
  index: number;
  gridClassName?: string;
  variant?: 'hero-tall' | 'wide' | 'medium' | 'compact';
}

export function BentoCard({
  item,
  index,
  gridClassName = '',
  variant = 'medium',
}: BentoCardProps) {
  const isReverseRotation = index % 2 === 1;

  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#035551]/10 bg-white p-7 shadow-[0_20px_50px_-15px_rgba(3,85,81,0.07)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-[#C5A059] hover:shadow-[0_30px_70px_-15px_rgba(3,85,81,0.15),0_0_30px_0_rgba(197,160,89,0.15)] active:scale-[0.98] active:border-[#C5A059] sm:p-8 lg:p-10 ${gridClassName}`}
    >
      {/* Background Subtle Hover Radial Glow */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.12)_0,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(3,85,81,0.08)_0,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Card Content Top */}
      <div className="relative z-10 flex flex-col">
        {/* Top Badge & Index Number */}
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#035551]/10 bg-[#FDFBEE] px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-[#035551] uppercase transition-colors duration-300 group-hover:border-[#C5A059]/40 group-hover:text-[#8C6D27]">
            {item.badge || 'PROFILE'}
          </span>
          <span className="font-mono text-xs font-bold tracking-widest text-[#035551]/40 transition-colors duration-300 group-hover:text-[#C5A059]">
            0{index + 1}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display mb-3 text-xl leading-tight font-bold tracking-tight text-[#121a18] transition-colors duration-300 group-hover:text-[#035551] sm:text-2xl lg:text-[1.65rem]">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-ink-muted mb-6 text-sm leading-relaxed sm:text-base lg:text-[0.98rem]">
          {item.description}
        </p>

        {/* Key Highlights (Pills) */}
        {item.highlights && item.highlights.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {item.highlights.map((highlight, hIdx) => (
              <div
                key={hIdx}
                className="border-[#035551]/08 flex items-center gap-1.5 rounded-lg border bg-[#FDFBEE]/80 px-2.5 py-1 text-xs font-medium text-[#035551] transition-colors duration-300 group-hover:bg-[#FDFBEE]"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-[#0aa79b]" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Artwork / Visual Center */}
      <div className="relative z-10 my-4 w-full">
        <div
          className={`overflow-hidden rounded-2xl transition-transform duration-500 ease-out ${
            isReverseRotation ? 'group-hover:-rotate-2' : 'group-hover:rotate-2'
          }`}
        >
          <AudienceArtwork
            id={item.id}
            index={index}
            className={`w-full transition-transform duration-500 ${
              variant === 'hero-tall'
                ? 'h-[220px] sm:h-[260px] lg:h-[300px]'
                : variant === 'wide'
                  ? 'h-[180px] sm:h-[200px] lg:h-[220px]'
                  : 'h-[160px] sm:h-[180px]'
            }`}
          />
        </div>
      </div>

      {/* Bottom CTA Link */}
      <div className="relative z-10 pt-2">
        <a
          href="#contact"
          className="font-display inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#035551] uppercase transition-colors duration-300 group-hover:text-[#8C6D27] hover:underline"
        >
          <span>Learn More</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
