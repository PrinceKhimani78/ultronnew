'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { Logo } from '@/components/layout/Logo';
import { MobileDrawer } from '@/components/layout/MobileDrawer';
import { SERVICES } from '@/content/services';
import { PRIMARY_CTA, PRIMARY_NAV, SITE } from '@/content/site';
import { isCurrentRoute } from '@/lib/nav';
import { cn } from '@/lib/utils';

/**
 * The nav pill, transcribed from the design's "Hero" frame.
 *
 * Every measurement below is the comp's, taken from the pill's own left edge in
 * its 1280 frame: a 66px bar inset 49px from the top, logo at 35, nav block at
 * 261 running 573px wide, CTA at 944, and 66px of clear space after it. The
 * type is 18px/500 — not the 12px uppercase treatment the process band uses.
 *
 * TWO DELIBERATE DIVERGENCES from the comp, both because the comp is a static
 * 1280 canvas and this is a live site:
 *
 *   1. The comp draws the pill *inside* the hero frame, in normal flow. This
 *      header is `fixed`, because it is the site's header on every route and
 *      dropping that is a functional regression, not a restyle. The hero's top
 *      padding reproduces the comp's y-coordinates exactly, so at scroll-top —
 *      the only state the comp depicts — the two are identical.
 *   2. Because it is fixed, it lifts a hairline and a shadow once content is
 *      underneath it. That state does not exist in the comp either.
 *
 * The Services dropdown opens on hover and on focus-within rather than from a
 * caret button. The comp draws no caret, and a caret is 20px of nav width that
 * would push the CTA off the coordinate the comp puts it on — opening from the
 * item itself keeps both the metrics and the menu.
 */

/** Past this, content sits under the bar and it needs separating from the page. */
const SCROLL_THRESHOLD_PX = 24;

const CREAM = '#FDFBEE';

/**
 * The comp gives the nav block both a 573px width and a 44px gutter, and those
 * two facts disagree: the same five labels at 18px/500 measure 526px in the
 * browser. Width wins, distributed with `justify-between` — it is what puts the
 * CTA after it on the comp's x=944, where honouring the 44px gutter instead
 * drags it 37px left.
 *
 * Labels are pure white at rest — no tint, no reduced opacity — and resolve to
 * brand gold on hover and on the current route. The current page also keeps the
 * hairline gold rule beneath it, so the state is carried by two signals rather
 * than by colour alone.
 *
 * Both states carry a `border-b`, one transparent, so the underline costs the
 * same 1px of box in either state and the baseline never shifts when the route
 * changes. Weight stays `font-medium` in both, for the same reason: a heavier
 * current label would re-measure the nav and move every item after it.
 *
 * Colour is set with classes rather than an inline `style`, because an inline
 * colour outranks `hover:text-*` and the hover would never fire.
 *
 * The curve is CSS's literal `ease`, spelled out. Tailwind's `transition-colors`
 * defaults to `cubic-bezier(0.4, 0, 0.2, 1)`, which is not the same easing.
 */
const NAV_LINK =
  'block pb-1 text-[18px] leading-none font-medium whitespace-nowrap uppercase ' +
  'border-b transition-colors duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ' +
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DCCB8E]';

