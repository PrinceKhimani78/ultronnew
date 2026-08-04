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

/**
 * The site's one card shadow, in three directions — defined in `globals.css`.
 *
 * Nothing here restates a colour, blur or offset. Five near-identical gold
 * values spread across five files is exactly how a shadow system stops matching
 * itself, which is the state this replaced.
 */
const SHADOW_CLASSES: Record<CardPosition, string> = {
  left: 'card-shadow-left',
  right: 'card-shadow-right',
  center: 'card-shadow-center',
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
