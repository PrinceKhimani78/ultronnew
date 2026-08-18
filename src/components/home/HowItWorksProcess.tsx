'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Check,
  CheckCircle2,
  FileText,
  MessageSquareText,
  Upload,
} from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BRAND_DARK = '#035551';
const GOLD = '#DCCB8E';
const CREAM = '#FDFBEE';

interface ProcessStepData {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PROCESS_STEPS: readonly ProcessStepData[] = [
  {
    id: 'step-1',
    number: '01',
    label: 'WHERE IT BEGINS',
    title: 'Free Consultation',
    description:
      'Tell us about your situation. We assess your profile, structure and goals before recommending anything. No templates, no assumptions.',
    icon: MessageSquareText,
  },
  {
    id: 'step-2',
    number: '02',
    label: 'THE BLUEPRINT',
    title: 'Strategy & Paperwork',
    description:
      'We identify the right approach and walk you through every document required. No guesswork on your end — we handle the complexity.',
    icon: FileText,
  },
  {
    id: 'step-3',
    number: '03',
    label: 'ACTIVE MANAGEMENT',
    title: 'Submission & Follow-Up',
    description:
      'We submit your case and actively manage it through the approval process. You get real updates, not silence.',
    icon: Upload,
  },
  {
    id: 'step-4',
    number: '04',
    label: 'MISSION COMPLETE',
    title: 'Delivered',
    description:
      'Account opened, business licensed, structure live. We stay available for whatever comes next.',
    icon: CheckCircle2,
  },
] as const;

export function HowItWorksProcess() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackWrapperRef = useRef<HTMLDivElement | null>(null);
  const rowsListRef = useRef<HTMLDivElement | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const dotsContainerRef = useRef<HTMLDivElement | null>(null);
  const currentStepRef = useRef<number>(0);
  const [activeStepDisplay, setActiveStepDisplay] = useState<number>(0);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      if (activeLineRef.current) {
        gsap.set(activeLineRef.current, { scaleY: 1 });
      }
      return;
    }

    const mm = gsap.matchMedia();

    // ── Desktop Pinned Scroll Animation (min-width: 1024px) ─────────────────
    mm.add('(min-width: 1024px)', () => {
      const section = sectionRef.current;
      const rowsList = rowsListRef.current;
      const activeLine = activeLineRef.current;
      const dotsContainer = dotsContainerRef.current;

      if (!section || !rowsList) return;

      const rowElements = Array.from(
        rowsList.querySelectorAll<HTMLElement>('[data-process-row]'),
      );
      if (rowElements.length === 0) return;

      const dots = dotsContainer
        ? Array.from(
            dotsContainer.querySelectorAll<HTMLElement>('[data-process-dot]'),
          )
        : [];

      const stepCount = rowElements.length;
      const transitionCount = Math.max(stepCount - 1, 1); // 3 transitions between 4 steps
      const scrollDistance = transitionCount * (window.innerHeight * 0.55);

      // Initial layout setup
      gsap.set(activeLine, { scaleY: 0, transformOrigin: 'top center' });

      // Master Scroll-Controlled Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const raw = self.progress * transitionCount;
            const stepIdx = Math.min(
              stepCount - 1,
              Math.max(0, Math.round(raw)),
            );
            if (currentStepRef.current !== stepIdx) {
              currentStepRef.current = stepIdx;
              setActiveStepDisplay(stepIdx);
            }
          },
        },
      });

      // Step-by-step sequential transitions with smooth vertical tracking
      for (let i = 0; i < transitionCount; i++) {
        const fromRow = rowElements[i];
        const toRow = rowElements[i + 1];
        const fromDot = dots[i];
        const toDot = dots[i + 1];
        const timePos = i;

        // Smooth vertical scroll translation of list so active card stays perfectly in view
        const targetTranslateY = -(i + 1) * 140;
        tl.to(
          rowsList,
          {
            y: targetTranslateY,
            duration: 0.7,
            ease: 'power2.inOut',
          },
          timePos + 0.1,
        );

        // Progress line grows proportionally
        const targetScaleY = (i + 1) / transitionCount;
        tl.to(
          activeLine,
          {
            scaleY: targetScaleY,
            duration: 0.7,
            ease: 'power2.inOut',
          },
          timePos + 0.15,
        );

        // Previous step transitions to completed (check icon, dimmed card)
        const fromCard = fromRow.querySelector('[data-process-card]');
        const fromNode = fromRow.querySelector('[data-process-node]');
        const fromCheck = fromRow.querySelector('[data-process-check]');
        const fromNumber = fromRow.querySelector('[data-process-number]');

        if (fromCard) {
          tl.to(
            fromCard,
            {
              opacity: 0.35,
              scale: 0.985,
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.06)',
              boxShadow: 'none',
              duration: 0.5,
              ease: 'power2.inOut',
            },
            timePos + 0.1,
          );
        }

        if (fromNumber && fromCheck) {
          tl.to(
            fromNumber,
            {
              opacity: 0,
              scale: 0.3,
              duration: 0.25,
              ease: 'power2.in',
            },
            timePos + 0.15,
          );
          tl.to(
            fromCheck,
            {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: 'back.out(1.7)',
            },
            timePos + 0.3,
          );
        }

        if (fromNode) {
          tl.to(
            fromNode,
            {
              borderColor: 'rgba(220, 203, 142, 0.5)',
              backgroundColor: 'rgba(220, 203, 142, 0.12)',
              color: GOLD,
              boxShadow: 'none',
              duration: 0.4,
            },
            timePos + 0.2,
          );
        }

        // Previous dot shrinks to completed gold dot
        if (fromDot) {
          tl.to(
            fromDot,
            {
              width: '10px',
              backgroundColor: GOLD,
              duration: 0.4,
            },
            timePos + 0.2,
          );
        }

        // Next step becomes active (elevated spotlight card, highlighted node)
        const toCard = toRow.querySelector('[data-process-card]');
        const toNode = toRow.querySelector('[data-process-node]');

        if (toCard) {
          tl.to(
            toCard,
            {
              opacity: 1,
              scale: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'rgba(220, 203, 142, 0.35)',
              boxShadow:
                '0 20px 50px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(220, 203, 142, 0.15)',
              duration: 0.6,
              ease: 'power2.out',
            },
            timePos + 0.25,
          );
        }

        if (toNode) {
          tl.to(
            toNode,
            {
              borderColor: GOLD,
              backgroundColor: BRAND_DARK,
              color: GOLD,
              boxShadow: '0 0 0 4px rgba(220, 203, 142, 0.3)',
              duration: 0.5,
              ease: 'power2.out',
            },
            timePos + 0.25,
          );
        }

        // Next dot expands to active gold pill
        if (toDot) {
          tl.to(
            toDot,
            {
              width: '36px',
              backgroundColor: GOLD,
              duration: 0.5,
            },
            timePos + 0.25,
          );
        }
      }

      return () => {
        tl.kill();
      };
    });

    // ── Mobile / Tablet View (max-width: 1023px) ───────────────────────────
    mm.add('(max-width: 1023px)', () => {
      const rowsList = rowsListRef.current;
      if (!rowsList) return;

      const rowElements = Array.from(
        rowsList.querySelectorAll<HTMLElement>('[data-process-row]'),
      );

      rowElements.forEach((row, index) => {
        const card = row.querySelector('[data-process-card]');
        const node = row.querySelector('[data-process-node]');

        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0.35, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                end: 'top 50%',
                scrub: true,
                onEnter: () => setActiveStepDisplay(index),
                onEnterBack: () => setActiveStepDisplay(index),
              },
            },
          );
        }

        if (node) {
          gsap.fromTo(
            node,
            { scale: 0.9, opacity: 0.7 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            },
          );
        }
      });
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
    };
  }, []);

  return (
    <Section
      ref={sectionRef}
      id="how-it-works-process"
      tone="brand"
      spacing="tight"
      className="relative py-16 sm:py-20 lg:flex lg:h-screen lg:max-h-screen lg:flex-col lg:justify-center lg:py-0"
      style={{ backgroundColor: BRAND_DARK }}
      aria-label="How It Works Process Overview"
    >
      <Container width="wide" className="relative z-10 w-full">
        {/* Section Header */}
        <div className="flex flex-col border-b border-white/15 pb-4 sm:flex-row sm:items-end sm:justify-between sm:pb-6 lg:pb-6">
          <div>
            <BandEyebrow style={{ color: GOLD }}>HOW IT WORKS</BandEyebrow>
            <h2 className="heading-h2 mt-2 text-[#FDFBEE]">
              From First Call to{' '}
              <span style={{ color: GOLD }}>Final Delivery</span>
            </h2>
          </div>

          <div
            className="font-display mt-3 flex items-center gap-2 text-sm font-semibold tracking-wider uppercase sm:mt-0"
            style={{ color: GOLD }}
          >
            <span>Step {PROCESS_STEPS[activeStepDisplay]?.number || '01'}</span>
            <span className="opacity-40">/</span>
            <span className="opacity-60">04</span>
          </div>
        </div>

        {/* Process Timeline Viewport Stage */}
        <div
          ref={trackWrapperRef}
          className="relative mt-5 w-full overflow-hidden sm:mt-6 lg:mt-6 lg:h-[390px] xl:h-[410px]"
        >
          {/* Continuous Left Vertical Progress Track on Desktop */}
          <div
            className="absolute top-[24px] bottom-[24px] left-[27px] z-0 hidden w-[2px] bg-white/15 lg:block"
            aria-hidden="true"
          >
            <div
              ref={activeLineRef}
              className="w-full origin-top"
              style={{
                height: '100%',
                backgroundImage: `linear-gradient(180deg, ${GOLD} 0%, ${CREAM} 100%)`,
              }}
            />
          </div>

          {/* Scrolling Rows Track */}
          <div
            ref={rowsListRef}
            className="space-y-4 transition-transform duration-300 ease-out sm:space-y-4 lg:space-y-4"
          >
            {PROCESS_STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isFirst = index === 0;

              return (
                <div
                  key={step.id}
                  data-process-row=""
                  data-step-index={index}
                  className="relative z-10 flex w-full items-start gap-4 sm:gap-6 lg:gap-8"
                >
                  {/* Step Node Indicator */}
                  <div className="relative shrink-0 pt-2 lg:pt-3">
                    <div
                      data-process-node=""
                      className={cn(
                        'font-display relative flex h-12 w-12 items-center justify-center rounded-full border-2 text-base font-bold transition-all duration-300 sm:h-14 sm:w-14 sm:text-lg',
                        isFirst
                          ? 'border-[#DCCB8E] bg-[#035551] text-[#DCCB8E] shadow-[0_0_0_4px_rgba(220,203,142,0.3)]'
                          : 'border-white/20 bg-[#035551] text-white/50',
                      )}
                    >
                      {/* Check Icon for Completed */}
                      <span
                        data-process-check=""
                        className="absolute inset-0 flex scale-50 items-center justify-center text-[#DCCB8E] opacity-0 transition-opacity duration-300"
                        aria-hidden="true"
                      >
                        <Check className="h-6 w-6 stroke-[2.5]" />
                      </span>

                      {/* Step Number */}
                      <span
                        data-process-number=""
                        className="opacity-100 transition-opacity duration-300"
                      >
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Step Card Content with Glassmorphic Active State */}
                  <div
                    data-process-card=""
                    className={cn(
                      'w-full flex-1 rounded-2xl border p-5 backdrop-blur-md transition-all duration-500 sm:p-6 lg:p-7',
                      isFirst
                        ? 'scale-100 border-[#DCCB8E]/35 bg-white/10 opacity-100 shadow-[0_20px_50px_rgba(0,0,0,0.25)]'
                        : 'border-white/[0.06] bg-white/[0.03] opacity-35 hover:opacity-60',
                    )}
                  >
                    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      {/* Text details */}
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-3">
                          <span
                            className="text-[11px] font-bold tracking-widest uppercase sm:text-xs"
                            style={{ color: GOLD }}
                          >
                            {step.label}
                          </span>
                          <span
                            className="hidden items-center gap-1 font-mono text-[10px] tracking-widest opacity-60 sm:inline-flex"
                            style={{ color: GOLD }}
                            aria-hidden="true"
                          >
                            • • •
                          </span>
                        </div>

                        <h3 className="font-display mt-1.5 text-lg font-bold text-[#FDFBEE] sm:text-xl lg:text-2xl">
                          {step.title}
                        </h3>

                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#FDFBEE]/80 sm:text-base">
                          {step.description}
                        </p>
                      </div>

                      {/* Step Line Icon */}
                      <div
                        className={cn(
                          'hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 sm:flex lg:h-14 lg:w-14',
                          isFirst
                            ? 'border-[#DCCB8E]/40 bg-[#DCCB8E]/10 text-[#DCCB8E]'
                            : 'border-white/10 bg-white/5 text-white/35',
                        )}
                        aria-hidden="true"
                      >
                        <StepIcon className="h-6 w-6 stroke-[1.75]" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Progress Navigation Indicator */}
        <div className="mt-5 flex w-full items-center justify-between border-t border-white/10 pt-4 sm:mt-6">
          <div
            ref={dotsContainerRef}
            className="flex items-center gap-2"
            aria-label="Process Step Progress"
          >
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.id}
                data-process-dot=""
                className={cn(
                  'h-2 rounded-full transition-all duration-500',
                  idx === 0 ? 'w-9 bg-[#DCCB8E]' : 'w-2.5 bg-white/20',
                )}
                aria-hidden="true"
              />
            ))}
          </div>

          <p className="text-xs font-medium text-[#FDFBEE]/70">
            Phase{' '}
            <span className="font-bold text-[#DCCB8E]">
              {activeStepDisplay + 1}
            </span>{' '}
            of {PROCESS_STEPS.length}
          </p>
        </div>
      </Container>
    </Section>
  );
}
