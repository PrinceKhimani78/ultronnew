'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ABOUT_PAGE } from '@/content/about-page';
import { cn } from '@/lib/utils';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedinUrl?: string;
  email?: string;
  phone?: string;
};

export function AboutTeam() {
  const [members, setMembers] = useState<readonly TeamMember[]>([]);
  const [isTouchPaused, setIsTouchPaused] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch('/api/admin/team');
        if (res.ok) {
          const data: unknown = await res.json();
          const records = Array.isArray(data) ? data : [];
          const visible = records.filter(
            (m: { is_visible?: boolean; archived_at?: string | null }) =>
              m.is_visible && !m.archived_at,
          );
          if (visible.length > 0) {
            setMembers(visible);
            return;
          }
        }
      } catch (err) {
        console.error(
          'Failed to fetch team members, falling back to static copy:',
          err,
        );
      }
      setMembers(ABOUT_PAGE.team.members);
    };

    fetchMembers();
  }, []);

  if (members.length === 0) return null;

  return (
    <Section
      spacing="tight"
      tone="raised"
      aria-label="Our team"
      className="relative overflow-hidden bg-[#FDFBEE] pt-10 pb-12 sm:pt-14 sm:pb-14 lg:pt-[88px] lg:pb-16"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes team-marquee {
              0% {
                transform: translate3d(0, 0, 0);
              }
              100% {
                transform: translate3d(-50%, 0, 0);
              }
            }
            .animate-team-marquee {
              display: flex;
              width: max-content;
              flex-wrap: nowrap;
              will-change: transform;
              animation: team-marquee 25s linear infinite;
            }
            @media (min-width: 640px) {
              .animate-team-marquee {
                animation-duration: 32s;
              }
            }
            @media (min-width: 1024px) {
              .animate-team-marquee {
                animation-duration: 36s;
              }
            }
            .team-carousel-wrapper:hover .animate-team-marquee,
            .team-carousel-wrapper:focus-within .animate-team-marquee,
            .animate-team-marquee.is-paused {
              animation-play-state: paused !important;
            }
            @media (prefers-reduced-motion: reduce) {
              .team-carousel-wrapper {
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: none;
              }
              .team-carousel-wrapper::-webkit-scrollbar {
                display: none;
              }
              .animate-team-marquee {
                animation: none !important;
              }
            }
          `,
        }}
      />

      {/* Abstract Globe Line Illustration background */}
      <svg
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 stroke-[#035551]/7 sm:h-[500px] sm:w-[500px]"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="180" strokeWidth="1" />
        <circle cx="200" cy="200" r="140" strokeWidth="1" />
        <circle cx="200" cy="200" r="90" strokeWidth="1" />
        <ellipse cx="200" cy="200" rx="180" ry="100" strokeWidth="1" />
        <ellipse cx="200" cy="200" rx="100" ry="180" strokeWidth="1" />
        <line x1="20" y1="200" x2="380" y2="200" strokeWidth="1" />
        <line x1="200" y1="20" x2="200" y2="380" strokeWidth="1" />
        <line
          x1="72"
          y1="72"
          x2="328"
          y2="328"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <line
          x1="72"
          y1="328"
          x2="328"
          y2="72"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <circle cx="200" cy="60" r="3" fill="#C9B37E" stroke="none" />
        <circle cx="110" cy="110" r="3.5" fill="#C9B37E" stroke="none" />
        <circle cx="290" cy="110" r="3.5" fill="#C9B37E" stroke="none" />
        <circle cx="200" cy="140" r="3" fill="#C9B37E" stroke="none" />
        <circle cx="290" cy="290" r="3.5" fill="#C9B37E" stroke="none" />
        <circle cx="110" cy="290" r="3.5" fill="#C9B37E" stroke="none" />
      </svg>

      <Container width="wide">
        <div className="relative z-10">
          <SectionHeading
            eyebrow="THE TEAM"
            heading={ABOUT_PAGE.team.heading}
            as="h2"
            align="center"
            eyebrowClassName="text-accent-deep"
            accentClassName="text-brand"
          />

          <p className="mx-auto mt-3 max-w-2xl text-center text-[15px] leading-relaxed text-[#5A5A5A] sm:mt-4 sm:text-[16px] lg:mt-5">
            A focused team of advisors with deep UAE market knowledge and
            hands-on experience across banking, compliance, and business
            structuring.
          </p>

          {/* Carousel Wrapper */}
          <div
            className="team-carousel-wrapper relative mt-8 w-full overflow-hidden py-3 sm:mt-10 lg:mt-12"
            onTouchStart={() => setIsTouchPaused(true)}
            onTouchEnd={() => {
              setTimeout(() => setIsTouchPaused(false), 1200);
            }}
            onTouchCancel={() => setIsTouchPaused(false)}
          >
            <div
              className={cn(
                'animate-team-marquee flex flex-nowrap gap-8 sm:gap-10 lg:gap-16',
                isTouchPaused && 'is-paused',
              )}
            >
              {/* Primary Group */}
              <div className="flex shrink-0 flex-nowrap gap-8 sm:gap-10 lg:gap-16">
                {members.map((member) => (
                  <TeamCard key={member.id} member={member} />
                ))}
              </div>

              {/* Duplicated Group (seamless loop) */}
              <div
                className="flex shrink-0 flex-nowrap gap-8 sm:gap-10 lg:gap-16"
                aria-hidden="true"
              >
                {members.map((member) => (
                  <TeamCard
                    key={`${member.id}-dup`}
                    member={member}
                    isDuplicate
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function TeamCard({
  member,
  isDuplicate,
}: {
  member: TeamMember;
  isDuplicate?: boolean;
}) {
  return (
    <div className="group flex w-[215px] shrink-0 flex-col items-center text-center transition-all duration-300 sm:w-[200px] lg:w-[220px]">
      {/* Circle Image Wrapper */}
      <div className="relative aspect-square w-[135px] rounded-full border border-[#035551]/20 bg-[#FDFBEE] p-1.5 transition-all duration-300 group-hover:scale-[1.04] group-hover:border-[#C9B37E] group-hover:shadow-[0_0_15px_rgba(3,85,81,0.2)] sm:w-[140px] lg:w-[150px]">
        <div className="relative h-full w-full overflow-hidden rounded-full border border-[#035551] transition-colors duration-300 group-hover:border-[#C9B37E]">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 135px, 150px"
            className="object-cover object-center grayscale transition-transform duration-300"
          />
        </div>
      </div>

      {/* Text Info */}
      <div className="mt-3 flex flex-col items-center sm:mt-4">
        <h3 className="font-display text-[15px] font-bold text-black uppercase transition-colors duration-300 group-hover:text-[#035551] sm:text-[17px] lg:text-[18px]">
          {member.name}
        </h3>
        <p className="mt-0.5 text-[12px] font-medium text-[#5A5A5A] sm:mt-1 sm:text-[13px] lg:text-[14px]">
          {member.role}
        </p>

        {/* LinkedIn icon */}
        <div className="mt-1.5 flex h-6 items-center justify-center sm:mt-2">
          {member.linkedinUrl ? (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isDuplicate ? -1 : 0}
              aria-hidden={isDuplicate}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              className={cn(
                'flex items-center justify-center rounded-full',
                'text-[#035551] transition-all duration-300',
                'hover:scale-[1.08] hover:text-[#C9B37E]',
                'focus-visible:rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#035551]',
              )}
              aria-label={`Visit ${member.name}’s LinkedIn profile`}
            >
              <LinkedinGlyph className="h-4 w-4" />
            </a>
          ) : (
            <span className="h-4 w-4" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
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
