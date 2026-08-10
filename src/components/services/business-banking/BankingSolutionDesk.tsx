'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  FileText,
  Landmark,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { ActionButton } from '@/components/ui/ActionButton';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { HeadingText } from '@/components/ui/SectionHeading';
import {
  ULTRON_SOLUTION_DESK,
  type SolutionDeskItem,
} from '@/content/business-banking';
import { useMotionScale } from '@/components/motion/useMotionScale';

/** Abstract visual graphics tailored for each solution area */
function AbstractSolutionVisual({ id }: { id: string }) {
  if (id === 'opening-strategy') {
    return (
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-[#035551]/15 bg-[#035551]/5 p-6 text-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#035551] text-white shadow-sm">
            <FileText className="h-5 w-5" />
          </div>
          <div className="h-0.5 w-8 bg-[#035551]/30" />
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#023F3D] text-white shadow-sm">
            <Landmark className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-full border border-[#035551]/20 bg-white px-3 py-1 text-[12px] font-bold text-[#035551] shadow-sm">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Profile Matched to Bank</span>
        </div>
      </div>
    );
  }

  if (id === 'rejection-review') {
    return (
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-[#035551]/15 bg-[#035551]/5 p-6 text-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#035551]/20 text-[#035551]">
            <RefreshCw className="animate-spin-slow h-5 w-5" />
          </div>
          <div className="h-0.5 w-8 bg-[#035551]/30" />
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#035551] text-white shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-full border border-[#035551]/20 bg-white px-3 py-1 text-[12px] font-bold text-[#035551] shadow-sm">
          <span>Diagnostic Review Passed</span>
        </div>
      </div>
    );
  }

  if (id === 'compliance-prep') {
    return (
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-[#035551]/15 bg-[#035551]/5 p-6 text-center">
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between rounded-lg border border-[#035551]/10 bg-white p-2 text-[12px] font-semibold text-[#023F3D] shadow-xs">
            <span>Source of Funds</span>
            <Check className="h-4 w-4 text-[#035551]" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-[#035551]/10 bg-white p-2 text-[12px] font-semibold text-[#023F3D] shadow-xs">
            <span>UBO Dossier</span>
            <Check className="h-4 w-4 text-[#035551]" />
          </div>
        </div>
      </div>
    );
  }

  if (id === 'issue-resolution') {
    return (
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-[#035551]/15 bg-[#035551]/5 p-6 text-center">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#035551] text-white shadow-sm">
            <Landmark className="h-5 w-5" />
          </div>
          <div className="h-0.5 w-6 bg-[#035551]/30" />
          <span className="rounded-full border border-[#035551]/20 bg-white px-2.5 py-1 text-[11px] font-bold text-[#035551]">
            Restored
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center rounded-2xl border border-[#035551]/15 bg-[#035551]/5 p-6 text-center">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-[#035551]" />
        <span className="font-display text-[14px] font-bold text-[#023F3D]">
          Multi-Currency Facilities
        </span>
      </div>
      <div className="mt-3 flex gap-2">
        <span className="rounded-md border border-[#035551]/15 bg-white px-2 py-0.5 text-[11px] font-bold text-[#035551]">
          AED
        </span>
        <span className="rounded-md border border-[#035551]/15 bg-white px-2 py-0.5 text-[11px] font-bold text-[#035551]">
          USD
        </span>
        <span className="rounded-md border border-[#035551]/15 bg-white px-2 py-0.5 text-[11px] font-bold text-[#035551]">
          EUR
        </span>
      </div>
    </div>
  );
}

const CREAM = '#FDFBEE';
const SAND = '#DCCB8E';

export function BankingSolutionDesk() {
  const [activeId, setActiveId] = useState<string>(
    ULTRON_SOLUTION_DESK.items[0].id,
  );
  const activeItem =
    ULTRON_SOLUTION_DESK.items.find((item) => item.id === activeId) ||
    ULTRON_SOLUTION_DESK.items[0];
  const isStill = useMotionScale() === 0;

  return (
    <Section
      id="solutions"
      spacing="spacious"
      tone="surface"
      className="relative overflow-hidden bg-[#FDFBEE] pt-16 pb-0 sm:pt-24 lg:pt-32"
    >
      <Container width="wide">
        {/* Section Intro */}
        <div className="max-w-3xl">
          <Reveal delay={0}>
            <BandEyebrow>{ULTRON_SOLUTION_DESK.eyebrow}</BandEyebrow>
          </Reveal>

          <Reveal delay={100} className="mt-3">
            <h2 className="font-display text-[clamp(1.875rem,4.4vw,48px)] leading-[110%] font-bold tracking-[-0.017em] text-black">
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

        {/* --- DESKTOP ADVISORY DESK INTERFACE (hidden on mobile < 1024px) --- */}
        <Reveal delay={300} className="mt-14 hidden lg:block">
          <div className="grid min-h-[520px] grid-cols-12 items-stretch overflow-hidden rounded-[24px] border border-[#035551]/15 bg-white shadow-[0_12px_36px_rgba(3,85,81,0.06)]">
            {/* Left Column: Solution Selector (5 Items) */}
            <div className="col-span-4 flex flex-col justify-between border-r border-[#035551]/10 bg-[#FDFBEE]/50 py-4">
              <div className="divide-y divide-[#035551]/10">
                {ULTRON_SOLUTION_DESK.items.map((item: SolutionDeskItem) => {
                  const isActive = item.id === activeId;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`solution-panel-${item.id}`}
                      onClick={() => setActiveId(item.id)}
                      className={`group flex w-full cursor-pointer items-center justify-between border-l-4 px-6 py-5 text-left transition-all duration-200 ${
                        isActive
                          ? 'border-l-[#035551] bg-[#035551]/8 text-[#023F3D]'
                          : 'border-l-transparent bg-transparent text-[#5A5A5A] hover:bg-[#035551]/4 hover:text-[#023F3D]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`font-display text-[13px] font-bold tracking-wider ${
                            isActive
                              ? 'text-[#035551]'
                              : 'text-[#5A5A5A]/70 group-hover:text-[#035551]'
                          }`}
                        >
                          {item.number}
                        </span>
                        <span className="font-display text-[16px] leading-snug font-bold">
                          {item.title}
                        </span>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isActive
                            ? 'translate-x-1 text-[#035551]'
                            : 'text-[#5A5A5A]/40 group-hover:text-[#035551]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Advisory Detail Panel */}
            <div className="col-span-8 flex flex-col justify-between bg-white p-8 xl:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={isStill ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={isStill ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  id={`solution-panel-${activeItem.id}`}
                  role="tabpanel"
                  className="flex h-full flex-col justify-between"
                >
                  <div>
                    {/* Small Category Label */}
                    <span className="font-display inline-block text-[12px] font-bold tracking-widest text-[#035551] uppercase">
                      {activeItem.label}
                    </span>

                    {/* Large Solution Heading */}
                    <h3 className="font-display mt-2 text-[26px] leading-tight font-bold text-[#023F3D] xl:text-[30px]">
                      {activeItem.heading}
                    </h3>

                    {/* Short Explanation */}
                    <p className="mt-3 text-[16px] leading-[160%] font-normal text-[#404040]">
                      {activeItem.description}
                    </p>

                    {/* Checklist + Visual Module Grid */}
                    <div className="mt-8 grid grid-cols-12 items-center gap-6 border-y border-[#035551]/10 py-6">
                      {/* Checklist (Col 7) */}
                      <div className="col-span-7">
                        <h4 className="font-display mb-4 text-[12px] font-bold tracking-wider text-[#035551] uppercase">
                          WHAT WE ADDRESS:
                        </h4>
                        <ul className="space-y-2.5">
                          {activeItem.whatWeAddress.map(
                            (point: string, idx: number) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5"
                              >
                                <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#035551]/10 text-[#035551]">
                                  <Check className="h-3 w-3 stroke-[3]" />
                                </div>
                                <span className="text-[14px] leading-snug font-medium text-[#2A2A2A]">
                                  {point}
                                </span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>

                      {/* Visual Module (Col 5) */}
                      <div className="col-span-5">
                        <AbstractSolutionVisual id={activeItem.id} />
                      </div>
                    </div>
                  </div>

                  {/* Contextual Action Button */}
                  <div className="mt-8">
                    <ActionButton href={activeItem.ctaHref}>
                      {activeItem.ctaLabel.toUpperCase()}
                    </ActionButton>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* --- MOBILE DISCLOSURE LAYOUT (< 1024px) --- */}
        <div className="mt-10 block space-y-4 lg:hidden">
          {ULTRON_SOLUTION_DESK.items.map((item: SolutionDeskItem) => {
            const isOpen = item.id === activeId;

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-[18px] border border-[#035551]/12 bg-white shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setActiveId(isOpen ? '' : item.id)}
                  aria-expanded={isOpen}
                  className={`flex w-full cursor-pointer items-center justify-between p-5 text-left transition-colors ${
                    isOpen
                      ? 'border-l-4 border-l-[#035551] bg-[#035551]/8'
                      : 'bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[13px] font-bold text-[#035551]">
                      {item.number}
                    </span>
                    <span className="font-display text-[17px] font-bold text-[#023F3D]">
                      {item.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-[#035551] transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>

                {isOpen ? (
                  <div className="border-t border-[#035551]/10 bg-white p-5 pt-2">
                    <span className="font-display inline-block text-[11px] font-bold tracking-widest text-[#035551] uppercase">
                      {item.label}
                    </span>

                    <h3 className="font-display mt-1 text-[20px] leading-snug font-bold text-[#023F3D]">
                      {item.heading}
                    </h3>

                    <p className="mt-3 text-[14px] leading-[155%] text-[#404040]">
                      {item.description}
                    </p>

                    <div className="my-5 border-t border-[#035551]/10 pt-4">
                      <h4 className="font-display mb-3 text-[11px] font-bold tracking-wider text-[#035551] uppercase">
                        WHAT WE ADDRESS:
                      </h4>
                      <ul className="space-y-2">
                        {item.whatWeAddress.map(
                          (point: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#035551]" />
                              <span className="text-[13px] font-medium text-[#2A2A2A]">
                                {point}
                              </span>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>

                    <div className="my-4">
                      <AbstractSolutionVisual id={item.id} />
                    </div>

                    <div className="mt-6">
                      <ActionButton
                        href={item.ctaHref}
                        className="w-full justify-center"
                      >
                        {item.ctaLabel.toUpperCase()}
                      </ActionButton>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
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
