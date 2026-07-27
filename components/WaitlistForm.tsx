"use client";

import { useState } from "react";

/*
  Pre-launch waitlist capture, under the Hero countdown (consumer path only).

  DELIVERY. Posts to a Google Apps Script webhook (NEXT_PUBLIC_WAITLIST_URL,
  added in Vercel later). Apps Script web apps don't return CORS headers, so a
  normal cors request is blocked reading the response, and an application/json
  body would trigger a preflight the script can't answer. So this fires a
  "simple request": mode:"no-cors" + text/plain, JSON body unchanged
  ({ name, email, submittedAt }); the script reads JSON.parse(e.postData
  .contents). A no-cors response is opaque, so a resolved fetch is treated as
  success — the client can't see the status, which is fine for a waitlist ping.

  First name is collected too: it's shown (first name only) in the live activity
  ticker on the hero. Validated to letters + basic name punctuation so nothing
  unsafe reaches that public display; the privacy line links to the policy.

  If the URL isn't set yet, the form still renders; a submit logs a dev warning
  and shows the error state rather than throwing.

  CLS. The form, success and error all live in one fixed-min-height container, so
  submitting reflows nothing.
*/

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Letters (any script) plus the punctuation real first names use — spaces,
// hyphens, apostrophes. No digits or other symbols, so the value is safe to
// render in the public activity ticker. Length is capped separately.
const NAME = /^[\p{L}][\p{L} '’-]*$/u;
const HONEYPOT_FIELD = "company_website";
const WAITLIST_URL = process.env.NEXT_PUBLIC_WAITLIST_URL;

const FIELD_CLASS =
  "min-h-11 w-full rounded-lg border border-[color:rgba(var(--navy-rgb),0.15)] bg-[color:var(--paper)] px-4 text-base text-[color:var(--navy)] outline-none transition placeholder:text-ink-faint focus:border-[color:rgba(var(--navy-rgb),0.4)] focus:ring-2 focus:ring-[color:rgba(var(--navy-rgb),0.15)]";

export default function WaitlistForm({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const honeypot = String(data.get(HONEYPOT_FIELD) ?? "").trim();

    // Honeypot: a real user never sees this field. If it's filled, quietly show
    // success and post nothing — the bot learns nothing.
    if (honeypot) {
      setStatus("success");
      return;
    }

    if (!name || name.length > 40 || !NAME.test(name)) {
      setError("Enter your first name (letters only).");
      return;
    }
    if (!email || !EMAIL.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError(null);
    setStatus("sending");

    if (!WAITLIST_URL) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[WaitlistForm] NEXT_PUBLIC_WAITLIST_URL is not set — submissions can't be delivered.",
        );
      }
      setError("Something went wrong. Try again in a moment.");
      setStatus("error");
      return;
    }

    try {
      await fetch(WAITLIST_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name,
          email,
          submittedAt: new Date().toISOString(),
        }),
      });
      // Meta Pixel Lead — fired ONLY here, on a genuine submitted signup: not on
      // page load, validation errors, the no-URL error, or the honeypot/bot path
      // (which shows success but never reaches this request). Optional-chained so
      // it's a no-op when the pixel isn't loaded (no consent / dev).
      window.fbq?.("track", "Lead");
      setStatus("success");
    } catch {
      setError("Something went wrong. Try again in a moment.");
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <div className={`min-h-[11.5rem] sm:min-h-[8rem] ${className}`}>
      {status === "success" ? (
        <p
          role="status"
          className="max-w-md text-base font-medium leading-relaxed text-[color:var(--navy)]"
        >
          You&rsquo;re on the list. We&rsquo;ll email you when we launch.
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="max-w-md">
          {/* Honeypot — a bait field a bot fills but a human never sees. Hidden
              by positioning it far OFF-SCREEN with inline styles (not
              display:none / opacity:0 / zero-size, which some password managers
              and accessibility tools ignore and then render), plus out of the
              tab order and the a11y tree. There is no visible label, so nothing
              shows even if CSS never loads. A filled value is silently rejected
              on submit. */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "-9999px",
              top: "-9999px",
              width: "1px",
              height: "1px",
              overflow: "hidden",
            }}
          >
            <input
              name={HONEYPOT_FIELD}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
          </div>

          <input
            name="name"
            type="text"
            required
            maxLength={40}
            placeholder="Sarah"
            aria-label="First name"
            autoComplete="given-name"
            aria-invalid={!!error}
            className={FIELD_CLASS}
          />

          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:gap-3">
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
              autoComplete="email"
              aria-invalid={!!error}
              className={FIELD_CLASS}
            />
            <button
              type="submit"
              disabled={sending}
              className="flex min-h-11 w-full shrink-0 items-center justify-center rounded-lg bg-navy px-5 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[color:var(--navy-hover)] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:min-w-[11rem]"
            >
              {sending ? "Adding you…" : "Join the waitlist"}
            </button>
          </div>

          {/* Reserved error slot so an error appearing pushes nothing. */}
          <p
            aria-live="polite"
            className="min-h-[1.5rem] pt-1.5 text-[0.8125rem] leading-[1.125rem] text-[color:var(--navy)]"
          >
            {error ?? ""}
          </p>
        </form>
      )}
    </div>
  );
}
