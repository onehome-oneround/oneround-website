"use client";

import Image from "next/image";
import PillButton from "./PillButton";
// HIDDEN until launch - re-enable: app store links (user-side Good Stuff CTA)
// import DownloadButtons from "./DownloadButtons";
import EditorialTag from "./EditorialTag";
import SectionFade from "./SectionFade";
import { useAudience } from "./AudienceProvider";

/*
  "The good stuff" — a full-bleed real photo (Users = good-user, Venues =
  good-venue) under a navy scrim, with the benefits as frosted white bubble chips
  and the CTA. White text throughout for legibility. The photo distinguishes it
  from the flat-navy logo slider above. Content unchanged.
*/

export default function GoodStuff() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";

  const copy = isVenue
    ? {
        heading: "The good stuff.",
        lines: [
          "Free to join, no cost to be on OneRound",
          "Roundies and Deals drive real foot traffic",
          "New customers discovering your venue",
        ],
        cta: "Become a partner",
        href: "/partners",
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
    <section className="on-dark relative isolate overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
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
            "linear-gradient(120deg, rgba(2,0,49,0.68) 0%, rgba(2,0,49,0.36) 22%, rgba(2,0,49,0.1) 48%, rgba(2,0,49,0.04) 100%)",
        }}
      />
      {/* Bottom fade — the photo dissolves into the next section's paper ground so
          the dark→light seam into Pricing reads as a tonal step, not a hard cut.
          On the venue side Pricing is absent and the FAQ (white) follows; paper
          is a neutral pale landing that softens either way. */}
      <SectionFade edge="bottom" color="var(--paper)" height="h-40" />

      <div className="relative z-10 mx-auto max-w-[96rem]">
        <EditorialTag index="06" label="The Good Stuff" className="text-white" />
        <h2 className="display-statement mt-8 max-w-[14ch] text-white [text-shadow:0_2px_30px_rgba(2,0,49,0.7)]">
          {copy.heading}
        </h2>

        {/* benefit cards — frosted glass: photo blurs gently behind, but the panel
            is solid enough that text stays crisp. Circular number badge each. */}
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
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

        {/* The venue partner button stays; the user-side store badges are hidden
            until launch, so the CTA only renders on the venue side for now. */}
        {isVenue && (
          <div className="mt-12">
            <PillButton href={copy.href} variant="solid" onDark>
              {copy.cta}
            </PillButton>
          </div>
        )}
        {/* HIDDEN until launch - re-enable: app store links (user-side Good Stuff CTA).
            To restore, replace the venue-only block above with this ternary
            (and re-enable the DownloadButtons import):
        <div className="mt-12">
          {isVenue ? (
            <PillButton href={copy.href} variant="solid" onDark>
              {copy.cta}
            </PillButton>
          ) : (
            <DownloadButtons />
          )}
        </div>
        */}
      </div>
    </section>
  );
}
