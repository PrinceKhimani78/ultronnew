import { CoreServices } from '@/components/home/CoreServices';
import { CtaContact } from '@/components/home/CtaContact';
import { Hero } from '@/components/home/Hero';
import { HowUltronWorks } from '@/components/home/HowUltronWorks';
import { WhoWeHelp } from '@/components/home/WhoWeHelp';
import { JsonLd } from '@/components/seo/JsonLd';
import { HOME_HERO } from '@/content/home';
import { homePageGraph } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: HOME_HERO.metaTitle,
  description: HOME_HERO.metaDescription,
  path: '/',
});

/**
 * Home.
 *
 * A Server Component composing the five core bands matching the Figma prototype:
 * 1. Hero (proposition, inline statistics, 3D monogram brand panel)
 * 2. WhoWeHelp (audience qualification grid)
 * 3. CoreServices (tabbed service catalogue)
 * 4. HowUltronWorks (dark timeline process)
 * 5. CtaContact (proposition + consultation form)
 */
export default function Home() {
  return (
    <>
      <JsonLd schema={homePageGraph()} />

      {/* Header and Footer are supplied by the root layout. */}
      <main id="content" className="flex-1">
        <Hero />
        <WhoWeHelp />
        <CoreServices />
        <HowUltronWorks />
        <CtaContact />
      </main>
    </>
  );
}
