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
        <p className="text-ink-muted text-xs leading-relaxed sm:text-sm lg:text-base">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
