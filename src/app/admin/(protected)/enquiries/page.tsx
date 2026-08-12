import { Search, X } from 'lucide-react';
import Link from 'next/link';

import { EnquiryPriorityBadge } from '@/components/admin/EnquiryPriorityBadge';
import { EnquiryStatusBadge } from '@/components/admin/EnquiryStatusBadge';
import { requireAdmin } from '@/lib/admin/auth';
import { createClient } from '@/lib/supabase/server';
import type {
  EnquiryPriority,
  EnquiryRecord,
  EnquiryStatus,
} from '@/lib/supabase/types';

type Props = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    service?: string;
    priority?: string;
    page?: string;
  }>;
};

const PAGE_SIZE = 20;

export default async function AdminEnquiriesPage({ searchParams }: Props) {
  await requireAdmin();

  const { q, status, service, priority, page } = await searchParams;

  const currentPage = Math.max(1, parseInt(page || '1', 10));
  const fromIndex = (currentPage - 1) * PAGE_SIZE;
  const toIndex = fromIndex + PAGE_SIZE - 1;

  const supabase = await createClient();

  let query = supabase.from('enquiries').select('*', { count: 'exact' });

  // Handle Archive filter vs Active
  if (status === 'archived') {
    query = query.not('archived_at', 'is', null);
  } else {
    query = query.is('archived_at', null);
    if (status && status !== 'all') {
      query = query.eq('status', status as EnquiryStatus);
    }
  }

  if (service && service !== 'all') {
    query = query.eq('service', service);
  }

  if (priority && priority !== 'all') {
    query = query.eq('priority', priority as EnquiryPriority);
  }

  // Handle text search safely escaping PostgREST syntax
  if (q && q.trim() !== '') {
    const sanitized = q.trim().replace(/[%_(),]/g, '');
    if (sanitized) {
      query = query.or(
        `reference_number.ilike.%${sanitized}%,full_name.ilike.%${sanitized}%,email.ilike.%${sanitized}%,phone.ilike.%${sanitized}%`,
      );
    }
  }

  const {
    data: rawEnquiries,
    count,
    error,
  } = await query
    .order('created_at', { ascending: false })
    .range(fromIndex, toIndex);

  const enquiries = (rawEnquiries || []) as unknown as EnquiryRecord[];

  const totalRecords = count || 0;
  const totalPages = Math.ceil(totalRecords / PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Enquiry Management
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Search, filter, and review website consultation requests.
          </p>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
        <form
          method="GET"
          action="/admin/enquiries"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {/* Search Input */}
          <div className="relative sm:col-span-2">
            <Search className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="q"
              defaultValue={q || ''}
              placeholder="Search reference, name, email or phone..."
              className="block w-full rounded-lg border border-slate-300 bg-slate-50/50 py-2 pr-3 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#035551] focus:bg-white focus:ring-2 focus:ring-[#035551]/20 focus:outline-hidden"
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <select
              name="status"
              defaultValue={status || 'all'}
              className="block w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 focus:border-[#035551] focus:bg-white focus:ring-2 focus:ring-[#035551]/20 focus:outline-hidden"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="reviewing">Reviewing</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="not_qualified">Not Qualified</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Service Dropdown */}
          <div>
            <select
              name="service"
              defaultValue={service || 'all'}
              className="block w-full rounded-lg border border-slate-300 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 focus:border-[#035551] focus:bg-white focus:ring-2 focus:ring-[#035551]/20 focus:outline-hidden"
            >
              <option value="all">All Services</option>
              <option value="Business Banking">Business Banking</option>
              <option value="Business Setup">Business Setup</option>
              <option value="Financial Advisory">Financial Advisory</option>
              <option value="Tax Structuring Advisory">
                Tax Structuring Advisory
              </option>
              <option value="Business Finance">Business Finance</option>
              <option value="Real Estate Mortgages">
                Real Estate Mortgages
              </option>
            </select>
          </div>

          {/* Submit & Clear Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-[#035551] py-2 text-center text-xs font-bold text-white uppercase shadow-xs hover:bg-[#023c39]"
            >
              Filter
            </button>
            {(q || status || service || priority) && (
              <Link
                href="/admin/enquiries"
                className="flex items-center justify-center rounded-lg border border-slate-300 bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
                title="Clear Filters"
              >
                <X className="h-4 w-4" />
              </Link>
            )}
          </div>
        </form>
      </div>

      {/* Data Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs">
        {error ? (
          <div className="p-8 text-center text-sm text-red-600">
            Error loading enquiries. Please check database permissions or try
            again.
          </div>
        ) : !enquiries || enquiries.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            No enquiries match the selected filters or search terms.
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden overflow-x-auto md:block">
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
                      Priority
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
                  {enquiries.map((item) => (
                    <tr
                      key={item.id}
                      className="transition-colors hover:bg-slate-50/80"
                    >
                      <td className="px-6 py-4 font-mono text-xs font-bold text-slate-900">
                        {item.reference_number}
                      </td>
                      <td className="px-6 py-4">
                        <span className="block font-medium text-slate-900">
                          {item.full_name}
                        </span>
                        <span className="block text-xs text-slate-500">
                          {item.email}
                        </span>
                        {item.phone && (
                          <span className="block text-xs text-slate-400">
                            {item.phone}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-700">
                        {item.service || 'General Enquiry'}
                      </td>
                      <td className="px-6 py-4">
                        <EnquiryStatusBadge status={item.status} />
                      </td>
                      <td className="px-6 py-4">
                        <EnquiryPriorityBadge priority={item.priority} />
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

            {/* Mobile Stacked Card View */}
            <div className="divide-y divide-slate-200 md:hidden">
              {enquiries.map((item) => (
                <div key={item.id} className="space-y-3 p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {item.reference_number}
                    </span>
                    <EnquiryStatusBadge status={item.status} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      {item.full_name}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {item.email} • {item.phone || 'No phone'}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[#035551]">
                      {item.service || 'General Enquiry'}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                    <span className="text-xs text-slate-400">
                      {new Date(
                        item.submitted_at || item.created_at,
                      ).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/admin/enquiries/${item.id}`}
                      className="rounded-md bg-[#035551] px-3 py-1 text-xs font-bold text-white uppercase"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 text-sm">
                <span className="text-xs text-slate-500">
                  Showing {fromIndex + 1} to{' '}
                  {Math.min(toIndex + 1, totalRecords)} of {totalRecords}{' '}
                  records
                </span>
                <div className="flex items-center gap-2">
                  {currentPage > 1 && (
                    <Link
                      href={`/admin/enquiries?page=${currentPage - 1}${q ? `&q=${q}` : ''}${status ? `&status=${status}` : ''}${service ? `&service=${service}` : ''}`}
                      className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Previous
                    </Link>
                  )}
                  {currentPage < totalPages && (
                    <Link
                      href={`/admin/enquiries?page=${currentPage + 1}${q ? `&q=${q}` : ''}${status ? `&status=${status}` : ''}${service ? `&service=${service}` : ''}`}
                      className="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Next
                    </Link>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
