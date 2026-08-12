import type { EnquiryStatus } from '@/lib/supabase/types';

type Props = {
  status: EnquiryStatus;
};

const STATUS_CONFIG: Record<
  EnquiryStatus,
  { label: string; className: string }
> = {
  new: { label: 'New', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  reviewing: {
    label: 'Reviewing',
    className: 'bg-purple-100 text-purple-800 border-purple-200',
  },
  contacted: {
    label: 'Contacted',
    className: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  qualified: {
    label: 'Qualified',
    className: 'bg-teal-100 text-teal-800 border-teal-200',
  },
  not_qualified: {
    label: 'Not Qualified',
    className: 'bg-slate-100 text-slate-700 border-slate-200',
  },
  converted: {
    label: 'Converted',
    className: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  closed: {
    label: 'Closed',
    className: 'bg-gray-100 text-gray-700 border-gray-200',
  },
};

export function EnquiryStatusBadge({ status }: Props) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.new;

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase ${config.className}`}
    >
      {config.label}
    </span>
  );
}
