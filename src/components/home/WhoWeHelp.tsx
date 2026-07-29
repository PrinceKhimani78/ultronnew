import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Eyebrow, HeadingText } from '@/components/ui/SectionHeading';
import { WHO_WE_HELP } from '@/content/home';

/**
 * Audience qualification.
 *
 * The design splits the header: title on the left, supporting paragraph and the
 * About button on the right. Beneath it, six cards in two columns with the right
 * column offset downward, so the eye moves in a zigzag rather than in rows.
 */
export function WhoWeHelp() {
  return (
    <Section className="pt-2 pb-28 sm:pt-6 sm:pb-36">
      <Container width="wide">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>{WHO_WE_HELP.eyebrow}</Eyebrow>
            <h2 className="font-display mt-4 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.02em]">
              <HeadingText segments={WHO_WE_HELP.heading} />
            </h2>
          </div>

          <div className="lg:col-span-7">
            <p className="text-ink-muted max-w-xl leading-relaxed">
              {WHO_WE_HELP.body}
            </p>
            <div className="mt-6">
              <Button asChild variant="outline" arrow>
                <a href={WHO_WE_HELP.cta.href}>{WHO_WE_HELP.cta.label}</a>
              </Button>
            </div>
          </div>
        </div>

        <ul className="mt-14 grid gap-6 lg:grid-cols-2">
          {WHO_WE_HELP.audiences.map((audience, index) => (
            <Reveal
              as="li"
              key={audience.title}
              delay={(index % 2) * 0.06}
              // Offsets the right-hand column into the design's zigzag.
              className={index % 2 === 1 ? 'lg:mt-12' : undefined}
            >
              <Card variant="raised" interactive className="h-full">
                <h3 className="font-display text-base font-semibold tracking-tight">
                  {audience.title}
                </h3>
                <p className="text-ink-muted mt-3 text-sm leading-relaxed">
                  {audience.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
