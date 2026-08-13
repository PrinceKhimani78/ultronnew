'use client';

import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ImageUploader } from '@/components/admin/ImageUploader';

export default function EditTeamMemberPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [showEmailPublicly, setShowEmailPublicly] = useState(false);
  const [showPhonePublicly, setShowPhonePublicly] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [displayOrder, setDisplayOrder] = useState('1');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    async function fetchMember() {
      try {
        const res = await fetch(`/api/admin/team/${id}`);
        const data = await res.json();
        if (!ignore && data.member) {
          const m = data.member;
          setFullName(m.full_name);
          setJobTitle(m.job_title);
          setProfileImageUrl(m.profile_image_url || '');
          setImageAlt(m.image_alt || '');
          setBio(m.bio || '');
          setEmail(m.email || '');
          setPhone(m.phone || '');
          setLinkedinUrl(m.linkedin_url || '');
          setShowEmailPublicly(!!m.show_email_publicly);
          setShowPhonePublicly(!!m.show_phone_publicly);
          setIsVisible(!!m.is_visible);
          setDisplayOrder(m.display_order?.toString() || '0');
        }
      } catch {
        if (!ignore) setError('Failed to load team member');
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    if (id) fetchMember();
    return () => {
      ignore = true;
    };
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !jobTitle.trim()) {
      setError('Full name and job title are required.');
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch(`/api/admin/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          job_title: jobTitle,
          profile_image_url: profileImageUrl,
          image_alt: imageAlt || fullName,
          bio,
          email,
          phone,
          linkedin_url: linkedinUrl,
          show_email_publicly: showEmailPublicly,
          show_phone_publicly: showPhonePublicly,
          is_visible: isVisible,
          display_order: Number(displayOrder) || 0,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update team member.');
      }

      router.push('/admin/team');
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
        Loading team member...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/team"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 uppercase hover:text-[#035551]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Team List
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-slate-900">
            Edit Team Member: {fullName}
          </h2>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#035551] px-4 py-2 text-xs font-bold text-white uppercase shadow-xs hover:bg-[#023F3D] disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            Update Member
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
              Full Name *
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              Job Title / Designation *
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <ImageUploader
              value={profileImageUrl}
              altValue={imageAlt}
              folder="team"
              onChange={setProfileImageUrl}
              onAltChange={setImageAlt}
              label="Profile Photograph"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              Short Biography
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              Phone Number (Optional)
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
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
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:ring-1 focus:ring-[#035551] focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-6 border-t border-slate-200 pt-2 sm:col-span-2">
            <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-700 uppercase">
              <input
                type="checkbox"
                checked={isVisible}
                onChange={(e) => setIsVisible(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#035551] focus:ring-[#035551]"
              />
              Show Member on Public Website
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-700 uppercase">
              <input
                type="checkbox"
                checked={showEmailPublicly}
                onChange={(e) => setShowEmailPublicly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#035551] focus:ring-[#035551]"
              />
              Show Email Publicly
            </label>

            <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-slate-700 uppercase">
              <input
                type="checkbox"
                checked={showPhonePublicly}
                onChange={(e) => setShowPhonePublicly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#035551] focus:ring-[#035551]"
              />
              Show Phone Publicly
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
