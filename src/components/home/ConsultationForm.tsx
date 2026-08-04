import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import { CTA_CONTACT } from '@/content/home';
import { SERVICES } from '@/content/services';
import { cn } from '@/lib/utils';

/**
 * The consultation form, drawn from the comp's contact frame.
 *
 * The panel carries a conic gradient sweeping teal → bright teal → teal from
 * -46.16°, which is what gives it the sheen across the diagonal. Kept as a conic
 * gradient rather than flattened to a linear one: the highlight would land in
 * the wrong place and the panel would read flat.
 *
 * The comp draws every field with its label above and no placeholder, so each
 * control gets a real `<label>` tied by id. Two things here are NOT in the comp
 * and are kept deliberately — the honeypot, and the reassurance line under the
 * submit. The design is the authority on layout, not on what a lead form owes
 * the person filling it in.
 */

/** The comp's cream, used for the type, the field rings and the submit fill. */
const CREAM = '#FDFBEE';

const FIELD_CLASS =
  'h-11 w-full rounded-[10px] border-none px-3.5 text-[15px] outline-none ' +
  'ease-house transition-all focus:shadow-[inset_0_0_0_2px_#FDFBEE]';

const FIELD_STYLE = {
  backgroundColor: 'rgba(255,255,255,0.1)',
  boxShadow: `inset 0 0 0 1px ${CREAM}`,
  color: CREAM,
} as const;

/**
 * Opts every field out of password-manager autofill decoration.
 *
 * LastPass injects `<div data-lastpass-icon-root>` next to any field it adopts,
 * and it does so before React hydrates — which is a hydration mismatch React
 * cannot be told to ignore. `suppressHydrationWarning` does not cover it:
 * react-dom only consults that flag for prop, attribute and text differences,
 * never for an element the extension inserted. The fix has to be upstream of
 * the injection, so we decline the adoption instead.
 *
 * `data-lpignore` is LastPass, `data-1p-ignore` is 1Password and
 * `data-form-type="other"` is Dashlane. None of these are credential fields, so
 * declining is also the behaviour a visitor would want.
 */
/**
 * How many `StaggerItem` field rows the grid below holds.
 *
 * Only the submit button's delay reads this — everything inside the `Stagger`
 * derives its own beat from its position. Keep it in step with the JSX; if it
 * drifts low the button lands on top of the last field, and if it drifts high
 * there is a visible gap before it.
 */
const FIELD_COUNT = 6;

const NO_AUTOFILL_UI = {
  'data-lpignore': 'true',
  'data-1p-ignore': true,
  'data-form-type': 'other',
} as const;

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

export function ConsultationForm() {
  return (
    <form
      suppressHydrationWarning
      className="card-shadow-right relative w-full rounded-[20px] px-6 py-7 sm:px-8 sm:py-8 lg:w-[630px] lg:shrink-0"
      style={{
        backgroundImage:
          'conic-gradient(from -46.16deg at 50% 50%, #035551 0deg, #058881 178.8deg, #035551 360deg)',
        boxShadow:
          '4px 4px 16px 5px rgba(3, 85, 81, 0.25), 0 20px 40px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Header section with horizontal divider line as in Figma comp */}
      <Reveal className="mb-6">
        <h3
          className="font-display text-[20px] leading-tight font-bold tracking-[0.02em] uppercase sm:text-[22px]"
          style={{ color: CREAM }}
        >
          {CTA_CONTACT.form.title}
        </h3>
        <div className="mt-4 h-[1px] w-full bg-white/20" />
      </Reveal>

      {/* Grid of fields */}
      <Stagger
        delay={STAGGER_MS}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        suppressHydrationWarning
      >
        <StaggerItem className="flex flex-col gap-1.5" suppressHydrationWarning>
          <FieldLabel htmlFor="contact-name" required>
            Full Name
          </FieldLabel>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            suppressHydrationWarning
            {...NO_AUTOFILL_UI}
            className={FIELD_CLASS}
            style={FIELD_STYLE}
          />
        </StaggerItem>

        <StaggerItem className="flex flex-col gap-1.5" suppressHydrationWarning>
          <FieldLabel htmlFor="contact-email" required>
            Email Address
          </FieldLabel>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            suppressHydrationWarning
            {...NO_AUTOFILL_UI}
            className={FIELD_CLASS}
            style={FIELD_STYLE}
          />
        </StaggerItem>

        <StaggerItem className="flex flex-col gap-1.5" suppressHydrationWarning>
          <FieldLabel htmlFor="contact-phone" required>
            Phone Number
          </FieldLabel>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            suppressHydrationWarning
            {...NO_AUTOFILL_UI}
            className={FIELD_CLASS}
            style={FIELD_STYLE}
          />
        </StaggerItem>

        <StaggerItem className="flex flex-col gap-1.5" suppressHydrationWarning>
          <FieldLabel htmlFor="contact-business" required>
            Business Type
          </FieldLabel>
          <input
            id="contact-business"
            name="company"
            type="text"
            autoComplete="organization"
            required
            suppressHydrationWarning
            {...NO_AUTOFILL_UI}
            className={FIELD_CLASS}
            style={FIELD_STYLE}
          />
        </StaggerItem>

        <StaggerItem
          className="flex flex-col gap-1.5 sm:col-span-2"
          suppressHydrationWarning
        >
          <FieldLabel htmlFor="contact-service" required>
            Service Interested In
          </FieldLabel>
          <select
            id="contact-service"
            name="service"
            required
            defaultValue=""
            suppressHydrationWarning
            {...NO_AUTOFILL_UI}
            className={cn(FIELD_CLASS, 'appearance-none rounded-[10px]')}
            style={FIELD_STYLE}
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
        </StaggerItem>

        <StaggerItem
          className="flex flex-col gap-1.5 sm:col-span-2"
          suppressHydrationWarning
        >
          <FieldLabel htmlFor="contact-message">Message</FieldLabel>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            suppressHydrationWarning
            {...NO_AUTOFILL_UI}
            className="ease-house h-[97px] w-full resize-none rounded-[10px] border-none px-3 py-2 text-[16px] transition-shadow outline-none focus:shadow-[inset_0_0_0_2px_#FDFBEE]"
            style={FIELD_STYLE}
          />
        </StaggerItem>
      </Stagger>

      {/* Honeypot for spam protection */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...NO_AUTOFILL_UI}
        />
      </div>

      {/* Form Submit Button matching Figma comp precisely */}
      <Reveal delay={(FIELD_COUNT + 1) * STAGGER_MS} className="mt-6 block">
        <button
          type="submit"
          className="group relative flex h-[52px] w-full cursor-pointer items-center justify-center rounded-[12px] border-none px-6 text-center transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DCCB8E] active:scale-[0.99]"
          style={{
            backgroundColor: CREAM,
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
          }}
        >
          <span className="font-display text-[16px] leading-none font-bold tracking-[0.03em] text-[#035551] uppercase transition-colors group-hover:text-[#023c39] sm:text-[18px]">
            {CTA_CONTACT.form.submitLabel}
          </span>
        </button>
      </Reveal>
    </form>
  );
}
