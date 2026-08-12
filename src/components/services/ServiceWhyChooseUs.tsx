'use client';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { SectionHeading } from '@/components/ui/SectionHeading';

type Props = {
  serviceName?: string;
};

export function ServiceWhyChooseUs({ serviceName }: Props) {
  const reasons = [
    {
      title: 'Direct Access to Senior Advisors',
      body: 'Work directly with experienced UAE financial specialists who manage your profile end-to-end, rather than junior account managers.',
    },
    {
      title: 'Proven Compliance Track Record',
      body: 'Your applications and business structures are meticulously prepared to pass strict bank and regulatory risk screening on the first attempt.',
    },
    {
      title: 'Success-Based & Transparent Approach',
      body: 'We perform a thorough feasibility check before taking on a case, providing honest recommendations without unexpected fees or false promises.',
    },
    {
      title: 'End-to-End UAE Advisory Under One Roof',
      body: 'From company licensing and corporate bank account opening to long-term tax advisory and business financing, we cover every stage of your growth.',
    },
  ] as const;

  return (
    <Section spacing="spacious" tone="raised" className="relative overflow-hidden">
      <Container width="wide">
        <Reveal>
          <SectionHeading
            eyebrow="WHY ULTRON FINANCIALS"
            heading={[
              { text: 'Why ' },
              { text: 'Choose Us', accent: true },
              { text: serviceName ? ` for ${serviceName}` : '' },
            ]}
          />
        </Reveal>

        <Stagger as="dl" className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {reasons.map((reason) => (
            <StaggerItem key={reason.title}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6 shadow-xs transition-shadow duration-300 hover:shadow-md">
                <dt className="font-display border-l-3 border-[#035551] pl-4 text-xl font-bold tracking-tight text-ink">
                  {reason.title}
                </dt>
                <dd className="text-ink-muted mt-3 pl-4 text-sm leading-relaxed sm:text-base">
                  {reason.body}
                </dd>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
