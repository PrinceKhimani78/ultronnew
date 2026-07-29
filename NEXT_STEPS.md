# Ultron Financial — Development Roadmap

> Companion to `PROJECT_STATUS.md`. Phases are ordered by dependency, not by
> visibility. Each phase ends in a verifiable state: `npm run verify` green.
>
> **Rule for every phase:** audit before writing, reuse before creating, improve
> before replacing. Nothing already listed as Completed in `PROJECT_STATUS.md`
> gets rebuilt.

---

## Phase 0 — Stop the silent failures

_Small, and everything else sits on top of it. Three of these are Critical in
the audit and all fail invisibly._

- [x] `.gitignore`: added `!.env.example` so the template is actually committed.
- [x] Pinned Node: `engines.node >= 20.9.0` in `package.json` + `.nvmrc`.
- [x] `next.config.ts`: set `turbopack.root` to `import.meta.dirname`. The
      wrong-workspace-root warning is gone from the build output.
- [x] `minimumCacheTTL` lowered from one year to one day, with the reasoning
      corrected — `/_next/image` caches on source path, not a content hash.
- [x] Corrected the Status line in `PROJECT.md`.
- [ ] **Make the first git commit.** Still outstanding — nothing is under version
      control. Left for the maintainer to author.

**Exit:** `.env.example` is tracked; build emits no warnings. ✅ (git history
pending)

---

## Phase 1 — Foundation

_The seams everything else plugs into._

- [x] **`src/lib/env.ts`** — Zod-validated environment, parsed at module load.
      Verified: a production deploy without `NEXT_PUBLIC_SITE_URL` now fails the
      build with a named error. Local builds still run with no `.env.local`,
      because strictness keys off `VERCEL_ENV`, not `NODE_ENV`.
- [x] **Rewrote `src/app/layout.tsx`** — create-next-app scaffold replaced:
  - Newsreader (display) + Inter (sans), self-hosted, with fallback metrics.
  - `metadataBase`, `title.template`, description, OG + Twitter.
  - `data-scroll-behavior="smooth"` on `<html>` (required in Next 16).
  - Skip-to-content link; `<main id="content">` landmark.
- [x] **`src/lib/seo.ts`** — `buildMetadata()` + `absoluteUrl()`. The latter
      moved out of `lib/utils.ts`, which is client-imported and must not drag
      server config into the browser bundle.
- [x] **`src/lib/schemas/contact.ts`** — `contactSchema`, honeypot included.
- [x] **`src/content/`** — `site.ts` and `home.ts`. The CMS seam.
- [x] **`src/app/robots.ts`** — nine AI crawlers named explicitly.
- [x] **`src/app/sitemap.ts`** — reads `STATIC_ROUTES`, so it cannot drift.
- [x] ESLint now encodes the charter: no `console.log`, no `any`, no `@ts-ignore`,
      the `ui/` → `sections/`+`content/` boundary, no JSX in `content/`, and
      `process.env` restricted to `lib/env.ts`.

**Exit:** ✅ `npm run verify` green. Fonts resolve to Newsreader/Inter, env fails
loudly when misconfigured, `/robots.txt` and `/sitemap.xml` render correctly.

---

## Phase 2 — Design System

_Primitives only. Zero business knowledge. Build the ones the Home page needs,
not the full charter table — the rest arrive when a page demands them._

- [x] `layout/Container` — sole owner of max-measure and horizontal gutters.
- [x] `layout/Section` — vertical rhythm, `surface`/`raised`/`brand` tones.
- [x] `ui/Button` — `cva` variants (primary · outline · ghost · link × sm/md/lg),
      `asChild` via `@radix-ui/react-slot`. No per-component focus ring: the
      global `:focus-visible` treatment is the single answer.
- [ ] `ui/Card`, `ui/Badge`, `ui/Separator`.
- [ ] `layout/Logo` — wordmark + icon lockup (replaces the create-next-app SVGs).
- [ ] `motion/Reveal` + `motion/Stagger` — Framer Motion, **reduced-motion aware
      by construction**, transform/opacity only.
