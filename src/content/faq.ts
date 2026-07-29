import type { HeadingSegment } from '@/types/content';

/**
 * Frequently asked questions.
 *
 * This section carries two jobs at once. It lowers cost of sale by pre-answering
 * the questions the advisory team fields on every first call (business goal #4),
 * and it is the single richest source of `FAQPage` structured data on the site
 * (business goal #3).
 *
 * Written for extraction: every answer opens with the answer, is self-contained,
 * and avoids "as mentioned above" — an AI engine quotes the first 40–60 words
 * and will not have the surrounding page.
 *
 * ⚠️ VERIFY BEFORE LAUNCH: answers describe UAE regulation in general terms and
 * must be reviewed by a licensed adviser. Regulation changes; a confidently
 * stated wrong number is worse for a firm like this than no number at all.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_INTRO = {
  eyebrow: 'Questions',
  heading: [
    { text: 'Answered before you ' },
    { text: 'ask', accent: true },
    { text: '.' },
  ] as readonly HeadingSegment[],
  body: 'If your question is not here, it is the one we most want to hear.',
} as const;

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: 'How long does it take to set up a UAE company?',
    answer:
      'Licence issuance typically takes one to three weeks once documents are complete. Corporate banking is the longer stage and usually runs four to eight weeks, because the bank conducts its own compliance review. We run banking preparation in parallel with formation rather than starting it afterwards, which is where most timelines are lost.',
  },
  {
    question: 'Should I form in a free zone or on the mainland?',
    answer:
      'It depends on who your customers are. A free zone entity suits businesses trading internationally or with other free zone companies, and generally offers full foreign ownership and a simpler setup. A mainland licence is required to contract directly with the UAE public sector and to trade freely within the local market. We make this recommendation against your actual trading plan, in writing, before anything is filed.',
  },
  {
    question: 'Can a foreign company own a UAE entity?',
    answer:
      'Yes. A foreign company can hold shares in a UAE entity, and full foreign ownership is available in free zones and across most mainland activities. Corporate shareholders require attested constitutional documents and a board resolution, and banks will look through the structure to the ultimate beneficial owners during onboarding.',
  },
  {
    question: 'What is UAE corporate tax and does it apply to me?',
    answer:
      'UAE corporate tax applies at 9% on taxable profit above the statutory threshold, with 0% below it. A qualifying free zone person may access a 0% rate on qualifying income, but only where genuine substance and income conditions are met — free zone registration alone does not secure it. Registration is required regardless of whether tax is payable.',
  },
  {
    question: 'Why do UAE bank accounts get rejected?',
    answer:
      'Most rejections come down to an incomplete source-of-funds narrative, a shareholder or trading corridor outside the bank’s risk appetite, or a mismatch between the licensed activity and what the business actually does. Banks rarely explain which. We select the bank against your profile first, then build the file to the standard that bank applies.',
  },
  {
    question: 'Do I need to live in the UAE to hold residency?',
    answer:
      'No, but you must not remain outside the country for more than six continuous months, or the residency visa lapses. Different routes carry different conditions: investor and Golden Visa routes have longer durations and more generous dependant rules than standard employment visas. We route each person deliberately rather than defaulting everyone to the same visa.',
  },
  {
    question: 'What does an engagement cost?',
    answer:
      'We quote a fixed fee against an approved written scope, so the number you agree is the number you pay. We do not publish a headline setup price, because the honest answer depends on jurisdiction, visa quota and banking complexity — and a low advertised figure that grows during delivery is the practice this firm exists to be an alternative to.',
  },
  {
    question: 'What happens after the company is formed?',
    answer:
      'A UAE entity carries recurring obligations: licence renewal, audited financial statements, corporate tax filing, UBO register maintenance and economic-substance notification. We hold that calendar and prompt you ahead of each deadline. Formation is the start of the relationship, not the end of it.',
  },
] as const;
