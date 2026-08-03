import { Container } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { ActionButton } from '@/components/ui/ActionButton';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { WHO_WE_HELP_CARDS, WHO_WE_HELP_HEADER } from '@/content/who-we-help';

import { WhoWeHelpCard } from './WhoWeHelpCard';

/**
 * Who We Help, from the comp's 1280×944 frame.
 *
 * The bento is one CSS Grid at `1.6fr 1.6fr 1.8fr` — the comp's measure splits
 * 66/32 between the left pair and the right track, which those ratios reproduce
 * without hard-coding pixel widths that would only be right at 1280.
 *
 * The right track is a single grid cell spanning all three rows, holding its two
 * cards in a nested flex column. That is deliberate rather than lazy: the comp's
 * right-hand cards do NOT align to the left column's row edges — the pair splits
 * the full height between itself, with the lower card taking the remainder. A
 * strict nine-cell grid would force those edges to line up and would drag the
 * short "Startups & Founders" card to the height of its right-hand neighbour.
 *
 *   row 1   card 1 (spans cols 1–2)   │
 *   row 2   card 2  │  card 3         │  cards 5 and 6, splitting the height
 *   row 3   card 4 (spans cols 1–2)   │
 *
 * DOM order stays 1–6, so the tablet and mobile reflows need no reordering.
 *
 * The band itself is a server component. Only the cards are client-side, because
 * only they animate — marking the whole section `'use client'` to reveal six
 * cards would ship the heading and the button to the browser for nothing.
 */

const CREAM = '#FDFBEE';

export function WhoWeHelpSection() {
  const [card1, card2, card3, card4, card5, card6] = WHO_WE_HELP_CARDS;

  return (
    <section
      id="who-we-help"
      className="overflow-hidden py-[52px] lg:pt-20 lg:pb-[90px]"
      style={{ backgroundColor: CREAM }}
      aria-labelledby="who-we-help-heading"
    >
      <Container width="wide">
        {/*
          The comp splits the band head across the measure: label and heading on
          the left at x=85, supporting copy and the button on the right at x=750.
          The right block's first line sits level with the eyebrow, not with the
          heading, which is why there is no top offset on it.
        */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          {/* Header: fade with a slight upward reveal. */}
          <Reveal variant="text">
            <BandEyebrow>{WHO_WE_HELP_HEADER.eyebrow}</BandEyebrow>
            <h2
              id="who-we-help-heading"
              className="font-display mt-3 text-[clamp(2rem,4.6vw,48px)] leading-[100%] font-bold tracking-[-0.017em] text-black"
            >
              {WHO_WE_HELP_HEADER.heading.map((segment, index) => (
                <span
                  key={index}
                  className={segment.accent ? 'text-[#035551]' : undefined}
                >
                  {segment.text}
                </span>
              ))}
            </h2>
          </Reveal>

          {/* Intro: a plain fade, then the button last. */}
          <Reveal
            variant="text"
            direction="none"
            delay={0.1}
            className="lg:w-[428px] lg:shrink-0"
          >
            <p className="text-[16px] leading-[150%] font-normal text-black">
              {WHO_WE_HELP_HEADER.body}
            </p>
            <Reveal variant="button" delay={0.22} className="mt-8 inline-block">
              <ActionButton
                href={WHO_WE_HELP_HEADER.cta.href}
                variant="outline"
              >
                {WHO_WE_HELP_HEADER.cta.label}
              </ActionButton>
            </Reveal>
          </Reveal>
        </div>

        {/*
          Card entrances follow the bento's own geometry, per the brief: the
          leftmost track slides in from the left, the rightmost from the right,
          and everything spanning the middle rises. Each card carries its own
          index-derived delay rather than relying on `staggerChildren`, because
          the right track is a nested flex column and Framer only sequences a
          motion element's DIRECT variant children — cards 5 and 6 would drop out
          of the sequence. An explicit delay is deterministic at any depth.
        */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-[72px] lg:grid-cols-[1.6fr_1.6fr_1.8fr] lg:gap-6">
          <WhoWeHelpCard
            item={card1}
            index={0}
            direction="up"
            className="sm:col-span-2 lg:col-span-2"
          />
          <WhoWeHelpCard item={card2} index={1} direction="left" />
          <WhoWeHelpCard item={card3} index={2} direction="up" />
          <WhoWeHelpCard
            item={card4}
            index={3}
            direction="up"
            className="sm:col-span-2 lg:col-span-2"
          />

          {/*
            The right track. One cell at desktop spanning all three rows, a
            two-up row at tablet, stacked at mobile — the cards never leave
            source order, so 1–6 reads the same at every width.
          */}
          <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row lg:col-span-1 lg:col-start-3 lg:row-span-3 lg:row-start-1 lg:flex-col lg:gap-6">
            <WhoWeHelpCard
              item={card5}
              index={4}
              direction="right"
              className="sm:flex-1"
            />
            <WhoWeHelpCard
              item={card6}
              index={5}
              direction="right"
              className="sm:flex-1 lg:flex-1"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
