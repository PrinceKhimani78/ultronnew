import Image from 'next/image';

import { Container } from '@/components/layout/Container';
import { STAGGER_MS } from '@/components/motion/config';
import { Parallax } from '@/components/motion/Parallax';
import { Reveal } from '@/components/motion/Reveal';
import { ActionButton } from '@/components/ui/ActionButton';
import { HeadingText } from '@/components/ui/SectionHeading';
import { STAT_ICONS, type StatIconName } from '@/components/ui/StatIcons';
import { HOME_HERO } from '@/content/home';

/**
 * Hero, rebuilt from the comp's 1280×832 "Hero" frame, with the
 * client-approved copy in its place.
 *
 * The comp places the nav pill inside this frame at y=49 and sets the h1 at
 * y=217. The site header is `fixed` and lives in the root layout, so it occupies
 * no flow height here and the whole 217px has to come from this section's top
 * padding: 49 (header inset) + 66 (bar) + 102 (the comp's gap below the pill).
 * The narrower breakpoints carry the same sum against their own header inset.
 *
 * The frame is absolutely positioned throughout. This is flow layout at the same
 * dimensions: at 1280 the result is dimensionally the comp, and below that it
 * reflows rather than scaling, because the export defines no layout other than
 * 1280 (its support.js contains no media queries, no scaling, no breakpoints).
 */

/** The comp's cream, and the slightly warmer cream of the statistics bar. */
const CREAM = '#FDFBEE';
const STRIP = '#FEFDF2';
const SAND = '#DCCB8E';
const BRAND = '#035551';

/**
 * The hero's entrance order, as beats of `STAGGER_MS`.
 *
 * The hero is the one place on the site where the sequence is authored rather
 * than derived, because its elements sit in three different containers — the
 * copy column, the illustration column and the gradient band below — and no
 * single `Stagger` spans them. Naming the beats here keeps the order readable
 * as a list instead of as five unexplained numbers scattered through the JSX.
 *
 * All five are above the fold at load, so all five observers fire together and
 * the delays alone carry the rhythm.
 *
 * The comp draws no hero badge. If one is ever added it takes beat 0 and
 * everything below shifts down one.
 */
