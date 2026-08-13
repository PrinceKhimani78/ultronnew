'use client';

import {
  Check,
  Calendar,
  FileText,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  UserCheck,
} from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { HeadingText } from '@/components/ui/SectionHeading';
import {
  BANKING_PROCESS_INTRO,
  BANKING_PROCESS_STEPS,
} from '@/content/business-banking';
import { type ProcessStep } from '@/content/process';

/** Visual graphics tailored for each step of the Business Banking Process */
function ProcessStepVisual({ stepNumber }: { stepNumber: string }) {
  if (stepNumber === '01') {
    return (
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-[#035551]/15 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#035551] text-white shadow-sm">
          <Calendar className="h-6 w-6" />
        </div>
        <span className="font-display text-[15px] font-bold text-[#023F3D]">
          Feasibility Assessment & Review
        </span>
        <div className="mt-4 w-full space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-[#035551]/5 p-2.5 text-[12px] font-semibold text-[#035551]">
            <span>Activity Scope Analysis</span>
            <Check className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between rounded-lg bg-[#035551]/5 p-2.5 text-[12px] font-semibold text-[#035551]">
            <span>Target Bank Appetite Match</span>
            <Check className="h-4 w-4" />
          </div>
        </div>
      </div>
    );
  }

  if (stepNumber === '02') {
    return (
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-[#035551]/15 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#035551] text-white shadow-sm">
          <UserCheck className="h-6 w-6" />
        </div>
        <span className="font-display text-[15px] font-bold text-[#023F3D]">
          Shareholder & UBO Profile
        </span>
        <div className="mt-4 w-full space-y-2">
          <div className="flex items-center justify-between rounded-lg bg-[#035551]/5 p-2.5 text-[12px] font-semibold text-[#035551]">
            <span>Ownership Structure Validated</span>
            <ShieldCheck className="h-4 w-4 text-[#035551]" />
          </div>
          <div className="flex items-center justify-between rounded-lg bg-[#035551]/5 p-2.5 text-[12px] font-semibold text-[#035551]">
            <span>Source of Funds Evidence Verified</span>
            <ShieldCheck className="h-4 w-4 text-[#035551]" />
          </div>
        </div>
      </div>
    );
  }

  if (stepNumber === '03') {
    return (
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-[#035551]/15 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#023F3D] text-white shadow-sm">
          <Landmark className="h-6 w-6" />
        </div>
        <span className="font-display text-[15px] font-bold text-[#023F3D]">
          Target Bank Selection Matrix
        </span>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span className="rounded-lg border border-[#035551]/15 bg-[#035551]/10 px-3 py-1.5 text-[12px] font-bold text-[#035551]">
            Emirates NBD
          </span>
          <span className="rounded-lg border border-[#035551]/15 bg-[#035551]/10 px-3 py-1.5 text-[12px] font-bold text-[#035551]">
            First Abu Dhabi Bank
          </span>
          <span className="rounded-lg border border-[#035551]/15 bg-[#035551]/10 px-3 py-1.5 text-[12px] font-bold text-[#035551]">
            ADCB
          </span>
          <span className="rounded-lg border border-[#035551]/15 bg-[#035551]/10 px-3 py-1.5 text-[12px] font-bold text-[#035551]">
            Mashreq Bank
          </span>
        </div>
      </div>
    );
  }

  if (stepNumber === '04') {
    return (
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-[#035551]/15 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#035551] text-white shadow-sm">
          <FileText className="h-6 w-6" />
        </div>
        <span className="font-display text-[15px] font-bold text-[#023F3D]">
          Document Dossier Preparation
        </span>
        <div className="mt-4 w-full space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-[#035551]/10 bg-white p-2 text-[12px] font-semibold text-[#023F3D] shadow-2xs">
            <span>Trade License & Articles</span>
            <CheckCircle2 className="h-4 w-4 text-[#035551]" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-[#035551]/10 bg-white p-2 text-[12px] font-semibold text-[#023F3D] shadow-2xs">
            <span>Financial Statements & Invoices</span>
            <CheckCircle2 className="h-4 w-4 text-[#035551]" />
          </div>
        </div>
      </div>
    );
  }

  if (stepNumber === '05') {
    return (
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-[#035551]/15 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#023F3D] text-white shadow-sm">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <span className="font-display text-[15px] font-bold text-[#023F3D]">
          Underwriting & Bank Direct Contact
        </span>
        <div className="mt-4 flex items-center gap-2 rounded-full border border-[#035551]/20 bg-[#035551]/10 px-3.5 py-1.5 text-[12px] font-bold text-[#035551]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#035551]" />
          <span>Active Officer Coordination</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center rounded-2xl border border-[#035551]/15 bg-white p-6 text-center shadow-sm sm:p-8">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#035551] text-white shadow-sm">
        <CheckCircle2 className="h-6 w-6" />
      </div>
      <span className="font-display text-[16px] font-bold text-[#023F3D]">
        Account Opened & Active
      </span>
      <p className="mt-2 text-[12px] text-[#5A5A5A]">
        IBAN issued with ongoing account relationship support.
      </p>
    </div>
  );
}

const CARD_SURFACES = [
  'bg-white border-[#035551]/15 shadow-[0_12px_36px_rgba(3,85,81,0.08)]',
  'bg-[#FDFBEE] border-[#035551]/15 shadow-[0_12px_36px_rgba(3,85,81,0.08)]',
  'bg-[#035551]/5 border-[#035551]/15 shadow-[0_12px_36px_rgba(3,85,81,0.08)]',
];

export function BankingProcessStack() {
  return (
    <Section
      id="process"
      spacing="spacious"
      tone="surface"
      className="relative overflow-hidden bg-[#FDFBEE] py-16 sm:py-24 lg:py-32"
    >
      <Container width="wide">
        {/* Section Intro Header */}
        <div className="mb-12 max-w-3xl sm:mb-16 lg:mb-20">
          <Reveal delay={0}>
            <BandEyebrow>{BANKING_PROCESS_INTRO.eyebrow}</BandEyebrow>
          </Reveal>

          <Reveal delay={100} className="mt-3">
            <h2 className="heading-h2 text-black">
              <HeadingText
                segments={BANKING_PROCESS_INTRO.heading}
                accentClassName="text-[#035551]"
              />
            </h2>
          </Reveal>

          <Reveal delay={200} className="mt-5">
            <p className="text-[17px] leading-[155%] font-normal text-[#5A5A5A] sm:text-[19px]">
              {BANKING_PROCESS_INTRO.body}
            </p>
          </Reveal>
        </div>

        {/* --- STICKY STACKING CARDS SEQUENCE --- */}
        <div className="relative space-y-8 pb-16 lg:space-y-0 lg:pb-24">
          {BANKING_PROCESS_STEPS.map((step: ProcessStep, index: number) => {
            const surfaceClass = CARD_SURFACES[index % CARD_SURFACES.length];

            return (
              <article
                key={step.step}
                className={`group sticky flex min-h-[460px] flex-col justify-center rounded-[28px] border p-6 transition-all duration-300 sm:p-8 lg:min-h-[500px] lg:rounded-[32px] lg:p-12 ${surfaceClass}`}
                style={{
                  top: `${96 + index * 24}px`,
                  zIndex: index + 1,
                }}
              >
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                  {/* Left Column: Copy & Details */}
                  <div className="flex flex-col justify-center lg:col-span-6">
                    <span className="font-display inline-block w-fit rounded-full bg-[#035551]/10 px-3.5 py-1 text-[12px] font-bold tracking-widest text-[#035551] uppercase">
                      STEP {step.step}
                    </span>

                    <h3 className="heading-h3 mt-4 text-[#023F3D]">
                      {step.title}
                    </h3>

                    <p className="mt-4 text-[15px] leading-[165%] font-normal text-[#404040] sm:text-[16px] lg:text-[17px]">
                      {step.body}
                    </p>

                    <div className="mt-6 flex items-center gap-2 border-t border-[#035551]/10 pt-4 text-[13px] font-semibold text-[#035551]">
                      <Check className="h-4 w-4 text-[#035551]" />
                      <span>Structured for Compliance & UAE Bank Criteria</span>
                    </div>
                  </div>

                  {/* Right Column: Code-Native Abstract Visual */}
                  <div className="flex items-center justify-center lg:col-span-6">
                    <div className="w-full max-w-md">
                      <ProcessStepVisual stepNumber={step.step} />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
