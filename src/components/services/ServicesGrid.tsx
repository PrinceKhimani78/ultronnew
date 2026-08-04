import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { ServiceCard } from '@/components/services/ServiceCard';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { HeadingText } from '@/components/ui/SectionHeading';
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
    <Section className="text-ink bg-white py-12 lg:py-16">
      <Container width="wide">
        <Reveal>
          <BandEyebrow>{SERVICES_PAGE.intro.eyebrow}</BandEyebrow>
          <h2 className="font-display mt-3 text-[clamp(2rem,4.6vw,48px)] leading-[100%] font-bold tracking-[-0.017em] text-black">
            <HeadingText
              segments={SERVICES_PAGE.intro.heading}
              accentClassName="text-[#035551]"
            />
          </h2>
          <p className="mt-5 max-w-3xl text-[16px] leading-[170%] font-normal text-[#5A5A5A]">
            {SERVICES_PAGE.intro.body}
          </p>
        </Reveal>

        {/*
          One card at a time, in source order. The brief is explicit that cards
          must never animate together, so the pair in each row is offset from
          each other rather than sharing a row delay.
        */}
        <ul className="mt-12 grid items-start gap-6 lg:grid-cols-2">
          {SERVICES.map((service, index) => (
            <Reveal
              as="li"
              key={service.slug}
              delay={index * STAGGER_MS}
              amount={0.1}
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
