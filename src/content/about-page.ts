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
        image: '/brand/our-vision.jpg' as string | undefined,
      },
      {
        id: 'mission',
        eyebrow: 'What we do',
        heading: [
          { text: 'Our ' },
          { text: 'Mission', accent: true },
        ] as readonly HeadingSegment[],
        body: 'We handle what standard formation agents step back from: multi-jurisdiction shareholders, previously declined banking, and structures that need to survive a licensing or compliance review. Every engagement is led by one named adviser, quoted against a written scope.',
        image: '/brand/our-mission.jpg' as string | undefined,
      },
      {
        id: 'story',
        eyebrow: 'How we started',
        heading: [
          { text: 'Our ' },
          { text: 'Story', accent: true },
        ] as readonly HeadingSegment[],
        body: 'Ultron Financials started with a simple observation: most UAE business setup goes smoothly right up until the bank account or the compliance filing, and that is exactly where generalist agents step back. We built a firm around the part of the process everyone else avoids.',
        image: '/brand/our-story.jpg' as string | undefined,
      },
    ],
  },

  /**
   * "Our Team", the section directly beneath the foundation band in the
   * design. Each member carries a dedicated `linkedinUrl` field with their
   * real, provided LinkedIn profile URL — never invented. A member without a
   * confirmed URL should have `linkedinUrl` left `undefined`, which is what
   * keeps the card's icon slot hidden for them (see `TeamCard` in
   * `AboutTeam.tsx`).
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
        role: 'Lead Advisor',
        image: '/brand/kuldeep.png',
        linkedinUrl: 'https://www.linkedin.com/in/cakuldeepchauhan',
      },
      {
        id: 'raghuveer',
        name: 'Raghuveer',
        role: 'Banking Advisor',
        image: '/brand/raghuveer.png',
        linkedinUrl:
          'https://www.linkedin.com/authwall?trk=bf&trkInfo=AQFszn4r9tqPBwAAAaAPbYmA4-TJvUegc_NkSPSsTnnS8eGx4bFBN6Z6XeR8wgHBnbmEfmUD1iDaCPt_K3QiSCUbYNUHcgIABTlofOY5e1f-qNTwJj8flOtxkLkl1XMcsa9w0Hc=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fraghuveersingh0432',
      },
      {
        id: 'chanchal',
        name: 'Chanchal',
        role: 'Operations & Client Relations',
        image: '/brand/chanchal.png',
        linkedinUrl: 'https://www.linkedin.com/in/chanchal-rawat11',
      },
      {
        id: 'manoj',
        name: 'Manoj',
        role: 'Business Development',
        image: '/brand/manoj.jpeg',
        linkedinUrl:
          'https://www.linkedin.com/authwall?trk=bf&trkInfo=AQEOXpXN7LSh4AAAAaAPbkjoT1ZKIvhKKhprl1IfgLYobGSaH8eth8L_J492UObjVL6a5FabPbNpiT4TwziulivUZASymjzEpfJ_HefS7kRWmnlWLIFuIA0qeJn1R7y3up4xPvw=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fmanoj-kuchan317',
      },
      {
        id: 'virendra',
        name: 'Virendra',
        role: 'Business Development',
        image: '/brand/viren.jpeg',
        linkedinUrl: 'https://www.linkedin.com/in/virendra-singh-c0212',
      },
    ],
  },
} as const;
