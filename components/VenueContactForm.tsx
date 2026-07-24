"use client";

import { useState } from "react";

/*
  Venue partner enquiry form (venue-path Contact section). Mirrors WaitlistForm's
  delivery and state model, with three required fields (venue name, email, phone).

  DELIVERY. Posts to the SAME webhook as the consumer waitlist
  (NEXT_PUBLIC_WAITLIST_URL) — the Apps Script routes to the Venues sheet tab
  because `venueName` is present in the payload. Apps Script returns no CORS
  headers and an application/json body would trigger a preflight it can't answer,
  so this fires a "simple request": mode:"no-cors" + text/plain, JSON body
  unchanged; the script reads JSON.parse(e.postData.contents). A no-cors response
  is opaque, so a resolved fetch is treated as success.

  If the URL isn't set the form still renders; a submit logs a dev warning and
  shows the error state rather than throwing.

  CLS. Form, success and error share one fixed-min-height container, so a state
  change reflows nothing.
*/

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_CHARS = /^[+()\-\s\d]+$/;
const HONEYPOT_FIELD = "company_website";
const WAITLIST_URL = process.env.NEXT_PUBLIC_WAITLIST_URL;

const FIELD_CLASS =
  "min-h-[3.25rem] w-full rounded-lg border border-[color:rgba(var(--navy-rgb),0.15)] bg-white px-4 py-3.5 text-base text-[color:var(--navy)] outline-none transition placeholder:text-ink-faint focus:border-[color:rgba(var(--navy-rgb),0.4)] focus:ring-2 focus:ring-[color:rgba(var(--navy-rgb),0.15)]";

export default function VenueContactForm({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const venueName = String(data.get("venueName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const honeypot = String(data.get(HONEYPOT_FIELD) ?? "").trim();

    // Honeypot: a real user never sees this field. If it's filled, quietly show
    // success and post nothing — the bot learns nothing.
    if (honeypot) {
      setStatus("success");
      return;
    }

    if (!venueName) {
      setError("Enter your venue name.");
      return;
    }
    if (!email || !EMAIL.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!phone || !PHONE_CHARS.test(phone) || phone.replace(/\D/g, "").length < 8) {
      setError("Enter a valid phone number.");
      return;
    }

    setError(null);
    setStatus("sending");

    if (!WAITLIST_URL) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          "[VenueContactForm] NEXT_PUBLIC_WAITLIST_URL is not set — submissions can't be delivered.",
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
          venueName,
          email,
          phone,
          submittedAt: new Date().toISOString(),
        }),
      });
      setStatus("success");
    } catch {
      setError("Something went wrong. Try again in a moment.");
      setStatus("error");
    }
  }

  const sending = status === "sending";

  return (
    <div className={`flex min-h-[26rem] flex-col justify-center ${className}`}>
      {status === "success" ? (
        <p
          role="status"
          className="max-w-md text-base font-medium leading-relaxed text-[color:var(--navy)]"
        >
          Thanks &mdash; we&rsquo;ll be in touch shortly.
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

          {/* Three fields stacked vertically, each with a mono label above its
              input — a calm editorial column that fills the height beside the
              headline rather than crowding one row at the top. */}
          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="venueName" className="kicker text-ink-faint">
                Venue name
              </label>
              <input
                id="venueName"
                name="venueName"
                type="text"
                required
                placeholder="e.g. The Normanby"
                autoComplete="organization"
                aria-invalid={!!error}
                className={`mt-2 ${FIELD_CLASS}`}
              />
            </div>
            <div>
              <label htmlFor="email" className="kicker text-ink-faint">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@yourvenue.com"
                autoComplete="email"
                aria-invalid={!!error}
                className={`mt-2 ${FIELD_CLASS}`}
              />
            </div>
            <div>
              <label htmlFor="phone" className="kicker text-ink-faint">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="0400 000 000"
                autoComplete="tel"
                aria-invalid={!!error}
                className={`mt-2 ${FIELD_CLASS}`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="mt-7 flex min-h-[3.25rem] w-full shrink-0 items-center justify-center rounded-lg bg-navy px-5 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[color:var(--navy-hover)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {sending ? "Sending…" : "Apply to partner"}
          </button>

          {/* Reserved error slot so an error appearing pushes nothing. */}
          <p
            aria-live="polite"
            className="min-h-[1.5rem] pt-2 text-[0.8125rem] leading-[1.125rem] text-[color:var(--navy)]"
          >
            {error ?? ""}
          </p>
        </form>
      )}
    </div>
  );
}
