import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Building,
  Calendar,
  Clock,
  Globe,
  Mail,
  MessageSquare,
  Phone,
  User,
} from 'lucide-react';

import { EnquiryPriorityBadge } from '@/components/admin/EnquiryPriorityBadge';
import { EnquiryStatusBadge } from '@/components/admin/EnquiryStatusBadge';
import { requireAdmin } from '@/lib/admin/auth';
import { createClient } from '@/lib/supabase/server';
import type { EnquiryRecord } from '@/lib/supabase/types';

import { EnquiryActionsForm } from './EnquiryActionsForm';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EnquiryDetailPage({ params }: Props) {
  const admin = await requireAdmin();
  const { id } = await params;

  const supabase = await createClient();

  // Fetch Enquiry Record
  const { data: rawEnquiry, error } = await supabase
    .from('enquiries')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !rawEnquiry) {
    notFound();
  }

  const enquiry = rawEnquiry as unknown as EnquiryRecord;

  // Fetch Internal Notes
  const { data: rawNotes } = await supabase
    .from('enquiry_notes')
    .select(
      `
      id,
      note,
      created_at,
      admin_profiles:admin_id (full_name, role)
    `,
    )
    .eq('enquiry_id', id)
    .order('created_at', { ascending: false });

  const notes = (rawNotes || []) as unknown as {
    id: string;
    note: string;
    created_at: string;
    admin_profiles:
      | { full_name: string; role: string }
      | { full_name: string; role: string }[]
      | null;
  }[];

  // Fetch Activity Log
  const { data: rawActivity } = await supabase
    .from('enquiry_activity')
    .select(
      `
      id,
      action,
      previous_value,
      new_value,
      created_at,
      admin_profiles:admin_id (full_name)
    `,
    )
    .eq('enquiry_id', id)
    .order('created_at', { ascending: false });

  const activity = (rawActivity || []) as unknown as {
    id: string;
    action: string;
    previous_value: unknown;
    new_value: unknown;
    created_at: string;
    admin_profiles: { full_name: string } | { full_name: string }[] | null;
  }[];

  const isArchived = Boolean(enquiry.archived_at);

  return (
    <div className="space-y-8">
      {/* Navigation & Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/enquiries"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-bold text-slate-500">
                {enquiry.reference_number}
              </span>
              <EnquiryStatusBadge status={enquiry.status} />
              <EnquiryPriorityBadge priority={enquiry.priority} />
              {isArchived && (
                <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-bold text-gray-700 uppercase">
                  Archived
                </span>
              )}
            </div>
            <h2 className="font-display mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {enquiry.full_name}
            </h2>
          </div>
        </div>
      </div>

      {/* Main Grid: Details on Left, Actions & Notes on Right */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column (8 cols): Submitted Lead Information */}
        <div className="space-y-6 lg:col-span-8">
          {/* Submitted Message Card */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="font-display flex items-center gap-2 text-base font-bold text-slate-900 uppercase">
              <MessageSquare className="h-4 w-4 text-[#035551]" />
              Submitted Message
            </h3>
            <div className="mt-4 rounded-lg bg-slate-50 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap text-slate-800">
              {enquiry.message || 'No additional message was submitted.'}
            </div>
          </div>

          {/* Contact & Business Profile Grid */}
          <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="font-display flex items-center gap-2 border-b border-slate-100 pb-3 text-base font-bold text-slate-900 uppercase">
              <User className="h-4 w-4 text-[#035551]" />
              Contact & Business Details
            </h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <span className="block text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Full Name
                </span>
                <span className="mt-1 block text-base font-semibold text-slate-900">
                  {enquiry.full_name}
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Email Address
                </span>
                <a
                  href={`mailto:${enquiry.email}`}
                  className="mt-1 flex items-center gap-1.5 text-base font-semibold text-[#035551] hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  {enquiry.email}
                </a>
              </div>

              <div>
                <span className="block text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Phone Number
                </span>
                {enquiry.phone ? (
                  <a
                    href={`tel:${enquiry.phone}`}
                    className="mt-1 flex items-center gap-1.5 text-base font-semibold text-slate-900 hover:text-[#035551]"
                  >
                    <Phone className="h-4 w-4" />
                    {enquiry.phone}
                  </a>
                ) : (
                  <span className="mt-1 block text-sm text-slate-400">
                    Not provided
                  </span>
                )}
              </div>

              <div>
                <span className="block text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Business Type / Company
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-base font-semibold text-slate-900">
                  <Building className="h-4 w-4 text-slate-400" />
                  {enquiry.company_name ||
                    enquiry.business_type ||
                    'Individual / Not specified'}
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Service Requested
                </span>
                <span className="mt-1 block text-base font-bold text-[#035551]">
                  {enquiry.service || 'General Advisory'}
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold tracking-wider text-slate-400 uppercase">
                  Submission Date & Time
                </span>
                <span className="mt-1 flex items-center gap-1.5 text-sm text-slate-600">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  {new Date(
                    enquiry.submitted_at || enquiry.created_at,
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Technical Metadata & UTM Parameters */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="font-display flex items-center gap-2 border-b border-slate-100 pb-3 text-base font-bold text-slate-900 uppercase">
              <Globe className="h-4 w-4 text-[#035551]" />
              Source & UTM Tracking Metadata
            </h3>

            <div className="mt-4 grid grid-cols-1 gap-4 text-xs sm:grid-cols-3">
              <div>
                <span className="block font-bold text-slate-400 uppercase">
                  Source Page
                </span>
                <span className="font-mono text-slate-700">
                  {enquiry.source_page || '/contact'}
                </span>
              </div>
              <div>
                <span className="block font-bold text-slate-400 uppercase">
                  UTM Source
                </span>
                <span className="font-mono text-slate-700">
                  {enquiry.utm_source || 'direct'}
                </span>
              </div>
              <div>
                <span className="block font-bold text-slate-400 uppercase">
                  UTM Medium
                </span>
                <span className="font-mono text-slate-700">
                  {enquiry.utm_medium || 'none'}
                </span>
              </div>
              <div>
                <span className="block font-bold text-slate-400 uppercase">
                  UTM Campaign
                </span>
                <span className="font-mono text-slate-700">
                  {enquiry.utm_campaign || 'none'}
                </span>
              </div>
            </div>
          </div>

          {/* Internal Notes Display */}
          <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="font-display flex items-center gap-2 border-b border-slate-100 pb-3 text-base font-bold text-slate-900 uppercase">
              Internal Notes ({notes ? notes.length : 0})
            </h3>

            {!notes || notes.length === 0 ? (
              <p className="text-sm text-slate-500 italic">
                No internal admin notes added yet.
              </p>
            ) : (
              <div className="space-y-3">
                {notes.map((n) => {
                  const author = Array.isArray(n.admin_profiles)
                    ? n.admin_profiles[0]?.full_name
                    : (n.admin_profiles as unknown as { full_name: string })
                        ?.full_name || 'Admin';

                  return (
                    <div
                      key={n.id}
                      className="rounded-lg border border-slate-100 bg-slate-50 p-4"
                    >
                      <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
                        <span className="font-bold text-slate-800">
                          {author}
                        </span>
                        <span>{new Date(n.created_at).toLocaleString()}</span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap text-slate-800">
                        {n.note}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Activity Timeline */}
          <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <h3 className="font-display flex items-center gap-2 border-b border-slate-100 pb-3 text-base font-bold text-slate-900 uppercase">
              <Clock className="h-4 w-4 text-[#035551]" />
              Activity Timeline
            </h3>

            {!activity || activity.length === 0 ? (
              <p className="text-sm text-slate-500 italic">
                No activity logged for this lead yet.
              </p>
            ) : (
              <div className="relative space-y-6 border-l-2 border-slate-200 pl-4">
                {activity.map((act) => {
                  const author = Array.isArray(act.admin_profiles)
                    ? act.admin_profiles[0]?.full_name
                    : (act.admin_profiles as unknown as { full_name: string })
                        ?.full_name || 'System';

                  return (
                    <div key={act.id} className="relative">
                      <div className="absolute top-1 -left-[21px] h-3 w-3 rounded-full bg-[#035551]" />
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-bold text-slate-800 capitalize">
                          {act.action.replace(/_/g, ' ')} by {author}
                        </span>
                        <span>{new Date(act.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Interactive Actions Form */}
        <div className="lg:col-span-4">
          <div className="sticky top-8 space-y-6">
            <EnquiryActionsForm
              enquiryId={enquiry.id}
              currentStatus={enquiry.status}
              currentPriority={enquiry.priority}
              isArchived={isArchived}
              userRole={admin.profile.role}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
