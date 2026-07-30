'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Phone, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { Logo } from '@/components/layout/Logo';
import { MobileDrawer } from '@/components/layout/MobileDrawer';
import { PRIMARY_CTA, PRIMARY_NAV, SITE } from '@/content/site';
import { SERVICES } from '@/content/services';
import { cn } from '@/lib/utils';

/**
 * Past this, content sits under the bar and it needs separating from the page.
 */
const SCROLL_THRESHOLD_PX = 24;

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
  const [isDarkSectionHeader, setIsDarkSectionHeader] = useState(false);

  const drawerId = useId();
  const dropdownId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // IntersectionObserver to detect when header overlaps dark sections
  useEffect(() => {
    const observeDarkSections = () => {
      const darkSections = Array.from(
        document.querySelectorAll<HTMLElement>(
          '[data-header-tone="dark"], footer',
        ),
      );

      if (darkSections.length === 0) {
        setIsDarkSectionHeader(false);
        return;
      }

      const activeDarkSet = new Set<Element>();

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              activeDarkSet.add(entry.target);
            } else {
              activeDarkSet.delete(entry.target);
            }
          });
          setIsDarkSectionHeader(activeDarkSet.size > 0);
        },
        {
          rootMargin: '-10px 0px -85% 0px',
          threshold: 0,
        },
      );

      darkSections.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    };

    const timeoutId = setTimeout(observeDarkSections, 100);
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  const handleMouseEnterDropdown = useCallback(() => {
    if (dropdownCloseTimeoutRef.current) {
      clearTimeout(dropdownCloseTimeoutRef.current);
      dropdownCloseTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  }, []);

  const handleMouseLeaveDropdown = useCallback(() => {
    if (dropdownCloseTimeoutRef.current) {
      clearTimeout(dropdownCloseTimeoutRef.current);
    }
    dropdownCloseTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 250);
  }, []);

  // Cleanup close timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownCloseTimeoutRef.current) {
        clearTimeout(dropdownCloseTimeoutRef.current);
      }
    };
  }, []);

  // Escape key closes desktop dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isDropdownOpen]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (!isDrawerOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isDrawerOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-4 sm:pt-6">
      <Container width="wide">
        <div
          className={cn(
            'rounded-full border transition-all duration-500 ease-in-out',
            isDarkSectionHeader
              ? 'border-[#C9B37E]/25 bg-[#FDFBEE] text-[#035551] shadow-[0_10px_30px_rgba(0,0,0,0.08)]'
              : 'text-surface border-transparent bg-[#035551]',
            isScrolled ? 'shadow-lift' : 'shadow-soft',
          )}
        >
          <div className="flex h-16 items-center justify-between gap-6 pr-3 pl-5 sm:h-[4.5rem] sm:pr-4 sm:pl-7">
            <Link
              href="/"
              className="rounded-sm"
              aria-label={`${SITE.name} — home`}
            >
              <Logo tone={isDarkSectionHeader ? 'green' : 'cream'} />
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
                        className="relative flex items-center gap-1 py-2"
                        onMouseEnter={handleMouseEnterDropdown}
                        onMouseLeave={handleMouseLeaveDropdown}
                      >
                        <Link
                          href={item.href}
                          aria-current={isCurrent ? 'page' : undefined}
                          className={cn(
                            'ease-house py-1 text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-500',
                            'border-b-2',
                            isCurrent
                              ? 'border-[#C9B37E] ' +
                                  (isDarkSectionHeader
                                    ? 'text-[#035551]'
                                    : 'text-surface')
                              : isDarkSectionHeader
                                ? 'border-transparent text-[#035551] hover:text-[#C9B37E]'
                                : 'text-surface/75 hover:text-surface border-transparent',
                          )}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (dropdownCloseTimeoutRef.current) {
                              clearTimeout(dropdownCloseTimeoutRef.current);
                            }
                            setIsDropdownOpen((prev) => !prev);
                          }}
                          aria-expanded={isDropdownOpen}
                          aria-haspopup="menu"
                          aria-controls={dropdownId}
                          aria-label="Toggle Services submenu"
                          className={cn(
                            'ease-house focus-visible:ring-accent rounded p-1 transition-colors duration-500 focus-visible:ring-1 focus-visible:outline-none',
                            isDarkSectionHeader
                              ? 'text-[#035551] hover:text-[#C9B37E]'
                              : 'text-surface/75 hover:text-surface',
                          )}
                        >
                          <ChevronDown
                            className={cn(
                              'h-3.5 w-3.5 transition-transform duration-200',
                              isDropdownOpen &&
                                (isDarkSectionHeader
                                  ? 'rotate-180 text-[#C9B37E]'
                                  : 'text-accent rotate-180'),
                            )}
                          />
                        </button>

                        {/* Services Dropdown Panel */}
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              id={dropdownId}
                              role="menu"
                              initial={{ opacity: 0, y: 8, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.98 }}
                              transition={{
                                duration: 0.2,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              onMouseEnter={handleMouseEnterDropdown}
                              onMouseLeave={handleMouseLeaveDropdown}
                              className={cn(
                                'bg-brand-deep/95 border-surface/20 shadow-lift text-surface absolute top-full left-1/2 z-50 mt-2 w-72 -translate-x-1/2 rounded-2xl border p-3 backdrop-blur-xl',
                                "before:absolute before:-top-4 before:right-0 before:left-0 before:h-4 before:content-['']",
                              )}
                            >
                              <div className="border-surface/15 mb-2 flex items-center justify-between border-b px-3 pt-1.5 pb-2">
                                <span className="text-surface/60 text-[0.65rem] font-bold tracking-wider uppercase">
                                  Our Services
                                </span>
                                <Link
                                  href="/services"
                                  onClick={() => setIsDropdownOpen(false)}
                                  className="text-accent flex items-center gap-1 text-[0.65rem] font-semibold uppercase hover:underline"
                                >
                                  All Services{' '}
                                  <ArrowRight className="h-2.5 w-2.5" />
                                </Link>
                              </div>

                              <ul className="space-y-0.5" role="none">
                                <li role="none">
                                  <Link
                                    href="/services"
                                    role="menuitem"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="group text-accent hover:bg-surface/10 flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors"
                                  >
                                    <span>View All Services</span>
                                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                                  </Link>
                                </li>
                                {SERVICES.map((s) => (
                                  <li key={s.slug} role="none">
                                    <Link
                                      href={`/services/${s.slug}`}
                                      role="menuitem"
                                      onClick={() => setIsDropdownOpen(false)}
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
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }

                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        aria-current={isCurrent ? 'page' : undefined}
                        className={cn(
                          'ease-house text-xs font-medium tracking-[0.12em] uppercase transition-colors duration-500',
                          'border-b-2 py-1',
                          isCurrent
                            ? 'border-[#C9B37E] ' +
                                (isDarkSectionHeader
                                  ? 'text-[#035551]'
                                  : 'text-surface')
                            : isDarkSectionHeader
                              ? 'border-transparent text-[#035551] hover:text-[#C9B37E]'
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
                'hidden items-center gap-2 rounded-full lg:inline-flex',
                'px-6 py-3 text-xs font-semibold tracking-[0.12em] uppercase',
                'transition-all duration-500 ease-in-out',
                isDarkSectionHeader
                  ? 'bg-[#035551] text-white hover:bg-[#C9B37E] hover:text-[#035551]'
                  : 'bg-surface text-brand hover:bg-surface/90',
              )}
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              {PRIMARY_CTA.label}
            </a>

            <button
              ref={triggerRef}
              type="button"
              className={cn(
                '-mr-1 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-500 lg:hidden',
                isDarkSectionHeader
                  ? 'text-[#035551] hover:bg-[#035551]/10'
                  : 'text-surface hover:bg-surface/10',
              )}
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
        </div>
      </Container>

      {/* Luxury Vault Door Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        drawerId={drawerId}
      />
    </header>
  );
}