- [ ] `seo/JsonLd` — serialises a schema.org object to a script tag.

**Exit:** every primitive used at least once; no component duplicated; no file
over ~200 lines.

---

## Phase 3 — Home Page

_The highest-value page. The create-next-app template is gone; the Hero band is
built and the remaining bands compose beneath it._

**✅ COMPLETE.** All twelve bands built, verified, and documented in
`PROJECT_STATUS.md`.

- [x] Header/Navigation, Trust Strip, About, Who We Help, Core Services,
      Complex Cases, How Ultron Works, Why Choose Us, Testimonials, FAQ,
      CTA Contact, Footer.
- [x] All copy in `src/content/` (six files); nothing hardcoded in a component.
- [x] JSON-LD `@graph` — `ProfessionalService`, `WebSite`, 5 × `Service`,
      `FAQPage`. Validated by parsing the built HTML.
- [x] `opengraph-image` generated and visually checked.
- [x] `not-found.tsx`, styled. create-next-app SVGs removed.
- [x] A11y audit on built HTML: 1 `h1`, no skipped levels, 0 dangling ARIA
      refs, all navs labelled, drawer focus trap fixed.
- [x] `Reveal` moved off Framer Motion to IntersectionObserver — 37.6KB saved.

**Outstanding on this page** (blocked on you, not on code):

- [ ] Reconcile against Figma — the prototype URL is not machine-readable and no
      images arrived. Export frames as PNGs and attach them.
- [ ] Replace placeholder content flagged in `content/testimonials.ts`,
      `TRUST_STRIP`, `content/faq.ts`, and `SITE` NAP fields.
- [ ] Amend PROJECT.md's 130KB JS budget — the framework floor is 146.7KB, so
      the target is unreachable on this stack.

- [ ] `(marketing)` route group + layout (shared Header/Footer).
- [ ] `layout/Header` — sticky nav, mobile drawer with focus trap.
- [ ] `layout/Footer` — sitemap, NAP, regulatory disclaimer.
- [ ] Sections, one file per band: `Hero`, `TrustStrip`, `WhatWeDeliver`,
      `Services`, `Process`, `WhyUltron`, `Faq`, `CtaContact`.
- [ ] All copy pulled from `src/content/` — never inlined.
- [ ] `Organization` + `WebSite` + `LocalBusiness` + `FAQPage` JSON-LD.
- [ ] Real `favicon` and `opengraph-image`; remove the Next/Vercel SVGs.
- [ ] `not-found.tsx` and `error.tsx`, styled.

**Exit:** Lighthouse ≥ 95 mobile, one `<h1>`, keyboard-navigable, LCP < 2.0s.

---

## Phase 4 — About

- [ ] Team, credentials, firm story. Trust is the conversion lever here.
- [ ] `AboutPage` + `BreadcrumbList` JSON-LD.

---

## Phase 5 — Services

**✅ Services index COMPLETE.** `/services` is built and reconciled against the
supplied design. See `PROJECT_STATUS.md`.

- [x] Services index with six expandable service cards.
- [x] `CollectionPage` + `ItemList` + `BreadcrumbList` JSON-LD; `Service` nodes
      share their home-page `@id`s.
- [x] Header/Footer moved to the root layout; `aria-current` derived from path.
- [x] Added to `sitemap.ts`; nav and footer now link the real route.
- [ ] **Service detail routes** — `app/services/[slug]`, remembering `params` is
      a Promise in Next 16. `content/services.ts` already carries `slug`, so
      `generateStaticParams` is a few lines. Card headings become links then.
- [ ] Internal links from each detail page to two sibling services + contact.

### Original plan (detail routes outstanding)

- [ ] Services index.
- [ ] Dynamic service detail — `app/services/[slug]`, remembering **`params` is
      a Promise in Next 16**.
