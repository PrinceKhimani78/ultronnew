import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, ChevronRight } from 'lucide-react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { CtaContact } from '@/components/home/CtaContact';
import { Eyebrow } from '@/components/ui/SectionHeading';
import { ServiceHeading } from '@/components/services/ServiceHeading';
import { getPublishedServices, getServiceBySlug } from '@/lib/cms-data';
import { buildMetadata } from '@/lib/seo';

import { ServiceFaq } from '@/components/services/ServiceFaq';
import { ServiceProcessStructure } from '@/components/services/ServiceProcessStructure';
import { ServiceWhyChooseUs } from '@/components/services/ServiceWhyChooseUs';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await getPublishedServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return buildMetadata({
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
      path: `/services/${slug}`,
    });
  }

  return buildMetadata({
    title: service.title,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <main id="content" className="flex-1">
        {/* ── Service Hero ──────────────────────────────────────────────── */}
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
              {/*
               * H1 typography system:
               *   size:           clamp(2.4rem, 5vw, 5.25rem)
               *   weight:         600  (font-semibold)
               *   line-height:    0.98
               *   letter-spacing: -0.045em
               *   colour:         #111111 (near-black) + teal highlight via ServiceHeading
               */}
              <ServiceHeading
                as="h1"
                text={service.headline}
                highlightedText={service.highlights?.hero}
                className="text-[clamp(2.4rem,5vw,5.25rem)] leading-[0.98] font-semibold tracking-[-0.045em] uppercase"
              />
              <p className="text-ink-muted/90 mt-5 text-sm leading-relaxed sm:text-base">
                {service.description}
              </p>
            </div>
          </Container>
        </div>

        {/* ── Core Advantages Breakdown ──────────────────────────────────── */}
        <Section
          tone="raised"
          spacing="spacious"
          className="relative overflow-hidden"
        >
          <Container width="wide">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <Eyebrow>CORE ADVANTAGES</Eyebrow>
                {/*
                 * H2 typography system:
                 *   size:           clamp(2rem, 3.2vw, 3.5rem)
                 *   weight:         600
                 *   line-height:    1.05
                 *   letter-spacing: -0.035em
                 */}
                <ServiceHeading
                  as="h2"
                  text={service.advantages.headline}
                  highlightedText={service.highlights?.advantages}
                  className="mt-4 text-[clamp(2rem,3.2vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.035em]"
                />
                <p className="text-ink-muted mt-5 leading-relaxed">
                  {service.advantages.subtext}
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

        {/* ── Process Steps ──────────────────────────────────────────────── */}
        <ServiceProcessStructure service={service} />

        {/* ── Why Choose Us ─────────────────────────────────────────────── */}
        <ServiceWhyChooseUs service={service} />

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <ServiceFaq service={service} />

        {/* ── Final CTA Band ────────────────────────────────────────────── */}
        <CtaContact
          eyebrow="DIRECT CONSULTATION"
          heading={[
            { text: service.cta.headline || 'Start With a Structure ' },
            { text: service.cta.headline ? '' : 'That Works', accent: true },
          ]}
          body={service.cta.subtext}
          ctaLabel={service.cta.buttonLabel}
          defaultService={service.title}
        />
      </main>
    </>
  );
}
