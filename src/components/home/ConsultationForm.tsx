'use client';

import { CheckCircle2, Loader2 } from 'lucide-react';
import React, { useState } from 'react';

import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { CTA_CONTACT } from '@/content/home';
import { SERVICES } from '@/content/services';
import { useHasMounted } from '@/hooks/useHasMounted';
import { cn } from '@/lib/utils';

const CREAM = '#FDFBEE';

const FIELD_CLASS =
  'h-11 w-full rounded-[10px] border-none px-3.5 text-[15px] outline-none ' +
  'ease-house transition-all focus:shadow-[inset_0_0_0_2px_#FDFBEE]';

const FIELD_STYLE = {
  backgroundColor: 'rgba(255,255,255,0.1)',
  boxShadow: `inset 0 0 0 1px ${CREAM}`,
  color: CREAM,
} as const;

const FIELD_COUNT = 6;

const NO_AUTOFILL_UI = {
  'data-lpignore': 'true',
  'data-1p-ignore': 'true',
  'data-bwignore': 'true',
  'data-form-type': 'other',
  'data-private': 'true',
} as const;

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[14px] leading-none font-normal uppercase"
      style={{ color: CREAM }}
    >
      {children}
      {required ? (
        <>
          <span aria-hidden="true"> *</span>
          <span className="sr-only"> (required)</span>
        </>
      ) : null}
    </label>
  );
}

type ConsultationFormProps = {
  defaultService?: string;
  formTitle?: string;
  submitLabel?: string;
  className?: string;
};

