'use client';

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { slugify } from '@/lib/cms-sanitizer';

export default function NewServicePage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroDescription, setHeroDescription] = useState('');
  const [ctaLabel, setCtaLabel] = useState('Talk to Us');
  const [ctaUrl, setCtaUrl] = useState('#contact');
  const [displayOrder, setDisplayOrder] = useState('1');
  const status = 'published';
  const [showInNav, setShowInNav] = useState(true);
  const [showOnHomepage, setShowOnHomepage] = useState(true);
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!slug || slug === slugify(name)) {
      setSlug(slugify(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !shortDescription.trim()) {
      setError('Service name and short description are required.');
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          slug,
          short_description: shortDescription,
          hero_title: heroTitle || name,
          hero_description: heroDescription || shortDescription,
          cta_label: ctaLabel,
          cta_url: ctaUrl,
          display_order: Number(displayOrder) || 0,
          status,
          show_in_navigation: showInNav,
          show_on_homepage: showOnHomepage,
          seo_title: seoTitle || name,
          meta_description: metaDescription || shortDescription,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create service.');
      }

      router.push('/admin/services');
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
      <div className="flex items-center justify-between">
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 uppercase hover:text-[#035551]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Services
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        data-lpignore="true"
        data-form-type="other"
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-slate-900">
            Add New Service
          </h2>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#035551] px-4 py-2 text-xs font-bold text-white uppercase shadow-xs hover:bg-[#023F3D] disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            Save Service
          </button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-xs font-semibold text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              Service Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              data-lpignore="true"
              data-form-type="other"
              placeholder="e.g. Corporate Tax Advisory"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
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
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              Short Card Description *
            </label>
            <textarea
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              data-lpignore="true"
              data-form-type="other"
              placeholder="Brief description displayed on service cards..."
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              Hero Section Heading
            </label>
            <input
              type="text"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              data-lpignore="true"
              data-form-type="other"
              placeholder="Headline for service page hero..."
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              Display Order
            </label>
            <input
              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(e.target.value)}
              data-lpignore="true"
              data-form-type="other"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              Hero Section Subtext
            </label>
            <textarea
              rows={2}
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              data-lpignore="true"
              data-form-type="other"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              CTA Button Label
            </label>
            <input
              type="text"
              value={ctaLabel}
              onChange={(e) => setCtaLabel(e.target.value)}
              data-lpignore="true"
              data-form-type="other"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              CTA Target Link
            </label>
            <input
              type="text"
              value={ctaUrl}
              onChange={(e) => setCtaUrl(e.target.value)}
              data-lpignore="true"
              data-form-type="other"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-6 pt-2 sm:col-span-2">
            <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-700 uppercase">
              <input
                type="checkbox"
                checked={showInNav}
                onChange={(e) => setShowInNav(e.target.checked)}
                data-lpignore="true"
                data-form-type="other"
                className="h-4 w-4 rounded border-slate-300 text-[#035551] focus:ring-[#035551]"
              />
              Show in Header Navigation Menu
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-700 uppercase">
              <input
                type="checkbox"
                checked={showOnHomepage}
                onChange={(e) => setShowOnHomepage(e.target.checked)}
                data-lpignore="true"
                data-form-type="other"
                className="h-4 w-4 rounded border-slate-300 text-[#035551] focus:ring-[#035551]"
              />
              Show on Homepage Services Section
            </label>
          </div>
        </div>

        {/* SEO Section */}
        <div className="space-y-4 border-t border-slate-200 pt-6">
          <h3 className="font-display text-sm font-bold text-slate-900 uppercase">
            SEO Settings
          </h3>
          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              SEO Title
            </label>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              data-lpignore="true"
              data-form-type="other"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              Meta Description
            </label>
            <textarea
              rows={2}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              data-lpignore="true"
              data-form-type="other"
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
