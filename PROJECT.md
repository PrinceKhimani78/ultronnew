# Ultron Financial — Project Charter

> Single source of truth for architecture, standards and delivery.
> Read this before writing code. Update it when a decision changes.

**Status:** Foundation in progress. Design tokens, tooling and configuration are
in place; no page is finished yet. Every route below is planned here and
deliberately unbuilt. See `PROJECT_STATUS.md` for the audited position and
`NEXT_STEPS.md` for the phased plan.

---

## Project Overview

Ultron Financial is a boutique corporate advisory firm that takes international
businesses from "we want to enter the UAE" to "we are trading, banked and
compliant" — company formation, corporate banking introductions, tax
structuring, ongoing compliance and residency.

The website is not a brochure. It is the top of a high-value consultative sales
funnel where a single converted enquiry is worth thousands. Its job is to make a
founder in London, Mumbai or Singapore believe that this firm can be trusted
with their UAE entity, and then to get them to book a call.

---

## Business Goals

Ranked. Where goals conflict, the higher one wins.

1. **Qualified consultation bookings.** The primary conversion. Every page ends
   in one.
2. **Credibility on first impression.** The visitor is deciding whether this
   firm is serious within about four seconds. Design quality is doing sales work.
3. **Discoverability, including by AI.** Founders increasingly ask ChatGPT and
   Perplexity "who helps with UAE company formation" before they ever open
   Google. We must be a citable, structured, entity-clear source.
4. **Lower cost of sale.** The site should pre-answer the twenty questions the
   advisory team currently answers on every first call.
5. **Content compounding.** The blog is a long-term organic asset.

**Primary KPI:** consultation form submissions per 1,000 sessions.
**Secondary:** organic entries, AI-referral sessions, scroll depth on service
pages, time to first byte.

---

## Brand Personality

| We are        | We are not        |
| ------------- | ----------------- |
| Precise       | Flashy            |
| Understated   | Loud              |
| Institutional | Corporate-generic |
| Warm          | Cold              |
| Certain       | Boastful          |

The visual register is **editorial, not startup**. Generous whitespace, large
confident typography, one accent colour used sparingly. Gold is punctuation, not
decoration — it marks the single most important word in a sentence and nothing
else.

### Brand Typography System

Funnel Display is the official Ultron Financial brand typeface and must be used across all public pages, admin pages, reusable components and future CMS content.

- **Official Typeface**: Funnel Display (`next/font/google` loaded with `font-display: swap` and fallback stack `"Funnel Display", Arial, Helvetica, sans-serif`).
- **Supported Font Weights**:
  - `Regular (400)` — Body text, long-form reading, comfortable line height.
  - `Medium (500)` — Navigation, buttons, labels, captions, form controls.
  - `Semibold (600)` — Section headings, subheadings, primary buttons.
  - `Bold (700)` — Display headings, hero titles, primary statistics.
- **Global CSS Variables**:
  - `--font-brand`: `var(--font-funnel-display), "Funnel Display", Arial, Helvetica, sans-serif`
  - `--font-sans`: `var(--font-brand)`
  - `--font-display`: `var(--font-brand)`
  - `--font-body`: `var(--font-brand)`
  - `--font-heading`: `var(--font-brand)`

**Voice:** plain English, short sentences, no jargon without immediately paying
it off. Never "leverage", "solutions", "seamless", "cutting-edge". We say what
we do: _"We open doors to UAE corporate banking."_

---

## Target Audience

**Primary — the expanding founder.** 30–50, running a profitable business
outside the UAE, wants a Dubai entity for market access, tax efficiency or
credibility. Time-poor. Has been quoted wildly different prices by three agents
and does not know who to believe. Wants certainty and a named human.

**Secondary — the relocating operator.** Selling up or moving family. Cares
about residency, schooling timelines, banking for a new entity, and whether
their existing structure survives the move.

**Tertiary — the referring professional.** An accountant or lawyer abroad
sending a client. Judges us on technical accuracy, not marketing.

**Anti-audience:** price-shopping shell-company buyers. We do not compete on
"AED 5,750 company setup" and the site should not attract that search.

---

## Competitors

