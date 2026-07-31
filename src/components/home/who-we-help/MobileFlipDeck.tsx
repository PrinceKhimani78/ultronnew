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

interface MobileFlipDeckProps {
  items: readonly WhoWeHelpItem[];
  eyebrow: string;
  heading: readonly { text: string; accent?: boolean }[];
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

export function MobileFlipDeck({
  items,
  eyebrow,
  heading,
  body,
  ctaLabel,
  ctaHref,
}: MobileFlipDeckProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const totalCards = items.length;

  return (
    <div ref={containerRef} className="relative h-[420vh] w-full">
      {/* Sticky Mobile Viewport */}
      <div className="sticky top-20 flex h-[calc(100vh-5rem)] flex-col justify-between py-4">
        {/* Mobile Header & Progress Indicator */}
        <div className="px-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] font-semibold tracking-widest text-[#035551] uppercase">
                {eyebrow}
              </span>
              <h2 className="font-display text-xl font-bold tracking-tight text-[#121a18]">
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

            {/* Pagination Chip */}
            <div className="flex items-center rounded-full border border-[#035551]/20 bg-white/90 px-3 py-1 font-mono text-xs font-bold text-[#035551] shadow-xs backdrop-blur-md">
              <ActiveCounter
                itemsCount={totalCards}
                scrollYProgress={scrollYProgress}
              />
            </div>
          </div>
        </div>

        {/* 3D Flip Deck Stage */}
        <div className="relative mx-auto my-auto flex h-[490px] w-full max-w-md items-center justify-center px-4 [perspective:1000px]">
          {items.map((item, idx) => (
            <MobileFlipCard
              key={item.id}
              item={item}
              index={idx}
              total={totalCards}
              scrollYProgress={scrollYProgress}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* Bottom Navigation & CTA */}
        <div className="px-4 text-center">
          <p className="text-ink-muted mb-2 line-clamp-1 text-xs">{body}</p>
          <a
            href={ctaHref}
            className="font-display inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#035551] uppercase"
          >
            {ctaLabel} <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

/** Active Step Counter for Mobile */
function ActiveCounter({
  itemsCount,
  scrollYProgress,
}: {
  itemsCount: number;
  scrollYProgress: MotionValue<number>;
}) {
  const currentStep = useTransform(scrollYProgress, (val: number) => {
    const idx = Math.min(Math.floor(val * itemsCount), itemsCount - 1);
    return `0${idx + 1} / 0${itemsCount}`;
  });

  return <motion.span>{currentStep}</motion.span>;
}

/** Helper to ensure WAAPI keyframes start at 0, end at 1, and are strictly monotonic */
function sanitizeKeyframes(inputs: number[], outputs: number[]) {
  const cleanInputs: number[] = [];
  const cleanOutputs: number[] = [];

  if (inputs[0] > 0) {
    cleanInputs.push(0);
    cleanOutputs.push(outputs[0]);
  }

  for (let i = 0; i < inputs.length; i++) {
    const currInput = Math.max(0, Math.min(1, inputs[i]));
    const prevInput =
      cleanInputs.length > 0 ? cleanInputs[cleanInputs.length - 1] : -1;

    if (currInput > prevInput + 0.0001) {
      cleanInputs.push(currInput);
      cleanOutputs.push(outputs[i]);
    }
  }

  if (cleanInputs[cleanInputs.length - 1] < 1) {
    cleanInputs.push(1);
    cleanOutputs.push(outputs[outputs.length - 1]);
  }

  return { inputs: cleanInputs, outputs: cleanOutputs };
}

/** Individual Mobile 3D Flipping Card */
function MobileFlipCard({
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

  let rawInputs: number[];
  let opacityOutputs: number[];
  let scaleOutputs: number[];
  let yOutputs: number[];
  let rotateXOutputs: number[];

  if (index === 0) {
    rawInputs = [0, Math.max(0, end - stepSize * 0.2), end];
    opacityOutputs = [1, 1, 0];
    scaleOutputs = shouldReduceMotion ? [1, 1, 1] : [1, 1, 0.92];
    yOutputs = shouldReduceMotion ? [0, 0, 0] : [0, 0, -30];
    rotateXOutputs = shouldReduceMotion ? [0, 0, 0] : [0, 0, -45];
  } else if (index === total - 1) {
    rawInputs = [Math.max(0, start - stepSize * 0.5), start, 1];
    opacityOutputs = [0, 1, 1];
    scaleOutputs = shouldReduceMotion ? [1, 1, 1] : [0.92, 1, 1];
    yOutputs = shouldReduceMotion ? [0, 0, 0] : [40, 0, 0];
    rotateXOutputs = shouldReduceMotion ? [0, 0, 0] : [45, 0, 0];
  } else {
    rawInputs = [
      Math.max(0, start - stepSize * 0.5),
      start,
      Math.max(start, end - stepSize * 0.2),
      Math.min(1, end),
    ];
    opacityOutputs = [0, 1, 1, 0];
    scaleOutputs = shouldReduceMotion ? [1, 1, 1, 1] : [0.92, 1, 1, 0.92];
    yOutputs = shouldReduceMotion ? [0, 0, 0, 0] : [40, 0, 0, -30];
    rotateXOutputs = shouldReduceMotion ? [0, 0, 0, 0] : [45, 0, 0, -45];
  }

  const rotateXFrames = sanitizeKeyframes(rawInputs, rotateXOutputs);
  const opacityFrames = sanitizeKeyframes(rawInputs, opacityOutputs);
  const scaleFrames = sanitizeKeyframes(rawInputs, scaleOutputs);
  const yFrames = sanitizeKeyframes(rawInputs, yOutputs);

  const rotateX = useTransform(
    scrollYProgress,
    rotateXFrames.inputs,
    rotateXFrames.outputs,
  );
  const opacity = useTransform(
    scrollYProgress,
    opacityFrames.inputs,
    opacityFrames.outputs,
  );
  const scale = useTransform(
    scrollYProgress,
    scaleFrames.inputs,
    scaleFrames.outputs,
  );
  const y = useTransform(scrollYProgress, yFrames.inputs, yFrames.outputs);

  const pointerEvents = useTransform(scrollYProgress, (val: number) => {
    if (index === 0 && val <= end) return 'auto';
    if (index === total - 1 && val >= start) return 'auto';
    if (val >= start && val <= end) return 'auto';
    return 'none';
  });

  return (
    <motion.div
      style={{
        rotateX,
        opacity,
        scale,
        y,
        pointerEvents,
        transformStyle: 'preserve-3d',
      }}
      className="absolute inset-0 flex h-full w-full items-center justify-center"
    >
      <div className="flex h-full w-full flex-col justify-between overflow-hidden rounded-[24px] border border-[#035551]/15 bg-white p-5 shadow-[0_20px_50px_-15px_rgba(3,85,81,0.15)]">
        <div>
          {/* Top Badge & ID */}
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-full border border-[#035551]/15 bg-[#035551]/5 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#035551] uppercase">
              {item.badge || 'PROFILE'}
            </span>
            <span className="font-mono text-xs font-bold text-[#035551]/50">
              0{index + 1}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display mb-2 text-xl leading-snug font-bold tracking-tight text-[#121a18]">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-ink-muted mb-3 line-clamp-3 text-xs leading-relaxed">
            {item.description}
          </p>

          {/* Key Highlights Pills */}
          {item.highlights && item.highlights.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {item.highlights.slice(0, 2).map((highlight, hIdx) => (
                <div
                  key={hIdx}
                  className="flex items-center gap-1 rounded-md border border-[#035551]/10 bg-[#FDFBEE] px-2 py-0.5 text-[10px] font-medium text-[#035551]"
                >
                  <CheckCircle2 className="h-3 w-3 text-[#0aa79b]" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Middle Artwork */}
        <div className="my-2 h-[150px] w-full overflow-hidden rounded-xl">
          <AudienceArtwork
            id={item.id}
            index={index}
            className="h-full w-full"
          />
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <a
            href="#contact"
            className="font-display flex w-full items-center justify-center gap-2 rounded-xl bg-[#035551] py-2.5 text-xs font-bold tracking-wider text-white shadow-sm"
          >
            <span>Learn More</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
