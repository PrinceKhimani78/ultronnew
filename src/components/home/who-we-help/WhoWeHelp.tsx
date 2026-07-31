import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Eyebrow, HeadingText } from '@/components/ui/SectionHeading';
import { WHO_WE_HELP_CARDS, WHO_WE_HELP_HEADER } from '@/content/who-we-help';
import { WhoWeHelpCard } from './WhoWeHelpCard';

/**
 * "Who We Help" section matching the Apple Bento Grid design language:
 * - Background: Clean off-white #FDFBEE
 * - Cards: Compact 2-column asymmetric layout where every card hugs its content naturally
 */

export function WhoWeHelpSection() {
  const cardMap = Object.fromEntries(
    WHO_WE_HELP_CARDS.map((card) => [card.id, card]),
  );

  return (
    <Section className="bg-[#FDFBEE]">
      <Container width="wide">
        {/* Top Header Section */}
        <div className="mb-10 grid gap-8 lg:mb-12 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-6">
            <Eyebrow>{WHO_WE_HELP_HEADER.eyebrow}</Eyebrow>
            <h2 className="font-display mt-4 text-[clamp(2.25rem,4.5vw,3.25rem)] leading-[1.1] font-bold tracking-tight text-[#121a18]">
              <HeadingText segments={WHO_WE_HELP_HEADER.heading} />
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="text-ink-muted max-w-xl text-[18px] leading-relaxed">
              {WHO_WE_HELP_HEADER.body}
            </p>
            <div className="mt-6">
              <Button asChild variant="outline" arrow>
                <a href={WHO_WE_HELP_HEADER.cta.href}>
                  {WHO_WE_HELP_HEADER.cta.label}
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Asymmetric Content Grid - Compact Apple Bento Layout */}
        <div className="grid items-start gap-6 lg:grid-cols-12">
          {/* Left Column (7 cols / ~60% width) */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {/* Row 1: Card 1 (Wide) */}
            <WhoWeHelpCard
              item={
                cardMap['uae-smes-operating-businesses'] || WHO_WE_HELP_CARDS[0]
              }
              index={0}
            />

            {/* Row 2: Card 3 & Card 4 (2 Equal Columns) */}
            <div className="grid gap-6 sm:grid-cols-2">
              <WhoWeHelpCard
                item={cardMap['foreign-investors'] || WHO_WE_HELP_CARDS[2]}
                index={2}
              />
              <WhoWeHelpCard
                item={
                  cardMap['smes-growing-businesses'] || WHO_WE_HELP_CARDS[3]
                }
                index={3}
              />
            </div>

            {/* Row 3: Card 5 (Wide) */}
            <WhoWeHelpCard
              item={cardMap['startups-founders'] || WHO_WE_HELP_CARDS[4]}
              index={4}
            />
          </div>

          {/* Right Column (5 cols / ~40% width) */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Card 2 (Family Offices) */}
            <WhoWeHelpCard
              item={cardMap['high-net-worth'] || WHO_WE_HELP_CARDS[1]}
              index={1}
            />

            {/* Card 6 (Global Companies) */}
            <WhoWeHelpCard
              item={cardMap['global-companies'] || WHO_WE_HELP_CARDS[5]}
              index={5}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
