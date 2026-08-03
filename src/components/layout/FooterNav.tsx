'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Reveal } from '@/components/motion/Reveal';
import { Stagger, StaggerItem } from '@/components/motion/Stagger';
import type { NavItem } from '@/content/site';
import { isCurrentRoute } from '@/lib/nav';
import { cn } from '@/lib/utils';

/**
 * One footer link column, at the comp's 18px/30px.
 *
 * Split out of `Footer` so the footer shell stays a server component: marking
 * the whole footer `'use client'` to read one pathname would ship the logo, the
 * NAP block and the copyright row to the browser for no reason.
 *
 * The gap is 2px, not a comfortable list gap — the comp sets a 32px pitch on a
 * 30px line box, so the rhythm is carried by the line height and the gap only
 * makes up the difference.
 *
 * The design marks the current page gold, matching the header. `aria-current`
 * carries the same fact for anyone who cannot see the colour: gold on teal is
 * decorative here and must never be the only signal.
 */

/**
 * Links are pure white at rest — not the 85% the contact column's body copy sits
 * at. These are navigation, and nav is held to full strength; the reduced
 * opacity is for prose only.
 */
const BODY = 'text-[18px] leading-[30px] font-normal';

export function FooterNavColumn({
  heading,
  items,
  delay = 0,
}: {
  heading: string;
  items: readonly (NavItem & { pending?: boolean })[];
  /** Offsets this column against its siblings so the three do not land together. */
  delay?: number;
}) {
  const pathname = usePathname();
  const headingId = `footer-${heading.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <nav aria-labelledby={headingId}>
      <Reveal variant="text" delay={delay}>
        <h2
          id={headingId}
          className="mb-7 text-[18px] leading-tight font-semibold text-white"
        >
          {heading}
        </h2>
      </Reveal>
      {/*
        Links arrive one after another. `Stagger` renders this `<ul>` itself, so
        the 2px pitch that carries the comp's 32px rhythm is untouched.
      */}
      <Stagger
        as="ul"
        delayChildren={delay + 0.06}
        className="flex flex-col gap-[2px]"
      >
        {items.map((item) => {
          const isCurrent = isCurrentRoute(item.href, pathname);

          return (
            <StaggerItem as="li" variant="text" key={item.label}>
              {item.pending ? (
                // A footer link into a 404 is worse than a non-link.
                <span
                  className={BODY}
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  {item.label}
                </span>
              ) : (
                /*
                  Colour is a CLASS, never an inline `style`. It used to be a
                  style, and that silently disabled the hover for the life of the
                  component: an inline `color` outranks a `hover:text-*`
                  utility, which is not `!important`, so the gold never applied.
                */
                <Link
                  href={item.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={cn(
                    BODY,
                    'inline-block transition-colors duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]',
                    isCurrent
                      ? 'text-[#DCCB8E]'
                      : 'text-white hover:text-[#DCCB8E]',
                  )}
                >
                  {item.label}
                </Link>
              )}
            </StaggerItem>
          );
        })}
      </Stagger>
    </nav>
  );
}
