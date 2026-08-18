'use client';

import {
  Edit3,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Plus,
  Search,
  Trash2,
  User,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { TeamMemberRecord } from '@/lib/supabase/types';

export default function TeamManagementPage() {
  const [members, setMembers] = useState<TeamMemberRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'visible' | 'hidden' | 'archived'
  >('all');

  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function fetchMembers() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/api/admin/team');
        const data = await res.json();

        if (!ignore) {
          if (!res.ok) {
            setError(data.error || 'Failed to fetch team members.');
          } else if (data.team) {
            setMembers(data.team);
          }
        }
      } catch (err: unknown) {
        if (!ignore) {
          const message =
            err instanceof Error ? err.message : 'Failed to connect to server.';
          setError(message);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchMembers();
    return () => {
      ignore = true;
    };
  }, []);

  const handleToggleVisibility = async (member: TeamMemberRecord) => {
    setTogglingId(member.id);
    try {
      const res = await fetch(`/api/admin/team/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          is_visible: !member.is_visible,
        }),
      });

      if (res.ok) {
        setMembers((prev) =>
          prev.map((m) =>
            m.id === member.id ? { ...m, is_visible: !m.is_visible } : m,
          ),
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTogglingId(null);
    }
  };

  const handleArchive = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/team/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setMembers((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, archived_at: new Date().toISOString() } : m,
          ),
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
      setShowConfirmModal(null);
    }
  };

  // Filtering & Sorting (display_order asc, created_at asc as fallback)
  const filteredMembers = members
    .filter((m) => {
      const matchesSearch =
        m.full_name.toLowerCase().includes(search.toLowerCase()) ||
        m.job_title.toLowerCase().includes(search.toLowerCase());

      if (statusFilter === 'archived') {
        return matchesSearch && m.archived_at !== null;
      }
      if (m.archived_at !== null) {
        return false;
      }
      if (statusFilter === 'visible') {
        return matchesSearch && m.is_visible;
      }
      if (statusFilter === 'hidden') {
        return matchesSearch && !m.is_visible;
      }
      return matchesSearch;
    })
    .sort((a, b) => {
      const orderA = a.display_order ?? 999;
      const orderB = b.display_order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return (
        new Date(a.created_at || 0).getTime() -
        new Date(b.created_at || 0).getTime()
      );
    });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Team Member Management
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Manage public team profiles, titles, photos, and contact visibility.
          </p>
        </div>

        <Link
          href="/admin/team/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#035551] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#023F3D]"
        >
          <Plus className="h-4 w-4" />
          Add Team Member
        </Link>
      </div>

      {/* Toolbar & Filter Tabs */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-lpignore="true"
            data-form-type="other"
            placeholder="Search by name or job title..."
            className="w-full rounded-lg border border-slate-300 py-2 pr-4 pl-9 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 text-xs font-semibold">
          {(['all', 'visible', 'hidden', 'archived'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setStatusFilter(tab)}
              className={`rounded-md px-3 py-1.5 uppercase transition-colors ${
                statusFilter === tab
                  ? 'bg-white font-bold text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Error Alert Box */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700 shadow-xs">
          <strong>Error loading team members:</strong> {error}
        </div>
      )}

      {/* Table Container */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs">
        {loading ? (
          <div className="flex items-center justify-center p-12 text-sm text-slate-500">
            Loading team members...
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            {search
              ? 'No team members matching your search.'
              : 'No team members found.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-200 bg-slate-50/50 text-xs font-bold tracking-wider text-slate-500 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3.5">
                    Order
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Member
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Public Contact
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Visibility
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="transition-colors hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-900">
                      #{member.display_order}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                          {member.profile_image_url ? (
                            <Image
                              src={member.profile_image_url}
                              alt={member.image_alt || member.full_name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <User className="m-auto h-5 w-5 text-slate-400" />
                          )}
                        </div>
                        <span className="font-semibold text-slate-900">
                          {member.full_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-700">
                      {member.job_title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        {member.show_email_publicly && (
                          <span title="Public Email">
                            <Mail className="h-4 w-4 text-[#035551]" />
                          </span>
                        )}
                        {member.show_phone_publicly && (
                          <span title="Public Phone">
                            <Phone className="h-4 w-4 text-[#035551]" />
                          </span>
                        )}
                        {member.linkedin_url && (
                          <span
                            title="LinkedIn Connected"
                            className="rounded bg-blue-50 px-1.5 py-0.5 text-xs font-bold text-blue-600"
                          >
                            in
                          </span>
                        )}
                        {!member.show_email_publicly &&
                          !member.show_phone_publicly &&
                          !member.linkedin_url && (
                            <span className="text-xs text-slate-400">None</span>
                          )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {member.archived_at ? (
                        <span className="inline-flex rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold tracking-wider text-red-800 uppercase">
                          Archived
                        </span>
                      ) : (
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase ${
                            member.is_visible
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {member.is_visible ? 'Visible' : 'Hidden'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {!member.archived_at && (
                          <button
                            type="button"
                            disabled={togglingId === member.id}
                            onClick={() => handleToggleVisibility(member)}
                            className="p-1.5 text-slate-500 hover:text-[#035551] disabled:opacity-50"
                            title={
                              member.is_visible
                                ? 'Hide from website'
                                : 'Show on website'
                            }
                          >
                            {member.is_visible ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        )}
                        <Link
                          href={`/admin/team/${member.id}/edit`}
                          className="p-1.5 text-slate-500 hover:text-[#035551]"
                          title="Edit member"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Link>
                        {!member.archived_at && (
                          <button
                            type="button"
                            onClick={() => setShowConfirmModal(member.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600"
                            title="Archive member"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete/Archive Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="font-display text-lg font-bold text-slate-900">
              Confirm Archival
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to archive this team member? They will no
              longer appear on the public website.
            </p>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(null)}
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deletingId === showConfirmModal}
                onClick={() => handleArchive(showConfirmModal)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-700 disabled:opacity-50"
              >
                {deletingId === showConfirmModal
                  ? 'Archiving...'
                  : 'Archive Member'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
