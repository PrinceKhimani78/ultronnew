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

type WhoWeHelpCardProps = {
  item: WhoWeHelpItem;
  /** Position in the bento, 0-based. Drives default stagger delay if delay is not explicitly passed. */
  index: number;
  /** Position of the card in the layout for directional shadow. */
  position?: CardPosition;
  /** Grid placement for this card's slot. Applied to the wrapper. */
  className?: string;
  /** Animate.css entrance animation class string. */
  animationClass?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
  /** Animation duration (defaults to 0.7s). */
  duration?: number | string;
};

export function WhoWeHelpCard({
  item,
  index,
  className,
  animationClass,
  delay,
  duration = '0.7s',
}: WhoWeHelpCardProps) {
  const computedDelay = delay !== undefined ? delay : index * STAGGER_MS;

  const isTargetCard = [
    'international-entrepreneurs',
    'high-net-worth',
    'foreign-investors',
    'smes-growing-businesses',
    'global-companies',
  ].includes(item.id);

  const cardClass = cn(
    'group flex flex-1 flex-col rounded-[20px] bg-white p-5 sm:p-6 lg:p-7 border border-transparent shadow-[inset_4px_-4px_4px_0px_rgba(3,85,81,0.25)]',
    isTargetCard
      ? 'transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:-translate-y-2.5 hover:scale-[1.015] hover:bg-[#035551] hover:shadow-[0_20px_35px_-10px_rgba(3,85,81,0.25)]'
      : 'transition-all duration-[250ms] ease-out hover:-translate-y-1.5',
  );

  return (
    <Reveal
      delay={computedDelay}
      animationClass={animationClass}
      duration={duration}
      className={cn('flex', className)}
      // The wrapper IS the grid cell, so it is often much taller than it is
      // wide and the default 20% threshold can leave the last card in a tall
      // column waiting. A tenth of a card is unambiguously on screen.
      amount={0.1}
    >
      <div className={cardClass}>
        <h3
          className={cn(
            'mb-3 text-[18px] leading-tight font-semibold text-black transition-colors duration-300 sm:text-[20px]',
            isTargetCard && 'group-hover:text-[#DCCB8E]',
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            'text-[16px] leading-[1.6] font-normal text-[#5A5A5A] transition-colors duration-300',
            isTargetCard && 'group-hover:text-white/90',
          )}
        >
          {item.description}
        </p>
      </div>
    </Reveal>
  );
}
