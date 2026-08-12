'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

const HeroUFParticleLogoClient = dynamic(
  () => import('./HeroUFParticleLogo').then((mod) => mod.HeroUFParticleLogo),
  {
    ssr: false,
    loading: () => (
      <Image
        src="/brand/logo-icon-green.webp"
        alt=""
        aria-hidden="true"
        width={441}
        height={473}
        priority
        sizes="(min-width: 1024px) 700px, 80vw"
        className="h-auto w-full opacity-25 pointer-events-none transition-opacity duration-700"
      />
    ),
  },
);

export function HeroUFParticleLogoWrapper() {
  return <HeroUFParticleLogoClient />;
}
