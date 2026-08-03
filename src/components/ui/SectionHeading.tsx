import type { HeadingSegment } from '@/types/content';
import { cn } from '@/lib/utils';

/**
 * The eyebrow / heading / body triplet that opens every band.
 *
 * The heading arrives as segments so the design's per-word colouring is data,
 * not markup. The emphasis colour is `brand-bright` — a green, not the gold.
 * Gold appears in exactly three places in this design (nav underline, timeline
 * markers, active footer link) and heading emphasis is not one of them.
 *
 * This file used to be `'use client'`. The only reason was a character-by-
 * character typewriter reveal on `HeadingText`, which is gone: headings animate
 * as whole blocks now, via a `Reveal` wrapper around them. Removing it took the
 * eyebrow, the heading and the body copy out of the client bundle and off the
 * hydration path, and it took an IntersectionObserver and a `setTimeout` per
 * character off the main thread.
 *
 * Typing effects are also a real accessibility cost that the reveal does not
 * have: the accessible name of a heading mutates on every tick, so a screen
 * reader can announce a partial word, and text that arrives one glyph at a time
 * cannot be read at the reader's own pace.
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
 * Coloured heading segments.
 *
 * Static, and deliberately so — headings reveal as one block via `Reveal`, not
 * one glyph at a time. Each segment is its own `<span>` only so an accented word
 * can take a different colour; the text itself is one continuous run, so it
 * wraps and is selected exactly as unmarked-up copy would be.
 */
export function HeadingText({
  segments,
  inverted = false,
  accentClassName,
}: {
  segments: readonly HeadingSegment[];
  inverted?: boolean;
  /**
   * Overrides the emphasis colour. The cream home-page bands set accented words
   * in the full brand teal (#035551), which is what the comp draws; the default
   * `brand-bright` is the lighter green used where the type is small enough to
   * need the extra separation from the ground. Both clear AA on cream.
   */
  accentClassName?: string;
}) {
  return (
    <>
      {segments.map((segment, index) => (
        <span
          key={`${segment.text}-${index}`}
          className={
            segment.accent
              ? (accentClassName ??
                (inverted ? 'text-accent' : 'text-brand-bright'))
              : undefined
          }
        >
          {segment.text}
        </span>
      ))}
    </>
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
