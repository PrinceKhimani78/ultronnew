import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ServiceTabs } from '@/components/home/ServiceTabs';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { ActionButton } from '@/components/ui/ActionButton';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { SERVICES_INTRO } from '@/content/home';

/**
 * The Core Services section redesigned to match the reference layout:
 * - Centered Eyebrow & Heading ("Our Core Services" with "Services" in brand green #035551)
 * - 2-column Desktop layout (Vertical Tab List on left, Premium Content Card on right)
 * - Accordion view for mobile devices
 * - Centered "VIEW MORE" button at the bottom
 */

export function CoreServices() {
  return (
    <Section
      id="services"
      spacing="default"
      tone="raised"
      className="relative overflow-hidden"
    >
      <Container width="wide" className="relative z-10">
        <Reveal className="text-center">
          <Eyebrow align="center">{SERVICES_INTRO.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.12] font-bold tracking-[-0.02em] text-[#121a18]">
            Our Core <span className="text-[#035551]">Services</span>
          </h2>
        </Reveal>

        {/* Heading, then the tab panel, then the CTA — the section's three
            beats, matching every other band on the site. */}
        <Reveal delay={STAGGER_MS} amount={0.1} className="mt-10 lg:mt-12">
          <ServiceTabs />
        </Reveal>

        <Reveal
          delay={STAGGER_MS * 2}
          className="mt-10 flex justify-center lg:mt-12"
        >
          <ActionButton href={SERVICES_INTRO.cta.href}>
            {SERVICES_INTRO.cta.label}
          </ActionButton>
        </Reveal>
      </Container>
    </Section>
  );
}
