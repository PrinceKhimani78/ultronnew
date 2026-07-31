'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

/**
 * Header for `/home-design-preview` only, rebuilt from the comp's "Hero" frame.
 *
 * It is NOT the shared `components/layout/Header`, and differs from it in ways
 * that matter, which is why this variant exists rather than a prop on the
 * shared one:
 *
 *   - the pill is #154B47, a lighter teal than the site's `--color-brand`
 *   - it is *static*, drawn inside the hero frame at y=49 — the site header is
 *     fixed and follows the scroll
 *   - nav is 18px/500 with a 44px gutter; the site header is 12px uppercase
 *   - SERVICES carries no dropdown caret in the comp
 *
 * The comp defines no mobile layout at all (its export is a fixed 1280 canvas
 * with no media queries), so the drawer below is a necessary addition rather
 * than something transcribed. It follows the same contract as the site header:
 * trap Tab, close on Escape, restore focus to the trigger, and keep the panel
 * in the DOM so `aria-controls` is never a dangling reference.
 */

const PILL = '#154B47';
const CREAM = '#FDFBEE';
const GOLD = '#C9B37E';
const BRAND = '#035551';

const NAV = [
  { label: 'HOME', href: '#top', current: true },
  { label: 'SERVICES', href: '#design-services', current: false },
  { label: 'ABOUT', href: '#design-who', current: false },
  { label: 'BLOGS', href: '#design-services', current: false },
  { label: 'CONTACT', href: '#design-contact', current: false },
] as const;

const CTA_LABEL = 'BOOK A CALL';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** The 16×18 handset the comp places before the CTA label. */
function PhoneGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
    </svg>
  );
}

export function PreviewHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const drawerId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;

      // The trigger sits outside the panel; including it is what makes the
      // drawer escapable by keyboard alone.
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
  }, [isOpen, close]);

  return (
    <header className="relative z-30 pt-6 lg:pt-[49px]">
      <div className="mx-auto w-full max-w-[1187px] px-4 sm:px-6 lg:px-6 xl:px-0">
        <div
          className={cn(
            'rounded-[100px]',
            isOpen && 'rounded-b-[28px] lg:rounded-b-[100px]',
          )}
          style={{ backgroundColor: PILL }}
        >
          {/*
            Horizontal placement is the comp's, measured from the pill's own
            left edge (x=46 in the 1280 frame): logo at 35, nav at 261, CTA at
            944, and 66px of clear space after the CTA. Explicit margins rather
            than `justify-between`, which would distribute the slack evenly and
            put the nav ~25px right of where the comp has it.
          */}
          <div className="flex h-[66px] items-center justify-between pr-3 pl-4 sm:pl-6 lg:pr-6 lg:pl-8 xl:justify-start xl:pr-[66px] xl:pl-[35px]">
            {/*
              ⚠️ SUBSTITUTED ASSET. The comp points at
              `assets/35d9345d34d0b43d.png` (167×49), which the Design MCP
              cannot return — every asset in the project exceeds the 256 KiB
              `get_file` cap. `logo-lockup-cream.webp` is the same cream
              wordmark already in the repo, drawn at the comp's 167×49 box.
            */}
            <a href="#top" aria-label="Ultron Financials — top of page">
              <Image
                src="/brand/logo-lockup-cream.webp"
                alt="Ultron Financials"
                width={167}
                height={49}
                priority
                /*
                  Width is pinned, not height. The substitute lockup is 640×177
                  (ratio 3.62) where the comp's export is 167×49 (ratio 3.41),
                  so one axis has to give. Pinning width keeps the logo's right
                  edge — and therefore the nav and CTA that follow it — on the
                  comp's x-coordinates; pinning height instead pushed everything
                  10px right.
                */
                className="h-auto w-[128px] lg:w-[167px]"
              />
            </a>

            <nav
              aria-label="Preview primary"
              className="hidden lg:block xl:ml-[59px] xl:w-[573px]"
            >
              {/*
                The comp gives this block both a 573px width and a 44px gutter.
                Those two facts disagree here: the same five labels at Funnel
                Display 18px/500 measure 526px in the browser, 47px short of the
                frame Figma exported. Width wins, distributed with
                `justify-between` — it is what puts the nav's span and the CTA
                after it on the comp's coordinates, where honouring the 44px
                gutter instead would drag the CTA 37px left of x=990.
              */}
              <ul className="flex items-center gap-6 xl:justify-between xl:gap-[44px]">
                {NAV.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className="pb-1 text-[18px] leading-none font-medium whitespace-nowrap transition-opacity duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4"
                      style={{
                        color: item.current ? GOLD : CREAM,
                        borderBottom: item.current
                          ? `1px solid ${GOLD}`
                          : '1px solid transparent',
                        outlineColor: GOLD,
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href="#design-contact"
              className="hidden h-[38px] w-[177px] items-center gap-[9px] rounded-full pl-5 text-[18px] leading-none font-medium transition-opacity duration-200 hover:opacity-90 lg:inline-flex xl:ml-[110px]"
              style={{ backgroundColor: CREAM, color: BRAND }}
            >
              <PhoneGlyph className="h-[18px] w-4 shrink-0" />
              {CTA_LABEL}
            </a>

            <button
              ref={triggerRef}
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls={drawerId}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              // 44px square: the minimum comfortable touch target.
              className="inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
              style={{ color: CREAM }}
            >
              <span aria-hidden="true" className="relative block h-4 w-6">
                <span
                  className={cn(
                    'absolute left-0 block h-0.5 w-6 transition-transform duration-200',
                    isOpen ? 'top-[7px] rotate-45' : 'top-0',
                  )}
                  style={{ backgroundColor: CREAM }}
                />
                <span
                  className={cn(
                    'absolute top-[7px] left-0 block h-0.5 w-6 transition-opacity duration-200',
                    isOpen && 'opacity-0',
                  )}
                  style={{ backgroundColor: CREAM }}
                />
                <span
                  className={cn(
                    'absolute left-0 block h-0.5 w-6 transition-transform duration-200',
                    isOpen ? 'top-[7px] -rotate-45' : 'top-[14px]',
                  )}
                  style={{ backgroundColor: CREAM }}
                />
              </span>
            </button>
          </div>

          {/* Kept mounted so `aria-controls` always resolves. */}
          <div
            ref={panelRef}
            id={drawerId}
            role="dialog"
            aria-modal="true"
            aria-label="Preview site menu"
            hidden={!isOpen}
            className="max-h-[calc(100dvh-8rem)] overflow-y-auto px-5 pb-6 lg:hidden"
            style={{ borderTop: `1px solid ${CREAM}26` }}
          >
            <nav aria-label="Preview primary (mobile)" className="pt-2">
              <ul className="flex flex-col">
                {NAV.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={close}
                      aria-current={item.current ? 'page' : undefined}
                      className="block py-4 text-[18px] font-medium"
                      style={{
                        color: item.current ? GOLD : CREAM,
                        borderBottom: `1px solid ${CREAM}1a`,
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#design-contact"
                onClick={close}
                className="mt-6 flex h-[46px] items-center justify-center gap-[9px] rounded-full text-[18px] font-medium"
                style={{ backgroundColor: CREAM, color: BRAND }}
              >
                <PhoneGlyph className="h-[18px] w-4 shrink-0" />
                {CTA_LABEL}
              </a>
            </nav>
          </div>
        </div>
      </div>

      {isOpen ? (
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={close}
          className="fixed inset-0 -z-10 lg:hidden"
          style={{ backgroundColor: 'rgba(1,36,34,0.4)' }}
        />
      ) : null}
    </header>
  );
}
