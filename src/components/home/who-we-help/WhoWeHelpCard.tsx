'use client';

import { motion } from 'framer-motion';

import type { WhoWeHelpItem } from '@/content/who-we-help';
import { cn } from '@/lib/utils';

type WhoWeHelpCardProps = {
  item: WhoWeHelpItem;
  index: number;
  className?: string;
};

export function WhoWeHelpCard({ item, index, className }: WhoWeHelpCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        'group flex flex-col justify-between rounded-[20px] bg-white p-6 sm:p-7 lg:p-8',
        'border border-[#035551]/12',
        'shadow-[0_10px_30px_-10px_rgba(3,85,81,0.06)]',
        'ease-house transition-all duration-300 hover:-translate-y-1 hover:border-[#035551]/25 hover:shadow-[0_20px_45px_-12px_rgba(3,85,81,0.14)]',
        className,
      )}
    >
      <div>
        <h3 className="font-display mb-3 text-lg font-bold tracking-tight text-[#035551] sm:text-xl lg:text-2xl">
          {item.title}
        </h3>
        <p className="text-ink-muted mb-6 text-xs leading-relaxed sm:text-sm lg:text-base">
          {item.description}
        </p>
      </div>

      {/* Inline Financial Graphic inside Card */}
      <div className="border-[#035551]/08 mt-4 border-t pt-4">
        <CardFinancialGraphic id={item.id} />
      </div>
    </motion.div>
  );
}

/** Render specific bar chart / financial graphic inside each card */
function CardFinancialGraphic({ id }: { id: string }) {
  switch (id) {
    case 'uae-smes-operating-businesses':
      return <SmeBarChartGraphic />;
    case 'high-net-worth':
      return <FamilyOfficeGraphic />;
    case 'foreign-investors':
      return <FoundersGraphic />;
    case 'smes-growing-businesses':
      return <InvestorsRadarGraphic />;
    case 'startups-founders':
      return <RealEstateBarGraphic />;
    case 'global-companies':
      return <GlobalNetworkGraphic />;
    default:
      return <SmeBarChartGraphic />;
  }
}

/** 1. SME Bar Chart Graphic */
function SmeBarChartGraphic() {
  return (
    <div className="bg-[#035551]/04 flex items-center justify-between rounded-xl border border-[#035551]/10 p-3.5">
      <div className="flex flex-col">
        <span className="font-mono text-[10px] font-bold text-[#035551] uppercase">
          ACCOUNT & CREDIT CLEARANCE
        </span>
        <span className="mt-0.5 font-mono text-xs font-bold text-emerald-700">
          +28.4% Revenue Unlocked ▲
        </span>
      </div>
      {/* Financial Bar Chart */}
      <div className="flex h-9 items-end gap-1.5">
        <div className="h-3 w-2.5 rounded-t bg-[#035551]/20" />
        <div className="h-5 w-2.5 rounded-t bg-[#035551]/35" />
        <div className="h-7 w-2.5 rounded-t bg-[#035551]/50" />
        <div className="h-9 w-2.5 rounded-t bg-[#0aa79b]" />
      </div>
    </div>
  );
}

/** 2. Family Office Multi-Entity Structure Graphic */
function FamilyOfficeGraphic() {
  return (
    <div className="bg-[#035551]/04 flex items-center justify-between rounded-xl border border-[#035551]/10 p-3.5">
      <div className="flex flex-col">
        <span className="font-mono text-[10px] font-bold text-[#035551] uppercase">
          CROSS-BORDER STRUCTURE
        </span>
        <span className="mt-0.5 font-mono text-xs font-bold text-[#035551]">
          Scrutiny Defended ✓
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 rounded border border-[#035551]/15 bg-white px-2 py-0.5 font-mono text-[9px] font-semibold text-[#035551]">
          <span>HOLDCO L1</span>
        </div>
        <div className="flex items-center gap-1.5 rounded border border-[#0aa79b]/30 bg-[#0aa79b]/15 px-2 py-0.5 font-mono text-[9px] font-semibold text-[#035551]">
          <span>TRUST L2</span>
        </div>
      </div>
    </div>
  );
}

/** 3. Founders & Entrepreneurs Bankable Structure */
function FoundersGraphic() {
  return (
    <div className="bg-[#035551]/04 flex items-center justify-between rounded-xl border border-[#035551]/10 p-3.5">
      <div className="flex flex-col">
        <span className="font-mono text-[10px] font-bold text-[#035551] uppercase">
          UAE BANKING APPROVAL
        </span>
        <span className="mt-0.5 font-mono text-xs font-bold text-emerald-700">
          Fast-Track Approved
        </span>
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#0aa79b]/30 bg-gradient-to-br from-[#0aa79b] to-[#035551] text-white shadow-xs">
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>
  );
}

/** 4. Investor Compliance & Portfolio Balance */
function InvestorsRadarGraphic() {
  return (
    <div className="bg-[#035551]/04 flex items-center justify-between rounded-xl border border-[#035551]/10 p-3.5">
      <div className="flex flex-col">
        <span className="font-mono text-[10px] font-bold text-[#035551] uppercase">
          MULTI-ASSET COMPLIANCE
        </span>
        <span className="mt-0.5 font-mono text-xs font-bold text-[#035551]">
          AML & Source Verified
        </span>
      </div>
      <div className="flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[11px] font-bold text-emerald-700">
        <span>100%</span>
      </div>
    </div>
  );
}

/** 5. Real Estate Valuation & Mortgage Chart */
function RealEstateBarGraphic() {
  return (
    <div className="bg-[#035551]/04 flex items-center justify-between rounded-xl border border-[#035551]/10 p-3.5">
      <div className="flex flex-col">
        <span className="font-mono text-[10px] font-bold text-[#035551] uppercase">
          MORTGAGE INCOME PROFILING
        </span>
        <span className="mt-0.5 font-mono text-xs font-bold text-emerald-700">
          Lender Realignment Complete
        </span>
      </div>
      {/* Valuation Chart */}
      <div className="flex h-7 items-end gap-1">
        <div className="h-3 w-2 rounded-t bg-[#035551]/20" />
        <div className="h-5 w-2 rounded-t bg-[#035551]/40" />
        <div className="h-7 w-2 rounded-t bg-[#0aa79b]" />
      </div>
    </div>
  );
}

/** 6. Global Expansion Gateway */
function GlobalNetworkGraphic() {
  return (
    <div className="bg-[#035551]/04 flex items-center justify-between rounded-xl border border-[#035551]/10 p-3.5">
      <div className="flex flex-col">
        <span className="font-mono text-[10px] font-bold text-[#035551] uppercase">
          UAE MARKET ENTRY
        </span>
        <span className="mt-0.5 font-mono text-xs font-bold text-[#035551]">
          Turnkey Corporate Setup
        </span>
      </div>
      <div className="flex items-center gap-1 rounded-md border border-[#035551]/20 bg-white px-2 py-1 font-mono text-[10px] font-bold text-[#035551]">
        <span>GLOBAL ➔ UAE</span>
      </div>
    </div>
  );
}
