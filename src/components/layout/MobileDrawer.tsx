'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Logo } from '@/components/layout/Logo';
import { SERVICES } from '@/content/services';
import { PRIMARY_CTA, PRIMARY_NAV } from '@/content/site';
import { isCurrentRoute } from '@/lib/nav';
import { cn } from '@/lib/utils';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerId: string;
}

/**
 * Luxury Full-Screen Mobile Navigation Menu (100vw × 100vh):
 * - Brand green ground (#154B47)
 * - Fixed position inset-0, no backdrop, no card edges or radius
 * - Centered vertical navigation with generous spacing
 * - Active link: white with a gold underline; never gold text
 * - Inactive: white at 85%, resolving to full white on hover
 * - Cream pill "BOOK A CALL" button transitioning to Gold on hover
 */
export function MobileDrawer({ isOpen, onClose, drawerId }: MobileDrawerProps) {
  const pathname = usePathname();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setIsServicesOpen(false);
    }
  }

  // Lock body scroll and trap focus when open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const drawerEl = drawerRef.current;
    if (drawerEl) {
      const firstFocusable = drawerEl.querySelector<HTMLElement>(FOCUSABLE);
      firstFocusable?.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && drawerEl) {
        const focusables = Array.from(
          drawerEl.querySelectorAll<HTMLElement>(FOCUSABLE),
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="full-screen-menu"
          ref={drawerRef}
          id={drawerId}
          role="dialog"
          aria-modal="true"
          aria-label="Full Screen Navigation Menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn(
            /*
             * `inset-0` on a fixed element already IS the viewport, so there is
             * no explicit width here. A 100vw width would be wider than the
             * visible area on any viewport with a classic scrollbar, and would
             * push a horizontal scrollbar under the menu.
             *
             * Height is `100dvh`, not `h-screen`/100vh. On mobile Safari and
             * Chrome, 100vh is the viewport with the URL bar RETRACTED, so a
             * 100vh panel runs taller than what you can see and the "Book a
             * call" button at its foot sits below the fold until you scroll —
             * which the scroll lock prevents. `dvh` tracks the bar.
             */
            'fixed inset-0 z-50 flex h-[100dvh] flex-col rounded-none border-none bg-[#154B47] px-6 text-white shadow-none sm:px-10 lg:hidden',
            'pt-[env(safe-area-inset-top,1.25rem)] pb-[env(safe-area-inset-bottom,1.5rem)]',
          )}
        >
          {/* Top Bar: Logo on left, Close (X) on right */}
          <div className="flex h-[64px] shrink-0 items-center justify-between">
            <Link href="/" onClick={onClose} aria-label="Home">
              <Logo tone="cream" className="h-[36px] sm:h-[40px]" />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-white transition-colors duration-250 hover:text-white/80 focus:outline-none"
              aria-label="Close menu"
            >
              <X className="h-7 w-7" />
            </button>
          </div>

          {/* Centered Navigation Links */}
          <div className="my-auto flex flex-1 flex-col items-center justify-center py-6 text-center">
            <nav aria-label="Mobile Primary Navigation" className="w-full">
              <ul className="flex flex-col items-center">
                {PRIMARY_NAV.map((item) => {
                  const isServices = item.href === '/services';
                  const isCurrent = isCurrentRoute(item.href, pathname);

                  if (isServices) {
                    return (
                      <li
                        key={item.href}
                        className="flex w-full flex-col items-center"
                      >
                        <div className="flex h-[64px] items-center justify-center gap-2">
                          <Link
                            href="/services"
                            onClick={onClose}
                            aria-current={isCurrent ? 'page' : undefined}
                            className={cn(
                              'text-[22px] font-semibold tracking-[0.08em] uppercase transition-all duration-250 sm:text-[26px]',
                              isCurrent
                                ? 'font-bold text-white underline decoration-[#DCCB8E] underline-offset-8'
                                : 'text-white/85 hover:text-white',
                            )}
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setIsServicesOpen((prev) => !prev)}
                            aria-expanded={isServicesOpen}
                            aria-label="Toggle Services submenu"
                            className="p-2 text-white transition-colors duration-250 hover:text-white focus:outline-none"
                          >
                            <ChevronDown
                              className={cn(
                                'h-5 w-5 transition-transform duration-250',
                                isServicesOpen && 'rotate-180 text-white',
                              )}
                            />
                          </button>
                        </div>

                        {/* Accordion Submenu */}
                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25, ease: 'easeOut' }}
                              className="w-full overflow-hidden"
                            >
                              <ul className="flex flex-col items-center gap-3 py-3">
                                <li>
                                  <Link
                                    href="/services"
                                    onClick={onClose}
                                    className="text-[15px] font-semibold tracking-wider text-white uppercase transition-opacity duration-250 hover:opacity-80"
                                  >
                                    All Services
                                  </Link>
                                </li>
                                {SERVICES.map((s) => {
                                  const isSubCurrent =
                                    pathname === `/services/${s.slug}`;
                                  return (
                                    <li key={s.slug}>
                                      <Link
                                        href={`/services/${s.slug}`}
                                        onClick={onClose}
                                        className={cn(
                                          'text-[15px] font-medium transition-colors duration-250',
                                          isSubCurrent
                                            ? 'font-semibold text-white'
                                            : 'text-white/85 hover:text-white',
                                        )}
                                      >
                                        {s.title}
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }

                  return (
                    <li key={item.href} className="flex w-full justify-center">
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={isCurrent ? 'page' : undefined}
                        className={cn(
                          'flex h-[64px] items-center justify-center text-[22px] font-semibold tracking-[0.08em] uppercase transition-all duration-250 sm:text-[26px]',
                          isCurrent
                            ? 'font-bold text-white underline decoration-[#DCCB8E] underline-offset-8'
                            : 'text-white/85 hover:text-white',
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Book A Call CTA Button near bottom */}
          <div className="mt-auto flex w-full shrink-0 justify-center pt-4 pb-6">
            <a
              href={PRIMARY_CTA.href}
              onClick={onClose}
              className={cn(
                'flex h-[50px] w-full max-w-[280px] items-center justify-center gap-2.5 rounded-full bg-[#FDFBEE] px-6 text-[14px] font-bold tracking-[0.08em] text-[#035551] uppercase',
                'transition-colors duration-300 hover:bg-[#DCCB8E] hover:text-[#035551]',
              )}
            >
              <Phone className="h-4 w-4" />
              <span>{PRIMARY_CTA.label}</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
