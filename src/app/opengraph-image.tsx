import { ImageResponse } from 'next/og';

import { HOME_HERO } from '@/content/home';
import { SITE } from '@/content/site';

/**
 * The social share card, generated at build time.
 *
 * The headline is read from `HOME_HERO.heading`, not retyped. It was previously
 * a hardcoded copy of an earlier headline and silently kept showing it after the
 * hero was rewritten — exactly the drift the content layer exists to prevent.
 *
 * Token values are literals here on purpose: this renders in Satori, which has
 * no access to the CSS custom properties in `globals.css`. Keep them in step
 * with the `@theme` block — they are the only duplicated colours in the
 * codebase, and that is a deliberate trade against shipping a headless browser.
 */

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BRAND = '#035551';
const SURFACE = '#fdfbee';
/**
 * Gold, not `brand-bright`: the emphasis green is chosen to sit on the cream
 * page and would nearly vanish against this dark ground. The site makes the same
 * swap for inverted bands.
 */
const ACCENT = '#c9b37e';

/**
 * Satori drops whitespace between a text node and an element, welding the last
 * word of one segment to the first of the next. Converting only the *trailing*
 * space to a non-breaking space guarantees the gap while leaving the internal
 * spaces free to wrap.
 */
function preserveTrailingSpace(text: string) {
  return text.replace(/ $/, ' ');
}

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: BRAND,
        padding: 80,
        fontFamily: 'sans-serif',
      }}
    >
      {/* Wordmark lockup. The ring echoes the site logo. */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 999,
            border: `3px solid ${SURFACE}`,
            opacity: 0.85,
          }}
        />
        <div style={{ color: SURFACE, fontSize: 34, letterSpacing: -0.5 }}>
          {SITE.name}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          color: SURFACE,
          fontSize: 76,
          lineHeight: 1.1,
          letterSpacing: -2,
          maxWidth: 940,
        }}
      >
        {HOME_HERO.heading.map((segment, index) => (
          <span
            key={index}
            style={segment.accent ? { color: ACCENT } : undefined}
          >
            {preserveTrailingSpace(segment.text)}
          </span>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          color: SURFACE,
          opacity: 0.65,
          fontSize: 26,
        }}
      >
        <span>Dubai</span>
        <span>·</span>
        <span>Banking, company setup, compliance and structuring</span>
      </div>
    </div>,
    size,
  );
}
