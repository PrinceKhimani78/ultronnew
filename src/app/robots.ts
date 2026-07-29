import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/seo';

/**
 * Crawler policy.
 *
 * The AI agents are listed explicitly rather than left to the wildcard. Several
 * of them treat an unnamed wildcard conservatively, and being absent from a
 * generated answer is the same as not existing — PROJECT.md ranks that as the
 * third business goal.
 */
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
];

/** Never indexable. Admin arrives in Phase 8; the rule can precede the route. */
const DISALLOWED = ['/admin', '/api'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOWED },
      { userAgent: AI_CRAWLERS, allow: '/', disallow: DISALLOWED },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  };
}
