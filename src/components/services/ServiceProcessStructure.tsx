'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

import { ActionButton } from '@/components/ui/ActionButton';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { ServiceHeading } from '@/components/services/ServiceHeading';
import type { Service } from '@/content/services';

const EASE_HOUSE = [0.22, 1, 0.36, 1] as const;

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
          {/*
           * Process section H2 typography:
           *   size:           clamp(30px, 3.75vw, 48px)
           *   weight:         700
           *   line-height:    1.1
           *   letter-spacing: -0.03em
           * */}
          <ServiceHeading
            as="h2"
            text={service.process.headline}
            highlightedText={service.highlights?.process}
            className="heading-h2 mt-3.5"
          />
          <p className="mt-4 max-w-[680px] text-base leading-relaxed font-medium text-[#4b5563] sm:text-lg">
            {service.process.subtext}
          </p>
        </motion.div>

        {/* Process Step Cards */}
        <div className="space-y-12 sm:space-y-14 lg:space-y-16">
          {service.process.steps.map((step, index) => {
            const isImageLeft = index % 2 === 0;
            const gradientDesktop = isImageLeft
              ? 'linear-gradient(90deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)'
              : 'linear-gradient(270deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)';

            return (
              <motion.div
                key={step.step}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: EASE_HOUSE }}
                className={`relative mx-auto flex min-h-0 w-full max-w-[1140px] items-center overflow-hidden border-none shadow-none lg:min-h-[285px] ${
                  isImageLeft
                    ? 'rounded-[28px] sm:rounded-l-[60px] sm:rounded-r-none lg:rounded-l-[999px] lg:rounded-r-none'
                    : 'rounded-[28px] sm:rounded-l-none sm:rounded-r-[60px] lg:rounded-l-none lg:rounded-r-[999px]'
                }`}
                style={{ background: gradientDesktop }}
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
                      {/*
                       * Process step label — small, teal, uppercase, letter-spaced.
                       * Must NOT use H1/H2/H3 heading sizes.
                       */}
                      <span className="font-display mb-2 inline-block text-xs font-bold tracking-[0.2em] text-[#057b75] uppercase sm:text-sm">
                        {step.step}
                      </span>
                      {/*
                       * Step title H3 typography:
                       *   size:           clamp(21px, 2vw, 24px)
                       *   weight:         700
                       *   line-height:    1.2
                       *   letter-spacing: -0.015em
                       * */}
                      <h3 className="heading-h3 text-[#111111]">
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
