'use client';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { ActionButton } from '@/components/ui/ActionButton';
import { BandEyebrow } from '@/components/ui/BandEyebrow';

export function ContactReassuranceStrip() {
  const handleScrollToForm = () => {
    const formElem = document.getElementById('contact-form');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth' });
      const nameInput = document.getElementById('contact-name') as HTMLInputElement | null;
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 600);
      }
    }
  };

  return (
    <Section tone="dark" className="py-16 lg:py-20 text-center">
      <Container width="wide">
        <Reveal className="flex flex-col items-center">
          <BandEyebrow className="text-[#DCCB8E]">
            START WITH A CONVERSATION
          </BandEyebrow>

          <h2 className="font-display mt-3 text-[clamp(1.75rem,3.8vw,40px)] leading-tight font-bold tracking-[-0.017em] text-white">
            Complex Situation? That’s Usually Where We Begin.
          </h2>

          <p className="mt-4 max-w-[640px] text-[16px] leading-[150%] font-normal text-white/80">
            Share the details with our team and we’ll help you understand what is
            realistically possible.
          </p>

          <div className="mt-8">
            <ActionButton
              type="button"
              variant="cream"
              className="cursor-pointer"
            >
              <span onClick={handleScrollToForm} className="block w-full h-full">
                DISCUSS YOUR SITUATION
              </span>
            </ActionButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
