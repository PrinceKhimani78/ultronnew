import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Eyebrow, HeadingText } from '@/components/ui/SectionHeading';
import { WHO_WE_HELP_CARDS, WHO_WE_HELP_HEADER } from '@/content/who-we-help';
import { WhoWeHelpCard } from './WhoWeHelpCard';

/**
 * "Who We Help" section with clean cards and financial background graphics:
 * - Background: #FDFBEE off-white with architectural grid mesh
 * - Background Visuals: Financial bar charts, currency marks ($ / AED / %), and growth trend lines
 * - Cards: Clean 2-column asymmetric layout with smooth elevation shadow (no inset button shadow)
 */

export function WhoWeHelpSection() {
  const cardMap = Object.fromEntries(
    WHO_WE_HELP_CARDS.map((card) => [card.id, card]),
  );

  return (
    <Section className="relative overflow-hidden bg-[#FDFBEE] pt-16 pb-24 sm:pt-20 sm:pb-32">
      {/* Background Architectural Mesh */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#03555106_1px,transparent_1px),linear-gradient(to_bottom,#03555106_1px,transparent_1px)] bg-[size:36px_36px]" />

      {/* Background Financial Graphic 1: Bar Chart & Growth Trend (Top Right) */}
      <div className="pointer-events-none absolute top-12 right-6 hidden opacity-35 lg:block">
        <div className="flex flex-col gap-2 rounded-2xl border border-[#035551]/10 bg-white/40 p-4 shadow-xs backdrop-blur-xs">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[10px] font-bold text-[#035551]">
              ASSET GROWTH
            </span>
            <span className="font-mono text-xs font-bold text-emerald-600">
              +24.8% ▲
            </span>
          </div>
          <div className="flex items-end gap-1.5 pt-2">
            <div className="h-4 w-2.5 rounded-xs bg-[#035551]/20" />
            <div className="h-6 w-2.5 rounded-xs bg-[#035551]/30" />
            <div className="h-8 w-2.5 rounded-xs bg-[#035551]/40" />
            <div className="h-11 w-2.5 rounded-xs bg-[#035551]/60" />
            <div className="h-14 w-2.5 rounded-xs bg-[#035551]" />
          </div>
        </div>
      </div>

      {/* Background Financial Graphic 2: Currency & Marks (Top Left Header) */}
      <div className="pointer-events-none absolute top-20 left-4 hidden opacity-30 xl:block">
        <div className="flex items-center gap-3 rounded-full border border-[#035551]/10 bg-white/50 px-4 py-2 backdrop-blur-xs">
          <span className="font-mono text-xs font-bold text-[#035551]">
            $ USD
          </span>
          <span className="h-3 w-px bg-[#035551]/20" />
          <span className="font-mono text-xs font-bold text-[#035551]">
            د.إ AED
          </span>
          <span className="h-3 w-px bg-[#035551]/20" />
          <span className="font-mono text-xs font-bold text-emerald-600">
            99.8% VERIFIED
          </span>
        </div>
      </div>

      {/* Background Financial Graphic 3: Financial Analytics Radar & Bar Chart (Bottom Left) */}
      <div className="pointer-events-none absolute bottom-16 left-6 hidden opacity-35 lg:block">
        <div className="flex items-center gap-4 rounded-2xl border border-[#035551]/10 bg-white/40 p-4 shadow-xs backdrop-blur-xs">
          <svg
            className="h-10 w-10 text-[#035551]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] font-bold text-[#035551] uppercase">
              CAPITAL CLEARANCE
            </span>
            <span className="font-mono text-xs font-bold text-[#121a18]">
              100% COMPLIANT
            </span>
          </div>
        </div>
      </div>

      {/* Ambient Radial Soft Glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(3,85,81,0.05)_0,transparent_70%)] blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_at_center,rgba(10,167,155,0.04)_0,transparent_70%)] blur-3xl" />

      <Container width="wide" className="relative z-10">
        {/* Top Header Section */}
        <div className="mb-14 grid gap-8 lg:mb-16 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-6">
            <Eyebrow>{WHO_WE_HELP_HEADER.eyebrow}</Eyebrow>
            <h2 className="font-display mt-4 text-[clamp(2.25rem,4.5vw,3.25rem)] leading-[1.1] font-bold tracking-tight text-[#121a18]">
              <HeadingText segments={WHO_WE_HELP_HEADER.heading} />
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="text-ink-muted max-w-xl text-[18px] leading-relaxed">
              {WHO_WE_HELP_HEADER.body}
            </p>
            <div className="mt-6">
              <Button asChild variant="outline" arrow>
                <a href={WHO_WE_HELP_HEADER.cta.href}>
                  {WHO_WE_HELP_HEADER.cta.label}
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Asymmetric Content Grid matching Figma comp */}
        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          {/* Left Column (7 cols / ~60% width) */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {/* Row 1: Card 1 (Wide) */}
            <WhoWeHelpCard
              item={
                cardMap['uae-smes-operating-businesses'] || WHO_WE_HELP_CARDS[0]
              }
              index={0}
              className="flex-1"
            />

            {/* Row 2: Card 3 & Card 4 (2 Equal Columns) */}
            <div className="grid gap-6 sm:grid-cols-2">
              <WhoWeHelpCard
                item={cardMap['foreign-investors'] || WHO_WE_HELP_CARDS[2]}
                index={2}
                className="h-full"
              />
              <WhoWeHelpCard
                item={
                  cardMap['smes-growing-businesses'] || WHO_WE_HELP_CARDS[3]
                }
                index={3}
                className="h-full"
              />
            </div>

            {/* Row 3: Card 5 (Wide) */}
            <WhoWeHelpCard
              item={cardMap['startups-founders'] || WHO_WE_HELP_CARDS[4]}
              index={4}
              className="flex-1"
            />
          </div>

          {/* Right Column (5 cols / ~40% width) */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Card 2 (Tall Card) */}
            <WhoWeHelpCard
              item={cardMap['high-net-worth'] || WHO_WE_HELP_CARDS[1]}
              index={1}
              className="flex-1"
            />

            {/* Card 6 */}
            <WhoWeHelpCard
              item={cardMap['global-companies'] || WHO_WE_HELP_CARDS[5]}
              index={5}
              className="flex-1"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
