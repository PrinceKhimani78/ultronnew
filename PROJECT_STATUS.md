# Ultron Financial — Project Status

> Last updated: 2026-07-28 · Next.js 16.2.12 · React 19.2.4 · Node 24.18.0
> Gate: `npm run verify` (typecheck → lint → build) **green**.
> Runtime smoke test: `/`, `/robots.txt`, `/sitemap.xml`, `/opengraph-image` all
> 200; unknown paths 404; no server errors.

## Headline

**Home and Services are built**, composed from shared components with copy in
`src/content/`, structured data, and accessibility verified against the built
HTML and in a real browser.

The Services route (`/services`) was added in the phase after the Home Page
reconciliation. No other page has been started.

## Routes

| Route                                             | Status                          |
| ------------------------------------------------- | ------------------------------- |
| `/`                                               | Built, reconciled against Figma |
| `/services`                                       | Built, reconciled against Figma |
| `/robots.txt`, `/sitemap.xml`, `/opengraph-image` | Generated                       |
| `/_not-found`                                     | Styled                          |

## Services page — what it is

- **Light hero band** with the monogram watermark; "OUR" in ink, "SERVICES" in
  `brand-bright`. My first attempt built this as a dark panel — a misreading of
  the comp, corrected after seeing it rendered.
- **Six expandable cards**, two across. Each is a disclosure (`aria-expanded` +
  `aria-controls`), not an accordion: the design shows one card open while its
  neighbours stay closed, and there is no "one at a time" rule to enforce.
- **Benefit lists are always in the DOM**, hidden with the `hidden` attribute
  rather than unmounted — verified in the browser: text present while collapsed,
  `hidden` correctly toggling. Those lists are the most citable content on the
  page, so keeping them out of the HTML would defeat the GEO strategy.
- **`CtaContact` is reused** from the home page rather than duplicated, so every
  page still ends in a consultation booking.

**Header and Footer moved into the root layout.** They were in `page.tsx` while
home was the only route; a second route would have meant a second copy, and two
copies of a nav is how they drift. `aria-current` is now derived from the
pathname rather than hardcoded to the first entry.

**Structured data** (10 nodes, parsed back out of the built HTML):
`ProfessionalService`, `CollectionPage`, 6 × `Service`, `ItemList`,
`BreadcrumbList` (Home > Services). The `Service` nodes deliberately keep the
same `@id`s they carry on the home page — they are the same six services, and
minting a second set of identifiers is what stops an engine treating them as one
entity. All `ItemList` references resolve. No `Review` markup.

## Client JavaScript, per route

Measured from the built HTML, gzipped, excluding the `noModule` legacy bundle:

|                                                 | total        | attributable app code |
| ----------------------------------------------- | ------------ | --------------------- |
| Baseline (404 — now includes the shared Header) | 163.3 KB     | —                     |
| `/services`                                     | **165.0 KB** | **1.7 KB**            |
| `/`                                             | **209.5 KB** | **46.2 KB**           |

⚠️ **The home page grew by ~25 KB of app code outside this phase.**
`HowUltronWorks` was rewritten concurrently to use Framer Motion (`useScroll`,
`useTransform`, `motion`), reintroducing the dependency that had been removed
precisely because it cost 58 KB to fade elements in. Confirmed present in the
built chunks. That is someone else's deliberate change and has been left alone,
but the trade should be a decision, not a surprise — the scroll-progress spine it
buys is the only thing on the page that needs it.

---

# Completed

## Foundation (prior phase, unchanged)

