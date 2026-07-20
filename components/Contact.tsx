"use client";

import PillButton from "./PillButton";
import EditorialTag from "./EditorialTag";
import VenueSignupForm from "./VenueSignupForm";
import { useAudience } from "./AudienceProvider";

/*
  Contact (id="contact") — sits on the held paper ground. Users: editorial head
  + email button. Venues: the signup form, which posts to /api/venue-signup.

  This is the single venue signup destination on the site — the Hero, HowItWorks
  and GoodStuff venue CTAs all anchor to #contact. Adding a second venue form
  elsewhere would split the funnel; extend this one instead.
*/

export default function Contact() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";

  if (isVenue) {
    return (
      <section id="contact" className="scroll-mt-28 bg-[color:var(--paper)] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-[96rem] grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <EditorialTag index="09" label="Contact" className="accent-text" />
            <h2 className="display-section mt-8 text-ink">
              Want OneRound in your venue?
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Let's talk. Tell us about your venue and we'll get you set up.
            </p>
          </div>
          <div className="lg:col-span-7">
            <VenueSignupForm />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="scroll-mt-28 bg-[color:var(--paper)] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-[96rem] grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <EditorialTag index="09" label="Contact" className="accent-text" />
          <h2 className="display-section mt-8 text-ink">
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
