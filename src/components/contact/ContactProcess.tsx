import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { BandEyebrow } from '@/components/ui/BandEyebrow';

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'We Review Your Situation',
    description:
      'We assess the information you share and identify the main feasibility considerations.',
  },
  {
    number: '02',
    title: 'We Speak With You',
    description:
      'A specialist contacts you to understand the details, priorities and any previous challenges.',
  },
  {
    number: '03',
    title: 'We Recommend the Next Step',
    description:
      'You receive a practical direction based on your case, not a generic service package.',
  },
] as const;

export function ContactProcess() {
  return (
    <Section tone="cream" className="py-16 lg:py-24">
      <Container width="wide">
        <div className="flex flex-col items-center text-center">
          <BandEyebrow>WHAT HAPPENS NEXT</BandEyebrow>

          <h2 className="font-display mt-3 text-[clamp(1.75rem,3.8vw,40px)] leading-tight font-bold tracking-[-0.017em] text-black">
            A Clear Process From the First Conversation
          </h2>
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {PROCESS_STEPS.map((step) => (
            <StaggerItem key={step.number} className="flex flex-col">
              <div className="flex flex-col rounded-[16px] border border-[#035551]/15 bg-white p-8 shadow-sm">
                <span className="font-display text-[28px] font-bold text-[#035551]">
                  {step.number}
                </span>

                <h3 className="font-display mt-4 text-[20px] font-bold text-black">
                  {step.title}
                </h3>

                <p className="mt-3 text-[15px] leading-[150%] font-normal text-[#5A5A5A]">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
