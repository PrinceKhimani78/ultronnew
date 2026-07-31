import { DesignContact } from '@/components/home-design-preview/DesignContact';
import { DesignCoreServices } from '@/components/home-design-preview/DesignCoreServices';
import { DesignHero } from '@/components/home-design-preview/DesignHero';
import { DesignHowItWorks } from '@/components/home-design-preview/DesignHowItWorks';
import { DesignWhoWeHelp } from '@/components/home-design-preview/DesignWhoWeHelp';
import { buildMetadata } from '@/lib/seo';

/**
 * `/home-design-preview` — the Claude Design comp `Ulttron-Home.dc.html`, built
 * as a page so it can be compared side by side with the live home page.
 *
 * This route is a reference, not a candidate for publication:
 *
 *   - It carries the comp's own copy, including two lorem ipsum blocks and the
 *     pre-approval statistics ("100+", "30+"), rather than the client-approved
 *     copy in `src/content/`. Reconciling them would erase the differences the
 *     page exists to show.
 *   - It is `noIndex`. A second, near-duplicate home page is exactly the
 *     ambiguity a canonical exists to prevent, and there is no version of this
 *     page that should compete with `/` in an index.
 *
 * Nothing here is imported by another route, and no shared component was
 * modified to accommodate it. The header and footer come from the root layout
 * unchanged — they already implement this comp's nav pill and footer, having
 * been built from the same Figma.
 */
export const metadata = buildMetadata({
  title: 'Home design preview',
  description:
    'Internal reference build of the Claude Design home page comp, for visual comparison against the live home page.',
  path: '/home-design-preview',
  noIndex: true,
});

export default function HomeDesignPreviewPage() {
  return (
    <main id="content">
      <DesignHero />
      <DesignWhoWeHelp />
      <DesignCoreServices />
      <DesignHowItWorks />
      <DesignContact />
    </main>
  );
}
