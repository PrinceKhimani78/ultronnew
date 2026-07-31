import { ConsultationForm } from '@/components/home/ConsultationForm';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { Eyebrow, HeadingText } from '@/components/ui/SectionHeading';
import { CTA_CONTACT } from '@/content/home';

/**
 * The conversion band. PROJECT.md's primary KPI is consultation bookings, and
 * every page is meant to end in one.
 *
 * The design pairs the proposition on a cream ground with the form on a dark
 * card — the contrast is what makes the form read as the destination rather than
 * as another content block.
 */
export function CtaContact() {
  return (
    <Section id="contact" spacing="default">
      <Container width="wide">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{CTA_CONTACT.eyebrow}</Eyebrow>
            <h2 className="font-display mt-4 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.02em]">
              <HeadingText segments={CTA_CONTACT.heading} />
            </h2>
            <p className="text-ink-muted mt-4 max-w-md leading-relaxed">
              {CTA_CONTACT.body}
            </p>
            <div className="mt-7">
              <Button asChild arrow>
                <a href={CTA_CONTACT.cta.href}>{CTA_CONTACT.cta.label}</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <ConsultationForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
