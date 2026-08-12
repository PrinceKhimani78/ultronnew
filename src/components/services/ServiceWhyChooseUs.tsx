'use client';

import { CheckCircle2 } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Service } from '@/content/services';

type Props = {
  service: Service;
};

export function ServiceWhyChooseUs({ service }: Props) {
  const { introduction, points } = service.whyUltron;

  return (
    <Section
      spacing="spacious"
      tone="raised"
      className="relative overflow-hidden"
    >
      <Container width="wide">
        <Reveal>
          <SectionHeading
            eyebrow="WHY ULTRON FINANCIALS"
            heading={[
              { text: 'Why ' },
              { text: 'Choose Us', accent: true },
              { text: ` for ${service.title}` },
            ]}
            body={introduction}
          />
        </Reveal>

        <Stagger as="div" className="mt-12 grid gap-6 md:grid-cols-3">
          {points.map((point) => (
            <StaggerItem key={point}>
              <div className="border-line bg-surface flex h-full flex-col rounded-2xl border p-6 shadow-xs transition-shadow duration-300 hover:shadow-md sm:p-7">
                <div className="bg-brand/10 text-brand-bright mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <p className="text-ink text-base leading-snug font-semibold sm:text-lg">
                  {point}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
      {/* Bottom gradient wash matching home page hero section */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-[100px] w-full sm:h-[132px]"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(253, 251, 238, 0) 0%, #DCCB8E 740.91%)',
        }}
        aria-hidden="true"
      />
    </Section>
  );
}
