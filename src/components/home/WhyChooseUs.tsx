import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { WHY_CHOOSE } from '@/content/home';

/**
 * Differentiators, as a definition list.
 *
 * `<dl>` rather than a card grid: each item is a claim and its justification,
 * which is precisely a term/description pair. It also keeps the band visually
 * quieter than the two card grids either side of it — four consecutive card
 * grids is what makes a marketing page read as a template.
 */
export function WhyChooseUs() {
  return (
    <Section spacing="spacious" tone="raised">
      <Container width="wide">
        <Reveal>
          <SectionHeading
            eyebrow={WHY_CHOOSE.eyebrow}
            heading={WHY_CHOOSE.heading}
          />
        </Reveal>

        <dl className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {WHY_CHOOSE.reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={Math.floor(index / 2) * 0.08}>
              <dt className="font-display border-accent border-l-2 pl-5 text-xl font-medium tracking-tight">
                {reason.title}
              </dt>
              <dd className="text-ink-muted mt-3 pl-5 leading-relaxed">
                {reason.body}
              </dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
