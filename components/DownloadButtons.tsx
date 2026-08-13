/*
  App Store + Google Play download buttons. Fixed order, both always rendered.
  OneRound is live in Brisbane, so both point at the real store listings (the AU
  App Store and Google Play). Order is static — no post-hydration user-agent
  reorder — so this stays a server component.

  Two colourways via `onDark`:
    - default (light slab): NAVY field / white text — hero blue slab, white pricing card.
    - onDark (dark slab): WHITE field / navy text — navy footer, dark Good Stuff photo.
  The Google Play mark keeps its official colours in both. `focusWhite` overrides
  the focus ring to white for the blue hero slab, where the default blue accent
  ring would be invisible.

  Note: these are the site's hand-built badges, styled into the broadsheet
  system — close stand-ins, NOT Apple/Google's official downloadable artwork,
  which both stores require unmodified. Swap in the official files before any
  store-featured or paid placement.
*/

const APP_STORE_URL = "https://apps.apple.com/au/app/oneround/id6761165688";
const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.oneround";

/* A store link is only real once it points somewhere; "#" (or empty) is a
   placeholder. Guard on this so a dead link can never ship. */
const isLiveUrl = (url: string) => url !== "" && url !== "#";

if (process.env.NODE_ENV !== "production") {
  if (!isLiveUrl(APP_STORE_URL) || !isLiveUrl(GOOGLE_PLAY_URL)) {
    console.warn(
      '[DownloadButtons] A store URL is still a placeholder ("#") — that button is hidden until a real URL is set.',
    );
  }
}

function badgeClass(onDark: boolean) {
  return (
    "inline-flex h-[54px] min-w-[176px] items-center gap-2.5 border px-4 transition-colors duration-200 " +
    (onDark
      ? "border-[color:rgba(var(--navy-rgb),0.15)] bg-white text-navy group-hover/badge:border-[color:rgba(var(--navy-rgb),0.35)]"
      : "border-white/20 bg-navy text-white group-hover/badge:border-white/45")
  );
}

function overlineClass(onDark: boolean) {
  return (
    "font-mono text-[9px] font-bold uppercase leading-none tracking-[0.18em] " +
    (onDark ? "text-navy/60" : "text-white/65")
  );
}

const storeName = "text-[17px] font-semibold leading-tight";

function AppStoreBadge({ onDark }: { onDark: boolean }) {
  return (
    <span className={badgeClass(onDark)}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.36 12.78c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.28-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.43-3.64M14.09 5.83c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.68 1.37-.59.67-1.1 1.76-.96 2.79 1.02.08 2.06-.52 2.7-1.26" />
      </svg>
      <span className="flex flex-col items-start gap-[3px]">
        <span className={overlineClass(onDark)}>Download on the</span>
        <span className={storeName}>App Store</span>
      </span>
    </span>
  );
}

function GooglePlayBadge({ onDark }: { onDark: boolean }) {
  return (
    <span className={badgeClass(onDark)}>
      <svg width="20" height="22" viewBox="0 0 512 512" aria-hidden="true">
        <path d="M48 59v394c0 6 3 11 8 14l228-211L56 45c-5 3-8 8-8 14z" fill="#34A853" />
        <path d="M380 196l-72-42-58 53 58 53 73-42c12-7 12-15-1-22z" fill="#FBBC04" />
        <path d="M56 45l228 158 58-53L96 18c-15-9-31-3-40 13z" fill="#EA4335" />
        <path d="M56 467l284-160-58-53L56 453c-1 6 0 11 0 14z" fill="#4285F4" />
      </svg>
      <span className="flex flex-col items-start gap-[3px]">
        <span className={overlineClass(onDark)}>Get it on</span>
        <span className={storeName}>Google Play</span>
      </span>
    </span>
  );
}

type Props = {
  className?: string;
  /** Center the row (e.g. centered CTAs). */
  center?: boolean;
  /** White badge field, for placement on a dark slab (navy footer, dark photo). */
  onDark?: boolean;
  /** Force a white focus ring — for the blue hero slab, where the default blue
      accent ring is invisible. */
  focusWhite?: boolean;
};

export default function DownloadButtons({
  className = "",
  center = false,
  onDark = false,
  focusWhite = false,
}: Props) {
  const link =
    "group/badge inline-flex" + (focusWhite ? " focus-visible:outline-white" : "");
  const showApple = isLiveUrl(APP_STORE_URL);
  const showPlay = isLiveUrl(GOOGLE_PLAY_URL);
  // No live store links — render nothing rather than dead-link badges.
  if (!showApple && !showPlay) return null;

  return (
    <div
      className={`flex flex-wrap gap-3 ${center ? "justify-center" : ""} ${className}`}
    >
      {showApple && (
        <a
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download OneRound on the App Store"
          className={link}
        >
          <AppStoreBadge onDark={onDark} />
        </a>
      )}
      {showPlay && (
        <a
          href={GOOGLE_PLAY_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get OneRound on Google Play"
          className={link}
        >
          <GooglePlayBadge onDark={onDark} />
        </a>
      )}
    </div>
  );
}
