'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { MobileDrawer } from '@/components/layout/MobileDrawer';
import { cn } from '@/lib/utils';

/**
 * Header for `/home-design-preview` only, rebuilt from the comp's "Hero" frame.
 *
 * It is NOT the shared `components/layout/Header`, and differs from it in one
 * way that matters and is why this variant still exists: it is *static*, drawn
 * inside the hero frame at y=49, where the site header is fixed and follows the
 * scroll. Everything else — the pill colour, the 66px bar, the 18px/500 nav, the
 * white-on-gold-rule active state, the cream CTA — is now identical to the
 * shared header,
 * which was rebuilt from this same frame.
 *
 * The mobile menu is the shared `MobileDrawer`: full-screen, brand green, logo
 * top-left and close top-right. The rounded in-pill drawer this file used to
 * carry was a second design for the same job, and the brief calls for one.
 * Because that component reads the live nav, the preview's mobile menu shows
 * production links rather than the comp's — the comp defines no mobile layout
 * at all, so there is nothing here to be unfaithful to.
 */

const PILL = '#154B47';
const CREAM = '#FDFBEE';
const BRAND = '#035551';

const NAV = [
  { label: 'HOME', href: '#top', current: true },
  { label: 'SERVICES', href: '#design-services', current: false },
  { label: 'ABOUT', href: '#design-who', current: false },
  { label: 'BLOGS', href: '#design-services', current: false },
  { label: 'CONTACT', href: '#design-contact', current: false },
] as const;

const CTA_LABEL = 'BOOK A CALL';

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
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  return (
    <header className="relative z-30 pt-6 lg:pt-[49px]">
      <div className="mx-auto w-full max-w-[1348px] px-4 sm:px-6 lg:px-6 xl:px-0">
        <div className="rounded-[100px]" style={{ backgroundColor: PILL }}>
          {/*
            Horizontal placement is the comp's, measured from the pill's own
            left edge (x=46 in the 1280 frame): logo at 35, nav at 261, CTA at
            944, and 66px of clear space after the CTA. Explicit margins rather
            than `justify-between`, which would distribute the slack evenly and
            put the nav ~25px right of where the comp has it.
          */}
          <div className="flex h-[66px] items-center justify-between pr-3 pl-4 sm:pl-6 lg:pr-8 lg:pl-8 xl:px-10">
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
                    {/*
                      Pure white at rest, brand gold on hover and on the current
                      route, which also keeps the hairline gold rule beneath it —
                      matching the shared header exactly.
                    */}
                    <a
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={cn(
                        'block border-b pb-1 text-[18px] leading-none font-medium whitespace-nowrap uppercase',
                        'transition-colors duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]',
                        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#DCCB8E]',
                        item.current
                          ? 'border-[#DCCB8E] text-[#DCCB8E]'
                          : 'border-transparent text-white hover:text-[#DCCB8E]',
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href="#design-contact"
              className={cn(
                'hidden h-[38px] w-[177px] shrink-0 items-center gap-[9px] rounded-full pl-5 lg:inline-flex xl:ml-[110px]',
                'text-[18px] leading-none font-medium uppercase',
                'ease-house transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DCCB8E] hover:shadow-[0_6px_14px_rgba(0,0,0,0.18)]',
              )}
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
        </div>
      </div>

      <MobileDrawer isOpen={isOpen} onClose={close} drawerId={drawerId} />
    </header>
  );
}
