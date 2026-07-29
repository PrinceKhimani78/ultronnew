# Home Page — Design Reconciliation Review

> Date: 2026-07-28 · Next.js 16.2.12 · React 19.2.4
> Gate: `npm run verify` (typecheck → lint → build) **green**.
> Source of truth: the six Figma frames supplied as images.

## Summary

The previous build was styled from `PROJECT.md`'s written brand guidance, before
the design was visible. Seeing it showed the two were not close: the type was an
editorial **serif** where the design is a heavy **geometric sans**, and emphasis
was **gold** where the design uses **green**. Those are not tuning gaps, so this
pass rebuilt the visual layer rather than nudging it.

Structure, semantics, content seam and structured data carried over intact.

---

# Components reviewed

Every component in `src/components`. Fifteen changed, three unchanged, one
deleted, two added.

| Component               | Verdict                                                           |
| ----------------------- | ----------------------------------------------------------------- |
| `layout/Header`         | **Rebuilt** — floating dark pill, gold active underline           |
| `layout/Footer`         | **Rebuilt** — design's Contact / Quick Links / Services structure |
| `layout/Logo`           | **Rebuilt** — UF monogram + two-line uppercase wordmark           |
| `layout/Container`      | Unchanged — widths still correct                                  |
| `layout/Section`        | Unchanged — tone/spacing variants still correct                   |
| `home/Hero`             | **Rebuilt** — two columns, stats card inline, brand panel         |
| `home/TrustStrip`       | **Deleted** — the statistics live inside the Hero in the design   |
| `home/WhoWeHelp`        | **Rebuilt** — split header, six cards, offset second column       |
| `home/CoreServices`     | **Rebuilt** — now a server wrapper around a tabbed client leaf    |
| `home/ServiceTabs`      | **New** — WAI-ARIA tabs, six services                             |
| `home/HowUltronWorks`   | **Rebuilt** — dark gradient band, alternating timeline            |
| `home/CtaContact`       | **Rebuilt** — two columns, proposition + form                     |
| `home/ConsultationForm` | **New** — the design's consultation form                          |
| `home/AboutUltron`      | Restyled to the new heading API                                   |
| `home/ComplexCases`     | Restyled                                                          |
| `home/WhyChooseUs`      | Restyled                                                          |
| `home/Testimonials`     | **Now renders nothing** — see Placeholder content                 |
| `home/Faq`              | Restyled                                                          |
| `ui/Button`             | **Extended** — `arrow` prop, `light` variant, uppercase tracking  |
| `ui/SectionHeading`     | **Extended** — segmented headings, shared `Eyebrow`               |
| `ui/Card`               | Unchanged                                                         |
| `ui/Accordion`          | Unchanged                                                         |
| `ui/Badge`              | Unchanged — **currently unused**, see Issues                      |
| `motion/Reveal`         | **Improved** — one shared observer for the page                   |
| `seo/JsonLd`            | Unchanged                                                         |

---

# Improvements made

## Typography — the largest single change

Superseded by the client's brand sheet, which names one typeface. Both passes
are recorded because the second reverses part of the first.

- **Newsreader (serif) → Poppins (geometric sans).** The design sets every
  heading in a heavy geometric sans with tight tracking.
- **Poppins → Funnel Display, Inter → Funnel Sans.** The brand sheet specifies
  Funnel Display as the primary typeface at Regular / Medium / Semibold / Bold,
  and names no second family. Poppins and Inter were both matched by eye and
  neither was ever in the brand system, so the whole type stack is now Funnel.
  Body copy runs on Funnel Sans — the companion text cut — rather than on the
  display face at 16px, which is the one thing a display cut is not drawn for.
  Both faces carry a variable axis; the four weights are requested as static
  subsets because only those four stops are used.
- Heading tracking set to `-0.02em` (`-0.03em` on the hero), matching the
  design's tight optical setting.
- Eyebrows: `0.2em` uppercase tracking, preceded by a short rule, as drawn.

## Colour

Same story: the comp was matched by eye, then the brand sheet arrived and
supplied the actual values. The sheet wins.

- `--color-brand` `#0e5045` → **`#035551` (Authentic Teal)**, per the brand
  sheet. An intermediate pass had moved it the other way, to a pine green read
  off the comp; that is now reverted. `brand-deep`, `brand-ink`, `brand-mid`,
  `--color-line` and both shadow tokens are re-derived from the new hue, so no
  tint in the palette is left keyed to the old one.
