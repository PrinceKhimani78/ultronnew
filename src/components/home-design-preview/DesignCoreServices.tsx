import {
  DESIGN_BRAND,
  DESIGN_GOLD,
  DESIGN_MUTED,
  DesignButton,
  DesignContainer,
  DesignEyebrow,
  DesignHeadingText,
} from './DesignBand';
import { CORE_SERVICES } from './content';
import { CheckIcon } from './icons';

/**
 * Core Services, from the comp's 1280×792 frame.
 *
 * Rendered static, with "Financial Advisory" selected, because that is what the
 * comp specifies: it is a single frame, and it draws detail content for that
 * one service only. The remaining five have no panel anywhere in the export.
 *
 * Wiring the list up as real tabs was the obvious temptation and would have
 * been wrong twice over — it would invent five panels the design does not
 * define, and it would promise interaction the comp never shows. The list is
 * therefore marked up as a list with a current item, not as an ARIA tablist:
 * `role="tab"` on something that cannot be operated is a worse lie than a
 * static picture of a tab.
 */
export function DesignCoreServices() {
  return (
    <section
      id="design-services"
      className="overflow-hidden bg-white py-[52px] lg:pt-[52px] lg:pb-[88px]"
      aria-labelledby="design-services-heading"
    >
      <DesignContainer>
        <div className="flex flex-col items-center text-center">
          <DesignEyebrow>{CORE_SERVICES.eyebrow}</DesignEyebrow>
          <h2
            id="design-services-heading"
            className="mt-3 text-[clamp(2rem,4.6vw,48px)] leading-[100%] font-bold tracking-[-0.017em]"
          >
            <DesignHeadingText segments={CORE_SERVICES.heading} />
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-8 lg:mt-[75px] lg:flex-row lg:gap-[78px]">
          {/*
            The service list. One 1.5px ring around the whole stack with 1px
            rules between rows — drawn as a border on the wrapper plus a
            divide-y, so the 20px radius clips the selected row's fill.
          */}
          <ul
            className="w-full overflow-hidden rounded-[20px] lg:w-[277px] lg:shrink-0 lg:self-start"
            style={{ border: `1.5px solid ${DESIGN_BRAND}` }}
          >
            {CORE_SERVICES.tabs.map((tab, index) => {
              const isActive = index === CORE_SERVICES.activeIndex;
              return (
                <li
                  key={tab}
                  aria-current={isActive ? 'true' : undefined}
                  className="flex h-[55px] items-center justify-center px-4 text-center text-[18px] leading-tight font-semibold"
                  style={{
                    backgroundColor: isActive ? DESIGN_BRAND : '#ffffff',
                    color: isActive ? '#ffffff' : DESIGN_BRAND,
                    borderBottom:
                      index === CORE_SERVICES.tabs.length - 1
                        ? undefined
                        : `1px solid ${DESIGN_BRAND}`,
                  }}
                >
                  {tab}
                </li>
              );
            })}
          </ul>

          <div
            className="flex-1 rounded-[20px] bg-white p-6 sm:p-10"
            style={{
              boxShadow: `inset 0 0 0 1px ${DESIGN_BRAND}, 4px 4px 8px 2px rgba(3,85,81,0.25)`,
            }}
          >
            <span
              className="block text-[18px] leading-none font-bold"
              style={{ color: DESIGN_BRAND }}
            >
              {CORE_SERVICES.panel.index}
            </span>
            <h3
              className="mt-2 mb-4 text-[22px] leading-snug font-semibold"
              style={{ color: DESIGN_BRAND }}
            >
              {CORE_SERVICES.panel.title}
            </h3>
            <p
              className="mb-6 text-[16px] leading-[150%] font-normal"
              style={{ color: DESIGN_MUTED }}
            >
              {CORE_SERVICES.panel.body}
            </p>
            <span
              className="mb-4 block text-[14px] leading-none font-normal"
              style={{ color: DESIGN_GOLD }}
            >
              {CORE_SERVICES.panel.benefitsLabel}
            </span>
            <ul className="flex flex-col gap-[14px]">
              {CORE_SERVICES.panel.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  {/* The comp's tick is a filled teal disc with a white check. */}
                  <CheckIcon className="h-[17px] w-[17px] shrink-0 text-[#035551]" />
                  <span className="text-[16px] leading-snug font-normal text-black">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex justify-center lg:mt-[46px]">
          <DesignButton href="#design-contact">
            {CORE_SERVICES.cta}
          </DesignButton>
        </div>
      </DesignContainer>
    </section>
  );
}
