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
 * block `next build` without protecting anything. On a production deployment
 * there is no fallback — a missing origin is a hard failure.
 */
const isProductionDeployment = process.env.VERCEL_ENV === 'production';

const DEVELOPMENT_SITE_URL = 'http://localhost:3000';

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
});

const parsed = envSchema.safeParse({
  // Referenced literally, not via a dynamic key — Next inlines `NEXT_PUBLIC_*`
  // by matching the source text.
  NEXT_PUBLIC_SITE_URL:
    optional(process.env.NEXT_PUBLIC_SITE_URL) ??
    (isProductionDeployment ? undefined : DEVELOPMENT_SITE_URL),
  RESEND_API_KEY: optional(process.env.RESEND_API_KEY),
  CONTACT_TO_EMAIL: optional(process.env.CONTACT_TO_EMAIL),
  CONTACT_FROM_EMAIL: optional(process.env.CONTACT_FROM_EMAIL),
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map((issue) => `  • ${issue.path.join('.')}: ${issue.message}`)
    .join('\n');

  // Thrown, not logged: this has to stop the build.
  throw new Error(
    `Invalid environment configuration.\n${issues}\n\nSee .env.example for the full list.`,
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
