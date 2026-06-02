"use client";

import { useAudience } from "./AudienceProvider";

/*
  What to expect — heading + subhead left, outline pill chips right. Toggle-aware
  copy; chips show the venue spread (launch focus first: nightclubs/pubs/bars).
*/

// Launch venues
const venueTypes = ["Clubs", "Bars", "Pubs"];

export default function WhatToExpect() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";

  const copy = isVenue
    ? {
        kicker: "Every kind of venue",
        heading: "Built for venues like yours.",
        body: "Clubs, bars and pubs all run OneRound — bringing new customers in and giving them a reason to head out.",
      }
    : {
        kicker: "What to expect",
        heading: "A venue for any occasion.",
        body: "From a big one out to an easy catch-up, OneRound works across the places you already go — with more venues added all the time.",
      };

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24">
      <div className="on-scroll mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="kicker accent-text">{copy.kicker}</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[0.98] tracking-[-0.03em] text-ink sm:text-4xl lg:text-6xl">
            {copy.heading}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
            {copy.body}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          {venueTypes.map((t) => (
            <span
              key={t}
              className="accent-border accent-text rounded-full border bg-white px-6 py-3 text-base font-bold"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
