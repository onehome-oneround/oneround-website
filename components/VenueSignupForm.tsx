"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/*
  Venue signup form — venue path only, rendered inside the Contact section.

  Replaces the previous mailto: form. That version handed the visitor off to
  their mail client, which silently does nothing for anyone on webmail without a
  registered handler — the lead was lost with no error and no record. This posts
  to /api/venue-signup instead.

  COLOUR. The palette has no red. Rather than invent one, an invalid field takes
  full --ink for its message and a solid --ink border in place of the faint
  --rule. Colour must not be the only carrier of meaning anyway (WCAG 1.4.1), so
  the message text, aria-invalid and the focus move are what actually
  communicate the failure.

  CLS. Every field renders its error slot at all times at a fixed min-height,
  empty until it has something to say, so a message appearing pushes nothing.
  Keep error copy to a single line — a two-line message would defeat this.

  SPAM. Three layers, all invisible to real users: a honeypot field, a
  render-timestamp the server uses to reject sub-3-second submissions, and the
  Origin/Host check in the route handler. No captcha.
*/

const HONEYPOT_FIELD = "company_website";

const VENUE_TYPES = ["Pub", "Bar", "Club", "Restaurant", "Cafe", "Other"];

const ABOUT_MAX = 500;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldName =
  | "venueName"
  | "contactName"
  | "email"
  | "phone"
  | "venueType"
  | "capacity"
  | "role"
  | "suburb"
  | "about";

type Errors = Partial<Record<FieldName, string>>;

// Order matters: focus moves to the first invalid field in this sequence, which
// must match reading order or focus appears to jump backwards.
const FOCUS_ORDER: FieldName[] = [
  "venueName",
  "contactName",
  "email",
  "phone",
  "venueType",
  "capacity",
  "role",
  "suburb",
  "about",
];

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};
  if (!values.venueName) errors.venueName = "Venue name is required.";
  if (!values.contactName) errors.contactName = "Contact name is required.";
  if (!values.email) errors.email = "Email is required.";
  else if (!EMAIL.test(values.email))
    errors.email = "Enter a valid email address.";
  if (!values.phone) errors.phone = "Phone is required.";
  if (!values.venueType) errors.venueType = "Select a venue type.";

  if (!values.capacity) errors.capacity = "Approximate capacity is required.";
  else {
    const n = Number(values.capacity);
    if (!Number.isInteger(n) || n < 1)
      errors.capacity = "Enter a whole number greater than zero.";
  }

  if (values.about.length > ABOUT_MAX)
    errors.about = `Keep this under ${ABOUT_MAX} characters.`;

  return errors;
}

const labelClass = "kicker text-ink-faint";

function fieldClass(invalid: boolean) {
  return [
    "mt-2 w-full border bg-white px-4 py-3 text-base text-ink outline-none",
    "transition focus:ring-2 focus:ring-[color:var(--accent)]/25",
    invalid
      ? "border-[color:var(--ink)] focus:border-[color:var(--ink)]"
      : "border-[color:var(--rule)] focus:border-[color:var(--accent)]",
  ].join(" ");
}

/* Fixed-height slot so an error appearing never moves the layout. */
function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <p
      id={id}
      // polite, not assertive: the focus move already takes the user to the
      // field, so an assertive interrupt would double-announce.
      aria-live="polite"
      // min-h must cover padding + line box, not just the line: box-sizing is
      // border-box, so min-h-[1.125rem] would include the pt-1 and the filled
      // state (4px + 18px) would overflow the reservation by exactly 4px and
      // shift everything below. 1.375rem = pt-1 (4px) + leading (18px).
      className="min-h-[1.375rem] pt-1 text-[0.6875rem] leading-[1.125rem] text-ink"
    >
      {message ?? ""}
    </p>
  );
}

