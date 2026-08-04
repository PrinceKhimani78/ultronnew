'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import type { Service } from '@/content/services';
import { cn } from '@/lib/utils';

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div
      className={cn(
        'flex h-full min-h-[247px] w-full flex-col justify-between rounded-[20px] p-6 sm:p-8 lg:max-w-[461px]',
        'bg-[conic-gradient(from_180deg_at_50%_50%,#FDFBEE_0deg,#FFFFFF_160deg,#FDFBEE_320deg,#FDFBEE_360deg)]',
        'ease-house transition-all duration-300 hover:-translate-y-1',
      )}
      style={{
        boxShadow: 'inset 4px -4px 4px 0px rgba(3, 85, 81, 0.25)',
      }}
    >
      <div>
        <h3 className="font-display text-[20px] leading-tight font-bold text-black">
          {service.headline}
        </h3>

        <p className="mt-3 text-[15px] leading-relaxed text-[#5A5A5A]">
          {service.description}
        </p>
      </div>

      {/* Bottom CTA block: Full Detail link */}
      <div className="mt-6 pt-2">
        <Link
          href={`/services/${service.slug}`}
          className="group inline-flex items-center gap-2.5 transition-colors"
        >
          <span className="font-display text-[15px] leading-none font-semibold text-[#035551] underline decoration-[#035551] underline-offset-4">
            Full Detail
          </span>
          <span
            aria-hidden="true"
            className="ease-house flex h-6 w-6 items-center justify-center rounded-full bg-[#035551] text-white transition-transform duration-200 group-hover:translate-x-1"
          >
            <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />
          </span>
        </Link>
      </div>
    </div>
  );
}
