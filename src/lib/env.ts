import { z } from 'zod';

/**
 * Environment, parsed once at module load.
 *
 * The point is failure timing: an invalid environment should stop a deployment,
 * not surface as a broken canonical tag three weeks later. Nothing else in the
 * codebase reads `process.env` — import `env` from here instead, so the shape is
 * checked in exactly one place.
 *
 * Server-side only. `NEXT_PUBLIC_SITE_URL` is safe to expose, but the optional
 * secrets below are not, so this module must never be pulled into a Client
 * Component's import graph.
 */

/**
 * Vercel sets `VERCEL_ENV` on every deployment. Its absence means a developer
 * machine or a bare CI checkout, where demanding a real production origin would
 * block `next build` without protecting anything.
 */
const vercelEnv = process.env.VERCEL_ENV;

const DEVELOPMENT_SITE_URL = 'http://localhost:3000';

/**
 * The site's own origin, in order of authority.
 *
 * `NEXT_PUBLIC_SITE_URL` always wins: it is the only value that survives a
 * change of host, and the only one a client bundle can see.
 *
 * Failing that, a Vercel deployment already knows its own address, and this
 * module used to ignore that:
 *
 *   - On a **production** deployment the origin was demanded outright, so a
 *     build failed even though `VERCEL_PROJECT_PRODUCTION_URL` held exactly the
 *     domain being asked for. That is the failure being fixed.
 *   - On a **preview** deployment nothing was demanded and the localhost
 *     fallback applied, so every canonical, `og:url` and sitemap entry on a
 *     preview build pointed at `http://localhost:3000`. Silent, and worse than
 *     the loud one, because previews are what people click.
 *
 * Both Vercel variables carry a bare host with no scheme, hence the prefix.
 * Neither is `NEXT_PUBLIC_`-prefixed, so both are `undefined` in a client
 * bundle — safe only because this module is server-only, as noted above.
 *
 * Nothing here weakens validation: the resolved value still goes through the
 * schema below, and a deployment that can offer no origin at all still throws.
 */
function resolveSiteUrl() {
  // Referenced literally, not via a dynamic key — Next inlines `NEXT_PUBLIC_*`
  // by matching the source text, so `process.env[name]` would not be replaced.
  const explicit = optional(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicit) return explicit;

  if (vercelEnv === 'production') {
    const productionHost = optional(process.env.VERCEL_PROJECT_PRODUCTION_URL);
    return productionHost ? `https://${productionHost}` : undefined;
  }

  if (vercelEnv) {
    // Preview and development deployments: the per-deployment URL.
    const deploymentHost = optional(process.env.VERCEL_URL);
    return deploymentHost ? `https://${deploymentHost}` : undefined;
  }

  // No `VERCEL_ENV` at all — a developer machine or a bare CI checkout.
  return DEVELOPMENT_SITE_URL;
}

/** Canonicals are compared as exact strings; a trailing slash creates a duplicate. */
function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

/**
 * Treat `FOO=""` as unset. `.env.example` ships empty strings as placeholders,
 * and an empty API key should read as "not configured", not as a valid key.
 */
function optional(value: string | undefined) {
  return value && value.length > 0 ? value : undefined;
}

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string({
      required_error: 'NEXT_PUBLIC_SITE_URL is required in production.',
    })
    .url(
      'NEXT_PUBLIC_SITE_URL must be absolute, e.g. https://ultronfinancial.com',
    )
    .transform(stripTrailingSlash),

  // Email is optional by design: without it the contact form still validates and
  // responds, and delivery is skipped. See src/lib/mailer.ts.
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_TO_EMAIL: z.string().email().optional(),
  CONTACT_FROM_EMAIL: z.string().email().optional(),

  // Supabase Lead Management & Admin Panel Environment Variables
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .optional()
    .default('https://placeholder.supabase.co'),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z
    .string()
    .optional()
    .default('placeholder-anon-key'),
  SUPABASE_SECRET_KEY: z.string().optional().default('placeholder-secret-key'),
  NOTIFICATION_EMAIL: z.string().email().optional(),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: resolveSiteUrl(),
  RESEND_API_KEY: optional(process.env.RESEND_API_KEY),
  CONTACT_TO_EMAIL: optional(process.env.CONTACT_TO_EMAIL),
  CONTACT_FROM_EMAIL: optional(process.env.CONTACT_FROM_EMAIL),
  NEXT_PUBLIC_SUPABASE_URL: optional(process.env.NEXT_PUBLIC_SUPABASE_URL),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: optional(
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  ),
  SUPABASE_SECRET_KEY: optional(
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY,
  ),
  NOTIFICATION_EMAIL: optional(process.env.NOTIFICATION_EMAIL),
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `  • ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');

  /**
   * The context line exists because of how this failure presents. Every route
   * reaches this module (`app/layout.tsx` for `metadataBase`, `lib/seo.ts` for
   * canonicals), so the throw happens during page-data collection in whichever
   * of Next's parallel workers gets there first. The reported route is
   * therefore arbitrary — `/_not-found`, `/robots.txt`, `/sitemap.xml` — and
   * says nothing about the cause. Without naming `VERCEL_ENV` here, the only
   * lead is a route name that sends the reader to the wrong file.
   */
  const context = vercelEnv
    ? `Detected VERCEL_ENV="${vercelEnv}", so no localhost fallback was applied.`
    : 'No VERCEL_ENV set, so this is being treated as a local build.';

  // Thrown, not logged: this has to stop the build.
  throw new Error(
    `Invalid environment configuration.\n${issues}\n\n${context}\n` +
      'Set NEXT_PUBLIC_SITE_URL (see .env.example), or let a Vercel deployment\n' +
      'supply it via VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL.\n\n' +
      'This is thrown from src/lib/env.ts at module load. Any route named in a\n' +
      '"Failed to collect page data" line above is incidental — every route\n' +
      'imports this module.',
  );
}

export const env = parsed.data;

/**
 * Delivery needs all three, so the site should degrade as a unit rather than
 * attempting a send that is guaranteed to fail.
 */
export const isEmailConfigured = Boolean(
  env.RESEND_API_KEY && env.CONTACT_TO_EMAIL && env.CONTACT_FROM_EMAIL,
);
