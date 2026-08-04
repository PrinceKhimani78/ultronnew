import Image from 'next/image';

import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import {
  LocationGlyph,
  MailGlyph,
  PhoneGlyph,
} from '@/components/ui/ContactIcons';
import { cn } from '@/lib/utils';

/**
 * Footer for `/home-design-preview` only, rebuilt from the comp's "Footer"
 * frame (1280×572).
 *
 * Distinct from the shared `components/layout/Footer`, which is why this exists
 * rather than a variant prop: the comp's ground is #154B47 rather than the
 * site's `--color-brand`, its type runs 18px throughout, its "Quick Links" and
 * "Services" columns differ in order and content from the live site's, and it
 * carries no regulatory disclaimer.
 *
 * The 572px height is not set — it is the sum of the parts, and the parts are
 * what the spec fixes: 84px of lead-in, 40px of run-out and 448px of content
 * between them. The one free variable is the gap under the lockup; at 40px the
 * column measures 449px and the frame closes at 573px. Setting an explicit
 * height instead would clip the moment a line of the address wrapped.
 *
 * The comp has NO social icons and NO newsletter block. Neither is invented
 * here; the frame is transcribed as drawn.
 *
 * Two link colours are load-bearing: the comp marks one entry per column in
 * gold, which reads as the current page. Reproduced with `aria-current` so the
 * distinction is not carried by colour alone.
 */

const PILL = '#154B47';
/** 18px body throughout, at the comp's 30px line box. */
const BODY = 'text-[18px] leading-[30px] font-normal';
const BODY_COLOR = 'rgba(255,255,255,0.85)';
/** Contact glyphs and NAP copy. Pure white — no muted typography in the footer. */
const CONTACT_COLOR = '#FFFFFF';

const QUICK_LINKS = [
  { label: 'Home', current: false },
  { label: 'Services', current: true },
  { label: 'About Us', current: false },
  { label: 'Contact Us', current: false },
  { label: 'Blogs', current: false },
] as const;

const SERVICE_LINKS = [
  { label: 'Business Banking', current: false },
  { label: 'Business Setup', current: false },
  { label: 'Financial Advisory', current: true },
  { label: 'Tax Structuring Advisory', current: false },
  { label: 'Business Finance', current: false },
  { label: 'Real Estate Mortgages', current: false },
] as const;

/** ⚠️ Lorem ipsum and placeholder NAP, exactly as the comp draws them. */
const CONTACT = {
  address: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  email: 'lorem@ultronfinancials.com',
  telephone: '98765 43210',
} as const;

const COPYRIGHT_LEFT = 'ALL RIGHTS RESERVED BY ULTRON FINANCIALS';
const COPYRIGHT_RIGHT = 'COPYRIGHTS © MUTANT TECHNOLOGIES';

/**
 * Entrance order, as beats of `STAGGER_MS` — the same shape as `BEAT` in
 * `layout/Footer.tsx`, since the preview route was required to be
 * indistinguishable from the live site.
 */
const BEAT = {
  logo: 0,
  contact: STAGGER_MS,
  navColumn: (index: number) => STAGGER_MS * (2 + index),
  /** Two nav columns, so the run-out sits one beat past the second. */
  closing: STAGGER_MS * 4,
} as const;

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-7 text-[18px] leading-tight font-semibold text-white">
      {children}
    </h2>
  );
}

