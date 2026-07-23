"use client";

import { useEffect, useRef } from "react";
import PillButton from "./PillButton";
import EditorialTag from "./EditorialTag";
import VenueContactForm from "./VenueContactForm";
import { useAudience } from "./AudienceProvider";
import { scrollToIdSettled } from "./hashNav";

/*
  Contact (id="contact") — sits on the held paper ground. Users: editorial head
  + email button. Venues: a partner enquiry form (venue name, email, phone) that
  posts to the shared waitlist webhook.

  This is the single venue contact destination on the site — the Hero, HowItWorks
  and GoodStuff venue CTAs all anchor to #contact.
*/

export default function Contact() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";
  const didAutoScroll = useRef(false);

  // Land venue partners on this form when they ARRIVE at /?view=venue#contact —
  // a shared/direct link, or a router.push from another page's "Become a
  // partner". The browser's on-load hash scroll runs against the SSR consumer
  // layout, before hydration resolves venue and reflows the sections above
  // #contact, so it lands mid-page. Re-scroll once the venue Contact has
  // actually rendered. Guarded to fire once per mount, so it doesn't fight the
  // audience toggle's scroll-to-top on a later switch.
  useEffect(() => {
    if (!isVenue || didAutoScroll.current) return;
    if (window.location.hash !== "#contact") return;
    didAutoScroll.current = true;
    scrollToIdSettled("contact");
  }, [isVenue]);

  if (isVenue) {
    return (
      <section id="contact" className="scroll-mt-28 bg-[color:var(--paper)] px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[96rem] grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5">
            <EditorialTag index="09" label="Contact" className="text-navy" />
            <h2 className="display-section mt-6 text-ink">
              Want OneRound in your venue?
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Fill in your details and we&rsquo;ll be in touch.
            </p>
          </div>
          <div className="lg:col-span-7">
            <VenueContactForm />
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
