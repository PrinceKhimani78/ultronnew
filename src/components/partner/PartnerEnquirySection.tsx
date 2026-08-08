'use client';

import { CheckCircle2, Loader2 } from 'lucide-react';
import React, { useState } from 'react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { HeadingText } from '@/components/ui/SectionHeading';
import { PARTNER_PAGE } from '@/content/partner-page';
import { SERVICES } from '@/content/services';
import { cn } from '@/lib/utils';

const CREAM = '#FDFBEE';

const FIELD_CLASS =
  'h-11 w-full rounded-[10px] border-none px-3.5 text-[15px] outline-none ' +
  'ease-house transition-all focus:shadow-[inset_0_0_0_2px_#FDFBEE] placeholder:text-[#FDFBEE]/50';

const FIELD_STYLE = {
  backgroundColor: 'rgba(255,255,255,0.1)',
  boxShadow: `inset 0 0 0 1px ${CREAM}`,
  color: CREAM,
} as const;

const NO_AUTOFILL_UI = {
  'data-lpignore': 'true',
  'data-1p-ignore': 'true',
  'data-form-type': 'other',
  'data-private': 'true',
} as const;

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

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
      className="text-[13px] leading-none font-medium tracking-wider uppercase"
      style={{ color: CREAM }}
    >
      {children}
      {required ? (
        <>
          <span aria-hidden="true" style={{ color: '#DCCB8E' }}>
            {' '}
            *
          </span>
          <span className="sr-only"> (required)</span>
        </>
      ) : null}
    </label>
  );
}