- `--color-surface` **`#fdfbee` (Orange White)** — already matched the sheet
  exactly, unchanged.
- `--color-ink` `#1c2b29` → `#121a18`. The design sets headings near-black; a
  green cast reads as a printing error beside true-green emphasis words.
- **`--color-brand-bright` added** for heading emphasis, then corrected twice:
  `#0f7a64` → `#058881` (re-derived from Authentic Teal) → **`#057b75`**. The
  re-derived value measured **4.17:1** on surface. This token is not
  heading-only — it also carries 12px uppercase badges and benefit ticks, so it
  is held to the 4.5:1 normal-text threshold rather than the 3:1 large-text one.
  Now **4.93:1** on surface and **5.13:1** on raised white cards.
- **`--color-accent-deep` `#a37f3c` → `#8a6a2b`.** The old value measures
  **3.57:1** on surface — it passes only for large text, while the token's own
  comment advertised it as safe "where text must be read". Now **4.84:1**, so
  the token matches its documentation. This was a pre-existing defect.
- Gold remains restricted to the three places the design actually uses it: the
  active nav underline, the timeline markers, and inverted-band emphasis.
  `--color-accent` is decorative only at 1.98:1 and never carries meaning alone.
- **`opengraph-image.tsx` re-synced.** It renders in Satori, which cannot read
  CSS custom properties, so it holds its own literal copies of the tokens. It
  was still painting the old `#0e5045` ground — the one place a palette change
  does not propagate on its own, and invisible until a link is shared.

## Structure

- Header is a floating inset pill; the only scroll response is a shadow.
- Hero is two columns with the statistics inside it, not a separate band.
- **Core Services is a tabbed interface**, not a card grid.
- Process is a dark gradient band with an alternating timeline.
- CTA pairs the proposition with the consultation form.
- Nav matches the design: Home, Services, About, Blogs, Contact.
- Services replaced with the design's six: Business Banking, Business Setup,
  Financial Advisory, Tax Structuring Advisory, Business Finance, Real Estate
  Mortgages.
- Brand name corrected to **Ultron Financials** (plural).

## Deduplication

- `Eyebrow` extracted — it appeared in seven bands.
- `HeadingText` extracted — the segmented-heading render appeared in six.
- The arrow badge became a `Button` prop rather than four copies of the markup.
- `HeadingSegment` moved to `src/types/content.ts`. It was in `content/home.ts`,
  and `ui/SectionHeading` importing it **broke the ESLint boundary rule** that
  keeps primitives free of business meaning. The linter caught this, correctly.
- The OG image headline is now **read from `HOME_HERO.heading`**. It had been a
  hardcoded copy of an earlier headline and was still rendering the old one —
  exactly the drift the content layer exists to prevent.

## Bug found by running the app

**Every `asChild` button was rendering completely unstyled** — bare text with no
pill, no background, no padding. Explore, About us, View more and Contact us were
all affected.

Cause: `Button` wrapped its label and arrow badge in a plain fragment. Radix's
`Slot` cannot see through a Fragment to find the element it should merge into, so
it merged nothing and the `className` was silently dropped. Nothing failed —
typecheck, lint and build were all green, and the HTML was valid. It was only
visible on screen.

Fixed with `Slottable`, which marks which child is the merge target. Confirmed in
the browser: the Explore link now computes `background-color: rgb(14, 80, 69)`
and a pill radius, where it previously had **no classes at all**.

This is the clearest argument in this whole review for running the app rather
than trusting a green build.

## Animation

- **One `IntersectionObserver` for the whole page**, shared at module scope.
  Previously each `Reveal` constructed its own — around twenty independent
  callbacks for the browser to service during scroll.
- Elements unobserve themselves on reveal, so the working set shrinks as the
  visitor scrolls.
- Still `opacity` + `transform` only; both composite on the GPU and neither
  triggers layout.
- Timings unchanged and within `PROJECT.md`'s envelope: 700ms entrance, 60–80ms
  stagger, house curve `cubic-bezier(0.22, 1, 0.36, 1)`.
- No animation added to the hero: it holds the LCP element, and fading it in
  delays LCP by exactly the duration of the fade.

