'use client';

import {
  Edit3,
  ExternalLink,
  FileText,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { BlogPostRecord } from '@/lib/supabase/types';

export default function BlogManagementPage() {
  const [posts, setPosts] = useState<BlogPostRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function fetchPosts() {
      try {
        const res = await fetch('/api/admin/blog');
        const data = await res.json();
        if (!ignore && data.posts) {
          setPosts(data.posts);
        }
      } catch {
        // Handle error silently
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchPosts();
    return () => {
      ignore = true;
    };
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      // Handle error silently
    } finally {
      setDeletingId(null);
      setShowConfirmModal(null);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.category.toLowerCase().includes(search.toLowerCase()) ||
      post.author_name.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || post.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Blog Post Management
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Create, edit, preview, publish, and archive website blog articles.
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#035551] px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#023F3D]"
        >
          <Plus className="h-4 w-4" />
          Create New Article
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-lpignore="true"
            data-form-type="other"
            placeholder="Search by title, category or author..."
            className="w-full rounded-lg border border-slate-300 py-2 pr-4 pl-9 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-500 uppercase">
            Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            data-lpignore="true"
            data-form-type="other"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 focus:border-[#035551] focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs">
        {loading ? (
          <div className="flex items-center justify-center p-12 text-sm text-slate-500">
            Loading blog posts...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-500">
            No blog posts found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-200 bg-slate-50/50 text-xs font-bold tracking-wider text-slate-500 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3.5">
                    Post
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="transition-colors hover:bg-slate-50/80"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                          {post.featured_image_url ? (
                            <Image
                              src={post.featured_image_url}
                              alt={post.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <FileText className="m-auto h-6 w-6 text-slate-400" />
                          )}
                        </div>
                        <div>
                          <span className="line-clamp-1 font-semibold text-slate-900">
                            {post.title}
                          </span>
                          <span className="block font-mono text-xs text-slate-400">
                            /{post.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-700">
                      {post.author_name}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase ${
                          post.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(
                        post.published_at || post.created_at,
                      ).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/blogs/${post.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-500 hover:text-[#035551]"
                          title="Preview public post"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="p-1.5 text-slate-500 hover:text-[#035551]"
                          title="Edit post"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setShowConfirmModal(post.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600"
                          title="Delete post"
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

      {/* Delete Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="font-display text-lg font-bold text-slate-900">
              Confirm Post Archival
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to archive this blog post? It will no longer
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
                  : 'Archive Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
