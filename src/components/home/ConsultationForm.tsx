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
  'h-10 w-full rounded-lg border-none px-3 text-[16px] outline-none ' +
  'ease-house transition-shadow focus:shadow-[inset_0_0_0_2px_#FDFBEE]';

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
      className="w-full rounded-[20px] px-6 py-8 sm:px-10 sm:py-[33px] lg:w-[630px] lg:shrink-0"
      style={{
        backgroundImage:
          'conic-gradient(from -46.16deg at 50% 50%, #035551 0deg, #058881 178.8deg, #035551 360deg)',
        boxShadow: '4px 4px 8px 5px rgba(3,85,81,0.25)',
      }}
    >
      <Reveal variant="text" className="mb-[30px]">
        <h3
          className="font-display text-[22px] leading-tight font-bold uppercase"
          style={{ color: CREAM }}
        >
          {CTA_CONTACT.form.title}
        </h3>
      </Reveal>

      {/*
        `Stagger` renders this grid itself — it does not wrap it — so the two-up
        template, the gap and the hydration flag are all unchanged. Fields arrive
        one after another at 80ms, which is the brief's input stagger.
      */}
      <Stagger
        className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        suppressHydrationWarning
      >
        <StaggerItem className="flex flex-col gap-2" suppressHydrationWarning>
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
            {...NO_AUTOFILL_UI}
            className={FIELD_CLASS}
            style={FIELD_STYLE}
          />
        </StaggerItem>

        <StaggerItem className="flex flex-col gap-2" suppressHydrationWarning>
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
            {...NO_AUTOFILL_UI}
            className={FIELD_CLASS}
            style={FIELD_STYLE}
          />
        </StaggerItem>

        <StaggerItem className="flex flex-col gap-2" suppressHydrationWarning>
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
            {...NO_AUTOFILL_UI}
            className={FIELD_CLASS}
            style={FIELD_STYLE}
          />
        </StaggerItem>

        <StaggerItem className="flex flex-col gap-2" suppressHydrationWarning>
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
            {...NO_AUTOFILL_UI}
            className={FIELD_CLASS}
            style={FIELD_STYLE}
          />
        </StaggerItem>

        {/* The comp's one full-width field, and the one that is a select. */}
        <StaggerItem
          className="flex flex-col gap-2 sm:col-span-2"
          suppressHydrationWarning
        >
          <FieldLabel htmlFor="contact-service" required>
            Service interested in
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
          className="flex flex-col gap-2 sm:col-span-2"
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

      {/* Honeypot. Not in the comp; bots are not in the comp either. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          // Not for the hydration mismatch — this field is hidden, so no
          // extension decorates it. It is so a password manager cannot autofill
          // the trap and get a real visitor classified as a bot.
          {...NO_AUTOFILL_UI}
        />
      </div>

      {/*
        Last, deliberately: six fields at 80ms each is 0.48s, so the button
        settles after the form it submits rather than alongside it.
      */}
      <Reveal variant="button" delay={0.52} className="block">
        <button
          type="submit"
          className={cn(
            'font-display mt-6 h-[46px] w-full cursor-pointer rounded-[10px] border-none text-[18px] leading-none font-bold uppercase',
            'ease-house transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(0,0,0,0.20)]',
          )}
          style={{
            backgroundColor: CREAM,
            boxShadow: `inset 0 0 0 2px ${CREAM}`,
            color: '#035551',
          }}
        >
          {CTA_CONTACT.form.submitLabel}
        </button>
      </Reveal>

      <p className="pt-4 text-center text-xs" style={{ color: `${CREAM}99` }}>
        {CTA_CONTACT.form.reassurance}
      </p>
    </form>
  );
}