const NAV_LINK_CURRENT = 'border-[#DCCB8E] text-[#DCCB8E]';
const NAV_LINK_DEFAULT = 'border-transparent text-white hover:text-[#DCCB8E]';

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
        { rootMargin: '-10px 0px -85% 0px', threshold: 0 },
      );

      darkSections.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    };

    const timeoutId = setTimeout(observeDarkSections, 100);
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  const openDropdown = useCallback(() => {
    if (dropdownCloseTimeoutRef.current) {
      clearTimeout(dropdownCloseTimeoutRef.current);
      dropdownCloseTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  }, []);

  const scheduleDropdownClose = useCallback(() => {
    if (dropdownCloseTimeoutRef.current) {
      clearTimeout(dropdownCloseTimeoutRef.current);
    }
    dropdownCloseTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 250);
  }, []);

  useEffect(() => {
    return () => {
      if (dropdownCloseTimeoutRef.current) {
        clearTimeout(dropdownCloseTimeoutRef.current);
      }
    };
  }, []);

  // Escape closes the desktop dropdown.
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

  useEffect(() => {
    if (!isDrawerOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isDrawerOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-6 lg:pt-[49px]">
      {/*
        The pill's own gutter, which is narrower than the page measure — the
        comp insets the bar 46px in its 1280 frame where the content sits at 85,
        so the bar floats slightly wider than the content beneath it.

        `.page-shell` supplies the max-width and centring; the padding utility
        overrides the shell's content gutter with the pill's smaller one. That
        override is safe without `!important` because the shell is declared in
        the `components` layer and this is a utility.
      */}
      <div className="page-shell px-[var(--pill-gutter)]">
        <div
          className={cn(
            'bg-brand-panel text-surface rounded-[100px] transition-all duration-300 ease-in-out',
            // A ring, not a border. A 1px border grows the pill to 68px and
            // pushes the logo and CTA 1px off the comp's x-coordinates; a ring
            // is a box-shadow and costs no layout. In Tailwind v4 the ring and
            // shadow slots compose rather than overwrite, so both can apply.
            isOverDarkSection ? 'ring-surface/20 ring-1' : 'ring-0',
            isScrolled || isOverDarkSection ? 'shadow-lift' : 'shadow-none',
          )}
        >
          {/*
            THIS PADDING IS WHAT ALIGNS THE WHOLE SITE.

            The logo's left edge is `--pill-gutter + this padding` from the
            measure's edge. Deriving the padding as the difference between the
            content gutter and the pill gutter makes that sum resolve to exactly
            `--page-gutter` — the same line `.page-shell` puts every heading,
            card, form and footer column on.

            It is a subtraction rather than a hard-coded number so the alignment
            survives a change to either gutter. A literal value here would hold
            at one breakpoint and quietly drift at the other three, which is the
            bug this replaced.
          */}
          <div className="flex h-[66px] items-center justify-between px-[calc(var(--page-gutter)-var(--pill-gutter))]">
            <Link
              href="/"
              className="shrink-0 rounded-sm"
              aria-label={`${SITE.name} — home`}
            >
              {/*
                Width is pinned, not height. The lockup is 640×177 (ratio 3.62)
                where the comp's export is 167×49 (ratio 3.41), so one axis has
                to give. Pinning width keeps the logo's right edge — and the nav
                and CTA that follow it — on the comp's x-coordinates.
              */}
              <Logo tone="cream" className="h-auto w-[128px] lg:w-[167px]" />
            </Link>

            <nav
              aria-label="Primary"
              className="hidden lg:block xl:ml-[59px] xl:w-[573px]"
            >
              <ul className="flex items-center gap-6 xl:justify-between xl:gap-[44px]">
                {PRIMARY_NAV.map((item) => {
                  const isCurrent = isCurrentRoute(item.href, pathname);
                  const isServices = item.href === '/services';

                  const linkClass = cn(
                    NAV_LINK,
                    isCurrent ? NAV_LINK_CURRENT : NAV_LINK_DEFAULT,
                  );

                  if (isServices) {
                    return (
                      <li
                        key={item.href}
                        className="relative"
                        onMouseEnter={openDropdown}
                        onMouseLeave={scheduleDropdownClose}
                        onFocus={openDropdown}
                        onBlur={scheduleDropdownClose}
                      >
                        <Link
                          href={item.href}
                          aria-current={isCurrent ? 'page' : undefined}
                          aria-expanded={isDropdownOpen}
                          aria-haspopup="menu"
                          aria-controls={dropdownId}
                          className={linkClass}
                        >
                          {item.label}
                        </Link>

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
                              className={cn(
                                'bg-brand-panel/95 border-surface/20 shadow-lift text-surface absolute top-full left-1/2 z-50 mt-4 w-72 -translate-x-1/2 rounded-2xl border p-3 backdrop-blur-xl',
                                "before:absolute before:-top-4 before:right-0 before:left-0 before:h-4 before:content-['']",
                              )}
                            >
                              {/*
                                `justify-end` rather than `justify-between`.
                                With the "Our Services" heading removed this row
                                has a single child, and `justify-between` packs a
                                lone child to the START — the link would silently
                                jump from the right edge to the left. Stating the
                                alignment keeps it on the corner the design puts
                                it on.

                                `mb-1` where it was `mb-2`: the brief asks the
                                service list to move up into the space the
                                heading vacated.
                              */}
                              <div className="border-surface/15 mb-1 flex items-center justify-end border-b px-3 pt-1.5 pb-2">
                                <Link
                                  href="/services"
                                  onClick={() => setIsDropdownOpen(false)}
                                  className="flex items-center gap-1 text-[0.65rem] font-semibold text-[#DCCB8E] uppercase hover:underline"
                                >
                                  All Services{' '}
                                  <ArrowRight className="h-2.5 w-2.5" />
                                </Link>
                              </div>

                              <ul className="space-y-0.5" role="none">
                                {SERVICES.map((s) => {
                                  const isSubCurrent = isCurrentRoute(
                                    `/services/${s.slug}`,
                                    pathname,
                                  );
                                  return (
                                    <li key={s.slug} role="none">
                                      <Link
                                        href={`/services/${s.slug}`}
                                        role="menuitem"
                                        aria-current={
                                          isSubCurrent ? 'page' : undefined
                                        }
                                        onClick={() => setIsDropdownOpen(false)}
                                        className={cn(
                                          'group hover:bg-surface/10 flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors duration-300',
                                          isSubCurrent
                                            ? 'font-semibold text-[#DCCB8E]'
                                            : 'text-surface/85 font-medium hover:text-[#DCCB8E]',
                                        )}
                                      >
                                        <span>{s.title}</span>
                                        <span className="text-xs text-[#DCCB8E] opacity-0 transition-opacity group-hover:opacity-100">
                                          →
                                        </span>
                                      </Link>
                                    </li>
                                  );
                                })}

                                {/*
                                  The list's own closing entry. It is a real menu
                                  item — same row geometry, same `role`, same
                                  dismiss-on-click — carrying the top link's
                                  treatment: gold, uppercase, semibold, and the
                                  same `ArrowRight` glyph rather than the `→`
                                  character the service rows use on hover.

                                  Separation is `pt-2` on the `li`, NOT `mt-2`.
                                  The `space-y-0.5` on the `ul` compiles to
                                  `.space-y-0\.5 > :not(…) ~ :not(…)`, which is a
                                  more specific selector than a bare `.mt-2` —
                                  a margin utility here is simply overruled and
                                  the gap never appears. Padding is not in that
                                  fight.
                                */}
                                <li role="none" className="pt-2">
                                  <Link
                                    href="/services"
                                    role="menuitem"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="group hover:bg-surface/10 flex items-center justify-between rounded-xl px-3 py-2 text-[0.65rem] font-semibold text-[#DCCB8E] uppercase transition-colors duration-300"
                                  >
                                    <span className="group-hover:underline">
                                      All Services
                                    </span>
                                    <ArrowRight className="h-2.5 w-2.5" />
                                  </Link>
                                </li>
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
                'hidden h-[38px] w-[177px] shrink-0 items-center gap-[9px] rounded-full pl-5 lg:inline-flex xl:ml-[110px]',
                'text-[18px] leading-none font-medium uppercase',
                'ease-house transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DCCB8E] hover:shadow-[0_6px_14px_rgba(0,0,0,0.18)]',
              )}
              style={{ backgroundColor: CREAM, color: '#035551' }}
            >
              {/*
                The comp's own 16×18 handset. Drawn at its intrinsic size so it
                is never resampled, and `aria-hidden` with an empty alt because
                the adjacent label already says "Book a call".

                The artwork is dark teal on transparent, which is why no
                recolouring is needed: it reads correctly on the cream default
                and on the gold hover fill. A `currentColor` swap is not
                available to a raster, so the palette had to already work.
              */}
              <Image
                src="/brand/call.png"
                alt=""
                aria-hidden="true"
                width={16}
                height={18}
                // Fixed and above the fold on every route, so the default lazy
                // load would let this pop in after paint. Eager rather than
                // `priority`: at ~1KB it does not deserve a preload slot ahead
                // of the hero image.
                loading="eager"
                className="h-[18px] w-4 shrink-0"
              />
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
      </div>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
        drawerId={drawerId}
      />
    </header>
  );
}
