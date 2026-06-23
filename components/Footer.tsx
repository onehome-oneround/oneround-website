"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useAudience } from "./AudienceProvider";

/*
  Footer — a hard NAVY slab closing the broadsheet (hard cut from the blue CTA).
  Editorial grid with hairline rules, mono metadata, working socials, contact,
  the 18+ responsible-service line, and legal. Display copy "OneRound"; fine print
  uses the legal entity. Content unchanged.
*/

const INSTAGRAM = "https://instagram.com/oneroundapp";
const TIKTOK = "https://tiktok.com/@oneroundapp";
const EMAIL = "hello@oneround.au";

export default function Footer() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";
  const lead = isVenue ? "Their reason to " : "Your reason to ";
  const accent = isVenue ? "walk in" : "get out";
  const tagline = isVenue ? "Their reason to walk in." : "Your reason to get out.";
  return (
    <footer className="on-dark bg-navy px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-[96rem]">
        {/* Big sign-off */}
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
          </div>

          <nav className="lg:col-span-3" aria-label="Footer">
            <p className="kicker text-white/45">Index</p>
            <ul className="mt-4 space-y-3">
              {[
                { label: "How it works", href: "/#how-it-works" },
                { label: "FAQ", href: "/#faq" },
                // HIDDEN until launch - re-enable: venue partners
                // { label: "Partnered Venues", href: "/partnered-venues" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="font-display text-lg text-white/85 transition-colors hover:text-blue">
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
                <Link href="/privacy" className="font-display text-lg text-white/85 transition-colors hover:text-blue">Privacy</Link>
              </li>
              <li>
                <Link href="/terms" className="font-display text-lg text-white/85 transition-colors hover:text-blue">Terms</Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="kicker text-white/45">Follow</p>
            <div className="mt-4 flex gap-3">
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
          <p className="kicker text-white/45">© 2026 ONEROUND PTY LTD</p>
        </div>
      </div>
    </footer>
  );
}
