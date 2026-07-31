'use client';

import { motion } from 'framer-motion';
import {
  Building2,
  CheckCircle2,
  Globe2,
  Layers,
  LineChart,
  Lock,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

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
      viewport={{ amount: 0.2 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        'group flex h-auto flex-col justify-start rounded-[20px] bg-white p-5 sm:p-6 lg:p-7',
        'border border-[#035551]/12',
        'shadow-[0_10px_30px_-10px_rgba(3,85,81,0.06)]',
        'ease-house transition-all duration-300',
        'hover:-translate-y-1.5 hover:border-[#C9B37E]/60 hover:shadow-[0_20px_45px_-12px_rgba(3,85,81,0.12)]',
        className,
      )}
    >
      {/* Title & Description Container */}
      <div className="flex h-auto flex-col">
        <h3 className="font-display mb-2 text-lg font-bold tracking-tight text-[#035551] sm:text-xl lg:text-2xl">
          {item.title}
        </h3>
        <p className="text-ink-muted text-xs leading-relaxed sm:text-sm lg:text-[0.95rem]">
          {item.description}
        </p>
      </div>

      {/* Divider + Visualization Container (Compact 20px Top Spacing) */}
      <div className="mt-5 border-t border-[#035551]/10 pt-3.5">
        <CardFinancialGraphic id={item.id} />
      </div>
    </motion.div>
  );
}

/** Router for rendering the specific animated SVG visualization per card */
function CardFinancialGraphic({ id }: { id: string }) {
  switch (id) {
    case 'uae-smes-operating-businesses':
      return <SmeBarChartVisualization />;
    case 'high-net-worth':
      return <FamilyOfficeHierarchyVisualization />;
    case 'foreign-investors':
      return <FoundersTimelineVisualization />;
    case 'smes-growing-businesses':
      return <InvestorRadarVisualization />;
    case 'startups-founders':
      return <RealEstateValuationVisualization />;
    case 'global-companies':
      return <GlobalNetworkVisualization />;
    default:
      return <SmeBarChartVisualization />;
  }
}

/**
 * CARD 1: UAE SMEs & Operating Businesses
 * Animated 5-Bar Revenue Growth Chart + Sparkline & Banking Approval Badge
 */
