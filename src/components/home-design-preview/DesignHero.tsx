import Image from 'next/image';

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
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-[15px]">
          <div className="w-full lg:w-[654px] lg:shrink-0">
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

            {/*
              Statistics. A description list rather than a row of divs: each
              figure and its wording are one item, and the comp welds them into
              a single string ("100+ Complex Bank Accounts Opened") so there is
              nothing to split into a separate <dt>. The whole string is the
              term; the icon is decoration.
            */}
            <ul
              className="mt-[34px] flex w-full max-w-[646px] flex-col gap-6 px-[30px] py-6 sm:flex-row sm:items-stretch sm:gap-0 sm:py-0"
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
            </ul>

            <p className="mt-[58px] max-w-[654px] text-[20px] leading-[130%] font-medium text-black lg:leading-[100%]">
              {HERO.body}
            </p>
          </div>

          {/*
            The comp's 3D monogram, 441×473 at x=792.

            ⚠️ SUBSTITUTED ASSET. The source export is `assets/cdb8109c99ca62e3.png`,
            which the Design MCP cannot return — see icons.tsx for the 256 KiB
            cap. `hero-monogram.webp` already in `public/brand` is the same
            artwork at exactly the 441×473 the comp specifies, so it stands in
            rather than a placeholder.
          */}
          <div className="flex justify-center lg:mt-[-54px] lg:block lg:w-[441px] lg:shrink-0">
            <Image
              src="/assets/home-design-preview/hero-monogram.webp"
              alt=""
              aria-hidden="true"
              width={441}
              height={473}
              priority
              sizes="(min-width: 1024px) 441px, 80vw"
              className="h-auto w-[min(441px,80vw)] lg:w-[441px]"
            />
          </div>
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
          <DesignButton href="#design-services">{HERO.cta}</DesignButton>
        </DesignContainer>
      </div>
    </section>
  );
}
