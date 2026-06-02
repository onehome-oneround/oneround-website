import Link from "next/link";
import Logo from "./Logo";

/*
  Footer — every page, light theme. Navy logo, working socials, contact, 18+
  responsible-service line, legal, and links. Display copy uses "OneRound"; fine
  print uses the full legal entity "ONEROUND PTY LTD".
*/

const INSTAGRAM = "https://instagram.com/oneroundapp";
const TIKTOK = "https://tiktok.com/@oneroundapp";
const EMAIL = "hello@oneround.au";

export default function Footer() {
  return (
    <footer className="border-t border-[color:var(--line)] bg-offwhite px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Logo variant="navy" height={26} />
            <p className="mt-4 text-sm text-ink-soft">
              OneRound — however you go out, one app.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:items-end">
            <div className="flex items-center gap-3">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OneRound on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] text-ink-soft transition hover:border-accent hover:text-accent"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
              </a>
              <a
                href={TIKTOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OneRound on TikTok"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--line)] text-ink-soft transition hover:border-accent hover:text-accent"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9v2.6c-1.3.1-2.5-.2-3.6-.8v5.6c0 3.2-2.4 5.7-5.6 5.7A5.5 5.5 0 0 1 5.3 14a5.4 5.4 0 0 1 5.9-5.4v2.7a2.8 2.8 0 0 0-1-.2 2.8 2.8 0 0 0-2.3 4.4 2.8 2.8 0 0 0 5.1-1.6V3h3.5Z" />
                </svg>
              </a>
            </div>
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm font-semibold text-ink transition hover:text-accent"
            >
              {EMAIL}
            </a>
          </div>
        </div>

        <p className="border-t border-[color:var(--line)] pt-6 text-xs text-ink-faint">
          18+. We support the responsible service and consumption of alcohol.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-faint">
            © 2026 ONEROUND PTY LTD. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-ink-soft">
            <Link href="/privacy" className="transition hover:text-ink">
              Privacy
            </Link>
            <span className="text-ink-faint/40">·</span>
            <Link href="/terms" className="transition hover:text-ink">
              Terms
            </Link>
            <span className="text-ink-faint/40">·</span>
            <Link href="/#faq" className="transition hover:text-ink">
              FAQ
            </Link>
            <span className="text-ink-faint/40">·</span>
            <Link href="/partners" className="transition hover:text-ink">
              For Venues
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
