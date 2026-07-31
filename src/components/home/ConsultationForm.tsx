import { SERVICES } from '@/content/services';
import { CTA_CONTACT } from '@/content/home';
import { cn } from '@/lib/utils';

/**
 * The consultation form, styled to match the Figma Frame 9 specs:
 * - Angular/Conic gradient background (#035551 and #058881)
 * - 20px rounded corners
 * - 4px 4px 8px 5px rgba(3,85,81,0.25) drop shadow
 */

const FIELD_CLASS = cn(
  'w-full rounded-xl border border-surface/25 bg-surface/10 px-4 py-3.5',
  'text-surface placeholder:text-surface/40 text-sm',
  'ease-house transition-all focus:border-surface/60 focus:bg-surface/15 focus:outline-none',
);

const LABEL_CLASS =
  'block text-[0.65rem] font-medium tracking-[0.16em] text-surface/80 uppercase';

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
    <div
      className={cn(
        'text-surface relative overflow-hidden rounded-[20px] p-6 sm:p-8',
        'bg-[conic-gradient(from_180deg_at_50%_50%,#035551_0deg,#058881_160deg,#035551_320deg,#035551_360deg)]',
        'shadow-[4px_4px_8px_5px_rgba(3,85,81,0.25)]',
      )}
    >
      <h3 className="text-surface font-display text-base font-bold tracking-[0.14em] uppercase">
        {CTA_CONTACT.form.title}
      </h3>
      <hr className="border-surface/25 mt-4" />

      <form className="mt-6 space-y-5" suppressHydrationWarning>
        <div className="grid gap-5 sm:grid-cols-2" suppressHydrationWarning>
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
              suppressHydrationWarning
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
              suppressHydrationWarning
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
              suppressHydrationWarning
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
              suppressHydrationWarning
              className={FIELD_CLASS}
            />
          </div>
        </div>

        <div className="space-y-2" suppressHydrationWarning>
          <FieldLabel htmlFor="contact-service" required>
            Service interested in
          </FieldLabel>
          <select
            id="contact-service"
            name="service"
            required
            defaultValue=""
            suppressHydrationWarning
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
            suppressHydrationWarning
            className={cn(FIELD_CLASS, 'resize-y')}
          />
        </div>

        {/* Honeypot field for bot protection */}
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
            'bg-surface mt-2 w-full rounded-xl px-6 py-4 text-[#035551]',
            'text-sm font-bold tracking-[0.14em] uppercase shadow-md',
            'ease-house hover:bg-surface/90 transition-all hover:shadow-lg',
          )}
        >
          {CTA_CONTACT.form.submitLabel}
        </button>

        <p className="text-surface/60 pt-1 text-center text-xs">
          {CTA_CONTACT.form.reassurance}
        </p>
      </form>
    </div>
  );
}
