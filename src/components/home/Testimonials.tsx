import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import { Card } from '@/components/ui/Card';
import { TESTIMONIALS, TESTIMONIALS_INTRO } from '@/content/testimonials';

/**
 * Client quotes.
 *
 * Renders **nothing** while `TESTIMONIALS` is empty, which it currently is — the
 * invented quotes were deleted rather than left behind a warning comment,
 * because placeholder testimonials read as finished copy and are the single most
 * likely thing to reach production unnoticed. The band reappears the moment real
 * quotes are added to `content/testimonials.ts`.
 *
 * `<figure>` + `<blockquote>` + `<figcaption>` is the correct pairing: the
 * caption is the attribution *of* the quote, which `<cite>` alone does not
 * express.
 *
 * ⚠️ No `Review` or `AggregateRating` JSON-LD is emitted here, and none may be
 * added until the quotes are real and permissioned. See the full rule in
 * `content/testimonials.ts`.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <Section spacing="spacious">
      <Container width="wide">
        <Reveal className="text-center">
          <h2 className="font-display text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.02em]">
            {TESTIMONIALS_INTRO.heading}
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <Reveal
              as="li"
              key={testimonial.attribution}
              delay={index * 0.06}
              className="h-full"
            >
              <Card variant="raised" className="h-full">
                <figure className="flex h-full flex-col">
                  <blockquote className="text-ink flex-1 leading-relaxed">
                    {testimonial.quote}
                  </blockquote>
                  <figcaption className="border-line text-ink-muted mt-6 border-t pt-5 text-sm">
                    {testimonial.attribution}
                    <span aria-hidden="true"> · </span>
                    <span className="sr-only">, </span>
                    {testimonial.location}
                  </figcaption>
                </figure>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
