import type { Metadata } from 'next';
import { Funnel_Display } from 'next/font/google';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { FloatingWhatsAppButton } from '@/components/ui/FloatingWhatsAppButton';
import { UltronLoader } from '@/components/ui/UltronLoader';
import { SITE } from '@/content/site';
import { getSiteSettings } from '@/lib/cms-data';
import { env } from '@/lib/env';
import './globals.css';

/**
 * Funnel Display is the official Ultron Financial brand typeface.
 * It is loaded via next/font/google with supported weights: 400, 500, 600, 700.
 */
const funnelDisplay = Funnel_Display({
  variable: '--font-funnel-display',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
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
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/brand/logo-icon-green.webp', type: 'image/webp' },
    ],
    shortcut: ['/icon.png'],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' },
      { url: '/brand/logo-icon-green.webp', type: 'image/webp' },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
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
      className={`${funnelDisplay.variable} h-full antialiased`}
    >
      <head>
        {/*
          Scroll reveals start hidden: `globals.css` sets `opacity: 0` on every
          `[data-reveal]` that has not finished animating, and the only thing
          that ever clears it is an IntersectionObserver callback. With scripting
          off nothing clears it and the page reads as blank — to a visitor, and
          to any crawler that renders without executing JS.

          So the hidden state is retracted the moment the browser tells us
          JavaScript is unavailable. `transform` and `animation` are in the list
          too: without them a `[data-revealed]` rule elsewhere could still leave
          an element displaced or mid-keyframe.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <UltronLoader />
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
        <Header settings={settings} />
        {children}
        <Footer settings={settings} />
        <FloatingWhatsAppButton settings={settings} />
      </body>
    </html>
  );
}
