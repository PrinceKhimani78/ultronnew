import {
  CheckCircle2,
  Clock,
  FileText,
  Inbox,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react';
import Link from 'next/link';

import { EnquiryStatusBadge } from '@/components/admin/EnquiryStatusBadge';
import { StatCard } from '@/components/admin/StatCard';
import { requireAdmin } from '@/lib/admin/auth';
import { createClient } from '@/lib/supabase/server';
import type { EnquiryRecord } from '@/lib/supabase/types';

export default async function AdminDashboardPage() {
  await requireAdmin();

  const supabase = await createClient();

  // Fetch all non-archived enquiries metrics
  const { data: rawEnquiries } = await supabase
    .from('enquiries')
    .select(
      'id, reference_number, full_name, email, service, status, submitted_at, created_at',
    )
    .is('archived_at', null)
    .order('created_at', { ascending: false });

  const list = (rawEnquiries || []) as unknown as EnquiryRecord[];

  const total = list.length;
  const countNew = list.filter((e) => e.status === 'new').length;
  const countReviewing = list.filter((e) => e.status === 'reviewing').length;
  const countContacted = list.filter((e) => e.status === 'contacted').length;
  const countQualified = list.filter((e) => e.status === 'qualified').length;
  const countConverted = list.filter((e) => e.status === 'converted').length;

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const countLast7Days = list.filter(
    (e) => new Date(e.submitted_at || e.created_at) >= sevenDaysAgo,
  ).length;

  const recentList = list.slice(0, 8);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Lead Overview & Performance
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Real-time snapshot of consultation enquiries submitted through the
          Ultron Financials website.
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        <StatCard
          label="Total Leads"
          value={total}
          icon={Inbox}
          color="text-slate-700"
        />
        <StatCard
          label="New"
          value={countNew}
          icon={Clock}
          color="text-blue-600"
        />
        <StatCard
          label="Reviewing"
          value={countReviewing}
          icon={FileText}
          color="text-purple-600"
        />
        <StatCard
          label="Contacted"
          value={countContacted}
          icon={Users}
          color="text-amber-600"
        />
        <StatCard
          label="Qualified"
          value={countQualified}
          icon={UserCheck}
          color="text-teal-600"
        />
        <StatCard
          label="Converted"
          value={countConverted}
          icon={CheckCircle2}
          color="text-emerald-600"
        />
        <StatCard
          label="Last 7 Days"
          value={countLast7Days}
          icon={TrendingUp}
          color="text-indigo-600"
        />
      </div>

      {/* Recent Enquiries Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h3 className="font-display text-base font-bold text-slate-900 uppercase">
              Recent Submissions
            </h3>
            <p className="text-xs text-slate-500">
              Latest incoming consultation leads across website forms
            </p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-bold text-[#035551] uppercase hover:underline"
          >
            View All Leads →
          </Link>
        </div>

        {recentList.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            No enquiries recorded yet. Submissions from the website will appear
            here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-200 bg-slate-50/50 text-xs font-bold tracking-wider text-slate-500 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3.5">
                    Reference
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Service
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Submitted
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentList.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-900">
                      {item.reference_number}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {item.full_name}
                      <span className="block text-xs text-slate-500">
                        {item.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-slate-700">
                      {item.service || 'General Enquiry'}
                    </td>
                    <td className="px-6 py-4">
                      <EnquiryStatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(
                        item.submitted_at || item.created_at,
                      ).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/enquiries/${item.id}`}
                        className="rounded-md bg-[#035551]/10 px-3 py-1.5 text-xs font-bold text-[#035551] uppercase transition-all hover:bg-[#035551] hover:text-white"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
