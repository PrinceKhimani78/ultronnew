import Image from 'next/image';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ServiceTabs } from '@/components/home/ServiceTabs';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { Eyebrow, HeadingText } from '@/components/ui/SectionHeading';
import { SERVICES_INTRO } from '@/content/home';

/**
 * The service catalogue.
 *
 * A Server Component wrapper around one client leaf: the heading, the button and
 * the band itself are static HTML, and only `ServiceTabs` — which needs
 * selection state — crosses into the browser.
 *
 * `ServiceTabs` reads `content/services.ts`, the same array the Services routes
 * will read in Phase 5, so the two surfaces cannot drift into describing the
 * firm differently.
 */
export function CoreServices() {
  return (
    <Section
      id="services"
      spacing="spacious"
      tone="raised"
      className="relative overflow-hidden"
    >
      {/* Bottom-left 3D Monogram watermark matching Figma frame 3 */}
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
          <h2 className="font-display mt-4 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.02em]">
            <HeadingText segments={SERVICES_INTRO.heading} />
          </h2>
        </Reveal>

        <div className="mt-12">
          <ServiceTabs />
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild arrow>
            <a href={SERVICES_INTRO.cta.href}>{SERVICES_INTRO.cta.label}</a>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