Documentation (`PROJECT.md`, `AGENTS.md`), tooling (ESLint flat config with the
charter's rules encoded, Prettier, Husky + lint-staged), `tsconfig` strict,
`next.config.ts` security headers, `lib/env.ts` fail-fast environment,
`lib/seo.ts`, `robots.ts`, `sitemap.ts`, and the Tailwind v4 `@theme` token
system in `globals.css`.

## Home Page — all twelve sections

| #   | Section                | Component             | Notes                                                                                                                              |
| --- | ---------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Header / Navigation    | `layout/Header`       | Sticky, transparent → solid on scroll. Mobile drawer with focus trap, Escape, scroll lock. **Only client component in the shell.** |
| 2   | Trust Strip            | `home/TrustStrip`     | `<dl>` so each figure is announced with its label                                                                                  |
| 3   | About Ultron           | `home/AboutUltron`    | Two-column claim/evidence split                                                                                                    |
| 4   | Who We Help            | `home/WhoWeHelp`      | Three audiences from PROJECT.md                                                                                                    |
| 5   | Core Services          | `home/CoreServices`   | Reads `content/services.ts` — same array the Phase 5 routes will use                                                               |
| 6   | Complex Case Expertise | `home/ComplexCases`   | Inverted brand band; the differentiator                                                                                            |
| 7   | How Ultron Works       | `home/HowUltronWorks` | `<ol>`, sticky heading column                                                                                                      |
| 8   | Why Clients Choose Us  | `home/WhyChooseUs`    | `<dl>`; deliberately not a fourth card grid                                                                                        |
| 9   | Testimonials           | `home/Testimonials`   | `figure`/`blockquote`/`figcaption`. **Placeholder copy — see Issues**                                                              |
| 10  | FAQ                    | `home/Faq`            | Radix Accordion, `type="multiple"`, 8 Q&As                                                                                         |
| 11  | CTA Contact            | `home/CtaContact`     | Brand band, the primary conversion                                                                                                 |
| 12  | Footer                 | `layout/Footer`       | Sitemap, NAP in `<address>`, regulatory disclaimer                                                                                 |

## Reusable components

- **`ui/`** — `Button` (cva, 4 variants × 3 sizes, `asChild`), `Card`, `Badge`,
  `SectionHeading`, `Accordion`
- **`layout/`** — `Container`, `Section`, `Header`, `Footer`, `Logo`
- **`motion/`** — `Reveal` (see Performance)
- **`seo/`** — `JsonLd`

`SectionHeading` was extracted only after the eyebrow/heading/body triplet
appeared in eight bands — PROJECT.md's "duplicate twice, abstract on the third".

## Content layer

Zero copy is hardcoded in a component. Six files under `src/content/`:
`site.ts` (identity, nav, footer, disclaimer), `home.ts`, `services.ts`,
`process.ts`, `testimonials.ts`, `faq.ts`. ESLint forbids `content/` from
importing React or components, so the CMS seam cannot rot.

## SEO / GEO — verified, not just written

A single `@graph` with **8 validated nodes**, parsed back out of the built HTML:

- `ProfessionalService` (subtype of both `Organization` and `LocalBusiness`, so
  one node serves both requirements rather than publishing two competing
  descriptions of the same firm), with a stable `@id` every other node references
- `WebSite`
- `Service` × 5, each `provider`-linked to the firm
- `FAQPage` with all 8 Q&As

Also: per-route `metadata` via `buildMetadata`, canonical, OG + Twitter tags, and
a generated `opengraph-image` (1200×630, rendered and visually checked).

## Accessibility — audited against the built HTML

- Exactly **1** `<h1>`; heading levels descend with no skips
- **0 dangling ARIA references** (12 checked programmatically)
- Landmarks: 1 `header`, 1 `main`, 1 `footer`, 5 `nav` — **all five labelled**
- Mobile drawer: focus trap includes the close button, Escape closes, focus
  returns to the trigger, body scroll locked
- Gold used only as decoration on single words; `accent-deep` wherever text must
  be read
- Reduced motion collapses `Reveal` to "already there"
- `<noscript>` guarantees content is visible with scripting off

---

# Partially Completed

## Design fidelity — not reconciled against Figma

**The Figma was never machine-readable to me.** The prototype URL is
canvas-rendered behind auth; fetching it returned only the SPA shell (literally
the word "Figma"), and no image attachments arrived. A follow-up message said
"this is images" but none were present in the conversation.

The page was therefore built against the design authority in the repo:
PROJECT.md's Brand Personality section and the `@theme` tokens. **Spacing, type
scale and layout are my interpretation, not a match.** Because everything is
tokenised, reconciliation is a token/spacing pass rather than a rewrite.

**To resolve:** export the frames as PNGs and attach them, or paste Dev Mode
specs.

## Navigation targets

Header and footer link to in-page anchors (`#about`, `#services`, …), not
routes, because no other page exists. `globals.css` already reserved
`scroll-padding-top: 6rem` for exactly this. Footer Legal entries render as
plain text, not links, until Privacy and Terms exist.

---

# Missing

Untouched by instruction: About, Services routes, Blog, Contact, Admin, CMS,
Auth. Also still absent: `prisma/`, `lib/db.ts`, `lib/mailer.ts`,
`lib/rate-limit.ts`, all test tooling, CI.

---

# Issues

## Content that must not ship as-is

Three files carry explicit in-file warnings:

1. **`content/testimonials.ts`** — every quote is placeholder. Attribution is
   deliberately generic (role and sector, no invented company names) so nothing
   can be mistaken for a real endorsement.
2. **`content/home.ts` → `TRUST_STRIP`** — "300+ entities formed", "94% banking
   success rate" etc. are indicative. **An unverifiable statistic on a financial
   services site is a regulatory exposure**, not a marketing flourish.
3. **`content/faq.ts`** — describes UAE regulation in general terms and needs
   review by a licensed adviser.

Also still placeholder: `SITE.telephone`, `streetAddress`, `postalCode`, and the
`Logo` SVG.

## Deliberate omission: no Review schema

**No `Review` or `AggregateRating` JSON-LD is emitted, and none may be added
while the testimonials are placeholders.** Marking up invented reviews is a
search-policy violation that risks a manual action against the whole domain —
materially worse than having no review markup. The rule is documented in both
`content/testimonials.ts` and `lib/json-ld.ts`.

## Performance: the 130KB budget is unreachable — PROJECT.md needs amending

Measured from the built HTML, gzipped, excluding the `noModule` legacy bundle
that modern browsers never download:

|                                                         | gzipped      |
| ------------------------------------------------------- | ------------ |
| 404 page (zero client components) — **framework floor** | **146.7 KB** |
| Home page                                               | **166.1 KB** |
| → attributable to application code                      | **19.4 KB**  |

The Next 16 + React 19 App Router baseline alone exceeds PROJECT.md's 130KB
target by 16.7KB. **The budget is not achievable with the chosen stack** and
should be re-based on Lighthouse/LCP rather than bundle size. Application code
is lean at 19.4KB. All scripts are `async`, so none are render-blocking.

**Fixed during this phase:** `Reveal` originally used Framer Motion, which cost
**58KB gzipped — 24% of the page's JavaScript — to fade elements in on scroll**.
Rewritten on IntersectionObserver + CSS (~40 lines), saving 37.6KB. Framer
Motion remains installed for work that genuinely needs it (form presence/exit,
future modals), per PROJECT.md rule 7: "if it saves fewer than fifty lines,
write the fifty lines."

## Defects found and fixed during QA

- `AboutUltron` had `aria-labelledby="about-heading"` pointing at an id that did
  not exist — a dangling reference.
- The drawer focus trap excluded the close button, so keyboard users could not
  Tab to it; Escape was the only exit.
- `aria-controls` referenced the drawer, which was unmounted when closed. The
  panel now renders always and uses the `hidden` attribute.
- The OG image welded "and" to "compliant." — Satori drops JSX whitespace
  between a text node and an element. Two attempts: a flex row with a gap made
  the spans overlap; an explicit space inside the string fixed it. Verified by
  rendering the PNG and looking at it.

## Not verified

**I have no browser tool, so the page has not been visually rendered or
Lighthouse-tested.** Verification was: built-HTML inspection (semantics, ARIA,
structured data), bundle measurement, and HTTP smoke tests. The OG image _was_
visually checked, because it is a PNG I could open. Responsive behaviour rests
on the Tailwind breakpoints, not on observation.

---

# Next recommended phase

**Phase 4 — About page**, per `NEXT_STEPS.md`.

Before that, two cheap things worth doing first:

1. **Reconcile the design** — attach the Figma frames as images so spacing and
   type can be matched while the page is fresh.
2. **Make the first git commit.** The repository still has _zero_ commits and
   every file is untracked. There is no rollback point for any of this work.

Then, in dependency order: Phase 4 (About) → Phase 5 (Services, which already
has its content array) → Phase 6 (Contact, which already has `contactSchema`).
