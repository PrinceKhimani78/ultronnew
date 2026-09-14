import {
  CheckCircle2,
  Clock,
  FileText,
  Handshake,
  Inbox,
  Layers,
  PlusCircle,
  Settings,
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
      'id, reference_number, full_name, email, phone, company_name, business_type, service, status, source_page, submitted_at, created_at',
    )
    .is('archived_at', null)
    .order('created_at', { ascending: false });

  const allList = (rawEnquiries || []) as unknown as EnquiryRecord[];

  const isPartnerLead = (e: EnquiryRecord) =>
    e.source_page === '/partner' ||
    Boolean(e.source_page && e.source_page.toLowerCase().includes('partner'));

  const consultationList = allList.filter((e) => !isPartnerLead(e));
  const partnerList = allList.filter((e) => isPartnerLead(e));

  const getMetrics = (items: typeof allList) => {
    const total = items.length;
    const countNew = items.filter((e) => e.status === 'new').length;
    const countReviewing = items.filter((e) => e.status === 'reviewing').length;
    const countContacted = items.filter((e) => e.status === 'contacted').length;
    const countQualified = items.filter((e) => e.status === 'qualified').length;
    const countConverted = items.filter((e) => e.status === 'converted').length;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const countLast7Days = items.filter(
      (e) => new Date(e.submitted_at || e.created_at) >= sevenDaysAgo,
    ).length;
    return {
      total,
      countNew,
      countReviewing,
      countContacted,
      countQualified,
      countConverted,
      countLast7Days,
    };
  };

  const consultationMetrics = getMetrics(consultationList);
  const partnerMetrics = getMetrics(partnerList);

  const recentConsultations = consultationList.slice(0, 5);
  const recentPartnerLeads = partnerList.slice(0, 5);

  // Fetch CMS Content Metrics
  const { data: blogData } = await supabase
    .from('blog_posts')
    .select('id, status')
    .is('archived_at', null);

  const { data: serviceData } = await supabase
    .from('services')
    .select('id, status')
    .is('archived_at', null);

  const { data: teamData } = await supabase
    .from('team_members')
    .select('id, is_visible')
    .is('archived_at', null);

  const blogList = blogData || [];
  const totalBlogs = blogList.length;
  const publishedBlogs = blogList.filter(
    (b) => b.status === 'published',
  ).length;
  const draftBlogs = blogList.filter((b) => b.status === 'draft').length;

  const serviceList = serviceData || [];
  const totalServices = serviceList.length;
  const publishedServices = serviceList.filter(
    (s) => s.status === 'published',
  ).length;

  const teamList = teamData || [];
  const visibleTeam = teamList.filter((t) => t.is_visible).length;

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Lead Overview & Performance
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Real-time snapshot of consultation requests and partner form
          submissions.
        </p>
      </div>

      {/* --- Consultation Enquiries Section --- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900">
            <Inbox className="h-5 w-5 text-[#035551]" />
            Consultation Enquiries Snapshot
          </h3>
          <Link
            href="/admin/enquiries"
            className="text-xs font-bold text-[#035551] uppercase hover:underline"
          >
            View All Consultation Enquiries →
          </Link>
        </div>

        {/* Consultation Metrics Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          <StatCard
            label="Total Consultation"
            value={consultationMetrics.total}
            icon={Inbox}
            color="text-slate-700"
          />
          <StatCard
            label="New"
            value={consultationMetrics.countNew}
            icon={Clock}
            color="text-blue-600"
          />
          <StatCard
            label="Reviewing"
            value={consultationMetrics.countReviewing}
            icon={FileText}
            color="text-purple-600"
          />
          <StatCard
            label="Contacted"
            value={consultationMetrics.countContacted}
            icon={Users}
            color="text-amber-600"
          />
          <StatCard
            label="Qualified"
            value={consultationMetrics.countQualified}
            icon={UserCheck}
            color="text-teal-600"
          />
          <StatCard
            label="Converted"
            value={consultationMetrics.countConverted}
            icon={CheckCircle2}
            color="text-emerald-600"
          />
          <StatCard
            label="Last 7 Days"
            value={consultationMetrics.countLast7Days}
            icon={TrendingUp}
            color="text-indigo-600"
          />
        </div>

        {/* Recent Consultation Enquiries Table */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-xs">
          {recentConsultations.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No consultation enquiries recorded yet.
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
                      Name / Email
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
                  {recentConsultations.map((item) => (
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

      {/* --- Dedicated Partner Leads Section --- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display flex items-center gap-2 text-lg font-bold tracking-tight text-slate-900">
            <Handshake className="h-5 w-5 text-amber-600" />
            Partner Leads Snapshot
          </h3>
          <Link
            href="/admin/partner-leads"
            className="text-xs font-bold text-[#035551] uppercase hover:underline"
          >
            View All Partner Leads →
          </Link>
        </div>

        {/* Partner Metrics Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          <StatCard
            label="Total Partner Leads"
            value={partnerMetrics.total}
            icon={Handshake}
            color="text-amber-700"
          />
          <StatCard
            label="New"
            value={partnerMetrics.countNew}
            icon={Clock}
            color="text-blue-600"
          />
          <StatCard
            label="Reviewing"
            value={partnerMetrics.countReviewing}
            icon={FileText}
            color="text-purple-600"
          />
          <StatCard
            label="Contacted"
            value={partnerMetrics.countContacted}
            icon={Users}
            color="text-amber-600"
          />
          <StatCard
            label="Qualified"
            value={partnerMetrics.countQualified}
            icon={UserCheck}
            color="text-teal-600"
          />
          <StatCard
            label="Converted"
            value={partnerMetrics.countConverted}
            icon={CheckCircle2}
            color="text-emerald-600"
          />
          <StatCard
            label="Last 7 Days"
            value={partnerMetrics.countLast7Days}
            icon={TrendingUp}
            color="text-indigo-600"
          />
        </div>

        {/* Recent Partner Leads Table */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-xs">
          {recentPartnerLeads.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No partner leads recorded yet. Submissions from the Partner With
              Us form will appear here.
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
                      Partner / Email
                    </th>
                    <th scope="col" className="px-6 py-3.5">
                      Company / Business
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
                  {recentPartnerLeads.map((item) => (
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
                        {item.company_name || item.business_type || '—'}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-700">
                        {item.service || 'General Partner'}
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
                          href={`/admin/partner-leads/${item.id}`}
                          className="rounded-md bg-amber-600/10 px-3 py-1.5 text-xs font-bold text-amber-700 uppercase transition-all hover:bg-amber-600 hover:text-white"
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

      {/* Website Content Overview Section */}
      <div className="border-t border-slate-200 pt-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-xl font-bold tracking-tight text-slate-900">
              Website Content Overview
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Live metrics for dynamic website content published across Ultron
              pages.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#035551] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#023F3D]"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Add Blog Post
            </Link>
            <Link
              href="/admin/services/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#035551] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#023F3D]"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Add Service
            </Link>
            <Link
              href="/admin/team/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#035551] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#023F3D]"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Add Team Member
            </Link>
            <Link
              href="/admin/settings"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-50"
            >
              <Settings className="h-3.5 w-3.5" />
              Edit Settings
            </Link>
          </div>
        </div>

        {/* CMS Stats Cards */}
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard
            label="Total Posts"
            value={totalBlogs}
            icon={FileText}
            color="text-slate-700"
          />
          <StatCard
            label="Published Posts"
            value={publishedBlogs}
            icon={CheckCircle2}
            color="text-emerald-600"
          />
          <StatCard
            label="Draft Posts"
            value={draftBlogs}
            icon={Clock}
            color="text-amber-600"
          />
          <StatCard
            label="Total Services"
            value={totalServices}
            icon={Layers}
            color="text-blue-600"
          />
          <StatCard
            label="Published Services"
            value={publishedServices}
            icon={CheckCircle2}
            color="text-teal-600"
          />
          <StatCard
            label="Visible Team"
            value={visibleTeam}
            icon={Users}
            color="text-purple-600"
          />
        </div>
      </div>
    </div>
  );
}
