import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Eyebrow, HeadingText } from '@/components/ui/SectionHeading';
import { SERVICES } from '@/content/services';
import { SERVICES_PAGE } from '@/content/services-page';

/**
 * The catalogue, two across.
 *
 * A Server Component around one client leaf per card: the headings, the copy and
 * the benefit lists are all static HTML, and only the disclosure state crosses
 * into the browser.
 *
 * `<ul>` because it is a list of six peers — a screen reader announces "list, 6
 * items" and the visitor knows how much is here before reading any of it.
 */
export function ServicesGrid() {
  return (
    // The `default` variant now sits below what this band used to hand-roll, so
    // the custom rhythm that once avoided ~17rem of dead space before the call
    // to action is no longer needed — the token is the tighter of the two.
    <Section className="text-ink bg-white">
      <Container width="wide">
        <Reveal>
          <Eyebrow>{SERVICES_PAGE.intro.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.02em]">
            <HeadingText segments={SERVICES_PAGE.intro.heading} />
          </h2>
          <p className="text-ink-muted mt-5 max-w-3xl leading-relaxed">
            {SERVICES_PAGE.intro.body}
          </p>
        </Reveal>

        <ul className="mt-12 grid items-start gap-6 lg:grid-cols-2">
          {SERVICES.map((service, index) => (
            <Reveal
              as="li"
              key={service.slug}
              // Stagger by row, so the pair in a row arrives together.
              delay={Math.floor(index / 2) * 0.06}
              className="h-full"
            >
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
