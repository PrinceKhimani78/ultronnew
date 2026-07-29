import Image from 'next/image';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ServiceTabs } from '@/components/home/ServiceTabs';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
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
      spacing="spacious"
      tone="raised"
      className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28"
    >
      {/* Bottom-left 3D Monogram watermark matching Ultron brand identity */}
      <Image
        src="/brand/services-monogram.png"
        alt=""
        aria-hidden="true"
        width={240}
        height={260}
        className="pointer-events-none absolute -bottom-6 -left-6 z-0 h-auto w-40 opacity-35 sm:w-56 lg:opacity-45"
      />

      <Container width="wide" className="relative z-10">
        <Reveal className="text-center">
          <Eyebrow align="center">{SERVICES_INTRO.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.12] font-bold tracking-[-0.02em] text-[#121a18]">
            Our Core <span className="text-[#035551]">Services</span>
          </h2>
        </Reveal>

        <div className="mt-12 lg:mt-14">
          <ServiceTabs />
        </div>

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg" arrow>
            <a href={SERVICES_INTRO.cta.href}>{SERVICES_INTRO.cta.label}</a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
