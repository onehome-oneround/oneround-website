/*
  App Store + Google Play download buttons. Fixed order, both always rendered.
  - The app isn't published yet, so both point at href="#".

  Order: this used to reorder itself by user-agent (Android saw Play first) via
  a useEffect setting flex `order`. That runs AFTER hydration, so Android users
  watched the badges paint one way and then swap places — a real post-hydration
  layout shift for the sake of a marginal win, given both badges are visible
  either way. Order is now static, which also makes this a server component.

  Styling: these live on BLUE slabs (hero user-side, ClosingCTA), so the badge
  field is navy — the same accent inversion the headline italic already uses on
  blue (navy on blue / blue on navy). Square corners and a hairline border keep
  them in the broadsheet system; the overline wears the mono kicker voice used
  for listings metadata elsewhere. The Play mark keeps its official colours.

  Focus: globals.css draws :focus-visible in var(--accent), which on the Users
  side IS blue — invisible against a blue slab. These override to white.

  ⚠️ TODO before launch:
    1. Replace href="#" with the real store URLs:
         APP_STORE_URL  = "https://apps.apple.com/app/idXXXXXXXXX"
         GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=au.oneround.app"
    2. Swap these hand-built badges for the official Apple / Google badge artwork
       (Apple "Download on the App Store" + Google "Get it on Google Play"),
       per their brand guidelines. These are close stand-ins, not the official
       files — Apple and Google both require the supplied badge unmodified, so
       the navy treatment below is a pre-launch stand-in, not submission-ready.
*/

// TODO: real store URLs at launch
const APP_STORE_URL = "#";
const GOOGLE_PLAY_URL = "#";

/* Shared badge field. Navy on the blue slab, hairline border, no radius.
   Note: don't reach for .tactile here — it's unlayered in globals.css, so it
   would beat this transition and it doesn't cover border-color. Press stays on
   the <a>, as it was. */
const badge =
  "inline-flex h-[54px] min-w-[176px] items-center gap-2.5 border border-white/20 bg-navy px-4 text-white " +
  "transition-colors duration-200 group-hover/badge:border-white/45";

/* The recurring mono metadata voice, sized down to sit inside the badge. */
const overline =
  "font-mono text-[9px] font-bold uppercase leading-none tracking-[0.18em] text-white/65";

const storeName = "text-[17px] font-semibold leading-tight";

function AppStoreBadge() {
  return (
    <span className={badge}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.36 12.78c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.28-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.43-3.64M14.09 5.83c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.68 1.37-.59.67-1.1 1.76-.96 2.79 1.02.08 2.06-.52 2.7-1.26" />
      </svg>
      <span className="flex flex-col items-start gap-[3px]">
        <span className={overline}>Download on the</span>
        <span className={storeName}>App Store</span>
      </span>
    </span>
  );
}

function GooglePlayBadge() {
  return (
    <span className={badge}>
      <svg width="20" height="22" viewBox="0 0 512 512" aria-hidden="true">
        <path d="M48 59v394c0 6 3 11 8 14l228-211L56 45c-5 3-8 8-8 14z" fill="#34A853" />
        <path d="M380 196l-72-42-58 53 58 53 73-42c12-7 12-15-1-22z" fill="#FBBC04" />
        <path d="M56 45l228 158 58-53L96 18c-15-9-31-3-40 13z" fill="#EA4335" />
        <path d="M56 467l284-160-58-53L56 453c-1 6 0 11 0 14z" fill="#4285F4" />
      </svg>
      <span className="flex flex-col items-start gap-[3px]">
        <span className={overline}>Get it on</span>
        <span className={storeName}>Google Play</span>
      </span>
    </span>
  );
}

type Props = {
  className?: string;
  /** Center the row (e.g. centered CTAs). */
  center?: boolean;
};

export default function DownloadButtons({ className = "", center = false }: Props) {
  const link = "group/badge inline-flex focus-visible:outline-white";

  return (
    <div
      className={`flex flex-wrap gap-3 ${center ? "justify-center" : ""} ${className}`}
    >
      <a
        href={APP_STORE_URL}
        aria-label="Download OneRound on the App Store"
        className={link}
      >
        <AppStoreBadge />
      </a>
      <a
        href={GOOGLE_PLAY_URL}
        aria-label="Get OneRound on Google Play"
        className={link}
      >
        <GooglePlayBadge />
      </a>
    </div>
  );
}
