"use client";

import { useState } from "react";

/*
  Pre-launch waitlist capture, under the Hero countdown (consumer path only).

  DELIVERY. Posts to a Google Apps Script webhook (NEXT_PUBLIC_WAITLIST_URL,
  added in Vercel later). Apps Script web apps don't return CORS headers, so a
  normal cors request is blocked reading the response, and an application/json
  body would trigger a preflight the script can't answer. So this fires a
  "simple request": mode:"no-cors" + text/plain, JSON body unchanged
  ({ email, submittedAt }); the script reads JSON.parse(e.postData.contents). A
  no-cors response is opaque, so a resolved fetch is treated as success — the
  client can't see the status, which is fine for a waitlist ping.

  If the URL isn't set yet, the form still renders; a submit logs a dev warning
  and shows the error state rather than throwing.

  CLS. The form, success and error all live in one fixed-min-height container, so
  submitting reflows nothing.
*/

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HONEYPOT_FIELD = "company_website";
const WAITLIST_URL = process.env.NEXT_PUBLIC_WAITLIST_URL;

export default function WaitlistForm({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const honeypot = String(data.get(HONEYPOT_FIELD) ?? "").trim();

    // Honeypot: a real user never sees this field. If it's filled, quietly show
    // success and post nothing — the bot learns nothing.
    if (honeypot) {
      setStatus("success");
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
        body: JSON.stringify({ email, submittedAt: new Date().toISOString() }),
      });
      setStatus("success");
    } catch {
      setError("Something went wrong. Try again in a moment.");
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <div className={`min-h-[7.5rem] sm:min-h-[4.5rem] ${className}`}>
      {status === "success" ? (
        <p
          role="status"
          className="max-w-md text-base font-medium leading-relaxed text-[color:var(--navy)]"
        >
          You&rsquo;re on the list. We&rsquo;ll email you when we launch.
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot — off the tab order and the a11y tree; no real user reaches it. */}
          <div
            aria-hidden="true"
            className="absolute h-0 w-0 overflow-hidden opacity-0"
          >
            <label htmlFor="company_website">Company website</label>
            <input
              id="company_website"
              name={HONEYPOT_FIELD}
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="flex max-w-md flex-col gap-2 sm:flex-row sm:gap-3">
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
              autoComplete="email"
              aria-invalid={!!error}
              className="min-h-11 w-full rounded-lg border border-[color:rgba(var(--navy-rgb),0.15)] bg-[color:var(--paper)] px-4 text-base text-[color:var(--navy)] outline-none transition placeholder:text-ink-faint focus:border-[color:rgba(var(--navy-rgb),0.4)] focus:ring-2 focus:ring-[color:rgba(var(--navy-rgb),0.15)]"
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
