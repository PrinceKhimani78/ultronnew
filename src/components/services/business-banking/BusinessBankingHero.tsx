import { ConsultationForm } from '@/components/home/ConsultationForm';
import { Container } from '@/components/layout/Container';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { ActionButton } from '@/components/ui/ActionButton';
import { BandEyebrow } from '@/components/ui/BandEyebrow';
import { HeadingText } from '@/components/ui/SectionHeading';
import { BUSINESS_BANKING_HERO } from '@/content/business-banking';

const CREAM = '#FDFBEE';
const SAND = '#DCCB8E';

export function BusinessBankingHero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-[130px] pb-0 sm:pt-[146px] lg:pt-[190px]"
      style={{ backgroundColor: CREAM }}
      aria-labelledby="business-banking-hero-heading"
    >
      <Container width="wide">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12 xl:gap-16">
          {/* Left Side Content (~54%) */}
          <div className="w-full lg:max-w-[620px] lg:shrink">
            <Reveal delay={0}>
              <BandEyebrow>{BUSINESS_BANKING_HERO.eyebrow}</BandEyebrow>
            </Reveal>

            <Reveal delay={STAGGER_MS}>
              <h1
                id="business-banking-hero-heading"
                className="font-display mt-4 text-[clamp(2.25rem,5.2vw,56px)] leading-[105%] font-bold tracking-[-0.02em] text-black"
              >
                <HeadingText
                  segments={BUSINESS_BANKING_HERO.heading}
                  accentClassName="text-[#035551]"
                />
              </h1>
            </Reveal>

            <Reveal delay={STAGGER_MS * 2} className="mt-6">
              <p className="max-w-[580px] text-[18px] leading-[150%] font-medium text-[#404040] sm:text-[20px]">
                {BUSINESS_BANKING_HERO.description}
              </p>
            </Reveal>

            <Reveal delay={STAGGER_MS * 3} className="mt-8">
              <ActionButton href={BUSINESS_BANKING_HERO.ctaHref}>
                {BUSINESS_BANKING_HERO.ctaLabel.toUpperCase()}
              </ActionButton>
            </Reveal>

            {/* Compact Trust Row */}
            <Reveal
              delay={STAGGER_MS * 4}
              className="mt-12 border-t border-[#035551]/15 pt-8"
            >
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {BUSINESS_BANKING_HERO.trustStats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="font-display text-[20px] leading-tight font-bold text-[#035551] sm:text-[24px]">
                      {stat.value}
                    </span>
                    <span className="mt-1 text-[12px] leading-snug font-medium text-[#5A5A5A] sm:text-[13px]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Side Form (~46%) */}
          <Reveal
            delay={STAGGER_MS * 2}
            amount={0.1}
            className="w-full lg:w-[540px] lg:shrink-0 xl:w-[580px]"
          >
            <div className="rounded-[24px] border border-[#035551]/10 bg-white p-2 shadow-[0_16px_40px_rgba(3,85,81,0.08)] sm:p-3">
              <ConsultationForm
                defaultService="Business Banking"
                formTitle="Get a Free Consultation"
                submitLabel="GET A SAME-DAY FEASIBILITY READ"
                className="lg:w-full"
              />
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Bottom Gradient Band Matching Homepage Hero */}
      <div
        className="relative mt-10 h-[132px] w-full lg:mt-[67px]"
        style={{
          backgroundImage: `linear-gradient(180deg, ${CREAM} 0%, ${SAND} 740.91%)`,
        }}
      />
    </section>
  );
}
