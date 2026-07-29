'use client';

import { ArrowUpRight, Check } from 'lucide-react';
import { useId, useState } from 'react';

import { Card } from '@/components/ui/Card';
import { SERVICES_PAGE } from '@/content/services-page';
import type { Service } from '@/content/services';
import { cn } from '@/lib/utils';

/**
 * One service, with its key benefits behind a disclosure.
 *
 * A disclosure rather than an accordion: the design shows a single card expanded
 * while its neighbours stay closed, and each card is independent — there is no
 * "only one open at a time" rule to enforce, which is the only thing an
 * accordion adds over a plain button.
 *
 * The benefits list is **always in the DOM**, hidden with the `hidden`
 * attribute rather than unmounted. Mounting it only when open would keep every
 * service's substance out of the HTML until a visitor clicked, and those lists
 * are the most citable content on the page — the opposite of what the GEO
 * strategy in PROJECT.md needs. `hidden` also removes it from the accessibility
 * tree while closed, so nothing is announced twice.
 */

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <Card variant="raised" interactive className="flex h-full flex-col">
      <h3 className="font-display text-base font-semibold tracking-tight">
        {service.headline}
      </h3>

      <p className="text-ink-muted mt-3 text-sm leading-relaxed">
        {service.description}
      </p>

      <div
        id={panelId}
        hidden={!isOpen}
        className="border-line mt-6 border-t pt-6"
      >
        <p className="text-ink-muted text-[0.7rem] font-medium tracking-[0.16em] uppercase">
          {SERVICES_PAGE.card.benefitsLabel}
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

      {/* `mt-auto` pins the control to the bottom so a short card and a tall one
          still line their controls up across a row. */}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={cn(
          'text-brand group mt-auto flex items-center gap-2 pt-6',
          'text-xs font-semibold tracking-[0.1em] uppercase',
          'ease-house hover:text-brand-bright transition-colors',
        )}
      >
        {isOpen
          ? SERVICES_PAGE.card.collapseLabel
          : SERVICES_PAGE.card.expandLabel}
        <span
          aria-hidden="true"
          className="bg-brand text-surface ease-house inline-flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5"
        >
          <ArrowUpRight
            className={cn(
              'ease-house h-3.5 w-3.5 transition-transform duration-200',
              // Points down-left when open, so the icon reads as "collapse".
              isOpen && 'rotate-180',
            )}
          />
        </span>
      </button>
    </Card>
  );
}