---

# Brand assets — supplied and wired

All 22 supplied files were reviewed. Twelve are now in use.

**They arrived at print resolution: 31 MB, with three illustrations at ~9.5 MB
each (4500×4000).** Shipping that from `public/` would have been a serious
production problem. Generated web derivatives with `sharp` (already present via
Next, nothing installed):

|            |            |
| ---------- | ---------- |
| Source art | 29.09 MB   |
| Web assets | **174 KB** |
| Reduction  | **99.4%**  |

- Source art **moved to `design-assets/` at the repo root** — preserved and
  version-controllable, but outside `public/` so it is never served. `public/brand`
  is now 204 KB.
- Filenames normalised from `ULTRON OFFWHITE (2).png` to kebab-case. Spaces and
  parentheses in URLs are fragile and need encoding.
- All output is WebP, trimmed of dead margin, sized to actual display need.

| Asset                    | Used in                   | Source                      |
| ------------------------ | ------------------------- | --------------------------- |
| `logo-lockup-cream.webp` | Header, Footer            | `ULTRON OFFWHITE (2)`       |
| `logo-lockup-green.webp` | available, light grounds  | `ULTRON GREEN (2)`          |
| `logo-icon-*.webp`       | available, tight spaces   | `ULTRON OFFWHITE` / `GREEN` |
| `hero-monogram.webp`     | Hero                      | `image 4`                   |
| `audience-*.webp` × 3    | Who We Help cards 1, 5, 6 | `image 6, 8, 9`             |
| `process-*.webp` × 4     | Timeline, one per step    | `image 18–21`               |

The `Logo` component now renders the real lockup; the geometric SVG placeholder
is gone. Two colourways, both transparent, so one component serves the header
pill, the footer and light grounds.

**A seam had to be fixed.** The hero render's cream ground is `#fffcf1` against a
`#fdfbee` page, and is itself slightly graduated — so no flat colour correction
could hide the join, which showed as a rectangular box. Resolved with a radial
mask that fades the edges to transparent; it dissolves the boundary regardless of
colour and survives any future retune of the surface token.

**Verified in the browser:** 10 images on the page, all loaded, no failed
`/brand/` requests, no page errors.

**Outstanding:** the hero render is only 441×473 but occupies roughly 500 CSS px,
so it is at about 1× and will look soft on a retina display. Re-export at ~1100px
wide; only the two dimension props change.

---

# Remaining design differences

Ranked by visual impact. **The first four are asset gaps I cannot close.**

1. **The hero's 3D monogram is wired but the file is not on disk.** The `Hero`
   now renders it via `next/image` with `priority`, intrinsic `width`/`height`
   and a `sizes` hint, and the placeholder card, dot field and concentric rings
   were removed because the artwork carries its own ground and constellation.

   **The image currently 404s.** Save the supplied render to
   `public/brand/hero-monogram.png` and it works with no code change. It was
   supplied as a chat attachment, which I have no way to write to disk.

   Consider converting to AVIF/WebP before launch — it is the LCP element on
   wide viewports.

2. **The 3D isometric illustrations are missing** — in the Who We Help cards, the
   Core Services panel, and the timeline's alternating circular images. The
   timeline currently renders cards only, so it reads lighter than the design.
3. **The logo is an approximation.** The real mark is a bespoke glyph — a rounded
   `U` with a leaf counter resolving into an `F`. Mine is a geometric
   interpretation. → Export the real SVG; the component API will not change.
4. **The typeface is a stand-in.** The design's heading font looks like a
   geometric sans in the Gilroy/Poppins family, but I am matching it by eye from
   a screenshot. If the Figma names a specific family, tell me — if it is not on
   Google Fonts we will need the licensed files.

5. **Spacing and type scale are measured by eye**, not from Dev Mode. Section
   rhythm, card padding and grid gaps are my reading of the comps. Dev Mode
   values, or a single annotated frame, would let me match exactly.
6. **Colours are sampled from compressed screenshots** and are close but not
   guaranteed exact. Hex values from Dev Mode would settle this.
7. **Five sections are not in the frames you sent**: About Ultron, Complex Case
   Expertise, Why Clients Choose Us, Testimonials, FAQ. They were in the
   twelve-section brief you gave me previously, so I **kept and restyled** them
   rather than deleting work on incomplete evidence. **This needs your decision** —
   if the frames are the whole page, say so and I will remove them.
