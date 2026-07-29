import { Briefcase, Globe, Landmark } from 'lucide-react';
import Image from 'next/image';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { HeadingText } from '@/components/ui/SectionHeading';
import { HOME_HERO } from '@/content/home';

/**
 * Hero section matching the Figma design layout:
 * - Top: Heading ("Where Complex Becomes Possible.")
 * - Middle: Horizontal proof metrics bar (100+ Complex Bank Accounts Opened, 30+ Structured Business Setups, All Nationalities Welcome) with circular teal badges & vertical dividers.
 * - Bottom: Body copy ("End-to-end business advisory...") and WhatsApp CTA button.
 * - Right column: 3D monogram brand image.
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
      className="overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16"
    >
      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[clamp(2.25rem,5.2vw,3.75rem)] leading-[1.08] font-bold tracking-[-0.03em]">
              <HeadingText segments={HOME_HERO.heading} />
            </h1>

            {/* Horizontal Proof / Metrics Bar positioned directly ABOVE the body paragraph */}
            <div className="bg-surface-raised/40 shadow-soft my-8 rounded-2xl border border-[#035551]/15 p-4 sm:p-5">
              <dl className="grid items-center gap-6 sm:grid-cols-3 sm:gap-2">
                {HOME_HERO.stats.map((stat, index) => {
                  const Icon = STAT_ICONS[stat.icon as keyof typeof STAT_ICONS];
                  return (
                    <div
                      key={stat.label}
                      className="relative flex items-center gap-3.5 sm:pr-3"
                    >
                      <span
                        aria-hidden="true"
                        className="text-surface inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#035551] shadow-[0px_3px_6px_rgba(3,85,81,0.25)]"
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <dt className="sr-only">{stat.label}</dt>
                        <dd>
                          <span className="font-display text-ink block text-xl leading-none font-bold tracking-tight sm:text-2xl">
                            {stat.value}
                          </span>
                          <span
                            aria-hidden="true"
                            className="mt-1 block max-w-[130px] text-xs leading-tight font-medium text-[#035551]"
                          >
                            {stat.label}
                          </span>
                        </dd>
                      </div>

                      {/* Vertical divider line between stats */}
                      {index < HOME_HERO.stats.length - 1 && (
                        <div
                          aria-hidden="true"
                          className="absolute top-1/2 right-0 hidden h-9 w-[1.5px] -translate-y-1/2 bg-[#035551]/25 sm:block"
                        />
                      )}
                    </div>
                  );
                })}
              </dl>
            </div>

            <p className="text-ink max-w-xl text-base leading-relaxed font-medium sm:text-lg">
              {HOME_HERO.body}
            </p>

            <div className="mt-8">
              <Button asChild size="lg" arrow>
                <a href={HOME_HERO.cta.href}>{HOME_HERO.cta.label}</a>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Image
              src="/brand/hero-monogram.webp"
              alt=""
              aria-hidden="true"
              width={441}
              height={473}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full [mask-image:radial-gradient(ellipse_at_center,black_58%,transparent_82%)]"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
