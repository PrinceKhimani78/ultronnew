'use client';

import { CheckCircle2, Save, Undo2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type CompanyInfo = {
  business_name: string;
  legal_name: string;
  tagline: string;
  short_description: string;
  primary_email: string;
  secondary_email: string;
  primary_phone: string;
  whatsapp_number: string;
  office_address: string;
  city: string;
  state_emirate: string;
  country: string;
  postal_code: string;
  google_maps_url: string;
  google_maps_embed_url: string;
  working_hours: string;
};

type SocialLinks = {
  linkedin_url: string;
  instagram_url: string;
  facebook_url: string;
  youtube_url: string;
  twitter_url: string;
};

type ContactDetails = {
  header_phone: string;
  header_email: string;
  footer_phone: string;
  footer_email: string;
  footer_address: string;
  footer_copyright_text: string;
  footer_short_description: string;
};

type CtaSettings = {
  default_cta_label: string;
  default_cta_destination: string;
  consultation_email_recipient: string;
  form_notification_email: string;
  whatsapp_cta_number: string;
};

type SettingsMap = {
  company_info?: CompanyInfo;
  social_links?: SocialLinks;
  contact_details?: ContactDetails;
  cta_settings?: CtaSettings;
};

export default function WebsiteSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    'general' | 'social' | 'header_footer' | 'cta'
  >('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    business_name: 'Ultron Financials',
    legal_name: 'Ultron Financials',
    tagline: 'UAE company formation, banking and compliance',
    short_description:
      'Ultron Financials is a corporate advisory firm in the UAE delivering end-to-end business advisory for banking, company setup, compliance and financial structuring.',
    primary_email: 'lorem@ultronfinancials.com',
    secondary_email: 'info@ultronfinancials.com',
    primary_phone: '98765 43210',
    whatsapp_number: '98765 43210',
    office_address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    city: 'Dubai',
    state_emirate: 'Dubai',
    country: 'AE',
    postal_code: '00000',
    google_maps_url: '',
    google_maps_embed_url: '',
    working_hours: 'Monday - Friday: 9:00 AM - 6:00 PM GST',
  });

  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    linkedin_url: 'https://www.linkedin.com/company/ultron-financials',
    instagram_url: '',
    facebook_url: '',
    youtube_url: '',
    twitter_url: '',
  });

  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    header_phone: '98765 43210',
    header_email: 'lorem@ultronfinancials.com',
    footer_phone: '98765 43210',
    footer_email: 'lorem@ultronfinancials.com',
    footer_address:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Dubai, UAE',
    footer_copyright_text: 'Ultron Financials. All rights reserved.',
    footer_short_description:
      'UAE corporate advisory firm delivering business banking, setup, finance, and regulatory compliance.',
  });

  const [ctaSettings, setCtaSettings] = useState<CtaSettings>({
    default_cta_label: 'Book a call',
    default_cta_destination: '#contact',
    consultation_email_recipient: 'info@ultronfinancials.com',
    form_notification_email: 'info@ultronfinancials.com',
    whatsapp_cta_number: '9876543210',
  });

  // Backup for reset
  const [initialData, setInitialData] = useState<SettingsMap | null>(null);

  useEffect(() => {
    let ignore = false;
    async function fetchSettings() {
      try {
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        if (!ignore && data.settings) {
          const settings = data.settings as SettingsMap;
          if (settings.company_info)
            setCompanyInfo((prev) => ({ ...prev, ...settings.company_info }));
          if (settings.social_links)
            setSocialLinks((prev) => ({ ...prev, ...settings.social_links }));
          if (settings.contact_details)
            setContactDetails((prev) => ({
              ...prev,
              ...settings.contact_details,
            }));
          if (settings.cta_settings)
            setCtaSettings((prev) => ({ ...prev, ...settings.cta_settings }));

          setInitialData(settings);
        }
      } catch {
        if (!ignore) setError('Failed to fetch settings');
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchSettings();
    return () => {
      ignore = true;
    };
  }, []);

  const handleReset = () => {
    if (!initialData) return;
    if (initialData.company_info) setCompanyInfo(initialData.company_info);
    if (initialData.social_links) setSocialLinks(initialData.social_links);
    if (initialData.contact_details)
      setContactDetails(initialData.contact_details);
    if (initialData.cta_settings) setCtaSettings(initialData.cta_settings);
    setSuccessMessage('Unsaved changes reset to last saved state.');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleSave = async () => {
    setError(null);
    setSaving(true);
    setSuccessMessage(null);

    try {
      let key = 'company_info';
      let group = 'general';
      let value: Record<string, string> = companyInfo;

      if (activeTab === 'social') {
        key = 'social_links';
        group = 'social';
        value = socialLinks;
      } else if (activeTab === 'header_footer') {
        key = 'contact_details';
        group = 'header_footer';
        value = contactDetails;
      } else if (activeTab === 'cta') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (
          ctaSettings.form_notification_email &&
          !emailRegex.test(ctaSettings.form_notification_email.trim())
        ) {
          throw new Error(
            'Please enter a valid notification recipient email address.',
          );
        }
        if (
          ctaSettings.consultation_email_recipient &&
          !emailRegex.test(ctaSettings.consultation_email_recipient.trim())
        ) {
          throw new Error(
            'Please enter a valid consultation recipient email address.',
          );
        }
        key = 'cta_settings';
        group = 'cta_forms';
        value = ctaSettings;
      }

      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, group, value }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update settings');
      }

      setSuccessMessage('Website settings successfully updated!');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Error saving settings.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12 text-sm text-slate-500">
        Loading website settings...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Website Settings & Identity
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Global company information, contact details, social links, and CTA
            configurations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50"
          >
            <Undo2 className="h-4 w-4" />
            Reset Unsaved Changes
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#035551] px-4 py-2 text-xs font-bold text-white uppercase shadow-xs hover:bg-[#023F3D] disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-800">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {successMessage}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
          {error}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('general')}
          className={`rounded-lg px-4 py-2 text-xs font-bold uppercase transition-all ${
            activeTab === 'general'
              ? 'bg-[#035551] text-white shadow-xs'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          General Information
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('social')}
          className={`rounded-lg px-4 py-2 text-xs font-bold uppercase transition-all ${
            activeTab === 'social'
              ? 'bg-[#035551] text-white shadow-xs'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          Social Media
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('header_footer')}
          className={`rounded-lg px-4 py-2 text-xs font-bold uppercase transition-all ${
            activeTab === 'header_footer'
              ? 'bg-[#035551] text-white shadow-xs'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          Header & Footer
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cta')}
          className={`rounded-lg px-4 py-2 text-xs font-bold uppercase transition-all ${
            activeTab === 'cta'
              ? 'bg-[#035551] text-white shadow-xs'
              : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          CTA & Forms
        </button>
      </div>

      {/* Tab Panels */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
        {/* Tab 1: General Info */}
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                Business Name
              </label>
              <input
                type="text"
                value={companyInfo.business_name}
                onChange={(e) =>
                  setCompanyInfo({
                    ...companyInfo,
                    business_name: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                Legal Entity Name
              </label>
              <input
                type="text"
                value={companyInfo.legal_name}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, legal_name: e.target.value })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                Business Description
              </label>
              <textarea
                rows={2}
                value={companyInfo.short_description}
                onChange={(e) =>
                  setCompanyInfo({
                    ...companyInfo,
                    short_description: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                Primary Contact Email
              </label>
              <input
                type="email"
                value={companyInfo.primary_email}
                onChange={(e) =>
                  setCompanyInfo({
                    ...companyInfo,
                    primary_email: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                Primary Phone Number
              </label>
              <input
                type="text"
                value={companyInfo.primary_phone}
                onChange={(e) =>
                  setCompanyInfo({
                    ...companyInfo,
                    primary_phone: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                WhatsApp Business Number
              </label>
              <input
                type="text"
                value={companyInfo.whatsapp_number}
                onChange={(e) =>
                  setCompanyInfo({
                    ...companyInfo,
                    whatsapp_number: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                Working Hours
              </label>
              <input
                type="text"
                value={companyInfo.working_hours}
                onChange={(e) =>
                  setCompanyInfo({
                    ...companyInfo,
                    working_hours: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                Office Street Address
              </label>
              <input
                type="text"
                value={companyInfo.office_address}
                onChange={(e) =>
                  setCompanyInfo({
                    ...companyInfo,
                    office_address: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                City / Locality
              </label>
              <input
                type="text"
                value={companyInfo.city}
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, city: e.target.value })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                State / Emirate
              </label>
              <input
                type="text"
                value={companyInfo.state_emirate}
                onChange={(e) =>
                  setCompanyInfo({
                    ...companyInfo,
                    state_emirate: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Social Media */}
        {activeTab === 'social' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                LinkedIn Company Page URL
              </label>
              <input
                type="url"
                value={socialLinks.linkedin_url}
                onChange={(e) =>
                  setSocialLinks({
                    ...socialLinks,
                    linkedin_url: e.target.value,
                  })
                }
                placeholder="https://www.linkedin.com/company/..."
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                Instagram URL
              </label>
              <input
                type="url"
                value={socialLinks.instagram_url}
                onChange={(e) =>
                  setSocialLinks({
                    ...socialLinks,
                    instagram_url: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                X / Twitter URL
              </label>
              <input
                type="url"
                value={socialLinks.twitter_url}
                onChange={(e) =>
                  setSocialLinks({
                    ...socialLinks,
                    twitter_url: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Header & Footer */}
        {activeTab === 'header_footer' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                Header Display Phone
              </label>
              <input
                type="text"
                value={contactDetails.header_phone}
                onChange={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    header_phone: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                Header Display Email
              </label>
              <input
                type="email"
                value={contactDetails.header_email}
                onChange={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    header_email: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                Footer Address Summary
              </label>
              <input
                type="text"
                value={contactDetails.footer_address}
                onChange={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    footer_address: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                Footer Copyright Text
              </label>
              <input
                type="text"
                value={contactDetails.footer_copyright_text}
                onChange={(e) =>
                  setContactDetails({
                    ...contactDetails,
                    footer_copyright_text: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Tab 4: CTA & Forms */}
        {activeTab === 'cta' && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                Default CTA Button Text
              </label>
              <input
                type="text"
                value={ctaSettings.default_cta_label}
                onChange={(e) =>
                  setCtaSettings({
                    ...ctaSettings,
                    default_cta_label: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                Default CTA Target Link
              </label>
              <input
                type="text"
                value={ctaSettings.default_cta_destination}
                onChange={(e) =>
                  setCtaSettings({
                    ...ctaSettings,
                    default_cta_destination: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                Form Notification Recipient Email
              </label>
              <input
                type="email"
                value={ctaSettings.form_notification_email}
                onChange={(e) =>
                  setCtaSettings({
                    ...ctaSettings,
                    form_notification_email: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                WhatsApp CTA Phone Number
              </label>
              <input
                type="text"
                value={ctaSettings.whatsapp_cta_number}
                onChange={(e) =>
                  setCtaSettings({
                    ...ctaSettings,
                    whatsapp_cta_number: e.target.value,
                  })
                }
                className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#035551] focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
