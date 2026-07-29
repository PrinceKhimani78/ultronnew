import { Briefcase, CircleCheck, Globe, Landmark } from 'lucide-react';
import Image from 'next/image';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { HeadingText } from '@/components/ui/SectionHeading';
import { HOME_HERO } from '@/content/home';

/**
 * The four-second band.
 *
 * Two columns: the proposition, statistics and call to action on the left; the
 * brand panel on the right. The statistics sit *inside* the hero in the design
 * rather than forming a separate strip beneath it.
 *
 * Deliberately not animated on entry — the heading is the Largest Contentful
 * Paint element, and fading it in delays LCP by exactly the duration of the fade.
 */

/** Icon per statistic, keyed by the `icon` field in content. */
const STAT_ICONS = {
  bank: Landmark,
  briefcase: Briefcase,
  globe: Globe,
  check: CircleCheck,
} as const;

export function Hero() {
  return (
    <Section
      id="top"
      spacing="spacious"
      className="overflow-hidden pt-28 sm:pt-36"
    >
      <Container width="wide">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h1 className="font-display text-[clamp(2.25rem,5.2vw,3.75rem)] leading-[1.08] font-bold tracking-[-0.03em]">
              <HeadingText segments={HOME_HERO.heading} />
            </h1>

            {/*
              Statistics as a description list: each figure is a value belonging
              to a label, which is what `<dl>` means. A grid of `<div>`s would
              announce eight unrelated fragments.

              Two-by-two rather than four across. The client's copy added a
              fourth statistic and a longer value ("End-to-End"); four columns
              inside a 7/12 grid track leave each figure about 170px, which wraps
              the labels to three lines and reads as cramped. The divider is
              therefore drawn on the second column only, not on every item after
              the first.
            */}
            <dl className="border-line bg-surface-raised/60 mt-10 grid gap-6 rounded-2xl border p-6 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-6">
              {HOME_HERO.stats.map((stat, index) => {
                const Icon = STAT_ICONS[stat.icon];
                return (
                  <div
                    key={stat.label}
                    className={
                      index % 2 === 1
                        ? 'sm:border-line sm:border-l sm:pl-4'
                        : ''
                    }
                  >
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="bg-brand text-surface inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <dt className="sr-only">{stat.label}</dt>
                        <dd>
                          <span className="font-display text-ink block text-xl leading-none font-bold tabular-nums">
                            {stat.value}
                          </span>
                          <span
                            aria-hidden="true"
                            className="text-ink-muted mt-1.5 block text-[0.8rem] leading-snug"
                          >
                            {stat.label}
                          </span>
                        </dd>
                      </div>
                    </div>
                  </div>
                );
              })}
            </dl>

            <p className="text-ink mt-9 max-w-xl leading-relaxed font-medium">
              {HOME_HERO.body}
            </p>

            <div className="mt-8">
              <Button asChild size="lg" arrow>
                <a href={HOME_HERO.cta.href}>{HOME_HERO.cta.label}</a>
              </Button>
            </div>
          </div>

          {/*
            The brand panel: the rendered 3D monogram from the design.

            The artwork carries its own cream ground and gold constellation
            field, so the placeholder card, border, dot pattern and concentric
            rings that previously stood in for it have all been removed — layering
            them under the asset would double the pattern.

            `priority` because this is the LCP candidate on wide viewports:
            without it Next lazy-loads the image and the largest paint waits on
            the intersection observer. `width`/`height` are the intrinsic
            dimensions, so the box is reserved before the bytes arrive and the
            hero cannot shift.

            `aria-hidden` with an empty `alt`: it is decorative. It states
            nothing the `h1` beside it does not already say, and announcing "3D
            company logo" to a screen reader is noise, not information.

            ⚠️ The supplied render is only 441×473. On a wide viewport this
            column is roughly 500 CSS px, so the image is at about 1× and will
            look soft on a retina display. TODO(design): re-export at ~1100px
            wide; nothing here changes but the two dimension props.
          */}
          <div className="lg:col-span-5">
            <Image
              src="/brand/hero-monogram.webp"
              alt=""
              aria-hidden="true"
              // Intrinsic size of the supplied render. See the note below.
              width={441}
              height={473}
              priority
              // Never larger than the 5/12 column it sits in.
              sizes="(min-width: 1024px) 40vw, 100vw"
              /**
               * The render's cream ground is a hair lighter than `--color-surface`
               * and is itself slightly graduated, so no flat colour correction
               * can hide the join — it showed as a rectangular seam against the
               * page. Fading the edges to transparent dissolves the boundary
               * regardless of the exact colour, and keeps working if the surface
               * token is ever retuned.
               */
              className="h-auto w-full [mask-image:radial-gradient(ellipse_at_center,black_58%,transparent_82%)]"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
