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
import type { Service } from '@/content/services';

type Props = {
  service: Service;
};

export function ServiceFaq({ service }: Props) {
  const faqs = service.faqs;

  return (
    <Section id="service-faq" spacing="spacious" tone="surface">
      <Container width="wide">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="FREQUENTLY ASKED QUESTIONS"
            heading={[
              { text: 'Frequently Asked ' },
              { text: 'Questions', accent: true },
            ]}
            body={`Find answers to common questions about ${service.title}, requirements, timelines, and case management.`}
          />
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
      {/* Bottom gradient wash matching home page hero section */}
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
