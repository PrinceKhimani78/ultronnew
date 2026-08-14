import Image from 'next/image';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ABOUT_PAGE } from '@/content/about-page';
import { cn } from '@/lib/utils';

/**
 * "Our Vision / Our Mission / Our Story", from the one section of the About
 * frame that was available to build against (see `content/about-page.ts`).
 *
 * One continuous white band holding three compact, vertically-centred rows.
 * Vision and Story sit on plain white — the section's own `raised` tone —
 * plus the shared, very low-opacity radial glow behind the whole band. Only
 * Mission carries its own background: the comp's exact vertical gradient for
 * that row (`linear-gradient(180deg, #FFFFFF 0%, #FDFBEE 50.06%, #FFFFFF
 * 100%)`, read off Frame 64), full-bleed edge to edge rather than confined
 * to the page's content measure, since that is how the comp draws it.
 *
 * Each row is a two-column grid, both columns equal width. The monogram
 * alternates sides via `order` rather than `flex-row-reverse`, so the DOM
 * order stays heading-then-monogram for every row — on mobile that always
 * puts the text above the mark, reversed row or not.
 *
 * The monogram reuses `services-monogram.png`, the same translucent 3D "UF"
 * mark the Services hero already renders — the brief asks for existing
 * assets to be reused wherever the design repeats an image the project
 * already has, rather than exporting a duplicate.
 */
export function AboutFoundation() {
  return (
    <Section
      spacing="tight"
      tone="raised"
      aria-label="Our foundation"
      className="overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_50%,rgba(253,251,238,0.55)_0%,rgba(253,251,238,0)_70%)]"
      />

      <Container width="wide" className="relative">
        <div className="flex flex-col gap-10 sm:gap-12 lg:gap-14">
          {ABOUT_PAGE.foundation.rows.map((row, index) => {
            const reversed = index % 2 === 1;

            return (
              <div key={row.id} className="relative">
                {reversed ? (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-[linear-gradient(180deg,#FFFFFF_0%,#FDFBEE_50.06%,#FFFFFF_100%)]"
                  />
                ) : null}

                <Reveal
                  delay={index === 0 ? 0 : STAGGER_MS}
                  className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
                >
                  <SectionHeading
                    eyebrow={row.eyebrow}
                    heading={row.heading}
                    body={row.body}
                    as="h3"
                    eyebrowClassName="text-accent-deep"
                    accentClassName="text-brand"
                    className={cn('order-1', reversed && 'lg:order-2')}
                  />

                  <div
                    className={cn(
                      'order-2 flex w-full justify-center',
                      reversed && 'lg:order-1',
                    )}
                  >
                    <Image
                      src={row.image || '/brand/services-monogram.png'}
                      alt={row.image ? row.eyebrow : ''}
                      aria-hidden={row.image ? undefined : true}
                      width={row.image ? 540 : 240}
                      height={row.image ? 400 : 258}
                      className={cn(
                        'h-auto object-contain',
                        row.image
                          ? 'shadow-lift aspect-[4/3] w-full max-w-[440px] rounded-2xl object-cover grayscale transition-[filter] duration-300 hover:grayscale-0'
                          : 'w-[150px] opacity-80 sm:w-[190px] lg:w-[240px]',
                      )}
                    />
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
