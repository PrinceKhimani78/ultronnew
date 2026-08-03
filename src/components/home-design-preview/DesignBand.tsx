import type { ReactNode } from 'react';

import { Container } from '@/components/layout/Container';
import {
  ActionButton,
  type ActionButtonProps,
} from '@/components/ui/ActionButton';
import { BandEyebrow } from '@/components/ui/BandEyebrow';

/**
 * Primitives for `/home-design-preview`.
 *
 * These were originally standalone copies, isolated from the site's tokens so
 * the reference page could not be disturbed by a palette change. That isolation
 * is now the wrong trade: this page is the design source of truth for the live
 * home page, and two implementations of the same button are two things that
 * drift apart. Each one below is a thin alias over the shared primitive that
 * `/` also renders, so "identical" is enforced by the module graph rather than
 * by a promise in a comment.
 *
 * The colour constants stay exported — several preview sections use them for
 * grounds and rules, and they are the comp's literal values.
 */

export const DESIGN_INK = '#000000';
export const DESIGN_BRAND = '#035551';
export const DESIGN_CREAM = '#FDFBEE';
export const DESIGN_GOLD = '#C9B37E';
export const DESIGN_SAND = '#DCCB8E';
export const DESIGN_MUTED = '#5A5A5A';

type Segment = { readonly text: string; readonly tone: 'ink' | 'brand' };

/** The comp's measure, which is now the site's measure. */
export function DesignContainer({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <Container width="wide" className={className}>
      {children}
    </Container>
  );
}

export function DesignEyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <BandEyebrow className={className}>{children}</BandEyebrow>;
}

/**
 * Two-tone heading. The comp colours individual words, not whole headings.
 *
 * Kept local rather than shared: the live site stores heading emphasis as a
 * boolean `accent` flag on each segment, this page stores it as a `tone` string.
 * They are the same idea in two shapes, and the preview's shape is the one its
 * transcribed `content.ts` is written in.
 */
export function DesignHeadingText({
  segments,
  brandColor = DESIGN_BRAND,
  inkColor = DESIGN_INK,
}: {
  segments: readonly Segment[];
  brandColor?: string;
  inkColor?: string;
}) {
  return (
    <>
      {segments.map((segment, index) => (
        <span
          key={index}
          style={{ color: segment.tone === 'brand' ? brandColor : inkColor }}
        >
          {segment.text}
        </span>
      ))}
    </>
  );
}

export function DesignButton(props: ActionButtonProps) {
  return <ActionButton {...props} />;
}
