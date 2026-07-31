'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavItem } from '@/content/site';
import { isCurrentRoute } from '@/lib/nav';
import { cn } from '@/lib/utils';

/**
 * One footer link column.
 *
 * Split out of `Footer` so the footer shell stays a server component: marking
 * the whole footer `'use client'` to read one pathname would ship the logo,
 * the NAP block and the copyright row to the browser for no reason.
 *
 * The design marks the current page gold in these columns, matching the header.
 * `aria-current` carries the same fact for anyone who cannot see the colour —
 * gold on teal is decorative here and must never be the only signal.
 */
export function FooterNavColumn({
  heading,
  items,
}: {
  heading: string;
  items: readonly (NavItem & { pending?: boolean })[];
}) {
  const pathname = usePathname();
  const headingId = `footer-${heading.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <nav aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-surface text-base font-semibold lg:text-[1.0625rem]"
      >
        {heading}
      </h2>
      <ul className="mt-5 space-y-3.5 lg:mt-6 lg:space-y-4">
        {items.map((item) => {
          const isCurrent = isCurrentRoute(item.href, pathname);

          return (
            <li key={item.label}>
              {item.pending ? (
                // A footer link into a 404 is worse than a non-link.
                <span className="text-surface/45 text-[0.9375rem] lg:text-base">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={cn(
                    'ease-house hover:text-accent inline-block text-[0.9375rem] transition-all duration-200 hover:translate-x-0.5 lg:text-base',
                    isCurrent ? 'text-accent' : 'text-surface/85',
                  )}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
