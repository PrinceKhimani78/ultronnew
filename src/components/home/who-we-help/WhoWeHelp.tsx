import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Eyebrow, HeadingText } from '@/components/ui/SectionHeading';
import { WHO_WE_HELP_CARDS, WHO_WE_HELP_HEADER } from '@/content/who-we-help';
import { WhoWeHelpCard } from './WhoWeHelpCard';

/**
 * "Who We Help" section matching the Figma comp:
 * - Background: Clean off-white #FDFBEE (no gradients, patterns, or graphics)
 * - Top Row: Left Eyebrow + "Who We Help" (green "Help") & Right body copy + "ABOUT US" CTA button
 * - Desktop Asymmetric Grid:
 *   - Left Column (60% width):
 *     Row 1: Wide Card (International Entrepreneurs)
 *     Row 2: 2 Equal Cards (Foreign Investors, SMEs & Growing Businesses)
 *     Row 3: Wide Card (Startups & Founders)
 *   - Right Column (40% width):
 *     Card 1: High-Net-Worth Individuals
 *     Card 2: Global Companies Expanding to the UAE
 */

export function WhoWeHelpSection() {
  const cardMap = Object.fromEntries(
    WHO_WE_HELP_CARDS.map((card) => [card.id, card]),
  );

  return (
    <Section className="bg-[#FDFBEE] pt-16 pb-24 sm:pt-20 sm:pb-32">
      <Container width="wide">
        {/* Top Header Section */}
        <div className="mb-14 grid gap-8 lg:mb-16 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-6">
            <Eyebrow>{WHO_WE_HELP_HEADER.eyebrow}</Eyebrow>
            <h2 className="font-display mt-4 text-[clamp(2.25rem,4.5vw,3.25rem)] leading-[1.1] font-bold tracking-tight text-[#121a18]">
              <HeadingText segments={WHO_WE_HELP_HEADER.heading} />
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="text-ink-muted max-w-xl text-base leading-relaxed">
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

        {/* Asymmetric Content Grid matching Figma comp */}
        <div className="grid items-stretch gap-6 lg:grid-cols-12">
          {/* Left Column (7 cols / ~60% width) */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {/* Row 1: International Entrepreneurs (Wide) */}
            {cardMap['international-entrepreneurs'] && (
              <WhoWeHelpCard
                item={cardMap['international-entrepreneurs']}
                index={0}
                className="flex-1"
              />
            )}

            {/* Row 2: Foreign Investors & SMEs (2 Equal Columns) */}
            <div className="grid gap-6 sm:grid-cols-2">
              {cardMap['foreign-investors'] && (
                <WhoWeHelpCard
                  item={cardMap['foreign-investors']}
                  index={2}
                  className="h-full"
                />
              )}
              {cardMap['smes-growing-businesses'] && (
                <WhoWeHelpCard
                  item={cardMap['smes-growing-businesses']}
                  index={3}
                  className="h-full"
                />
              )}
            </div>

            {/* Row 3: Startups & Founders (Wide) */}
            {cardMap['startups-founders'] && (
              <WhoWeHelpCard
                item={cardMap['startups-founders']}
                index={4}
                className="flex-1"
              />
            )}
          </div>

          {/* Right Column (5 cols / ~40% width) */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* High-Net-Worth Individuals (Tall Card) */}
            {cardMap['high-net-worth'] && (
              <WhoWeHelpCard
                item={cardMap['high-net-worth']}
                index={1}
                className="flex-1"
              />
            )}

            {/* Global Companies Expanding to the UAE */}
            {cardMap['global-companies'] && (
              <WhoWeHelpCard
                item={cardMap['global-companies']}
                index={5}
                className="flex-1"
              />
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
