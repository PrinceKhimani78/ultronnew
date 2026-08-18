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
    <Section className="text-ink bg-white pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24">
      <Container width="wide">
        <Reveal>
          <BandEyebrow style={{ color: '#C9B37E' }}>
            {SERVICES_PAGE.intro.eyebrow}
          </BandEyebrow>
          <h2 className="heading-h2 mt-3.5 text-black">
            <HeadingText
              segments={SERVICES_PAGE.intro.heading}
              accentClassName="text-[#035551]"
            />
          </h2>
          <p className="mt-4 max-w-[855px] text-[16px] leading-[170%] font-normal text-[#5A5A5A]">
            {SERVICES_PAGE.intro.body}
          </p>
        </Reveal>

        {/*
          One card at a time, in source order. The brief is explicit that cards
          must never animate together, so the pair in each row is offset from
          each other rather than sharing a row delay.
        */}
        <ul className="mt-10 grid grid-cols-1 gap-6 pl-0 sm:mt-12 sm:gap-8 sm:pl-[40px] lg:grid-cols-2 lg:gap-8">
          {SERVICES.filter((s) => s.isVisible !== false).map(
            (service, index) => (
              <Reveal
                as="li"
                key={service.slug}
                delay={index * STAGGER_MS}
                amount={0.1}
                className="flex h-full w-full"
              >
                <ServiceCard service={service} />
              </Reveal>
            ),
          )}
        </ul>
      </Container>
    </Section>
  );
}
