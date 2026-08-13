'use client';

import {
  Edit3,
  ExternalLink,
  Layers,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { ServiceRecord } from '@/lib/supabase/types';

export default function ServicesManagementPage() {
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function fetchServices() {
      try {
        setError(null);
        const res = await fetch('/api/admin/services');
        const data = await res.json();
        if (!ignore) {
          if (res.ok && data.services) {
            setServices(data.services);
          } else {
            setError(data.error || 'Failed to fetch services list.');
          }
        }
      } catch (err: unknown) {
        if (!ignore) {
          setError(
            err instanceof Error
              ? err.message
              : 'An error occurred fetching services.',
          );
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchServices();
    return () => {
      ignore = true;
    };
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to archive service.');
      }
    } catch {
      alert('Network error archiving service.');
    } finally {
      setDeletingId(null);
      setShowConfirmModal(null);
    }
  };

  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.slug.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Services Catalogue Management
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Manage service offerings, hero messaging, FAQs, process steps, and
            display order.
          </p>
        </div>

        <Link
          href="/admin/services/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#035551] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#023F3D]"
        >
          <Plus className="h-4 w-4" />
          Add New Service
        </Link>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700 shadow-xs">
          <strong>Database Query Error:</strong> {error}
        </div>
      )}

      {/* Toolbar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="relative max-w-md">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search service name or slug..."
            className="w-full rounded-lg border border-slate-300 py-2 pr-4 pl-9 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs">
        {loading ? (
          <div className="flex items-center justify-center p-12 text-sm text-slate-500">
            Loading services...
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            No services found.
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
                    Service Name
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Toggles
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredServices.map((service) => (
                  <tr
                    key={service.id}
                    className="transition-colors hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-4 font-mono text-xs font-bold text-slate-900">
                      #{service.display_order}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#035551]/10 text-[#035551]">
                          <Layers className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900">
                            {service.name}
                          </span>
                          <span className="block font-mono text-xs text-slate-400">
                            /services/{service.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase ${
                          service.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`font-semibold ${
                            service.show_in_navigation
                              ? 'text-teal-700'
                              : 'text-slate-400'
                          }`}
                        >
                          {service.show_in_navigation
                            ? '✓ In Nav'
                            : '✗ Nav Hidden'}
                        </span>
                        <span
                          className={`font-semibold ${
                            service.show_on_homepage
                              ? 'text-blue-700'
                              : 'text-slate-400'
                          }`}
                        >
                          {service.show_on_homepage
                            ? '✓ On Homepage'
                            : '✗ Homepage Hidden'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/services/${service.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-500 hover:text-[#035551]"
                          title="Preview public service page"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/services/${service.id}/edit`}
                          className="p-1.5 text-slate-500 hover:text-[#035551]"
                          title="Edit service"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setShowConfirmModal(service.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600"
                          title="Archive service"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Archive Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="font-display text-lg font-bold text-slate-900">
              Confirm Service Archival
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to archive this service? It will no longer
              appear on the public website.
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
                onClick={() => handleDelete(showConfirmModal)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-700 disabled:opacity-50"
              >
                {deletingId === showConfirmModal
                  ? 'Archiving...'
                  : 'Archive Service'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
