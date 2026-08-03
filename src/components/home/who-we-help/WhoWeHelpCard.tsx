'use client';

import { motion } from 'framer-motion';

import {
  STAGGER,
  TRANSFORM_PERSPECTIVE,
  VIEWPORT,
  revealVariants,
  type RevealDirection,
} from '@/components/motion/config';
import { useMotionScale } from '@/components/motion/useMotionScale';
import type { WhoWeHelpItem } from '@/content/who-we-help';
import { cn } from '@/lib/utils';

/**
 * One bento card, with the comp's chrome: a 20px radius on white, a hairline
 * teal edge, and an inset shadow biased down-left so the card reads as lifted
 * off the cream rather than merely outlined.
 *
 * The reveal lives on a WRAPPER, not on the card. Framer Motion writes an inline
 * `transform` while it animates, and an inline transform beats a Tailwind
 * `hover:-translate-y-*` class every time — putting both on one element is how
 * the hover lift silently stopped working. Splitting them lets the entrance
 * animation and the hover state each own a transform without a fight.
 */

const CARD_CLASS = [
  'flex flex-1 flex-col rounded-[20px] bg-white p-5 sm:p-6 lg:p-7',
  'border border-[rgba(3,85,81,0.08)]',
  'shadow-[inset_4px_-4px_4px_0px_rgba(3,85,81,0.25)]',
  'transition-all duration-[250ms] ease-out',
  'hover:-translate-y-1.5 hover:border-[#035551] hover:shadow-[inset_4px_-4px_6px_0px_rgba(3,85,81,0.35),0_18px_40px_rgba(3,85,81,0.14)]',
].join(' ');

type WhoWeHelpCardProps = {
  item: WhoWeHelpItem;
  /** Position in the bento, 0-based. Drives the stagger delay. */
  index: number;
  /** Which edge the card enters from. The bento's left/middle/right tracks. */
  direction?: RevealDirection;
  /** Grid placement for this card's slot. Applied to the wrapper. */
  className?: string;
};

export function WhoWeHelpCard({
  item,
  index,
  direction = 'up',
  className,
}: WhoWeHelpCardProps) {
  const scale = useMotionScale();

  return (
    <motion.div
      data-reveal=""
      // Not `Reveal`: this needs the outer wrapper to be the grid cell AND to
      // stay a plain flex box for the hover split below, so it drives the shared
      // variants directly rather than through the wrapper component.
      variants={revealVariants({
        kind: 'card',
        direction,
        scale,
        delay: index * STAGGER.tight,
      })}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      style={{ transformPerspective: TRANSFORM_PERSPECTIVE }}
      className={cn('flex', className)}
    >
      <div className={CARD_CLASS}>
        <h3 className="mb-3 text-[18px] leading-tight font-semibold text-black sm:text-[20px]">
          {item.title}
        </h3>
        <p className="text-[16px] leading-[1.6] font-normal text-[#5A5A5A]">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
