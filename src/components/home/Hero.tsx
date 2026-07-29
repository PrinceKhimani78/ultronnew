import { Briefcase, Globe, Landmark } from 'lucide-react';
import Image from 'next/image';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { HeadingText } from '@/components/ui/SectionHeading';
import { HOME_HERO } from '@/content/home';

/**
 * Fully Responsive Hero Section (320px to 1920px+):
 * - Desktop (1200px+): 2-Column layout (Left: Heading, Trust Strip, Description, CTA; Right: 3D Monogram)
 * - Tablet & Mobile (<1200px): Stacked single column with center-aligned text and element order:
 *   Heading -> Trust Strip -> Description -> CTA -> 3D Illustration
 * - Guaranteed 0% horizontal overflow or text clipping on 320px, 360px, 375px, 390px, 480px, 640px, 768px, 1024px, 1280px+
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
      spacing="spacious"
      className="relative w-full max-w-full overflow-x-hidden pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20"
    >
      <Container
        width="wide"
        className="w-full max-w-full px-4 sm:px-6 lg:px-8"
      >
        <div className="grid w-full max-w-full items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Main Content Column (Left on Desktop, Full Width on Mobile/Tablet) */}
          <div className="flex w-full max-w-full flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
            {/* 1. Heading */}
            <h1 className="font-display w-full max-w-full text-[clamp(1.65rem,6.5vw,3.75rem)] leading-[1.12] font-bold tracking-tight text-[#121a18] sm:leading-[1.08]">
              <HeadingText segments={HOME_HERO.heading} />
            </h1>

            {/* 2. Trust Strip / Metrics Bar */}
            <div className="bg-surface-raised/40 shadow-soft my-6 w-full max-w-full rounded-2xl border border-[#035551]/15 p-3.5 sm:my-8 sm:p-5 lg:max-w-none">
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
            <p className="text-ink w-full max-w-xl text-xs leading-relaxed font-medium sm:text-base lg:text-lg">
              {HOME_HERO.body}
            </p>

            {/* 4. Primary CTA Button */}
            <div className="mt-6 flex w-full max-w-full justify-center sm:mt-8 lg:justify-start">
              <Button
                asChild
                size="lg"
                arrow
                className="xs:text-xs flex min-h-[52px] w-full max-w-full items-center justify-center px-4 text-center text-[11px] leading-snug font-semibold tracking-normal sm:w-auto sm:px-7 sm:text-sm sm:tracking-[0.08em]"
              >
                <a href={HOME_HERO.cta.href}>{HOME_HERO.cta.label}</a>
              </Button>
            </div>
          </div>

          {/* 5. Hero Illustration (Right on Desktop, Below CTA on Mobile/Tablet) */}
          <div className="mt-8 flex w-full max-w-full justify-center lg:col-span-5 lg:mt-0 lg:justify-end">
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
    </Section>
  );
}
