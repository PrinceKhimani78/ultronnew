import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';

import {
  DESIGN_CREAM,
  DESIGN_MUTED,
  DesignButton,
  DesignContainer,
  DesignEyebrow,
  DesignHeadingText,
} from './DesignBand';
import { WHO_WE_HELP } from './content';

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
 */

/** Card chrome, per the comp: 18px radius, hairline teal edge, soft lift. */
const CARD_CLASS = [
  'flex flex-col rounded-[20px] bg-white p-5 sm:p-6 lg:p-7',
  'border border-[rgba(3,85,81,0.08)]',
  'shadow-[inset_4px_-4px_4px_0px_rgba(3,85,81,0.25)]',
  'transition-all duration-[250ms] ease-out',
  'hover:-translate-y-1.5 hover:border-[#035551] hover:shadow-[inset_4px_-4px_6px_0px_rgba(3,85,81,0.35),0_18px_40px_rgba(3,85,81,0.14)]',
].join(' ');

function Card({
  title,
  body,
  className,
  index = 0,
}: {
  title: string;
  body: string;
  className?: string;
  /** Position in the bento, 0-based. Drives the stagger delay. */
  index?: number;
}) {
  return (
    <Reveal
      delay={index * STAGGER_MS}
      // A bento cell is often much taller than it is wide, and the default 20%
      // can leave the last card in a tall column waiting.
      amount={0.1}
      className={`${CARD_CLASS} ${className ?? ''}`}
    >
      <h3 className="mb-3 text-[18px] leading-tight font-semibold text-black sm:text-[20px]">
        {title}
      </h3>
      <p
        className="text-[16px] leading-[1.6] font-normal"
        style={{ color: DESIGN_MUTED }}
      >
        {body}
      </p>
    </Reveal>
  );
}

export function DesignWhoWeHelp() {
  const [card1, card2, card3, card4, card5, card6] = WHO_WE_HELP.cards;

  return (
    <section
      id="design-who"
      className="overflow-hidden py-[52px] lg:pt-20 lg:pb-[90px]"
      style={{ backgroundColor: DESIGN_CREAM }}
      aria-labelledby="design-who-heading"
    >
      <DesignContainer>
        {/*
          The comp splits the band head across the measure: label and heading on
          the left at x=85, supporting copy and the button on the right at x=750.
          The right block's first line sits level with the eyebrow, not with the
          heading, which is why there is no top offset on it.
        */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <Reveal>
            <DesignEyebrow>{WHO_WE_HELP.eyebrow}</DesignEyebrow>
            <h2
              id="design-who-heading"
              className="mt-3 text-[clamp(2rem,4.6vw,48px)] leading-[100%] font-bold tracking-[-0.017em]"
            >
              <DesignHeadingText segments={WHO_WE_HELP.heading} />
            </h2>
          </Reveal>

          <Reveal delay={STAGGER_MS} className="lg:w-[428px] lg:shrink-0">
            <p className="text-[16px] leading-[150%] font-normal text-black">
              {WHO_WE_HELP.body}
            </p>
            <Reveal delay={STAGGER_MS * 2} className="mt-8 inline-block">
              <DesignButton href="#design-contact">
                {WHO_WE_HELP.cta}
              </DesignButton>
            </Reveal>
          </Reveal>
        </div>

        <div
          className={[
            'mt-10 grid grid-cols-1 gap-5',
            'sm:grid-cols-2',
            'lg:mt-[72px] lg:grid-cols-[1.6fr_1.6fr_1.8fr] lg:gap-6',
          ].join(' ')}
        >
          <Card
            title={card1.title}
            body={card1.body}
            index={0}
            className="sm:col-span-2 lg:col-span-2"
          />
          <Card title={card2.title} body={card2.body} index={1} />
          <Card title={card3.title} body={card3.body} index={2} />
          <Card
            title={card4.title}
            body={card4.body}
            index={3}
            className="sm:col-span-2 lg:col-span-2"
          />

          {/*
            The right track. One cell at desktop spanning all three rows, a
            two-up row at tablet, stacked at mobile — the cards never leave
            source order, so 1–6 reads the same at every width.
          */}
          <div
            className={[
              'flex flex-col gap-5',
              'sm:col-span-2 sm:flex-row',
              'lg:col-span-1 lg:col-start-3 lg:row-span-3 lg:row-start-1 lg:flex-col lg:gap-6',
            ].join(' ')}
          >
            <Card
              title={card5.title}
              body={card5.body}
              index={4}
              className="sm:flex-1"
            />
            <Card
              title={card6.title}
              body={card6.body}
              index={5}
              className="sm:flex-1 lg:flex-1"
            />
          </div>
        </div>
      </DesignContainer>
    </section>
  );
}
