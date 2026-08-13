import type { HeadingSegment } from '@/types/content';

/**
 * Copy for the About route.
 *
 * The hero reuses the Services page's hero component (`PageHero`) with its
 * own heading and body — the brief for this page was explicit that the
 * About page must NOT use the About hero drawn in the design, only the
 * Services page's hero shape with About's own words.
 *
 * The "Our Vision / Our Mission / Our Story" band mirrors the one section of
 * the design that was available to build against. As with `services-page.ts`
 * before it, the design carries lorem ipsum there; this is real copy at the
 * same rhythm, in the firm's established voice (see `ABOUT` in
 * `content/home.ts`), pending client sign-off on final wording.
 */

export const ABOUT_PAGE = {
  metaTitle: 'About Us',
  metaDescription:
    "Ultron Financials advises international businesses on UAE market entry — jurisdiction, entity formation, corporate banking and the compliance calendar that follows. Here's why, and how we work.",

  hero: {
    heading: [
      { text: 'About ' },
      { text: 'Us', accent: true },
    ] as readonly HeadingSegment[],
    body: 'We built Ultron around the part of UAE business setup where most advisers step back, the banking, the structuring, the compliance that has to hold up under real scrutiny.',
  },

  foundation: {
    rows: [
      {
        id: 'vision',
        eyebrow: 'Where we’re headed',
        heading: [
          { text: 'Our ' },
          { text: 'Vision', accent: true },
        ] as readonly HeadingSegment[],
        body: 'To be the firm ambitious businesses call first when a UAE structure needs to work under real scrutiny, not just on paper. We measure a case by how it holds up two years after formation, not by how quickly it closes.',
      },
      {
        id: 'mission',
        eyebrow: 'What we do',
        heading: [
          { text: 'Our ' },
          { text: 'Mission', accent: true },
        ] as readonly HeadingSegment[],
        body: 'We handle what standard formation agents step back from: multi-jurisdiction shareholders, previously declined banking, and structures that need to survive a licensing or compliance review. Every engagement is led by one named adviser, quoted against a written scope.',
      },
      {
        id: 'story',
        eyebrow: 'How we started',
        heading: [
          { text: 'Our ' },
          { text: 'Story', accent: true },
        ] as readonly HeadingSegment[],
        body: 'Ultron Financials started with a simple observation: most UAE business setup goes smoothly right up until the bank account or the compliance filing, and that is exactly where generalist agents step back. We built a firm around the part of the process everyone else avoids.',
      },
    ],
  },

  /**
   * "Our Team", the section directly beneath the foundation band in the
   * design. Only three people have photos and named roles in the project
   * today (`public/brand/{kuldeep,raghuveer,chanchal}.png`), which is also
   * exactly what the comp itself shows — its 3×2 grid is those same three
   * people repeated once to fill six slots, not six distinct hires. The list
   * below repeats them the same way, on explicit instruction, so the id on
   * each entry is suffixed `-2` for the repeat rather than reusing the first
   * id outright — React keys need to be unique even when the person isn't.
   * None has a published LinkedIn URL yet; `linkedin` is left unset rather
   * than invented, which is also what keeps the card's icon slot empty for
   * them by design.
   */
  team: {
    eyebrow: 'Meet the people behind Ultron',
    heading: [
      { text: 'Our ' },
      { text: 'Team', accent: true },
    ] as readonly HeadingSegment[],
    members: [
      {
        id: 'kuldeep',
        name: 'Kuldeep',
        role: 'Founder & Lead Advisor',
        image: '/brand/kuldeep.png',
        linkedin: undefined as string | undefined,
      },
      {
        id: 'raghuveer',
        name: 'Raghuveer',
        role: 'Banking Advisor',
        image: '/brand/raghuveer.png',
        linkedin: undefined as string | undefined,
      },
      {
        id: 'chanchal',
        name: 'Chanchal',
        role: 'Operations & Client Relations',
        image: '/brand/chanchal.png',
        linkedin: undefined as string | undefined,
      },
      {
        id: 'kuldeep-2',
        name: 'Kuldeep',
        role: 'Founder & Lead Advisor',
        image: '/brand/kuldeep.png',
        linkedin: undefined as string | undefined,
      },
      {
        id: 'raghuveer-2',
        name: 'Raghuveer',
        role: 'Banking Advisor',
        image: '/brand/raghuveer.png',
        linkedin: undefined as string | undefined,
      },
      {
        id: 'chanchal-2',
        name: 'Chanchal',
        role: 'Operations & Client Relations',
        image: '/brand/chanchal.png',
        linkedin: undefined as string | undefined,
      },
    ],
  },
} as const;
