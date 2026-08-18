'use client';

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ImageUploader } from '@/components/admin/ImageUploader';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { slugify } from '@/lib/cms-sanitizer';

export default function NewBlogPostPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImageUrl, setFeaturedImageUrl] = useState('');
  const [featuredImageAlt, setFeaturedImageAlt] = useState('');
  const [category, setCategory] = useState('Banking & Advisory');
  const [authorName, setAuthorName] = useState('Ultron Financials Team');
  const [isFeatured, setIsFeatured] = useState(false);
  const [featuredPosition, setFeaturedPosition] = useState<'left' | 'right'>(
    'left',
  );

  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === slugify(title)) {
      setSlug(slugify(val));
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
    postStatus: 'draft' | 'published',
  ) => {
    e.preventDefault();
    if (!title.trim() || !excerpt.trim() || !category.trim()) {
      setError('Title, excerpt, and category are required.');
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          content,
          featured_image_url: featuredImageUrl,
          featured_image_alt: featuredImageAlt,
          category,
          author_name: authorName,
          status: postStatus,
          is_featured: isFeatured,
          featured_position: featuredPosition,
          seo_title: seoTitle || title,
          meta_description: metaDescription || excerpt,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create blog post.');
      }

      router.push('/admin/blog');
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-12">
      {/* Navigation & Actions Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 uppercase hover:text-[#035551]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog List
        </Link>
      </div>

      <form
        autoComplete="off"
        data-lpignore="true"
        data-form-type="other"
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8"
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="font-display text-xl font-bold text-slate-900">
            Create New Article
          </h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={submitting}
              onClick={(e) => handleSubmit(e, 'draft')}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 uppercase shadow-xs hover:bg-slate-50 disabled:opacity-50"
            >
              Save as Draft
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={(e) => handleSubmit(e, 'published')}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#035551] px-4 py-2 text-xs font-bold text-white uppercase shadow-xs hover:bg-[#023F3D] disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              Publish Article
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-xs font-semibold text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              Article Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              data-lpignore="true"
              data-form-type="other"
              placeholder="e.g. Navigating UAE Business Banking in 2026"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm font-semibold text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              URL Slug *
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              data-lpignore="true"
              data-form-type="other"
              placeholder="navigating-uae-business-banking"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              Category *
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              data-lpignore="true"
              data-form-type="other"
              placeholder="e.g. Banking & Advisory, Company Formation"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              Short Summary / Excerpt *
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              data-lpignore="true"
              data-form-type="other"
              placeholder="Brief overview shown on blog listings and cards..."
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <ImageUploader
              value={featuredImageUrl}
              altValue={featuredImageAlt}
              folder="blog"
              onChange={setFeaturedImageUrl}
              onAltChange={setFeaturedImageAlt}
              label="Featured Image Header"
            />
          </div>

          <div className="sm:col-span-2">
            <RichTextEditor
              value={content}
              onChange={setContent}
              label="Article Content Body"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              Author Display Name
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              data-lpignore="true"
              data-form-type="other"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div className="flex flex-col justify-center space-y-3 pt-4">
            <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-700 uppercase">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                data-lpignore="true"
                data-form-type="other"
                className="h-4 w-4 rounded border-slate-300 text-[#035551] focus:ring-[#035551]"
              />
              Mark as Featured Article
            </label>

            {isFeatured && (
              <div className="flex items-center gap-4 pl-6">
                <span className="text-xs font-semibold text-slate-500">
                  Card Position:
                </span>
                <label className="flex items-center gap-1.5 text-xs text-slate-700">
                  <input
                    type="radio"
                    name="position"
                    value="left"
                    checked={featuredPosition === 'left'}
                    onChange={() => setFeaturedPosition('left')}
                    data-lpignore="true"
                    data-form-type="other"
                  />
                  Left
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-700">
                  <input
                    type="radio"
                    name="position"
                    value="right"
                    checked={featuredPosition === 'right'}
                    onChange={() => setFeaturedPosition('right')}
                    data-lpignore="true"
                    data-form-type="other"
                  />
                  Right
                </label>
              </div>
            )}
          </div>
        </div>

        {/* SEO Metadata Card */}
        <div className="space-y-4 border-t border-slate-200 pt-6">
          <h3 className="font-display text-sm font-bold text-slate-900 uppercase">
            SEO & Search Engine Settings
          </h3>
          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              Custom Meta Title
            </label>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              data-lpignore="true"
              data-form-type="other"
              placeholder={title || 'Search title fallback...'}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              Custom Meta Description
            </label>
            <textarea
              rows={2}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              data-lpignore="true"
              data-form-type="other"
              placeholder={excerpt || 'Search snippet fallback...'}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