export function PartnerEnquirySection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Work email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid work email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (
      !/^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(formData.phone.trim()) ||
      formData.phone.trim().length < 7
    ) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Business type / company is required';
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData.consent) {
      newErrors.consent = 'Consent is required to submit enquiry';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch {
      setSubmitError(
        'An unexpected error occurred. Please try again or contact us directly.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section
      id="partner-enquiry"
      className="bg-[#FDFBEE] pt-12 pb-20 text-black sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32"
    >
      <Container width="wide">
        {/* Left-aligned Section Heading */}
        <Reveal className="w-full max-w-[760px] text-left">
          <BandEyebrow style={{ color: '#C9B37E' }}>
            {PARTNER_PAGE.formSection.eyebrow}
          </BandEyebrow>

          <h2 className="font-display mt-3 text-[32px] leading-[105%] font-extrabold tracking-[-0.02em] text-black sm:text-[40px] lg:text-[48px]">
            <HeadingText
              segments={PARTNER_PAGE.formSection.heading}
              accentClassName="text-[#035551]"
            />
          </h2>
        </Reveal>

        {/* Full-width Dark Teal Form Card matching CTA form design */}
        <Reveal delay={STAGGER_MS} className="mt-8 sm:mt-10">
          <div
            className="card-shadow-right relative w-full overflow-hidden rounded-[20px] px-6 py-8 sm:px-10 sm:py-10 lg:p-12"
            style={{
              backgroundImage:
                'conic-gradient(from -46.16deg at 50% 50%, #035551 0deg, #058881 178.8deg, #035551 360deg)',
              boxShadow:
                '4px 4px 16px 5px rgba(3, 85, 81, 0.25), 0 20px 40px rgba(0, 0, 0, 0.2)',
            }}
          >
            {isSubmitted ? (
              <div
                className="flex flex-col items-center justify-center py-12 text-center"
                style={{ color: CREAM }}
              >
                <CheckCircle2 className="h-16 w-16 text-[#DCCB8E]" />
                <h3
                  className="font-display mt-6 text-[24px] font-bold sm:text-[28px]"
                  style={{ color: CREAM }}
                >
                  Enquiry Received
                </h3>
                <p className="mt-3 max-w-md text-[16px] leading-[160%] opacity-90">
                  {PARTNER_PAGE.formSection.successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      company: '',
                      service: '',
                      message: '',
                      consent: false,
                    });
                  }}
                  className="mt-8 rounded-lg bg-[#DCCB8E] px-6 py-2.5 text-sm font-semibold text-[#035551] transition-colors hover:bg-white"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                suppressHydrationWarning
                className="relative z-10"
              >
                {submitError && (
                  <div className="mb-6 rounded-lg border border-red-500/30 bg-red-900/40 p-4 text-sm text-red-200">
                    {submitError}
                  </div>
                )}

                <Stagger
                  delay={STAGGER_MS}
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6"
                  suppressHydrationWarning
                >
                  {/* Full Name */}
                  <StaggerItem
                    className="flex flex-col gap-1.5"
                    suppressHydrationWarning
                  >
                    <FieldLabel htmlFor="partner-name" required>
                      Full Name
                    </FieldLabel>
                    <input
                      id="partner-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      suppressHydrationWarning
                      {...NO_AUTOFILL_UI}
                      className={FIELD_CLASS}
                      style={FIELD_STYLE}
                    />
                    {errors.name && (
                      <p className="text-xs font-medium text-[#FF8A8A]">
                        {errors.name}
                      </p>
                    )}
                  </StaggerItem>

                  {/* Email Address */}
                  <StaggerItem
                    className="flex flex-col gap-1.5"
                    suppressHydrationWarning
                  >
                    <FieldLabel htmlFor="partner-email" required>
                      Work Email Address
                    </FieldLabel>
                    <input
                      id="partner-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      suppressHydrationWarning
                      {...NO_AUTOFILL_UI}
                      className={FIELD_CLASS}
                      style={FIELD_STYLE}
                    />
                    {errors.email && (
                      <p className="text-xs font-medium text-[#FF8A8A]">
                        {errors.email}
                      </p>
                    )}
                  </StaggerItem>

                  {/* Phone Number */}
                  <StaggerItem
                    className="flex flex-col gap-1.5"
                    suppressHydrationWarning
                  >
                    <FieldLabel htmlFor="partner-phone" required>
                      Phone Number
                    </FieldLabel>
                    <input
                      id="partner-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      suppressHydrationWarning
                      {...NO_AUTOFILL_UI}
                      className={FIELD_CLASS}
                      style={FIELD_STYLE}
                    />
                    {errors.phone && (
                      <p className="text-xs font-medium text-[#FF8A8A]">
                        {errors.phone}
                      </p>
                    )}
                  </StaggerItem>

                  {/* Business Type / Company */}
                  <StaggerItem
                    className="flex flex-col gap-1.5"
                    suppressHydrationWarning
                  >
                    <FieldLabel htmlFor="partner-company" required>
                      Business Type / Company
                    </FieldLabel>
                    <input
                      id="partner-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={formData.company}
                      onChange={handleChange}
                      suppressHydrationWarning
                      {...NO_AUTOFILL_UI}
                      className={FIELD_CLASS}
                      style={FIELD_STYLE}
                    />
                    {errors.company && (
                      <p className="text-xs font-medium text-[#FF8A8A]">
                        {errors.company}
                      </p>
                    )}
                  </StaggerItem>

                  {/* Service Interested In */}
                  <StaggerItem
                    className="flex flex-col gap-1.5 sm:col-span-2"
                    suppressHydrationWarning
                  >
                    <FieldLabel htmlFor="partner-service" required>
                      Services Your Clients Need
                    </FieldLabel>
                    <select
                      id="partner-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      suppressHydrationWarning
                      {...NO_AUTOFILL_UI}
                      className={cn(
                        FIELD_CLASS,
                        'cursor-pointer appearance-none',
                      )}
                      style={FIELD_STYLE}
                    >
                      <option
                        value=""
                        disabled
                        className="bg-[#035551] text-white"
                      >
                        Select a service...
                      </option>
                      {SERVICES.map((service) => (
                        <option
                          key={service.slug}
                          value={service.title}
                          className="bg-[#035551] text-white"
                        >
                          {service.title}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-xs font-medium text-[#FF8A8A]">
                        {errors.service}
                      </p>
                    )}
                  </StaggerItem>

                  {/* Message */}
                  <StaggerItem
                    className="flex flex-col gap-1.5 sm:col-span-2"
                    suppressHydrationWarning
                  >
                    <FieldLabel htmlFor="partner-message">
                      Message / Tell Us About the Opportunity
                    </FieldLabel>
                    <textarea
                      id="partner-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      suppressHydrationWarning
                      {...NO_AUTOFILL_UI}
                      className="ease-house h-[110px] w-full resize-none rounded-[10px] border-none px-3.5 py-3 text-[15px] transition-shadow outline-none placeholder:text-[#FDFBEE]/50 focus:shadow-[inset_0_0_0_2px_#FDFBEE]"
                      style={FIELD_STYLE}
                      placeholder="Please share details about your practice, client profiles, or partnership objectives..."
                    />
                  </StaggerItem>
                </Stagger>

                {/* Honeypot for spam protection */}
                <div aria-hidden="true" className="hidden">
                  <label htmlFor="partner-website">Website</label>
                  <input
                    id="partner-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...NO_AUTOFILL_UI}
                  />
                </div>

                {/* Consent & Submit Row */}
                <div className="mt-8 border-t border-white/20 pt-6">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    {/* Consent Checkbox */}
                    <div className="max-w-lg" suppressHydrationWarning>
                      <label
                        className="flex cursor-pointer items-start gap-3 text-xs"
                        style={{ color: CREAM }}
                      >
                        <input
                          type="checkbox"
                          name="consent"
                          checked={formData.consent}
                          onChange={handleChange}
                          suppressHydrationWarning
                          className="mt-0.5 h-4 w-4 rounded border-white/30 bg-white/10 text-[#035551] focus:ring-[#DCCB8E]"
                        />
                        <span>
                          {PARTNER_PAGE.formSection.consentText}{' '}
                          <span style={{ color: '#DCCB8E' }}>*</span>
                        </span>
                      </label>
                      {errors.consent && (
                        <p className="mt-1 text-xs font-medium text-[#FF8A8A]">
                          {errors.consent}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="w-full sm:w-auto">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative flex h-[52px] w-full cursor-pointer items-center justify-center rounded-[12px] border-none text-center transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DCCB8E] active:scale-[0.99] disabled:opacity-60 sm:w-auto sm:px-8"
                        style={{
                          backgroundColor: CREAM,
                          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                        }}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2 text-[#035551]">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="font-display text-[16px] font-bold tracking-[0.03em] uppercase">
                              SUBMITTING...
                            </span>
                          </div>
                        ) : (
                          <span className="font-display text-[16px] leading-none font-bold tracking-[0.03em] text-[#035551] uppercase transition-colors group-hover:text-[#023c39] sm:text-[18px]">
                            {PARTNER_PAGE.formSection.submitText}
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
