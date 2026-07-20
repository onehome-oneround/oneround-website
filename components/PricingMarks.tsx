/*
  Decorative line-art for the Pricing section, and the two trust-marker icons.

  All of it is inline SVG rather than an icon package: this repo has no icon
  dependency and draws every glyph by hand (see Pricing's Tick, PillButton's
  arrow, the Footer socials). Two icons do not justify adding lucide-react to
  the runtime, so Shield and Lock are drawn in Lucide's visual language —
  24x24 box, 2px stroke, round caps and joins — and read identically at these
  sizes.

  Every mark carries explicit width and height attributes. That is deliberate:
  an SVG sized only by CSS is laid out at intrinsic size until styles resolve,
  which is exactly the kind of late reflow the site's CLS 0 depends on avoiding.
  Locked dimensions also mean the marks never rescale as the display type around
  them reflows.

  Colour comes from currentColor throughout, so each mark inherits --blue from a
  text-blue wrapper rather than hardcoding a hex.

  Static by design: no animation, no transition, no hover state.
*/

const STROKE = {
  stroke: "currentColor",
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/* Two glasses tapping — martini and pint — with impact marks. ~200px wide. */
export function Glasses({ className = "" }: { className?: string }) {
  return (
    <svg
      width="200"
      height="120"
      viewBox="0 0 200 120"
      aria-hidden="true"
      className={className}
      {...STROKE}
      strokeWidth={2}
    >
      {/* martini, tilted right toward the clink */}
      <g transform="rotate(-14 62 60)">
        <path d="M38 34h48L62 62z" />
        <path d="M62 62v28" />
        <path d="M50 94h24" />
      </g>
      {/* pint, tilted left toward the clink */}
      <g transform="rotate(12 140 62)">
        <path d="M122 34h36l-5 60h-26z" />
        <path d="M124 50h32" />
      </g>
      {/* impact marks at the meeting point */}
      <path d="M100 20v-9M86 25l-6-7M114 25l6-7" strokeWidth={2} />
    </svg>
  );
}

/*
  Circular badge, ~160px. The arc path is a full circle drawn as two arcs so
  textPath has a continuous baseline; the id is namespaced because a duplicate
  SVG id elsewhere on the page would silently reroute the text.
*/
export function Badge({ className = "" }: { className?: string }) {
  return (
    <svg
      width="160"
      height="160"
      viewBox="0 0 160 160"
      aria-hidden="true"
      className={className}
      {...STROKE}
      strokeWidth={1.25}
    >
      <defs>
        <path
          id="pricing-badge-arc"
          d="M80 80 m-62 0 a62 62 0 1 1 124 0 a62 62 0 1 1 -124 0"
        />
      </defs>
      <circle cx="80" cy="80" r="79" />
      <circle cx="80" cy="80" r="52" />
      <text
        fill="currentColor"
        stroke="none"
        style={{
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.22em",
        }}
      >
        <textPath href="#pricing-badge-arc" startOffset="2%">
          MORE REWARDS · MORE MEMORIES ·
        </textPath>
      </text>
      {/* centre asterisk */}
      <path
        d="M80 66v28M67.9 73l24.2 14M92.1 73l-24.2 14"
        strokeWidth={1.75}
      />
    </svg>
  );
}

/* Impact rays cluster, ~60px. */
export function Rays({ className = "" }: { className?: string }) {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      aria-hidden="true"
      className={className}
      {...STROKE}
      strokeWidth={2}
    >
      <path d="M30 4v14M30 42v14M4 30h14M42 30h14M11.6 11.6l9.9 9.9M38.5 38.5l9.9 9.9M48.4 11.6l-9.9 9.9M21.5 38.5l-9.9 9.9" />
    </svg>
  );
}

/* Hand-drawn squiggle, ~100px. */
export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg
      width="100"
      height="28"
      viewBox="0 0 100 28"
      aria-hidden="true"
      className={className}
      {...STROKE}
      strokeWidth={2}
    >
      <path d="M2 18C10 4 18 4 26 14s16 10 24 0 16-10 24 0 16 10 22 2" />
    </svg>
  );
}

/* Lucide "shield-check" geometry, drawn inline. */
export function ShieldCheck({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...STROKE}
      strokeWidth={2}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

/* Lucide "lock" geometry, drawn inline. */
export function Lock({ className = "" }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      {...STROKE}
      strokeWidth={2}
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
