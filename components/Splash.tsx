"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ImagePlaceholder from "./ImagePlaceholder";
import { useAudience } from "./AudienceProvider";

/*
  Entry splash — "Choose your path". Full-viewport split (stacks on mobile):
  Users (blue) enters the consumer home; Run a venue? (navy) goes to /partners.
  Shown once per browser session (sessionStorage) so it isn't a nag, but appears
  on a fresh visit. Dismissable; both choices set the audience accent.
*/

const SEEN_KEY = "oneround-splash-seen";

export default function Splash() {
  const { setAudience } = useAudience();
  const [show, setShow] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY)) setShow(false);
    } catch {
      /* ignore */
    }
  }, []);

  function markSeen() {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  function enterConsumer() {
    setAudience("consumer");
    markSeen();
    setLeaving(true);
    setTimeout(() => setShow(false), 600);
  }

  function enterVenue() {
    setAudience("venue");
    markSeen();
    // navigation handled by the <Link>; no need to unmount manually
  }

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col bg-navy transition-opacity duration-500 lg:flex-row ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-label="Choose your path"
    >
      {/* Logo + hint, centred over the split */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col items-center gap-2 px-6 pt-8 text-center sm:pt-10">
        <Image
          src="/oneround-logo-white.png"
          alt="OneRound"
          width={150}
          height={25}
          priority
          className="h-6 w-auto sm:h-7"
        />
        <p className="kicker text-white/60">Choose your path</p>
      </div>

      {/* Users (consumer) */}
      <button
        type="button"
        onClick={enterConsumer}
        className="group relative flex-1 overflow-hidden text-left transition-[flex-grow] duration-500 lg:hover:flex-[1.2]"
      >
        <ImagePlaceholder
          label="splash-crowd-out"
          intent="Real photo — friends out and about in Brisbane. Energy, lights, crowd."
          tone="deep"
          align="top"
          className="absolute inset-0 h-full w-full"
        />
        <span
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(2,0,49,0.55), rgba(30,136,243,0.35) 60%, rgba(30,136,243,0.15))",
          }}
        />
        <span className="relative z-10 flex h-full flex-col justify-end gap-4 p-8 sm:p-12">
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-blue px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white">
            Users
          </span>
          <span className="font-display text-5xl font-extrabold leading-[0.9] tracking-[-0.03em] text-white sm:text-6xl">
            I&rsquo;m heading
            <br />
            out
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
            Enter
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-navy transition-transform group-hover:translate-x-1">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </span>
      </button>

      {/* divider */}
      <span className="relative z-10 hidden w-px bg-white/15 lg:block" />
      <span className="relative z-10 h-px w-full bg-white/15 lg:hidden" />

      {/* Run a venue (partner) */}
      <Link
        href="/partners"
        onClick={enterVenue}
        className="group relative flex-1 overflow-hidden transition-[flex-grow] duration-500 lg:hover:flex-[1.2]"
      >
        <ImagePlaceholder
          label="splash-venue-interior"
          intent="Real photo — a great-looking Brisbane venue interior, warm and busy."
          tone="deep"
          align="top"
          className="absolute inset-0 h-full w-full"
        />
        <span
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(2,0,49,0.85), rgba(2,0,49,0.55) 60%, rgba(2,0,49,0.3))",
          }}
        />
        <span className="relative z-10 flex h-full flex-col justify-end gap-4 p-8 sm:p-12">
          <span className="inline-flex items-center gap-2 self-start rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            Run a venue?
          </span>
          <span className="font-display text-5xl font-extrabold leading-[0.9] tracking-[-0.03em] text-white sm:text-6xl">
            I run
            <br />a venue
          </span>
          <span className="inline-flex items-center gap-2 text-sm font-bold text-white">
            See how it works
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-navy transition-transform group-hover:translate-x-1">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </span>
      </Link>
    </div>
  );
}
