import Link from 'next/link';

import { FooterNavColumn } from '@/components/layout/FooterNav';
import { Logo } from '@/components/layout/Logo';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import {
  LocationGlyph,
  MailGlyph,
  PhoneGlyph,
} from '@/components/ui/ContactIcons';
import { FOOTER_NAV, SITE } from '@/content/site';

/**
 * Site footer, from the comp's 1280×572 "Footer" frame.
 *
 * The 572px height is not set — it is the sum of the parts, and the parts are
 * what the spec fixes: 84px of lead-in, 40px of run-out and 448px of content
 * between them. Setting an explicit height instead would clip the moment a line
 * of the address wrapped.
 *
 * The measure here IS the page measure — `.page-shell`, the same shell the
 * header and every content band use. It previously carried its own 1280px box
 * and a 105px desktop inset, which is why the footer used to start on a
 * different vertical line from the content above it.
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
/**
 * The copyright row only. It is the quietest line on the page and the brief
 * allows body copy a slightly reduced opacity; nothing in the nav columns or the
 * NAP block uses it.
 */
const BODY_COLOR = 'rgba(255,255,255,0.85)';
/** Contact glyphs and NAP copy. Pure white — no muted typography in the footer. */
const CONTACT_COLOR = '#FFFFFF';

/**
 * The footer's entrance order, as beats of `STAGGER_MS`.
 *
 * Logo, contact, the two nav columns, then the legal run-out — reading order,
 * top to bottom and left to right. The nav columns take one beat each from
 * `navColumn`, which is why that is a function rather than a number.
 */
const BEAT = {
  logo: 0,
  contact: STAGGER_MS,
  navColumn: (index: number) => STAGGER_MS * (2 + index),
  /** Two nav columns, so the run-out sits one beat past the second. */
  closing: STAGGER_MS * 4,
} as const;

export function Footer() {
  return (
    <footer
      data-header-tone="dark"
      className="text-surface overflow-hidden bg-[#154B47] pt-12 pb-8 lg:pt-[80px] lg:pb-10"
    >
      <div className="page-shell">
        {/* Brand Logo */}
        <Reveal delay={BEAT.logo}>
          <Link
            href="/"
            aria-label={`${SITE.name} — home`}
            className="inline-block"
          >
            <Logo
              tone="cream"
              className="h-auto w-[240px] sm:w-[280px] lg:w-[320px]"
            />
          </Link>
        </Reveal>

        {/* 3-Column Navigation & Contact Grid */}
        <div className="mt-10 grid grid-cols-1 gap-10 text-left sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr] lg:gap-12 xl:gap-16">
          {/* Column 1: Contact Us */}
          <address className="not-italic">
            <Reveal delay={BEAT.contact}>
              <h2 className="mb-6 text-[18px] leading-tight font-semibold text-white">
                Contact Us
              </h2>
            </Reveal>
            <Stagger
              as="ul"
              delay={BEAT.contact + STAGGER_MS / 2}
              step={STAGGER_MS / 2}
              className="flex flex-col gap-4"
              style={{ color: CONTACT_COLOR }}
            >
              <StaggerItem
                as="li"
                className="flex items-start justify-start gap-3.5"
              >
                <LocationGlyph className="shrink-0 text-white" />
                <span
                  className={`${BODY} max-w-[420px] text-left text-white/90`}
                >
                  {SITE.address.streetAddress}
                </span>
              </StaggerItem>
              <StaggerItem
                as="li"
                className="flex items-center justify-start gap-3.5"
              >
                <MailGlyph className="shrink-0 text-white" />
                <a
                  href={`mailto:${SITE.email}`}
                  className={`${BODY} text-left text-white/90 transition-colors duration-200 hover:text-[#DCCB8E]`}
                >
                  {SITE.email}
                </a>
              </StaggerItem>
              <StaggerItem
                as="li"
                className="flex items-center justify-start gap-3.5"
              >
                <PhoneGlyph className="shrink-0 text-white" />
                <a
                  href={`tel:${SITE.telephone.replace(/\s/g, '')}`}
                  className={`${BODY} text-left text-white/90 transition-colors duration-200 hover:text-[#DCCB8E]`}
                >
                  {SITE.telephone}
                </a>
              </StaggerItem>
            </Stagger>
          </address>

          {/* Column 2 & 3: Quick Links and Services */}
          {FOOTER_NAV.map((column, index) => (
            <FooterNavColumn
              key={column.heading}
              heading={column.heading}
              items={column.items}
              delay={BEAT.navColumn(index)}
            />
          ))}
        </div>

        {/* Horizontal Divider Line */}
        <hr
          className="mt-12 mb-7 border-0"
          style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.2)' }}
        />

        {/* Bottom Bar: Left & Right Copyright text strictly matching Figma */}
        <Reveal
          delay={BEAT.closing}
          className="flex flex-col items-center justify-between gap-3 text-center text-[12px] leading-tight font-medium tracking-[0.06em] uppercase sm:flex-row sm:text-left sm:text-[13px]"
          style={{ color: BODY_COLOR }}
        >
          <span className="text-white/80">
            ALL RIGHTS RESERVED BY ULTRON FINANCIALS
          </span>
          <span className="text-white/80">
            COPYRIGHTS &copy; MUTANT TECHNOLOGIES
          </span>
        </Reveal>
      </div>
    </footer>
  );
}
