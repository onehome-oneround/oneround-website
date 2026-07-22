"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useConsent } from "./ConsentProvider";

/*
  Consent banner — a slim, single-row notice that stays out of the way of the
  hero's interactive elements (the earlier floating card overlapped the countdown
  and CTAs, which read as a conversion killer).

  Layout is one flex row (message + Decline + Accept) at both sizes:
  - Mobile: a full-width strip flush to the bottom edge (inset-x-0 bottom-0), the
    least intrusive footprint, with a safe-area inset so the buttons clear the
    home indicator.
  - Desktop: the same row as a compact rounded card in the bottom-right corner.

  It renders only once the client has read the stored choice (`ready`) AND that
  choice is unknown, so it is never in the first paint and never flashes for a
  returning visitor. Fixed positioning keeps it out of flow, so it costs no CLS.

  Deliberately non-modal: it does not trap focus or block the page, and Escape
  does nothing — the choice is explicit, made only via Decline / Accept (or the
  footer's "Cookie preferences" link, which reopens it). Focus moves to Accept
  on mount so a keyboard user can confirm with Enter.
*/

export default function ConsentGate() {
  const { consent, setConsent, ready } = useConsent();
  const acceptRef = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState(false);

  const visible = ready && consent === "unknown";

  useEffect(() => {
    if (!visible) return;
    // Reveal on the next frame: move focus to Accept and start the slide-in.
    // setState lives in the rAF, not the effect body, so it stays lint-clean.
    const id = requestAnimationFrame(() => {
      acceptRef.current?.focus({ preventScroll: true });
      setShown(true);
    });
    return () => cancelAnimationFrame(id);
  }, [visible]);

  if (!visible) return null;

  // The banner only renders on the client (post-hydration), so matchMedia is safe.
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealed = shown || reduce;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[90] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-[34rem]"
      style={{
        transform: revealed ? "translateY(0)" : "translateY(12px)",
        opacity: revealed ? 1 : 0,
        transition: reduce ? "none" : "transform 200ms ease, opacity 200ms ease",
      }}
    >
      <div
        className="flex items-center gap-2 border-t border-[color:var(--rule)] bg-white px-4 pb-[calc(0.5rem_+_env(safe-area-inset-bottom))] pt-2 sm:gap-3 sm:rounded-xl sm:border sm:px-5 sm:py-3"
        style={{ boxShadow: "0 0 34px -8px rgba(var(--navy-rgb), 0.3)" }}
      >
        <p className="min-w-0 flex-1 text-xs leading-snug text-[color:var(--navy)] sm:text-sm">
          We use analytics and ad tracking.{" "}
          <Link
            href="/privacy"
            className="whitespace-nowrap underline underline-offset-2 hover:text-[color:var(--blue)]"
          >
            See our Privacy Policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={() => setConsent("declined")}
          className="flex min-h-11 shrink-0 items-center rounded-lg px-3 text-sm font-medium text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--navy)]"
        >
          Decline
        </button>
        <button
          ref={acceptRef}
          type="button"
          onClick={() => setConsent("accepted")}
          className="flex min-h-11 shrink-0 items-center rounded-lg bg-[color:var(--blue)] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