function SmeBarChartVisualization() {
  const bars = [30, 48, 65, 82, 100];

  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-[#035551]/12 bg-[#FDFBEE] p-3 backdrop-blur-xs transition-colors group-hover:border-[#C9B37E]/40 sm:p-3.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-[#035551]" />
          <span className="font-mono text-[11px] font-bold text-[#035551] uppercase">
            REVENUE UNLOCKED
          </span>
        </div>
        <div className="flex items-center gap-1.5 rounded-md border border-emerald-600/20 bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-600" />
          <span>APPROVED ✓</span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2 pt-0.5">
        <div className="flex flex-col">
          <span className="font-mono text-base font-bold text-[#121a18] sm:text-lg">
            +$2.8M
          </span>
          <span className="font-mono text-[10px] font-medium text-emerald-700">
            +28.4% Flow ▲
          </span>
        </div>

        {/* 5-Bar Chart with SVG Sparkline Curve */}
        <div className="relative flex h-10 w-28 items-end gap-1.5">
          {bars.map((height, i) => (
            <div
              key={i}
              className="relative flex h-full w-3.5 flex-col justify-end"
            >
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ amount: 0.5 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  'w-full rounded-t-sm transition-colors',
                  i === bars.length - 1
                    ? 'bg-gradient-to-t from-[#035551] to-[#0aa79b]'
                    : 'bg-[#035551]/25 group-hover:bg-[#035551]/40',
                )}
              />
            </div>
          ))}

          {/* SVG Sparkline Curve Overlay */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            <motion.path
              d="M 2 28 Q 20 20, 40 14 T 80 6 T 104 2"
              fill="none"
              stroke="#C9B37E"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
            <circle
              cx="104"
              cy="2"
              r="3"
              fill="#C9B37E"
              className="animate-ping"
            />
            <circle cx="104" cy="2" r="3" fill="#C9B37E" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * CARD 2: Family Offices & Multi-Entity Groups
 * Compact Hierarchy Diagram sitting naturally 20px below description
 */
function FamilyOfficeHierarchyVisualization() {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-[#035551]/12 bg-[#FDFBEE] p-3 transition-colors group-hover:border-[#C9B37E]/40 sm:p-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-[#035551]" />
          <span className="font-mono text-[11px] font-bold text-[#035551] uppercase">
            JURISDICTION HIERARCHY
          </span>
        </div>
        <span className="font-mono text-[10px] font-bold text-[#C9B37E]">
          DEFENDED ✓
        </span>
      </div>

      {/* Visual Hierarchy Diagram */}
      <div className="relative flex flex-col items-center gap-1.5 pt-0.5">
        {/* Tier 1: HoldCo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-1.5 rounded-lg border border-[#035551]/20 bg-white px-3 py-1 font-mono text-[10px] font-bold text-[#035551] shadow-2xs"
        >
          <Building2 className="h-3 w-3 text-[#C9B37E]" />
          <span>ULTIMATE HOLDCO (ADGM)</span>
        </motion.div>

        {/* Connecting SVG Dotted Lines */}
        <svg
          className="h-3 w-32 stroke-[#035551]/30"
          fill="none"
          viewBox="0 0 120 12"
        >
          <path
            d="M 60 0 V 6 H 20 V 12 M 60 6 H 100 V 12"
            strokeDasharray="3 3"
            strokeWidth="1.5"
          />
        </svg>

        {/* Tier 2: Dual Subsidiaries */}
        <div className="flex w-full items-center justify-between gap-2">
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-1 items-center justify-center gap-1 rounded-md border border-[#0aa79b]/30 bg-[#0aa79b]/10 px-2 py-1 font-mono text-[9px] font-semibold text-[#035551]"
          >
            <ShieldCheck className="h-3 w-3 text-[#0aa79b]" />
            <span>FAMILY TRUST</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 4 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-1 items-center justify-center gap-1 rounded-md border border-[#C9B37E]/40 bg-[#C9B37E]/10 px-2 py-1 font-mono text-[9px] font-semibold text-[#035551]"
          >
            <Lock className="h-3 w-3 text-[#C9B37E]" />
            <span>OPERCO (DIFC)</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/**
 * CARD 3: Founders & Entrepreneurs
 * Perfectly Aligned 4-Step Progress Tracker with Center Line Precision
 */
function FoundersTimelineVisualization() {
  const steps = [
    { label: 'Structure', status: 'completed' },
    { label: 'Compliance', status: 'completed' },
    { label: 'KYC', status: 'completed' },
    { label: 'Active', status: 'current' },
  ] as const;

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#035551]/12 bg-[#FDFBEE] p-3 transition-colors group-hover:border-[#C9B37E]/40 sm:p-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#035551]" />
          <span className="font-mono text-[11px] font-bold text-[#035551] uppercase">
            UAE BANKING FAST-TRACK
          </span>
        </div>
        <span className="font-mono text-[10px] font-bold text-emerald-700">
          100% APPROVAL
        </span>
      </div>

      {/* Progress Tracker Widget */}
      <div className="relative pt-1 pb-1">
        {/* Step Nodes Grid with Equal Spacing */}
        <div className="relative z-10 grid grid-cols-4 items-center">
          {/* Continuous Center Connecting Line - Aligned exactly through circle midpoints */}
          <div className="absolute top-[12px] right-6 left-6 h-[2px] -translate-y-1/2 bg-[#035551]/15">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-[#035551] via-[#0aa79b] to-[#C9B37E]"
            />
          </div>

          {steps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';

            return (
              <div key={idx} className="flex flex-col items-center">
                {/* Numbered Step Circle */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.35, delay: idx * 0.15 }}
                  className={cn(
                    'relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold shadow-2xs transition-transform',
                    isCurrent
                      ? 'border-2 border-[#C9B37E] bg-[#C9B37E] text-white ring-2 ring-[#C9B37E]/30'
                      : isCompleted
                        ? 'bg-[#035551] text-white'
                        : 'bg-slate-200 text-slate-500',
                  )}
                >
                  {idx + 1}
                </motion.div>

                {/* Step Label */}
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.3, delay: idx * 0.15 + 0.1 }}
                  className={cn(
                    'mt-1.5 text-center font-mono text-[9.5px] leading-tight font-semibold whitespace-nowrap',
                    isCurrent ? 'font-bold text-[#121a18]' : 'text-[#035551]',
                  )}
                >
                  {step.label}
                </motion.span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * CARD 4: Resident & Non-Resident Investors
 * Multi-Asset Allocation Circular Gauge & Source Compliance Meter
 */
function InvestorRadarVisualization() {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-[#035551]/12 bg-[#FDFBEE] p-3 transition-colors group-hover:border-[#C9B37E]/40 sm:p-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LineChart className="h-4 w-4 text-[#035551]" />
          <span className="font-mono text-[11px] font-bold text-[#035551] uppercase">
            MULTI-ASSET COMPLIANCE
          </span>
        </div>
        <span className="font-mono text-[10px] font-bold text-[#035551]">
          VERIFIED
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 pt-0.5">
        {/* SVG Circular Donut Chart */}
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
          <svg
            className="h-full w-full -rotate-90 transform"
            viewBox="0 0 36 36"
          >
            <path
              className="text-[#035551]/15"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <motion.path
              className="text-[#035551]"
              strokeDasharray="100, 100"
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              initial={{ strokeDashoffset: 100 }}
              whileInView={{ strokeDashoffset: 15 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>
          <span className="absolute font-mono text-[10px] font-bold text-[#035551]">
            100%
          </span>
        </div>

        {/* Asset Distribution Key */}
        <div className="grid flex-1 grid-cols-2 gap-1 sm:gap-1.5">
          <div className="flex items-center gap-1 font-mono text-[9.5px] font-medium text-[#035551]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#035551]" />
            <span>Equity (40%)</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[9.5px] font-medium text-[#035551]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0aa79b]" />
            <span>Real Estate (35%)</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[9.5px] font-medium text-[#035551]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9B37E]" />
            <span>Offshore (15%)</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[9.5px] font-medium text-[#035551]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            <span>Liquidity (10%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * CARD 5: Real Estate Professionals
 * Curved SVG Area Chart for Mortgage Income Re-categorization
 */
function RealEstateValuationVisualization() {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-[#035551]/12 bg-[#FDFBEE] p-3 transition-colors group-hover:border-[#C9B37E]/40 sm:p-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#035551]" />
          <span className="font-mono text-[11px] font-bold text-[#035551] uppercase">
            MORTGAGE INCOME PROFILING
          </span>
        </div>
        <span className="font-mono text-[10px] font-bold text-emerald-700">
          CLEARED ✓
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 pt-0.5">
        <div className="flex flex-col">
          <span className="font-mono text-base font-bold text-[#121a18]">
            AED 18.5M
          </span>
          <span className="font-mono text-[10px] font-medium text-emerald-700">
            Valuation Cleared ✓
          </span>
        </div>

        {/* Curved Area SVG Chart */}
        <div className="relative h-10 w-32">
          <svg className="h-full w-full" viewBox="0 0 140 40" fill="none">
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0aa79b" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#035551" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 35 Q 35 30, 70 18 T 140 5 L 140 40 L 0 40 Z"
              fill="url(#areaGradient)"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              d="M 0 35 Q 35 30, 70 18 T 140 5"
              stroke="#0aa79b"
              strokeWidth="2.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ amount: 0.5 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            />
            <circle cx="140" cy="5" r="3" fill="#C9B37E" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * CARD 6: Global Companies Expanding to the UAE
 * Cross-Border Trade & UAE Gateway Network
 */
function GlobalNetworkVisualization() {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-[#035551]/12 bg-[#FDFBEE] p-3 transition-colors group-hover:border-[#C9B37E]/40 sm:p-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe2 className="h-4 w-4 text-[#035551]" />
          <span className="font-mono text-[11px] font-bold text-[#035551] uppercase">
            CROSS-BORDER GATEWAY
          </span>
        </div>
        <span className="font-mono text-[10px] font-bold text-[#C9B37E]">
          TURNKEY SETUP
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 pt-0.5">
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#035551]">
          <span className="rounded border border-[#035551]/15 bg-white px-2 py-1 shadow-2xs">
            UK / US / SG
          </span>
        </div>

        {/* Animated Connecting Flow */}
        <div className="relative flex flex-1 items-center justify-center px-1.5">
          <svg className="h-3.5 w-full" viewBox="0 0 100 16">
            <motion.path
              d="M 0 8 Q 50 0, 100 8"
              fill="none"
              stroke="#C9B37E"
              strokeWidth="2"
              strokeDasharray="4 4"
              initial={{ strokeDashoffset: 20 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
        </div>

        <div className="flex items-center gap-1 font-mono text-[10px] font-bold text-[#035551]">
          <span className="rounded bg-gradient-to-r from-[#035551] to-[#0aa79b] px-2 py-1 text-white shadow-2xs">
            UAE HUB ➔
          </span>
        </div>
      </div>
    </div>
  );
}
