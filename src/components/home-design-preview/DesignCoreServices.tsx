import {
  Landmark,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Coins,
  Home,
  ArrowUpRight,
} from 'lucide-react';
import { DesignContainer } from './DesignBand';

const SERVICES_DATA = [
  {
    title: 'Business Bank Account Opening',
    description:
      'Corporate and individual account opening across every nationality and activity type, including profiles already declined elsewhere. We find out why a bank said no, then fix that before we file again.',
    Icon: Landmark,
  },
  {
    title: 'Business Setup',
    description:
      'Mainland, free zone and offshore company formation across the UAE, built around how you plan to bank and operate, not just how you plan to register.',
    Icon: Briefcase,
  },
  {
    title: 'Financial Advisory',
    description:
      'Strategic guidance across banking, financing and structuring decisions, built on an honest assessment before recommendations are made.',
    Icon: TrendingUp,
  },
  {
    title: 'Tax Structuring Advisory',
    description:
      'UAE VAT and Corporate Tax advisory that translates regulation into practical action and exposure reduction.',
    Icon: ShieldCheck,
  },
  {
    title: 'Business Finance',
    description:
      'Business finance and lender matching based on institutions that genuinely suit your profile.',
    Icon: Coins,
  },
  {
    title: 'Real Estate Mortgages',
    description:
      'Mortgage advisory for residents and non-residents, including stalled and complex equity cases.',
    Icon: Home,
  },
] as const;

/**
 * Core Services section for `/home-design-preview`.
 * Redesigned to match reference spec:
 * - Dark teal section background
 * - Top-left "CORE SERVICES" label with outlined circle icon
 * - "Six Disciplines. One Standard." main heading
 * - 6 cards in a 4-top / 2-bottom left-aligned grid
 * - Dark teal cards with glowing icon, title, description, divider, EXPLORE link and circular arrow button
 */
export function DesignCoreServices() {
  return (
    <section
      id="design-services"
      className="overflow-hidden bg-[#035551] py-16 sm:py-20 lg:py-24"
      aria-labelledby="design-services-heading"
    >
      <DesignContainer>
        {/* Upper-left section label */}
        <div className="mb-10 lg:mb-12">
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-white uppercase">
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 rounded-full border border-white/80"
            />
            <span>CORE SERVICES</span>
          </div>
          <h2
            id="design-services-heading"
            className="mt-3 text-[32px] leading-tight font-bold tracking-tight text-white sm:text-[42px] lg:text-[48px] lg:whitespace-nowrap"
          >
            Six Disciplines. One Standard.
          </h2>
        </div>

        {/* 6-Card Grid Layout (4 cards top row, 2 cards bottom row aligned left) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES_DATA.map((service) => {
            const { Icon } = service;
            return (
              <a
                key={service.title}
                href="#design-contact"
                className="group flex h-full flex-col justify-between rounded-[16px] border border-white/12 bg-[#023c39] p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-300/40 hover:shadow-[0_15px_35px_rgba(0,0,0,0.3)]"
              >
                <div>
                  {/* Glowing Icon */}
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-emerald-300 shadow-[0_0_15px_rgba(10,167,155,0.35)] ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Title */}
                  <h3 className="mb-2.5 text-[20px] leading-snug font-bold text-white">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-[14px] leading-relaxed font-normal text-white/75">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Divider & Action Link */}
                <div className="mt-auto flex items-center justify-between border-t border-white/12 pt-4">
                  <span className="text-[12px] font-bold tracking-[0.12em] text-white uppercase transition-colors duration-200 group-hover:text-emerald-300">
                    EXPLORE
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-200 group-hover:border-emerald-300 group-hover:bg-emerald-300 group-hover:text-[#023c39]"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </DesignContainer>
    </section>
  );
}
