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
      const nameInput = document.getElementById(
        'contact-name',
      ) as HTMLInputElement | null;
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 600);
      }
    }
  };

  return (
    <Section tone="brand" className="py-16 text-center lg:py-20">
      <Container width="wide">
        <Reveal className="flex flex-col items-center">
          <BandEyebrow className="text-[#DCCB8E]">
            START WITH A CONVERSATION
          </BandEyebrow>

          <h2 className="heading-h2 mt-3 text-white">
            Complex Situation? That’s Usually Where We Begin.
          </h2>

          <p className="mt-4 max-w-[640px] text-[16px] leading-[150%] font-normal text-white/80">
            Share the details with our team and we’ll help you understand what
            is realistically possible.
          </p>

          <div className="mt-8">
            <ActionButton
              type="button"
              variant="cream"
              className="cursor-pointer"
            >
              <span
                onClick={handleScrollToForm}
                className="block h-full w-full"
              >
                DISCUSS YOUR SITUATION
              </span>
            </ActionButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
