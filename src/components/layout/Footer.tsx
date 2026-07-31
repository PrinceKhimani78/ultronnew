import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { FooterNavColumn } from '@/components/layout/FooterNav';
import { Logo } from '@/components/layout/Logo';
import { FOOTER_DISCLAIMER, FOOTER_NAV, SITE } from '@/content/site';

/**
 * Site footer: brand, NAP, and the two link columns from the design.
 *
 * Three tracks on desktop, as the comp draws them — the brand and contact block
 * takes half the measure, then Quick Links and Services. The teal is
 * `brand-panel`, the same ground as the header pill, so the page is bracketed by
 * one colour rather than two near-identical ones.
 *
 * The contact block is an `<address>` — that element means "contact details for
 * the nearest article or body", which is exactly what it is. Consistent NAP here
 * and in the `ProfessionalService` JSON-LD is what makes the local SEO claim
 * verifiable rather than merely asserted.
 *
 * The regulatory disclaimer above the divider is NOT in the comp. It is kept
 * deliberately and set quiet: the design is the authority on layout, not on what
 * an advisory firm is required to say about its own licensing.
 */
export function Footer() {
  return (
    <footer data-header-tone="dark" className="bg-brand-panel text-surface">
      <Container width="wide">
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="sm:col-span-2 lg:col-span-6">
            <Link href="/" aria-label={`${SITE.name} — home`}>
              <Logo tone="cream" className="h-[60px] sm:h-[72px] lg:h-[84px]" />
            </Link>

            <h2 className="text-surface mt-10 text-base font-semibold lg:mt-12 lg:text-[1.0625rem]">
              Contact Us
            </h2>
            <address className="text-surface/85 mt-5 max-w-sm space-y-5 text-[0.9375rem] leading-relaxed not-italic lg:mt-6 lg:text-base">
              <span className="flex items-start gap-3.5">
                <MapPin
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="mt-0.5 h-5 w-5 shrink-0"
                />
                {SITE.address.streetAddress}
              </span>
              <span className="flex items-center gap-3.5">
                <Mail
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="h-5 w-5 shrink-0"
                />
                <a
                  href={`mailto:${SITE.email}`}
                  className="ease-house hover:text-accent transition-colors duration-200"
                >
                  {SITE.email}
                </a>
              </span>
              <span className="flex items-center gap-3.5">
                <Phone
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="h-5 w-5 shrink-0"
                />
                <a
                  href={`tel:${SITE.telephone.replace(/\s/g, '')}`}
                  className="ease-house hover:text-accent transition-colors duration-200"
                >
                  {SITE.telephone}
                </a>
              </span>
            </address>
          </div>

          {FOOTER_NAV.map((column) => (
            <div key={column.heading} className="lg:col-span-3">
              <FooterNavColumn heading={column.heading} items={column.items} />
            </div>
          ))}
        </div>

        <div className="pb-8 lg:pb-10">
          <p className="text-surface/45 max-w-4xl pb-6 text-xs leading-relaxed">
            {FOOTER_DISCLAIMER}
          </p>
          <div className="border-surface/25 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <p className="text-surface/70 text-[0.6875rem] tracking-[0.08em] uppercase lg:text-xs">
              All rights reserved by {SITE.legalName}
            </p>
            <p className="text-surface/70 text-[0.6875rem] tracking-[0.08em] uppercase lg:text-xs">
              Copyrights &copy; {SITE.builtBy}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
