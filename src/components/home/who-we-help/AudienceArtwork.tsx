'use client';

import { motion } from 'framer-motion';

interface AudienceArtworkProps {
  id: string;
  index: number;
  className?: string;
}

export function AudienceArtwork({
  id,
  index: _index,
  className = '',
}: AudienceArtworkProps) {
  // Select artwork based on ID or index
  switch (id) {
    case 'uae-smes-operating-businesses':
      return <SmeArtwork className={className} />;
    case 'high-net-worth':
      return <FamilyOfficeArtwork className={className} />;
    case 'foreign-investors':
      return <FoundersArtwork className={className} />;
    case 'smes-growing-businesses':
      return <InvestorsArtwork className={className} />;
    case 'startups-founders':
      return <RealEstateArtwork className={className} />;
    case 'global-companies':
      return <GlobalExpansionArtwork className={className} />;
    default:
      return <SmeArtwork className={className} />;
  }
}

/** 1. UAE SMEs & Operating Businesses - Corporate Banking & Unflagging Matrix */
function SmeArtwork({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#023e3b] via-[#035551] to-[#012422] p-8 text-white shadow-inner ${className}`}
    >
      {/* Background Architectural Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#0aa79b_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

      {/* Glow Center */}
      <div className="absolute h-48 w-48 rounded-full bg-[#0aa79b]/20 blur-3xl" />

      {/* Floating Animated Geometric Elements */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Outer Pulsing Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="relative flex h-48 w-48 items-center justify-center rounded-full border border-[#0aa79b]/30 p-4"
        >
          {/* Orbiting Satellite Node */}
          <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border border-white bg-[#0aa79b] shadow-[0_0_12px_#0aa79b]" />
        </motion.div>

        {/* Inner Financial Node Vault */}
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute flex h-32 w-32 flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md"
        >
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0aa79b] to-[#035551] shadow-lg">
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <span className="font-mono text-[10px] font-bold tracking-wider text-[#0aa79b] uppercase">
            CLEARANCE PASS
          </span>
          <span className="font-display text-xs font-semibold text-white/90">
            99.8% Approval
          </span>
        </motion.div>
      </div>

      {/* Metric Overlay Pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/15 bg-[#012422]/80 px-3.5 py-1.5 backdrop-blur-md"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        <span className="font-mono text-[11px] font-medium tracking-wide text-white/80">
          Corporate Banking Active
        </span>
      </motion.div>
    </div>
  );
}

/** 2. Family Offices & Multi-Entity Groups - Multi-Jurisdiction Structure */
function FamilyOfficeArtwork({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#03403d] via-[#025a55] to-[#011e1c] p-8 text-white shadow-inner ${className}`}
    >
      {/* Circular Radial Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 flex h-48 w-56 items-center justify-center">
        {/* Layered Pyramid Architecture Cards */}
        {[0, 1, 2].map((layer) => (
          <motion.div
            key={layer}
            animate={{
              y: [layer * -16, layer * -16 - 6, layer * -16],
              rotateX: [45, 48, 45],
            }}
            transition={{
              duration: 5,
              delay: layer * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ perspective: 800 }}
            className={`absolute flex items-center justify-between rounded-xl border border-white/20 px-4 py-3 shadow-xl backdrop-blur-md ${
              layer === 0
                ? 'w-48 bg-white/20'
                : layer === 1
                  ? 'w-40 bg-[#0aa79b]/30'
                  : 'w-32 bg-emerald-500/30'
            }`}
          >
            <span className="font-mono text-[10px] tracking-wider text-white/70">
              ENTITY L0{3 - layer}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#0aa79b]" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/15 bg-[#011e1c]/80 px-3.5 py-1.5 backdrop-blur-md"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#0aa79b]" />
        <span className="font-mono text-[11px] font-medium tracking-wide text-white/80">
          Cross-Border Shield
        </span>
      </motion.div>
    </div>
  );
}

/** 3. Founders & Entrepreneurs - Bankable Structure Matrix */
function FoundersArtwork({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#023330] via-[#035551] to-[#011c1a] p-8 text-white shadow-inner ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div className="relative z-10 flex items-center justify-center">
        <motion.div
          animate={{ scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex h-40 w-40 items-center justify-center rounded-3xl border border-emerald-400/40 bg-gradient-to-tr from-[#035551] to-[#0aa79b]/40 p-6 shadow-2xl backdrop-blur-xl"
        >
          {/* Diamond Central Core */}
          <div className="flex h-16 w-16 rotate-45 items-center justify-center rounded-xl border border-white/30 bg-white/10 shadow-lg">
            <div className="font-display -rotate-45 text-lg font-bold text-white">
              UAE
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/15 bg-[#011c1a]/80 px-3.5 py-1.5 backdrop-blur-md"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
        <span className="font-mono text-[11px] font-medium tracking-wide text-white/80">
          UAE Bankable Structure
        </span>
      </motion.div>
    </div>
  );
}

/** 4. Resident & Non-Resident Investors - Compliance & Portfolio Balance */
function InvestorsArtwork({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#024440] via-[#035551] to-[#002220] p-8 text-white shadow-inner ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(#0aa79b_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />

      {/* Radar Wave Effect */}
      <div className="relative z-10 flex h-48 w-48 items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute h-40 w-40 rounded-full border border-dashed border-[#0aa79b]/40"
        />
        <div className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-md">
          <svg
            className="h-8 w-8 text-[#0aa79b]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span className="mt-1 font-mono text-[9px] font-bold text-white/90">
            AML VERIFIED
          </span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/15 bg-[#002220]/80 px-3.5 py-1.5 backdrop-blur-md"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-teal-300" />
        <span className="font-mono text-[11px] font-medium tracking-wide text-white/80">
          Compliance Satisfied
        </span>
      </motion.div>
    </div>
  );
}

/** 5. Real Estate Professionals - Complex Income Profiling */
function RealEstateArtwork({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#013532] via-[#025a55] to-[#011a18] p-8 text-white shadow-inner ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px)] bg-[size:16px]" />

      <div className="relative z-10 flex h-48 w-56 flex-col justify-end gap-2 pb-4">
        {/* Animated Mortgage Graph Columns */}
        <div className="flex items-end justify-between gap-3 px-4">
          {[40, 65, 50, 90, 100].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 20 }}
              animate={{ height: [h * 0.8, h, h * 0.8] }}
              transition={{
                duration: 4,
                delay: i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`w-8 rounded-t-lg border border-white/20 shadow-lg backdrop-blur-md ${
                i === 4
                  ? 'bg-gradient-to-t from-[#0aa79b] to-emerald-300'
                  : 'bg-white/15'
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/15 bg-[#011a18]/80 px-3.5 py-1.5 backdrop-blur-md"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        <span className="font-mono text-[11px] font-medium tracking-wide text-white/80">
          Mortgage Clearance
        </span>
      </motion.div>
    </div>
  );
}

/** 6. Global Companies Expanding to UAE - International Node Network */
function GlobalExpansionArtwork({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#023a37] via-[#035551] to-[#001817] p-8 text-white shadow-inner ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,167,155,0.25)_0,transparent_70%)]" />

      {/* Global Node Network */}
      <div className="relative z-10 flex h-48 w-48 items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/25 bg-white/5 shadow-2xl backdrop-blur-md"
        >
          {/* Inner Globe Icon */}
          <svg
            className="h-16 w-16 text-[#0aa79b] opacity-80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V8.5dM12 21a9 9 0 100-18 9 9 0 000 18z"
            />
          </svg>

          {/* Connected Gateway Hub */}
          <div className="absolute right-2 -bottom-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-[#0aa79b] shadow-lg">
            <span className="font-display text-[10px] font-bold text-white">
              UAE
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-4 z-20 flex items-center gap-2 rounded-full border border-white/15 bg-[#001817]/80 px-3.5 py-1.5 backdrop-blur-md"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#0aa79b]" />
        <span className="font-mono text-[11px] font-medium tracking-wide text-white/80">
          Turnkey UAE Market Entry
        </span>
      </motion.div>
    </div>
  );
}
