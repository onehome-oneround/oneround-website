"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useConsent } from "./ConsentProvider";

/*
  Consent card — a calm, editorial notice pinned to the bottom-right of the
  viewport (full-width on mobile). It renders only once the client has read the
  stored choice (`ready`) AND that choice is genuinely unknown, so it is never in
  the first paint and never flashes for a returning visitor. Fixed positioning
  keeps it out of flow, so it costs no CLS.

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

  // The card only renders on the client (post-hydration), so matchMedia is safe.
  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealed = shown || reduce;

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-4 z-[90] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[380px]"
      style={{
        transform: revealed ? "translateY(0)" : "translateY(12px)",
        opacity: revealed ? 1 : 0,
        transition: reduce ? "none" : "transform 200ms ease, opacity 200ms ease",
      }}
    >
      <div
        className="rounded-xl bg-white p-5"
        style={{ boxShadow: "0 12px 40px -12px rgba(var(--navy-rgb), 0.35)" }}
      >
        <p className="text-sm leading-relaxed text-[color:var(--navy)]">
          We use analytics and ad tracking. See our{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-[color:var(--blue)]"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => setConsent("declined")}
            className="rounded-lg px-3 py-2 text-sm font-medium text-[color:var(--ink-soft)] transition-colors hover:text-[color:var(--navy)]"
          >
            Decline
          </button>
          <button
            ref={acceptRef}
            type="button"
            onClick={() => setConsent("accepted")}
            className="rounded-lg bg-[color:var(--blue)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
