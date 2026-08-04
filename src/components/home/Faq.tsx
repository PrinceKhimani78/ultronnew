import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { STAGGER_MS } from '@/components/motion/config';
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
              {/*
                One question at a time, per the brief. The reveal wraps the item
                rather than replacing it: `AccordionItem` carries the `border-b`
                that draws the rule between questions, and the disclosure
                animation is its own — `Reveal` only reacts to `animationend`
                events fired by the wrapper itself, so an answer opening never
                registers as the row finishing its entrance.
              */}
              {FAQ_ITEMS.map((item, index) => (
                <Reveal
                  key={item.question}
                  delay={index * STAGGER_MS}
                  amount={0.1}
                >
                  <AccordionItem value={item.question}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          </div>
        </div>
      </Container>
    </Section>
  );
}
