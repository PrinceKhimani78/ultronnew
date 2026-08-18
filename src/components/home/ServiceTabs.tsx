'use client';

import { Check, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useId, useRef, useState } from 'react';

import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { useReveal } from '@/components/motion/useReveal';
import { SERVICES } from '@/content/services';
import { cn } from '@/lib/utils';

/**
 * 3D Illustrations mapped per service slug matching the Ultron brand 3D aesthetic.
 */
const SERVICE_ILLUSTRATIONS: Record<string, string> = {
  'business-banking': '/brand/process-consultation.webp',
  'business-setup': '/brand/process-execution.webp',
  'trade-finance': '/brand/audience-entrepreneurs.webp',
  'compliance-regulatory-advisory': '/brand/audience-startups.webp',
  'business-finance': '/brand/process-strategy.webp',
  'real-estate-mortgages': '/brand/process-support.webp',
};

/**
 * How far into the viewport the tab list / content card must sit before
 * their entrance plays — matched across both so they read as one arrival
 * rather than two independently-timed ones. See `CoreServices.tsx` for the
 * heading's identical threshold.
 */
const ENTRANCE_AMOUNT = 0.22;

/** Item 4's delay: after the card's own 250ms delay + 700ms animation. */
const ILLUSTRATION_DELAY_MS = 950;
/** Item 5's base delay: after the illustration's 500ms animation. */
const BENEFITS_BASE_DELAY_MS = ILLUSTRATION_DELAY_MS + 500;
/** Item 5's per-item stagger. */
const BENEFIT_STAGGER_MS = 80;

