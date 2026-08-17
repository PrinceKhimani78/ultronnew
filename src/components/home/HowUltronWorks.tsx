'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
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
  'how-ultron-card mx-auto w-full max-w-[360px]',
  'lg:mx-0 lg:min-h-[287px] lg:max-w-[360px]',
);

function StepCardContent({ title, body }: { title: string; body: string }) {
  return (
    <>
      <h3 className="heading-h3--compact text-[#035551]">{title}</h3>
      <p className="text-[18px] leading-[1.5] font-normal tracking-[0] text-[rgba(35,35,35,0.82)]">
        {body}
      </p>
    </>
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
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLOListElement | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !triggerRef.current ||
      !pinRef.current ||
      !sectionRef.current
    )
      return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(activeLineRef.current, { scaleY: 1 });
      const stepNodes = triggerRef.current.querySelectorAll(
        'li[data-step-index]',
      );
      stepNodes.forEach((step) => {
        const card = step.querySelector('[data-step-card]');
        const image = step.querySelector('[data-step-image]');
        const dot = step.querySelector('[data-step-dot]');
        gsap.set([card, image], { opacity: 1, scale: 1, x: 0, y: 0 });
        gsap.set(dot, { scale: 1.08, boxShadow: '0 0 0 2px #FFFFFF' });
      });
      return;
    }

    const mm = gsap.matchMedia();

    // DESKTOP PINNED ANIMATION (lg: min-width: 1024px)
    mm.add('(min-width: 1024px)', () => {
      const ctx = gsap.context(() => {
        // Query elements directly from DOM to avoid any React ref timing mismatches
        const stepNodes = triggerRef.current?.querySelectorAll(
          'li[data-step-index]',
        );
        if (!stepNodes || stepNodes.length < 4) return;

        const validSteps: {
          step: HTMLElement;
          card: HTMLElement;
          image: HTMLElement;
          dot: HTMLElement;
        }[] = [];

        stepNodes.forEach((node) => {
          const step = node as HTMLElement;
          const card = step.querySelector(
            '[data-step-card]',
          ) as HTMLElement | null;
          const image = step.querySelector(
            '[data-step-image]',
          ) as HTMLElement | null;
          const dot = step.querySelector(
            '[data-step-dot]',
          ) as HTMLElement | null;
          if (card && image && dot) {
            validSteps.push({ step, card, image, dot });
          }
        });

        if (validSteps.length < 4) return;

        // Set sectionRef container height to match the first row's height dynamically
        const step1Height = validSteps[0].step.offsetHeight || 300;
        gsap.set(sectionRef.current, { height: step1Height });

        // Calculate translation offsets relative to step 1
        const listYOffsets = validSteps.map((s) => {
          return -(s.step.offsetTop - validSteps[0].step.offsetTop);
        });

        // Calculate timeline line progress ratios for each dot
        const listHeight = listRef.current?.offsetHeight || 1200;
        const dotYPositions = validSteps.map((s) => {
          return s.step.offsetTop + s.step.offsetHeight / 2;
        });
        const dotRatios = dotYPositions.map((y) => y / listHeight);

        // Initial setup for desktop
        validSteps.forEach((s, index) => {
          if (index === 0) {
            gsap.set([s.card, s.image], { opacity: 1, scale: 1, x: 0 });
            gsap.set(s.dot, { scale: 1.08, boxShadow: '0 0 0 2px #FFFFFF' });
          } else {
            const isRight = index % 2 === 1;
            gsap.set(s.card, {
              opacity: 0.28,
              scale: 0.97,
              x: isRight ? 20 : -20,
              force3D: true,
            });
            gsap.set(s.image, {
              opacity: 0.28,
              scale: 0.97,
              x: isRight ? -20 : 20,
              force3D: true,
            });
            gsap.set(s.dot, { scale: 1, boxShadow: 'none' });
          }
        });

        // Active line starts at dot 1 scale ratio
        if (activeLineRef.current) {
          gsap.set(activeLineRef.current, {
            scaleY: dotRatios[0],
            transformOrigin: 'top center',
          });
        }

        // Set initial vertical translation of the list so Step 1 is visible immediately
        if (listRef.current) {
          gsap.set(listRef.current, { y: listYOffsets[0] });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: '+=200%',
            scrub: 0.7,
            pin: pinRef.current,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Animate list translateY
        if (listRef.current) {
          tl.to(
            listRef.current,
            {
              y: listYOffsets[1],
              duration: 1,
              ease: 'power2.inOut',
            },
            0.1,
          );
          tl.to(
            listRef.current,
            {
              y: listYOffsets[2],
              duration: 1,
              ease: 'power2.inOut',
            },
            1.1,
          );
          tl.to(
            listRef.current,
            {
              y: listYOffsets[3],
              duration: 1,
              ease: 'power2.inOut',
            },
            2.1,
          );
        }

        // Animate vertical timeline scale growth in sync with dots
        if (activeLineRef.current) {
          tl.to(
            activeLineRef.current,
            {
              scaleY: dotRatios[1],
              duration: 1,
              ease: 'power2.inOut',
            },
            0.1,
          );
          tl.to(
            activeLineRef.current,
            {
              scaleY: dotRatios[2],
              duration: 1,
              ease: 'power2.inOut',
            },
            1.1,
          );
          tl.to(
            activeLineRef.current,
            {
              scaleY: dotRatios[3],
              duration: 1,
              ease: 'power2.inOut',
            },
            2.1,
          );
        }

        // Step 1 exit to completed state
        tl.to(
          [validSteps[0].card, validSteps[0].image],
          {
            opacity: 0.5,
            scale: 0.97,
            x: (idx, target) => {
              const isCard = (target as HTMLElement).hasAttribute(
                'data-step-card',
              );
              return isCard ? -20 : 20; // card exits left, image exits right
            },
            force3D: true,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          0.2,
        );
        tl.to(
          validSteps[0].dot,
          { scale: 1, boxShadow: 'none', duration: 0.4 },
          0.2,
        );

        // Step 2 enter to active state
        tl.to(
          [validSteps[1].card, validSteps[1].image],
          {
            opacity: 1,
            scale: 1,
            x: 0,
            force3D: true,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          0.4,
        );
        tl.to(
          validSteps[1].dot,
          { scale: 1.08, boxShadow: '0 0 0 2px #FFFFFF', duration: 0.4 },
          0.4,
        );

        // Step 2 exit to completed state
        tl.to(
          [validSteps[1].card, validSteps[1].image],
          {
            opacity: 0.5,
            scale: 0.97,
            x: (idx, target) => {
              const isCard = (target as HTMLElement).hasAttribute(
                'data-step-card',
              );
              return isCard ? 20 : -20; // card exits right, image exits left
            },
            force3D: true,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          1.2,
        );
        tl.to(
          validSteps[1].dot,
          { scale: 1, boxShadow: 'none', duration: 0.4 },
          1.2,
        );

        // Step 3 enter to active state
        tl.to(
          [validSteps[2].card, validSteps[2].image],
          {
            opacity: 1,
            scale: 1,
            x: 0,
            force3D: true,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          1.4,
        );
        tl.to(
          validSteps[2].dot,
          { scale: 1.08, boxShadow: '0 0 0 2px #FFFFFF', duration: 0.4 },
          1.4,
        );

        // Step 3 exit to completed state
        tl.to(
          [validSteps[2].card, validSteps[2].image],
          {
            opacity: 0.5,
            scale: 0.97,
            x: (idx, target) => {
              const isCard = (target as HTMLElement).hasAttribute(
                'data-step-card',
              );
              return isCard ? -20 : 20; // card exits left, image exits right
            },
            force3D: true,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          2.2,
        );
        tl.to(
          validSteps[2].dot,
          { scale: 1, boxShadow: 'none', duration: 0.4 },
          2.2,
        );

        // Step 4 enter to active state
        tl.to(
          [validSteps[3].card, validSteps[3].image],
          {
            opacity: 1,
            scale: 1,
            x: 0,
            force3D: true,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          2.4,
        );
        tl.to(
          validSteps[3].dot,
          { scale: 1.08, boxShadow: '0 0 0 2px #FFFFFF', duration: 0.4 },
          2.4,
        );

        // Keep the final process fully visible for the last 20% of scroll
        tl.to({}, { duration: 0.7 });
      }, triggerRef);
      return () => ctx.revert();
    });

    // MOBILE NORMAL SCROLL REVEAL (max-width: 1023px)
    mm.add('(max-width: 1023px)', () => {
      const ctx = gsap.context(() => {
        // Reset section height on mobile
        gsap.set(sectionRef.current, { height: 'auto' });

        if (listRef.current) {
          gsap.set(listRef.current, { y: 0 });
        }

        const stepNodes = triggerRef.current?.querySelectorAll(
          'li[data-step-index]',
        );
        stepNodes?.forEach((step) => {
          const card = step.querySelector(
            '[data-step-card]',
          ) as HTMLElement | null;
          const image = step.querySelector(
            '[data-step-image]',
          ) as HTMLElement | null;
          const dot = step.querySelector(
            '[data-step-dot]',
          ) as HTMLElement | null;

          if (card && image && dot) {
            gsap.set([card, image], { opacity: 0, y: 30, x: 0, scale: 1 });
            gsap.set(dot, { scale: 0, boxShadow: 'none' });
          }
        });

        if (activeLineRef.current) {
          gsap.set(activeLineRef.current, {
            scaleY: 0,
            transformOrigin: 'top center',
          });
        }

        if (activeLineRef.current) {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true,
            animation: gsap.to(activeLineRef.current, {
              scaleY: 1,
              ease: 'none',
            }),
          });
        }

        stepNodes?.forEach((step) => {
          const card = step.querySelector(
            '[data-step-card]',
          ) as HTMLElement | null;
          const image = step.querySelector(
            '[data-step-image]',
          ) as HTMLElement | null;
          const dot = step.querySelector(
            '[data-step-dot]',
          ) as HTMLElement | null;

          if (card && image && dot) {
            gsap.to([card, image], {
              opacity: 1,
              y: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            });

            gsap.to(dot, {
              scale: 1.08,
              boxShadow: '0 0 0 2px #FFFFFF',
              duration: 0.3,
              scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            });
          }
        });
      }, triggerRef);
      return () => ctx.revert();
    });

    // Refresh ScrollTrigger when images load
    const images = sectionRef.current.querySelectorAll('img');
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
    if (sectionRef.current) {
      resizeObserver.observe(sectionRef.current);
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
    <div
      ref={triggerRef}
      className="relative w-full overflow-x-clip lg:h-[300vh]"
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
            :root {
              --how-ultron-gap: clamp(35px, 5vh, 50px);
            }
            @media (min-width: 768px) {
              :root {
                --how-ultron-gap: clamp(45px, 6vh, 65px);
              }
            }
            @media (min-width: 1024px) {
              :root {
                --how-ultron-gap: clamp(55px, 7vh, 85px);
              }
            }
          `,
        }}
      />
      <div
        ref={pinRef}
        className="w-full lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden"
      >
        <Section
          id="process"
          spacing="default"
          tone="brand"
          className="how-ultron-works-section relative overflow-hidden bg-[#035551] lg:flex lg:h-full lg:flex-col lg:justify-center"
        >
          <Container width="wide">
            <Reveal className="text-center">
              <p
                className="font-display flex items-center justify-center gap-2 text-[16px] leading-none font-normal tracking-[0.08em] uppercase"
                style={{ color: '#C9B37E' }}
              >
                <span aria-hidden="true" className="shrink-0">
                  --
                </span>
                {intro.eyebrow}
              </p>

              <h2 className="heading-h2 mt-3.5 text-white">
                <HeadingText
                  segments={intro.heading}
                  accentClassName="text-white"
                />
              </h2>
            </Reveal>

            <div
              ref={sectionRef}
              className="relative lg:overflow-hidden"
              style={{
                marginTop: 'var(--how-ultron-gap, 55px)',
              }}
            >
              <ol
                ref={listRef}
                className="relative z-10 space-y-10 sm:space-y-12 lg:absolute lg:top-0 lg:left-0 lg:w-full lg:space-y-24"
              >
                {/* Desktop vertical line track */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-4 -ml-px w-[2px] bg-white/30 lg:left-1/2"
                />

                {/* Desktop active vertical progress line */}
                <div
                  ref={activeLineRef}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-4 -ml-[1.5px] w-[3px] origin-top bg-[#DCCB8E] shadow-[0_0_12px_rgba(220,203,142,0.9)] lg:left-1/2"
                />

                {steps.map((step, index) => {
                  const isRight = index % 2 === 1;

                  return (
                    <li
                      key={step.step}
                      data-step-index={index}
                      className="relative"
                    >
                      <div
                        aria-hidden="true"
                        className="absolute top-1/2 left-4 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 lg:left-1/2"
                      >
                        <span
                          data-step-dot=""
                          className={cn(
                            'ease-house block h-full w-full rounded-full bg-[#DCCB8E]',
                            'transition-[box-shadow,transform] duration-300',
                            index === 0
                              ? 'scale-[1.08] shadow-[0_0_0_2px_#FFFFFF]'
                              : 'scale-100 shadow-none',
                          )}
                        />
                      </div>

                      <div className="pl-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 lg:pl-0">
                        <div
                          className={
                            isRight
                              ? 'lg:col-start-2 lg:flex lg:justify-start lg:pl-4'
                              : 'lg:col-start-1 lg:flex lg:justify-end lg:pr-4'
                          }
                        >
                          <div data-step-card="" className={CARD_PLATE}>
                            <StepCardContent
                              title={step.title}
                              body={step.body}
                            />
                          </div>
                        </div>

                        <div
                          className={
                            isRight
                              ? 'mt-6 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex lg:justify-end lg:pr-4'
                              : 'mt-6 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:flex lg:justify-start lg:pl-4'
                          }
                        >
                          <div
                            data-step-image=""
                            className="mx-auto flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border-4 border-white/60 bg-white p-3 shadow-[0px_10px_25px_rgba(0,0,0,0.20)] sm:h-52 sm:w-52 lg:mx-0"
                          >
                            <Image
                              src={step.image}
                              alt=""
                              aria-hidden="true"
                              width={261}
                              height={184}
                              sizes="200px"
                              className="h-auto w-32 object-contain sm:w-40"
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Container>
        </Section>
      </div>
    </div>
  );
}
