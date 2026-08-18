'use client';

/**
 * Loading boundary for the `/services` segment.
 *
 * This renders a visually premium, brand-aligned loading screen while Next.js
 * loads the chunk and data for a service page. It features an infinite spinning ring in
 * the brand's gold accent and a pulsing central UF monogram using the authentic teal.
 */
export default function ServicesLoading() {
  return (
    <div
      className="flex min-h-[75vh] w-full flex-col items-center justify-center bg-[#FDFBEE] px-4 py-24"
      role="status"
      aria-live="polite"
      aria-label="Loading..."
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer spinning ring with brand gold accent */}
        <div className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-[#035551]/10 border-t-[#C9B37E]" />

          {/* Central Logo Monogram with a breathing/pulse animation */}
          <div className="relative h-10 w-10 animate-pulse duration-[1500ms] sm:h-12 sm:w-12">
            <div
              className="absolute inset-0 bg-[#035551]"
              style={{
                WebkitMaskImage: 'url(/brand/logo-icon-green.webp)',
                maskImage: 'url(/brand/logo-icon-green.webp)',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
              }}
            />
          </div>
        </div>

        {/* Brand-compliant text indicator in Funnel Display */}
        <span className="font-display mt-6 animate-pulse text-[11px] font-bold tracking-[0.25em] text-[#035551]/80 uppercase sm:text-xs">
          Loading...
        </span>
      </div>
    </div>
  );
}
