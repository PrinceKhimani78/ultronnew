'use client';

import { WHO_WE_HELP_CARDS, WHO_WE_HELP_HEADER } from '@/content/who-we-help';
import { DesktopStorytellingDeck } from './DesktopStorytellingDeck';
import { MobileFlipDeck } from './MobileFlipDeck';

/**
 * Redesigned "Who We Help" section:
 * - Apple x Stripe x Trionn x Luxury Financial Advisory storytelling deck
 * - Pinned sticky desktop deck with smooth 3D depth transitions
 * - Mobile vertical 3D card flip interaction
 * - Architectural grid background, ambient radial glows & subtle geometry
 */

export function WhoWeHelpSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FDFBEE] text-[#121a18]">
      {/* Background Architectural Grid & Geometry Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#03555108_1px,transparent_1px),linear-gradient(to_bottom,#03555108_1px,transparent_1px)] bg-[size:36px_36px]" />

      {/* Subtle Radial Glow Center Top & Bottom */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(3,85,81,0.06)_0,transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(10,167,155,0.05)_0,transparent_70%)] blur-3xl" />

      {/* Circular Architectural Accents */}
      <div className="pointer-events-none absolute top-1/4 -left-24 h-96 w-96 rounded-full border border-[#035551]/10 opacity-40" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-[500px] w-[500px] rounded-full border border-[#035551]/10 opacity-40" />

      {/* Desktop Experience (Tablet & Desktop md+) */}
      <div className="hidden md:block">
        <DesktopStorytellingDeck
          items={WHO_WE_HELP_CARDS}
          eyebrow={WHO_WE_HELP_HEADER.eyebrow}
          heading={WHO_WE_HELP_HEADER.heading}
          body={WHO_WE_HELP_HEADER.body}
          ctaLabel={WHO_WE_HELP_HEADER.cta.label}
          ctaHref={WHO_WE_HELP_HEADER.cta.href}
        />
      </div>

      {/* Mobile Experience (Under md breakpoint) */}
      <div className="block md:hidden">
        <MobileFlipDeck
          items={WHO_WE_HELP_CARDS}
          eyebrow={WHO_WE_HELP_HEADER.eyebrow}
          heading={WHO_WE_HELP_HEADER.heading}
          body={WHO_WE_HELP_HEADER.body}
          ctaLabel={WHO_WE_HELP_HEADER.cta.label}
          ctaHref={WHO_WE_HELP_HEADER.cta.href}
        />
      </div>
    </section>
  );
}
