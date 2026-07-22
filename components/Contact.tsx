"use client";

import PillButton from "./PillButton";
import EditorialTag from "./EditorialTag";
import { useAudience } from "./AudienceProvider";

/*
  Contact (id="contact") — sits on the held paper ground. Users: editorial head
  + email button. Venues: an email-us block — a prominent mailto CTA plus a
  checklist of what to include, in place of a form.

  This is the single venue contact destination on the site — the Hero, HowItWorks
  and GoodStuff venue CTAs all anchor to #contact.
*/

const VENUE_EMAIL_CHECKLIST = [
  "Venue name",
  "Your name and role",
  "Contact email and phone",
  "Venue type (pub, bar, club, restaurant, etc.)",
  "Approximate capacity",
  "Anything else you’d like us to know",
];

export default function Contact() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";

  if (isVenue) {
    return (
      <section id="contact" className="scroll-mt-28 bg-[color:var(--paper)] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[96rem] grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <EditorialTag index="09" label="Contact" className="text-navy" />
            <h2 className="display-section mt-6 text-ink">
              Want OneRound in your venue?
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Email us and we&rsquo;ll set you up.
            </p>
          </div>
          <div className="lg:col-span-7">
            {/* Prominent mailto CTA. break-words guards against overflow on the
                narrowest screens; the size caps below the left headline so the
                two don't compete. */}
            <a
              href="mailto:hello@oneround.au?subject=New%20venue%20enquiry"
              className="inline-block break-words font-display font-semibold leading-none text-blue underline-offset-4 hover:underline"
              style={{ fontSize: "clamp(1.75rem, 5vw, 3.25rem)" }}
            >
              hello@oneround.au
            </a>

            <p className="kicker mt-10 text-ink-faint">Include these in your email</p>
            <ul className="mt-5 flex flex-col gap-3">
              {VENUE_EMAIL_CHECKLIST.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base leading-relaxed text-ink-soft"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-navy"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="scroll-mt-28 bg-[color:var(--paper)] px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto grid max-w-[96rem] grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <EditorialTag index="09" label="Contact" className="text-navy" />
          <h2 className="display-section mt-6 text-ink">
            Get in touch.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            Questions, press, or just want to say hi? We&rsquo;d love to hear from you.
          </p>
        </div>
        <div className="lg:col-span-4 lg:pb-3">
          <PillButton href="mailto:hello@oneround.au?subject=Hello%20from%20oneround.au" variant="solid">
            hello@oneround.au
          </PillButton>
        </div>
      </div>
    </section>
  );
}
