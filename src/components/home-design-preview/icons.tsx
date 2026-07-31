/**
 * Icon glyphs for `/home-design-preview`.
 *
 * ⚠️ RECONSTRUCTIONS, NOT THE SOURCE ASSETS.
 *
 * The design exports each icon as a PNG, and the Claude Design MCP cannot
 * deliver them: `get_file` caps responses at 256 KiB and every icon in the
 * project is a print-resolution export well past that — the 15×15 arrow and
 * the 17×17 tick are both 1254×1254 PNGs. Each one comes back truncated, with
 * no IEND chunk, so the bytes are unusable rather than merely large.
 *
 * These SVGs match the shapes the comp draws at the sizes it draws them. They
 * are stroke-based and inherit `currentColor`, so they stay sharp where the
 * originals would not: a 1254px raster scaled to 15px is not an upgrade.
 *
 * TODO(client): re-export the icons at web resolution (or drop the PNGs into
 * `public/assets/home-design-preview/`) and swap them in here. Every consumer
 * imports from this file, so it is the only place that changes.
 */

type IconProps = {
  className?: string;
};

/** Hero statistic 1 — bank / institution. */
export function BankIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M3 10h18L12 4 3 10Z" />
      <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" />
      <path d="M3 20h18" />
    </svg>
  );
}

/** Hero statistic 2 — structured business setup. */
export function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2.5" y="7.5" width="19" height="12" rx="2.5" />
      <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" />
      <path d="M2.5 12.5h19" />
    </svg>
  );
}

/** Hero statistic 3 — all nationalities. */
export function GlobeIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  );
}

export const STAT_ICONS = {
  bank: BankIcon,
  briefcase: BriefcaseIcon,
  globe: GlobeIcon,
} as const;

/**
 * The diagonal arrow inside every button's ring.
 *
 * The comp sizes it 15×15 inside a 20×20 circle drawn with a 3px inset ring,
 * which is a ring *inside* the box rather than a border outside it — hence
 * `box-shadow: inset 0 0 0 3px` on the wrapper rather than `border`.
 */
export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/** The tick beside each key benefit. Filled disc + white check, as drawn. */
export function CheckIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path
        d="m7 12.4 3.4 3.4L17 9.2"
        stroke="#fff"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
