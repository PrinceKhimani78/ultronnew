import { CoreServices } from '@/components/home/CoreServices';
import { CtaContact } from '@/components/home/CtaContact';
import { Hero } from '@/components/home/Hero';
import { HowUltronWorks } from '@/components/home/HowUltronWorks';
import { WhoWeHelp } from '@/components/home/WhoWeHelp';
import { JsonLd } from '@/components/seo/JsonLd';
import { HOME_HERO } from '@/content/home';
import { getSiteSettings } from '@/lib/cms-data';
import { homePageGraph } from '@/lib/json-ld';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: HOME_HERO.metaTitle,
  description: HOME_HERO.metaDescription,
  path: '/',
});

export default async function Home() {
  const settings = await getSiteSettings();
  return (
    <>
      <JsonLd schema={homePageGraph()} />

      {/* Header and Footer are supplied by the root layout. */}
      <main id="content" className="flex-1">
        <Hero settings={settings} />
        <WhoWeHelp />
        <CoreServices />
        <HowUltronWorks />
        <CtaContact />
      </main>
    </>
  );
}
