"use client";

import { useState, useSyncExternalStore } from "react";
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

/*
  "Has this session already seen the splash?" is a read of sessionStorage, an
  external source, so it goes through useSyncExternalStore rather than an effect
  that calls setState. The previous version started `show` true and setState-d it
  false inside an effect, scheduling a second render pass on every page load.

  Read-only: nothing subscribes, because the only writer is markSeen() below and
  it does not need to notify.

  Note that useSyncExternalStore re-reads getSnapshot on EVERY render, not just
  on notify. markSeen() writes sessionStorage at the start of the dismiss, so
  `seen` DOES flip true on the very next render — which would unmount the splash
  instantly and cut off the 600ms leave transition. The render gate below guards
  against that by ignoring `seen` while a dismiss is in flight.
*/
function subscribeSeen() {
  return () => {};
}

function getSeenSnapshot(): boolean {
  try {
    return Boolean(sessionStorage.getItem(SEEN_KEY));
  } catch {
    return false;
  }
}

/* The server cannot read sessionStorage, so it always renders the splash —
   matching the old `useState(true)`. globals.css hides it pre-paint via
   data-splash-seen, so a returning visitor never actually sees it. */
function getSeenServerSnapshot(): boolean {
  return false;
}

export default function Splash() {
  const { setAudience } = useAudience();
  const seen = useSyncExternalStore(
    subscribeSeen,
    getSeenSnapshot,
    getSeenServerSnapshot,
  );
  const [dismissed, setDismissed] = useState(false);
  const [leaving, setLeaving] = useState(false);

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
    // setLeaving BEFORE markSeen: markSeen writes sessionStorage, which flips
    // `seen` on the next render, and the gate below needs `leaving` already true
    // by then or the splash unmounts before it can fade. Both are batched inside
    // this handler, so the next render sees both.
    setLeaving(true);
    markSeen();
    setTimeout(() => setDismissed(true), 600);
  }

  // `leaving` overrides `seen` so the fade can play; `dismissed` is the timeout
  // landing, and is the only thing that actually unmounts after a choice.
  if (dismissed) return null;
  if (seen && !leaving) return null;

  return (
    <div
      data-splash-root
      className={`focus-on-dark fixed inset-0 z-[60] flex flex-col transition-opacity duration-500 ${
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
              "linear-gradient(to top, rgba(var(--navy-rgb),0.86) 0%, rgba(var(--navy-rgb),0.45) 55%, rgba(var(--navy-rgb),0.34) 100%)",
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
              "linear-gradient(to top, rgba(var(--navy-rgb),0.88) 0%, rgba(var(--navy-rgb),0.5) 55%, rgba(var(--navy-rgb),0.4) 100%)",
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
