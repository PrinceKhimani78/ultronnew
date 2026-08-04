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
import { PROCESS_INTRO, PROCESS_STEPS } from '@/content/process';
import { cn } from '@/lib/utils';

/**
 * "How ULTRON Works" section, matching the Figma inspect panel:
 * - Full section background: Dark Teal #035551
 * - Center vertical spine with gold nodes (#DCCB8E)
 * - Circular 3D Illustration Badges: Round white cards containing process 3D assets
 *
 * Card values are transcribed from inspect, not estimated — 306px wide, 20px
 * radius, a 5px border, 40px background blur, `0 20 40 0 #000 20%` outside and
 * `0 1 2 0 #FFF 20%` inset.
 *
 * Two of those are easy to get subtly wrong:
 *
 *   - the border gradient is `#FFFFFF at 5% opacity` → `#DCCB8E`, NOT white
 *     fading to gold. The 5% is the stop's alpha, so the top of the plate is
 *     very nearly transparent and reads as the teal behind it.
 *   - the radius is the OUTER corner. With a 5px border drawn inside it, the
 *     white fill's radius is 15px, not 20px.
 *
 * ⚠️ This component renders on `/` AND on `/home-design-preview`, which were
 * required to be indistinguishable. Any change here lands on both.
 */

/**
 * The gold-gradient plate that forms the card's 5px stroke.
 *
 * Width, radius, stroke, shadow and blur are transcribed from the inspect panel.
 * `min-h` rather than a fixed `h`: the panel reports 287px for the frame it
 * measured, but two of the four approved bodies need 299px at 18px/150% inside a
 * 228px measure. A hard height would clip roughly 12px of copy on those two, and
 * clipped text is a worse failure than a card twelve pixels tall. See
 * HOME_PAGE_REVIEW.md for the arithmetic and the three ways to close it.
 */
const BASE_CARD_PLATE =
  'relative flex w-full flex-col rounded-[20px] p-[5px] ' +
  'bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,#DCCB8E_100%)] ' +
  'backdrop-blur-[40px] ' +
  // Mobile fills its column up to the design's 360px ceiling; desktop pins to 306.
  'mx-auto max-w-[360px] lg:mx-0 lg:max-w-[306px] lg:min-h-[287px]';

const LEFT_CARD_PLATE = cn(
  BASE_CARD_PLATE,
  'shadow-[0px_6px_16px_0px_rgba(220,203,142,0.25)] lg:shadow-[-6px_8px_24px_0px_rgba(220,203,142,0.38)]',
);

const RIGHT_CARD_PLATE = cn(
  BASE_CARD_PLATE,
  'shadow-[0px_6px_16px_0px_rgba(220,203,142,0.25)] lg:shadow-[6px_8px_24px_0px_rgba(220,203,142,0.38)]',
);

/**
 * The white fill. Its radius is 15px, not 20px — the 20px in the panel is the
 * OUTER corner, and a 5px stroke drawn inside it leaves a 15px inner corner.
 * Matching 20px here would leave a visible gold crescent at each corner.
 */
const CARD_FILL =
  'flex flex-1 flex-col rounded-[15px] bg-white ' +
  'shadow-[inset_0px_1px_2px_0px_rgba(255,255,255,0.20)] ' +
  'pt-[42px] pr-[34px] pb-[34px] pl-[34px]';

/**
 * Card contents. Extracted so the type scale exists once rather than twice —
 * the animated and reduced-motion branches previously carried duplicate copies
 * of every class string, which is how two "identical" cards drift apart.
 */
function StepCardContent({ title, body }: { title: string; body: string }) {
  return (
    <div className={CARD_FILL}>
      <h3 className="font-display mb-[28px] text-[18px] leading-[1.3] font-bold text-[#035551]">
        {title}
      </h3>
      <p className="text-[18px] leading-[1.5] font-normal tracking-[0] text-[rgba(35,35,35,0.82)]">
        {body}
      </p>
    </div>
  );
}

