import Link from 'next/link';

import { FooterNavColumn } from '@/components/layout/FooterNav';
import { Logo } from '@/components/layout/Logo';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import {
  LocationGlyph,
  MailGlyph,
  PhoneGlyph,
} from '@/components/ui/ContactIcons';
import { FOOTER_DISCLAIMER, FOOTER_NAV, SITE } from '@/content/site';

/**
 * Site footer, from the comp's 1280×572 "Footer" frame.
 *
 * The 572px height is not set — it is the sum of the parts, and the parts are
 * what the spec fixes: 84px of lead-in, 40px of run-out and 448px of content
 * between them. Setting an explicit height instead would clip the moment a line
 * of the address wrapped.
 *
 * The measure here is NOT the page measure. The comp's footer frame is 1280 wide
 * and insets its content 105px, which produces a 1070px footer measure — the
 * exact width of the rule above the copyright row. Stated as max-width plus
 * inset rather than as a 1070px box, so the two numbers stay traceable.
 *
 * Column origins are the comp's, measured from the content edge: Contact at 0,
 * Quick Links at 565, Services at 819. Each track carries its own trailing
 * gutter and the grid gap is zero, which is the only way to hit three different
 * gutters with one template.
 *
 * The ground is `brand-panel`, the same teal as the header pill, so the page is
 * bracketed by one colour rather than two near-identical ones.
 *
 * The contact block is an `<address>` — that element means "contact details for
 * the nearest article or body", which is exactly what it is. Consistent NAP here
 * and in the `ProfessionalService` JSON-LD is what makes the local SEO claim
 * verifiable rather than merely asserted.
 *
 * ⚠️ The regulatory disclaimer above the divider is NOT in the comp. It is kept
 * deliberately and set quiet: the design is the authority on layout, not on what
 * an advisory firm is required to say about its own licensing.
 */

/** 18px body throughout, at the comp's 30px line box. */
const BODY = 'text-[18px] leading-[30px] font-normal';
const BODY_COLOR = 'rgba(255,255,255,0.85)';

export function Footer() {
  return (
    <footer
      data-header-tone="dark"
      className="bg-brand-panel text-surface overflow-hidden pt-14 pb-8 lg:pt-[84px] lg:pb-10"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-10 xl:px-[105px]">
        {/*
          Width pinned rather than height: the lockup is ratio 3.62 against the
          comp's 3.41, so height follows at 99px. Matching the drawn width keeps
          the block's footprint right; matching the height would leave it 22px
          wide of the comp.
        */}
        {/*
          The footer arrives rather than appearing. `text` is the gentlest
          variant in the system — a 24px rise, no tilt, no blur — which is what
          the brief's "should NOT suddenly appear" asks for at the very bottom of
          a long scroll, where anything more emphatic reads as a second hero.
        */}
        <Reveal variant="text" direction="none">
          <Link href="/" aria-label={`${SITE.name} — home`} className="block">
            <Logo
              tone="cream"
              className="mx-auto h-auto w-[240px] sm:mx-0 lg:w-[358px]"
            />
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-3 lg:gap-x-10 xl:grid-cols-[565px_254px_minmax(0,1fr)] xl:gap-0">
          <address className="not-italic">
            <Reveal variant="text" delay={0.08}>
              <h2 className="mb-7 text-[18px] leading-tight font-semibold text-white">
                Contact Us
              </h2>
            </Reveal>
            {/* Stagger renders the list itself, so the NAP layout is unchanged. */}
            <Stagger
              as="ul"
              delayChildren={0.12}
              className="flex flex-col gap-4"
              // Colour stays on the list. The contact glyphs are stroked with
              // `currentColor` and inherit it from here — pushing it down to the
              // text leaves would have silently recoloured all three icons.
              style={{ color: BODY_COLOR }}
            >
              <StaggerItem
                as="li"
                variant="text"
                className="flex items-start justify-center gap-3 sm:justify-start"
              >
                <LocationGlyph />
                <span className={`${BODY} max-w-[340px] text-left`}>
                  {SITE.address.streetAddress}
                </span>
              </StaggerItem>
              <StaggerItem
                as="li"
                variant="text"
                className="flex items-start justify-center gap-3 sm:justify-start"
              >
                <MailGlyph />
                <a
                  href={`mailto:${SITE.email}`}
                  className={`${BODY} text-left transition-colors duration-200 hover:text-[#DCCB8E]`}
                >
                  {SITE.email}
                </a>
              </StaggerItem>
              <StaggerItem
                as="li"
                variant="text"
                className="flex items-start justify-center gap-3 sm:justify-start"
              >
                <PhoneGlyph />
                <a
                  href={`tel:${SITE.telephone.replace(/\s/g, '')}`}
                  className={`${BODY} text-left transition-colors duration-200 hover:text-[#DCCB8E]`}
                >
                  {SITE.telephone}
                </a>
              </StaggerItem>
            </Stagger>
          </address>

          {FOOTER_NAV.map((column, index) => (
            <FooterNavColumn
              key={column.heading}
              heading={column.heading}
              items={column.items}
              // The two link columns follow the contact block, one after the
              // other, rather than all three landing at once.
              delay={0.16 + index * 0.08}
            />
          ))}
        </div>

        <Reveal variant="text" direction="none" delay={0.1} className="mt-14">
          <p className="text-surface/45 mx-auto max-w-4xl text-center text-xs leading-relaxed sm:mx-0 sm:text-left">
            {FOOTER_DISCLAIMER}
          </p>
        </Reveal>

        <hr
          className="mt-6 mb-6 border-0"
          style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.25)' }}
        />

        {/* The comp insets the bottom bar 25px inside the rule on both ends. */}
        <div
          className="flex flex-col items-center gap-3 text-center text-[14px] leading-tight font-medium tracking-[0.04em] uppercase sm:flex-row sm:justify-between sm:text-left xl:px-[25px]"
          style={{ color: BODY_COLOR }}
        >
          <span>All rights reserved by {SITE.legalName}</span>
          <span>Copyrights &copy; {SITE.builtBy}</span>
        </div>
      </div>
    </footer>
  );
}
