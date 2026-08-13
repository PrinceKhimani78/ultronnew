'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { useMotionScale } from '@/components/motion/useMotionScale';
import { HeadingText } from '@/components/ui/SectionHeading';
import {
  PROCESS_INTRO,
  PROCESS_STEPS,
  type ProcessStep,
} from '@/content/process';
import { cn } from '@/lib/utils';

/**
 * `.how-ultron-card` (defined in `globals.css`) supplies the plate itself —
 * padding, gap, background, radius, shadow and the gradient-ring `::before`
 * — identically for every card regardless of which side of the timeline it
 * sits on, which is why there is no more `LEFT_CARD_PLATE`/`RIGHT_CARD_PLATE`
 * split here. What's left as Tailwind utilities is purely layout: the width
 * cap and the desktop min-height, neither of which the card CSS itself
 * knows or should know about.
 */
const CARD_PLATE = cn(
  'how-ultron-card mx-auto w-full max-w-[360px]',
  'lg:mx-0 lg:min-h-[287px] lg:max-w-[360px]',
);

/**
 * A fragment, not a wrapping `<div>`. `.how-ultron-card` lays its children
 * out itself — `flex-direction: column` and `gap: 19px` — and a `gap` only
 * spaces *direct* children; an intermediate div here would need its own
 * `display: contents` to stay invisible to that layout, which is more
 * indirection than just not having the div. The heading no longer carries
 * its own `mb-[28px]` for the same reason: the card's `gap` is what spaces
 * title from body now, not a margin on the title.
 */
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
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const nodes = stepRefs.current.filter(
      (node): node is HTMLLIElement => node !== null,
    );

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const index = Number(
            (entry.target as HTMLElement).dataset.stepIndex ?? 0,
          );

          setActiveStep(index);
        }
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      },
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  const isStill = useMotionScale() === 0;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 80%'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section
      id="process"
      spacing="default"
      tone="brand"
      className="relative overflow-hidden bg-[#035551]"
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

        <div ref={sectionRef} className="relative mt-10 sm:mt-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-4 -ml-px w-[2px] bg-white/30 lg:left-1/2"
          />

          {!isStill ? (
            <motion.div
              aria-hidden="true"
              style={{ scaleY }}
              className="pointer-events-none absolute inset-y-0 left-4 -ml-[1.5px] w-[3px] origin-top bg-[#DCCB8E] shadow-[0_0_12px_rgba(220,203,142,0.9)] lg:left-1/2"
            />
          ) : (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-4 -ml-[1.5px] w-[3px] bg-[#DCCB8E] lg:left-1/2"
            />
          )}

          <ol className="relative z-10 space-y-10 sm:space-y-12 lg:space-y-16">
            {steps.map((step, index) => {
              const isRight = index % 2 === 1;
              const isActive = index === activeStep;

              return (
                <li
                  key={step.step}
                  ref={(node) => {
                    stepRefs.current[index] = node;
                  }}
                  data-step-index={index}
                  className="relative"
                >
                  <div
                    aria-hidden="true"
                    className="absolute top-1/2 left-4 z-20 h-4 w-4 -translate-x-1/2 -translate-y-1/2 lg:left-1/2"
                  >
                    <span
                      className={cn(
                        'ease-house block h-full w-full rounded-full bg-[#DCCB8E]',
                        'transition-[box-shadow,transform] duration-300',
                        isActive
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
                      <Reveal className={CARD_PLATE} amount={0.25}>
                        <StepCardContent title={step.title} body={step.body} />
                      </Reveal>
                    </div>

                    <div
                      className={
                        isRight
                          ? 'mt-6 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex lg:justify-end lg:pr-4'
                          : 'mt-6 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:flex lg:justify-start lg:pl-4'
                      }
                    >
                      <Reveal
                        delay={STAGGER_MS}
                        amount={0.25}
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
                      </Reveal>
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