8. **The "Blogs" nav entry has no destination.** It is an anchor to `#blogs`,
   which does not exist. Currently harmless but it should point somewhere before
   launch.

---

# Responsive notes

Mobile-first; Tailwind's default breakpoints, unmodified.

| Band          | Behaviour                                                            |
| ------------- | -------------------------------------------------------------------- |
| Header        | Pill from 320px. Nav and CTA hidden below `lg`; drawer replaces them |
| Hero          | Single column below `lg`; stats stack, then go three-across at `sm`  |
| Who We Help   | One column, then two at `lg`. The zigzag offset is `lg:` only        |
| Core Services | Tab list is a horizontal scroller below `lg`, vertical rail above    |
| Timeline      | Spine sits at the far left below `lg`; centred and alternating above |
| CTA / form    | Stacks below `lg`; form fields go two-across at `sm`                 |
| Footer        | One column → two at `sm` → brand + links at `lg`                     |

- Fluid type via `clamp()` everywhere, so there is no step change at a breakpoint.
- Touch targets ≥ 44px; the drawer toggle is 44×44.
- The drawer is capped at `calc(100dvh - 8rem)` and scrolls internally — `dvh`,
  not `vh`, so the mobile URL bar cannot clip it.

**Now verified in a real browser** (Playwright/Chromium against the dev server):

| Viewport | `scrollWidth` | Horizontal overflow |
| -------- | ------------- | ------------------- |
| 320px    | 320           | none                |
| 390px    | 390           | none                |
| 768px    | 768           | none                |
| 1024px   | 1024          | none                |
| 1440px   | 1440          | none                |
| 1920px   | 1920          | none                |

Screenshots captured at desktop (1440) and mobile (390), full-page and hero.
No page errors, no console errors.

---

# Accessibility notes

Audited against the built HTML, not asserted:

| Check                       | Result                                               |
| --------------------------- | ---------------------------------------------------- |
| `<h1>` count                | **1**                                                |
| Heading levels              | Descend without skips                                |
| Dangling ARIA references    | **0 of 23**                                          |
| Landmarks                   | 1 header, 1 main, 1 footer, 4 nav — all nav labelled |
| Form fields without a label | **0 of 7**                                           |
| Contrast pairs tested       | 11 — all pass after the `accent-deep` fix            |

- **Tabs** follow the WAI-ARIA pattern: roving tabindex (one tab stop, not six),
  Up/Down and Left/Right arrows, Home/End, wrapping selection, and correct
  `aria-selected` / `aria-controls` / `aria-labelledby` wiring.
- **Every tab panel is rendered**, inactive ones carrying `hidden`. Mounting only
  the selected panel would leave five of six services out of the HTML — the
  opposite of what the GEO strategy needs.
- **Drawer**: focus trap includes the close button, Escape closes, focus returns
  to the trigger, body scroll locked, `aria-controls` points at an element that
  always exists.
- `aria-current="page"` on the active nav item — the gold underline alone carries
  no meaning to a screen reader.
- Required fields are marked with a visible asterisk **and** an
  `sr-only` "(required)", since an asterisk alone is not an accessible cue.
- Statistics use `<dl>`; the process uses `<ol>`; quotes use
  `figure`/`blockquote`/`figcaption`.

**Driven in a real browser and confirmed:**

| Behaviour                                                  | Result |
| ---------------------------------------------------------- | ------ |
| Drawer opens, `aria-expanded` flips to `true`              | ✅     |
| Escape closes the drawer                                   | ✅     |
| Focus returns to the toggle after close                    | ✅     |
| Tabs: ArrowDown advances selection                         | ✅     |
| Tabs: End jumps to last, then wraps to first               | ✅     |
| Tabs: exactly **1** tab stop in the list (roving tabindex) | ✅     |
| Scroll reveal: all 27 elements reach `visible`             | ✅     |

- Reduced motion collapses `Reveal` to "already there"; `<noscript>` guarantees
  content is visible with scripting off.

---

# Performance notes

Measured from the built HTML, gzipped, excluding the `noModule` legacy bundle
that modern browsers never download:

