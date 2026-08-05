import Image from 'next/image';

import { Container } from '@/components/layout/Container';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { HeadingText } from '@/components/ui/SectionHeading';
import type { HeadingSegment } from '@/types/content';

/** Cream ground matching Home page. */
const CREAM = '#FDFBEE';

export type PageHeroProps = {
  /** Section `id`, e.g. `services-hero`. */
  id: string;
  /** `id` on the `<h1>`, referenced by the section's `aria-labelledby`. */
  headingId: string;
  heading: readonly HeadingSegment[];
  body: string;
};

/**
 * Shared secondary-page hero, matching the Figma frame (1280×453).
 *
 * Originally `ServicesHero`. The About page needed this exact hero — same
 * height, background, typography, monogram and motion — with only the
 * heading and body text differing, and the brief that added About was
 * explicit that copying the markup a second time was not an option. Both
 * `ServicesHero` and `AboutHero` are now thin wrappers that supply their own
 * copy to this component, so a future change to the shared geometry has one
 * place to land rather than two that can drift apart.
 *
 * Features:
 * - 60px desktop title (weight 800, leading 100%, tracking -0.02em) with the
 *   accent segment in brand green (#035551)
 * - 16px description (weight 400, leading 170%, tracking -0.017em, #5A5A5A)
 * - Translucent 3D UF monogram icon on the right side
 * - Exact navbar clearance and 453px height balance matching Figma
 */
export function PageHero({ id, headingId, heading, body }: PageHeroProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden"
      style={{ backgroundColor: CREAM }}
      aria-labelledby={headingId}
    >
      <Container
        width="wide"
        className="relative flex flex-col justify-center pt-[210px] pb-10 sm:pt-[230px] sm:pb-12 lg:pt-[250px] lg:pb-14"
      >
        <div className="relative flex w-full items-center justify-center">
          {/* Centered Hero Heading & Description */}
          <div className="relative z-10 mx-auto w-full max-w-[580px] text-center">
            {/* Heading, body, monogram — the same 100ms sequence the home
                hero uses, so every landing page opens the same way. */}
            <Reveal>
              <h1
                id={headingId}
                className="font-display text-center text-[36px] leading-[100%] font-extrabold tracking-[-0.02em] text-black uppercase sm:text-[48px] lg:text-[60px]"
              >
                <HeadingText
                  segments={heading}
                  accentClassName="text-[#035551]"
                />
              </h1>
            </Reveal>

            <Reveal delay={STAGGER_MS} className="mt-4 sm:mt-5">
              <p
                className="mx-auto max-w-[500px] text-center text-[15px] leading-[170%] font-normal tracking-[-0.017em] sm:text-[16px]"
                style={{ color: '#5A5A5A' }}
              >
                {body}
              </p>
            </Reveal>
          </div>

          {/* Translucent 3D UF Logo / Monogram on the Right */}
          <div className="pointer-events-none absolute top-1/2 right-0 hidden -translate-y-1/2 select-none md:block lg:right-2 xl:right-6">
            <Reveal delay={STAGGER_MS * 2}>
              <Image
                src="/brand/services-monogram.png"
                alt=""
                aria-hidden="true"
                width={320}
                height={320}
                priority
                className="h-auto w-[190px] object-contain opacity-90 sm:w-[230px] lg:w-[270px] xl:w-[300px]"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
