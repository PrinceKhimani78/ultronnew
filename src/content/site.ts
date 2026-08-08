/**
 * Site-wide identity and navigation.
 *
 * This is the CMS seam described in PROJECT.md — typed objects, no JSX. Every
 * section reads its copy from `content/` so that swapping the source for an
 * async fetch later is a one-file change per section rather than a rewrite.
 */

/**
 * Company details used for metadata, the footer NAP block and `Organization`
 * JSON-LD. One canonical spelling of the name, everywhere — entity clarity is
 * what makes the firm citable by an AI engine.
 *
 * The design sets the name as "ULTRON FINANCIALS" (plural). That spelling is
 * canonical here; the uppercase treatment is styling, not part of the name.
 *
 * ⚠️ PLACEHOLDER — MUST NOT SHIP: `telephone` and the street address are taken
 * from the design's dummy text and are not real. The Production Checklist in
 * PROJECT.md gates launch on replacing them with verified details.
 */
export const SITE = {
  name: 'Ultron Financials',
  legalName: 'Ultron Financials',
  /** Sentence-case, used after the page title in the metadata template. */
  tagline: 'UAE company formation, banking and compliance',
  description:
    'Ultron Financials is a corporate advisory firm in the UAE delivering end-to-end business advisory for banking, company setup, compliance and financial structuring.',
  // TODO(client): confirm the live enquiry address before launch.
  email: 'lorem@ultronfinancials.com',
  // TODO(client): placeholder from the design. Replace with the real number.
  telephone: '98765 43210',
  address: {
    // TODO(client): the design carries lorem ipsum here. Replace in full.
    streetAddress: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    locality: 'Dubai',
    region: 'Dubai',
    postalCode: '00000',
    country: 'AE',
  },
  /** Drives `sameAs` in JSON-LD. Only verified profiles belong here. */
  social: {
    linkedin: 'https://www.linkedin.com/company/ultron-financials',
  },
  /** Credit line in the footer's bottom bar, per the design. */
  builtBy: 'Mutant Technologies',
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/**
 * Primary navigation, matching the design's five entries.
 *
 * Home, Services and About are routes; Blogs and Contact remain in-page
 * anchors until those exist, since a nav entry pointing at an unbuilt route
 * is a 404 in the header. `globals.css` reserves `scroll-padding-top` so the
 * fixed header never covers an anchor target. When Blogs ships this becomes a
 * real href too and the Header does not change — it renders whatever this
 * array contains.
 */
export const PRIMARY_NAV: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Partner', href: '/partner' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Contact', href: '/#contact' },
] as const;

/**
 * WhatsApp deep link for the hero call to action.
 *
 * `wa.me` needs the number in international format with no `+`, spaces or
 * leading zeros, so the digits are stripped from `SITE.telephone`.
 *
 * ⚠️ MUST NOT SHIP AS-IS. `SITE.telephone` is still the design's placeholder
 * ("98765 43210"), which is not a real or dialable international number — this
 * link currently goes nowhere. TODO(client): supply the business WhatsApp
 * number in full international format; nothing else here changes.
 */
export const WHATSAPP_URL = `https://wa.me/${SITE.telephone.replace(/\D/g, '')}`;

/** Header and hero share one call to action, so it is defined once. */
export const PRIMARY_CTA = {
  label: 'Book a call',
  href: '#contact',
} as const;

/**
 * Footer columns, matching the design: Quick Links and Services.
 * Entries marked `pending` render as plain text rather than links until the
 * route exists — an anchor into nothing is worse than no anchor.
 */
export const FOOTER_NAV: readonly {
  heading: string;
  items: readonly (NavItem & { pending?: boolean })[];
}[] = [
  {
    heading: 'Quick Links',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'About Us', href: '/about' },
      { label: 'Partner With Us', href: '/partner' },
      { label: 'Contact Us', href: '/#contact' },
      { label: 'Blogs', href: '/blogs' },
    ],
  },
  {
    heading: 'Services',
    items: [
      { label: 'Business Banking', href: '/services/business-banking' },
      { label: 'Business Setup', href: '/services/business-setup' },
      { label: 'Financial Advisory', href: '/services/financial-advisory' },
      {
        label: 'Tax Structuring Advisory',
        href: '/services/tax-structuring-advisory',
      },
      { label: 'Business Finance', href: '/services/business-finance' },
      {
        label: 'Real Estate Mortgages',
        href: '/services/real-estate-mortgages',
      },
    ],
  },
] as const;

/**
 * Regulatory position. Advisory firms must not imply they are the regulated
 * entity where they are not.
 *
 * ⚠️ Not present in the design. Retained deliberately and must be legally
 * reviewed before launch, per the Production Checklist.
 */
/**
 * Routes that exist today, in sitemap priority order. `sitemap.ts` reads this
 * rather than maintaining a second list that drifts.
 */
export const STATIC_ROUTES = [
  { path: '/', priority: 1 },
  { path: '/services', priority: 0.9 },
  { path: '/about', priority: 0.8 },
  { path: '/partner', priority: 0.8 },
  { path: '/blogs', priority: 0.8 },
] as const;

export const FOOTER_DISCLAIMER = `${SITE.name} provides corporate advisory and administrative services. We are not a bank, law firm or licensed tax agent. Banking introductions are made to licensed UAE institutions, which retain sole discretion over account approval. Nothing on this site constitutes legal, tax or financial advice.`;
