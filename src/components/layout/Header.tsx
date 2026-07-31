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
import { isCurrentRoute } from '@/lib/nav';
import { cn } from '@/lib/utils';

/**
 * Past this, content sits under the bar and it needs separating from the page.
 */
const SCROLL_THRESHOLD_PX = 24;

/**
 * Nav label treatment, shared by the plain links and by the Services link that
 * sits beside the dropdown caret so the two cannot drift apart.
 *
 * The underline is an `::after` rule rather than a `border-bottom` because the
 * design wants it to grow from the left on hover. A border can only fade, and it
 * would also run the full width of the padding box; this one is the width of the
 * text, which is what the comp draws.
 */
const NAV_LINK =
  'ease-house relative inline-block py-1 text-[0.8125rem] font-medium tracking-[0.06em] uppercase transition-colors duration-200 xl:text-[0.9375rem] ' +
  "after:bg-accent after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:transition-transform after:duration-200 after:content-['']";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);

  const drawerId = useId();
  const dropdownId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * The pill is the same teal as the footer, so where the fixed header crosses a
   * dark section the two greens meet with no edge between them. This does not
   * invert the bar — the comp has exactly one header and it is dark — it only
   * lifts a hairline and a shadow so the pill keeps its outline.
   */
  useEffect(() => {
    const observeDarkSections = () => {
      const darkSections = Array.from(
        document.querySelectorAll<HTMLElement>(
          '[data-header-tone="dark"], footer',
        ),
      );

      if (darkSections.length === 0) {
        setIsOverDarkSection(false);
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
          setIsOverDarkSection(activeDarkSet.size > 0);
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
    <header className="fixed inset-x-0 top-0 z-40 pt-4 sm:pt-6 lg:pt-8">
      <Container width="wide">
        <div
          className={cn(
            'bg-brand-panel text-surface rounded-[100px] border transition-all duration-300 ease-in-out',
            isOverDarkSection ? 'border-surface/20' : 'border-transparent',
            isScrolled || isOverDarkSection ? 'shadow-lift' : 'shadow-soft',
          )}
        >
          <div className="flex h-[60px] items-center justify-between gap-4 pr-3 pl-4 sm:pr-4 sm:pl-6 lg:h-[66px] lg:gap-6 lg:pr-5 lg:pl-8">
            <Link
              href="/"
              className="shrink-0 rounded-sm"
              aria-label={`${SITE.name} — home`}
            >
              <Logo tone="cream" className="h-[34px] sm:h-[38px] lg:h-[42px]" />
            </Link>

            {/* Desktop Navigation with Dropdown */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-6 xl:gap-10">
                {PRIMARY_NAV.map((item) => {
                  const isCurrent = isCurrentRoute(item.href, pathname);
                  const isServices = item.href === '/services';

                  const linkClass = cn(
                    NAV_LINK,
                    isCurrent
                      ? 'text-accent after:scale-x-100'
                      : 'text-surface hover:text-accent after:scale-x-0 hover:after:scale-x-100',
                  );

                  if (isServices) {
                    return (
                      <li
                        key={item.href}
                        className="relative flex items-center gap-1.5 py-2"
                        onMouseEnter={handleMouseEnterDropdown}
                        onMouseLeave={handleMouseLeaveDropdown}
                      >
                        <Link
                          href={item.href}
                          aria-current={isCurrent ? 'page' : undefined}
                          className={linkClass}
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
                            'ease-house focus-visible:ring-accent rounded p-0.5 transition-colors duration-200 focus-visible:ring-1 focus-visible:outline-none',
                            isCurrent || isDropdownOpen
                              ? 'text-accent'
                              : 'text-surface hover:text-accent',
                          )}
                        >
                          <ChevronDown
                            className={cn(
                              'h-3.5 w-3.5 transition-transform duration-200',
                              isDropdownOpen && 'rotate-180',
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
                                'bg-brand-panel/95 border-surface/20 shadow-lift text-surface absolute top-full left-1/2 z-50 mt-3 w-72 -translate-x-1/2 rounded-2xl border p-3 backdrop-blur-xl',
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
                    <li key={item.href} className="py-2">
                      <a
                        href={item.href}
                        aria-current={isCurrent ? 'page' : undefined}
                        className={linkClass}
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
                'bg-surface text-brand hidden h-[40px] shrink-0 items-center gap-2 rounded-full border border-transparent px-5 lg:inline-flex',
                'text-[0.75rem] font-medium tracking-[0.06em] uppercase xl:text-[0.8125rem]',
                'ease-house transition-all duration-200',
                'hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(0,0,0,0.18)]',
              )}
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              {PRIMARY_CTA.label}
            </a>

            <button
              ref={triggerRef}
              type="button"
              className="text-surface hover:bg-surface/10 -mr-1 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 lg:hidden"
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
