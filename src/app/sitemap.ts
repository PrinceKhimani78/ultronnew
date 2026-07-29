import type { MetadataRoute } from 'next';

import { STATIC_ROUTES } from '@/content/site';
import { absoluteUrl } from '@/lib/seo';

/**
 * Generated, not a static file, so it cannot drift from the routes that exist.
 *
 * Routes come from `content/site.ts`; adding a page means adding it there once.
 * Database-backed entries (blog posts) join this list in Phase 7.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return STATIC_ROUTES.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: 'monthly',
    priority,
  }));
}
