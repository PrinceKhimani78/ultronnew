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
    <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-8">
      {/* LEFT COLUMN: Vertical Navigation (25-30% width / 4 cols) */}
      <div
        role="tablist"
        aria-label="Our Core Services"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="hidden flex-col space-y-1.5 rounded-[20px] bg-[#FDFBEE] p-2 shadow-[0px_4px_12px_0px_rgba(220,203,142,0.25)] lg:col-span-4 lg:flex lg:shadow-[-6px_6px_16px_0px_rgba(220,203,142,0.35)]"
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
                'ease-house relative flex w-full items-center justify-center rounded-xl px-5 py-4 text-center text-sm font-medium transition-all duration-300',
                isActive
                  ? 'bg-[#035551] font-semibold text-white shadow-md'
                  : 'border-b border-[#035551]/10 bg-[#FDFBEE] text-[#035551] last:border-b-0 hover:bg-[#035551]/10',
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
              className="overflow-hidden rounded-[20px] bg-white shadow-[0px_4px_12px_0px_rgba(220,203,142,0.30)]"
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

      {/* RIGHT COLUMN: Premium Content Card (70-75% width / 8 cols) */}
      <div className="hidden lg:col-span-8 lg:block">
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
                'ease-house rounded-[20px] bg-white p-8 shadow-[0px_4px_12px_0px_rgba(220,203,142,0.25)] transition-all duration-300 lg:p-10 lg:shadow-[6px_6px_16px_0px_rgba(220,203,142,0.35)]',
                isActive
                  ? 'translate-y-0 opacity-100'
                  : 'hidden translate-y-2 opacity-0',
              )}
            >
              {/* Header Section */}
              <div className="border-b border-[#035551]/10 pb-6">
                <h3 className="font-display text-2xl font-bold text-[#035551] lg:text-3xl">
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

              {/* Lower Content Grid */}
              <div className="mt-8 grid items-center gap-8 md:grid-cols-12">
                {/* Left: 3D Brand Asset Illustration */}
                <div className="flex items-center justify-center p-2 md:col-span-5">
                  <Image
                    src={illustrationSrc}
                    alt={service.title}
                    width={320}
                    height={240}
                    className="h-auto w-full max-w-[260px] object-contain transition-transform duration-300 hover:scale-105"
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
