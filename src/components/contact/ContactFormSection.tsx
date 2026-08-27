'use client';

import { CheckCircle2 } from 'lucide-react';

import { ConsultationForm } from '@/components/home/ConsultationForm';
import { Container } from '@/components/layout/Container';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';

const CREAM = '#FDFBEE';

const TRUST_POINTS = [
  'Confidential initial discussion',
  'All nationalities and risk profiles considered',
  'Dubai-based financial and business specialists',
  'Clear next steps without unnecessary delays',
] as const;

export function ContactFormSection() {
  return (
    <section
      id="contact-form-section"
      className="relative isolate m-0 w-full max-w-none overflow-hidden p-0 pt-4 pb-16 sm:pb-20 lg:pt-8 lg:pb-28"
      style={{ backgroundColor: CREAM }}
      aria-label="Contact Enquiry Form"
    >
      <Container width="wide">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-[62px]">
          {/* Left-Side Trust Checklist & Reassurance */}
          <Reveal className="w-full lg:max-w-[500px] lg:shrink">
            <h2 className="heading-h2 text-black">
              Why Speak With <span className="heading-highlight">Ultron?</span>
            </h2>

            <p className="mt-4 text-[16px] leading-[150%] font-medium text-[#4B5563]">
              Whether you need corporate bank account setup, regulatory
              compliance, or setup guidance, our advisory team provides clear,
              unvarnished feasibility answers before you commit.
            </p>

            {/* Trust / Reassurance Points */}
            <div className="mt-8 flex flex-col gap-4">
              {TRUST_POINTS.map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#035551]/10 text-[#035551]">
                    <CheckCircle2 className="h-5 w-5 stroke-[2]" />
                  </span>
                  <span className="text-[16px] leading-tight font-medium text-black">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Optional Guidance Note */}
            <div className="mt-8 rounded-[12px] border border-[#035551]/15 bg-white/60 p-5 backdrop-blur-xs">
              <p className="text-[14px] leading-[140%] font-normal text-[#5A5A5A] italic">
                Not sure which service you need? Share the situation. We’ll help
                identify the right starting point.
              </p>
            </div>
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