export function ConsultationForm({
  defaultService,
  formTitle = CTA_CONTACT.form.title,
  submitLabel = CTA_CONTACT.form.submitLabel,
  className,
}: ConsultationFormProps) {
  const hasMounted = useHasMounted();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: defaultService || '',
    message: '',
    website: '', // Honeypot
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const submittedPayload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      service: formData.service,
      message: formData.message,
      website: formData.website,
    };

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: submittedPayload.name,
          email: submittedPayload.email,
          phone: submittedPayload.phone,
          company: submittedPayload.company,
          businessType: submittedPayload.company,
          service: submittedPayload.service,
          message: submittedPayload.message,
          website: submittedPayload.website,
          formName: formTitle || 'Consultation Form',
          sourcePage:
            typeof window !== 'undefined'
              ? window.location.pathname
              : '/contact',
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Submission failed. Please try again.',
        );
      }

      setIsSubmitted(true);
      setReferenceNumber(result.referenceNumber);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: defaultService || '',
        message: '',
        website: '',
      });

      // Construct pre-filled WhatsApp message
      const whatsappMessage = [
        'New Ultron Financials Enquiry',
        '',
        `Full Name: ${submittedPayload.name}`,
        `Email: ${submittedPayload.email}`,
        `Phone Number: ${submittedPayload.phone}`,
        `Business Type: ${submittedPayload.company}`,
        `Service Interested In: ${submittedPayload.service}`,
        `Message: ${submittedPayload.message}`,
      ].join('\n');

      const whatsappUrl = `https://wa.me/971526274559?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'An error occurred. Please try again.';
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      data-lpignore="true"
      data-form-type="other"
      suppressHydrationWarning
      className={cn(
        'card-shadow-right relative w-full rounded-[20px] px-6 py-7 sm:px-8 sm:py-8 lg:w-[630px] lg:shrink-0',
        className,
      )}
      style={{
        backgroundImage:
          'conic-gradient(from -46.16deg at 50% 50%, #035551 0deg, #058881 178.8deg, #035551 360deg)',
        boxShadow:
          '4px 4px 16px 5px rgba(3, 85, 81, 0.25), 0 20px 40px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Header section with horizontal divider line */}
      <Reveal className="mb-6">
        <h3
          className="font-display text-[20px] leading-tight font-bold tracking-[0.02em] uppercase sm:text-[22px]"
          style={{ color: CREAM }}
        >
          {formTitle}
        </h3>
        <div className="mt-4 h-[1px] w-full bg-white/20" />
      </Reveal>

      {/* Success Feedback State */}
      {isSubmitted ? (
        <Reveal className="my-6 rounded-[14px] border border-white/20 bg-white/10 p-6 text-center text-white backdrop-blur-xs">
          <div className="flex flex-col items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FDFBEE] text-[#035551]">
              <CheckCircle2 className="h-7 w-7 stroke-[2]" />
            </span>
            <h4 className="font-display text-[20px] font-bold text-[#FDFBEE] uppercase">
              Enquiry Submitted Successfully
            </h4>
            <p className="text-[15px] leading-relaxed text-white/90">
              Thank you for contacting Ultron Financials. Our advisory team will
              review your case and reach out shortly.
            </p>
            {referenceNumber && (
              <div className="mt-2 rounded-[8px] border border-[#FDFBEE]/30 bg-black/20 px-4 py-2 font-mono text-sm text-[#FDFBEE]">
                Reference: <span className="font-bold">{referenceNumber}</span>
              </div>
            )}
            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="mt-4 text-xs font-bold tracking-wider text-[#FDFBEE] uppercase underline hover:opacity-80"
            >
              Submit Another Enquiry
            </button>
          </div>
        </Reveal>
      ) : (
        <>
          {/* Error Banner */}
          {submitError && (
            <div className="mb-4 rounded-[10px] border border-red-300/40 bg-red-900/30 p-3.5 text-sm text-red-100">
              {submitError}
            </div>
          )}

          {/* Grid of fields */}
          {!hasMounted ? (
            <div
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              aria-hidden="true"
            >
              <div className="flex flex-col gap-1.5">
                <FieldLabel htmlFor="contact-name" required>
                  Full Name
                </FieldLabel>
                <div className={FIELD_CLASS} style={FIELD_STYLE} />
              </div>

              <div className="flex flex-col gap-1.5">
                <FieldLabel htmlFor="contact-email" required>
                  Email Address
                </FieldLabel>
                <div className={FIELD_CLASS} style={FIELD_STYLE} />
              </div>

              <div className="flex flex-col gap-1.5">
                <FieldLabel htmlFor="contact-phone" required>
                  Phone Number
                </FieldLabel>
                <div className={FIELD_CLASS} style={FIELD_STYLE} />
              </div>

              <div className="flex flex-col gap-1.5">
                <FieldLabel htmlFor="contact-business" required>
                  Business Type
                </FieldLabel>
                <div className={FIELD_CLASS} style={FIELD_STYLE} />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <FieldLabel htmlFor="contact-service" required>
                  Service Interested In
                </FieldLabel>
                <div className={FIELD_CLASS} style={FIELD_STYLE} />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                <div
                  className="ease-house h-[97px] w-full resize-none rounded-[10px] border-none px-3 py-2 text-[16px]"
                  style={FIELD_STYLE}
                />
              </div>
            </div>
          ) : (
            <Stagger
              delay={STAGGER_MS}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <StaggerItem className="flex flex-col gap-1.5">
                <FieldLabel htmlFor="contact-name" required>
                  Full Name
                </FieldLabel>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  {...NO_AUTOFILL_UI}
                  className={FIELD_CLASS}
                  style={FIELD_STYLE}
                />
              </StaggerItem>

              <StaggerItem className="flex flex-col gap-1.5">
                <FieldLabel htmlFor="contact-email" required>
                  Email Address
                </FieldLabel>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  {...NO_AUTOFILL_UI}
                  className={FIELD_CLASS}
                  style={FIELD_STYLE}
                />
              </StaggerItem>

              <StaggerItem className="flex flex-col gap-1.5">
                <FieldLabel htmlFor="contact-phone" required>
                  Phone Number
                </FieldLabel>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  required
                  {...NO_AUTOFILL_UI}
                  className={FIELD_CLASS}
                  style={FIELD_STYLE}
                />
              </StaggerItem>

              <StaggerItem className="flex flex-col gap-1.5">
                <FieldLabel htmlFor="contact-business" required>
                  Business Type
                </FieldLabel>
                <input
                  id="contact-business"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  autoComplete="organization"
                  required
                  {...NO_AUTOFILL_UI}
                  className={FIELD_CLASS}
                  style={FIELD_STYLE}
                />
              </StaggerItem>

              <StaggerItem className="flex flex-col gap-1.5 sm:col-span-2">
                <FieldLabel htmlFor="contact-service" required>
                  Service Interested In
                </FieldLabel>
                <select
                  id="contact-service"
                  name="service"
                  required
                  value={formData.service}
                  onChange={handleChange}
                  {...NO_AUTOFILL_UI}
                  className={cn(FIELD_CLASS, 'appearance-none rounded-[10px]')}
                  style={FIELD_STYLE}
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {SERVICES.filter((s) => s.isVisible !== false).map(
                    (service) => (
                      <option
                        key={service.slug}
                        value={service.title}
                        className="text-ink"
                      >
                        {service.title}
                      </option>
                    ),
                  )}
                </select>
              </StaggerItem>

              <StaggerItem className="flex flex-col gap-1.5 sm:col-span-2">
                <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  {...NO_AUTOFILL_UI}
                  className="ease-house h-[97px] w-full resize-none rounded-[10px] border-none px-3 py-2 text-[16px] transition-shadow outline-none focus:shadow-[inset_0_0_0_2px_#FDFBEE]"
                  style={FIELD_STYLE}
                />
              </StaggerItem>
            </Stagger>
          )}

          {/* Honeypot for spam protection */}
          <div aria-hidden="true" className="hidden" suppressHydrationWarning>
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              name="website"
              type="text"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              suppressHydrationWarning
              {...NO_AUTOFILL_UI}
            />
          </div>

          {/* Form Submit Button */}
          <Reveal delay={(FIELD_COUNT + 1) * STAGGER_MS} className="mt-6 block">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex h-[52px] w-full cursor-pointer items-center justify-center rounded-[12px] border-none px-6 text-center transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DCCB8E] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              style={{
                backgroundColor: CREAM,
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
              }}
            >
              {isSubmitting ? (
                <span className="font-display flex items-center gap-2 text-[16px] font-bold text-[#035551]">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  SUBMITTING...
                </span>
              ) : (
                <span className="font-display text-[16px] leading-none font-bold tracking-[0.03em] text-[#035551] uppercase transition-colors group-hover:text-[#023c39] sm:text-[18px]">
                  {submitLabel}
                </span>
              )}
            </button>
          </Reveal>
        </>
      )}
    </form>
  );
}
