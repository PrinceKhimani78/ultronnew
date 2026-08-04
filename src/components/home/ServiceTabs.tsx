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
        className="hidden flex-col overflow-hidden rounded-[20px] border border-[#035551] bg-white shadow-[4px_4px_8px_2px_rgba(3,85,81,0.25)] lg:flex"
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
              className={cn(
                'ease-house relative flex h-[55px] w-full shrink-0 items-center justify-center px-4 text-center text-[18px] font-semibold transition-colors duration-200',
                'border-b border-[#035551]/15 last:border-b-0',
                isActive
                  ? 'bg-[#035551] text-white'
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
              className="overflow-hidden rounded-[20px] border border-[#035551] bg-white shadow-[4px_4px_8px_2px_rgba(3,85,81,0.25)]"
            >
              <button
                type="button"
                onClick={() => setActiveIndex(isActive ? -1 : index)}
                aria-expanded={isActive}
                className={cn(
                  'flex w-full items-center justify-between p-4 text-left text-[18px] font-semibold transition-colors duration-200',
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
                    <h3 className="font-display text-[22px] font-bold text-[#035551]">
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
              className={cn(
                'ease-house h-full flex-col overflow-y-auto rounded-[20px] border border-[#035551] bg-white p-8 shadow-[4px_4px_8px_2px_rgba(3,85,81,0.25)] transition-opacity duration-300',
                isActive ? 'flex opacity-100' : 'hidden opacity-0',
              )}
            >
              {/* Header Section */}
              <div className="shrink-0 pb-4">
                <h3 className="font-display text-[22px] leading-tight font-bold text-[#035551]">
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
                {/* Left: 3D Brand Asset Illustration */}
                <div className="flex h-full min-h-0 items-center justify-center p-2 md:col-span-5">
                  <Image
                    src={illustrationSrc}
                    alt={service.title}
                    width={320}
                    height={240}
                    className="h-auto max-h-full w-full max-w-[240px] object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Right: Key Benefits List */}
                <div className="md:col-span-7">
                  <h5 className="font-display mb-3 text-[16px] font-bold tracking-[0.08em] text-[#A0A0A0] uppercase">
                    KEY BENEFITS
                  </h5>
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
            </div>
          );
        })}
      </div>
    </div>
  );
}
