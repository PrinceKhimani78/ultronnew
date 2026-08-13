import Image from 'next/image';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { STAGGER_MS } from '@/components/motion/config';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ABOUT_PAGE } from '@/content/about-page';
import { getVisibleTeamMembers } from '@/lib/cms-data';
import { cn } from '@/lib/utils';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  email?: string;
  phone?: string;
};

/**
 * "Our Team", directly beneath the foundation band in the design.
 *
 * Fetches published, non-archived team members from Supabase (with fallback to
 * static members). Preserves exact component layout, fixed card sizes, conic
 * gradients, grayscale photos, and animations.
 */
export async function AboutTeam() {
  const members = await getVisibleTeamMembers();

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

        <ul className="mt-14 grid w-full grid-cols-[280px] justify-center gap-y-[48px] sm:mt-12 sm:grid-cols-[repeat(2,280px)] sm:justify-center sm:gap-x-[56px] sm:gap-y-[64px] lg:mt-14 lg:grid-cols-[repeat(3,280px)] lg:justify-between lg:gap-y-[80px]">
          {members.map((member, index) => (
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
 * One card, sized as fixed pixel values throughout:
 * 1. Mat (280x310, conic gradient mat)
 * 2. Portrait (270x270, grayscale, object-cover)
 * 3. Info panel (198x49, positioned flush bottom-left)
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
