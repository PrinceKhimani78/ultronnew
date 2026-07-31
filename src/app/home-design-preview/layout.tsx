import type { ReactNode } from 'react';

import { PreviewFooter } from '@/components/home-design-preview/PreviewFooter';
import { PreviewHeader } from '@/components/home-design-preview/PreviewHeader';

/**
 * Chrome for `/home-design-preview`.
 *
 * The shared `Header` and `Footer` are rendered by the ROOT layout, and a child
 * layout cannot remove its parent's siblings — so swapping the chrome on one
 * route needs a decision about how to suppress the inherited pair.
 *
 * Route groups are the usual answer: move `/` and `/services` into a `(site)`
 * group whose layout owns the chrome, and leave this route outside it. That was
 * rejected for a specific reason — `app/not-found.tsx` sits at the root and is
 * what serves every unmatched URL. Moving the chrome into a group strips the
 * header and footer off the 404 page, and keeping a copy inside the group means
 * two not-found routes that will drift. Restructuring three working routes to
 * restyle one preview is the wrong trade.
 *
 * So the inherited chrome is suppressed with a rule guarded by `:has()`. This
 * is narrow on purpose:
 *
 *   - `body > header` / `body > footer` match ONLY the root layout's own
 *     elements. This layout's header and footer are nested a level deeper
 *     (body > div > header), so they are never caught by their own rule.
 *   - the `:has([data-preview-chrome])` guard means the rule is inert unless
 *     this route is on screen, so even if the stylesheet outlived the route it
 *     could not affect another page.
 *   - it is scoped to this file. No global stylesheet is touched and no design
 *     token is overwritten.
 *
 * `display: none` rather than `visibility` or opacity: it also removes the
 * suppressed header and footer from the accessibility tree, so the page has one
 * banner and one contentinfo landmark rather than two of each.
 */
export default function HomeDesignPreviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div data-preview-chrome="">
      <style>{`
        body:has([data-preview-chrome]) > header,
        body:has([data-preview-chrome]) > footer { display: none !important; }
      `}</style>
      <PreviewHeader />
      {children}
      <PreviewFooter />
    </div>
  );
}
