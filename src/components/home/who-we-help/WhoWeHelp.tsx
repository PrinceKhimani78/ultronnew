'use client';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow, HeadingText } from '@/components/ui/SectionHeading';
import { WHO_WE_HELP_CARDS, WHO_WE_HELP_HEADER } from '@/content/who-we-help';
import { BentoCard } from './BentoCard';

/**
 * Redesigned "Who We Help" section:
 * - Editorial 12-column Asymmetric Bento Grid
 * - Inspired by Apple x Stripe x Linear x Notion AI x Modern Architectural Finance
 * - Centered Section Header with "WHO WE HELP" eyebrow & "Helping Businesses Build with Confidence"
 * - Off-white background (#FDFBEE) with architectural grid lines, circular geometry, gold particles & soft radial glows
 * - Hardware-accelerated hover lift (-8px), gold border glow (#C5A059), 2° rotation & tap scale (0.98)
 */

export function WhoWeHelpSection() {
  const cardMap = Object.fromEntries(
    WHO_WE_HELP_CARDS.map((card) => [card.id, card]),
  );

  const card1 =
    cardMap['uae-smes-operating-businesses'] || WHO_WE_HELP_CARDS[0];
  const card2 = cardMap['high-net-worth'] || WHO_WE_HELP_CARDS[1];
  const card3 = cardMap['foreign-investors'] || WHO_WE_HELP_CARDS[2];
  const card4 = cardMap['smes-growing-businesses'] || WHO_WE_HELP_CARDS[3];
  const card5 = cardMap['startups-founders'] || WHO_WE_HELP_CARDS[4];
  const card6 = cardMap['global-companies'] || WHO_WE_HELP_CARDS[5];

  return (
    <Section className="relative w-full overflow-hidden bg-[#FDFBEE] py-20 text-[#121a18] sm:py-28 lg:py-36">
      {/* Background Architectural Mesh Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#03555106_1px,transparent_1px),linear-gradient(to_bottom,#03555106_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Subtle Gold Particle Highlights */}
      <div className="pointer-events-none absolute top-1/6 left-1/4 h-1.5 w-1.5 rounded-full bg-[#C5A059] opacity-40 shadow-[0_0_8px_#C5A059]" />
      <div className="pointer-events-none absolute top-1/3 right-1/3 h-2 w-2 rounded-full bg-[#C5A059] opacity-30 shadow-[0_0_12px_#C5A059]" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/5 h-1.5 w-1.5 rounded-full bg-[#C5A059] opacity-50 shadow-[0_0_8px_#C5A059]" />

      {/* Soft Radial Ambient Glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(3,85,81,0.05)_0,rgba(197,160,89,0.03)_40%,transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(10,167,155,0.04)_0,transparent_70%)] blur-3xl" />

      {/* Circular Line Graphics */}
      <div className="border-[#035551]/08 pointer-events-none absolute top-12 -left-32 h-[500px] w-[500px] rounded-full border opacity-50" />
      <div className="pointer-events-none absolute -right-32 bottom-12 h-[600px] w-[600px] rounded-full border border-[#C5A059]/15 opacity-40" />

      <Container width="wide" className="relative z-10">
        {/* Centered Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20 lg:mb-24">
          <Eyebrow align="center">{WHO_WE_HELP_HEADER.eyebrow}</Eyebrow>

          <h2 className="font-display mt-4 text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.1] font-bold tracking-tight text-[#121a18]">
            <HeadingText segments={WHO_WE_HELP_HEADER.heading} />
          </h2>

          <p className="text-ink-muted mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg lg:text-[1.1rem]">
            {WHO_WE_HELP_HEADER.body}
          </p>
        </div>

        {/* 12-Column Asymmetric Bento Grid */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-8">
          {/* Card 1: UAE SMEs (Wide Card - 7 Cols) */}
          <BentoCard
            item={card1}
            index={0}
            variant="wide"
            gridClassName="col-span-12 lg:col-span-7"
          />

          {/* Card 2: Family Offices & Multi-Entity (Hero Tall Card - 5 Cols, 2 Rows) */}
          <BentoCard
            item={card2}
            index={1}
            variant="hero-tall"
            gridClassName="col-span-12 lg:col-span-5 lg:row-span-2"
          />

          {/* Card 3: Founders & Entrepreneurs (Medium Card - 4 Cols on desktop, 6 Cols on tablet) */}
          <BentoCard
            item={card3}
            index={2}
            variant="compact"
            gridClassName="col-span-12 sm:col-span-6 lg:col-span-4"
          />

          {/* Card 4: Investors (Compact Card - 3 Cols on desktop, 6 Cols on tablet) */}
          <BentoCard
            item={card4}
            index={3}
            variant="compact"
            gridClassName="col-span-12 sm:col-span-6 lg:col-span-3"
          />

          {/* Card 5: Real Estate Professionals (Wide Card - 7 Cols) */}
          <BentoCard
            item={card5}
            index={4}
            variant="wide"
            gridClassName="col-span-12 lg:col-span-7"
          />

          {/* Card 6: Global Companies (Medium Card - 5 Cols) */}
          <BentoCard
            item={card6}
            index={5}
            variant="medium"
            gridClassName="col-span-12 lg:col-span-5"
          />
        </div>
      </Container>
    </Section>
  );
}
