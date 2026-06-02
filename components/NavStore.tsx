/*
  Nav download control — "Get the App" + two small circular store icons
  (Apple + Google Play in black circles). Replaces the old text "Download" pill.

  ⚠️ TODO before launch: point both at the real store URLs (see DownloadButtons.tsx).
*/

const APP_STORE_URL = "#"; // TODO: real App Store URL
const GOOGLE_PLAY_URL = "#"; // TODO: real Google Play URL

export default function NavStore() {
  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm font-bold text-ink sm:inline">
        Get the App
      </span>
      <a
        href={APP_STORE_URL}
        aria-label="Download OneRound on the App Store"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white transition hover:brightness-125 active:scale-95"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M16.36 12.78c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.28-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.43-3.64M14.09 5.83c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.68 1.37-.59.67-1.1 1.76-.96 2.79 1.02.08 2.06-.52 2.7-1.26" />
        </svg>
      </a>
      <a
        href={GOOGLE_PLAY_URL}
        aria-label="Get OneRound on Google Play"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-navy transition hover:brightness-125 active:scale-95"
      >
        <svg width="15" height="16" viewBox="0 0 512 512" aria-hidden="true">
          <path d="M48 59v394c0 6 3 11 8 14l228-211L56 45c-5 3-8 8-8 14z" fill="#34A853" />
          <path d="M380 196l-72-42-58 53 58 53 73-42c12-7 12-15-1-22z" fill="#FBBC04" />
          <path d="M56 45l228 158 58-53L96 18c-15-9-31-3-40 13z" fill="#EA4335" />
          <path d="M56 467l284-160-58-53L56 453c-1 6 0 11 0 14z" fill="#4285F4" />
        </svg>
      </a>
    </div>
  );
}
