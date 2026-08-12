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

type Props = {
  serviceName?: string;
};

export function ServiceFaq({ serviceName }: Props) {
  const faqs = [
    {
      question: `How long does the ${serviceName || 'service'} process typically take?`,
      answer:
        'Timelines vary based on jurisdiction and activity type. Initial feasibility reviews are completed within 24–48 hours, while full execution is managed end-to-end to prevent unnecessary delays.',
    },
    {
      question: 'Can you assist if my application or profile was previously declined elsewhere?',
      answer:
        'Yes. We specialize in complex and previously declined cases. We conduct a detailed root-cause analysis before resubmitting to ensure all compliance and risk concerns are addressed.',
    },
    {
      question: 'What documentation is required to initiate the service?',
      answer:
        'Standard requirements include valid passport copies, proof of address, CV/profile summaries, and relevant business records. Our team helps you compile and structure your supporting evidence.',
    },
    {
      question: 'Do you provide ongoing support after completion?',
      answer:
        'Absolutely. We maintain ongoing relationships with our clients for compliance reviews, bank account maintenance, corporate tax structuring, and business expansion in the UAE.',
    },
  ] as const;

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
            body={`Find answers to common questions about ${serviceName || 'our services'}, requirements, timelines, and case management.`}
          />
        </Reveal>

        <div className="mt-10 sm:mt-12 lg:mt-14 w-full">
          <Accordion type="multiple">
            {faqs.map((item, index) => (
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
      </Container>
    </Section>
  );
}
