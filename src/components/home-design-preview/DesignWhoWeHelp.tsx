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
 * The card grid is two 539px columns with a 32px gutter — 1110px, the frame's
 * full measure. The left column runs wide / two-up / wide and the right runs
 * one fixed card above one that stretches, which is why the two columns end
 * flush despite holding four cards and two.
 */

/** Radius, fill and the inset bottom-left shadow the comp draws on every card. */
const CARD_STYLE = {
  backgroundColor: '#ffffff',
  boxShadow: 'inset 4px -4px 4px 0 rgba(3,85,81,0.25)',
} as const;

function Card({
  title,
  body,
  className,
  tight = false,
}: {
  title: string;
  body: string;
  className?: string;
  /** The two-up row is padded 24px rather than 32px, to hold the 539px width. */
  tight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl py-[25px] ${tight ? 'px-6' : 'px-8'} ${className ?? ''}`}
      style={CARD_STYLE}
    >
      <h3 className="mb-4 text-[18px] leading-tight font-semibold text-black">
        {title}
      </h3>
      <p
        className="text-[16px] leading-[150%] font-normal"
        style={{ color: DESIGN_MUTED }}
      >
        {body}
      </p>
    </div>
  );
}

export function DesignWhoWeHelp() {
  const left = WHO_WE_HELP.cards.filter((card) => card.column === 'left');
  const right = WHO_WE_HELP.cards.filter((card) => card.column === 'right');
  const [leadCard, ...leftRest] = left;
  const twoUp = leftRest.filter((card) => card.span === 'half');
  const tailCard = leftRest.find((card) => card.span === 'full');

  return (
    <section
      id="design-who"
      className="overflow-hidden py-[52px] lg:pt-[52px] lg:pb-[97px]"
      style={{ backgroundColor: DESIGN_CREAM }}
      aria-labelledby="design-who-heading"
    >
      <DesignContainer>
        {/*
          The comp splits the band head across the measure: label and heading on
          the left at x=85, supporting copy and the button on the right at x=750.
        */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div>
            <DesignEyebrow>{WHO_WE_HELP.eyebrow}</DesignEyebrow>
            <h2
              id="design-who-heading"
              className="mt-3 text-[clamp(2rem,4.6vw,48px)] leading-[100%] font-bold tracking-[-0.017em]"
            >
              <DesignHeadingText segments={WHO_WE_HELP.heading} />
            </h2>
          </div>

          <div className="lg:w-[428px] lg:shrink-0 lg:pt-2">
            <p className="text-[16px] leading-[150%] font-normal text-black">
              {WHO_WE_HELP.body}
            </p>
            <DesignButton
              href="#design-contact"
              variant="outline"
              className="mt-8"
            >
              {WHO_WE_HELP.cta}
            </DesignButton>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-8 lg:mt-[131px] lg:flex-row">
          <div className="flex flex-1 flex-col gap-6">
            {leadCard ? (
              <Card title={leadCard.title} body={leadCard.body} />
            ) : null}
            <div className="flex flex-col gap-6 sm:flex-row">
              {twoUp.map((card) => (
                <Card
                  key={card.title}
                  title={card.title}
                  body={card.body}
                  tight
                  className="flex-1"
                />
              ))}
            </div>
            {tailCard ? (
              <Card title={tailCard.title} body={tailCard.body} />
            ) : null}
          </div>

          <div className="flex flex-1 flex-col gap-6">
            {right.map((card) => (
              <Card
                key={card.title}
                title={card.title}
                body={card.body}
                // The comp lets the second right-hand card grow so both
                // columns finish level.
                className={card.span === 'grow' ? 'lg:flex-1' : undefined}
              />
            ))}
          </div>
        </div>
      </DesignContainer>
    </section>
  );
}
