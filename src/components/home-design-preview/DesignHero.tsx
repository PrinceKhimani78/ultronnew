import Image from 'next/image';

import { STAGGER_MS } from '@/components/motion/config';
import { Parallax } from '@/components/motion/Parallax';
import { Reveal } from '@/components/motion/Reveal';

import {
  DESIGN_CREAM,
  DESIGN_SAND,
  DesignButton,
  DesignContainer,
  DesignHeadingText,
} from './DesignBand';
import { HERO } from './content';
import { STAT_ICONS } from './icons';

/**
 * Hero, from the comp's 1280×832 "Hero" frame.
 *
 * The comp places the nav pill inside this frame at y=49. On the site the
 * header is fixed and lives in the root layout, so the frame's own header is
 * not redrawn here — the top padding instead reproduces the 102px the comp
 * leaves between the bottom of the pill and the top of the h1.
 *
 * The frame is absolutely positioned throughout. This rebuilds it as flow
 * layout at the same dimensions: at 1280px the result is dimensionally the
 * comp, and below that it reflows rather than scaling, because the export
 * defines no layout other than 1280 (support.js contains no media queries,
 * no scaling and no breakpoints).
 */

/**
 * The hero's entrance order, as beats of `STAGGER_MS`.
 *
 * Deliberately the same shape as `BEAT` in `home/Hero.tsx`. The preview route
 * and the live home page were required to be indistinguishable, and that has to
 * include how they open — a divergence here would show up as the two heroes
 * arriving in a different order.
 */
const BEAT = {
  heading: 0,
  stats: STAGGER_MS,
  body: STAGGER_MS * 2,
  cta: STAGGER_MS * 3,
  image: STAGGER_MS * 4,
} as const;

export function DesignHero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{ backgroundColor: DESIGN_CREAM }}
      aria-labelledby="design-hero-heading"
    >
      {/*
        The comp draws its nav pill inside this frame (y=49, 66 tall) and sets
        the h1 at y=217 — a 102px gap below the pill. `PreviewHeader` now
        occupies that 115px in normal flow, so the gap is all this needs to
        carry. It was 198px while the site's *fixed* header sat above instead.
      */}
      <DesignContainer className="pt-10 pb-0 sm:pt-14 lg:pt-[102px]">
        <div className="mx-auto flex max-w-[1150px] flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-4 xl:gap-6">
          <div className="w-full lg:w-[670px] lg:shrink-0 xl:w-[700px]">
            <Reveal delay={0}>
              <h1
                id="design-hero-heading"
                className="m-0 text-[clamp(2.25rem,6.4vw,64px)] leading-[100%] font-bold tracking-[-0.017em]"
              >
                {HERO.headingLines.map((line, index) => (
                  <span key={index} className="block">
                    <DesignHeadingText segments={line} />
                  </span>
                ))}
              </h1>
            </Reveal>

            {/*
              Statistics. A description list rather than a row of divs: each
              figure and its wording are one item, and the comp welds them into
              a single string ("100+ Complex Bank Accounts Opened") so there is
              nothing to split into a separate <dt>. The whole string is the
              term; the icon is decoration.
            */}
            {/* One beat, not three — see the note on the same strip in
                `home/Hero.tsx`. The two must stay identical. */}
            <Reveal
              as="ul"
              delay={BEAT.stats}
              className="mt-[34px] flex w-full flex-col gap-6 px-[30px] py-6 sm:flex-row sm:items-stretch sm:gap-0 sm:py-0"
              style={{ backgroundColor: '#FEFDF2', minHeight: 156 }}
            >
              {HERO.stats.map((stat, index) => {
                const Icon = STAT_ICONS[stat.icon];
                return (
                  <li
                    key={stat.label}
                    className="flex flex-1 items-center sm:py-[28px]"
                  >
                    {index > 0 ? (
                      <span
                        aria-hidden="true"
                        className="mr-6 hidden h-[100px] w-px shrink-0 self-center sm:block"
                        style={{ backgroundColor: DESIGN_SAND }}
                      />
                    ) : null}
                    <div className="flex flex-col gap-2">
                      <span
                        aria-hidden="true"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: '#035551',
                          color: DESIGN_CREAM,
                        }}
                      >
                        <Icon className="h-[22px] w-[22px]" />
                      </span>
                      <span className="text-[16px] leading-[135%] font-bold text-black">
                        {stat.label}
                      </span>
                    </div>
                  </li>
                );
              })}
            </Reveal>

            <Reveal delay={BEAT.body} className="mt-[58px]">
              <p className="w-full text-[20px] leading-[130%] font-medium text-black lg:leading-[100%]">
                {HERO.body}
              </p>
            </Reveal>
          </div>

          {/*
            The comp's 3D monogram, 441×473 placed directly adjacent to content.
          */}
          <Parallax
            distance={24}
            className="flex justify-center lg:mt-[-40px] lg:block lg:w-[441px] lg:shrink-0"
          >
            <Reveal delay={BEAT.image}>
              <Image
                src="/assets/home-design-preview/hero-monogram.webp"
                alt=""
                aria-hidden="true"
                width={441}
                height={473}
                priority
                sizes="(min-width: 1024px) 441px, 80vw"
                className="h-auto w-[min(441px,80vw)] object-contain lg:w-[441px]"
              />
            </Reveal>
          </Parallax>
        </div>
      </DesignContainer>

      {/*
        The comp's closing band: a 132px strip carrying a gradient whose second
        stop sits at 740.91%, so only its first ~13% is ever visible — the wash
        barely leaves cream. Reproduced with the same stop rather than the
        colour it resolves to, so it stays correct if the height changes.
      */}
      <div
        className="relative mt-10 h-[132px] w-full lg:mt-[67px]"
        style={{
          backgroundImage: `linear-gradient(180deg, ${DESIGN_CREAM} 0%, ${DESIGN_SAND} 740.91%)`,
        }}
      >
        <DesignContainer>
          <Reveal delay={BEAT.cta} className="inline-block">
            <DesignButton href="#design-services">{HERO.cta}</DesignButton>
          </Reveal>
        </DesignContainer>
      </div>
    </section>
  );
}
