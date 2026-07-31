import { ArrowUpRight, Briefcase, Globe, Landmark } from 'lucide-react';
import Image from 'next/image';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { HeadingText } from '@/components/ui/SectionHeading';
import { HOME_HERO } from '@/content/home';
import { cn } from '@/lib/utils';

/**
 * Fully Responsive Hero Section (320px to 1920px+):
 * - Reconciled to Figma Frame 5 (1280px comp):
 *   1. Bottom Hero Gradient Effect (#FDFBEE to soft #DCCB8E 132px height)
 *   2. Primary CTA Button: 179px × 44px pill [ EXPLORE  ○↗ ] with diagonal Uiverse arrow swap animation
 * - Desktop (1200px+): 2-Column layout (Left: Heading, Trust Strip, Description, CTA; Right: 3D Monogram)
 * - Tablet & Mobile (<1200px): Stacked single column with center-aligned text
 */

const STAT_ICONS = {
  bank: Landmark,
  briefcase: Briefcase,
  globe: Globe,
} as const;

export function Hero() {
  return (
    <Section
      id="top"
      className="relative overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-12"
    >
      <Container width="wide" className="relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Main Content Column (Left on Desktop, Full Width on Mobile/Tablet) */}
          <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
            {/* 1. Heading */}
            <h1 className="font-display text-[clamp(1.65rem,6.5vw,3.75rem)] leading-[1.12] font-bold tracking-tight text-[#121a18] sm:leading-[1.08]">
              <HeadingText segments={HOME_HERO.heading} />
            </h1>

            {/* 2. Trust Strip / Metrics Bar */}
            <div className="bg-surface-raised/40 shadow-soft my-5 w-full rounded-2xl border border-[#035551]/15 p-3.5 sm:my-6 sm:p-5 lg:max-w-none">
              <dl className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-2">
                {HOME_HERO.stats.map((stat, index) => {
                  const Icon = STAT_ICONS[stat.icon as keyof typeof STAT_ICONS];
                  return (
                    <div
                      key={stat.label}
                      className="relative flex items-center justify-start gap-3 pl-2 sm:justify-start sm:pr-2 sm:pl-0"
                    >
                      <span
                        aria-hidden="true"
                        className="text-surface inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#035551] shadow-[0px_3px_6px_rgba(3,85,81,0.25)] sm:h-11 sm:w-11"
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                      <div className="min-w-0 flex-1 text-left">
                        <dt className="sr-only">{stat.label}</dt>
                        <dd>
                          <span className="font-display text-ink block text-base leading-none font-bold tracking-tight sm:text-xl lg:text-2xl">
                            {stat.value}
                          </span>
                          <span
                            aria-hidden="true"
                            className="mt-1 block text-[11px] leading-tight font-medium text-[#035551] sm:text-xs"
                          >
                            {stat.label}
                          </span>
                        </dd>
                      </div>

                      {/* Vertical divider line on tablet/desktop */}
                      {index < HOME_HERO.stats.length - 1 && (
                        <div
                          aria-hidden="true"
                          className="absolute top-1/2 right-0 hidden h-8 w-[1.5px] -translate-y-1/2 bg-[#035551]/20 sm:block"
                        />
                      )}
                    </div>
                  );
                })}
              </dl>
            </div>

            {/* 3. Description Paragraph */}
            <p className="text-ink max-w-xl text-xs leading-relaxed font-medium sm:text-base lg:text-lg">
              {HOME_HERO.body}
            </p>

            {/* 4. Rebuilt Primary CTA Button [ EXPLORE  ○↗ ] matching Figma Comp & Uiverse Diagonal Arrow Animation */}
            <div className="mt-6 flex w-full justify-center sm:mt-7 lg:justify-start">
              <a
                href={HOME_HERO.cta.href}
                className={cn(
                  'group relative inline-flex h-[44px] w-full max-w-[179px] items-center justify-between rounded-full border-2 border-[#035551] bg-[#035551] pr-2.5 pl-7 shadow-[0px_4px_9px_0px_rgba(0,0,0,0.25)] select-none',
                  'font-display text-xs font-bold tracking-[0.08em] text-white uppercase sm:text-sm',
                  'ease-house transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#154B47] hover:shadow-[0px_6px_14px_0px_rgba(0,0,0,0.30)] active:translate-y-0',
                  'focus-visible:ring-2 focus-visible:ring-[#035551] focus-visible:ring-offset-2 focus-visible:outline-none',
                )}
              >
                <span>{HOME_HERO.cta.label}</span>

                <span
                  aria-hidden="true"
                  className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FDFBEE] text-[#035551] sm:h-[26px] sm:w-[26px]"
                >
                  {/* Primary Arrow (exits top-right on hover) */}
                  <ArrowUpRight className="ease-house h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-full group-hover:-translate-y-full group-hover:opacity-0 motion-reduce:transform-none motion-reduce:group-hover:opacity-100" />
                  {/* Copy Arrow (enters from bottom-left on hover) */}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="ease-house absolute h-3.5 w-3.5 -translate-x-full translate-y-full opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:hidden"
                  />
                </span>
              </a>
            </div>
          </div>

          {/* 5. Hero Illustration (Right on Desktop, Below CTA on Mobile/Tablet) */}
          <div className="mt-8 flex w-full justify-center lg:col-span-5 lg:mt-0 lg:justify-end">
            <div className="xs:max-w-[260px] relative w-full max-w-[220px] sm:max-w-[340px] lg:max-w-none">
              <Image
                src="/brand/hero-monogram.webp"
                alt=""
                aria-hidden="true"
                width={441}
                height={473}
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 340px, 220px"
                className="h-auto w-full [mask-image:radial-gradient(ellipse_at_center,black_58%,transparent_82%)] object-contain"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* 6. Hero Bottom Gradient Effect (Figma Frame 5: 132px height transition into next section) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-0 h-[64px] w-full sm:h-[96px] lg:h-[132px]"
        style={{
          background:
            'linear-gradient(180deg, rgba(253, 251, 238, 0) 0%, rgba(253, 251, 238, 0.75) 35%, rgba(220, 203, 142, 0.22) 100%)',
        }}
      />
    </Section>
  );
}
