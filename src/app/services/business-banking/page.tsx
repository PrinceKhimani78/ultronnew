import { CtaContact } from '@/components/home/CtaContact';
import { HowUltronWorks } from '@/components/home/HowUltronWorks';
import { JsonLd } from '@/components/seo/JsonLd';
import { BankingFaq } from '@/components/services/business-banking/BankingFaq';
import { BankingSolutionDesk } from '@/components/services/business-banking/BankingSolutionDesk';
import { BankingProblems } from '@/components/services/business-banking/BankingProblems';
import { BusinessBankingHero } from '@/components/services/business-banking/BusinessBankingHero';
import { WhyChooseUltron } from '@/components/services/business-banking/WhyChooseUltron';
import {
  BANKING_PROCESS_INTRO,
  BANKING_PROCESS_STEPS,
} from '@/content/business-banking';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Business Banking | UAE Corporate Account Opening Strategy',
  description:
    'Structure your UAE business bank account for approval. From selecting the right bank to preparing compliant dossiers, Ultron Financials handles the details that move your business forward.',
  path: '/services/business-banking',
});

export default function BusinessBankingPage() {
  return (
    <>
      <JsonLd
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Business Banking Advisory',
          provider: {
            '@type': 'FinancialService',
            name: 'Ultron Financials',
          },
          areaServed: 'United Arab Emirates',
          description:
            'Corporate and business bank account opening services in the UAE, structured for compliance and approval.',
        }}
      />

      <main id="content" className="flex-1">
        {/* 1. Hero with left-side content and right-side consultation form */}
        <BusinessBankingHero />

        {/* 2. Problems People Face */}
        <BankingProblems />

        {/* 3. How Ultron Works: Solution Desk */}
        <BankingSolutionDesk />

        {/* 4. Process section: A CLEAR PATH FORWARD */}
        <HowUltronWorks
          intro={BANKING_PROCESS_INTRO}
          steps={BANKING_PROCESS_STEPS}
        />

        {/* 5. Why Choose Ultron Financials: WHY ULTRON FINANCIALS */}
        <WhyChooseUltron />

        {/* 6. FAQ section: BUSINESS BANKING QUESTIONS */}
        <BankingFaq />

        {/* 7. Final CTA: Get started */}
        <CtaContact />
      </main>
    </>
  );
}
