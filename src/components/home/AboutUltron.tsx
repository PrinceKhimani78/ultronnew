import { Check } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ABOUT } from '@/content/home';

/**
 * Positioning band. Two columns on desktop so the claim and the evidence sit
 * side by side rather than the reader having to hold one while scrolling to the
 * other.
 */
export function AboutUltron() {
  return (
    <Section id="about" spacing="spacious">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <SectionHeading
              eyebrow={ABOUT.eyebrow}
              heading={ABOUT.heading}
              className="[&>h2]:text-balance"
            />
          </Reveal>

          <Reveal delay={STAGGER_MS} className="lg:col-span-6">
            <div className="space-y-6">
              {ABOUT.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-ink-muted text-lg leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <ul className="mt-10 space-y-4">
              {ABOUT.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check
                    aria-hidden="true"
                    className="text-brand mt-1 h-5 w-5 shrink-0"
                  />
                  <span className="text-ink">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
