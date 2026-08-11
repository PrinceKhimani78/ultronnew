'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

import { ActionButton } from '@/components/ui/ActionButton';
import { Eyebrow, HeadingText } from '@/components/ui/SectionHeading';
import type { Service } from '@/content/services';

type ProcessStep = {
  step: string;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  imageOnLeftDesktop: boolean;
  gradientDesktop: string;
};

const LOREM_STEPS_BY_SLUG: Record<string, ProcessStep[]> = {
  'business-setup': [
    {
      step: 'STEP 01',
      title: 'Understand Your Business Activity',
      description:
        'We review what your business will do, where it will operate and how you plan to generate revenue before recommending a jurisdiction or licence.',
      buttonText: 'Discuss Your Setup',
      href: '#contact',
      imageSrc: '/brand/process-consultation.webp',
      imageAlt: 'Understand Your Business Activity',
      imageOnLeftDesktop: true,
      gradientDesktop:
        'linear-gradient(90deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      step: 'STEP 02',
      title: 'Choose the Right Jurisdiction',
      description:
        'Mainland, free zone or offshore—we compare the options based on ownership, operating flexibility, costs and future banking requirements.',
      buttonText: 'Compare Your Options',
      href: '#contact',
      imageSrc: '/brand/process-strategy.webp',
      imageAlt: 'Choose the Right Jurisdiction',
      imageOnLeftDesktop: false,
      gradientDesktop:
        'linear-gradient(270deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      step: 'STEP 03',
      title: 'Prepare for Setup and Banking',
      description:
        'We organise the company structure and required documentation with licensing, compliance and account-opening readiness in mind.',
      buttonText: 'Start Your Business Setup',
      href: '#contact',
      imageSrc: '/brand/process-execution.webp',
      imageAlt: 'Prepare for Setup and Banking',
      imageOnLeftDesktop: true,
      gradientDesktop:
        'linear-gradient(90deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
  ],
  'business-banking': [
    {
      step: 'STEP 01',
      title: 'Banking Profile & Root Cause Review',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.',
      buttonText: 'Request Banking Review',
      href: '#contact',
      imageSrc: '/brand/process-consultation.webp',
      imageAlt: 'Banking Profile Review',
      imageOnLeftDesktop: true,
      gradientDesktop:
        'linear-gradient(90deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      step: 'STEP 02',
      title: 'Dossier & Compliance Restructuring',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.',
      buttonText: 'Compare Bank Options',
      href: '#contact',
      imageSrc: '/brand/process-strategy.webp',
      imageAlt: 'Compliance Restructuring',
      imageOnLeftDesktop: false,
      gradientDesktop:
        'linear-gradient(270deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      step: 'STEP 03',
      title: 'Bank Submission & Account Activation',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.',
      buttonText: 'Start Banking Application',
      href: '#contact',
      imageSrc: '/brand/process-execution.webp',
      imageAlt: 'Account Activation',
      imageOnLeftDesktop: true,
      gradientDesktop:
        'linear-gradient(90deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
  ],
  'financial-advisory': [
    {
      step: 'STEP 01',
      title: 'Initial Feasibility & Assessment',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.',
      buttonText: 'Discuss Financial Advisory',
      href: '#contact',
      imageSrc: '/brand/process-consultation.webp',
      imageAlt: 'Feasibility & Assessment',
      imageOnLeftDesktop: true,
      gradientDesktop:
        'linear-gradient(90deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      step: 'STEP 02',
      title: 'Strategic Structuring & Financial Planning',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.',
      buttonText: 'Compare Advisory Options',
      href: '#contact',
      imageSrc: '/brand/process-strategy.webp',
      imageAlt: 'Strategic Planning',
      imageOnLeftDesktop: false,
      gradientDesktop:
        'linear-gradient(270deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      step: 'STEP 03',
      title: 'Execution & Ongoing Governance',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.',
      buttonText: 'Start Advisory Plan',
      href: '#contact',
      imageSrc: '/brand/process-execution.webp',
      imageAlt: 'Ongoing Governance',
      imageOnLeftDesktop: true,
      gradientDesktop:
        'linear-gradient(90deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
  ],
  'tax-structuring-advisory': [
    {
      step: 'STEP 01',
      title: 'Tax Exposure & VAT Assessment',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.',
      buttonText: 'Discuss Tax Structuring',
      href: '#contact',
      imageSrc: '/brand/process-consultation.webp',
      imageAlt: 'Tax Assessment',
      imageOnLeftDesktop: true,
      gradientDesktop:
        'linear-gradient(90deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      step: 'STEP 02',
      title: 'Corporate Tax & Compliance Strategy',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.',
      buttonText: 'Compare Tax Models',
      href: '#contact',
      imageSrc: '/brand/process-strategy.webp',
      imageAlt: 'Corporate Tax Strategy',
      imageOnLeftDesktop: false,
      gradientDesktop:
        'linear-gradient(270deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      step: 'STEP 03',
      title: 'Implementation & Filing Support',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.',
      buttonText: 'Start Tax Structuring',
      href: '#contact',
      imageSrc: '/brand/process-execution.webp',
      imageAlt: 'Filing Support',
      imageOnLeftDesktop: true,
      gradientDesktop:
        'linear-gradient(90deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
  ],
  'business-finance': [
    {
      step: 'STEP 01',
      title: 'Financial Profile & Needs Analysis',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.',
      buttonText: 'Discuss Business Finance',
      href: '#contact',
      imageSrc: '/brand/process-consultation.webp',
      imageAlt: 'Needs Analysis',
      imageOnLeftDesktop: true,
      gradientDesktop:
        'linear-gradient(90deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      step: 'STEP 02',
      title: 'Lender Matching & Application Structuring',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.',
      buttonText: 'Compare Financing Options',
      href: '#contact',
      imageSrc: '/brand/process-strategy.webp',
      imageAlt: 'Application Structuring',
      imageOnLeftDesktop: false,
      gradientDesktop:
        'linear-gradient(270deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      step: 'STEP 03',
      title: 'Facility Approval & Capital Disbursement',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.',
      buttonText: 'Start Finance Application',
      href: '#contact',
      imageSrc: '/brand/process-execution.webp',
      imageAlt: 'Capital Disbursement',
      imageOnLeftDesktop: true,
      gradientDesktop:
        'linear-gradient(90deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
  ],
  'real-estate-mortgages': [
    {
      step: 'STEP 01',
      title: 'Property & Borrower Qualification',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.',
      buttonText: 'Discuss Mortgage Options',
      href: '#contact',
      imageSrc: '/brand/process-consultation.webp',
      imageAlt: 'Borrower Qualification',
      imageOnLeftDesktop: true,
      gradientDesktop:
        'linear-gradient(90deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      step: 'STEP 02',
      title: 'Mortgage Repositioning & Underwriting',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.',
      buttonText: 'Compare Lender Rates',
      href: '#contact',
      imageSrc: '/brand/process-strategy.webp',
      imageAlt: 'Mortgage Underwriting',
      imageOnLeftDesktop: false,
      gradientDesktop:
        'linear-gradient(270deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
    {
      step: 'STEP 03',
      title: 'Final Bank Approval & Valuation Settlement',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor.',
      buttonText: 'Start Mortgage Application',
      href: '#contact',
      imageSrc: '/brand/process-execution.webp',
      imageAlt: 'Valuation Settlement',
      imageOnLeftDesktop: true,
      gradientDesktop:
        'linear-gradient(90deg, rgb(253, 251, 238) 0%, rgba(253, 251, 238, 0.78) 36%, rgba(253, 251, 238, 0.28) 66%, rgba(255, 255, 255, 0) 100%)',
    },
  ],
};

const DEFAULT_LOREM_STEPS: ProcessStep[] =
  LOREM_STEPS_BY_SLUG['business-banking'];

const EASE_HOUSE = [0.22, 1, 0.36, 1] as const;

export function ServiceProcessStructure({ service }: { service: Service }) {
  const shouldReduceMotion = useReducedMotion();
  const steps = LOREM_STEPS_BY_SLUG[service.slug] || DEFAULT_LOREM_STEPS;

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
          <Eyebrow align="left">
            HOW WE BUILD THE RIGHT {service.title.toUpperCase()} STRUCTURE
          </Eyebrow>
          <h2 className="font-display mt-3.5 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.02em] text-[#121a18]">
            <HeadingText
              segments={[
                { text: `${service.title} Built Around ` },
                { text: 'What Comes Next', accent: true },
              ]}
            />
          </h2>
          <p className="mt-4 max-w-[680px] text-base leading-relaxed font-medium text-[#4b5563] sm:text-lg">
            {service.slug === 'business-setup'
              ? 'Company formation is only the beginning. We consider your activity, ownership, banking requirements and long-term plans before recommending the right setup.'
              : `${service.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`}
          </p>
        </motion.div>

        {/* 3 Open-Sided Capsule Cards */}
        <div className="space-y-12 sm:space-y-14 lg:space-y-16">
          {steps.map((step) => {
            const isImageLeft = step.imageOnLeftDesktop;

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
                  background: step.gradientDesktop,
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
                        <ActionButton href={step.href} variant="teal">
                          {step.buttonText}
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
