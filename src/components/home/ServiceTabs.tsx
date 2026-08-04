'use client';

import { Check, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useId, useRef, useState } from 'react';

import { SERVICES } from '@/content/services';
import { cn } from '@/lib/utils';

/**
 * 3D Illustrations mapped per service slug matching the Ultron brand 3D aesthetic.
 */
const SERVICE_ILLUSTRATIONS: Record<string, string> = {
  'business-banking': '/brand/process-consultation.webp',
  'business-setup': '/brand/process-execution.webp',
  'financial-advisory': '/brand/audience-entrepreneurs.webp',
  'tax-structuring-advisory': '/brand/audience-startups.webp',
  'business-finance': '/brand/process-strategy.webp',
  'real-estate-mortgages': '/brand/process-support.webp',
};

export function ServiceTabs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabId = (index: number) => `${baseId}-tab-${index}`;
  const panelId = (index: number) => `${baseId}-panel-${index}`;

  const focusTab = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = SERVICES.length - 1;
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
      {/* LEFT COLUMN: vertical tab list */}
      <div
        role="tablist"
        aria-label="Our Core Services"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        /*
          One bordered white plate with the tabs flush inside it, which is how
          the comp draws it. `overflow-hidden` is what lets the active tab paint
          its teal to the plate's edge and still be clipped by the radius, so no
          corner leaks past the border.

          The golden card shadow is deliberately NOT here: the comp gives this
          plate a hairline border and no drop shadow.
        */
        className="hidden flex-col overflow-hidden rounded-lg border border-[#035551]/30 bg-white lg:flex"
      >
        {SERVICES.map((service, index) => {
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
              onClick={() => setActiveIndex(index)}
              /*
                55px a row: the comp's list is 329 tall across six tabs. The
                divider is a `border-b` on every row but the last, so the rule
                sits between tabs and never doubles against the plate's own
                border.

                Only `colors` transition. Transitioning `all` would animate the
                border-colour change into a visible sweep as the active row
                moves, which is more motion than the comp implies.
              */
              className={cn(
                'ease-house relative flex h-[55px] w-full shrink-0 items-center justify-center px-4 text-center text-sm font-medium transition-colors duration-200',
                'border-b border-[#035551]/15 last:border-b-0',
                isActive
                  ? 'bg-[#035551] font-semibold text-white'
                  : 'bg-white text-[#035551] hover:bg-[#035551]/5',
              )}
            >
              <span>{service.title}</span>
            </button>
          );
        })}
      </div>

      {/* MOBILE ACCORDION (Visible on < lg screens) */}
      <div className="flex w-full flex-col space-y-4 lg:hidden">
        {SERVICES.map((service, index) => {
          const isActive = index === activeIndex;
          const formattedNumber = service.number.padStart(2, '0');
          const illustrationSrc =
            SERVICE_ILLUSTRATIONS[service.slug] ||
            '/brand/process-consultation.webp';

          return (
            <div
              key={service.slug}
              className="card-shadow-center overflow-hidden rounded-[20px] bg-white"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(isActive ? -1 : index)}
                aria-expanded={isActive}
                className={cn(
                  'flex w-full items-center justify-between p-4 text-left text-sm font-semibold transition-colors duration-200',
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
                    <h3 className="font-display text-lg font-bold text-[#035551]">
                      {service.tagline}
                    </h3>
                    <p className="text-ink-muted mt-2 text-xs leading-relaxed">
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
                    <p className="mb-3 text-xs font-semibold tracking-wider text-[#035551] uppercase">
                      Key Benefits
                    </p>
                    <ul className="space-y-2.5">
                      {service.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="text-ink flex items-start gap-2.5 text-xs"
                        >
                          <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#035551]/10 text-[#035551]">
                            <Check className="h-2.5 w-2.5" />
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
      </div>

      {/* RIGHT COLUMN: the content card */}
      <div className="hidden lg:block lg:h-full">
        {SERVICES.map((service, index) => {
          const isActive = index === activeIndex;
          const formattedNumber = service.number.padStart(2, '0');
          const illustrationSrc =
            SERVICE_ILLUSTRATIONS[service.slug] ||
            '/brand/process-consultation.webp';

          return (
            <div
              key={service.slug}
              role="tabpanel"
              id={panelId(index)}
              aria-labelledby={tabId(index)}
              hidden={!isActive}
              tabIndex={0}
              /*
                The comp's card: white, a hairline teal border, a 16px radius
                and no drop shadow. The golden `card-shadow-right` this used to
                carry is gone — the comp does not draw one here, and the brief
                is explicit that this card takes no extra styling.

                `h-full` makes it fill the 454px the section reserves, so the
                card's height is the design's rather than whatever its longest
                service body happens to measure.

                ⚠️ `overflow-y-auto`, NOT `overflow-hidden`. The comp's frame is
                drawn with Financial Advisory, whose copy fits 454px with about
                20px to spare. Business Banking is longer — a 199-character
                description and a 105-character benefit against 134 and 59 —
                and runs roughly 20px past the frame. `hidden` would silently
                cut the last benefit off; `auto` keeps every word reachable and
                engages on that one service only. The fix is to trim that copy,
                not to widen the box: see the note in the section component.
              */
              className={cn(
                'ease-house h-full flex-col overflow-y-auto rounded-2xl border border-[#035551]/15 bg-white p-8 transition-opacity duration-300',
                isActive ? 'flex opacity-100' : 'hidden opacity-0',
              )}
            >
              {/* Header Section */}
              <div className="shrink-0 border-b border-[#035551]/10 pb-6">
                {/* 20px, the comp's size — it was 24px rising to 30px at `lg`,
                    which pushed the card past the frame's 454px. */}
                <h3 className="font-display text-[20px] leading-tight font-bold text-[#035551]">
                  <span>{formattedNumber}. </span>
                  <span>{service.headline}</span>
                </h3>
                <p className="font-display text-ink mt-3 text-base font-semibold">
                  {service.tagline}
                </p>
                <p className="text-ink-muted mt-2 max-w-2xl text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Lower Content Grid.

                  `min-h-0` and `flex-1`: this row takes the card's remaining
                  height and is allowed to shrink inside it. Without `min-h-0` a
                  flex child refuses to go below its content size and the
                  illustration would push the card past the frame's 454px. */}
              <div className="mt-8 grid min-h-0 flex-1 items-center gap-8 md:grid-cols-12">
                {/* Left: 3D Brand Asset Illustration */}
                <div className="flex h-full min-h-0 items-center justify-center p-2 md:col-span-5">
                  <Image
                    src={illustrationSrc}
                    alt={service.title}
                    width={320}
                    height={240}
                    className="h-auto max-h-full w-full max-w-[260px] object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Right: Key Benefits List */}
                <div className="md:col-span-7">
                  <h4 className="font-display mb-4 text-xs font-bold tracking-wider text-[#035551] uppercase">
                    Key Benefits
                  </h4>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="text-ink flex items-start gap-3 text-sm font-medium"
                      >
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#035551]/10 text-[#035551]">
                          <Check className="h-3 w-3" />
                        </span>
                        <span className="leading-snug">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
