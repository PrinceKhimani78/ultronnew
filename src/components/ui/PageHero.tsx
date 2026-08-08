import Image from 'next/image';

import { Container } from '@/components/layout/Container';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { HeadingText } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';
import type { HeadingSegment } from '@/types/content';

/** Cream ground matching Home page. */
const CREAM = '#FDFBEE';

export type PageHeroProps = {
  /** Section `id`, e.g. `services-hero`. */
  id: string;
  /** `id` on the `<h1>`, referenced by the section's `aria-labelledby`. */
  headingId: string;
  heading: readonly HeadingSegment[];
  body?: string;
  eyebrow?: string;
  align?: 'left' | 'center';
};

/**
 * Shared secondary-page hero, matching the Figma frame (1280×453).
 */
export function PageHero({
  id,
  headingId,
  heading,
  body,
  eyebrow,
  align = 'center',
}: PageHeroProps) {
  const isLeft = align === 'left';

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
        <div className="relative flex w-full items-center justify-between">
          {/* Hero Heading & Description */}
          <div
            className={cn(
              'relative z-10 w-full max-w-[580px]',
              isLeft ? 'ml-0 text-left' : 'mx-auto text-center',
            )}
          >
            {eyebrow && (
              <Reveal>
                <span className="font-display mb-3 block text-[13px] font-bold tracking-[0.15em] text-[#C9B37E] uppercase">
                  {eyebrow}
                </span>
              </Reveal>
            )}

            <Reveal>
              <h1
                id={headingId}
                className={cn(
                  'font-display text-[36px] leading-[100%] font-extrabold tracking-[-0.02em] text-black uppercase sm:text-[48px] lg:text-[60px]',
                  isLeft ? 'text-left' : 'text-center',
                )}
              >
                <HeadingText
                  segments={heading}
                  accentClassName="text-[#035551]"
                />
              </h1>
            </Reveal>

            {body && (
              <Reveal delay={STAGGER_MS} className="mt-4 sm:mt-5">
                <p
                  className={cn(
                    'max-w-[500px] text-[15px] leading-[170%] font-normal tracking-[-0.017em] sm:text-[16px]',
                    isLeft ? 'ml-0 text-left' : 'mx-auto text-center',
                  )}
                  style={{ color: '#5A5A5A' }}
                >
                  {body}
                </p>
              </Reveal>
            )}
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
