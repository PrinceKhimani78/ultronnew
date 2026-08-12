'use client';

import { CheckCircle2 } from 'lucide-react';

import { ConsultationForm } from '@/components/home/ConsultationForm';
import { Container } from '@/components/layout/Container';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { BandEyebrow } from '@/components/ui/BandEyebrow';

const CREAM = '#FDFBEE';

const TRUST_POINTS = [
  'Confidential initial discussion',
  'All nationalities and risk profiles considered',
  'Dubai-based financial and business specialists',
  'Clear next steps without unnecessary delays',
] as const;

export function ContactHero() {
  return (
    <section
      id="contact-hero"
      className="homepage-hero relative w-full max-w-none m-0 p-0 overflow-hidden isolate pt-[130px] pb-[60px] sm:pt-[146px] lg:pt-[200px] lg:pb-[100px]"
      style={{ backgroundColor: CREAM }}
      aria-labelledby="contact-hero-heading"
    >
      <Container width="wide">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-[62px]">
          {/* Left-Side Content */}
          <Reveal className="w-full lg:max-w-[500px] lg:shrink">
            <BandEyebrow>CONTACT ULTRON FINANCIALS</BandEyebrow>

            <h1
              id="contact-hero-heading"
              className="font-display mt-3 text-[clamp(2.25rem,5vw,56px)] leading-[105%] font-bold tracking-[-0.017em] text-black"
            >
              Let’s Find the{' '}
              <span className="text-[#035551]">Right Way Forward.</span>
            </h1>

            <p className="mt-6 text-[18px] leading-[150%] font-medium text-[#4B5563]">
              Tell us what you are trying to achieve, where the process has
              become difficult, or what has already been declined. Our team will
              review your situation and give you a clear feasibility direction.
            </p>

            {/* Trust / Reassurance Points */}
            <div className="mt-8 flex flex-col gap-3.5">
              {TRUST_POINTS.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#035551]" />
                  <span className="text-[15px] leading-tight font-medium text-black">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Optional Guidance Note */}
            <p className="mt-8 text-[14px] leading-[140%] font-normal text-[#5A5A5A] italic">
              Not sure which service you need? Share the situation. We’ll help
              identify the right starting point.
            </p>
          </Reveal>

          {/* Right-Side Reused CTA Form */}
          <Reveal
            delay={STAGGER_MS}
            amount={0.1}
            className="w-full lg:w-[630px] lg:shrink-0"
          >
            <div id="contact-form">
              <ConsultationForm
                formTitle="Tell Us About Your Situation"
                submitLabel="REQUEST A FEASIBILITY CALL"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
