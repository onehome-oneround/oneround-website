/*
  Nav store control — "Get the app" + two crisp circular store buttons (Apple +
  Google Play), monochrome white glyphs on navy so they stay on-brand and clean.

  ⚠️ TODO before launch: point both at the real store URLs (see DownloadButtons.tsx).
*/

const APP_STORE_URL = "#"; // TODO: real App Store URL
const GOOGLE_PLAY_URL = "#"; // TODO: real Google Play URL

const circle =
  "tactile flex h-10 w-10 items-center justify-center rounded-full bg-navy text-white transition hover:bg-[#0a0850] hover:scale-105";

export default function NavStore() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="hidden text-[15px] font-medium text-ink sm:inline">Get the app</span>
      <a href={APP_STORE_URL} aria-label="Download OneRound on the App Store" className={circle}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16.36 12.78c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.28-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.43-3.64M14.09 5.83c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.68 1.37-.59.67-1.1 1.76-.96 2.79 1.02.08 2.06-.52 2.7-1.26" />
        </svg>
      </a>
      <a href={GOOGLE_PLAY_URL} aria-label="Get OneRound on Google Play" className={circle}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M7 4.84v14.32a1 1 0 0 0 1.53.85l11.2-7.16a1 1 0 0 0 0-1.7L8.53 3.99A1 1 0 0 0 7 4.84z" />
        </svg>
      </a>
    </div>
  );
}
