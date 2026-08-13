'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

import { ActionButton } from '@/components/ui/ActionButton';
import { Eyebrow } from '@/components/ui/SectionHeading';
import type { Service } from '@/content/services';

const EASE_HOUSE = [0.22, 1, 0.36, 1] as const;

const PROCESS_HIGHLIGHTS: Record<string, string> = {
  'business-banking': 'Approved',
  'business-setup': 'Setup',
  'business-finance': 'Financing',
  'real-estate-mortgages': 'Mortgage',
  'trade-finance': 'Facilities',
  'compliance-regulatory-advisory': 'Compliance',
};

function renderHighlightedText(text: string, highlightPhrase?: string) {
  if (!text) return null;

  if (text.includes('*')) {
    const parts = text.split('*');
    return (
      <>
        {parts.map((part, i) =>
          i % 2 === 1 ? (
            <span key={i} className="text-[#035551]">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </>
    );
  }

  if (
    highlightPhrase &&
    text.toLowerCase().includes(highlightPhrase.toLowerCase())
  ) {
    const regex = new RegExp(`(${highlightPhrase})`, 'gi');
    const parts = text.split(regex);
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === highlightPhrase.toLowerCase() ? (
            <span key={i} className="text-[#035551]">
              {part}
            </span>
          ) : (
            part
          ),
        )}
      </>
    );
  }

  return text;
}

export function ServiceProcessStructure({ service }: { service: Service }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-white py-14 text-[#121a18] sm:py-18 lg:py-24">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6 lg:px-8">
        {/* Section Intro */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, ease: EASE_HOUSE }}
          className="mb-16 max-w-3xl text-left lg:mb-20"
        >
          <Eyebrow align="left">OUR PROCESS</Eyebrow>
          <h2 className="font-display mt-3.5 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.02em] text-[#121a18]">
            {renderHighlightedText(
              service.process.headline,
              PROCESS_HIGHLIGHTS[service.slug],
            )}
          </h2>
          <p className="mt-4 max-w-[680px] text-base leading-relaxed font-medium text-[#4b5563] sm:text-lg">
            {service.process.subtext}
          </p>
        </motion.div>

        {/* 4 Open-Sided Capsule Cards */}
        <div className="space-y-12 sm:space-y-14 lg:space-y-16">
          {service.process.steps.map((step, index) => {
            const isImageLeft = index % 2 === 0;
            const gradientDesktop = isImageLeft
              ? 'linear-gradient(90deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)'
              : 'linear-gradient(270deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)';

            return (
              <motion.div
                key={step.step}
                initial={
                  shouldReduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 25,
                      }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: EASE_HOUSE }}
                className={`relative mx-auto flex min-h-0 w-full max-w-[1140px] items-center overflow-hidden border-none shadow-none lg:min-h-[285px] ${
                  isImageLeft
                    ? 'rounded-[28px] sm:rounded-l-[60px] sm:rounded-r-none lg:rounded-l-[999px] lg:rounded-r-none'
                    : 'rounded-[28px] sm:rounded-l-none sm:rounded-r-[60px] lg:rounded-l-none lg:rounded-r-[999px]'
                }`}
                style={{
                  background: gradientDesktop,
                }}
              >
                <div
                  className={`flex w-full flex-col items-center justify-between gap-7 p-6 sm:gap-8 sm:p-7 lg:flex-row lg:gap-[90px] lg:py-6 xl:gap-[110px] ${
                    isImageLeft
                      ? 'lg:pr-10 lg:pl-8 xl:pr-14 xl:pl-10'
                      : 'lg:pr-8 lg:pl-10 xl:pr-10 xl:pl-14'
                  }`}
                >
                  {/* Image Column */}
                  <div
                    className={`order-1 flex shrink-0 justify-center ${
                      isImageLeft ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="relative aspect-square h-[210px] w-[210px] shrink-0 overflow-hidden rounded-full border-4 border-white shadow-none sm:h-[230px] sm:w-[230px] sm:border-[5px] lg:h-[255px] lg:w-[255px] xl:h-[265px] xl:w-[265px]">
                      <Image
                        src={step.imageSrc}
                        alt={step.imageAlt}
                        fill
                        sizes="(max-width: 640px) 210px, (max-width: 1024px) 230px, 265px"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>

                  {/* Text Content Column */}
                  <div
                    className={`order-2 w-full flex-1 text-left ${
                      isImageLeft
                        ? 'lg:order-2 lg:flex lg:justify-end'
                        : 'lg:order-1 lg:flex lg:justify-start'
                    }`}
                  >
                    <div
                      className={`mx-auto w-full max-w-[480px] text-left ${
                        isImageLeft
                          ? 'lg:mr-0 lg:ml-auto'
                          : 'lg:mr-auto lg:ml-0'
                      }`}
                    >
                      <span className="font-display mb-2 inline-block text-xs font-bold tracking-[0.2em] text-[#057b75] uppercase sm:text-sm">
                        {step.step}
                      </span>
                      <h3 className="font-display text-2xl font-bold tracking-[-0.01em] text-[#121a18] sm:text-3xl lg:text-[30px] lg:leading-[1.2]">
                        {step.title}
                      </h3>
                      <p className="mt-3.5 text-base leading-[1.6] text-[#4b5563] sm:text-lg">
                        {step.description}
                      </p>
                      <div className="mt-5 sm:mt-6">
                        <ActionButton href="#contact" variant="teal">
                          Talk to Us
                        </ActionButton>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
