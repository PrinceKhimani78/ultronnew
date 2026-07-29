'use client';

import { ChevronDown, Menu, Phone, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { Logo } from '@/components/layout/Logo';
import { PRIMARY_CTA, PRIMARY_NAV, SITE } from '@/content/site';
import { SERVICES } from '@/content/services';
import { cn } from '@/lib/utils';

/**
 * Past this, content sits under the bar and it needs separating from the page.
 */
const SCROLL_THRESHOLD_PX = 24;

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function isCurrentRoute(href: string, pathname: string) {
  if (href.includes('#')) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const drawerId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setIsMobileServicesOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isDrawerOpen) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDrawer();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;

      const focusable = [
        ...(triggerRef.current ? [triggerRef.current] : []),
        ...Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)),
      ];
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [isDrawerOpen, closeDrawer]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-4 sm:pt-6">
      <Container width="wide">
        <div
          className={cn(
            'bg-brand text-surface rounded-full',
            'ease-house transition-shadow duration-300',
            isScrolled ? 'shadow-lift' : 'shadow-soft',
            isDrawerOpen && 'rounded-b-none lg:rounded-b-full',
          )}
        >
          <div className="flex h-16 items-center justify-between gap-6 pr-3 pl-5 sm:h-[4.5rem] sm:pr-4 sm:pl-7">
            <Link
              href="/"
              className="rounded-sm"
              aria-label={`${SITE.name} — home`}
            >
              <Logo />
            </Link>

            {/* Desktop Navigation with Dropdown */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {PRIMARY_NAV.map((item) => {
                  const isCurrent = isCurrentRoute(item.href, pathname);
                  const isServices = item.href === '/services';

                  if (isServices) {
                    return (
                      <li
                        key={item.href}
                        className="relative"
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                      >
                        <Link
                          href={item.href}
                          aria-current={isCurrent ? 'page' : undefined}
                          aria-expanded={isDropdownOpen}
                          className={cn(
                            'ease-house flex items-center gap-1.5 text-xs font-medium tracking-[0.12em] uppercase transition-colors',
                            'border-b-2 py-1',
                            isCurrent
                              ? 'border-accent text-surface'
                              : 'text-surface/75 hover:text-surface border-transparent',
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              'h-3.5 w-3.5 transition-transform duration-200',
                              isDropdownOpen && 'text-accent rotate-180',
                            )}
                          />
                        </Link>

                        {/* Services Dropdown Panel */}
                        {isDropdownOpen && (
                          <div
                            className={cn(
                              'bg-brand-deep/95 border-surface/20 shadow-lift text-surface absolute top-full left-1/2 z-50 mt-2.5 w-72 -translate-x-1/2 rounded-2xl border p-3 backdrop-blur-xl',
                            )}
                          >
                            <div className="border-surface/15 mb-2 flex items-center justify-between border-b px-3 pt-1.5 pb-2">
                              <span className="text-surface/60 text-[0.65rem] font-bold tracking-wider uppercase">
                                Our Services
                              </span>
                              <Link
                                href="/services"
                                className="text-accent flex items-center gap-1 text-[0.65rem] font-semibold uppercase hover:underline"
                              >
                                All Services{' '}
                                <ArrowRight className="h-2.5 w-2.5" />
                              </Link>
                            </div>

                            <ul className="space-y-0.5">
                              <li>
                                <Link
                                  href="/services"
                                  className="group text-accent hover:bg-surface/10 flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors"
                                >
                                  <span>View All Services</span>
                                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                              </li>
                              {SERVICES.map((s) => (
                                <li key={s.slug}>
                                  <Link
                                    href={`/services/${s.slug}`}
                                    className="group text-surface/85 hover:bg-surface/10 hover:text-surface flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors"
                                  >
                                    <span>{s.title}</span>
                                    <span className="text-accent text-xs opacity-0 transition-opacity group-hover:opacity-100">
                                      →
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        aria-current={isCurrent ? 'page' : undefined}
                        className={cn(
                          'ease-house text-xs font-medium tracking-[0.12em] uppercase transition-colors',
                          'border-b-2 py-1',
                          isCurrent
                            ? 'border-accent text-surface'
                            : 'text-surface/75 hover:text-surface border-transparent',
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <a
              href={PRIMARY_CTA.href}
              className={cn(
                'bg-surface text-brand hidden items-center gap-2 rounded-full lg:inline-flex',
                'px-6 py-3 text-xs font-semibold tracking-[0.12em] uppercase',
                'ease-house hover:bg-surface/90 transition-colors',
              )}
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              {PRIMARY_CTA.label}
            </a>

            <button
              ref={triggerRef}
              type="button"
              className="text-surface -mr-1 inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
              aria-expanded={isDrawerOpen}
              aria-controls={drawerId}
              aria-label={isDrawerOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsDrawerOpen((open) => !open)}
            >
              {isDrawerOpen ? (
                <X aria-hidden="true" className="h-6 w-6" />
              ) : (
                <Menu aria-hidden="true" className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Drawer */}
          <div
            ref={panelRef}
            id={drawerId}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            hidden={!isDrawerOpen}
            className="border-surface/15 max-h-[calc(100dvh-8rem)] overflow-y-auto border-t px-5 pb-6 lg:hidden"
          >
            <nav aria-label="Primary (mobile)" className="pt-2">
              <ul className="flex flex-col">
                {PRIMARY_NAV.map((item) => {
                  const isServices = item.href === '/services';

                  if (isServices) {
                    return (
                      <li
                        key={item.href}
                        className="border-surface/10 border-b py-3"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setIsMobileServicesOpen((prev) => !prev)
                          }
                          className="text-surface flex w-full items-center justify-between py-1 text-sm font-medium tracking-[0.12em] uppercase"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform duration-200',
                              isMobileServicesOpen && 'text-accent rotate-180',
                            )}
                          />
                        </button>

                        {isMobileServicesOpen && (
                          <ul className="border-surface/20 mt-2 space-y-2 border-l pl-4">
                            <li>
                              <Link
                                href="/services"
                                onClick={closeDrawer}
                                className="text-accent block py-1.5 text-xs font-semibold tracking-wider uppercase"
                              >
                                View All Services →
                              </Link>
                            </li>
                            {SERVICES.map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`/services/${s.slug}`}
                                  onClick={closeDrawer}
                                  className="text-surface/80 hover:text-surface block py-1.5 text-xs"
                                >
                                  {s.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={closeDrawer}
                        aria-current={
                          isCurrentRoute(item.href, pathname)
                            ? 'page'
                            : undefined
                        }
                        className="border-surface/10 text-surface block border-b py-4 text-sm font-medium tracking-[0.12em] uppercase"
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <a
                href={PRIMARY_CTA.href}
                onClick={closeDrawer}
                className="bg-surface text-brand mt-6 flex items-center justify-center gap-2 rounded-full px-6 py-4 text-xs font-semibold tracking-[0.12em] uppercase"
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                {PRIMARY_CTA.label}
              </a>
            </nav>
          </div>
        </div>
      </Container>

      {isDrawerOpen ? (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={closeDrawer}
          className="bg-brand-ink/40 fixed inset-0 -z-10 lg:hidden"
        />
      ) : null}
    </header>
  );
}
