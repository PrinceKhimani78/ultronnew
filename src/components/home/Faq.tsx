import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FAQ_INTRO, FAQ_ITEMS } from '@/content/faq';

/**
 * The FAQ band.
 *
 * `type="multiple"` rather than `"single"`: a visitor comparing two answers
 * should not have the first collapse when they open the second. Nothing here is
 * open by default — every answer is server-rendered inside the DOM regardless of
 * disclosure state, so crawlers and AI engines read the full text without
 * executing anything.
 *
 * The matching `FAQPage` JSON-LD is emitted by the page, not here, so that all
 * structured data for the route is assembled in one place.
 */
export function Faq() {
  return (
    <Section id="faq" spacing="spacious" tone="raised">
      <Container width="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                eyebrow={FAQ_INTRO.eyebrow}
                heading={FAQ_INTRO.heading}
                body={FAQ_INTRO.body}
              />
            </div>
          </Reveal>

          <div className="lg:col-span-8">
            <Accordion type="multiple">
              {FAQ_ITEMS.map((item) => (
                <AccordionItem key={item.question} value={item.question}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </Section>
  );
}
