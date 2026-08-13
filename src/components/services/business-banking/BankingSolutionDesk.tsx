'use client';

import {
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  HelpCircle,
  Landmark,
  Layers,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { HeadingText } from '@/components/ui/SectionHeading';
import {
  ULTRON_SOLUTION_DESK,
  type SolutionDeskItem,
} from '@/content/business-banking';

/** Premium Banking Workflow UI Mockups tailored for each Solution Desk card */
function SolutionMockup({ solutionId }: { solutionId: string }) {
  if (solutionId === 'opening-strategy') {
    return (
      <div
        className="relative flex flex-col justify-between rounded-2xl border border-[#035551]/15 bg-white p-6 shadow-sm sm:p-8"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between border-b border-[#035551]/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#035551] text-white shadow-sm">
              <Landmark className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display block text-[15px] font-bold text-[#023F3D]">
                Bank Appetite Matcher
              </span>
              <span className="text-[12px] text-[#5A5A5A]">
                UAE Institutional Criteria
              </span>
            </div>
          </div>
          <span className="rounded-full bg-[#035551]/10 px-3 py-1 text-[12px] font-bold text-[#035551]">
            4 Banks Matched
          </span>
        </div>

        <div className="mt-5 space-y-2.5">
          <div className="flex items-center justify-between rounded-xl bg-[#035551]/5 px-4 py-3 text-[13px] font-semibold text-[#035551]">
            <span className="font-display">Emirates NBD Corporate</span>
            <span className="font-bold text-[#035551]">High Match (98%)</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-[#035551]/5 px-4 py-3 text-[13px] font-semibold text-[#035551]">
            <span className="font-display">First Abu Dhabi Bank (FAB)</span>
            <span className="font-bold text-[#035551]">Approved Profile</span>
          </div>
          <div className="flex items-center justify-between rounded-xl bg-[#035551]/5 px-4 py-3 text-[13px] font-semibold text-[#035551]">
            <span className="font-display">ADCB Commercial Banking</span>
            <span className="font-bold text-[#035551]">
              Ready for Submission
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (solutionId === 'rejection-review') {
    return (
      <div
        className="relative flex flex-col justify-between rounded-2xl border border-[#035551]/15 bg-white p-6 shadow-sm sm:p-8"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between border-b border-[#035551]/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#023F3D] text-white shadow-sm">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display block text-[15px] font-bold text-[#023F3D]">
                Declined Application Diagnostic
              </span>
              <span className="text-[12px] text-[#5A5A5A]">
                Root-Cause Analysis Engine
              </span>
            </div>
          </div>
          <span className="rounded-full bg-[#035551]/10 px-3 py-1 text-[12px] font-bold text-[#035551]">
            Audit Complete
          </span>
        </div>

        <div className="mt-5 space-y-2.5">
          <div className="flex items-center justify-between rounded-xl bg-[#035551]/5 px-4 py-3 text-[13px] font-semibold text-[#035551]">
            <span>Activity Scope Mismatch Identified</span>
            <CheckCircle2 className="h-4 w-4 text-[#035551]" />
          </div>
          <div className="flex items-center justify-between rounded-xl bg-[#035551]/5 px-4 py-3 text-[13px] font-semibold text-[#035551]">
            <span>Reapplication Dossier Formulated</span>
            <CheckCircle2 className="h-4 w-4 text-[#035551]" />
          </div>
        </div>
      </div>
    );
  }

  if (solutionId === 'compliance-prep') {
    return (
      <div
        className="relative flex flex-col justify-between rounded-2xl border border-[#035551]/15 bg-white p-6 shadow-sm sm:p-8"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between border-b border-[#035551]/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#035551] text-white shadow-sm">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display block text-[15px] font-bold text-[#023F3D]">
                Compliance Dossier Readiness
              </span>
              <span className="text-[12px] text-[#5A5A5A]">
                Verification Checklist
              </span>
            </div>
          </div>
          <span className="rounded-full bg-[#035551]/10 px-3 py-1 text-[12px] font-bold text-[#035551]">
            100% Verified
          </span>
        </div>

        <div className="mt-5 space-y-2.5">
          <div className="flex items-center justify-between rounded-xl bg-[#035551]/5 px-4 py-3 text-[13px] font-semibold text-[#023F3D]">
            <span>UBO & Source of Funds Audit</span>
            <ShieldCheck className="h-4 w-4 text-[#035551]" />
          </div>
          <div className="flex items-center justify-between rounded-xl bg-[#035551]/5 px-4 py-3 text-[13px] font-semibold text-[#023F3D]">
            <span>Commercial Invoices & Contracts</span>
            <ShieldCheck className="h-4 w-4 text-[#035551]" />
          </div>
        </div>
      </div>
    );
  }

  if (solutionId === 'issue-resolution') {
    return (
      <div
        className="relative flex flex-col justify-between rounded-2xl border border-[#035551]/15 bg-white p-6 shadow-sm sm:p-8"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between border-b border-[#035551]/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#023F3D] text-white shadow-sm">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <span className="font-display block text-[15px] font-bold text-[#023F3D]">
                Underwriting Query Resolution
              </span>
              <span className="text-[12px] text-[#5A5A5A]">
                Bank Escalation Team
              </span>
            </div>
          </div>
          <span className="rounded-full bg-[#035551]/10 px-3 py-1 text-[12px] font-bold text-[#035551]">
            Active
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between rounded-xl bg-[#035551]/10 p-3.5 text-[13px] font-bold text-[#035551]">
          <div className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#035551]" />
            <span>Direct Underwriter Communication</span>
          </div>
          <span>Active</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex flex-col justify-between rounded-2xl border border-[#035551]/15 bg-white p-6 shadow-sm sm:p-8"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b border-[#035551]/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#035551] text-white shadow-sm">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <span className="font-display block text-[15px] font-bold text-[#023F3D]">
              Multi-Currency Corporate Banking
            </span>
            <span className="text-[12px] text-[#5A5A5A]">Treasury Setup</span>
          </div>
        </div>
        <span className="rounded-full bg-[#035551]/10 px-3 py-1 text-[12px] font-bold text-[#035551]">
          Active Account
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <span className="rounded-lg border border-[#035551]/15 bg-[#035551]/5 px-3.5 py-1.5 text-[13px] font-bold text-[#035551]">
          AED Treasury Account
        </span>
        <span className="rounded-lg border border-[#035551]/15 bg-[#035551]/5 px-3.5 py-1.5 text-[13px] font-bold text-[#035551]">
          USD Corporate Account
        </span>
        <span className="rounded-lg border border-[#035551]/15 bg-[#035551]/5 px-3.5 py-1.5 text-[13px] font-bold text-[#035551]">
          EUR Clearing Account
        </span>
      </div>
    </div>
  );
}

const CARD_SURFACES = [
  'bg-white border-[#035551]/15 shadow-[0_16px_40px_rgba(3,85,81,0.10)]',
  'bg-[#035551]/5 border-[#035551]/15 shadow-[0_16px_40px_rgba(3,85,81,0.10)]',
  'bg-[#FDFBEE] border-[#035551]/15 shadow-[0_16px_40px_rgba(3,85,81,0.10)]',
  'bg-white border-[#035551]/15 shadow-[0_16px_40px_rgba(3,85,81,0.10)]',
  'bg-[#035551]/5 border-[#035551]/15 shadow-[0_16px_40px_rgba(3,85,81,0.10)]',
];

export function BankingSolutionDesk() {
  const totalItems = ULTRON_SOLUTION_DESK.items.length;

  return (
    <Section
      id="solutions"
      spacing="spacious"
      tone="surface"
      className="relative bg-[#FDFBEE] py-16 sm:py-24 lg:py-32"
    >
      <Container width="wide">
        {/* Section Intro Header */}
        <div className="mb-12 max-w-3xl sm:mb-16 lg:mb-20">
          <Reveal delay={0}>
            <BandEyebrow>{ULTRON_SOLUTION_DESK.eyebrow}</BandEyebrow>
          </Reveal>

          <Reveal delay={100} className="mt-3">
            <h2 className="heading-h2 text-black">
              <HeadingText
                segments={ULTRON_SOLUTION_DESK.heading}
                accentClassName="text-[#035551]"
              />
            </h2>
          </Reveal>

          <Reveal delay={200} className="mt-5">
            <p className="text-[17px] leading-[155%] font-normal text-[#5A5A5A] sm:text-[19px]">
              {ULTRON_SOLUTION_DESK.description}
            </p>
          </Reveal>
        </div>

        {/* --- PURE CSS STACKING CARDS SEQUENCE (scroll-driven-animations.style Demo) --- */}
        <div className="relative flex w-full flex-col gap-8 pb-24 lg:gap-12 lg:pb-36">
          {ULTRON_SOLUTION_DESK.items.map(
            (item: SolutionDeskItem, index: number) => {
              const surfaceClass = CARD_SURFACES[index % CARD_SURFACES.length];
              const isEven = index % 2 === 0;

              return (
                <article
                  key={item.id}
                  className={`group sticky min-h-[480px] w-full overflow-hidden rounded-[28px] p-7 transition-all duration-300 sm:p-10 lg:min-h-[520px] lg:rounded-[32px] lg:p-14 ${surfaceClass}`}
                  style={{
                    top: `calc(96px + ${index * 24}px)`,
                    zIndex: index + 1,
                    marginBottom: `${(totalItems - index - 1) * 24}px`,
                  }}
                >
                  <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                    {/* Text Copy Section */}
                    <div
                      className={`flex flex-col justify-center lg:col-span-6 ${
                        isEven ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-display rounded-full bg-[#035551]/10 px-3.5 py-1 text-[12px] font-bold tracking-widest text-[#035551] uppercase">
                          {item.number}
                        </span>
                        <span className="font-display text-[12px] font-bold tracking-widest text-[#035551] uppercase">
                          {item.label}
                        </span>
                      </div>

                      <h3 className="heading-h3 mt-4 text-[#023F3D]">
                        {item.heading}
                      </h3>

                      <p className="mt-4 text-[15px] leading-[165%] font-normal text-[#404040] sm:text-[16px] lg:text-[17px]">
                        {item.description}
                      </p>

                      {/* Supporting Points Checklist */}
                      <div className="mt-6 border-t border-[#035551]/10 pt-5">
                        <h4 className="font-display mb-3 text-[13px] font-bold tracking-wider text-[#023F3D] uppercase">
                          Key Focus Areas:
                        </h4>
                        <ul className="grid grid-cols-1 gap-2.5 text-[14px] font-medium text-[#404040] sm:grid-cols-2">
                          {item.whatWeAddress.map((point: string) => (
                            <li
                              key={point}
                              className="flex items-center gap-2.5"
                            >
                              <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-[#035551]" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-7">
                        <a
                          href={item.ctaHref}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#035551] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#023F3D] active:scale-[0.98]"
                        >
                          <span>{item.ctaLabel}</span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>

                    {/* Mockup Visual Section */}
                    <div
                      className={`flex items-center justify-center lg:col-span-6 ${
                        isEven ? 'lg:order-2' : 'lg:order-1'
                      }`}
                    >
                      <div className="w-full transition-transform duration-500 group-hover:scale-[1.02]">
                        <SolutionMockup solutionId={item.id} />
                      </div>
                    </div>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </Container>
    </Section>
  );
}
