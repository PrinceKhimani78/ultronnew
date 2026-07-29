import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { Card } from '@/components/ui/Card';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { COMPLEX_CASES } from '@/content/home';

/**
 * The differentiator, on an inverted band.
 *
 * The tone change is doing structural work rather than decorative: this is the
 * one band that argues the firm is different in kind from a volume operator, and
 * it should read as a break in the page rather than another card grid.
 */
export function ComplexCases() {
  return (
    <Section spacing="spacious" tone="brand" className="overflow-hidden">
      <div
        aria-hidden
        className="bg-dots absolute inset-0 -z-10 opacity-[0.06]"
      />

      <Container width="wide">
        <Reveal>
          <SectionHeading
            eyebrow={COMPLEX_CASES.eyebrow}
            heading={COMPLEX_CASES.heading}
            body={COMPLEX_CASES.body}
            inverted
          />
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {COMPLEX_CASES.cases.map((item, index) => (
            <Reveal
              as="li"
              key={item.title}
              delay={Math.floor(index / 2) * 0.08}
              className="h-full"
            >
              <Card variant="inverted" className="h-full">
                <h3 className="font-display text-surface text-xl font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="text-surface/75 mt-3 leading-relaxed">
                  {item.body}
                </p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
