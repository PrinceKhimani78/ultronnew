'use client';

import { Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { Logo } from '@/components/layout/Logo';
import { PRIMARY_CTA, PRIMARY_NAV, SITE } from '@/content/site';
import { cn } from '@/lib/utils';

/**
 * The floating navigation bar.
 *
 * The design draws the header as a dark-green pill inset from the page edges and
 * sitting *on* the cream background, rather than a full-bleed bar that changes
 * colour on scroll. The only scroll response is a shadow, which keeps the pill
 * legible once content passes beneath it.
 *
 * Client-side because it owns three pieces of browser state: scroll position,
 * drawer open/closed, and focus. It is the only client component in the page
 * shell — every band below it renders on the server.
 *
 * The drawer is hand-rolled: the installed Radix primitives are Accordion, Label
 * and Slot, with no Dialog. That makes the focus contract this component's
 * responsibility — trap Tab, close on Escape, restore focus to the trigger.
 */

/** Past this, content sits under the bar and it needs separating from the page. */
const SCROLL_THRESHOLD_PX = 24;

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Whether a nav entry points at the page currently being viewed.
 *
 * Entries are a mix of routes (`/services`) and home-page anchors (`/#about`).
 * An anchor is never "current" — it is a position on a page, not a page — so
 * only the path before the hash is compared, and a bare `/` must match exactly
 * or Home would be marked current on every route.
 */
function isCurrentRoute(href: string, pathname: string) {
  /**
   * Any href carrying a hash is an in-page anchor — a position on a page, not a
   * page — so it is never "current".
   *
   * This is checked before anything else because stripping the hash first turns
   * `/#about` into `/`, which then matches the home route: on the home page that
   * marked About, Blogs and Contact as current simultaneously, gold-underlining
   * four nav items and putting `aria-current="page"` on all of them.
   */
  if (href.includes('#')) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const drawerId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    onScroll();
    // Passive: this listener never calls preventDefault, and saying so lets the
    // browser scroll without waiting on it.
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isDrawerOpen) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    // A background that scrolls under an open drawer reads as broken.
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDrawer();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;

      /**
       * The close button lives in the bar, outside the panel. Including it in
       * the cycle is what makes the drawer dismissable by keyboard — trapping to
       * the panel alone would leave Escape as the only way out.
       */
      const focusable = [
        ...(triggerRef.current ? [triggerRef.current] : []),
        ...Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)),
      ];
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      // Wrap at both ends, so Tab can never reach the inert page behind.
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
            // Square off the bottom corners while the drawer is attached.
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

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-8">
                {PRIMARY_NAV.map((item) => {
                  const isCurrent = isCurrentRoute(item.href, pathname);
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        /**
                         * The design underlines the current page in gold.
                         * `aria-current` carries that to a screen reader,
                         * because the gold rule alone conveys nothing.
                         */
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

          {/*
            Rendered even when closed, hidden with the `hidden` attribute rather
            than unmounted: `aria-controls` must point at an element that exists,
            or it is a dangling reference. `hidden` also removes the subtree from
            the accessibility tree, so nothing is announced while it is shut.
          */}
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
                {PRIMARY_NAV.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={closeDrawer}
                      aria-current={
                        isCurrentRoute(item.href, pathname) ? 'page' : undefined
                      }
                      className="border-surface/10 text-surface block border-b py-4 text-sm font-medium tracking-[0.12em] uppercase"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
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