export default function VenueSignupForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  // Set after mount, never during render: the page is statically prerendered,
  // so a build-time timestamp would make every visitor look instant to the
  // server's timing gate.
  const renderedAt = useRef<number | null>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  function focusFirstInvalid(next: Errors) {
    const first = FOCUS_ORDER.find((name) => next[name]);
    if (!first || !formRef.current) return;
    formRef.current.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Immediate feedback before any await, so the button never sits idle-looking
    // while the request is in flight.
    setFormError(null);

    const data = new FormData(event.currentTarget);
    const read = (key: string) => String(data.get(key) ?? "").trim();
    const values = Object.fromEntries(
      FOCUS_ORDER.map((name) => [name, read(name)]),
    ) as Record<FieldName, string>;

    const clientErrors = validate(values);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      focusFirstInvalid(clientErrors);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const response = await fetch("/api/venue-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          [HONEYPOT_FIELD]: read(HONEYPOT_FIELD),
          renderedAt: renderedAt.current,
        }),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }

      const payload = await response.json().catch(() => null);
      // The form stays mounted and filled either way, so a retry costs nothing.
      if (payload?.errors) {
        setErrors(payload.errors as Errors);
        focusFirstInvalid(payload.errors as Errors);
        setStatus("idle");
        return;
      }
      setFormError(
        payload?.error ?? "Something went wrong. Please try again.",
      );
      setStatus("idle");
    } catch {
      setFormError(
        "Could not reach the server. Check your connection and try again.",
      );
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="border border-[color:var(--rule)] bg-white p-8 outline-none sm:p-10"
      >
        <p className="kicker text-navy">Application received</p>
        <p className="mt-4 font-display text-2xl leading-tight text-ink sm:text-3xl">
          Thanks — we&apos;ll be in touch within 24 hours.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          We&apos;ve got your details. If it&apos;s urgent, reach us directly at{" "}
          <a
            href="mailto:hello@oneround.au"
            className="underline underline-offset-4"
          >
            hello@oneround.au
          </a>
          .
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col">
      {/* Honeypot. Not display:none — some bots skip hidden inputs, but they do
          fill anything they can read in the markup. Kept out of the tab order
          and off the accessibility tree so no real user can reach it. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-x-5 sm:grid-cols-2">
        <div>
          <label htmlFor="venueName" className="block">
            <span className={labelClass}>Venue name</span>
          </label>
          <input
            id="venueName"
            name="venueName"
            type="text"
            autoComplete="organization"
            aria-invalid={!!errors.venueName}
            aria-describedby="venueName-error"
            className={fieldClass(!!errors.venueName)}
          />
          <FieldError id="venueName-error" message={errors.venueName} />
        </div>

        <div>
          <label htmlFor="contactName" className="block">
            <span className={labelClass}>Contact person</span>
          </label>
          <input
            id="contactName"
            name="contactName"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.contactName}
            aria-describedby="contactName-error"
            className={fieldClass(!!errors.contactName)}
          />
          <FieldError id="contactName-error" message={errors.contactName} />
        </div>

        <div>
          <label htmlFor="email" className="block">
            <span className={labelClass}>Email</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            className={fieldClass(!!errors.email)}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div>
          <label htmlFor="phone" className="block">
            <span className={labelClass}>Phone</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby="phone-error"
            className={fieldClass(!!errors.phone)}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>

        <div>
          <label htmlFor="venueType" className="block">
            <span className={labelClass}>Venue type</span>
          </label>
          <select
            id="venueType"
            name="venueType"
            defaultValue=""
            aria-invalid={!!errors.venueType}
            aria-describedby="venueType-error"
            className={fieldClass(!!errors.venueType)}
          >
            <option value="" disabled>
              Select one
            </option>
            {VENUE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <FieldError id="venueType-error" message={errors.venueType} />
        </div>

        <div>
          <label htmlFor="capacity" className="block">
            <span className={labelClass}>Approx. capacity</span>
          </label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            aria-invalid={!!errors.capacity}
            aria-describedby="capacity-error"
            className={fieldClass(!!errors.capacity)}
          />
          <FieldError id="capacity-error" message={errors.capacity} />
        </div>

        <div>
          <label htmlFor="role" className="block">
            <span className={labelClass}>Your role (optional)</span>
          </label>
          <input
            id="role"
            name="role"
            type="text"
            placeholder="e.g. owner, manager"
            className={fieldClass(false)}
          />
          <FieldError id="role-error" />
        </div>

        <div>
          <label htmlFor="suburb" className="block">
            <span className={labelClass}>Suburb (optional)</span>
          </label>
          <input
            id="suburb"
            name="suburb"
            type="text"
            placeholder="e.g. Fortitude Valley"
            autoComplete="address-level2"
            className={fieldClass(false)}
          />
          <FieldError id="suburb-error" />
        </div>
      </div>

      <div>
        <label htmlFor="about" className="block">
          <span className={labelClass}>
            Tell us about your venue (optional)
          </span>
        </label>
        <textarea
          id="about"
          name="about"
          rows={4}
          maxLength={ABOUT_MAX}
          aria-invalid={!!errors.about}
          aria-describedby="about-error"
          className={`${fieldClass(!!errors.about)} resize-y`}
        />
        <FieldError id="about-error" message={errors.about} />
      </div>

      <p className="mt-6 text-[0.8125rem] leading-relaxed text-ink-faint">
        By submitting, you agree to our{" "}
        <Link href="/privacy" className="underline underline-offset-4">
          Privacy Policy
        </Link>
        .
      </p>

      <button
        type="submit"
        disabled={sending}
        className="mt-4 inline-flex items-center gap-4 self-start bg-[color:var(--accent)] px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span>{sending ? "Sending..." : "Apply to partner"}</span>
        <span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 12h15m-6-6 6 6-6 6"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* Reserved slot, same reasoning as the per-field errors: 1.875rem is
          pt-3 (12px) + leading (18px). */}
      <p
        aria-live="polite"
        className="min-h-[1.875rem] pt-3 text-[0.8125rem] leading-[1.125rem] text-ink"
      >
        {formError ?? ""}
      </p>
    </form>
  );
}