function LinkColumn({
  heading,
  items,
  delay = 0,
}: {
  heading: string;
  items: readonly { label: string; current: boolean }[];
  /**
   * Milliseconds. Offsets this column against its siblings so the three do not
   * land together.
   */
  delay?: number;
}) {
  return (
    <div>
      <Reveal delay={delay}>
        <ColumnHeading>{heading}</ColumnHeading>
      </Reveal>
      {/*
        2px between items, not a comfortable list gap: the comp sets a 32px
        pitch on a 30px line box, so the rhythm is carried by the line height.

        Links run at a half beat: at the full 100ms a six-item column would take
        most of a second to finish, which reads as the list still loading.
      */}
      <Stagger
        as="ul"
        delay={delay + STAGGER_MS / 2}
        step={STAGGER_MS / 2}
        className="flex flex-col gap-[2px]"
      >
        {items.map((item) => (
          <StaggerItem as="li" key={item.label}>
            {/*
              Colour is a CLASS, never an inline `style`. As a style it silently
              disabled the hover: an inline `color` outranks a `hover:text-*`
              utility, which is not `!important`, so the gold never applied.
            */}
            <a
              href="#design-contact"
              aria-current={item.current ? 'page' : undefined}
              className={cn(
                BODY,
                'transition-colors duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]',
                item.current
                  ? 'text-[#DCCB8E]'
                  : 'text-white hover:text-[#DCCB8E]',
              )}
            >
              {item.label}
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}

export function PreviewFooter() {
  return (
    <footer
      className="overflow-hidden pt-14 pb-8 lg:pt-[84px] lg:pb-10"
      style={{ backgroundColor: PILL }}
    >
      {/*
        The frame is 1280 wide and insets its content 105px, which is what
        produces the comp's 1070px footer measure — the exact width of the rule
        below. Stated as max-width plus inset rather than as a 1070px box, so the
        two numbers stay traceable to the frame.
      */}
      {/* The shared shell, as everywhere else. This carried its own 1280px box
          and 105px inset, which put it on a different line from the content. */}
      <div className="page-shell">
        {/*
          ⚠️ SUBSTITUTED ASSET — `assets/35d9345d34d0b43d.png`, drawn 358×105,
          exceeds the Design MCP's 256 KiB cap. The repo's cream lockup stands
          in at the comp's box.

          Width pinned rather than height: the stand-in is ratio 3.62 against the
          comp's 3.41, so height follows at 99px. Matching the drawn width keeps
          the block's footprint right; matching the height would have left it
          22px wide of the comp.
        */}
        <Reveal delay={BEAT.logo}>
          <Image
            src="/brand/logo-lockup-cream.webp"
            alt="Ultron Financials"
            width={358}
            height={105}
            className="mx-auto h-auto w-[240px] sm:mx-0 lg:w-[358px]"
          />
        </Reveal>

        {/*
          Column origins are the comp's, measured from the content edge: Contact
          at 0, Quick Links at 565, Services at 819. Each track carries its own
          trailing gutter and the grid gap is zero, which is the only way to hit
          three different gutters with one template.
        */}
        <div className="mt-10 grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-3 lg:gap-x-10 xl:grid-cols-[565px_254px_minmax(0,1fr)] xl:gap-0">
          {/*
            <address> is the right element here: it means "contact details for
            the nearest article or body", which is exactly what this block is.
          */}
          <address className="not-italic">
            <Reveal delay={BEAT.contact}>
              <ColumnHeading>Contact Us</ColumnHeading>
            </Reveal>
            <Stagger
              as="ul"
              delay={BEAT.contact + STAGGER_MS / 2}
              step={STAGGER_MS / 2}
              className="flex flex-col gap-4"
              // Colour stays here: the glyphs are stroked with
              // `currentColor` and inherit it from the list, so one
              // declaration holds the icons and the copy to white.
              style={{ color: CONTACT_COLOR }}
            >
              <StaggerItem
                as="li"
                className="flex items-start justify-center gap-3 sm:justify-start"
              >
                <LocationGlyph />
                <span className={`${BODY} max-w-[340px] text-left`}>
                  {CONTACT.address}
                </span>
              </StaggerItem>
              <StaggerItem
                as="li"
                className="flex items-start justify-center gap-3 sm:justify-start"
              >
                <MailGlyph />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className={`${BODY} text-left transition-colors duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:text-[#DCCB8E]`}
                >
                  {CONTACT.email}
                </a>
              </StaggerItem>
              <StaggerItem
                as="li"
                className="flex items-start justify-center gap-3 sm:justify-start"
              >
                <PhoneGlyph />
                {/*
                  ⚠️ The comp's placeholder number. Not dialable — rendered as
                  text rather than a tel: link, because a tel: href built from a
                  placeholder is a link that silently fails.
                */}
                <span className={`${BODY} text-left`}>{CONTACT.telephone}</span>
              </StaggerItem>
            </Stagger>
          </address>

          <LinkColumn
            heading="Quick Links"
            items={QUICK_LINKS}
            delay={BEAT.navColumn(0)}
          />
          <LinkColumn
            heading="Services"
            items={SERVICE_LINKS}
            delay={BEAT.navColumn(1)}
          />
        </div>

        <hr
          className="mt-16 mb-6 border-0"
          style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.25)' }}
        />

        {/* Last beat on the page, and the quietest. The 25px `xl` inset is
            gone — it put this row on its own line, right of the columns. */}
        <Reveal
          delay={BEAT.closing}
          className="flex flex-col items-center gap-3 text-center text-[14px] leading-tight font-medium tracking-[0.04em] sm:flex-row sm:justify-between sm:text-left"
          style={{ color: BODY_COLOR }}
        >
          <span>{COPYRIGHT_LEFT}</span>
          <span>{COPYRIGHT_RIGHT}</span>
        </Reveal>
      </div>
    </footer>
  );
}
