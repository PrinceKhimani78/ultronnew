import { DesignContact } from '@/components/home-design-preview/DesignContact';
import { DesignHero } from '@/components/home-design-preview/DesignHero';
import { DesignWhoWeHelp } from '@/components/home-design-preview/DesignWhoWeHelp';
import { CoreServices } from '@/components/home/CoreServices';
import { HowUltronWorks } from '@/components/home/HowUltronWorks';
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
 *
 * ⚠️ ONE EXCEPTION to the "comp's own copy" rule above: the process band renders
 * the live `HowUltronWorks`, not a preview twin. That is deliberate — the two
 * were required to be indistinguishable, and the only way to guarantee that
 * over time is to render the same component rather than a copy that drifts.
 *
 * It follows that this band alone carries the approved `content/process` copy
 * and the site's `Container` measure rather than the comp's lorem and
 * `DesignContainer`. The four illustrations are unaffected: the preview's
 * `process-1…4.webp` are byte-identical to `/brand/process-*.webp`, in the same
 * order, so the artwork on screen does not change.
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
      <CoreServices />
      <HowUltronWorks />
      <DesignContact />
    </main>
  );
}
