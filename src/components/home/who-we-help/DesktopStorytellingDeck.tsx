'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

import type { WhoWeHelpItem } from '@/content/who-we-help';
import { AudienceArtwork } from './AudienceArtwork';

interface DesktopStorytellingDeckProps {
  items: readonly WhoWeHelpItem[];
  eyebrow: string;
  heading: readonly { text: string; accent?: boolean }[];
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

export function DesktopStorytellingDeck({
  items,
  eyebrow,
  heading,
  body,
  ctaLabel,
  ctaHref,
}: DesktopStorytellingDeckProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalCards = items.length;

  const scrollToCard = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const targetScroll =
      containerTop +
      (index / (totalCards - 1)) * (containerHeight - window.innerHeight);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative h-[480vh] w-full">
      {/* Sticky Deck Wrapper */}
      <div className="sticky top-20 flex h-[calc(100vh-5rem)] min-h-[640px] flex-col justify-between py-6">
        {/* Top Header & Audience Counter */}
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-mono text-xs font-semibold tracking-widest text-[#035551] uppercase">
                {eyebrow}
              </span>
              <h2 className="font-display mt-1 text-2xl font-bold tracking-tight text-[#121a18] sm:text-3xl">
                {heading.map((segment, i) => (
                  <span
                    key={i}
                    className={segment.accent ? 'text-[#035551]' : ''}
                  >
                    {segment.text}
                  </span>
                ))}
              </h2>
            </div>

            {/* Audience Step Pills */}
            <div className="flex items-center gap-1.5 rounded-full border border-[#035551]/15 bg-white/80 p-1.5 shadow-sm backdrop-blur-md">
              {items.map((_, idx) => (
                <StepPill
                  key={idx}
                  index={idx}
                  total={totalCards}
                  scrollYProgress={scrollYProgress}
                  onClick={() => scrollToCard(idx)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Deck Cards Stack (Center Stage) */}
        <div className="relative mx-auto my-auto flex h-[480px] w-full max-w-5xl items-center justify-center px-4 sm:px-6">
          {items.map((item, idx) => (
            <DeckCard
              key={item.id}
              item={item}
              index={idx}
              total={totalCards}
              scrollYProgress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* Bottom Sub-Header Copy & CTA */}
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-3 border-t border-[#035551]/10 pt-4 text-center sm:flex-row sm:text-left">
            <p className="text-ink-muted max-w-xl text-sm">{body}</p>
            <a
              href={ctaHref}
              className="font-display inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#035551] uppercase hover:underline"
            >
              {ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Step Pill indicator reflecting active scroll progress */
function StepPill({
  index,
  total,
  scrollYProgress,
  onClick,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  onClick: () => void;
}) {
  const stepSize = 1 / total;
  const start = index * stepSize;
  const end = (index + 1) * stepSize;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + stepSize * 0.3, end - stepSize * 0.3, end],
    [0.4, 1, 1, 0.4],
  );
  const scale = useTransform(
    scrollYProgress,
    [start, start + stepSize * 0.3, end - stepSize * 0.3, end],
    [0.9, 1.1, 1.1, 0.9],
  );

  return (
    <button
      onClick={onClick}
      className="group relative flex h-7 items-center justify-center rounded-full px-2.5 transition-colors hover:bg-[#035551]/10"
      aria-label={`Go to client audience 0${index + 1}`}
    >
      <motion.span
        style={{ opacity, scale }}
        className="font-mono text-xs font-bold text-[#035551]"
      >
        0{index + 1}
      </motion.span>
    </button>
  );
}

/** Individual Pinned Card inside Desktop Deck */
function DeckCard({
  item,
  index,
  total,
  scrollYProgress,
  shouldReduceMotion,
}: {
  item: WhoWeHelpItem;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  shouldReduceMotion: boolean | null;
}) {
  const stepSize = 1 / total;
  const start = index * stepSize;
  const end = (index + 1) * stepSize;

  // Transform windows for enter, active, and exit
  // Enter: [start - stepSize*0.5, start]
  // Active: [start, end]
  // Exit: [end, end + stepSize*0.5]
  const opacity = useTransform(
    scrollYProgress,
    [start - stepSize * 0.6, start, end - stepSize * 0.2, end],
    index === 0
      ? [1, 1, 1, 0]
      : index === total - 1
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0],
  );

  const scale = useTransform(
    scrollYProgress,
    [start - stepSize * 0.6, start, end - stepSize * 0.2, end],
    shouldReduceMotion
      ? [1, 1, 1, 1]
      : index === 0
        ? [1, 1, 1, 0.94]
        : index === total - 1
          ? [0.96, 1, 1, 1]
          : [0.96, 1, 1, 0.94],
  );

  const y = useTransform(
    scrollYProgress,
    [start - stepSize * 0.6, start, end - stepSize * 0.2, end],
    shouldReduceMotion
      ? [0, 0, 0, 0]
      : index === 0
        ? [0, 0, 0, -20]
        : index === total - 1
          ? [40, 0, 0, 0]
          : [40, 0, 0, -20],
  );

  const rotate = useTransform(
    scrollYProgress,
    [start - stepSize * 0.6, start, end - stepSize * 0.2, end],
    shouldReduceMotion
      ? [0, 0, 0, 0]
      : index === 0
        ? [0, 0, 0, -2.5]
        : index === total - 1
          ? [2.5, 0, 0, 0]
          : [2.5, 0, 0, -2.5],
  );

  // Pointer events control so only the active card is clickable
  const pointerEvents = useTransform(scrollYProgress, (val: number) => {
    if (index === 0 && val <= end) return 'auto';
    if (index === total - 1 && val >= start) return 'auto';
    if (val >= start && val <= end) return 'auto';
    return 'none';
  });

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
        rotate,
        pointerEvents,
      }}
      className="absolute inset-0 flex h-full w-full items-center justify-center"
    >
      <div className="group grid h-full w-full grid-cols-12 overflow-hidden rounded-[28px] border border-[#035551]/15 bg-white p-7 shadow-[0_25px_60px_-15px_rgba(3,85,81,0.12),0_12px_24px_-10px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#035551]/30 hover:shadow-[0_30px_70px_-15px_rgba(3,85,81,0.18)] lg:p-9">
        {/* Left Content Side (7 Cols) */}
        <div className="col-span-12 flex flex-col justify-between pr-0 lg:col-span-7 lg:pr-8">
          <div>
            {/* Header Badge & Section Number */}
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#035551]/15 bg-[#035551]/5 px-3 py-1 font-mono text-[11px] font-bold tracking-wider text-[#035551] uppercase">
                {item.badge || 'CLIENT PROFILE'}
              </span>
              <span className="font-mono text-sm font-bold tracking-widest text-[#035551]/60">
                0{index + 1} / 0{total}
              </span>
            </div>

            {/* Audience Title */}
            <h3 className="font-display mb-3 text-2xl leading-tight font-bold tracking-tight text-[#121a18] sm:text-3xl lg:text-[2rem]">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-ink-muted mb-6 text-sm leading-relaxed sm:text-base lg:text-[1.05rem]">
              {item.description}
            </p>

            {/* Key Highlights */}
            {item.highlights && item.highlights.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {item.highlights.map((highlight, hIdx) => (
                  <div
                    key={hIdx}
                    className="flex items-center gap-1.5 rounded-lg border border-[#035551]/10 bg-[#FDFBEE] px-2.5 py-1 text-xs font-medium text-[#035551]"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#0aa79b]" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action CTA Button */}
          <div>
            <a
              href="#contact"
              className="font-display inline-flex items-center gap-2 rounded-xl bg-[#035551] px-5 py-2.5 text-xs font-bold tracking-wider text-white shadow-md transition-all duration-300 hover:translate-x-0.5 hover:bg-[#024440] hover:shadow-lg"
            >
              <span>Learn More</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Right Artwork Side (5 Cols) */}
        <div className="col-span-12 mt-6 hidden h-full items-center justify-center lg:col-span-5 lg:mt-0 lg:flex">
          <AudienceArtwork
            id={item.id}
            index={index}
            className="h-full min-h-[300px] w-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
