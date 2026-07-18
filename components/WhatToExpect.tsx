"use client";

import EditorialTag from "./EditorialTag";
import { useAudience } from "./AudienceProvider";

/*
  "A venue for any occasion." — white slab. Editorial split: heading + body on the
  left; the venue types rendered as a broadsheet directory (mono index + big
  Fraunces word, hairline-ruled) on the right. Launch set only. Copy swaps with
  the toggle; content unchanged.
*/

const venueTypes = ["Clubs", "Bars", "Pubs"];

export default function WhatToExpect() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";

  const copy = isVenue
    ? {
        kicker: "Every kind of venue",
        heading: "Built for venues like yours.",
        body: "From clubs to bars to pubs, OneRound helps to bring new customers through the door.",
      }
    : {
        kicker: "What to expect",
        heading: "A venue for any occasion.",
        body: "From a big one out to an easy catch-up, OneRound works across the places you already go, with more venues added all the time.",
      };

  return (
    <section className="bg-white px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-[96rem] grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-6 lg:pr-12">
          <EditorialTag index="05" label={copy.kicker} className="accent-text" />
          <h2 className="display-section mt-8 text-ink">
            {copy.heading}
          </h2>
          <p className="mt-7 max-w-md text-base leading-relaxed text-ink-soft">{copy.body}</p>
        </div>

        <div className="lg:col-span-6 lg:hair-l lg:pl-12">
          <ul className="border-t border-[color:var(--rule)]">
            {venueTypes.map((t, i) => (
              <li
                key={t}
                className="flex items-center gap-6 border-b border-[color:var(--rule)] py-6"
              >
                <span className="kicker w-10 text-ink-faint">0{i + 1}</span>
                <span className="font-display text-4xl font-semibold text-ink sm:text-6xl">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
