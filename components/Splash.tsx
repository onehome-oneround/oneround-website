"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAudience } from "./AudienceProvider";

/*
  Entry splash — "Choose your path". A hard two-slab split (Users = blue,
  Venues = navy) that stacks on mobile. Type-dominant editorial: mono label +
  giant Fraunces. Shown once per browser session; both choices set the accent.

  Flash: `show` starts true because SSR cannot read sessionStorage, so returning
  visitors used to get a full-screen splash painted and then yanked away once the
  effect ran. The pre-paint script in app/layout.tsx now sets data-splash-seen on
  <html> before paint and globals.css hides [data-splash-root] on that, so this
  still mounts-then-unmounts but is never visible. markSeen() sets the attribute
  too, so a client-side remount of this route stays covered.

  SEEN_KEY is duplicated in that inline script — keep the two in sync.
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
    // Mirror onto <html> so a client-side remount is hidden by CSS pre-paint,
    // without waiting for a full reload to re-run the inline script.
    document.documentElement.setAttribute("data-splash-seen", "1");
  }

  function enter(which: "consumer" | "venue") {
    setAudience(which);
    markSeen();
    setLeaving(true);
    setTimeout(() => setShow(false), 600);
  }

  if (!show) return null;

  return (
    <div
      data-splash-root
      className={`fixed inset-0 z-[60] flex flex-col transition-opacity duration-500 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-label="Choose your path"
    >
      {/* Masthead — navy bar so the two-tone logo stays legible */}
      <div className="flex shrink-0 items-center justify-between bg-navy px-6 py-4 sm:px-8">
        <Image src="/oneround-logo-white.png" alt="OneRound" width={150} height={25} priority className="h-6 w-auto" />
        <span className="kicker text-white/55">Choose your path</span>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row">
      {/* Users — hero photo background */}
      <button
        type="button"
        onClick={() => enter("consumer")}
        className="group relative flex flex-1 flex-col justify-end overflow-hidden p-8 text-left sm:p-12"
      >
        <Image
          src="/images/newhere-user.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-300 ease-out group-hover:opacity-80"
          style={{
            background:
              "linear-gradient(to top, rgba(2,0,49,0.86) 0%, rgba(2,0,49,0.45) 55%, rgba(2,0,49,0.34) 100%)",
          }}
        />
        <span className="kicker relative z-10 text-white/75">01 / I&rsquo;m heading out</span>
        <span
          className="relative z-10 mt-4 text-white"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: "0.9", fontWeight: 600 }}
        >
          Users
        </span>
        <span className="relative z-10 mt-6 flex items-center gap-3 font-display text-lg italic text-white">
          Enter
          <span className="flex h-9 w-9 items-center justify-center bg-white text-navy">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </button>

      {/* Venues — hero photo background */}
      <button
        type="button"
        onClick={() => enter("venue")}
        className="group relative flex flex-1 flex-col justify-end overflow-hidden p-8 text-left sm:p-12"
      >
        <Image
          src="/images/newhero-venue.png"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-300 ease-out group-hover:opacity-80"
          style={{
            background:
              "linear-gradient(to top, rgba(2,0,49,0.88) 0%, rgba(2,0,49,0.5) 55%, rgba(2,0,49,0.4) 100%)",
          }}
        />
        <span className="kicker relative z-10 text-white/75">02 / I run a venue</span>
        <span
          className="relative z-10 mt-4 text-white"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: "0.9", fontWeight: 600 }}
        >
          Venues
        </span>
        <span className="relative z-10 mt-6 flex items-center gap-3 font-display text-lg italic text-white">
          See how it works
          <span className="flex h-9 w-9 items-center justify-center bg-blue text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </span>
      </button>
      </div>
    </div>
  );
}
