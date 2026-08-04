import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import type { WhoWeHelpItem } from '@/content/who-we-help';
import { cn } from '@/lib/utils';

/**
 * One bento card, with the comp's chrome: a 20px radius on white, a hairline
 * teal edge, and an inset shadow biased down-left so the card reads as lifted
 * off the cream rather than merely outlined.
 *
 * The reveal lives on a WRAPPER, not on the card. The entrance animates a
 * `transform`, and so does `hover:-translate-y-1.5` — putting both on one
 * element is how the hover lift silently stopped working, because whichever
 * declaration wins the cascade owns the whole property. Splitting them lets the
 * entrance and the hover state each own a transform without a fight.
 */

type CardPosition = 'left' | 'right' | 'center';

const BASE_CARD_CLASS =
  'flex flex-1 flex-col rounded-[20px] bg-white p-5 sm:p-6 lg:p-7 transition-all duration-[250ms] ease-out hover:-translate-y-1.5';

const SHADOW_CLASSES: Record<CardPosition, string> = {
  left: 'shadow-[0px_4px_12px_0px_rgba(220,203,142,0.25)] sm:shadow-[-6px_6px_16px_0px_rgba(220,203,142,0.35)] hover:shadow-[-8px_8px_24px_0px_rgba(220,203,142,0.45)]',
  right:
    'shadow-[0px_4px_12px_0px_rgba(220,203,142,0.25)] sm:shadow-[6px_6px_16px_0px_rgba(220,203,142,0.35)] hover:shadow-[8px_8px_24px_0px_rgba(220,203,142,0.45)]',
  center:
    'shadow-[0px_4px_16px_0px_rgba(220,203,142,0.30)] hover:shadow-[0px_6px_24px_0px_rgba(220,203,142,0.40)]',
};

type WhoWeHelpCardProps = {
  item: WhoWeHelpItem;
  /** Position in the bento, 0-based. Drives the stagger delay. */
  index: number;
  /** Position of the card in the layout for directional shadow. */
  position?: CardPosition;
  /** Grid placement for this card's slot. Applied to the wrapper. */
  className?: string;
};

export function WhoWeHelpCard({
  item,
  index,
  position = 'left',
  className,
}: WhoWeHelpCardProps) {
  return (
    <Reveal
      delay={index * STAGGER_MS}
      className={cn('flex', className)}
      // The wrapper IS the grid cell, so it is often much taller than it is
      // wide and the default 20% threshold can leave the last card in a tall
      // column waiting. A tenth of a card is unambiguously on screen.
      amount={0.1}
    >
      <div className={cn(BASE_CARD_CLASS, SHADOW_CLASSES[position])}>
        <h3 className="mb-3 text-[18px] leading-tight font-semibold text-black sm:text-[20px]">
          {item.title}
        </h3>
        <p className="text-[16px] leading-[1.6] font-normal text-[#5A5A5A]">
          {item.description}
        </p>
      </div>
    </Reveal>
  );
}
