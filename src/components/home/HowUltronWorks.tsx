'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { HeadingText } from '@/components/ui/SectionHeading';
import {
  PROCESS_INTRO,
  PROCESS_STEPS,
  type ProcessStep,
} from '@/content/process';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CARD_PLATE = cn(
  'how-ultron-card-wrapper w-full max-w-[380px]',
  'lg:min-h-[290px] lg:max-w-[400px]',
);

function ProcessCardSurface({ title, body }: { title: string; body: string }) {
  return (
    <div className="process-card-hover-surface @media(hover:hover):hover:-translate-y-1 relative z-10 flex h-full w-full flex-col items-start justify-center gap-[19px] transition-transform duration-500 ease-[ease] motion-reduce:transform-none">
      <h3 className="heading-h3--compact text-[#035551]">{title}</h3>
      <p className="text-[17px] leading-[1.55] font-normal tracking-[0] text-[rgba(35,35,35,0.85)] sm:text-[18px]">
        {body}
      </p>
    </div>
  );
}

type HowUltronWorksProps = {
  intro?: {
    eyebrow: string;
    heading: readonly import('@/types/content').HeadingSegment[];
  };
  steps?: readonly ProcessStep[];
};

export function HowUltronWorks({
  intro = PROCESS_INTRO,
  steps = PROCESS_STEPS,
}: HowUltronWorksProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLOListElement | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !sectionRef.current ||
      !stageRef.current ||
      !listRef.current
    )
      return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      if (activeLineRef.current) {
        gsap.set(activeLineRef.current, { scaleY: 1 });
      }
      const stepNodes = listRef.current.querySelectorAll('li[data-step-index]');
      stepNodes.forEach((step) => {
        const cardLift = step.querySelector('[data-step-card-lift]');
        const imageLift =
          step.querySelector('[data-step-image-lift]') ||
          step.querySelector('[data-step-image]');
        const dot = step.querySelector('[data-step-dot]');
        if (cardLift) gsap.set(cardLift, { opacity: 1, scale: 1, y: 0 });
        if (imageLift) gsap.set(imageLift, { opacity: 1, scale: 1, y: 0 });
        if (dot) {
          gsap.set(dot, {
            scale: 1.15,
            boxShadow: '0 0 0 3px #FFFFFF, 0 0 16px rgba(220,203,142,0.85)',
          });
        }
      });
      return;
    }

    const mm = gsap.matchMedia();

    // DESKTOP: PINNED SEQUENTIAL STEP-BY-STEP SCROLL ANIMATION (lg: min-width: 1024px)
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        const stepNodes = listRef.current?.querySelectorAll(
          'li[data-step-index]',
        );
        if (!stepNodes || stepNodes.length === 0) return;

        const validSteps: {
          step: HTMLElement;
          card: HTMLElement;
          cardLift: HTMLElement;
          image: HTMLElement;
          imageLift: HTMLElement;
          dot: HTMLElement;
        }[] = [];

        stepNodes.forEach((node) => {
          const step = node as HTMLElement;
          const card = step.querySelector(
            '[data-step-card]',
          ) as HTMLElement | null;
          const cardLift = step.querySelector(
            '[data-step-card-lift]',
          ) as HTMLElement | null;
          const image = step.querySelector(
            '[data-step-image]',
          ) as HTMLElement | null;
          const imageLift = (step.querySelector('[data-step-image-lift]') ||
            image) as HTMLElement | null;
          const dot = step.querySelector(
            '[data-step-dot]',
          ) as HTMLElement | null;
          if (card && cardLift && image && imageLift && dot) {
            validSteps.push({ step, card, cardLift, image, imageLift, dot });
          }
        });

        const totalSteps = validSteps.length;
        if (totalSteps === 0) return;

        // Calculate vertical translation offsets for each step relative to step 1
        const step1Top = validSteps[0].step.offsetTop;
        const listYOffsets = validSteps.map(
          (s) => -(s.step.offsetTop - step1Top),
        );

        // Calculate progress line ratios based on dots in the list
        const listHeight = listRef.current?.offsetHeight || 1200;
        const dotRatios = validSteps.map((s) => {
          const dotCenter = s.step.offsetTop + s.step.offsetHeight / 2;
          return Math.min(1, Math.max(0.1, dotCenter / listHeight));
        });

        // Set initial positions:
        // Step 1 is initialized for initial entrance
        // Steps 2..N start below (opacity 0, y 50)
        validSteps.forEach((s, index) => {
          if (index === 0) {
            gsap.set([s.cardLift, s.imageLift], {
              opacity: 0,
              y: 50,
              force3D: true,
            });
            gsap.set(s.dot, {
              scale: 1.15,
              boxShadow: '0 0 0 3px #FFFFFF, 0 0 16px rgba(220,203,142,0.85)',
            });
          } else {
            gsap.set([s.cardLift, s.imageLift], {
              opacity: 0,
              y: 50,
              force3D: true,
            });
            gsap.set(s.dot, {
              scale: 1,
              boxShadow: 'none',
            });
          }
        });

        // Initial vertical translation of the list
        if (listRef.current) {
          gsap.set(listRef.current, { y: listYOffsets[0] });
        }

        // Active line starts at dot 1
        if (activeLineRef.current) {
          gsap.set(activeLineRef.current, {
            scaleY: dotRatios[0],
            transformOrigin: 'top center',
          });
        }

        // Heading starts visible
        if (headingRef.current) {
          gsap.set(headingRef.current, { y: 0, opacity: 1 });
        }

        // 1. Initial fadeInUp entrance for Step 1 when entering the process section
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(validSteps[0].cardLift, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              force3D: true,
            });
            gsap.to(validSteps[0].imageLift, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.1,
              ease: 'power2.out',
              force3D: true,
            });
          },
        });

        // Calculate exact scroll distance from transition count (cards.length - 1)
        const transitionCount = Math.max(totalSteps - 1, 1);
        const scrollPerStep = window.innerHeight * 0.75;
        const scrollDistance = transitionCount * scrollPerStep;

        // Master ScrollTrigger Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${scrollDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Ensure step 1 is fully active at start of pinned timeline
        tl.to(
          [validSteps[0].cardLift, validSteps[0].imageLift],
          {
            opacity: 1,
            y: 0,
            duration: 0.01,
          },
          0,
        );

        // 0. Smoothly fade out large heading on scroll start, keeping small eyebrow visible
        if (headingRef.current) {
          tl.to(
            headingRef.current,
            {
              opacity: 0,
              scale: 0.96,
              duration: 0.35,
              ease: 'power2.out',
            },
            0,
          );
        }

        // Construct transitions: each transition occupies 1 unit of timeline time
        const TRANSITION_DURATION = 0.8;
        const HOLD_DURATION = 0.25;

        for (let i = 0; i < transitionCount; i++) {
          const current = validSteps[i];
          const next = validSteps[i + 1];
          const startTime =
            i * (HOLD_DURATION + TRANSITION_DURATION) + HOLD_DURATION;

          // 1. Translate the list upward to center the next card in the focus zone
          if (listRef.current) {
            tl.to(
              listRef.current,
              {
                y: listYOffsets[i + 1],
                duration: TRANSITION_DURATION,
                ease: 'power2.inOut',
              },
              startTime,
            );
          }

          // 2. Extend active timeline line smoothly from top to bottom
          if (activeLineRef.current) {
            tl.to(
              activeLineRef.current,
              {
                scaleY: dotRatios[i + 1],
                duration: TRANSITION_DURATION,
                ease: 'power2.inOut',
              },
              startTime,
            );
          }

          // 3. Outgoing card and image smoothly fade and drift upward
          tl.to(
            [current.cardLift, current.imageLift],
            {
              opacity: 0.15,
              y: -25,
              duration: TRANSITION_DURATION * 0.7,
              ease: 'power2.inOut',
              force3D: true,
            },
            startTime,
          );

          // Current dot un-glows
          tl.to(
            current.dot,
            {
              scale: 1,
              boxShadow: 'none',
              duration: TRANSITION_DURATION * 0.5,
              ease: 'power2.out',
            },
            startTime,
          );

          // 4. Incoming active card executes fadeInUp (opacity 0 -> 1, y 50 -> 0)
          tl.fromTo(
            next.cardLift,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: TRANSITION_DURATION,
              ease: 'power2.out',
              force3D: true,
            },
            startTime + 0.05,
          );

          // 5. Incoming active image executes fadeInUp with slight stagger
          tl.fromTo(
            next.imageLift,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: TRANSITION_DURATION,
              ease: 'power2.out',
              force3D: true,
            },
            startTime + 0.15,
          );

          // Next dot glows
          tl.to(
            next.dot,
            {
              scale: 1.15,
              boxShadow: '0 0 0 3px #FFFFFF, 0 0 16px rgba(220,203,142,0.85)',
              duration: TRANSITION_DURATION * 0.6,
              ease: 'power2.out',
            },
            startTime + 0.15,
          );
        }

        // Brief hold on final card before unpinning cleanly
        tl.to({}, { duration: 0.2 });
      }, sectionRef);

      return () => ctx.revert();
    });

    // MOBILE & TABLET: NATURAL FLOW SCROLL REVEAL (max-width: 1023px)
    mm.add('(max-width: 1023px)', () => {
      const ctx = gsap.context(() => {
        if (listRef.current) {
          gsap.set(listRef.current, { y: 0 });
        }

        const stepNodes = listRef.current?.querySelectorAll(
          'li[data-step-index]',
        );

        stepNodes?.forEach((step) => {
          const cardLift = step.querySelector(
            '[data-step-card-lift]',
          ) as HTMLElement | null;
          const imageLift = (step.querySelector('[data-step-image-lift]') ||
            step.querySelector('[data-step-image]')) as HTMLElement | null;
          const dot = step.querySelector(
            '[data-step-dot]',
          ) as HTMLElement | null;

          if (cardLift && imageLift && dot) {
            gsap.set([cardLift, imageLift], {
              opacity: 0.2,
              y: 40,
              scale: 0.98,
              force3D: true,
            });
            gsap.set(dot, { scale: 0.9, boxShadow: 'none' });
          }
        });

        if (activeLineRef.current) {
          gsap.set(activeLineRef.current, {
            scaleY: 0,
            transformOrigin: 'top center',
          });

          ScrollTrigger.create({
            trigger: listRef.current,
            start: 'top 75%',
            end: 'bottom 65%',
            scrub: 0.6,
            animation: gsap.to(activeLineRef.current, {
              scaleY: 1,
              ease: 'none',
            }),
          });
        }

        stepNodes?.forEach((step) => {
          const cardLift = step.querySelector(
            '[data-step-card-lift]',
          ) as HTMLElement | null;
          const imageLift = (step.querySelector('[data-step-image-lift]') ||
            step.querySelector('[data-step-image]')) as HTMLElement | null;
          const dot = step.querySelector(
            '[data-step-dot]',
          ) as HTMLElement | null;

          if (cardLift && imageLift && dot) {
            gsap.to(cardLift, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play reverse play reverse',
              },
            });

            gsap.to(imageLift, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              delay: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play reverse play reverse',
              },
            });

            gsap.to(dot, {
              scale: 1.15,
              boxShadow: '0 0 0 3px #FFFFFF, 0 0 14px rgba(220,203,142,0.85)',
              duration: 0.4,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play reverse play reverse',
              },
            });
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    });

    // Refresh ScrollTrigger when images load
    const images = stageRef.current.querySelectorAll('img');
    let loadedCount = 0;
    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        ScrollTrigger.refresh();
      }
    };
    images.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener('load', handleImageLoad);
        img.addEventListener('error', handleImageLoad);
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    if (stageRef.current) {
      resizeObserver.observe(stageRef.current);
    }

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
      resizeObserver.disconnect();
      mm.revert();
    };
  }, [steps]);

  return (
    <Section
      ref={sectionRef}
      id="process"
      spacing="default"
      tone="brand"
      className="how-ultron-works-section relative flex min-h-screen w-full max-w-full flex-col justify-center overflow-x-clip bg-[#035551] pt-28 pb-14 sm:pt-32 sm:pb-16 lg:h-screen lg:min-h-[700px] lg:pt-[105px] lg:pb-10"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .how-ultron-works-section {
              width: 100%;
              max-width: 100%;
              overflow-x: clip;
            }
            .how-ultron-works-section * {
              box-sizing: border-box;
            }
          `,
        }}
      />
      <Container width="wide">
        {/* Section Header with column wrapper preserving clean 16-20px gap */}
        <div className="process-heading relative mb-6 flex flex-col items-center text-center sm:mb-8 lg:mb-6">
          {/* Eyebrow: stays cleanly visible below fixed nav */}
          <div
            ref={eyebrowRef}
            className="process-eyebrow sticky top-[calc(var(--header-height,70px)+16px)] z-30 flex items-center justify-center"
          >
            <p
              className="font-display flex items-center justify-center gap-2 text-[15px] leading-none font-normal tracking-[0.08em] uppercase sm:text-[16px]"
              style={{ color: '#C9B37E' }}
            >
              <span aria-hidden="true" className="shrink-0">
                --
              </span>
              {intro.eyebrow}
            </p>
          </div>

          {/* Large Heading: appears normally with clear 16-20px spacing in normal flow, then fades out smoothly */}
          <div
            ref={headingRef}
            className="process-main-heading mt-2.5 origin-top sm:mt-3.5 lg:mt-4.5"
          >
            <h2 className="heading-h2 m-0 text-white">
              <HeadingText
                segments={intro.heading}
                accentClassName="text-white"
              />
            </h2>
          </div>
        </div>

        {/* Central Stage for Process Cards */}
        <div
          ref={stageRef}
          className="relative mx-auto w-full max-w-[1060px] lg:h-[390px]"
        >
          {/* Vertical background line track */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-5 -ml-px w-[2px] bg-white/20 sm:left-6 lg:left-1/2"
          />

          {/* Active vertical progress line */}
          <div
            ref={activeLineRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-5 -ml-[1px] w-[3px] origin-top bg-[#DCCB8E] shadow-[0_0_14px_rgba(220,203,142,0.95)] sm:left-6 lg:left-1/2"
          />

          <ol
            ref={listRef}
            className="relative z-10 space-y-12 sm:space-y-16 lg:absolute lg:top-0 lg:left-0 lg:w-full lg:space-y-24"
          >
            {steps.map((step, index) => {
              const isRight = index % 2 === 1;

              return (
                <li
                  key={step.step}
                  data-step-index={index}
                  className="relative flex flex-col lg:flex-row lg:items-center"
                >
                  {/* Timeline Dot Indicator */}
                  <div
                    aria-hidden="true"
                    className="absolute top-1/2 left-5 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 sm:left-6 lg:left-1/2"
                  >
                    <span
                      data-step-dot=""
                      className={cn(
                        'block h-full w-full rounded-full bg-[#DCCB8E]',
                        'transition-[box-shadow,transform] duration-300',
                        index === 0
                          ? 'scale-[1.15] shadow-[0_0_0_3px_#FFFFFF,0_0_16px_rgba(220,203,142,0.85)]'
                          : 'scale-100 shadow-none',
                      )}
                    />
                  </div>

                  {/* 2-Column Responsive Layout */}
                  <div className="w-full pl-12 sm:pl-16 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:pl-0 xl:gap-20">
                    {/* Column 1 */}
                    <div
                      className={
                        isRight
                          ? 'mt-6 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex lg:justify-end lg:pr-8'
                          : 'lg:col-start-1 lg:flex lg:justify-end lg:pr-8'
                      }
                    >
                      {isRight ? (
                        <div
                          data-step-image=""
                          className="flex w-full justify-center lg:justify-end"
                        >
                          <div
                            data-step-image-lift=""
                            className="mx-auto flex h-44 w-44 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white/60 bg-white p-3 shadow-[0px_10px_30px_rgba(0,0,0,0.25)] sm:h-52 sm:w-52 lg:mx-0 lg:h-56 lg:w-56"
                          >
                            <Image
                              src={step.image}
                              alt=""
                              aria-hidden="true"
                              width={261}
                              height={184}
                              sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 224px"
                              className="h-auto w-32 object-contain sm:w-40 lg:w-44"
                            />
                          </div>
                        </div>
                      ) : (
                        <div data-step-card="" className={CARD_PLATE}>
                          <div
                            data-step-card-lift=""
                            className="how-ultron-card h-full w-full"
                          >
                            <ProcessCardSurface
                              title={step.title}
                              body={step.body}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Column 2 */}
                    <div
                      className={
                        isRight
                          ? 'lg:col-start-2 lg:flex lg:justify-start lg:pl-8'
                          : 'mt-6 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:flex lg:justify-start lg:pl-8'
                      }
                    >
                      {isRight ? (
                        <div data-step-card="" className={CARD_PLATE}>
                          <div
                            data-step-card-lift=""
                            className="how-ultron-card h-full w-full"
                          >
                            <ProcessCardSurface
                              title={step.title}
                              body={step.body}
                            />
                          </div>
                        </div>
                      ) : (
                        <div
                          data-step-image=""
                          className="flex w-full justify-center lg:justify-start"
                        >
                          <div
                            data-step-image-lift=""
                            className="mx-auto flex h-44 w-44 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white/60 bg-white p-3 shadow-[0px_10px_30px_rgba(0,0,0,0.25)] sm:h-52 sm:w-52 lg:mx-0 lg:h-56 lg:w-56"
                          >
                            <Image
                              src={step.image}
                              alt=""
                              aria-hidden="true"
                              width={261}
                              height={184}
                              sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 224px"
                              className="h-auto w-32 object-contain sm:w-40 lg:w-44"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
