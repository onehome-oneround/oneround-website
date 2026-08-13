"use client";

import Image from "next/image";
import PillButton from "./PillButton";
import DownloadButtons from "./DownloadButtons";
import EditorialTag from "./EditorialTag";
import { useAudience } from "./AudienceProvider";
import { useVenueContact } from "./useVenueContact";

/*
  "The good stuff" — a full-bleed real photo (Users = good-user, Venues =
  good-venue) under a navy scrim, with the benefits as frosted white bubble chips
  and the CTA. White text throughout for legibility. The photo distinguishes it
  from the flat-navy logo slider above. Content unchanged.
*/

export default function GoodStuff() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";
  const goToVenueContact = useVenueContact();

  const copy = isVenue
    ? {
        heading: "The good stuff.",
        lines: [
          "Free to join, no cost to be on OneRound",
          "Roundies and Deals drive real foot traffic",
          "New customers discovering your venue",
        ],
        cta: "Become a partner",
        // Sets audience to venue and scrolls to the Contact section via
        // useVenueContact (below); the href is the no-JS / new-tab fallback.
        href: "/?view=venue#contact",
        bg: "/images/newgood-venue.png",
      }
    : {
        heading: "The good stuff.",
        lines: [
          "Five Roundies a month",
          "Exclusive Deals you won't find elsewhere",
          "See where your friends and the crowd are headed",
        ],
        cta: "",
        href: "",
        bg: "/images/newgood-user.png",
      };

  return (
    <section className="on-dark relative isolate overflow-hidden px-5 py-20 sm:px-8 sm:py-24">
      {/* full-bleed photo */}
      <Image
        src={copy.bg}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      {/* light scrim — only enough to keep the heading legible top-left; the photo
          stays bright and the frosted cards carry their own contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(120deg, rgba(var(--navy-rgb),0.68) 0%, rgba(var(--navy-rgb),0.36) 22%, rgba(var(--navy-rgb),0.1) 48%, rgba(var(--navy-rgb),0.04) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[96rem]">
        <EditorialTag index="06" label="The Good Stuff" className="text-white" />
        <h2 className="display-statement mt-6 max-w-[14ch] text-white [text-shadow:0_2px_30px_rgba(var(--navy-rgb),0.7)]">
          {copy.heading}
        </h2>

        {/* benefit cards — frosted glass: photo blurs gently behind, but the panel
            is solid enough that text stays crisp. Circular number badge each. */}
        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {copy.lines.map((line, i) => (
            <li
              key={line}
              className="flex items-center gap-4 rounded-[var(--radius-card)] border border-white/20 bg-navy/60 p-6 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.85)] backdrop-blur-2xl"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/15 font-display text-lg font-semibold text-white">
                {i + 1}
              </span>
              <span className="text-[17px] font-medium leading-snug text-white">
                {line}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA. Consumer gets the store badges (OneRound is live); venue keeps
            the partner button. Guard the venue side on copy.href too: the
            consumer copy carries an empty href, so this can never render a dead
            link even if the audience gate changes. The dark photo slab means the
            badges use the white (onDark) colourway. */}
        {!isVenue ? (
          <div className="mt-10">
            <DownloadButtons onDark />
          </div>
        ) : (
          copy.href && (
            <div className="mt-10">
              <PillButton
                href={copy.href}
                variant="solid"
                onDark
                onClick={goToVenueContact}
              >
                {copy.cta}
              </PillButton>
            </div>
          )
        )}
      </div>
    </section>
  );
}