|                                                         | gzipped      |
| ------------------------------------------------------- | ------------ |
| 404 page (zero client components) — **framework floor** | 146.7 KB     |
| Home page                                               | **168.2 KB** |
| → attributable to application code                      | **21.5 KB**  |

- Application code rose 2.1KB from the previous pass — the cost of `ServiceTabs`.
  Everything else was structural.
- Only **two** client components on the page: `Header` and `ServiceTabs`. The
  form, the timeline, all cards and all copy are server-rendered.
- **Zero raster images.** The logo and hero panel are inline SVG, so there are no
  image requests and no image-driven layout shift. This will change when the 3D
  assets arrive — they must ship as AVIF/WebP with explicit dimensions.
- Fonts self-hosted via `next/font` with fallback metrics, so no CLS on swap.
  Poppins at three weights is three files; dropping to two would save a request
  if the design permits.
- All scripts are `async` — none render-blocking.

**`PROJECT.md`'s 130KB budget remains unreachable.** The framework floor alone
exceeds it by 16.7KB. The budget should be re-based on Lighthouse/LCP rather than
bundle size; application code at 21.5KB is lean.

---

# Lighthouse expectations

**Estimates, not measurements — I have no browser to run Lighthouse in.**

| Category       | Expectation      | Reasoning                                                                                                                                                                |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Performance    | **90–98** mobile | Static HTML, no images, no blocking scripts, self-hosted fonts. The variable is the ~168KB of framework JS, which costs main-thread parse time on a throttled mobile CPU |
| Accessibility  | **100**          | Contrast verified numerically, 0 dangling ARIA, all fields labelled, one `h1`, landmarks named                                                                           |
| Best Practices | **100**          | Five security headers, no console output, no deprecated APIs, HTTPS-only                                                                                                 |
| SEO            | **100**          | Unique title/description, canonical, robots + sitemap, 9-node JSON-LD graph                                                                                              |

**What could pull Performance below 95:** the framework JS on a 4× throttled CPU,
and — once added — the 3D hero artwork if it ships unoptimised. It is the LCP
element on desktop, so it needs AVIF, correct `sizes`, and `priority`.

Verify against a real deployment before trusting any of this. `next build`
no longer reports First Load JS, and Lighthouse on a preview URL is the only
number that counts.

---

# Placeholder content — must not ship

Nothing below is invented to look finished; each is flagged in-file.

1. **Testimonials are gone.** `content/testimonials.ts` exports an empty array
   and the band renders `null`. The invented quotes were deleted rather than
   commented out — placeholder testimonials read as finished copy and are the
   single most likely thing to reach production unnoticed. The file carries a
   TODO listing what to capture (wording, consent, date).
2. **Hero statistics are the design's numbers, not the firm's.** "100+ Complex
   Bank Accounts Opened", "30+ Structured Business Setups" are marked
   `⚠️ PLACEHOLDER STATISTICS — MUST NOT SHIP UNVERIFIED`. An unverifiable
   performance statistic on a financial services site is a regulatory exposure.
   **I did not invent any figure.**
3. **NAP is lorem ipsum from the design** — address, email and phone all carry
   `TODO(client)`.
4. **FAQ answers** describe UAE regulation in general terms and need review by a
   licensed adviser.

**No `Review` or `AggregateRating` JSON-LD is emitted**, and none may be added
until quotes are real and permissioned. Marking up invented reviews risks a
manual action against the whole domain.

---

# Issues

- **`ui/Badge` is unused.** `PROJECT.md` forbids dead code, but there is still no
  git history, so deleting it is irreversible. Kept and flagged — remove it once
  the repository has commits, or use it.
- **The consultation form is not wired.** No action, no submit handler.
  `contactSchema` and the honeypot already exist; Phase 6 connects them. Marked
  `⚠️ NOT WIRED` in the file. **A visitor filling it in today gets nothing** — if
  the page is going live before Phase 6, this must be addressed.
- **Still zero git commits.** Every file is untracked and there is no rollback
  point for any of this work.

---

# Next

Awaiting your approval of the Home Page. Not started, per instruction: About,
Services routes, Admin, CMS, Auth.

**To close the remaining gaps, I need from you:** the 3D assets and logo SVG, the
heading typeface name, Dev Mode spacing/colour values, and a decision on the five
sections not present in the frames.
