'use client';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/motion/Reveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { HeadingText } from '@/components/ui/SectionHeading';
import { BANKING_FAQS, type FaqItem } from '@/content/business-banking';

export function BankingFaq() {
  return (
    <Section
      id="faq"
      spacing="default"
      tone="surface"
      className="bg-[#FDFBEE] py-16 sm:py-20 lg:py-24"
    >
      <Container width="wide">
        <div className="mx-auto max-w-4xl">
          {/* Header Block (Single Column) */}
          <Reveal className="text-center">
            <BandEyebrow
              className="justify-center text-[#DCCB8E]"
              style={{ color: '#DCCB8E' }}
            >
              BUSINESS BANKING QUESTIONS
            </BandEyebrow>

            <h2 className="heading-h2 mt-3 text-black">
              <HeadingText
                segments={[
                  { text: 'Frequently Asked ' },
                  { text: 'Questions', accent: true },
                ]}
                accentClassName="text-[#035551]"
              />
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-[150%] font-normal text-[#5A5A5A]">
              Clear answers regarding UAE business banking requirements,
              timelines, documents, and account qualification.
            </p>
          </Reveal>

          {/* Accordion Single Column Container */}
          <Reveal className="mt-12">
            <div className="rounded-[24px] border border-[#035551]/10 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] sm:p-8 sm:px-10">
              <Accordion type="single" collapsible className="w-full">
                {BANKING_FAQS.map((faq: FaqItem, index: number) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-[17px] font-bold text-[#023F3D] hover:text-[#035551] sm:text-[18px]">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[15px] leading-[160%] text-[#404040] sm:text-[16px]">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
