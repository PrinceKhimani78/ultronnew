'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow, HeadingText } from '@/components/ui/SectionHeading';
import { PROCESS_INTRO, PROCESS_STEPS } from '@/content/process';

/**
 * "How ULTRON Works" section redesigned to match Figma inspect specs:
 * - Full section background: Dark Teal #035551
 * - Timeline Card: 20px radius, 5px gradient border (#FFFFFF 5% to #DCCB8E 100%), pure white inner background & soft drop shadow
 * - Circular 3D Illustration Badges: Round white cards containing process 3D assets
 * - Center vertical spine with gold nodes (#DCCB8E)
 */

export function HowUltronWorks() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      requestAnimationFrame(() => {
        setIsReducedMotion(true);
      });
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 80%'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section
      id="process"
      spacing="spacious"
      tone="brand"
      className="relative overflow-hidden bg-[#035551] py-20 sm:py-28"
    >
      <Container width="wide">
        <div className="text-center">
          <Eyebrow align="center">{PROCESS_INTRO.eyebrow}</Eyebrow>
          <h2 className="font-display mt-3 text-[clamp(2rem,3.8vw,2.85rem)] leading-[1.12] font-bold tracking-[-0.02em] text-white">
            <HeadingText segments={PROCESS_INTRO.heading} inverted />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
            {PROCESS_INTRO.body}
          </p>
        </div>

        {/* Timeline Container with Scroll Progress Line */}
        <div ref={sectionRef} className="relative mt-16 sm:mt-24">
          {/* Static Background Spine Line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-4 w-[2px] -translate-x-1/2 bg-white/30 lg:left-1/2"
          />

          {/* Dynamic Scroll Progress Line */}
          {!isReducedMotion ? (
            <motion.div
              aria-hidden="true"
              style={{ scaleY }}
              className="pointer-events-none absolute inset-y-0 left-4 w-[3px] origin-top -translate-x-1/2 bg-[#DCCB8E] shadow-[0_0_12px_rgba(220,203,142,0.9)] lg:left-1/2"
            />
          ) : (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-4 w-[3px] -translate-x-1/2 bg-[#DCCB8E] lg:left-1/2"
            />
          )}

          <ol className="relative z-10 space-y-12 sm:space-y-16 lg:space-y-24">
            {PROCESS_STEPS.map((step, index) => {
              const isRight = index % 2 === 1;

              return (
                <li key={step.step} className="relative">
                  {/* Gold Spine Node Marker */}
                  {!isReducedMotion ? (
                    <motion.div
                      aria-hidden="true"
                      initial={{ scale: 0.6, opacity: 0.5 }}
                      whileInView={{ scale: 1.1, opacity: 1 }}
                      viewport={{ amount: 0.6 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-1/2 left-4 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#DCCB8E] shadow-md lg:left-1/2"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="absolute top-1/2 left-4 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#DCCB8E] shadow-md lg:left-1/2"
                    />
                  )}

                  <div className="pl-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8 lg:pl-0">
                    {/* Step Card with 5px Gradient Border & 20px Radius */}
                    <div
                      className={
                        isRight
                          ? 'lg:col-start-2 lg:flex lg:justify-start lg:pl-4'
                          : 'lg:col-start-1 lg:flex lg:justify-end lg:pr-4'
                      }
                    >
                      {!isReducedMotion ? (
                        <motion.div
                          initial={{ opacity: 0, y: 24 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ amount: 0.4 }}
                          transition={{
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="relative flex min-h-[287px] w-full max-w-[306px] flex-col rounded-[20px] bg-gradient-to-b from-white via-white to-[#DCCB8E] p-[5px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.20)]"
                        >
                          <div className="flex flex-1 flex-col justify-center rounded-[15px] bg-white p-6 shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.20)] sm:p-7">
                            <h3 className="font-display text-xl font-bold tracking-tight text-[#035551] sm:text-2xl">
                              {step.title}
                            </h3>
                            <p className="text-ink-muted mt-3.5 text-xs leading-relaxed sm:text-sm">
                              {step.body}
                            </p>
                          </div>
                        </motion.div>
                      ) : (
                        <div className="relative flex min-h-[287px] w-full max-w-[306px] flex-col rounded-[20px] bg-gradient-to-b from-white via-white to-[#DCCB8E] p-[5px] shadow-[0px_20px_40px_0px_rgba(0,0,0,0.20)]">
                          <div className="flex flex-1 flex-col justify-center rounded-[15px] bg-white p-6 shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.20)] sm:p-7">
                            <h3 className="font-display text-xl font-bold tracking-tight text-[#035551] sm:text-2xl">
                              {step.title}
                            </h3>
                            <p className="text-ink-muted mt-3.5 text-xs leading-relaxed sm:text-sm">
                              {step.body}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Circular 3D Illustration Badge */}
                    <div
                      className={
                        isRight
                          ? 'mt-6 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex lg:justify-end lg:pr-4'
                          : 'mt-6 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:flex lg:justify-start lg:pl-4'
                      }
                    >
                      {!isReducedMotion ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.85 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ amount: 0.4 }}
                          transition={{
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          }}
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
                        </motion.div>
                      ) : (
                        <div className="mx-auto flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border-4 border-white/60 bg-white p-3 shadow-[0px_10px_25px_rgba(0,0,0,0.20)] sm:h-52 sm:w-52 lg:mx-0">
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