export function ServiceTabs() {
  const visibleServices = SERVICES.filter((s) => s.isVisible !== false);
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  /**
   * Bumped on every tab change and never reset. Two things read it: whether
   * it is above zero at all (`hasSwitched`, below) decides which animation
   * the desktop card gives its active panel — see there for why — and its
   * exact value keys that panel's content wrapper so revisiting an
   * already-seen tab still remounts (and replays) the crossfade rather than
   * a `key` that keeps its old value, and therefore never remounts, because
   * the tab's own index hasn't changed since last time.
   *
   * State, not a ref: both reads happen during render, and a ref's
   * `current` is only safe to read in an event handler or an effect.
   */
  const [switchGeneration, setSwitchGeneration] = useState(0);
  const hasSwitched = switchGeneration > 0;

  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = (index: number) => `${baseId}-panel-${index}`;

  const selectTab = (index: number) => {
    setSwitchGeneration((generation) => generation + 1);
    setActiveIndex(index);
  };

  const focusTab = (index: number) => {
    selectTab(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = visibleServices.length - 1;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        focusTab(activeIndex === last ? 0 : activeIndex + 1);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        focusTab(activeIndex === 0 ? last : activeIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTab(0);
        break;
      case 'End':
        event.preventDefault();
        focusTab(last);
        break;
      default:
        break;
    }
  };

  /**
   * The tab list and the card each watch their own entry into the viewport
   * — two calls to the hook `Reveal` itself is built on, used directly here
   * (rather than the `Reveal` component) because both elements carry
   * attributes — `role`/`aria-*`/`onKeyDown` on the list, a plain
   * full-height block for the card — that `Reveal` has nowhere to forward.
   * Wrapping either one in an extra div would make that div, not the real
   * element, the grid's actual column, changing the very layout this task
   * must not touch.
   */
  const { ref: tabListRef, revealed: tabListRevealed } =
    useReveal<HTMLDivElement>(ENTRANCE_AMOUNT);
  const { ref: cardGroupRef, revealed: cardGroupRevealed } =
    useReveal<HTMLDivElement>(ENTRANCE_AMOUNT);

  return (
    /*
      The comp's own split, as percentages of the content measure: the tab list
      is 278 of 1099, the gutter 41, the card 780. Percentages rather than the
      raw pixels because the site's container is 1152 wide at a 1280 viewport
      where the comp's frame allows 1099 — the proportions are the design, the
      absolute widths were only ever true of the comp's own gutters.

      `lg:h-full` hands the 454px the section reserves down to the card.
    */
    <div className="grid items-start gap-8 lg:h-full lg:grid-cols-[25.3%_minmax(0,1fr)] lg:gap-x-[3.7%]">
      {/* LEFT COLUMN: vertical tab list — item 2 of the entrance: the
          complete container animates as one unit, never the tabs
          individually. */}
      <div
        ref={tabListRef}
        data-reveal=""
        data-revealed={tabListRevealed ? '' : undefined}
        role="tablist"
        aria-label="Our Core Services"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className={cn(
          'hidden flex-col overflow-hidden rounded-[20px] border border-[#035551] bg-white lg:flex',
          tabListRevealed && 'core-services-tabs-animation',
        )}
        style={tabListRevealed ? { animationDelay: '150ms' } : undefined}
      >
        {visibleServices.map((service, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={service.slug}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={tabId(index)}
              aria-selected={isActive}
              aria-controls={panelId(index)}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTab(index)}
              className={cn(
                'group relative flex h-[55px] w-full shrink-0 items-center justify-center px-4 text-center text-[18px] font-semibold',
                'border-b border-[#035551]/15 last:border-b-0',
                'transition-[color,background-color,transform] duration-[240ms] ease-out',
                isActive
                  ? 'bg-[#035551] text-white'
                  : 'bg-white text-[#035551] hover:translate-x-[5px] hover:bg-[rgba(3,85,81,0.055)]',
              )}
            >
              {!isActive && (
                <span className="absolute top-0 bottom-0 left-0 w-[4px] origin-center scale-y-0 bg-[#035551] transition-transform duration-[240ms] ease-out group-hover:scale-y-100" />
              )}
              <span>{service.title}</span>
            </button>
          );
        })}
      </div>

      {/* MOBILE ACCORDION (Visible on < lg screens) — unchanged from the
          site's shared entrance; the brief's new choreography is a desktop
          concept (a left tab list, a right card) this layout doesn't have. */}
      <Reveal
        as="div"
        delay={STAGGER_MS}
        amount={0.1}
        className="flex w-full flex-col space-y-4 lg:hidden"
      >
        {visibleServices.map((service, index) => {
          const isActive = index === activeIndex;
          const formattedNumber = service.number.padStart(2, '0');
          const illustrationSrc =
            SERVICE_ILLUSTRATIONS[service.slug] ||
            '/brand/process-consultation.webp';

          return (
            <div
              key={service.slug}
              className="overflow-hidden rounded-[20px] border border-[#035551] bg-white"
            >
              <button
                type="button"
                onClick={() => selectTab(isActive ? -1 : index)}
                aria-expanded={isActive}
                className={cn(
                  'flex w-full items-center justify-between p-4 text-left text-[18px] font-semibold transition-colors duration-[250ms]',
                  isActive
                    ? 'bg-[#035551] text-white'
                    : 'bg-[#FDFBEE] text-[#035551]',
                )}
              >
                <span>
                  {formattedNumber}. {service.title}
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    isActive && 'rotate-180 text-white',
                  )}
                />
              </button>

              {isActive && (
                <div className="space-y-5 bg-white p-5">
                  <div>
                    <h3 className="heading-h3 text-[#035551]">
                      {formattedNumber}. {service.title}
                    </h3>
                    <h4 className="font-display mt-2 text-[16px] font-bold text-black">
                      {service.headline}
                    </h4>
                    <p className="mt-2 text-[16px] leading-relaxed text-[#5A5A5A]">
                      {service.description}
                    </p>
                  </div>

                  <div className="my-4 flex justify-center">
                    <Image
                      src={illustrationSrc}
                      alt={service.title}
                      width={240}
                      height={180}
                      className="h-auto max-w-[200px] object-contain"
                    />
                  </div>

                  <div>
                    <p className="mb-3 text-[16px] font-bold tracking-wider text-[#A0A0A0] uppercase">
                      KEY BENEFITS
                    </p>
                    <ul className="space-y-2.5">
                      {service.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-start gap-2.5 text-[16px] leading-snug font-medium text-[#232323]"
                        >
                          <span className="mt-0.5 inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#035551]/10 text-[#035551]">
                            <Check className="h-3 w-3" />
                          </span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </Reveal>

      {/* RIGHT COLUMN: the content card — item 3 of the entrance: the
          complete outer card animates as one unit. */}
      <div
        ref={cardGroupRef}
        data-reveal=""
        data-revealed={cardGroupRevealed ? '' : undefined}
        className={cn(
          'hidden lg:block lg:h-full',
          cardGroupRevealed && 'core-services-card-animation',
        )}
        style={cardGroupRevealed ? { animationDelay: '250ms' } : undefined}
      >
        {visibleServices.map((service, index) => {
          const isActive = index === activeIndex;
          const formattedNumber = service.number.padStart(2, '0');
          const illustrationSrc =
            SERVICE_ILLUSTRATIONS[service.slug] ||
            '/brand/process-consultation.webp';

          /**
           * Two mutually-exclusive animation states for whichever panel is
           * active — never both, and the slow one plays at most once per
           * panel, ever:
           *
           *  - `showInitialEntrance` (items 4 & 5): this is still the
           *    page's first paint of the default tab, *and* the card has
           *    actually scrolled into view. Gating on `cardGroupRevealed`
           *    rather than just "mounted" is what stops the illustration/
           *    benefit keyframes from quietly finishing off-screen while
           *    the section is still below the fold — a CSS `animation`
           *    keeps running while its element sits at `opacity: 0`, it
           *    just does so invisibly.
           *  - `isSwitchedActive`: any tab activated by a click or
           *    keypress, including a first-ever one before the card has
           *    scrolled into view. Keyed on `switchGeneration` so
           *    returning to a tab replays the crossfade rather than only
           *    ever playing once.
           */
          const showInitialEntrance =
            isActive && !hasSwitched && cardGroupRevealed;
          const isSwitchedActive = isActive && hasSwitched;

          return (
            <div
              key={service.slug}
              role="tabpanel"
              id={panelId(index)}
              aria-labelledby={tabId(index)}
              hidden={!isActive}
              tabIndex={0}
              className={cn(
                'ease-house h-full flex-col overflow-y-auto rounded-[20px] border border-[#035551] bg-white p-8 shadow-[4px_4px_8px_2px_rgba(3,85,81,0.25)] transition-opacity duration-300',
                isActive ? 'flex opacity-100' : 'hidden opacity-0',
              )}
            >
              {/* One wrapper around the whole panel body, keyed so it
                  remounts — replaying `core-services-content-enter` — every
                  time this panel is switched into view by click/keyboard.
                  Heading, description, illustration and benefits animate
                  together as this single block, exactly once per switch;
                  the per-item delays below only ever apply during the
                  separate, non-keyed initial entrance. */}
              <div
                key={isSwitchedActive ? `switch-${switchGeneration}` : 'static'}
                className={cn(
                  'flex h-full min-h-0 flex-col',
                  isSwitchedActive && 'core-services-content-enter',
                )}
              >
                {/* Header Section */}
                <div className="shrink-0 pb-4">
                  <h3 className="heading-h3 text-[#035551]">
                    <span>{formattedNumber}. </span>
                    <span>{service.title}</span>
                  </h3>
                  <h4 className="font-display mt-3.5 text-[18px] leading-snug font-bold text-black">
                    {service.headline}
                  </h4>
                  <p className="mt-2 text-[16px] leading-[1.6] font-normal text-[#5A5A5A]">
                    {service.description}
                  </p>
                </div>

                {/* Lower Content Grid */}
                <div className="mt-4 grid min-h-0 flex-1 items-center gap-6 md:grid-cols-12 lg:mt-6">
                  {/* Left: 3D Brand Asset Illustration — item 4 */}
                  <div className="flex h-full min-h-0 items-center justify-center p-2 md:col-span-5">
                    <Image
                      src={illustrationSrc}
                      alt={service.title}
                      width={320}
                      height={240}
                      className={cn(
                        'h-auto max-h-full w-full max-w-[240px] object-contain transition-transform duration-300 hover:scale-105',
                        (showInitialEntrance || isSwitchedActive) &&
                          'core-services-illustration',
                      )}
                      style={
                        showInitialEntrance
                          ? { animationDelay: `${ILLUSTRATION_DELAY_MS}ms` }
                          : isSwitchedActive
                            ? { animationDelay: '50ms' }
                            : undefined
                      }
                    />
                  </div>

                  {/* Right: Key Benefits List — item 5, one by one */}
                  <div className="md:col-span-7">
                    <h5 className="font-display mb-3 text-[16px] font-bold tracking-[0.08em] text-[#A0A0A0] uppercase">
                      KEY BENEFITS
                    </h5>
                    <ul className="space-y-2.5">
                      {service.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={benefit}
                          className={cn(
                            'flex items-start gap-2.5 text-[16px] leading-snug font-medium text-[#232323]',
                            (showInitialEntrance || isSwitchedActive) &&
                              'core-services-benefit',
                          )}
                          style={
                            showInitialEntrance
                              ? {
                                  animationDelay: `${BENEFITS_BASE_DELAY_MS + benefitIndex * BENEFIT_STAGGER_MS}ms`,
                                }
                              : isSwitchedActive
                                ? {
                                    animationDelay: `${50 + benefitIndex * 50}ms`,
                                  }
                                : undefined
                          }
                        >
                          <span className="mt-0.5 inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#035551]/10 text-[#035551]">
                            <Check className="h-3 w-3" />
                          </span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
