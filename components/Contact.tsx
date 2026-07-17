"use client";

import PillButton from "./PillButton";
import EditorialTag from "./EditorialTag";
import { useAudience } from "./AudienceProvider";

/*
  Contact (id="contact") — off-white slab. Users: editorial head + email button
  (unchanged). Venues: a venue enquiry form that builds a mailto to hello@oneround.au
  on submit (no backend, no third party). The hero "Become a partner for free"
  button anchors here.
*/

function VenueEnquiryForm() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) ?? "").trim();
    const venue = get("venue");
    const subject = `Venue partnership enquiry - ${venue || "OneRound"}`;
    const body = [
      `Name: ${get("name")}`,
      `Role: ${get("role")}`,
      `Venue name: ${venue}`,
      `Phone number: ${get("phone")}`,
      "",
      "Message:",
      get("message"),
    ].join("\r\n");
    window.location.href = `mailto:hello@oneround.au?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "mt-2 w-full rounded-xl border border-[color:var(--rule)] bg-white px-4 py-3 text-base text-ink outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)]/25";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="kicker text-ink-faint">Name</span>
          <input name="name" type="text" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="kicker text-ink-faint">Role</span>
          <input name="role" type="text" placeholder="e.g. owner, manager" className={field} />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="kicker text-ink-faint">Venue name</span>
          <input name="venue" type="text" required className={field} />
        </label>
        <label className="block">
          <span className="kicker text-ink-faint">Phone number</span>
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="kicker text-ink-faint">Message</span>
        <textarea name="message" rows={4} required className={`${field} resize-y`} />
      </label>
      <button
        type="submit"
        className="inline-flex items-center gap-4 self-start bg-[color:var(--accent)] px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors duration-200 hover:brightness-110"
      >
        <span>Send enquiry</span>
        <span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    </form>
  );
}

export default function Contact() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";

  if (isVenue) {
    return (
      <section id="contact" className="scroll-mt-28 bg-offwhite px-5 py-24 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-[96rem] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <EditorialTag index="08" label="Contact" className="accent-text" />
            <h2
              className="mt-8 text-ink"
              style={{ fontSize: "clamp(2.6rem, 5.6vw, 6rem)", lineHeight: "1.0", fontWeight: 600 }}
            >
              Want OneRound in your venue?
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Let's talk. Tell us about your venue and we'll get you set up.
            </p>
          </div>
          <div className="lg:col-span-7">
            <VenueEnquiryForm />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="scroll-mt-28 bg-offwhite px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-[96rem] grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <EditorialTag index="08" label="Contact" className="accent-text" />
          <h2
            className="mt-8 text-ink"
            style={{ fontSize: "clamp(2.6rem, 5.6vw, 6rem)", lineHeight: "1.0", fontWeight: 600 }}
          >
            Get in touch.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            Questions, press, or just want to say hi? We'd love to hear from you.
          </p>
        </div>
        <div className="lg:col-span-4 lg:pb-3">
          <PillButton href="mailto:hello@oneround.au" variant="solid">
            hello@oneround.au
          </PillButton>
        </div>
      </div>
    </section>
  );
}
