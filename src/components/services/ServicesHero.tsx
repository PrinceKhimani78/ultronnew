import { Container } from '@/components/layout/Container';
import { HeadingText } from '@/components/ui/SectionHeading';
import { SERVICES_PAGE } from '@/content/services-page';

/**
 * The Services page hero banner, matching the Figma prototype frame.
 *
 * Full-width surface band featuring centered uppercase heading ("OUR SERVICES")
 * and supporting body paragraph.
 */
export function ServicesHero() {
  return (
    // Top padding clears the fixed header, on the same steps as the home hero.
    <div className="bg-surface text-ink relative overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-32">
      <Container width="wide" className="relative">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Centered Title & Description */}
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-ink text-[clamp(2.25rem,5.2vw,4rem)] leading-[1.08] font-bold tracking-[-0.02em] uppercase">
              <HeadingText segments={SERVICES_PAGE.hero.heading} />
            </h1>
            <p className="text-ink-muted mx-auto mt-5 max-w-xl text-sm leading-relaxed font-normal sm:text-base lg:text-lg">
              {SERVICES_PAGE.hero.body}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
