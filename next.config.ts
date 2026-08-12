import type { NextConfig } from 'next';

/**
 * Security headers applied to every response.
 *
 * CSP is deliberately absent here: a static policy strict enough to be worth
 * having would need `unsafe-inline` for Next's bootstrap scripts, which defeats
 * the point. It belongs in middleware with a per-request nonce — tracked in
 * PROJECT.md under Security Checklist.
 */
const securityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Stops the browser second-guessing our Content-Type and executing an upload.
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Never advertise the framework version.
  poweredByHeader: false,

  /**
   * Pin the workspace root. Without this, Turbopack walks up looking for a
   * lockfile and can settle on an unrelated one outside the project, tracing
   * files from the wrong directory.
   */
  turbopack: {
    root: import.meta.dirname,
  },

  images: {
    // AVIF first — roughly 20% smaller than WebP at equal quality.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    /**
     * One day, not one year. `/_next/image` caches against the *source path*,
     * not a content hash — replacing `/brand/logo.svg` in place reuses the URL
     * and would otherwise serve stale bytes long after the swap. Static assets
     * under `/_next/static` are hashed and immutable regardless of this value.
     */
    minimumCacheTTL: 86_400,
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },

  async redirects() {
    return [
      {
        source: '/services/financial-advisory',
        destination: '/services/trade-finance',
        permanent: true,
      },
      {
        source: '/services/tax-structuring-advisory',
        destination: '/services/compliance-regulatory-advisory',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
