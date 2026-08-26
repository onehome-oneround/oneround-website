"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import DownloadButtons from "./DownloadButtons";
import { useAudience } from "./AudienceProvider";
import { useConsent } from "./ConsentProvider";
import { hashTarget, scrollToHashId } from "./hashNav";

/*
  Footer — a NAVY slab closing the broadsheet. Editorial grid with hairline
  rules, mono metadata, working socials, contact, the 18+ responsible-service
  line, and legal. Display copy "OneRound"; fine print uses the legal entity.

  A top fade eases the paper-neutral Contact section above into this navy close,
  so the page ends on a tonal step rather than the old hard cut.
*/

const FACEBOOK = "https://www.facebook.com/oneroundapp";
const INSTAGRAM = "https://instagram.com/oneroundapp";
const TIKTOK = "https://tiktok.com/@oneroundapp";
const EMAIL = "hello@oneround.au";

export default function Footer() {
  const { audience } = useAudience();
  const { setConsent } = useConsent();
  const pathname = usePathname();
  const isVenue = audience === "venue";

  // Same-page hash links (How it works / FAQ) scroll themselves on the home
  // page — Next's <Link> won't re-scroll when the href matches the current url.
  // See hashNav.ts. Off the home page the Link routes to "/#…" as usual.
  function onHashClick(e: React.MouseEvent, href: string) {
    const id = hashTarget(href);
    if (id && pathname === "/") {
      e.preventDefault();
      scrollToHashId(id);
    }
  }
  const lead = isVenue ? "Their reason to " : "Your reason to ";
  const accent = isVenue ? "walk in" : "get out";
  const tagline = isVenue ? "Their reason to walk in." : "Your reason to get out.";
  return (
    <footer className="on-dark relative bg-navy px-5 py-14 sm:px-8">
      <div className="relative z-10 mx-auto max-w-[96rem]">
        {/* Big sign-off. A lighter (weight 500), smaller closing statement, not a
            section heading — deliberately off the display-* ramp so it doesn't
            compete with the section headings; display-section would make it
            6rem/600 and read as another section head. */}
        <div className="hair-b grid grid-cols-1 gap-8 pb-12 lg:grid-cols-12 lg:items-end">
          <p
            className="font-display text-white lg:col-span-8"
            style={{ fontSize: "clamp(2rem, 4.4vw, 4rem)", lineHeight: "1.02", fontWeight: 500 }}
          >
            {lead}<span className="italic text-blue">{accent}.</span>
          </p>
          <div className="lg:col-span-4 lg:text-right">
            <a href={`mailto:${EMAIL}`} className="font-display text-xl italic text-white underline-offset-4 hover:underline">
              {EMAIL}
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-8 py-12 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-5">
            <Logo variant="white" height={24} />
            <p className="mt-5 max-w-xs text-sm text-white/60">
              OneRound. {tagline}
            </p>
            {/* Download badges — white (onDark) colourway for the navy slab. */}
            <DownloadButtons className="mt-6" onDark />
          </div>

          <nav className="lg:col-span-3" aria-label="Footer">
            <p className="kicker text-white/45">Index</p>
            <ul className="mt-4 space-y-3">
              {[
                { label: "How it works", href: "/#how-it-works" },
                { label: "FAQ", href: "/#faq" },
                { label: "Partnered Venues", href: "/partnered-venues" },
                { label: "About", href: "/about" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={(e) => onHashClick(e, l.href)}
                    className="font-display text-lg text-white/85 transition-colors hover:text-blue"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <p className="kicker text-white/45">Legal</p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/privacy" className="font-display text-lg text-white/85 transition-colors hover:text-blue">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms" className="font-display text-lg text-white/85 transition-colors hover:text-blue">Terms</Link>
              </li>
              <li>
                <Link href="/venue-terms" className="font-display text-lg text-white/85 transition-colors hover:text-blue">Venue Terms</Link>
              </li>
              <li>
                <Link href="/weekly-wins-terms" className="font-display text-lg text-white/85 transition-colors hover:text-blue">Weekly Wins Terms</Link>
              </li>
              <li>
                <Link href="/bar-tab-giveaway-terms" className="font-display text-lg text-white/85 transition-colors hover:text-blue">Bar Tab Giveaway Terms</Link>
              </li>
              <li>
                {/* Reopens the consent card so a visitor can revisit their
                    tracking choice. A button, not a link — it changes state. */}
                <button
                  type="button"
                  onClick={() => setConsent("unknown")}
                  className="font-display text-lg text-left text-white/85 transition-colors hover:text-blue"
                >
                  Cookie preferences
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="kicker text-white/45">Follow</p>
            <div className="mt-4 flex gap-3">
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OneRound on Facebook"
                className="tactile flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-blue hover:text-blue"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5Z" />
                </svg>
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="OneRound on Instagram"
                className="tactile flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-blue hover:text-blue"
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
                className="tactile flex h-11 w-11 items-center justify-center border border-white/25 text-white transition-colors hover:border-blue hover:text-blue"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9v2.6c-1.3.1-2.5-.2-3.6-.8v5.6c0 3.2-2.4 5.7-5.6 5.7A5.5 5.5 0 0 1 5.3 14a5.4 5.4 0 0 1 5.9-5.4v2.7a2.8 2.8 0 0 0-1-.2 2.8 2.8 0 0 0-2.3 4.4 2.8 2.8 0 0 0 5.1-1.6V3h3.5Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Fine print */}
        <div className="hair-t flex flex-col gap-3 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="kicker text-white/45">
            18+. We support the responsible service and consumption of alcohol
          </p>
          <div className="flex flex-col gap-1 sm:items-end">
            <p className="kicker text-white/45">© 2026 ONEROUND PTY LTD</p>
            <p className="kicker text-white/45">ABN 53 691 600 263</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
