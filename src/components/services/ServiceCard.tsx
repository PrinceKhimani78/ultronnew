'use client';

import { ArrowUpRight, Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useId, useState } from 'react';

import { SERVICES_PAGE } from '@/content/services-page';
import type { Service } from '@/content/services';
import { cn } from '@/lib/utils';

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div
      className={cn(
        'flex h-full flex-col rounded-[20px] border border-[#035551]/10 p-6 sm:p-8',
        'bg-[conic-gradient(from_180deg_at_50%_50%,#FDFBEE_0deg,#FFFFFF_160deg,#FDFBEE_320deg,#FDFBEE_360deg)]',
        'shadow-[inset_4px_-4px_4px_0px_rgba(3,85,81,0.25)]',
        'ease-house transition-all duration-300 hover:-translate-y-1 hover:shadow-[inset_4px_-4px_8px_0px_rgba(3,85,81,0.3)]',
      )}
    >
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

      <div className="mt-auto flex items-center justify-between gap-4 pt-6">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className={cn(
            'text-brand group flex items-center gap-2',
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
                isOpen && 'rotate-180',
              )}
            />
          </span>
        </button>

        <Link
          href={`/services/${service.slug}`}
          className={cn(
            'text-brand-bright hover:text-brand group flex items-center gap-1.5',
            'text-xs font-semibold tracking-[0.1em] uppercase transition-colors',
          )}
        >
          Full Details
          <ChevronRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
