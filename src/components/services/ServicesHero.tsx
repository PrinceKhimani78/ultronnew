import Image from 'next/image';

import { Container } from '@/components/layout/Container';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { HeadingText } from '@/components/ui/SectionHeading';
import { SERVICES_PAGE } from '@/content/services-page';

/** Cream ground matching Home page. */
const CREAM = '#FDFBEE';

/**
 * The Services page hero section, matching the Figma frame (1280×453).
 *
 * Features:
 * - 60px desktop title (weight 800, leading 100%, tracking -0.02em) with "SERVICES" highlighted in brand green (#035551)
 * - 16px description (weight 400, leading 170%, tracking -0.017em, #5A5A5A)
 * - Translucent 3D UF monogram icon on the right side
 * - Exact navbar clearance and 453px height balance matching Figma
 */
export function ServicesHero() {
  return (
    <section
      id="services-hero"
      className="relative overflow-hidden"
      style={{ backgroundColor: CREAM }}
      aria-labelledby="services-hero-heading"
    >
      <Container
        width="wide"
        className="relative flex min-h-[380px] flex-col justify-center pt-[124px] pb-10 sm:min-h-[420px] sm:pt-[140px] sm:pb-12 lg:min-h-[453px] lg:pt-[152px] lg:pb-14"
      >
        {/* No second measure here — the `Container` above is already the page
            measure. A nested `mx-auto max-w-*` is inert today only because it
            happens to be wider than the shell's content box. */}
        <div className="relative flex w-full items-center justify-center">
          {/* Centered Hero Heading & Description */}
          <div className="relative z-10 mx-auto w-full max-w-[620px] text-end">
            {/* Heading, body, monogram — the same 100ms sequence the home
                hero uses, so the two landing pages open the same way. */}
            <Reveal>
              <h1
                id="services-hero-heading"
                className="font-display text-center text-[36px] leading-[100%] font-extrabold tracking-[-0.02em] text-black uppercase sm:text-[48px] lg:text-[60px]"
              >
                <HeadingText
                  segments={SERVICES_PAGE.hero.heading}
                  accentClassName="text-[#035551]"
                />
              </h1>
            </Reveal>

            <Reveal delay={STAGGER_MS} className="mt-3.5 sm:mt-4">
              <p
                className="mx-auto max-w-[420px] text-center text-[15px] leading-[170%] font-normal tracking-[-0.017em] sm:text-[16px]"
                style={{ color: '#5A5A5A' }}
              >
                {SERVICES_PAGE.hero.body}
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
                className="h-auto w-[180px] object-contain opacity-85 sm:w-[220px] lg:w-[260px] xl:w-[290px]"
              />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
