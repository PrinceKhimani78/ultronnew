import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';

import {
  DESIGN_CREAM,
  DESIGN_MUTED,
  DesignButton,
  DesignContainer,
  DesignEyebrow,
  DesignHeadingText,
} from './DesignBand';
import { CONTACT } from './content';

/**
 * Start Your UAE Business Journey, from the comp's 1280×875 frame.
 *
 * The form panel carries a conic gradient sweeping teal → bright teal → teal
 * from -46.16°, which is what gives it the sheen across the diagonal. Kept as a
 * conic gradient rather than flattened to a linear one, because the highlight
 * would land in the wrong place and the panel would read flat.
 *
 * The comp draws the fields with the label above and no placeholder, so every
 * control gets a real <label> tied by id. Presentational only: the comp defines
 * no endpoint, and this page exists to be compared against, not submitted from.
 * Wiring it to the live handler in `components/home/ConsultationForm.tsx` is a
 * deliberate follow-up, not something to do silently here.
 */

/**
 * Declines password-manager field adoption. LastPass injects a
 * `data-lastpass-icon-root` div beside any field it takes over, before React
 * hydrates — a mismatch `suppressHydrationWarning` provably cannot cover, since
 * react-dom consults that flag only for prop, attribute and text differences.
 */
const NO_AUTOFILL_UI = {
  'data-lpignore': 'true',
  'data-1p-ignore': true,
  'data-form-type': 'other',
} as const;

const FIELD_STYLE = {
  backgroundColor: 'rgba(255,255,255,0.1)',
  boxShadow: `inset 0 0 0 1px ${DESIGN_CREAM}`,
  color: DESIGN_CREAM,
} as const;

function FieldLabel({ children }: { children: string }) {
  return (
    <span
      className="text-[14px] leading-none font-normal"
      style={{ color: DESIGN_CREAM }}
    >
      {children}
    </span>
  );
}

export function DesignContact() {
  return (
    <section
      id="design-contact"
      className="overflow-hidden py-[60px] lg:pt-[122px] lg:pb-[148px]"
      style={{ backgroundColor: DESIGN_CREAM }}
      aria-labelledby="design-contact-heading"
    >
      <DesignContainer>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-[62px]">
          <Reveal
            variant="text"
            direction="left"
            className="lg:w-[394px] lg:shrink-0 lg:pt-[13px]"
          >
            <DesignEyebrow>{CONTACT.eyebrow}</DesignEyebrow>
            <h2
              id="design-contact-heading"
              className="mt-3 text-[clamp(2rem,4.6vw,48px)] leading-[100%] font-semibold tracking-[-0.017em]"
            >
              {CONTACT.headingLines.map((line, index) => (
                <span key={index} className="block">
                  <DesignHeadingText segments={line} />
                </span>
              ))}
            </h2>
            {/* ⚠️ Lorem ipsum, exactly as the comp draws it. */}
            <p
              className="mt-8 text-[16px] leading-[150%] font-normal lg:mt-[50px]"
              style={{ color: DESIGN_MUTED }}
            >
              {CONTACT.body}
            </p>
            <Reveal
              variant="button"
              delay={0.24}
              className="mt-8 inline-block lg:mt-[40px]"
            >
              <DesignButton href="#design-contact" radius="rounded">
                {CONTACT.cta}
              </DesignButton>
            </Reveal>
          </Reveal>

          <Reveal variant="card" direction="right" delay={0.08}>
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
                  className="text-[22px] leading-tight font-bold"
                  style={{ color: DESIGN_CREAM }}
                >
                  {CONTACT.form.title}
                </h3>
              </Reveal>

              <Stagger
                className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                suppressHydrationWarning
              >
                {CONTACT.form.fields.map((field) => (
                  <StaggerItem
                    key={field.name}
                    suppressHydrationWarning
                    className={`flex flex-col gap-2 ${field.full ? 'sm:col-span-2' : ''}`}
                  >
                    <label htmlFor={`design-${field.name}`}>
                      <FieldLabel>
                        {field.required ? `${field.label} *` : field.label}
                      </FieldLabel>
                    </label>
                    <input
                      id={`design-${field.name}`}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      suppressHydrationWarning
                      {...NO_AUTOFILL_UI}
                      className={`h-10 w-full border-none px-3 text-[16px] outline-none ${
                        field.full ? 'rounded-[10px]' : 'rounded-lg'
                      }`}
                      style={FIELD_STYLE}
                    />
                  </StaggerItem>
                ))}

                <StaggerItem
                  className="flex flex-col gap-2 sm:col-span-2"
                  suppressHydrationWarning
                >
                  <label htmlFor="design-message">
                    <FieldLabel>{CONTACT.form.messageLabel}</FieldLabel>
                  </label>
                  <textarea
                    id="design-message"
                    name="message"
                    rows={4}
                    suppressHydrationWarning
                    {...NO_AUTOFILL_UI}
                    className="h-[97px] w-full resize-none rounded-[10px] border-none px-3 py-2 text-[16px] outline-none"
                    style={FIELD_STYLE}
                  />
                </StaggerItem>
              </Stagger>

              <Reveal variant="button" delay={0.52} className="block">
                <button
                  type="submit"
                  className="mt-6 h-[46px] w-full cursor-pointer rounded-[10px] border-none text-[18px] leading-none font-bold"
                  style={{
                    backgroundColor: DESIGN_CREAM,
                    boxShadow: `inset 0 0 0 2px ${DESIGN_CREAM}`,
                    color: '#035551',
                  }}
                >
                  {CONTACT.form.submitLabel}
                </button>
              </Reveal>
            </form>
          </Reveal>
        </div>
      </DesignContainer>
    </section>
  );
}