| Competitor      | Strength                        | Where we take share                                        |
| --------------- | ------------------------------- | ---------------------------------------------------------- |
| Creative Zone   | Scale, brand recognition        | They feel like a volume factory; we feel like a firm       |
| Virtuzone       | Heavy paid search, slick funnel | Their content is thin; ours is genuinely useful            |
| Shuraa          | Price-led, broad reach          | We do not compete on price at all                          |
| Commitbiz       | Decent SEO footprint            | Poor design; credibility gap on first impression           |
| Adam Global     | International network           | Dated web presence; weak mobile                            |
| Big 4 UAE desks | Unimpeachable trust             | Inaccessible to sub-enterprise clients — our whole opening |

**Positioning:** the firm a Big 4 partner would recommend to a client too small
for the Big 4.

---

## Technical Stack

| Layer              | Choice                                  | Why                                                                  |
| ------------------ | --------------------------------------- | -------------------------------------------------------------------- |
| Framework          | Next.js 16, App Router                  | Server Components cut client JS; file routing; first-class Vercel    |
| UI                 | React 19                                | Compiler-optimised, `use` hook, Actions                              |
| Language           | TypeScript (strict)                     | Non-negotiable on a codebase meant to live years                     |
| Styling            | Tailwind CSS v4                         | CSS-first `@theme` config; tokens are real CSS variables             |
| Primitives         | shadcn/ui                               | Copied in, not depended on — we own and can restyle every component  |
| Motion (component) | Framer Motion                           | Declarative, React-native, handles enter/exit                        |
| Motion (scroll)    | GSAP + ScrollTrigger                    | Timeline sequencing and pinning that Framer cannot express cleanly   |
| Forms              | React Hook Form                         | Uncontrolled by default — no re-render per keystroke                 |
| Validation         | Zod                                     | One schema shared by client and server. Never validate twice by hand |
| ORM                | Prisma                                  | Type-safe, migration history, good DX                                |
| Database           | PostgreSQL (Neon)                       | Serverless-friendly, branchable per preview deploy                   |
| Auth               | Auth.js                                 | **Not installed yet** — admin-only, see Admin Panel Planning         |
| Email              | Resend + React Email                    | Templates as components; previewable in dev                          |
| Hosting            | Vercel                                  | Edge network, preview deploys, native Next support                   |
| Quality            | ESLint · Prettier · Husky · lint-staged | Enforced at commit, not by discipline                                |

**Deliberately excluded:** state management library (Server Components plus URL
state cover it), CSS-in-JS (runtime cost), a component library we do not own,
`moment`, `lodash`.

---

## Folder Structure

```
ultron-final/
├── prisma/
│   └── schema.prisma            # models; migrations added at DB provisioning
├── public/
│   ├── brand/                   # logo marks
│   └── og/                      # social share images
├── src/
│   ├── app/
│   │   ├── (marketing)/         # public route group — shares nav + footer
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx         # HOME — the only built route
│   │   ├── api/
│   │   │   └── contact/route.ts # enquiry endpoint
│   │   ├── layout.tsx           # html/body, fonts, global metadata
│   │   ├── globals.css          # @theme tokens + primitives only
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/                  # design system — no business meaning
│   │   ├── layout/              # Header, Footer, Container, Section
│   │   ├── sections/            # page compositions, one file per band
│   │   ├── motion/              # animation wrappers
│   │   └── seo/                 # JSON-LD emitters
│   ├── content/                 # typed content objects — the CMS seam
│   ├── emails/                  # React Email templates
│   ├── hooks/
│   ├── lib/
│   │   ├── schemas/             # Zod — shared client/server
│   │   ├── db.ts                # Prisma singleton
│   │   ├── env.ts               # validated environment
│   │   ├── seo.ts               # metadata + JSON-LD builders
│   │   └── utils.ts             # cn() and friends
│   └── types/
└── PROJECT.md
```

**Rules.** `components/ui` never imports from `components/sections`. `content/`
holds no JSX. Anything imported twice moves to `lib/`. A file over ~200 lines is
a smell — split by responsibility, not by line count.

---

## Coding Standards

- **Server Components by default.** `'use client'` requires a reason: state,
  effects, event handlers, browser APIs, or a client-only library. Push the
  boundary as deep as possible — a client leaf inside a server parent, never the
  reverse.
