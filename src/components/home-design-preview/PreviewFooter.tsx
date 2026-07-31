import Image from 'next/image';

/**
 * Footer for `/home-design-preview` only, rebuilt from the comp's "Footer"
 * frame (1280×572).
 *
 * Distinct from the shared `components/layout/Footer`, which is why this exists
 * rather than a variant prop: the comp's ground is #154B47 rather than the
 * site's `--color-brand`, its type runs 18px throughout, its "Quick Links" and
 * "Services" columns differ in order and content from the live site's, and it
 * carries no regulatory disclaimer — the paragraph in that slot is lorem ipsum.
 *
 * The comp has NO social icons and NO newsletter block. Neither is invented
 * here; the frame is transcribed as drawn.
 *
 * Two link colours are load-bearing: the comp marks one entry per column in
 * gold, which reads as the current page. Reproduced with `aria-current` so the
 * distinction is not carried by colour alone.
 */

const PILL = '#154B47';
const CREAM = '#FDFBEE';
const GOLD = '#C9B37E';

const QUICK_LINKS = [
  { label: 'Home', current: false },
  { label: 'Services', current: true },
  { label: 'About Us', current: false },
  { label: 'Contact Us', current: false },
  { label: 'Blogs', current: false },
] as const;

const SERVICE_LINKS = [
  { label: 'Business Banking', current: false },
  { label: 'Financial Advisory', current: true },
  { label: 'Tax Structuring Advisory', current: false },
  { label: 'Business Finance', current: false },
  { label: 'Real Estate Mortgages', current: false },
  { label: 'Business Setup', current: false },
] as const;

/** ⚠️ Lorem ipsum and placeholder NAP, exactly as the comp draws them. */
const CONTACT = {
  blurb: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  email: 'lorem@ultronfinancials.com',
  telephone: '98765 43210',
  link: 'Contact Us',
} as const;

const COPYRIGHT_LEFT = 'ALL RIGHTS RESERVED BY ULTRON FINANCIALS';
const COPYRIGHT_RIGHT = 'COPYRIGHTS © MUTANT TECHNOLOGIES';

function MailGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[22px] w-[22px] shrink-0"
    >
      <rect x="2" y="4.5" width="20" height="15" rx="2.5" />
      <path d="m2.5 6 9.5 7 9.5-7" />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[22px] w-[21px] shrink-0"
    >
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
    </svg>
  );
}

/** The comp's third contact row: a 27×18 landscape glyph, i.e. a message. */
function MessageGlyph() {
  return (
    <svg
      viewBox="0 0 27 18"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[18px] w-[27px] shrink-0"
    >
      <path d="M2 3.5A2.5 2.5 0 0 1 4.5 1h18A2.5 2.5 0 0 1 25 3.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-5 3v-3H4.5A2.5 2.5 0 0 1 2 11.5Z" />
    </svg>
  );
}

function LinkColumn({
  heading,
  items,
}: {
  heading: string;
  items: readonly { label: string; current: boolean }[];
}) {
  return (
    <div>
      <h2
        className="mb-6 text-[18px] leading-tight font-semibold"
        style={{ color: CREAM }}
      >
        {heading}
      </h2>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.label}>
            <a
              href="#design-contact"
              aria-current={item.current ? 'page' : undefined}
              className="text-[18px] leading-tight font-normal transition-opacity duration-200 hover:opacity-80"
              style={{ color: item.current ? GOLD : CREAM }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PreviewFooter() {
  return (
    <footer
      className="overflow-hidden pt-16 pb-8 lg:pt-[96px] lg:pb-[42px]"
      style={{ backgroundColor: PILL }}
    >
      <div className="mx-auto w-full max-w-[1066px] px-5 sm:px-8 lg:px-8 xl:px-0">
        {/*
          ⚠️ SUBSTITUTED ASSET — `assets/35d9345d34d0b43d.png`, drawn 358×105,
          exceeds the Design MCP's 256 KiB cap. The repo's cream lockup stands
          in at the comp's box.
        */}
        <Image
          src="/brand/logo-lockup-cream.webp"
          alt="Ultron Financials"
          width={358}
          height={105}
          /*
            Width pinned for the same reason as the header lockup: the stand-in
            asset is ratio 3.62 against the comp's 3.41, so height follows at
            99px rather than 105. Matching the drawn width keeps the block's
            footprint right; matching the height would have made it 22px wide
            of the comp.
          */
          className="h-auto w-[240px] lg:w-[358px]"
        />

        {/*
          Column origins are the comp's, measured from the content edge at
          x=107: Contact at 0, Quick Links at 556, Services at 797. Each track
          therefore carries its own trailing gutter (556 = 409 content + 147
          clear) and the grid gap is zero, which is the only way to hit three
          different gutters with one template.
        */}
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:mt-[44px] lg:grid-cols-3 lg:gap-x-10 xl:grid-cols-[556px_241px_269px] xl:gap-0">
          {/*
            <address> is the right element here: it means "contact details for
            the nearest article or body", which is exactly what this block is.
          */}
          <address className="not-italic">
            <h2
              className="mb-6 text-[18px] leading-tight font-semibold"
              style={{ color: CREAM }}
            >
              Contact Us
            </h2>
            <p
              className="mb-5 text-[18px] leading-[150%] font-normal"
              style={{ color: CREAM }}
            >
              {CONTACT.blurb}
            </p>
            <ul className="flex flex-col gap-4" style={{ color: CREAM }}>
              <li className="flex items-center gap-3">
                <MailGlyph />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-[18px] leading-tight transition-opacity duration-200 hover:opacity-80"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <PhoneGlyph />
                {/*
                  ⚠️ The comp's placeholder number. Not dialable — rendered as
                  text rather than a tel: link, because a tel: href built from a
                  placeholder is a link that silently fails.
                */}
                <span className="text-[18px] leading-tight">
                  {CONTACT.telephone}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <MessageGlyph />
                <a
                  href="#design-contact"
                  className="text-[18px] leading-tight transition-opacity duration-200 hover:opacity-80"
                >
                  {CONTACT.link}
                </a>
              </li>
            </ul>
          </address>

          <LinkColumn heading="Quick Links" items={QUICK_LINKS} />
          <LinkColumn heading="Services" items={SERVICE_LINKS} />
        </div>

        {/*
          The comp runs the rule 103→1176, i.e. 4px wider than the content
          column on the left and 3px on the right, so it is nudged out rather
          than left flush with the columns above it.
        */}
        <hr
          className="mt-12 border-0 lg:mt-[70px] xl:-ml-1 xl:w-[1073px]"
          style={{ height: 1, backgroundColor: CREAM }}
        />

        {/* The comp insets the bottom bar 25px inside the divider on both ends. */}
        <div
          className="mt-5 flex flex-col gap-3 text-[14px] leading-tight font-normal sm:flex-row sm:items-center sm:justify-between xl:px-[25px]"
          style={{ color: CREAM }}
        >
          <span>{COPYRIGHT_LEFT}</span>
          <span>{COPYRIGHT_RIGHT}</span>
        </div>
      </div>
    </footer>
  );
}
