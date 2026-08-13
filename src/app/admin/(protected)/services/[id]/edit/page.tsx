'use client';

import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Plus,
  Save,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { slugify } from '@/lib/cms-sanitizer';

type ServiceProcessStepInput = {
  step: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

type ServiceFaqInput = {
  question: string;
  answer: string;
};

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Accordion active tab state
  const [activeTab, setActiveTab] = useState<string>('basic');

  // Basic Scalar Fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroDescription, setHeroDescription] = useState('');
  const [ctaLabel, setCtaLabel] = useState('Talk to Us');
  const [ctaUrl, setCtaUrl] = useState('#contact');
  const [displayOrder, setDisplayOrder] = useState('1');
  const [status, setStatus] = useState<'draft' | 'published'>('published');
  const [showInNav, setShowInNav] = useState(true);
  const [showOnHomepage, setShowOnHomepage] = useState(true);
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Structured Content Block Fields
  const [advantagesHeadline, setAdvantagesHeadline] = useState('');
  const [advantagesSubtext, setAdvantagesSubtext] = useState('');

  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState('');

  const [processHeadline, setProcessHeadline] = useState('');
  const [processSubtext, setProcessSubtext] = useState('');
  const [processSteps, setProcessSteps] = useState<ServiceProcessStepInput[]>(
    [],
  );

  const [whyUltronIntro, setWhyUltronIntro] = useState('');
  const [whyUltronPoints, setWhyUltronPoints] = useState<string[]>([]);
  const [newWhyPoint, setNewWhyPoint] = useState('');

  const [faqs, setFaqs] = useState<ServiceFaqInput[]>([]);

  const [ctaHeadline, setCtaHeadline] = useState('');
  const [ctaSubtext, setCtaSubtext] = useState('');

  useEffect(() => {
    let ignore = false;
    async function fetchService() {
      try {
        setLoading(true);
        const res = await fetch(`/api/admin/services/${id}`);
        const data = await res.json();
        if (!ignore && data.service) {
          const s = data.service;
          setName(s.name || '');
          setSlug(s.slug || '');
          setShortDescription(s.short_description || '');
          setHeroTitle(s.hero_title || '');
          setHeroDescription(s.hero_description || '');
          setCtaLabel(s.cta_label || 'Talk to Us');
          setCtaUrl(s.cta_url || '#contact');
          setDisplayOrder(s.display_order?.toString() || '1');
          setStatus(s.status || 'published');
          setShowInNav(!!s.show_in_navigation);
          setShowOnHomepage(!!s.show_on_homepage);
          setSeoTitle(s.seo_title || '');
          setMetaDescription(s.meta_description || '');

          // Extract content_blocks JSON
          const cb = (s.content_blocks || {}) as Record<string, unknown>;
          if (cb.advantages && typeof cb.advantages === 'object') {
            const adv = cb.advantages as Record<string, string>;
            setAdvantagesHeadline(adv.headline || '');
            setAdvantagesSubtext(adv.subtext || '');
          }
          if (Array.isArray(cb.benefits)) {
            setBenefits(cb.benefits.map((b) => String(b)));
          }
          if (cb.process && typeof cb.process === 'object') {
            const pr = cb.process as Record<string, unknown>;
            setProcessHeadline(String(pr.headline || ''));
            setProcessSubtext(String(pr.subtext || ''));
            if (Array.isArray(pr.steps)) {
              setProcessSteps(
                pr.steps.map((st: Record<string, unknown>) => ({
                  step: String(st.step || ''),
                  title: String(st.title || ''),
                  description: String(st.description || st.desc || ''),
                  imageSrc: String(
                    st.imageSrc || '/brand/process-consultation.webp',
                  ),
                  imageAlt: String(st.imageAlt || st.title || ''),
                })),
              );
            }
          }
          if (cb.whyUltron && typeof cb.whyUltron === 'object') {
            const wu = cb.whyUltron as Record<string, unknown>;
            setWhyUltronIntro(String(wu.introduction || ''));
            if (Array.isArray(wu.points)) {
              setWhyUltronPoints(wu.points.map((pt) => String(pt)));
            }
          }
          if (Array.isArray(cb.faqs)) {
            setFaqs(
              cb.faqs.map((f: Record<string, unknown>) => ({
                question: String(f.question || f.q || ''),
                answer: String(f.answer || f.a || ''),
              })),
            );
          }
          if (cb.cta && typeof cb.cta === 'object') {
            const ctaObj = cb.cta as Record<string, string>;
            setCtaHeadline(ctaObj.headline || '');
            setCtaSubtext(ctaObj.subtext || '');
          }
        }
      } catch {
        if (!ignore) setError('Failed to load service details.');
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    if (id) fetchService();
    return () => {
      ignore = true;
    };
  }, [id]);

  // Benefit List Controls
  const addBenefit = () => {
    if (!newBenefit.trim()) return;
    setBenefits((prev) => [...prev, newBenefit.trim()]);
    setNewBenefit('');
  };
  const removeBenefit = (index: number) => {
    setBenefits((prev) => prev.filter((_, i) => i !== index));
  };
  const moveBenefit = (index: number, direction: 'up' | 'down') => {
    setBenefits((prev) => {
      const copy = [...prev];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= copy.length) return copy;
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  };

  // Why Ultron Points Controls
  const addWhyPoint = () => {
    if (!newWhyPoint.trim()) return;
    setWhyUltronPoints((prev) => [...prev, newWhyPoint.trim()]);
    setNewWhyPoint('');
  };
  const removeWhyPoint = (index: number) => {
    setWhyUltronPoints((prev) => prev.filter((_, i) => i !== index));
  };
  const moveWhyPoint = (index: number, direction: 'up' | 'down') => {
    setWhyUltronPoints((prev) => {
      const copy = [...prev];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= copy.length) return copy;
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  };

  // Process Step Controls
  const addProcessStep = () => {
    const nextNum = processSteps.length + 1;
    setProcessSteps((prev) => [
      ...prev,
      {
        step: `STEP 0${nextNum}`,
        title: 'New Step Title',
        description: 'New step description.',
        imageSrc: '/brand/process-consultation.webp',
        imageAlt: 'Step visual',
      },
    ]);
  };
  const updateProcessStep = (
    index: number,
    field: keyof ServiceProcessStepInput,
    val: string,
  ) => {
    setProcessSteps((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };
  const removeProcessStep = (index: number) => {
    if (confirm('Are you sure you want to remove this process step?')) {
      setProcessSteps((prev) => prev.filter((_, i) => i !== index));
    }
  };
  const moveProcessStep = (index: number, direction: 'up' | 'down') => {
    setProcessSteps((prev) => {
      const copy = [...prev];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= copy.length) return copy;
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  };

  // FAQ Controls
  const addFaq = () => {
    setFaqs((prev) => [
      ...prev,
      { question: 'New Question?', answer: 'New Answer text.' },
    ]);
  };
  const updateFaq = (
    index: number,
    field: keyof ServiceFaqInput,
    val: string,
  ) => {
    setFaqs((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };
  const removeFaq = (index: number) => {
    if (confirm('Are you sure you want to remove this FAQ entry?')) {
      setFaqs((prev) => prev.filter((_, i) => i !== index));
    }
  };
  const moveFaq = (index: number, direction: 'up' | 'down') => {
    setFaqs((prev) => {
      const copy = [...prev];
      const target = direction === 'up' ? index - 1 : index + 1;
      if (target < 0 || target >= copy.length) return copy;
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !shortDescription.trim()) {
      setError('Service name and short description are required.');
      return;
    }

    setError(null);
    setSuccess(null);
    setSubmitting(true);

    const contentBlocksPayload = {
      advantages: {
        headline: advantagesHeadline,
        subtext: advantagesSubtext,
      },
      benefits,
      process: {
        headline: processHeadline,
        subtext: processSubtext,
        steps: processSteps,
      },
      whyUltron: {
        introduction: whyUltronIntro,
        points: whyUltronPoints,
      },
      faqs,
      cta: {
        headline: ctaHeadline,
        subtext: ctaSubtext,
        buttonLabel: ctaLabel,
      },
    };

    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          slug,
          short_description: shortDescription,
          hero_title: heroTitle || name,
          hero_description: heroDescription || shortDescription,
          cta_label: ctaLabel,
          cta_url: ctaUrl,
          display_order: Number(displayOrder) || 1,
          status,
          show_in_navigation: showInNav,
          show_on_homepage: showOnHomepage,
          seo_title: seoTitle || name,
          meta_description: metaDescription || shortDescription,
          content_blocks: contentBlocksPayload,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update service.');
      }

      setSuccess('Service updated successfully!');
      setTimeout(() => setSuccess(null), 4000);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An error occurred.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12 text-sm text-slate-500">
        Loading complete service details...
      </div>
    );
  }

  const toggleTab = (tab: string) => {
    setActiveTab((prev) => (prev === tab ? '' : tab));
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-20">
      {/* Top Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/admin/services"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 uppercase hover:text-[#035551]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Services Catalogue
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href={`/services/${slug}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 uppercase hover:bg-slate-50"
          >
            Preview Page
          </Link>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#035551] px-5 py-2 text-xs font-bold text-white uppercase shadow-xs hover:bg-[#023F3D] disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {submitting ? 'Saving Changes...' : 'Update Service'}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700 shadow-xs">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 shadow-xs">
          {success}
        </div>
      )}

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* SECTION 1: BASIC INFORMATION */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <button
            type="button"
            onClick={() => toggleTab('basic')}
            className="font-display flex w-full items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4 text-left text-base font-bold text-slate-900"
          >
            <span>1. Basic Information</span>
            {activeTab === 'basic' ? (
              <ChevronUp className="h-5 w-5 text-slate-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-500" />
            )}
          </button>

          {activeTab === 'basic' && (
            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                  Service Title *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 font-mono text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                  Publish Status
                </label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as 'draft' | 'published')
                  }
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                  Catalogue Display Order
                </label>
                <input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: HOMEPAGE CARD & HERO */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <button
            type="button"
            onClick={() => toggleTab('hero')}
            className="font-display flex w-full items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4 text-left text-base font-bold text-slate-900"
          >
            <span>2. Homepage Card & Hero Section</span>
            {activeTab === 'hero' ? (
              <ChevronUp className="h-5 w-5 text-slate-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-500" />
            )}
          </button>

          {activeTab === 'hero' && (
            <div className="space-y-6 p-6">
              <div>
                <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                  Short Description (Homepage Card & Meta) *
                </label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                    Hero Headline
                  </label>
                  <input
                    type="text"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                    Hero Tagline
                  </label>
                  <input
                    type="text"
                    value={heroDescription}
                    onChange={(e) => setHeroDescription(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={ctaLabel}
                    onChange={(e) => setCtaLabel(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                    CTA Destination Link
                  </label>
                  <input
                    type="text"
                    value={ctaUrl}
                    onChange={(e) => setCtaUrl(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: CORE ADVANTAGES & DELIVERABLES */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <button
            type="button"
            onClick={() => toggleTab('advantages')}
            className="font-display flex w-full items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4 text-left text-base font-bold text-slate-900"
          >
            <span>3. Core Advantages & Deliverables Breakdown</span>
            {activeTab === 'advantages' ? (
              <ChevronUp className="h-5 w-5 text-slate-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-500" />
            )}
          </button>

          {activeTab === 'advantages' && (
            <div className="space-y-6 p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                    Advantages Section Headline
                  </label>
                  <input
                    type="text"
                    value={advantagesHeadline}
                    onChange={(e) => setAdvantagesHeadline(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                    Advantages Subtext
                  </label>
                  <input
                    type="text"
                    value={advantagesSubtext}
                    onChange={(e) => setAdvantagesSubtext(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
                  />
                </div>
              </div>

              {/* Repeatable Deliverable Benefits List */}
              <div className="space-y-4 border-t border-slate-200 pt-4">
                <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                  Deliverable Points ({benefits.length})
                </label>

                <div className="space-y-3">
                  {benefits.map((b, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
                    >
                      <span className="shrink-0 font-mono text-xs font-bold text-slate-500">
                        0{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={b}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBenefits((prev) => {
                            const copy = [...prev];
                            copy[idx] = val;
                            return copy;
                          });
                        }}
                        className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
                      />
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveBenefit(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveBenefit(idx, 'down')}
                          disabled={idx === benefits.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeBenefit(idx)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    placeholder="Add new deliverable point..."
                    className="flex-1 rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addBenefit}
                    className="inline-flex items-center gap-1 rounded-lg bg-[#035551] px-4 py-2 text-xs font-bold text-white uppercase hover:bg-[#023F3D]"
                  >
                    <Plus className="h-4 w-4" /> Add Deliverable
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 4: PROCESS STEPS / HOW ULTRON WORKS */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <button
            type="button"
            onClick={() => toggleTab('process')}
            className="font-display flex w-full items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4 text-left text-base font-bold text-slate-900"
          >
            <span>4. How Ultron Works / Process Steps</span>
            {activeTab === 'process' ? (
              <ChevronUp className="h-5 w-5 text-slate-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-500" />
            )}
          </button>

          {activeTab === 'process' && (
            <div className="space-y-6 p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                    Process Section Headline
                  </label>
                  <input
                    type="text"
                    value={processHeadline}
                    onChange={(e) => setProcessHeadline(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                    Process Subtext
                  </label>
                  <input
                    type="text"
                    value={processSubtext}
                    onChange={(e) => setProcessSubtext(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
                  />
                </div>
              </div>

              {/* Repeatable Process Steps */}
              <div className="space-y-4 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                    Process Steps ({processSteps.length})
                  </label>
                  <button
                    type="button"
                    onClick={addProcessStep}
                    className="inline-flex items-center gap-1 rounded-lg bg-[#035551] px-3 py-1.5 text-xs font-bold text-white uppercase hover:bg-[#023F3D]"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add Process Step
                  </button>
                </div>

                <div className="space-y-4">
                  {processSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="font-mono text-xs font-bold text-[#035551]">
                          Step {idx + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveProcessStep(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveProcessStep(idx, 'down')}
                            disabled={idx === processSteps.length - 1}
                            className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeProcessStep(idx)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase">
                            Step Badge
                          </label>
                          <input
                            type="text"
                            value={step.step}
                            onChange={(e) =>
                              updateProcessStep(idx, 'step', e.target.value)
                            }
                            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase">
                            Title
                          </label>
                          <input
                            type="text"
                            value={step.title}
                            onChange={(e) =>
                              updateProcessStep(idx, 'title', e.target.value)
                            }
                            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 uppercase">
                            Image Asset Path
                          </label>
                          <input
                            type="text"
                            value={step.imageSrc}
                            onChange={(e) =>
                              updateProcessStep(idx, 'imageSrc', e.target.value)
                            }
                            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 font-mono text-xs text-slate-900 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase">
                          Description
                        </label>
                        <input
                          type="text"
                          value={step.description}
                          onChange={(e) =>
                            updateProcessStep(
                              idx,
                              'description',
                              e.target.value,
                            )
                          }
                          className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 5: WHY CHOOSE ULTRON */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <button
            type="button"
            onClick={() => toggleTab('whyUltron')}
            className="font-display flex w-full items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4 text-left text-base font-bold text-slate-900"
          >
            <span>5. Why Choose Ultron Points</span>
            {activeTab === 'whyUltron' ? (
              <ChevronUp className="h-5 w-5 text-slate-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-500" />
            )}
          </button>

          {activeTab === 'whyUltron' && (
            <div className="space-y-6 p-6">
              <div>
                <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                  Introduction Paragraph
                </label>
                <textarea
                  rows={2}
                  value={whyUltronIntro}
                  onChange={(e) => setWhyUltronIntro(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
                />
              </div>

              {/* Repeatable Value Points */}
              <div className="space-y-4 border-t border-slate-200 pt-4">
                <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                  Key Differentiator Points ({whyUltronPoints.length})
                </label>

                <div className="space-y-3">
                  {whyUltronPoints.map((pt, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
                    >
                      <span className="shrink-0 font-mono text-xs font-bold text-slate-500">
                        #{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={pt}
                        onChange={(e) => {
                          const val = e.target.value;
                          setWhyUltronPoints((prev) => {
                            const copy = [...prev];
                            copy[idx] = val;
                            return copy;
                          });
                        }}
                        className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
                      />
                      <div className="flex shrink-0 items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveWhyPoint(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveWhyPoint(idx, 'down')}
                          disabled={idx === whyUltronPoints.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeWhyPoint(idx)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newWhyPoint}
                    onChange={(e) => setNewWhyPoint(e.target.value)}
                    placeholder="Add new differentiator point..."
                    className="flex-1 rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={addWhyPoint}
                    className="inline-flex items-center gap-1 rounded-lg bg-[#035551] px-4 py-2 text-xs font-bold text-white uppercase hover:bg-[#023F3D]"
                  >
                    <Plus className="h-4 w-4" /> Add Point
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 6: FAQ MANAGEMENT */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <button
            type="button"
            onClick={() => toggleTab('faqs')}
            className="font-display flex w-full items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4 text-left text-base font-bold text-slate-900"
          >
            <span>6. FAQ Section ({faqs.length})</span>
            {activeTab === 'faqs' ? (
              <ChevronUp className="h-5 w-5 text-slate-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-500" />
            )}
          </button>

          {activeTab === 'faqs' && (
            <div className="space-y-6 p-6">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                  Service FAQs ({faqs.length})
                </label>
                <button
                  type="button"
                  onClick={addFaq}
                  className="inline-flex items-center gap-1 rounded-lg bg-[#035551] px-3 py-1.5 text-xs font-bold text-white uppercase hover:bg-[#023F3D]"
                >
                  <Plus className="h-3.5 w-3.5" /> Add FAQ Item
                </button>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <span className="font-mono text-xs font-bold text-[#035551]">
                        Q{idx + 1}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveFaq(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveFaq(idx, 'down')}
                          disabled={idx === faqs.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFaq(idx)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase">
                        Question
                      </label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) =>
                          updateFaq(idx, 'question', e.target.value)
                        }
                        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase">
                        Answer
                      </label>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) =>
                          updateFaq(idx, 'answer', e.target.value)
                        }
                        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SECTION 7: FINAL CTA BAND & VISIBILITY & SEO */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
          <button
            type="button"
            onClick={() => toggleTab('ctaSeo')}
            className="font-display flex w-full items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4 text-left text-base font-bold text-slate-900"
          >
            <span>7. Final CTA, Visibility & SEO Settings</span>
            {activeTab === 'ctaSeo' ? (
              <ChevronUp className="h-5 w-5 text-slate-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-slate-500" />
            )}
          </button>

          {activeTab === 'ctaSeo' && (
            <div className="space-y-6 p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                    CTA Section Headline
                  </label>
                  <input
                    type="text"
                    value={ctaHeadline}
                    onChange={(e) => setCtaHeadline(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                    CTA Section Subtext
                  </label>
                  <input
                    type="text"
                    value={ctaSubtext}
                    onChange={(e) => setCtaSubtext(e.target.value)}
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-6 border-t border-slate-200 pt-2">
                <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-700 uppercase">
                  <input
                    type="checkbox"
                    checked={showInNav}
                    onChange={(e) => setShowInNav(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#035551] focus:ring-[#035551]"
                  />
                  Show in Header Navigation Menu
                </label>

                <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-700 uppercase">
                  <input
                    type="checkbox"
                    checked={showOnHomepage}
                    onChange={(e) => setShowOnHomepage(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#035551] focus:ring-[#035551]"
                  />
                  Show on Homepage Services Section
                </label>
              </div>

              <div className="space-y-4 border-t border-slate-200 pt-4">
                <h3 className="font-display text-xs font-bold text-slate-900 uppercase">
                  SEO Settings
                </h3>
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                    SEO Page Title
                  </label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
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
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Save Bar */}
        <div className="sticky bottom-4 z-40 flex items-center justify-between rounded-xl border border-slate-200 bg-white/95 px-6 py-3.5 shadow-lg backdrop-blur-md">
          <span className="text-xs font-semibold text-slate-600">
            Editing Service: <strong className="text-slate-900">{name}</strong>
          </span>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#035551] px-5 py-2.5 text-xs font-bold text-white uppercase shadow-xs hover:bg-[#023F3D] disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {submitting ? 'Saving Changes...' : 'Update Service'}
          </button>
        </div>
      </form>
    </div>
  );
}
