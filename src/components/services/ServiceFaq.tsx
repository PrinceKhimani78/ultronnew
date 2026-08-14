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
import { Eyebrow } from '@/components/ui/SectionHeading';
import { ServiceHeading } from '@/components/services/ServiceHeading';
import type { Service } from '@/content/services';

type Props = {
  service: Service;
};

export function ServiceFaq({ service }: Props) {
  const faqs = service.faqs;

  const faqHeading = `Frequently Asked Questions`;

  return (
    <Section id="service-faq" spacing="spacious" tone="surface">
      <Container width="wide">
        <Reveal>
          <Eyebrow align="left">FREQUENTLY ASKED QUESTIONS</Eyebrow>
          {/*
           * FAQ section H2 typography:
           *   size:           clamp(30px, 3.75vw, 48px)
           *   weight:         700
           *   line-height:    1.1
           *   letter-spacing: -0.03em
           * */}
          <ServiceHeading
            as="h2"
            text={faqHeading}
            highlightedText={service.highlights?.faqs}
            className="heading-h2 mt-4"
          />
          <p className="text-ink-muted mt-5 max-w-2xl leading-relaxed">
            {`Find answers to common questions about ${service.title}, requirements, timelines, and case management.`}
          </p>
        </Reveal>

        <div className="mt-10 w-full sm:mt-12 lg:mt-14">
          <Accordion type="single" collapsible>
            {faqs.map((item, index) => (
              <Reveal
                key={item.question}
                delay={index * STAGGER_MS}
                amount={0.1}
              >
                <AccordionItem value={`faq-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
      </Container>

      {/* Bottom gradient wash */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-[100px] w-full sm:h-[132px]"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(253, 251, 238, 0) 0%, #DCCB8E 740.91%)',
        }}
        aria-hidden="true"
      />
    </Section>
  );
}
