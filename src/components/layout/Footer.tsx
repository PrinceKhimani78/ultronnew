import Link from 'next/link';

import { FooterNavColumn } from '@/components/layout/FooterNav';
import { FooterVisibility } from '@/components/layout/FooterVisibility';
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
import { type PublicSiteSettings } from '@/lib/cms-data';

/** 18px body throughout, at the comp's 30px line box. */
const BODY = 'text-[18px] leading-[30px] font-normal';
const BODY_COLOR = 'rgba(255,255,255,0.85)';
const CONTACT_COLOR = '#FFFFFF';

const BEAT = {
  logo: 0,
  contact: STAGGER_MS,
  navColumn: (index: number) => STAGGER_MS * (2 + index),
  closing: STAGGER_MS * 4,
} as const;

interface FooterProps {
  settings?: PublicSiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const email = settings?.footer?.email || settings?.email || SITE.email;
  const phone =
    settings?.footer?.phone || settings?.telephone || SITE.telephone;
  const address =
    settings?.footer?.address ||
    settings?.address?.streetAddress ||
    SITE.address.streetAddress;
  const copyrightText =
    settings?.footer?.copyrightText ||
    `${settings?.name || SITE.name}. All rights reserved.`;

  return (
    <FooterVisibility>
      <footer
        data-header-tone="dark"
        className="text-surface overflow-hidden bg-[#154B47] pt-12 pb-8 lg:pt-[80px] lg:pb-10"
      >
        <div className="page-shell">
          {/* Brand Logo */}
          <Reveal delay={BEAT.logo}>
            <Link
              href="/"
              aria-label={`${settings?.name || SITE.name} — home`}
              className="inline-block"
            >
              <Logo
                tone="cream"
                className="h-auto w-[240px] sm:w-[280px] lg:w-[320px]"
              />
            </Link>
          </Reveal>

          {/* 3-Column Navigation & Contact Grid */}
          <div className="mt-10 grid grid-cols-1 gap-10 text-left sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-12 xl:gap-16">
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
                    {address}
                  </span>
                </StaggerItem>

                <StaggerItem
                  as="li"
                  className="flex items-center justify-start gap-3.5"
                >
                  <MailGlyph className="shrink-0 text-white" />
                  <a
                    href={`mailto:${email}`}
                    className={`${BODY} text-left text-white/90 transition-colors duration-200 hover:text-[#DCCB8E]`}
                  >
                    {email}
                  </a>
                </StaggerItem>

                <StaggerItem
                  as="li"
                  className="flex items-center justify-start gap-3.5"
                >
                  <PhoneGlyph className="shrink-0 text-white" />
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className={`${BODY} text-left text-white/90 transition-colors duration-200 hover:text-[#DCCB8E]`}
                  >
                    {phone}
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

          {/* Bottom Bar: Left-aligned Copyright text */}
          <Reveal
            delay={BEAT.closing}
            className="text-left text-[12px] leading-tight font-medium tracking-[0.06em] uppercase sm:text-[13px]"
            style={{ color: BODY_COLOR }}
          >
            <span className="text-white/80">&copy; 2026 {copyrightText}</span>
          </Reveal>
        </div>
      </footer>
    </FooterVisibility>
  );
}
