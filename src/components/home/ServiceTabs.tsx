'use client';

import { Check } from 'lucide-react';
import { useId, useRef, useState } from 'react';

import { SERVICES } from '@/content/services';
import { cn } from '@/lib/utils';

/**
 * The Core Services tabbed interface.
 *
 * Hand-rolled to the WAI-ARIA tabs pattern because Radix Tabs is not installed
 * and the brief forbids adding dependencies. That makes the keyboard contract
 * this component's responsibility:
 *
 *   - roving tabindex — exactly one tab is in the tab order at a time, so Tab
 *     moves past the whole list rather than through six stops
 *   - Up/Down arrows move between tabs (the list is vertical from `lg`), and
 *     Left/Right are accepted too since it is horizontal on small screens
 *   - Home/End jump to the ends, and the selection wraps
 *
 * **Every panel is rendered**, with inactive ones carrying `hidden`. Mounting
 * only the selected panel would leave five of the six services out of the HTML
 * entirely — the opposite of what the GEO strategy in PROJECT.md needs, since
 * the service descriptions are the most citable content on the page.
 */
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
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div
        role="tablist"
        aria-label="Core services"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="flex gap-3 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
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
              // Roving tabindex: only the selected tab is a tab stop.
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              className={cn(
                'ease-house shrink-0 rounded-xl border px-5 py-4 text-left text-sm font-medium transition-colors duration-200',
                'lg:w-full',
                isActive
                  ? 'bg-brand border-brand text-surface'
                  : 'border-line text-ink hover:border-brand/30 hover:bg-brand/5 bg-surface-raised',
              )}
            >
              {service.title}
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-8">
        {SERVICES.map((service, index) => (
          <div
            key={service.slug}
            role="tabpanel"
            id={panelId(index)}
            aria-labelledby={tabId(index)}
            hidden={index !== activeIndex}
            // Panels hold headings and lists, not controls, so they are given a
            // tab stop of their own to be reachable and scrollable by keyboard.
            tabIndex={0}
            className="border-line bg-surface-raised rounded-2xl border p-6 sm:p-8"
          >
            <h3 className="font-display text-xl font-semibold tracking-tight">
              <span className="text-ink-muted mr-1 font-normal">
                {service.number}.
              </span>
              {service.title}
            </h3>

            <p className="text-ink mt-5 text-sm font-semibold">
              {service.tagline}
            </p>
            <p className="text-ink-muted mt-3 text-sm leading-relaxed">
              {service.description}
            </p>

            <p className="text-ink-muted mt-7 text-xs font-medium tracking-[0.16em] uppercase">
              Key benefits
            </p>
            <ul className="mt-4 space-y-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-sm">
                  <Check
                    aria-hidden="true"
                    className="text-brand-bright mt-0.5 h-4 w-4 shrink-0"
                  />
                  <span className="text-ink">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
