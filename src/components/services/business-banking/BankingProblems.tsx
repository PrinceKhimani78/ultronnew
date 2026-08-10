import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { HeadingText } from '@/components/ui/SectionHeading';
import { BANKING_PROBLEMS } from '@/content/business-banking';

export function BankingProblems() {
  return (
    <Section
      id="problems"
      spacing="spacious"
      tone="surface"
      className="bg-white py-16 sm:py-24 lg:py-32"
    >
      <Container width="wide">
        {/* Top Header Block */}
        <div className="max-w-4xl">
          <Reveal delay={0}>
            <BandEyebrow>{BANKING_PROBLEMS.eyebrow}</BandEyebrow>
          </Reveal>

          <Reveal delay={100} className="mt-3">
            <h2 className="font-display text-[clamp(2rem,4.4vw,48px)] leading-[110%] font-bold tracking-[-0.017em] text-black">
              <HeadingText
                segments={BANKING_PROBLEMS.heading}
                accentClassName="text-[#035551]"
              />
            </h2>
          </Reveal>

          <Reveal delay={200} className="mt-6">
            <p className="text-[19px] leading-[160%] font-medium text-[#404040] sm:text-[22px] lg:text-[24px]">
              {BANKING_PROBLEMS.introduction}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
