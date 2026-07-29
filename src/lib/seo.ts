import type { Metadata } from 'next';

import { SITE } from '@/content/site';
import { env } from '@/lib/env';

/**
 * Metadata construction, in one place.
 *
 * Every route calls `buildMetadata` rather than hand-assembling canonical and
 * Open Graph fields, because the failure mode of hand-assembly is a page that
 * looks fine and quietly carries the wrong canonical.
 */

/**
 * Absolute URL against the configured origin. Used for canonicals, OG, JSON-LD
 * and the sitemap.
 *
 * The trailing slash is stripped because Next's metadata resolver strips it
 * from `alternates.canonical` regardless. Leaving it on would make the sitemap
 * advertise `https://site/` while the page itself declares `https://site` as
 * canonical — two spellings of one page, which is exactly the ambiguity a
 * canonical exists to remove.
 */
export function absoluteUrl(path = '/') {
  const url = new URL(path, env.NEXT_PUBLIC_SITE_URL).toString();
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

type BuildMetadataOptions = {
  /**
   * Stated as the page's own outcome — the firm name is appended by the root
   * layout's `title.template`.
   *
   * One exception: `app/page.tsx` shares a route segment with the root layout,
   * and Next does not apply a template to the segment that defines it. The home
   * page therefore passes a title that already carries the firm name.
   */
  title: string;
  description: string;
  /** Root-relative path, e.g. `/services/company-formation`. Drives the canonical. */
  path: string;
  /** Set on routes that must never be indexed — admin, thank-you pages. */
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      title,
      description,
      url: canonical,
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
  };
}
