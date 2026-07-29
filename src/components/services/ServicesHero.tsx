import Image from 'next/image';

import { Container } from '@/components/layout/Container';
import { HeadingText } from '@/components/ui/SectionHeading';
import { SERVICES_PAGE } from '@/content/services-page';

/**
 * The Services page hero banner, matching the Figma prototype frame.
 *
 * Full-width surface band featuring centered uppercase heading ("OUR SERVICES"),
 * supporting body paragraph, and the 3D Ultron monogram graphic on the right.
 */
export function ServicesHero() {
  return (
    <div className="bg-surface text-ink relative overflow-hidden pt-28 pb-12 sm:pt-36 sm:pb-16">
      <Container width="wide" className="relative">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Centered Title & Description */}
          <div className="text-center lg:col-span-8 lg:col-start-3">
            <h1 className="font-display text-ink text-[clamp(2.25rem,5.2vw,4rem)] leading-[1.08] font-bold tracking-[-0.02em] uppercase">
              <HeadingText segments={SERVICES_PAGE.hero.heading} />
            </h1>
            <p className="text-ink-muted mx-auto mt-5 max-w-xl text-sm leading-relaxed font-normal sm:text-base lg:text-lg">
              {SERVICES_PAGE.hero.body}
            </p>
          </div>

          {/* Right 3D Monogram Graphic */}
          <div className="hidden justify-end lg:col-span-2 lg:col-start-11 lg:flex">
            <Image
              src="/brand/services-monogram.png"
              alt=""
              aria-hidden="true"
              width={240}
              height={260}
              priority
              className="pointer-events-none h-auto w-40 object-contain sm:w-48 lg:w-56"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
