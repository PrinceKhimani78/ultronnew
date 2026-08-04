import { ConsultationForm } from '@/components/home/ConsultationForm';
import { Container } from '@/components/layout/Container';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { ActionButton } from '@/components/ui/ActionButton';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { CTA_CONTACT } from '@/content/home';

/**
 * "Start Your UAE Business Journey", from the comp's 1280×875 frame.
 *
 * PROJECT.md's primary KPI is consultation bookings, and every page is meant to
 * end in one. The comp pairs the proposition on cream with the form on a dark
 * panel — that contrast is what makes the form read as the destination rather
 * than as another content block.
 *
 * The comp's left column is a fixed 394px and its right a fixed 630px, with 62px
 * between them. Those are reproduced as-is at `lg` and stack below it, which is
 * the only layout the export defines.
 */

const CREAM = '#FDFBEE';

export function CtaContact() {
  return (
    <section
      id="contact"
      className="overflow-hidden py-[60px] lg:pt-[122px] lg:pb-[148px]"
      style={{ backgroundColor: CREAM }}
      aria-labelledby="contact-heading"
    >
      <Container width="wide">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-[62px]">
          {/* Proposition first, then the form it argues for. */}
          <Reveal className="lg:w-[394px] lg:shrink-0 lg:pt-[13px]">
            <BandEyebrow>{CTA_CONTACT.eyebrow}</BandEyebrow>
            <h2
              id="contact-heading"
              className="font-display mt-3 text-[clamp(2rem,4.6vw,48px)] leading-[100%] font-semibold tracking-[-0.017em] text-black"
            >
              {CTA_CONTACT.heading.map((segment, index) => (
                <span
                  key={index}
                  className={segment.accent ? 'text-[#035551]' : undefined}
                >
                  {segment.text}
                </span>
              ))}
            </h2>
            <p className="mt-8 text-[16px] leading-[150%] font-normal text-[#5A5A5A] lg:mt-[50px]">
              {CTA_CONTACT.body}
            </p>
            {/* Button last, after the copy it belongs to has landed. */}
            <Reveal
              delay={STAGGER_MS * 2}
              className="mt-8 inline-block lg:mt-[40px]"
            >
              <ActionButton href={CTA_CONTACT.cta.href}>
                {CTA_CONTACT.cta.label}
              </ActionButton>
            </Reveal>
          </Reveal>

          {/*
            The panel arrives as one object; its fields then sequence inside it.
            `amount` is dropped low because the form is the tallest single
            element on the page and, on a laptop viewport, a fifth of it is
            below the fold at the moment the reader would say it had appeared.
          */}
          <Reveal
            delay={STAGGER_MS}
            amount={0.1}
            className="w-full lg:w-[630px] lg:shrink-0"
          >
            <ConsultationForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