export function HowUltronWorks() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  /**
   * Which step the reader is currently on. Only that step's node carries the
   * white ring; the rest are bare gold.
   *
   * Deliberately NOT `once: true` like the reveals — this is a position
   * indicator, not an entrance, and it has to keep tracking. The cost is one
   * observer with a 10%-tall band across the middle of the viewport, so at most
   * one step qualifies at a time and a scroll produces two callbacks per step
   * rather than a stream.
   *
   * When no step is inside the band (between two of them) the last value stands,
   * which is what keeps the ring from flickering off in the gaps.
   */
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
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  /**
   * 0 when the visitor has asked for reduced motion.
   *
   * This governs the scroll-linked progress line ONLY. The step reveals need no
   * equivalent check — `globals.css` neutralises `[data-reveal]` under the same
   * media query, so they reduce in CSS rather than in a second code path here.
   */
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
        {/* Band head. One reveal for the three lines: they are set as a single
            centred block and arriving separately would read as three unrelated
            announcements. */}
        <Reveal className="text-center">
          <p
            className="font-display flex items-center justify-center gap-2.5 text-[16px] leading-none font-normal tracking-[0.08em] uppercase"
            style={{ color: '#C9B37E' }}
          >
            <span
              aria-hidden="true"
              className="inline-block h-px w-8 shrink-0"
              style={{ backgroundColor: '#C9B37E' }}
            />
            {PROCESS_INTRO.eyebrow}
          </p>
          <h2 className="font-display mt-3.5 text-[32px] leading-[100%] font-semibold tracking-[-0.02em] text-white sm:text-[40px] lg:text-[48px]">
            <HeadingText
              segments={PROCESS_INTRO.heading}
              accentClassName="text-white"
            />
          </h2>
        </Reveal>

        {/* Timeline Container with Scroll Progress Line */}
        <div ref={sectionRef} className="relative mt-10 sm:mt-14">
          {/*
            Static background spine.

            Centred with a negative margin rather than `-translate-x-1/2`. The
            progress line below is a `motion.div`, and Framer composes the whole
            `transform` from its own values — a Tailwind translate on the same
            element is silently overwritten the moment the animation starts, and
            the line would drift half its width off the spine. Margins and
            transforms do not compete, so both lines use margins and provably
            share one axis.
          */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-4 -ml-px w-[2px] bg-white/30 lg:left-1/2"
          />

          {/*
            The spine draws itself as the band passes, tied to scroll position
            rather than to a timer — the line is a progress indicator, and a
            progress indicator that runs ahead of the reader is decoration.

            This is the one scroll-linked animation on the site. It is bounded by
            the band's own passage through the viewport, and `useTransform`
            writes to a MotionValue rather than React state, so it repaints on
            the compositor without a single re-render.
          */}
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
            {PROCESS_STEPS.map((step, index) => {
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
                  {/*
                    Spine node.

                    Deliberately NOT revealed. The brief keeps the vertical
                    timeline fixed and animates only the content hung off it —
                    and that is also the honest behaviour, because the spine and
                    its nodes are the structure the cards are positioned
                    against. A dot that faded in after its own card would read as
                    the timeline being drawn twice.

                    It still has one moving part: the active-step ring, which
                    tracks the reader's position rather than announcing an
                    arrival. That is a `box-shadow`, not a `border` — a border
                    would either come out of the 16px box (leaving a 12px gold
                    core) or grow it (moving the dot off the spine), whereas a
                    shadow paints outside the box and costs no layout, so the
                    gold circle stays exactly 16px in both states.
                  */}
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
                    {/* Step Card with 5px Gradient Border & 20px Radius */}
                    <div
                      className={
                        isRight
                          ? 'lg:col-start-2 lg:flex lg:justify-start lg:pl-4'
                          : 'lg:col-start-1 lg:flex lg:justify-end lg:pr-4'
                      }
                    >
                      {/* Each step's card is its own reveal, triggered by its
                          own passage through the viewport — so the four steps
                          arrive at the reader's scrolling pace rather than as
                          one block when the band's top edge clears the fold. */}
                      <Reveal
                        className={isRight ? RIGHT_CARD_PLATE : LEFT_CARD_PLATE}
                        amount={0.25}
                      >
                        <StepCardContent title={step.title} body={step.body} />
                      </Reveal>
                    </div>

                    {/* Circular 3D Illustration Badge */}
                    <div
                      className={
                        isRight
                          ? 'mt-6 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex lg:justify-end lg:pr-4'
                          : 'mt-6 lg:col-start-2 lg:row-start-1 lg:mt-0 lg:flex lg:justify-start lg:pl-4'
                      }
                    >
                      {/*
                        The disc trails its own card by one stagger step, so the
                        pair arrives as a phrase rather than a chord — card,
                        then image, for each step in turn.
                      */}
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
