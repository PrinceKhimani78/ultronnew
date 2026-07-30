'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Logo } from '@/components/layout/Logo';
import { SERVICES } from '@/content/services';
import { PRIMARY_CTA, PRIMARY_NAV } from '@/content/site';
import { cn } from '@/lib/utils';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drawerId: string;
}

export function MobileDrawer({ isOpen, onClose, drawerId }: MobileDrawerProps) {
  const pathname = usePathname();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const drawerRef = useRef<HTMLDivElement>(null);

  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen) {
      setIsServicesOpen(false);
    }
  }

  useEffect(() => {
    if (!isOpen) return;

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
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          id={drawerId}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50"
            aria-hidden="true"
          />

          {/* Full Screen Drawer Panel */}
          <motion.div
            key="panel"
            ref={drawerRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="bg-brand text-surface fixed inset-0 z-10 flex h-full w-full flex-col overflow-y-auto p-6 shadow-2xl"
          >
            {/* Header: Logo + Close Button */}
            <div className="border-surface/15 flex items-center justify-between border-b pb-4">
              <Link href="/" onClick={onClose} aria-label="Home">
                <Logo />
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="text-surface hover:text-accent p-2 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto py-6">
              <ul className="flex flex-col space-y-2">
                {PRIMARY_NAV.map((item) => {
                  const isServices = item.href === '/services';
                  const isCurrent =
                    item.href === '/'
                      ? pathname === '/'
                      : !item.href.includes('#') &&
                        pathname.startsWith(item.href);

                  if (isServices) {
                    return (
                      <li key={item.href} className="flex flex-col">
                        <div className="hover:bg-surface/10 flex w-full items-center justify-between rounded-lg px-3 py-2 transition-colors">
                          <Link
                            href="/services"
                            onClick={onClose}
                            aria-current={isCurrent ? 'page' : undefined}
                            className={cn(
                              'flex-1 text-sm font-medium tracking-wider uppercase transition-colors',
                              isCurrent
                                ? 'text-accent font-semibold'
                                : 'text-surface/90 hover:text-surface',
                            )}
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setIsServicesOpen((prev) => !prev)}
                            aria-expanded={isServicesOpen}
                            aria-label="Toggle Services submenu"
                            className="text-surface/90 hover:text-accent focus-visible:ring-accent rounded p-1 transition-colors focus-visible:ring-1 focus-visible:outline-none"
                          >
                            <ChevronDown
                              className={cn(
                                'h-4 w-4 transition-transform duration-200',
                                isServicesOpen && 'text-accent rotate-180',
                              )}
                            />
                          </button>
                        </div>

                        {isServicesOpen && (
                          <ul className="border-surface/20 my-2 ml-4 space-y-2 border-l pl-3">
                            <li>
                              <Link
                                href="/services"
                                onClick={onClose}
                                className="text-accent flex items-center gap-1.5 py-1 text-xs font-semibold uppercase"
                              >
                                <span>All Services</span>
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            </li>
                            {SERVICES.map((s) => (
                              <li key={s.slug}>
                                <Link
                                  href={`/services/${s.slug}`}
                                  onClick={onClose}
                                  className="text-surface/80 hover:text-surface block py-1 text-xs"
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
                        onClick={onClose}
                        className={cn(
                          'block rounded-lg px-3 py-2 text-sm font-medium tracking-wider uppercase transition-colors',
                          isCurrent
                            ? 'text-accent font-semibold'
                            : 'text-surface/90 hover:text-surface',
                        )}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* CTA Button */}
            <div className="border-surface/15 mt-auto border-t pt-4">
              <a
                href={PRIMARY_CTA.href}
                onClick={onClose}
                className="bg-surface text-brand hover:bg-surface/90 flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>{PRIMARY_CTA.label}</span>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
