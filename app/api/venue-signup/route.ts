import { NextResponse } from "next/server";

/*
  Venue signup intake.

  TODO (LAUNCH BLOCKER): this only logs to the server console. Before venues are
  actually pointed at the form, wire real delivery to hello@oneround.au via
  Resend, Postmark or similar — a submission that only reaches stdout is a lost
  lead, and on most hosts those logs roll off within days. See the launch
  runbook note in AGENTS.md.

  CSRF. Next's built-in CSRF protection is a Server Actions feature: POST-only
  plus an Origin/Host comparison, applied automatically. Route Handlers get none
  of it — the security guide lists route.ts under "audit using traditional
  techniques". So the three checks Server Actions would have given us are done
  by hand here:

    1. POST only (this file exports no other verb, so anything else 405s).
    2. Origin must match Host / X-Forwarded-Host, exactly as Server Actions
       compare them. A cross-site page can submit a form to us, but it cannot
       forge this header.
    3. Content-Type must be application/json. A cross-origin HTML <form> can
       only send form-encoded or plain-text bodies without a CORS preflight, and
       a preflight for JSON is one this route never approves — so a plain
       cross-site form post cannot reach the handler at all.
*/

const VENUE_TYPES = ["Pub", "Bar", "Club", "Restaurant", "Cafe", "Other"];

// Bots fill every field they find, including ones humans never see.
const HONEYPOT_FIELD = "company_website";

// A human cannot read, tab through and complete this form in under three
// seconds. Anything faster is scripted.
const MIN_FILL_MS = 3000;

// Deliberately permissive: one @, something either side, a dot in the domain.
// Stricter regexes reject valid addresses far more often than they catch typos,
// and the real confirmation that an address works is mail arriving at it.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Record<string, string>;

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json(
      { error: "Expected application/json." },
      { status: 415 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed JSON." }, { status: 400 });
  }

  const str = (key: string) =>
    typeof body[key] === "string" ? (body[key] as string).trim() : "";

  /*
    Spam gates run before validation and all answer 200 with the same shape as a
    success. Telling a bot precisely which trap caught it is free tuning
    feedback; a silent accept costs us nothing and teaches it nothing.
  */
  if (str(HONEYPOT_FIELD)) {
    console.warn("[venue-signup] rejected: honeypot filled");
    return NextResponse.json({ ok: true });
  }

  const renderedAt = Number(body.renderedAt);
  if (Number.isFinite(renderedAt) && Date.now() - renderedAt < MIN_FILL_MS) {
    console.warn("[venue-signup] rejected: submitted too fast");
    return NextResponse.json({ ok: true });
  }

  const venueName = str("venueName");
  const contactName = str("contactName");
  const email = str("email");
  const phone = str("phone");
  const venueType = str("venueType");
  const capacityRaw = str("capacity");
  const about = str("about");

  // Mirrors the client rules exactly. The client copy is for speed; this is the
  // copy that actually decides, because the client can be bypassed entirely.
  const errors: Errors = {};
  if (!venueName) errors.venueName = "Venue name is required.";
  if (!contactName) errors.contactName = "Contact name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL.test(email)) errors.email = "Enter a valid email address.";
  if (!phone) errors.phone = "Phone is required.";
  if (!venueType) errors.venueType = "Select a venue type.";
  else if (!VENUE_TYPES.includes(venueType))
    errors.venueType = "Select a venue type.";

  const capacity = Number(capacityRaw);
  if (!capacityRaw) errors.capacity = "Approximate capacity is required.";
  else if (!Number.isInteger(capacity) || capacity < 1)
    errors.capacity = "Enter a whole number greater than zero.";

  if (about.length > 500) errors.about = "Keep this under 500 characters.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  /*
    Until delivery is wired, this log IS the lead. Keep it greppable and keep
    every field on its own line — a single-line blob is unreadable in a hosting
    dashboard. User agent and timestamp are here for triage (spotting a burst of
    near-identical submissions), not analytics.
  */
  console.log(
    [
      "",
      "=== VENUE SIGNUP ===================================",
      `Received:      ${new Date().toISOString()}`,
      `Venue name:    ${venueName}`,
      `Contact name:  ${contactName}`,
      `Email:         ${email}`,
      `Phone:         ${phone}`,
      `Venue type:    ${venueType}`,
      `Capacity:      ${capacity}`,
      `About:         ${about || "(not given)"}`,
      `User agent:    ${request.headers.get("user-agent") ?? "(none)"}`,
      "====================================================",
      "",
    ].join("\n"),
  );

  return NextResponse.json({ ok: true });
}
