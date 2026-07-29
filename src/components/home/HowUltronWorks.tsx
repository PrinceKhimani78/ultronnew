'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Eyebrow, HeadingText } from '@/components/ui/SectionHeading';
import { PROCESS_INTRO, PROCESS_STEPS } from '@/content/process';

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
      className="from-brand-mid to-brand-deep relative overflow-hidden bg-gradient-to-b"
    >
      <Container width="wide">
        <div className="text-center">
          <Eyebrow align="center">{PROCESS_INTRO.eyebrow}</Eyebrow>
          <h2 className="font-display text-surface mt-3 text-[clamp(2rem,3.8vw,2.85rem)] leading-[1.12] font-bold tracking-[-0.02em]">
            <HeadingText segments={PROCESS_INTRO.heading} inverted />
          </h2>
          <p className="text-surface/80 mx-auto mt-4 max-w-2xl text-base leading-relaxed">
            {PROCESS_INTRO.body}
          </p>
        </div>

        {/* Timeline Container with Scroll Progress Line */}
        <div ref={sectionRef} className="relative mt-16 sm:mt-24">
          {/* Static Background Spine Line */}
          <div
            aria-hidden="true"
            className="bg-surface/20 pointer-events-none absolute inset-y-0 left-4 w-[2px] -translate-x-1/2 lg:left-1/2"
          />

          {/* Dynamic Scroll Progress Line */}
          {!isReducedMotion ? (
            <motion.div
              aria-hidden="true"
              style={{ scaleY }}
              className="bg-accent-deep pointer-events-none absolute inset-y-0 left-4 w-[3px] origin-top -translate-x-1/2 shadow-[0_0_10px_rgba(201,179,126,0.8)] lg:left-1/2"
            />
          ) : (
            <div
              aria-hidden="true"
              className="bg-accent-deep pointer-events-none absolute inset-y-0 left-4 w-[3px] -translate-x-1/2 lg:left-1/2"
            />
          )}

          <ol className="relative z-10 space-y-12 sm:space-y-16 lg:space-y-24">
            {PROCESS_STEPS.map((step, index) => {
              const isRight = index % 2 === 1;

              return (
                <li key={step.step} className="relative">
                  {/* Glowing Node Marker on Spine */}
                  {!isReducedMotion ? (
                    <motion.div
                      aria-hidden="true"
                      initial={{ scale: 0.6, opacity: 0.4 }}
                      whileInView={{ scale: 1.2, opacity: 1 }}
                      viewport={{ amount: 0.6 }}
                      transition={{ duration: 0.3 }}
                      className="bg-accent border-brand-deep absolute top-10 left-4 z-20 h-5 w-5 -translate-x-1/2 rounded-full border-4 shadow-md lg:left-1/2"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="bg-accent border-brand-deep absolute top-10 left-4 z-20 h-5 w-5 -translate-x-1/2 rounded-full border-4 shadow-md lg:left-1/2"
                    />
                  )}

                  <div className="pl-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 lg:pl-0">
                    {/* Process Step Card */}
                    <div
                      className={
                        isRight
                          ? 'lg:col-start-2 lg:pl-6'
                          : 'lg:col-start-1 lg:pr-6'
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
                          className="bg-surface shadow-lift rounded-2xl border border-white/60 p-6 sm:p-8"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="font-display text-brand text-lg font-bold tracking-tight sm:text-xl">
                              {step.title}
                            </h3>
                            {/*
                              The step ordinal, not a duration. The badge
                              previously showed invented timelines ("Week 2–8");
                              the client's copy commits to no delivery times, so
                              the field was removed from the content rather than
                              guessed at.
                            */}
                            <span
                              aria-hidden="true"
                              className="bg-brand/10 text-brand shrink-0 rounded-full px-2.5 py-1 font-mono text-xs font-semibold"
                            >
                              {step.step}
                            </span>
                          </div>
                          <p className="text-ink-muted mt-3 text-sm leading-relaxed sm:text-base">
                            {step.body}
                          </p>
                        </motion.div>
                      ) : (
                        <div className="bg-surface shadow-lift rounded-2xl border border-white/60 p-6 sm:p-8">
                          <div className="flex items-center justify-between gap-4">
                            <h3 className="font-display text-brand text-lg font-bold tracking-tight sm:text-xl">
                              {step.title}
                            </h3>
                            {/*
                              The step ordinal, not a duration. The badge
                              previously showed invented timelines ("Week 2–8");
                              the client's copy commits to no delivery times, so
                              the field was removed from the content rather than
                              guessed at.
                            */}
                            <span
                              aria-hidden="true"
                              className="bg-brand/10 text-brand shrink-0 rounded-full px-2.5 py-1 font-mono text-xs font-semibold"
                            >
                              {step.step}
                            </span>
                          </div>
                          <p className="text-ink-muted mt-3 text-sm leading-relaxed sm:text-base">
                            {step.body}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* 3D Circular Illustration Badge */}
                    <div
                      className={
                        isRight
                          ? 'mt-6 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex lg:justify-end lg:pr-6'
                          : 'mt-6 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:flex lg:justify-start lg:pl-6'
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
                          className="shadow-lift mx-auto flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-4 border-white/40 bg-white sm:h-44 sm:w-44 lg:mx-0"
                        >
                          <Image
                            src={step.image}
                            alt=""
                            aria-hidden="true"
                            width={261}
                            height={184}
                            sizes="180px"
                            className="h-auto w-24 object-contain sm:w-32"
                          />
                        </motion.div>
                      ) : (
                        <div className="shadow-lift mx-auto flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-4 border-white/40 bg-white sm:h-44 sm:w-44 lg:mx-0">
                          <Image
                            src={step.image}
                            alt=""
                            aria-hidden="true"
                            width={261}
                            height={184}
                            sizes="180px"
                            className="h-auto w-24 object-contain sm:w-32"
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