const BEAT = {
  heading: 0,
  stats: STAGGER_MS,
  body: STAGGER_MS * 2,
  cta: STAGGER_MS * 3,
  image: STAGGER_MS * 4,
} as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{ backgroundColor: CREAM }}
      aria-labelledby="home-hero-heading"
    >
      <Container
        width="wide"
        className="pt-[130px] pb-0 sm:pt-[146px] lg:pt-[217px]"
      >
        <div className="flex flex-col gap-8 sm:gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16 xl:gap-[160px] 2xl:gap-[240px]">
          <div className="w-full lg:max-w-[654px] lg:shrink">
            {/*
              The heading reveals as one block. It previously typed itself in a
              character at a time; that is gone, along with the per-character
              timer and the mutating accessible name it produced.
            */}
            <Reveal delay={BEAT.heading}>
              <h1
                id="home-hero-heading"
                className="font-display m-0 text-[clamp(2.25rem,6.4vw,64px)] leading-[100%] font-bold tracking-[-0.017em] text-black"
              >
                {/*
                  `accentClassName` sets the emphasised words in the comp's full
                  brand teal rather than the lighter `brand-bright`; at 64px it
                  needs no extra separation from the cream, and it measures
                  8.4:1 against it.
                */}
                <HeadingText
                  segments={HOME_HERO.heading}
                  accentClassName="text-[#035551]"
                />
              </h1>
            </Reveal>

            {/*
              Statistics. A list rather than a row of divs: the comp welds each
              figure to its wording into one string ("130+ Bank Accounts
              Opened"), so there is nothing to split into a separate term and
              definition. The whole string is the item; the icon is decoration.

              The strip is ONE beat of the hero sequence, not three. It is a
              single drawn object in the comp — one cream plate with two hairline
              dividers — so revealing its three figures separately would animate
              a division the design does not draw, and it would push the
              paragraph and the button out of the 100ms rhythm they share with
              everything else here.

              `Reveal` renders the `<ul>` itself — it does not wrap it — so the
              strip's own flex layout, background and min-height are untouched.

              ⚠️ PLACEHOLDER FIGURES. `HOME_HERO.stats` carries numbers that have
              not been client-verified. They must be confirmed before launch.
            */}
            <Reveal
              as="ul"
              delay={BEAT.stats}
              /*
                `lg:-ml-[30px]` cancels this strip's own `px-[30px]`, so the
                stat icons land on the same vertical line as the h1 above them
                while the cream plate still overhangs to the left — which is
                exactly how the comp draws it.

                Only from `lg`, where the gutter is 48px and can absorb a 30px
                pull. At mobile the gutter is 20px and the plate would breach
                the viewport edge.
              */
              className="mt-[34px] flex w-full max-w-[646px] flex-col gap-6 px-[30px] py-6 sm:flex-row sm:items-stretch sm:gap-0 sm:py-0 lg:-ml-[30px]"
              // The strip's own ground and its 156px floor. Both are layout, not
              // motion — they stay on the element that `Reveal` renders.
              style={{ backgroundColor: STRIP, minHeight: 156 }}
            >
              {HOME_HERO.stats.map((stat, index) => {
                const Icon = STAT_ICONS[stat.icon as StatIconName];
                return (
                  <li
                    key={stat.label}
                    className="flex flex-1 items-center sm:py-[28px]"
                  >
                    {index > 0 ? (
                      <span
                        aria-hidden="true"
                        className="mr-6 hidden h-[100px] w-px shrink-0 self-center sm:block"
                        style={{ backgroundColor: SAND }}
                      />
                    ) : null}
                    <div className="flex flex-col gap-2">
                      <span
                        aria-hidden="true"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: BRAND, color: CREAM }}
                      >
                        <Icon className="h-[22px] w-[22px]" />
                      </span>
                      <span className="text-[16px] leading-[135%] font-bold text-black">
                        {stat.value} {stat.label}
                      </span>
                    </div>
                  </li>
                );
              })}
            </Reveal>

            {/* `mt-[58px]` moves to the wrapper — the reveal IS the element in
                flow now, so the margin has to live where the box does. */}
            <Reveal delay={BEAT.body} className="mt-[58px]">
              <p className="max-w-[654px] text-[20px] leading-[130%] font-medium text-black lg:leading-[100%]">
                {HOME_HERO.body}
              </p>
            </Reveal>
          </div>

          {/*
            The comp's 3D monogram, 441×473 at x=792.

            Two layers, and they have to be separate elements: `Parallax` writes
            a scroll-linked `transform` on every frame, while the reveal's
            keyframes animate a `transform` of their own. Both on one node and
            the last writer wins — the reveal would be dragged back by the
            parallax mid-flight. Outer drifts, inner arrives.

            The parallax div carries the layout classes so no box is added to the
            flex row; the reveal is inside it and wraps only the image.
          */}
          <Parallax
            distance={24}
            className="flex justify-center lg:mt-[-54px] lg:block lg:w-[441px] lg:shrink-0"
          >
            <Reveal delay={BEAT.image}>
              <Image
                src="/brand/hero-monogram.webp"
                alt=""
                aria-hidden="true"
                width={441}
                height={473}
                priority
                sizes="(min-width: 1024px) 441px, 80vw"
                className="h-auto w-[min(441px,80vw)] lg:w-[441px]"
              />
            </Reveal>
          </Parallax>
        </div>
      </Container>

      {/*
        The comp's closing band: a 132px strip carrying a gradient whose second
        stop sits at 740.91%, so only its first ~13% is ever visible — the wash
        barely leaves cream. Reproduced with the same stop rather than the colour
        it resolves to, so it stays correct if the height changes. The primary
        call to action sits inside it, on the page measure.
      */}
      <div
        className="relative mt-10 h-[132px] w-full lg:mt-[67px]"
        style={{
          backgroundImage: `linear-gradient(180deg, ${CREAM} 0%, ${SAND} 740.91%)`,
        }}
      >
        <Container width="wide">
          {/* `inline-block` so the reveal box hugs the button rather than
              spanning the measure — a full-width wrapper would make the rise
              read as the whole band moving. */}
          <Reveal delay={BEAT.cta} className="inline-block">
            <ActionButton href={HOME_HERO.cta.href}>
              {HOME_HERO.cta.label.toUpperCase()}
            </ActionButton>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
