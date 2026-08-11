import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ChevronRight } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { CtaContact } from '@/components/home/CtaContact';
import { Eyebrow, HeadingText } from '@/components/ui/SectionHeading';
import { SERVICES } from '@/content/services';
import { buildMetadata } from '@/lib/seo';
import { ServiceProcessStructure } from '@/components/services/ServiceProcessStructure';

const service = SERVICES.find((s) => s.slug === 'business-banking')!;

export const metadata: Metadata = buildMetadata({
  title: service.title,
  description: service.description,
  path: `/services/${service.slug}`,
});

export default function BusinessBankingPage() {
  return (
    <>
      <main id="content" className="flex-1">
        {/* Service Hero */}
        <div className="bg-surface text-ink relative overflow-hidden pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-32">
          <Container width="wide">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="text-ink-muted mt-4 mb-6 flex items-center gap-2 text-xs font-medium tracking-wider uppercase sm:mt-6 lg:mt-8"
            >
              <Link href="/" className="hover:text-brand transition-colors">
                Home
              </Link>
              <ChevronRight className="h-3 w-3" />
              <Link
                href="/services"
                className="hover:text-brand transition-colors"
              >
                Services
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-brand-bright font-semibold">
                {service.title}
              </span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="font-display text-ink text-[clamp(2.25rem,4.8vw,3.75rem)] leading-[1.08] font-bold tracking-[-0.02em] uppercase">
                {service.headline}
              </h1>
              <p className="text-ink-muted/90 mt-5 text-sm leading-relaxed sm:text-base">
                {service.description}
              </p>
            </div>
          </Container>
        </div>

        {/* Benefits Breakdown */}
        <Section
          tone="raised"
          spacing="spacious"
          className="relative overflow-hidden"
        >
          <Container width="wide">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <Eyebrow>CORE ADVANTAGES</Eyebrow>
                <h2 className="font-display mt-4 text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.12] font-semibold tracking-[-0.02em]">
                  <HeadingText
                    segments={[
                      { text: 'Key ' },
                      { text: 'Benefits', accent: true },
                      { text: ' & Deliverables' },
                    ]}
                  />
                </h2>
                <p className="text-ink-muted mt-5 leading-relaxed">
                  Every engagement is led by a dedicated senior advisor. We
                  structure your solution to pass risk, compliance, and
                  regulatory screening on the first attempt.
                </p>
              </div>

              <div className="lg:col-span-7">
                <ul className="space-y-4">
                  {service.benefits.map((benefit, index) => (
                    <li
                      key={benefit}
                      className="border-line bg-surface flex items-start gap-4 rounded-2xl border p-5 shadow-sm sm:p-6"
                    >
                      <div className="bg-brand/10 text-brand-bright mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-brand-bright mb-1 block text-xs font-semibold tracking-wider uppercase">
                          Deliverable 0{index + 1}
                        </span>
                        <p className="text-ink text-sm leading-relaxed font-medium sm:text-base">
                          {benefit}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
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

        {/* Service Process Structure Capsules */}
        <ServiceProcessStructure service={service} />

        {/* Direct Consultation Band */}
        <CtaContact />
      </main>
    </>
  );
}
