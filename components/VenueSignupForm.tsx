"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/*
  Venue signup form — venue path only, rendered inside the Contact section.

  Submits via mailto: on a valid submission the visitor's email client opens with
  To / Subject / Body pre-filled, and they click send. There is no server-side
  email — the JSON POST to /api/venue-signup is retained for a future portal
  integration but is no longer called from here. The trade-off is deliberate: a
  mailto does nothing for someone on webmail with no registered handler, so the
  success state tells the visitor to click send and gives hello@oneround.au as a
  direct fallback.

  COLOUR. The palette has no red. Rather than invent one, an invalid field takes
  full --ink for its message and a solid --ink border in place of the faint
  --rule. Colour must not be the only carrier of meaning anyway (WCAG 1.4.1), so
  the message text, aria-invalid and the focus move are what actually
  communicate the failure.

  CLS. Every field renders its error slot at all times at a fixed min-height,
  empty until it has something to say, so a message appearing pushes nothing.
  Keep error copy to a single line — a two-line message would defeat this.

  SPAM. Two client-side gates, invisible to real users: a honeypot field and a
  render-timestamp used to reject sub-3-second submissions. Either one silently
  aborts before the mailto opens. No captcha. (The old Origin/Host check lived in
  the route handler, which this form no longer calls.)
*/

const HONEYPOT_FIELD = "company_website";

const VENUE_TYPES = ["Pub", "Bar", "Club", "Restaurant", "Cafe", "Other"];

const ABOUT_MAX = 500;

// A human cannot read, tab through and complete this form in under three
// seconds; anything faster is scripted, so we silently abort before the mailto.
const MIN_FILL_MS = 3000;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldName =
  | "venueName"
  | "contactName"
  | "email"
  | "phone"
  | "venueType"
  | "capacity"
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
  const [status, setStatus] = useState<"idle" | "success">("idle");

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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const read = (key: string) => String(data.get(key) ?? "").trim();
    const values = Object.fromEntries(
      FOCUS_ORDER.map((name) => [name, read(name)]),
    ) as Record<FieldName, string>;

    // Honeypot: a real user never sees this field, so anything in it is a bot.
    // Abort silently — no mailto, no feedback that would teach it anything.
    if (read(HONEYPOT_FIELD)) return;

    const clientErrors = validate(values);
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      focusFirstInvalid(clientErrors);
      return;
    }

    setErrors({});

    // Timing trap: too fast to be a human. Abort silently, like the honeypot.
    const startedAt = renderedAt.current;
    if (startedAt !== null && Date.now() - startedAt < MIN_FILL_MS) return;

    // Hand off to the visitor's email client — no server round-trip. Line breaks
    // become %0A once encodeURIComponent runs over the assembled body.
    const subject = `New venue signup — ${values.venueName}`;
    const body = [
      "New venue signup enquiry from oneround.au:",
      "",
      `Venue: ${values.venueName}`,
      `Type: ${values.venueType}`,
      `Capacity: ${values.capacity}`,
      `Contact: ${values.contactName}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      "",
      "Message:",
      values.about || "(no additional message)",
    ].join("\n");

    // Conversion events. Analytics.tsx loads GA4 (gtag) + Meta Pixel (fbq); both
    // are optional-chained so this no-ops if the scripts didn't load (blocked,
    // non-prod, or missing IDs). Window types: PageViewTracker.tsx.
    window.gtag?.("event", "generate_lead");
    window.fbq?.("track", "Lead");

    window.location.href = `mailto:hello@oneround.au?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        tabIndex={-1}
        className="border border-[color:var(--rule)] bg-white p-8 outline-none sm:p-10"
      >
        <p className="kicker text-navy">Almost done</p>
        <p className="mt-4 font-display text-2xl leading-tight text-ink sm:text-3xl">
          Your email client has opened — click send to finish your enquiry.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          If nothing opened, email us directly at{" "}
          <a
            href="mailto:hello@oneround.au?subject=Venue%20enquiry"
            className="underline underline-offset-4"
          >
            hello@oneround.au
          </a>
          .
        </p>
      </div>
    );
  }

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
        className="mt-4 inline-flex items-center gap-4 self-start bg-[color:var(--accent)] px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:brightness-110"
      >
        <span>Apply to partner</span>
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
    </form>
  );
}