- **No `any`.** No `@ts-ignore`. `unknown` plus a type guard when a boundary is
  genuinely untyped.
- **No `console.log`** in committed code. Structured logging at API boundaries
  only.
- **Named exports** everywhere except Next's required default exports (pages,
  layouts, route handlers).
- **Props typed inline** for single-use components; a named `type` when exported
  or reused.
- **Composition over configuration.** A component with more than about six props
  usually wants to be two components or accept `children`.
- **No dead code.** No commented-out blocks. Git remembers.
- **Comments explain _why_.** If a line needs a comment to say _what_ it does,
  rename something instead.

---

## Component Guidelines

Three tiers, and the tier determines the rules.

**`ui/` — primitives.** Zero business knowledge. Styled with `cva` for variants,
merged with `cn()`. Must forward refs and spread the native element's props.
Examples: `Button`, `Input`, `Card`, `Badge`.

**`layout/` — structure.** Own spacing and width, never content. `Container`
sets the measure. `Section` sets vertical rhythm and background. No section file
sets its own horizontal padding.

**`sections/` — compositions.** One exported component per page band. Pulls copy
from `content/`, arranges `ui/` and `layout/` pieces. Server Components unless a
specific interaction forces otherwise.

**Never duplicate.** Before creating a component, search for it. If a variant is
needed, add a `cva` variant rather than a second file. Two components differing
only in colour is a bug.

---

## Animation Guidelines

Motion is confidence, not decoration. If an animation draws attention to itself,
it has failed.

- **Only `transform` and `opacity`.** Never `top`, `left`, `width`, `height` —
  they trigger layout on every frame.
- **Framer Motion** for component enter/exit, hover, presence.
- **GSAP + ScrollTrigger** for scroll-driven timelines and pinning.
- **Durations:** micro-interaction 150–250ms, entrance 600–900ms, scroll
  sequence tied to distance rather than time.
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` as the house curve. Never
  `linear` on anything a human perceives as physical.
- **Stagger:** 60–120ms between siblings. More reads as a queue.
- `prefers-reduced-motion` **must** collapse every transform to a plain fade or
  to nothing. Not a nice-to-have — a correctness requirement.
- **Never animate away layout stability.** Reserve space before animating into it.
- Budget: 60fps on a 4× CPU-throttled mobile profile.

---

## Accessibility Standards

Target **WCAG 2.2 Level AA**.

- Semantic HTML first. `<button>` for actions, `<a>` for navigation. A `<div>`
  with `onClick` is a defect.
- One `<h1>` per page. Heading levels never skip.
- Visible focus on every interactive element. Never `outline: none` without a
  replacement.
- Contrast ≥ 4.5:1 body, ≥ 3:1 large text and UI boundaries.
  **Known constraint:** gold `#C9B37E` on cream `#FDFBEE` measures ≈ 2:1 and is
  therefore **decorative only** — it may emphasise a word but must never be the
  sole carrier of meaning, and never body copy.
- Every form field has a real `<label>`. Errors are `aria-describedby`-linked
  and announced.
- Images: meaningful ones get real alt text; decorative ones get `alt=""`.
- Full keyboard operability, logical tab order, skip-to-content link.
- Motion respects `prefers-reduced-motion`.
- Screen-reader passes: NVDA/Firefox and VoiceOver/Safari before launch.

---

## Responsive Breakpoints

Tailwind defaults, unmodified — a custom scale costs more than it earns.

| Token | Min width | Design target                   |
| ----- | --------- | ------------------------------- |
| —     | 320px     | Smallest supported              |
| `sm`  | 640px     | Large phone                     |
| `md`  | 768px     | Tablet portrait                 |
| `lg`  | 1024px    | Tablet landscape / small laptop |
| `xl`  | 1280px    | Desktop                         |
| `2xl` | 1536px    | Large desktop                   |

Mobile-first: unprefixed styles are the phone. Content decides breakpoints —
if a layout breaks at 900px, fix it at 900px rather than waiting for `lg`.
Fluid type via `clamp()` in preference to stepped sizes. Touch targets ≥ 44px.

---

## SEO Strategy

**Technical**

