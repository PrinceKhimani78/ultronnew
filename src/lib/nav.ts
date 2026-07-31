/**
 * Which navigation entry represents the page you are on.
 *
 * Shared by the header, the mobile drawer and the footer so that "current" means
 * the same thing in all three. When they each carried their own copy of this
 * test they had already drifted — the drawer matched `/services` against
 * `/services-old` because it used a bare `startsWith`.
 *
 * In-page anchors (`/#about`) are never current: the header is fixed and the
 * hash changes under the reader as they scroll, so marking one gold would mean
 * marking the wrong one most of the time.
 */
export function isCurrentRoute(href: string, pathname: string) {
  if (href.includes('#')) return false;
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
