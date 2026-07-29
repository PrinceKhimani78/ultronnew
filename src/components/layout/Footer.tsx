import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/layout/Container';
import { Logo } from '@/components/layout/Logo';
import { FOOTER_DISCLAIMER, FOOTER_NAV, SITE } from '@/content/site';

/**
 * Site footer: brand, NAP, and the two link columns from the design.
 *
 * The contact block is an `<address>` — that element means "contact details for
 * the nearest article or body", which is exactly what it is. Consistent NAP here
 * and in the `ProfessionalService` JSON-LD is what makes the local SEO claim
 * verifiable rather than merely asserted.
 *
 * Entries marked `pending` render as plain text, not links: a footer link into a
 * 404 is worse than a non-link, particularly on a page a regulator might read.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand text-surface">
      <Container width="wide">
        <div className="grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <Link href="/" aria-label={`${SITE.name} — home`}>
              <Logo tone="cream" className="h-12" />
            </Link>

            <h2 className="text-surface mt-10 text-sm font-semibold">
              Contact Us
            </h2>
            <address className="text-surface/70 mt-4 space-y-3 text-sm leading-relaxed not-italic">
              <span className="flex items-start gap-3">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 shrink-0"
                />
                {SITE.address.streetAddress}
              </span>
              <span className="flex items-center gap-3">
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-surface transition-colors"
                >
                  {SITE.email}
                </a>
              </span>
              <span className="flex items-center gap-3">
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0" />
                <a
                  href={`tel:${SITE.telephone.replace(/\s/g, '')}`}
                  className="hover:text-surface transition-colors"
                >
                  {SITE.telephone}
                </a>
              </span>
            </address>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
            {FOOTER_NAV.map((column) => (
              <nav
                key={column.heading}
                aria-labelledby={`footer-${column.heading.replace(/\s+/g, '-')}`}
              >
                <h2
                  id={`footer-${column.heading.replace(/\s+/g, '-')}`}
                  className="text-surface text-sm font-semibold"
                >
                  {column.heading}
                </h2>
                <ul className="mt-5 space-y-3">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      {item.pending ? (
                        <span className="text-surface/40 text-sm">
                          {item.label}
                        </span>
                      ) : (
                        <a
                          href={item.href}
                          className="text-surface/70 hover:text-surface text-sm transition-colors"
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="border-surface/15 border-t py-8">
          <p className="text-surface/45 max-w-4xl text-xs leading-relaxed">
            {FOOTER_DISCLAIMER}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-surface/50 text-[0.7rem] tracking-[0.1em] uppercase">
              &copy; {year} All rights reserved by {SITE.legalName}
            </p>
            <p className="text-surface/50 text-[0.7rem] tracking-[0.1em] uppercase">
              Copyrights &copy; {SITE.builtBy}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
