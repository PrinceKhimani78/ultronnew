import Image from 'next/image';

import { ServiceTabs } from '@/components/home/ServiceTabs';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { ActionButton } from '@/components/ui/ActionButton';
import { SERVICES_INTRO } from '@/content/home';

/**
 * "Our Core Services", built to the comp's 1280×792 "Frame 5".
 *
 * ── The 792px, and how it is held ────────────────────────────────────────────
 *
 * The frame's vertical budget, transcribed from it:
 *
 *   54   padding-top
 *   83   eyebrow (17) + gap (17) + heading (49)
 *   63   gap
 *  454   tab list beside the content card
 *   49   gap
 *   43   VIEW MORE button
 *   46   padding-bottom
 *  ────
 *  792
 *
 * Only six of those seven are hard-coded. The tab/card row is `flex-1`, so it
 * absorbs whatever the head block actually measures rather than being pinned to
 * 454 — at the comp's own type it resolves to 454, and if the heading ever wraps
 * to a second line the row gives up the space instead of the section growing
 * past 792. That is what makes the height exact rather than approximately
 * right, and it is why `h-full` on the section's flex column matters.
 *
 * `lg:py-0` overrides `Section`'s own `lg:py-18`. It can, because `Section`
 * composes with `cn` (clsx + tailwind-merge) and `className` is passed last, so
 * tailwind-merge drops the earlier padding rather than emitting both.
 *
 * ── Below `lg` ───────────────────────────────────────────────────────────────
 *
 * No fixed height at all. The comp defines one layout, at 1280; a phone stacks
 * the accordion and the section is as tall as its content. Pinning 792 there
 * would clip.
 *
 * ── ⚠️ One service does not fit the frame ────────────────────────────────────
 *
 * The comp draws this frame with Financial Advisory selected, and that
 * service's copy fits the 454px card with roughly 20px to spare. Business
 * Banking does not: its description is 199 characters against 134, and its
 * longest benefit is 105 against 59, which together run it about 20px past the
 * card. The card scrolls rather than clips (see `ServiceTabs`), so nothing is
 * lost, but the honest fix is editorial — trim that service's description by a
 * line and shorten its longest benefit. Growing the section past 792 to fit one
 * tab would break the frame this file exists to reproduce.
 */

export function CoreServices() {
  return (
    <Section
      id="services"
      spacing="default"
      tone="raised"
      className="relative overflow-hidden lg:py-16"
    >
      {/* Bottom-left translucent monogram logo watermark */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 opacity-45">
        <Image
          src="/brand/services-monogram.png"
          alt=""
          aria-hidden="true"
          width={240}
          height={240}
          className="h-auto w-36 object-contain sm:w-48 lg:w-56"
        />
      </div>

      <Container width="wide" className="relative z-10 flex flex-col">
        <Reveal className="text-center">
          <p
            className="font-display flex items-center justify-center gap-2.5 text-[16px] leading-none font-normal tracking-[0.08em] uppercase"
            style={{ color: '#C9B37E' }}
          >
            <span aria-hidden="true">----</span>
            <span>{SERVICES_INTRO.eyebrow}</span>
          </p>
          {/* 48px flat at `lg` — the comp's size — rather than the clamp's
              52px ceiling. The clamp still governs every smaller viewport. */}
          <h2 className="font-display mt-3.5 text-[32px] leading-[100%] font-semibold tracking-[-0.02em] text-[#121a18] sm:text-[40px] lg:text-[48px]">
            Our Core <span className="text-[#035551]">Services</span>
          </h2>
        </Reveal>

        {/* Heading, then the tab panel, then the CTA — the section's three
            beats, matching every other band on the site. */}
        <Reveal delay={STAGGER_MS} amount={0.1} className="mt-10 lg:mt-12">
          <ServiceTabs />
        </Reveal>

        <Reveal
          delay={STAGGER_MS * 2}
          className="mt-10 flex shrink-0 justify-center lg:mt-12"
        >
          <ActionButton href={SERVICES_INTRO.cta.href}>
            {SERVICES_INTRO.cta.label}
          </ActionButton>
        </Reveal>
      </Container>
    </Section>
  );
}
