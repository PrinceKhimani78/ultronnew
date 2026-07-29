'use client';

import { useEffect, useRef, useState } from 'react';

import type { HeadingSegment } from '@/types/content';
import { cn } from '@/lib/utils';

/**
 * The eyebrow / heading / body triplet that opens every band.
 *
 * The heading arrives as segments so the design's per-word colouring is data,
 * not markup. The emphasis colour is `brand-bright` — a green, not the gold.
 * Gold appears in exactly three places in this design (nav underline, timeline
 * markers, active footer link) and heading emphasis is not one of them.
 */

type SectionHeadingProps = {
  eyebrow?: string;
  heading: readonly HeadingSegment[];
  body?: string;
  /** Rendered heading level. Never `h1` — the hero owns that. */
  as?: 'h2' | 'h3';
  align?: 'left' | 'center';
  /** Inverted palette, for use inside a brand-toned band. */
  inverted?: boolean;
  className?: string;
  children?: React.ReactNode;
};

/** The short rule the design draws before every eyebrow. */
function EyebrowRule({ inverted }: { inverted: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'h-px w-6 shrink-0',
        inverted ? 'bg-surface/50' : 'bg-brand-bright',
      )}
    />
  );
}

export function Eyebrow({
  children,
  inverted = false,
  align = 'left',
}: {
  children: React.ReactNode;
  inverted?: boolean;
  align?: 'left' | 'center';
}) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-xs font-medium tracking-[0.2em] uppercase',
        align === 'center' && 'justify-center',
        inverted ? 'text-surface/70' : 'text-brand-bright',
      )}
    >
      <EyebrowRule inverted={inverted} />
      {children}
    </p>
  );
}

/**
 * Renders coloured heading segments with a character-by-character typewriter reveal.
 */
export function HeadingText({
  segments,
  inverted = false,
  speed = 30,
}: {
  segments: readonly HeadingSegment[];
  inverted?: boolean;
  speed?: number;
}) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [revealedLength, setRevealedLength] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const fullText = segments.map((s) => s.text).join('');
  const totalLength = fullText.length;

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      requestAnimationFrame(() => {
        setIsReducedMotion(true);
        setRevealedLength(totalLength);
      });
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [totalLength]);

  useEffect(() => {
    if (!hasStarted || isReducedMotion) return;
    if (revealedLength >= totalLength) return;

    const timer = setTimeout(() => {
      setRevealedLength((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [hasStarted, isReducedMotion, revealedLength, totalLength, speed]);

  const isTypingActive =
    hasStarted && !isReducedMotion && revealedLength < totalLength;
  const currentRevealed = isReducedMotion ? totalLength : revealedLength;

  return (
    <span ref={containerRef} className="relative inline-block">
      {segments.map((segment, index) => {
        const startOffset = segments
          .slice(0, index)
          .reduce((acc, s) => acc + s.text.length, 0);
        const segLen = segment.text.length;
        const visibleInSeg = Math.max(
          0,
          Math.min(segLen, currentRevealed - startOffset),
        );

        if (visibleInSeg <= 0) return null;

        const visibleText = segment.text.slice(0, visibleInSeg);

        return (
          <span
            key={`${segment.text}-${index}`}
            className={
              segment.accent
                ? inverted
                  ? 'text-accent'
                  : 'text-brand-bright'
                : undefined
            }
          >
            {visibleText}
          </span>
        );
      })}

      {/* Blinking typewriter cursor at active position */}
      {isTypingActive && (
        <span
          aria-hidden="true"
          className="bg-brand-bright ml-0.5 inline-block h-[0.75em] w-[3px] animate-pulse align-baseline"
        />
      )}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  heading,
  body,
  as: Heading = 'h2',
  align = 'left',
  inverted = false,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === 'center' && 'mx-auto max-w-2xl text-center',
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow inverted={inverted} align={align}>
          {eyebrow}
        </Eyebrow>
      ) : null}

      <Heading
        className={cn(
          'font-display mt-4 text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.15] font-semibold tracking-[-0.02em]',
          inverted ? 'text-surface' : 'text-ink',
        )}
      >
        <HeadingText segments={heading} inverted={inverted} />
      </Heading>

      {body ? (
        <p
          className={cn(
            'mt-5 leading-relaxed',
            align === 'left' && 'max-w-2xl',
            inverted ? 'text-surface/80' : 'text-ink-muted',
          )}
        >
          {body}
        </p>
      ) : null}

      {children}
    </div>
  );
}
