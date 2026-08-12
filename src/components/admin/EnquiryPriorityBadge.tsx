import type { EnquiryPriority } from '@/lib/supabase/types';

type Props = {
  priority: EnquiryPriority;
};

const PRIORITY_CONFIG: Record<
  EnquiryPriority,
  { label: string; className: string }
> = {
  low: {
    label: 'Low',
    className: 'bg-slate-100 text-slate-600 border-slate-200',
  },
  normal: {
    label: 'Normal',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  high: {
    label: 'High',
    className: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  urgent: {
    label: 'Urgent',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
};

export function EnquiryPriorityBadge({ priority }: Props) {
  const config = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.normal;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-bold tracking-wider uppercase ${config.className}`}
    >
      {config.label}
    </span>
  );
}