- Server-rendered HTML for all content. Nothing meaningful behind hydration.
- Per-route `metadata` exports; `title.template` on the root layout.
- Canonical on every page. `metadataBase` set once.
- `sitemap.ts` and `robots.ts` generated, not static files.
- Open Graph + Twitter cards; 1200×630 images.
- Clean, hyphenated, lowercase URLs. No IDs, no query params for content.
- Core Web Vitals are a ranking input — see Performance Targets.

**Content**

- One page, one intent. Service detail pages target one service each.
- H1 states the outcome, not the company name.
- Internal linking: every service page links to two related services and the
  contact page.
- Blog targets long-tail questions ("can a UK company own a UAE free zone
  entity?") rather than head terms.

**Local**

- Consistent NAP (name, address, phone) in the footer and in `LocalBusiness`
  schema.
- Dubai/UAE geographic entities named explicitly in copy.

---

## GEO Strategy

Generative Engine Optimisation — being the source an AI cites.

**Structured data (JSON-LD, `<script type="application/ld+json">`)**

- `Organization` — legal name, logo, URL, `sameAs`, contact point. Site-wide.
- `WebSite` with `SearchAction`.
- `LocalBusiness` / `ProfessionalService` — address, geo, opening hours.
- `Service` — one per service page, with `provider`, `areaServed`, `serviceType`.
- `FAQPage` — every FAQ block.
- `BreadcrumbList` on nested routes.
- `Article` + `author` on blog posts.

**Content shape for extraction**

- Answer first, elaborate second. AI engines lift the first 40–60 words.
- Self-contained paragraphs — no "as mentioned above".
- Real numbers, named jurisdictions, concrete timelines. Specificity is what
  gets quoted.
- Comparison tables in real `<table>` markup, never CSS grids of `<div>`.
- Definition-style sentences: _"A free zone company is …"_ — these become the
  quoted line.

**Entity clarity**

- One canonical spelling of the company name everywhere.
- Explicit relationships: firm → services → jurisdictions → outcomes.
- `sameAs` links to LinkedIn and any registry listings.

**Semantic HTML**

- `<article>`, `<section>`, `<nav>`, `<address>`, `<time datetime>` used for
  their meaning. Parsers rely on it.

**Crawler access**

- `robots.txt` explicitly allows `GPTBot`, `ClaudeBot`, `PerplexityBot`,
  `Google-Extended`. Being invisible to them is being absent from the answer.

---

## Performance Targets

| Metric                               | Target          |
| ------------------------------------ | --------------- |
| Lighthouse Performance               | ≥ 95 (mobile)   |
| Accessibility / Best Practices / SEO | 100             |
| LCP                                  | < 2.0s          |
| INP                                  | < 200ms         |
| CLS                                  | < 0.05          |
| TTFB                                 | < 400ms         |
| First-load JS (home)                 | < 130KB gzipped |

**How**

- Server Components hold the line on bundle size.
- `next/image` everywhere; AVIF/WebP; explicit `sizes`; `priority` on the LCP
  image only.
- `next/font` self-hosting with `display: swap` and preloaded subsets — no
  render-blocking Google Fonts request.
- `next/dynamic` with `ssr: false` for anything heavy and below the fold.
- No layout shift: every image and animated element has reserved space.
- Third-party scripts: none by default. Analytics via Vercel Analytics only.
- CI budget check on `.next/analyze` before merge.

---

## Security Checklist

- [ ] Security headers in `next.config.ts`: `Strict-Transport-Security`,
      `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
      `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`.
- [ ] Content-Security-Policy with per-request nonce.
- [ ] **Every** API input parsed through Zod. Never trust a client-validated body.
- [ ] Rate limiting on all public POST routes (Upstash Ratelimit; IP + sliding
      window). Contact form: 5 per 10 minutes.
- [ ] Honeypot field plus a minimum time-to-submit on public forms.
- [ ] Prisma parameterises queries — never raw SQL string interpolation.
- [ ] Secrets in environment variables only. `.env*` git-ignored. Never a secret
      behind `NEXT_PUBLIC_`.
- [ ] Env validated at boot via `lib/env.ts` — fail fast, not at 3am.
- [ ] Generic error messages to clients; details to server logs only.
- [ ] Admin routes behind Auth.js with middleware-enforced role checks.
- [ ] `npm audit` clean; Dependabot enabled.

---

## Admin Panel Planning

**Not built. Architected only.** Building it now would be speculative work
against unknown editorial needs.

- **Route group:** `src/app/(admin)/admin/*` — its own layout, excluded from
  `sitemap.ts`, `noindex`.
- **Auth:** Auth.js with the Prisma adapter. Credentials provider plus optional
  Google for staff. Sessions in the database, not JWT, so revocation is instant.
- **Authorisation:** `Role` enum (`ADMIN`, `EDITOR`) on `User`. Middleware gates
  `/admin/*`; every server action re-checks — middleware alone is not
  authorisation.
- **Scope v1:** enquiry inbox with status; blog post CRUD with draft/publish;
  service page copy editing; media upload.
- **Editor:** Tiptap, stored as JSON, rendered server-side.
- **Audit:** `AuditLog` model on every mutation — who, what, when, before/after.

---

## CMS Planning

**Phase 1 (now).** Copy lives in typed objects under `src/content/`. Fast,
type-safe, version-controlled, zero runtime cost. Correct while there is one
editor and that editor is a developer.

**Phase 2.** Blog moves to Prisma-backed models with an admin editor. Marketing
copy stays in `content/`.

**Phase 3 (only if needed).** External headless CMS if non-technical editors
need marketing-page control. Payload CMS is the leading candidate — it runs on
the same PostgreSQL instance.

**The seam.** Every section reads content from a typed object, never from
inlined JSX strings. Swapping the source for an async fetch is then a one-file
change per section rather than a rewrite. **This constraint is the whole point
of Phase 1 — do not inline copy into components.**

---

## Deployment Plan

| Environment | Branch    | URL                         |
| ----------- | --------- | --------------------------- |
| Production  | `main`    | ultronfinancial.com         |
| Staging     | `develop` | staging.ultronfinancial.com |
| Preview     | any PR    | auto-generated              |

- Vercel, auto-deploy on push. Preview deploys get their own Neon branch.
- Build gate: `tsc --noEmit` → `eslint` → `next build`. Any failure blocks.
- Migrations via `prisma migrate deploy` in the build command.
- Rollback: instant, via Vercel's previous-deployment promotion.
- Post-deploy: Lighthouse CI against the preview URL, budgets enforced.

---

## Future Roadmap

**Phase 1 — Foundation (current).** Design system, layout shell, Home Page.

**Phase 2 — Marketing surface.** About, Services index, Service detail
(dynamic), Contact, Privacy, Terms, 404.

**Phase 3 — Content engine.** Blog index and detail, Prisma-backed, `Article`
schema, RSS.

**Phase 4 — Admin.** Auth.js, enquiry inbox, blog CRUD, audit log.

**Phase 5 — Growth.** A/B testing on CTAs, multilingual (EN/AR with RTL),
client portal, calculators (setup cost, corporate tax exposure).

---

## Code Quality Rules

1. **No duplicate components.** Search before creating.
2. **Small files.** One responsibility. Split when a file starts needing
   section-header comments to navigate.
3. **No premature abstraction.** Duplicate twice, abstract on the third. A
   wrong abstraction costs more than repetition.
4. **No magic values.** A number appearing twice becomes a named constant.
5. **Derive, don't sync.** If a value can be computed at render, do not store it
   in state and keep it in step with an effect.
6. **Errors are handled or thrown.** Never swallowed silently.
7. **Every dependency justified.** If it saves fewer than fifty lines, write the
   fifty lines.
8. **Zero-warning policy.** Warnings become errors on the day they are ignored.

---

## Naming Conventions

| Thing                 | Convention                     | Example              |
| --------------------- | ------------------------------ | -------------------- |
| Component files       | PascalCase                     | `ServiceCard.tsx`    |
| Non-component files   | kebab-case                     | `format-currency.ts` |
| Directories           | kebab-case                     | `service-detail/`    |
| Components            | PascalCase                     | `ServiceCard`        |
| Functions             | camelCase, verb-first          | `buildMetadata()`    |
| Booleans              | `is` / `has` / `should` prefix | `isSubmitting`       |
| Handlers              | `handle` + event               | `handleSubmit`       |
| Handler props         | `on` + event                   | `onSelect`           |
| Constants             | SCREAMING_SNAKE_CASE           | `MAX_UPLOAD_BYTES`   |
| Types / interfaces    | PascalCase, no `I` prefix      | `ContactPayload`     |
| Zod schemas           | `<name>Schema`                 | `contactSchema`      |
| CSS custom properties | `--<group>-<name>`             | `--color-teal-deep`  |

Name by intent, never by appearance: `--color-accent`, never `--color-gold-2`.

---

## Git Branch Strategy

```
main ──────────────●────────────●──────  production, protected
                  ╱            ╱
develop ──●──────●────────────●────────  staging
         ╱      ╱
feature/*      fix/*
```

- Branches: `feature/home-hero`, `fix/contact-validation`, `chore/deps`.
- Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`,
  `perf:`, `test:`.
- Squash-merge into `develop`; merge-commit `develop` into `main` at release.
- `main` requires a passing build and one review. No direct pushes.
- Husky: `pre-commit` runs lint-staged; `commit-msg` validates the message.

---

## Environment Variables

`.env.example` is committed and must stay current. `.env*` is git-ignored.
Validated at boot in `lib/env.ts` — a missing variable fails the build, never a
request.

| Variable                   | Scope  | Required | Purpose                     |
| -------------------------- | ------ | -------- | --------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | client | yes      | Canonicals, OG, sitemap     |
| `DATABASE_URL`             | server | phase 3  | Postgres, pooled            |
| `DIRECT_URL`               | server | phase 3  | Prisma migrations, unpooled |
| `RESEND_API_KEY`           | server | yes      | Transactional email         |
| `CONTACT_TO_EMAIL`         | server | yes      | Enquiry destination         |
| `CONTACT_FROM_EMAIL`       | server | yes      | Verified sender             |
| `UPSTASH_REDIS_REST_URL`   | server | prod     | Rate limiting               |
| `UPSTASH_REDIS_REST_TOKEN` | server | prod     | Rate limiting               |
| `AUTH_SECRET`              | server | phase 4  | Session encryption          |
| `AUTH_URL`                 | server | phase 4  | Auth.js callbacks           |

**Never** put a secret behind `NEXT_PUBLIC_`. That prefix ships it to the browser.

---

## Reusable Components Plan

**`ui/` — primitives**

| Component                   | Variants                                               |
| --------------------------- | ------------------------------------------------------ |
| `Button`                    | primary · outline · ghost · link × sm/md/lg, `asChild` |
| `Input` `Textarea` `Select` | default · error                                        |
| `Label` `FieldError`        | —                                                      |
| `Card`                      | default · bordered · glass                             |
| `Badge`                     | teal · gold · muted                                    |
| `Accordion`                 | single · multiple                                      |
| `Separator`                 | horizontal · vertical, fading                          |

**`layout/`**

| Component   | Responsibility                                              |
| ----------- | ----------------------------------------------------------- |
| `Container` | Max measure and horizontal gutters. The only owner of both. |
| `Section`   | Vertical rhythm, background, optional ambient layer         |
| `Header`    | Sticky nav, mobile drawer                                   |
| `Footer`    | Sitemap, NAP, regulatory disclaimer                         |
| `Logo`      | Wordmark and icon lockups                                   |

**`motion/`**

| Component | Responsibility                                          |
| --------- | ------------------------------------------------------- |
| `Reveal`  | Fade-and-rise on scroll into view, reduced-motion aware |
| `Stagger` | Orchestrates child `Reveal`s                            |
| `CountUp` | Animated numerals, `tabular-nums`, reserved width       |

**`seo/`**

| Component | Responsibility                                   |
| --------- | ------------------------------------------------ |
| `JsonLd`  | Serialises a schema.org object into a script tag |

**`sections/`** — one file per home band: `Hero`, `TrustStrip`, `WhatWeDeliver`,
`Services`, `Process`, `WhyUltron`, `Faq`, `CtaContact`.

---

## API Plan

REST route handlers under `src/app/api`. Server Actions for form mutations owned
by a single page; route handlers where an external consumer might exist.

| Route                  | Method            | Auth                 | Purpose            |
| ---------------------- | ----------------- | -------------------- | ------------------ |
| `/api/contact`         | POST              | public, rate-limited | Enquiry submission |
| `/api/newsletter`      | POST              | public, rate-limited | Phase 2            |
| `/api/admin/enquiries` | GET               | ADMIN                | Phase 4            |
| `/api/admin/posts`     | POST/PATCH/DELETE | ADMIN/EDITOR         | Phase 4            |

**Contract**

```jsonc
// 200
{ "ok": true }
// 422 — validation
{ "ok": false, "errors": { "email": "Enter a valid email address." } }
// 429 — rate limited
{ "ok": false, "message": "Too many requests. Please try again shortly." }
// 500
{ "ok": false, "message": "Something went wrong." }
```

Every handler: parse with Zod → rate-limit → act → typed response. Never leak an
internal error message to a client.

---

## Database Planning

PostgreSQL via Prisma. Schema defined now; migrations run when the database is
provisioned in Phase 3.

```prisma
model Enquiry {
  id        String        @id @default(cuid())
  name      String
  email     String
  phone     String?
  company   String?
  service   String?
  message   String        @db.Text
  status    EnquiryStatus @default(NEW)
  source    String?       // utm_source
  ipHash    String?       // hashed — never store a raw IP
  createdAt DateTime      @default(now())

  @@index([status, createdAt])
}

model Post {
  id          String     @id @default(cuid())
  slug        String     @unique
  title       String
  excerpt     String
  body        Json       // Tiptap document
  coverImage  String?
  status      PostStatus @default(DRAFT)
  publishedAt DateTime?
  authorId    String
  author      User       @relation(fields: [authorId], references: [id])

  @@index([status, publishedAt])
}

model User {
  id    String @id @default(cuid())
  email String @unique
  name  String?
  role  Role   @default(EDITOR)
  posts Post[]
}
```

**Conventions.** `cuid()` ids — never expose a sequential integer. `createdAt`
and `updatedAt` on every table. Index every column used in a `where` or
`orderBy`. Soft-delete only where audit requires it. Store hashed IPs, never raw
— they are personal data under GDPR.

---

## Production Checklist

**Content**

- [ ] No lorem ipsum anywhere
- [ ] Real phone, email, address
- [ ] Regulatory disclaimer present and legally reviewed
- [ ] Privacy Policy and Terms live and linked

**Technical**

- [ ] `tsc --noEmit` clean
- [ ] `eslint` clean — zero warnings
- [ ] `next build` clean
- [ ] No `console.log` in the bundle
- [ ] 404 and error boundaries styled

**SEO / GEO**

- [ ] Unique title + description per route
- [ ] Canonicals correct
- [ ] `sitemap.xml` and `robots.txt` reachable
- [ ] OG images render in the LinkedIn and X validators
- [ ] JSON-LD passes Google's Rich Results Test
- [ ] AI crawlers allowed in `robots.txt`

**Performance**

- [ ] Lighthouse ≥ 95 mobile
- [ ] LCP < 2.0s on 4G
- [ ] CLS < 0.05
- [ ] Fonts self-hosted and preloaded

**Accessibility**

- [ ] axe: zero violations
- [ ] Full keyboard pass
- [ ] Screen-reader pass
- [ ] Contrast verified — gold is decorative only

**Security**

- [ ] Headers verified on securityheaders.com
- [ ] Rate limiting live
- [ ] No secret in the client bundle
- [ ] `npm audit` clean

---

## Testing Checklist

**Unit — Vitest.** Zod schemas at their boundaries, utilities, formatters. Not
components whose only behaviour is rendering markup.

**Component — Testing Library.** Anything with state or interaction: form
validation and error display, accordion keyboard behaviour, mobile nav focus
trapping. Query by role and label, never by test id.

**E2E — Playwright.** Contact form happy path; validation failure path;
navigation across the primary journey; mobile viewport pass.

**Visual.** Playwright screenshot comparison on key sections at 375 / 768 / 1440.

**Manual matrix.** Chrome, Safari, Firefox, Edge · iOS Safari, Chrome Android ·
375 / 768 / 1024 / 1440 / 1920 · keyboard only · reduced motion on · slow 3G.

**Gate.** Unit and component tests run on every PR. E2E runs against the preview
deploy. A red suite blocks merge.
