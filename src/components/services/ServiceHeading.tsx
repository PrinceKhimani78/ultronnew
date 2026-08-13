/**
 * ServiceHeading — Reusable heading component for all service page sections.
 *
 * Renders a heading with an optional single teal-highlighted phrase using safe
 * text splitting (indexOf + slice). No dangerouslySetInnerHTML, no regex,
 * no HTML injection. Falls back to plain near-black text when highlightedText
 * is missing or not found inside the heading text.
 *
 * Colour tokens used:
 *   - Default text:  #111111 (passed via className from parent)
 *   - Highlight:     #035551  (--color-brand, `text-brand`)
 *
 * Typography is controlled entirely by the `className` prop so each call site
 * can apply the correct heading level sizes without duplicating logic here.
 */

import { cn } from '@/lib/utils';

type HeadingLevel = 'h1' | 'h2' | 'h3';

type ServiceHeadingProps = {
  /** Full heading text, exactly as stored in the database or static data. */
  text: string;
  /**
   * The exact phrase (case-insensitive substring match) to render in Ultron
   * teal (#035551). Leave undefined or empty to render the full text in black.
   * If the phrase is not found inside `text`, the full heading renders normally.
   */
  highlightedText?: string;
  /** HTML heading element to render. Defaults to h2. */
  as?: HeadingLevel;
  /** Tailwind / CSS classes forwarded to the heading element. */
  className?: string;
  id?: string;
};

/**
 * Splits `text` around the first case-insensitive occurrence of `phrase` and
 * returns [before, matchedOriginal, after].  Returns null when `phrase` is
 * empty or not found so the caller can fall back to plain text.
 */
function splitOnPhrase(
  text: string,
  phrase: string,
): [string, string, string] | null {
  if (!phrase || !phrase.trim()) return null;
  const idx = text.toLowerCase().indexOf(phrase.toLowerCase().trim());
  if (idx === -1) return null;
  const len = phrase.trim().length;
  return [
    text.slice(0, idx),
    text.slice(idx, idx + len),
    text.slice(idx + len),
  ];
}

export function ServiceHeading({
  text,
  highlightedText,
  as: Heading = 'h2',
  className,
  id,
}: ServiceHeadingProps) {
  const parts = highlightedText ? splitOnPhrase(text, highlightedText) : null;

  return (
    <Heading id={id} className={cn('font-display text-[#111111]', className)}>
      {parts ? (
        <>
          {parts[0]}
          <span
            className="service-heading-highlight text-brand"
            style={{
              fontWeight: 'inherit',
              fontStyle: 'inherit',
              letterSpacing: 'inherit',
              lineHeight: 'inherit',
            }}
          >
            {parts[1]}
          </span>
          {parts[2]}
        </>
      ) : (
        text
      )}
    </Heading>
  );
}