- [ ] `generateStaticParams` from `content/services`.
- [ ] `Service` JSON-LD per page; internal links to two sibling services + contact.

---

## Phase 6 — Contact

- [ ] Contact page + React Hook Form × Zod (`contactSchema` from Phase 1).
- [ ] `app/api/contact/route.ts` — parse → rate-limit → send → typed response,
      matching the charter's JSON contract exactly.
- [ ] `src/lib/rate-limit.ts` + install `@upstash/ratelimit` and
      `@upstash/redis` (referenced in `.env.example`, never installed).
- [ ] `src/lib/mailer.ts` + React Email template (both referenced, neither
      written).
- [ ] Honeypot field and minimum time-to-submit.
- [ ] Accessible errors: real `<label>`, `aria-describedby`, announced.

**Exit:** submission delivers an email; validation failure and rate limit both
return the documented shapes.

---

## Phase 7 — Blog

- [ ] `prisma/schema.prisma` — the models are already drafted in `PROJECT.md`;
      transcribe rather than redesign. Provision Neon, run first migration.
- [ ] `src/lib/db.ts` — Prisma singleton.
- [ ] Blog index + detail, `Article` JSON-LD, RSS.
- [ ] Add posts to `sitemap.ts`.

---

## Phase 8 — Admin Panel

- [ ] `(admin)` route group, own layout, `noindex`, excluded from sitemap.
- [ ] Enquiry inbox with status.
- [ ] Blog CRUD, draft/publish, Tiptap stored as JSON.
- [ ] `AuditLog` on every mutation.

---

## Phase 9 — Authentication

_Deliberately after the admin shell: build the surface, then gate it._

- [ ] Auth.js + Prisma adapter, database sessions (instant revocation).
- [ ] `Role` enum (`ADMIN` / `EDITOR`).
- [ ] **`proxy.ts`, not `middleware.ts`** — renamed in Next 16, and the `edge`
      runtime is unsupported there. Every server action re-checks authorisation;
      the proxy alone is not authorisation.
- [ ] CSP with per-request nonce — the work `next.config.ts` already flags as
      deferred.

---

## Phase 10 — CMS

- [ ] Migrate blog reads from `content/` to Prisma (the seam from Phase 1 makes
      this one file per section).
- [ ] Media upload.
- [ ] Marketing copy stays in `content/` until a non-technical editor genuinely
      needs it. Payload CMS only if that day comes.

---

## Phase 11 — Testing

- [ ] Vitest — Zod schemas at their boundaries, utilities.
- [ ] Testing Library — form validation, accordion keyboard behaviour, mobile
      nav focus trap.
- [ ] Playwright — contact happy path, validation path, mobile viewport.
- [ ] axe pass; visual regression at 375 / 768 / 1440.
- [ ] GitHub Actions: unit + component on every PR, E2E against the preview.

_Rationale for the late placement: the charter's checklist targets behaviour
that doesn't exist until Phases 6–8. Schema and utility tests should be written
alongside Phase 1 and 6 rather than waiting for this phase._

---

## Phase 12 — Production

- [ ] Work the charter's Production Checklist top to bottom.
- [ ] Verify headers on securityheaders.com; JSON-LD through the Rich Results
      Test; OG in the LinkedIn and X validators.
- [ ] Lighthouse CI with enforced budgets against the preview URL.
- [ ] `npm audit` clean; Dependabot on.
- [ ] Privacy Policy and Terms live, legally reviewed.
- [ ] Neon branch per preview deploy; `prisma migrate deploy` in the build.

---

## Sequencing notes

- **Phases 0–3 are the critical path.** They take the project from "green build
  on a template" to "a real home page that converts."
- Phases 4–6 are independent of each other once Phase 2 exists and can run in
  parallel if more than one person is working.
- Phase 7 is the first phase requiring a provisioned database — everything
  before it runs with no external services.
- Test writing should not actually wait for Phase 11; the phase exists to close
  gaps and add CI, not to start from zero.
