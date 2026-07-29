import type { Metadata } from 'next';
import { Funnel_Display } from 'next/font/google';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SITE } from '@/content/site';
import { env } from '@/lib/env';
import './globals.css';

/**
 * Funnel Display drives the entire project typography system.
 */
const display = Funnel_Display({
  variable: '--font-display-family',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const sans = Funnel_Display({
  variable: '--font-sans-family',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  /**
   * Resolves every relative URL in metadata — OG images especially. Without it
   * Next silently falls back to localhost, which is invisible until a share
   * card renders wrong in production.
   */
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    // Page titles state their own outcome; the firm name is appended once, here.
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      /**
       * `globals.css` sets `scroll-behavior: smooth` for in-page anchors. As of
       * Next 16 the router no longer neutralises that during navigation unless
       * this attribute is present, which would leave every route change slowly
       * animating to the top instead of jumping.
       */
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <head>
        {/*
          Scroll-reveal starts elements at `opacity: 0` and an IntersectionObserver
          brings them in. With scripting off that observer never runs, so the
          page would be blank. This restores every revealed element the moment
          the browser knows JavaScript is unavailable.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        {/*
          First thing in the tab order, visible only once focused. A keyboard
          user should not have to walk the entire header to reach the content.
        */}
        <a
          href="#content"
          className="bg-brand text-surface sr-only rounded-b-md px-4 py-3 text-sm font-medium focus-visible:not-sr-only focus-visible:absolute focus-visible:top-0 focus-visible:left-4 focus-visible:z-50"
        >
          Skip to content
        </a>

        {/*
          The chrome lives here, not in each page. It was in `page.tsx` while the
          home page was the only route; a second route would have meant a second
          copy, and two copies of a nav is how they drift.

          Every route in the app is currently public marketing, so the root
          layout is the right home for it. An admin area (Phase 8) gets its own
          route group and its own chrome rather than opting out of this one.
        */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
