import { SERVICES } from '@/content/services';
import { CTA_CONTACT } from '@/content/home';
import { cn } from '@/lib/utils';

/**
 * The consultation form, as drawn in the design.
 *
 * ⚠️ NOT WIRED. There is no submit handler and no action, because `/api/contact`
 * is Phase 6 and the brief for this pass is design reconciliation only. The
 * markup, labelling and validation attributes are complete, so wiring it later
 * is adding an action and a handler — not rebuilding the form.
 *
 * TODO(phase-6): point this at `/api/contact`, parse with `contactSchema` from
 * `lib/schemas/contact.ts` (already written, honeypot included), and render
 * server-returned field errors through `aria-describedby`.
 *
 * Deliberately a Server Component: an unwired form needs no JavaScript, and
 * native `required` / `type` validation works without any. The fields carry real
 * `<label>` elements rather than placeholders-as-labels — a placeholder
 * disappears on focus, which is precisely when a user needs the label most.
 */

const FIELD_CLASS = cn(
  'w-full rounded-lg border border-surface/20 bg-surface/10 px-4 py-3',
  'text-surface placeholder:text-surface/40 text-sm',
  'ease-house transition-colors focus:border-surface/50',
);

const LABEL_CLASS =
  'block text-[0.65rem] font-medium tracking-[0.16em] text-surface/70 uppercase';

/** `required` is mirrored visually; the asterisk alone is not an accessible cue. */
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
    <label htmlFor={htmlFor} className={LABEL_CLASS}>
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

export function ConsultationForm() {
  return (
    <div className="from-brand-mid to-brand-deep rounded-3xl bg-gradient-to-br p-6 sm:p-8">
      <h3 className="text-surface font-display text-sm font-semibold tracking-[0.14em] uppercase">
        {CTA_CONTACT.form.title}
      </h3>
      <hr className="border-surface/20 mt-4" />

      <form className="mt-6 space-y-5" suppressHydrationWarning>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2" suppressHydrationWarning>
            <FieldLabel htmlFor="contact-name" required>
              Full name
            </FieldLabel>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className={FIELD_CLASS}
            />
          </div>

          <div className="space-y-2" suppressHydrationWarning>
            <FieldLabel htmlFor="contact-email" required>
              Email address
            </FieldLabel>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={FIELD_CLASS}
            />
          </div>

          <div className="space-y-2" suppressHydrationWarning>
            <FieldLabel htmlFor="contact-phone" required>
              Phone number
            </FieldLabel>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              className={FIELD_CLASS}
            />
          </div>

          <div className="space-y-2" suppressHydrationWarning>
            <FieldLabel htmlFor="contact-business" required>
              Business type
            </FieldLabel>
            <input
              id="contact-business"
              name="company"
              type="text"
              autoComplete="organization"
              required
              className={FIELD_CLASS}
            />
          </div>
        </div>

        <div className="space-y-2" suppressHydrationWarning>
          <FieldLabel htmlFor="contact-service" required>
            Service interested in
          </FieldLabel>
          {/* A select, not free text: the options are a known, closed set. */}
          <select
            id="contact-service"
            name="service"
            required
            defaultValue=""
            className={cn(FIELD_CLASS, 'appearance-none')}
          >
            <option value="" disabled>
              Select a service
            </option>
            {SERVICES.map((service) => (
              <option
                key={service.slug}
                value={service.title}
                className="text-ink"
              >
                {service.title}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2" suppressHydrationWarning>
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            className={cn(FIELD_CLASS, 'resize-y')}
          />
        </div>

        {/*
          Honeypot. Hidden from sight and from assistive technology, and taken
          out of the tab order, so only an automated agent fills it.
          `contactSchema` already rejects a non-empty value.
        */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          className={cn(
            'bg-surface text-brand w-full rounded-lg px-6 py-4',
            'text-xs font-semibold tracking-[0.14em] uppercase',
            'ease-house hover:bg-surface/90 transition-colors',
          )}
        >
          {CTA_CONTACT.form.submitLabel}
        </button>

        <p className="text-surface/60 text-center text-xs">
          {CTA_CONTACT.form.reassurance}
        </p>
      </form>
    </div>
  );
}
