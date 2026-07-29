import { Briefcase, Globe, Landmark } from 'lucide-react';
import Image from 'next/image';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { HeadingText } from '@/components/ui/SectionHeading';
import { HOME_HERO } from '@/content/home';

/**
 * Hero section fully responsive across all screen sizes (320px to 1920px+):
 * - Desktop (1200px+): 2-column layout (Left: Heading, Trust Strip, Description, CTA; Right: 3D Monogram)
 * - Tablet (768-1023px) & Mobile (320-767px): Stacked single column with center-aligned text, order: Heading -> Trust Strip -> Description -> CTA -> 3D Illustration
 * - Touch-friendly CTA button (min-h-[52px], max-w-[320px] on mobile)
 * - Responsive clamp typography (30px on small mobile to 60px on desktop)
 * - Zero overflow, zero clipped content, smooth image scaling
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
      className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20"
    >
      <Container width="wide">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          {/* Main Content Column (Left on Desktop, Full Width on Tablet/Mobile) */}
          <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
            {/* 1. Heading */}
            <h1 className="font-display text-[clamp(1.875rem,4.8vw,3.75rem)] leading-[1.1] font-bold tracking-tight text-[#121a18] sm:leading-[1.08]">
              <HeadingText segments={HOME_HERO.heading} />
            </h1>

            {/* 2. Trust Strip / Metrics Bar */}
            <div className="bg-surface-raised/40 shadow-soft my-6 w-full max-w-2xl rounded-2xl border border-[#035551]/15 p-4 sm:my-8 sm:p-5 lg:max-w-none">
              <dl className="grid grid-cols-1 items-center gap-4 sm:grid-cols-3 sm:gap-2">
                {HOME_HERO.stats.map((stat, index) => {
                  const Icon = STAT_ICONS[stat.icon as keyof typeof STAT_ICONS];
                  return (
                    <div
                      key={stat.label}
                      className="relative flex items-center justify-center gap-3.5 sm:justify-start sm:pr-2"
                    >
                      <span
                        aria-hidden="true"
                        className="text-surface inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#035551] shadow-[0px_3px_6px_rgba(3,85,81,0.25)] sm:h-11 sm:w-11"
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                      <div className="text-left">
                        <dt className="sr-only">{stat.label}</dt>
                        <dd>
                          <span className="font-display text-ink block text-lg leading-none font-bold tracking-tight sm:text-xl lg:text-2xl">
                            {stat.value}
                          </span>
                          <span
                            aria-hidden="true"
                            className="mt-1 block max-w-[140px] text-[11px] leading-tight font-medium text-[#035551] sm:text-xs"
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
            <p className="text-ink max-w-xl text-sm leading-relaxed font-medium sm:text-base lg:text-lg">
              {HOME_HERO.body}
            </p>

            {/* 4. Primary CTA Button */}
            <div className="mt-6 flex w-full justify-center sm:mt-8 lg:justify-start">
              <Button
                asChild
                size="lg"
                arrow
                className="min-h-[52px] w-full max-w-[320px] px-7 text-sm font-semibold sm:w-auto sm:text-base"
              >
                <a href={HOME_HERO.cta.href}>{HOME_HERO.cta.label}</a>
              </Button>
            </div>
          </div>

          {/* 5. Hero Illustration (Right on Desktop, Below CTA on Mobile/Tablet) */}
          <div className="mt-8 flex w-full justify-center lg:col-span-5 lg:mt-0 lg:justify-end">
            <div className="xs:max-w-[300px] relative w-full max-w-[260px] sm:max-w-[360px] lg:max-w-none">
              <Image
                src="/brand/hero-monogram.webp"
                alt=""
                aria-hidden="true"
                width={441}
                height={473}
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 360px, 280px"
                className="h-auto w-full [mask-image:radial-gradient(ellipse_at_center,black_58%,transparent_82%)] object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
