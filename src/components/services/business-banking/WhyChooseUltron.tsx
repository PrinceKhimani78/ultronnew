import {
  Briefcase,
  CheckCircle,
  FileCheck2,
  Headphones,
  Layers,
  Search,
} from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { HeadingText } from '@/components/ui/SectionHeading';
import {
  WHY_CHOOSE_ULTRON,
  type DifferentiatorItem,
} from '@/content/business-banking';

const CREAM = '#FDFBEE';
const SAND = '#DCCB8E';

const ICON_MAP = [
  Search,
  Layers,
  FileCheck2,
  CheckCircle,
  Briefcase,
  Headphones,
];

export function WhyChooseUltron() {
  return (
    <Section
      id="why-choose"
      spacing="default"
      tone="surface"
      className="relative overflow-hidden bg-[#FDFBEE] pt-16 !pb-0 sm:pt-20 lg:pt-24"
      style={{ paddingBottom: 0 }}
    >
      <Container width="wide">
        {/* Section Header */}
        <Reveal className="max-w-3xl">
          <BandEyebrow>{WHY_CHOOSE_ULTRON.eyebrow}</BandEyebrow>

          <h2 className="heading-h2 mt-3 text-black">
            <HeadingText
              segments={WHY_CHOOSE_ULTRON.heading}
              accentClassName="text-[#035551]"
            />
          </h2>
        </Reveal>

        {/* Differentiator Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CHOOSE_ULTRON.items.map(
            (item: DifferentiatorItem, index: number) => {
              const Icon = ICON_MAP[index % ICON_MAP.length];

              return (
                <Reveal
                  key={item.id}
                  delay={(index % 3) * STAGGER_MS}
                  className="h-full"
                >
                  <div className="group flex h-full flex-col justify-between rounded-[20px] border border-[#035551]/10 bg-white p-7 shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#035551]/30 hover:shadow-[0_12px_28px_rgba(3,85,81,0.12)]">
                    <div>
                      {/* Minimal Icon */}
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#035551]/10 text-[#035551] transition-colors group-hover:bg-[#035551] group-hover:text-white">
                        <Icon className="h-5 w-5 stroke-[2]" />
                      </div>

                      <h3 className="heading-h3--compact mt-6 text-[#023F3D]">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-[15px] leading-[155%] font-normal text-[#5A5A5A]">
                        {item.description}
                      </p>
                    </div>

                    {item.proofPoint ? (
                      <div className="mt-6 border-t border-[#035551]/10 pt-4">
                        <span className="font-display text-[12px] font-semibold tracking-wider text-[#035551] uppercase">
                          ✓ {item.proofPoint}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              );
            },
          )}
        </div>
      </Container>

      {/* Bottom Gradient Band Matching Homepage Hero */}
      <div
        className="relative mt-10 h-[132px] w-full lg:mt-[67px]"
        style={{
          backgroundImage: `linear-gradient(180deg, ${CREAM} 0%, ${SAND} 740.91%)`,
        }}
      />
    </Section>
  );
}
