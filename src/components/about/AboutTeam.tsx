import Image from 'next/image';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ABOUT_PAGE } from '@/content/about-page';
import { cn } from '@/lib/utils';

type TeamMember = (typeof ABOUT_PAGE.team.members)[number];

/**
 * "Our Team", directly beneath the foundation band in the design.
 *
 * Six cards, three-across, two rows — matching the comp's own grid, which is
 * the same three real people (`content/about-page.ts`) repeated once rather
 * than six distinct hires. `members` carries that repeat explicitly, so this
 * component just renders whatever the array holds.
 *
 * The comp's frame reads 1280×1034 with a fixed height, but that height is
 * not carried here on purpose: it is exact only at the comp's own width, and
 * a hard-coded `height` on a section whose content is real (variable-length)
 * copy rather than the comp's lorem ipsum is exactly the setup for clipped
 * or overlapping text the brief itself rules out elsewhere. The padding and
 * gaps below are tuned to land close to that height at the same width
 * instead, and stay `height: auto` everywhere — which the brief does ask for
 * explicitly below that width.
 *
 * Background is the comp's own soft vertical wash — cream at the top fading
 * to white — laid on `Section`'s `raised` (white) tone rather than either of
 * the two flat tones the site's tokens define, since neither is a gradient.
 */
export function AboutTeam() {
  return (
    <Section
      spacing="default"
      tone="raised"
      aria-label="Our team"
      className="overflow-hidden bg-gradient-to-b from-[#FDFBEE] to-white lg:pt-[106px]"
    >
      <Container width="wide">
        <SectionHeading
          eyebrow={ABOUT_PAGE.team.eyebrow}
          heading={ABOUT_PAGE.team.heading}
          as="h2"
          align="center"
          eyebrowClassName="text-accent-deep"
          accentClassName="text-brand"
          className="relative z-[2]"
        />

        {/*
          Fixed-width tracks (`grid-cols-[280px]`, not `1fr`/`justify-items-
          center`) inside a *full-width* grid box — never `max-w-[1007px]
          mx-auto`, which puts a real computed `margin-left`/`margin-right`
          on the grid that every other band on this page carries as zero,
          leaving the grid's own edges inset from the measure everything
          else aligns to.

          280px, not the comp's 273px: `TeamCard` below is `w-[280px]`, a
          size dialled in by hand against the rendered comp in an earlier
          pass. A grid track narrower than the card it holds doesn't shrink
          the card — the card overflows its own track by the difference —
          which is exactly what put the third card 7px past the container's
          right edge here before this matched the two numbers up.

          Below `lg`, the tracks are centred as a block via `justify-center`
          with an explicit column gap (56px at 2 cols, none needed at 1).
          At `lg` and up the row switches to `justify-between` with *no*
          explicit column gap: three fixed-width cards distributed edge-to-
          edge across the full container spread the leftover width evenly
          between them instead of as outer margin, which is what puts card
          one's left edge and card three's right edge on the same line as
          "Our Vision" / "Our Story" above.
        */}
        <ul className="mt-8 grid w-full grid-cols-[280px] justify-center gap-y-[48px] sm:mt-10 sm:grid-cols-[repeat(2,280px)] sm:justify-center sm:gap-x-[56px] sm:gap-y-[64px] lg:mt-14 lg:grid-cols-[repeat(3,280px)] lg:justify-between lg:gap-y-[80px]">
          {ABOUT_PAGE.team.members.map((member, index) => (
            <Reveal
              as="li"
              key={member.id}
              delay={index * STAGGER_MS}
              amount={0.1}
            >
              <TeamCard member={member} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/**
 * One card, sized as fixed pixel values throughout — width, height and
 * every child's position and size are fixed (`shrink-0`), not proportional:
 *
 * 1. **Mat** (`.team-member-card`, Frame 31 in the comp) — 280×310, 20px
 *    radius, the comp's own conic gradient, its teal-tinted inset shadow
 *    restored (an earlier pass dropped it; this is the authoritative spec).
 *    The comp's own frame reads 273×307; this card runs 7px larger on each
 *    axis, dialled in by hand against the rendered comp in a later pass.
 * 2. **Portrait** (`.team-member-image-wrapper`, Frame 65) — 270×270,
 *    grayscale, 20px radius, offset `top: -20px; left: 26px` from the mat —
 *    likewise tuned by hand, which is why it floats above the mat's own top
 *    edge rather than sitting flush inside it. `overflow-visible` on the mat
 *    is what lets that top sliver show instead of being clipped.
 * 3. **Info panel** (`.team-member-info`, Frame 66) — 198×49, absolutely
 *    positioned flush to the mat's bottom-left corner. The LinkedIn link
 *    sits inside this same panel, at its right edge via `justify-between`.
 *
 * Fixed-width cards inside a grid mean the row won't shrink below 280px on
 * a viewport narrower than that plus its gutters — a real, if narrow, edge
 * case a fully fluid card wouldn't have. The grid's own track width (in
 * `AboutTeam` above) has to track this card's actual width, not the comp's
 * — a mismatch there is what put the third card past the container's own
 * right edge in an earlier pass.
 */
function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="relative h-[310px] w-[280px] shrink-0 overflow-visible rounded-[20px] border-0 bg-[conic-gradient(#FDFBEE_0%,#FFFFFF_49.74%,#FDFBEE_100%)] shadow-[4px_-4px_4px_0_rgba(3,85,81,0.25)_inset]">
      <div className="absolute -top-[20px] left-[26px] aspect-square h-[270px] w-[270px] shrink-0 overflow-hidden rounded-[20px]">
        <Image
          src={member.image}
          alt={`${member.name} – ${member.role}`}
          fill
          sizes="258px"
          className="object-cover object-center grayscale"
        />
      </div>

      {/*
        `z-[2]`, not decorative: `next/image`'s `fill` mode renders the
        `<img>` itself as `position: absolute`, and CSS paints *every*
        positioned element above *all* static in-flow content in the same
        stacking context — regardless of DOM order. This panel is already
        `position: absolute` for its own placement, which is what keeps it
        above the photo; the explicit z-index is belt-and-braces against the
        same class of bug a previous pass hit here.
      */}
      <div className="absolute bottom-0 left-0 z-[2] flex h-[49px] w-[198px] items-center justify-between overflow-hidden rounded-[0px_100px_100px_0px] bg-[#035551] py-0 pr-3 pl-3.5 text-white">
        <div className="flex min-w-0 flex-col justify-center">
          <h3 className="truncate text-[14px] leading-none font-bold text-white uppercase">
            {member.name}
          </h3>
          <p className="mt-1 truncate text-[8px] leading-none text-white/80">
            {member.role}
          </p>
        </div>

        {member.linkedin ? (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[#DCCB8E] transition-[background-color,transform] duration-200 ease-out hover:-translate-y-px hover:bg-white/12"
          >
            <LinkedinGlyph className="h-3.5 w-3.5" />
          </a>
        ) : null}
      </div>
    </article>
  );
}

/**
 * The LinkedIn "in" mark, hand-drawn in the same stroke idiom as
 * `ui/ContactIcons.tsx` — the installed `lucide-react` no longer ships brand
 * glyphs, and the brief rules out adding a package for one icon.
 */
function LinkedinGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn('shrink-0', className)}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" rx="0.5" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
