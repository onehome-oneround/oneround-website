"use client";

import PhoneMockup from "./PhoneMockup";
import PillButton from "./PillButton";
import DownloadButtons from "./DownloadButtons";
import { useAudience } from "./AudienceProvider";

/*
  The Good Stuff — the one section that inverts to a navy card with white text.
  Tilted phone mockup left; heading + benefit lines (hairline-separated) + blue
  "+" pill right. Toggle-aware content. Accent is locked to BLUE here (via a
  local data-audience="consumer") so the pill/marks stay visible on navy.
  Reward/discovery framing — never "save money".
*/

export default function GoodStuff() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";

  const copy = isVenue
    ? {
        heading: "The good stuff, for venues.",
        lines: [
          "Free to join — no cost to be on OneRound",
          "Roundies and Deals drive real foot traffic",
          "New customers discovering your venue",
          "Your venue where people choose where to go",
          "Optionally feature your venue for more reach",
        ],
        cta: "Become a partner",
        href: "/partners",
        screen: {
          label: "app-venue-listing",
          intent: "Real app screenshot — a venue's listing as customers see it, Roundie + deals.",
        },
      }
    : {
        heading: "The good stuff.",
        lines: [
          "A free Roundie every day",
          "Exclusive Deals you won't find elsewhere",
          "See where your friends and the crowd are headed",
          "Discover new venues across Brisbane",
          "Your whole outing in one app",
        ],
        cta: "",
        href: "",
        screen: {
          label: "app-roundie-claim",
          intent: "Real app screenshot — the Roundie claim screen, shown in a packed venue context.",
        },
      };

  return (
    <section className="px-5 py-12 sm:px-8 sm:py-16">
      {/* data-audience locks accent to blue on this navy card */}
      <div
        data-audience="consumer"
        className="on-scroll relative mx-auto grid max-w-6xl items-center gap-12 overflow-hidden rounded-[2rem] bg-navy p-8 sm:p-12 lg:grid-cols-2 lg:gap-8 lg:p-16"
      >
        <span aria-hidden="true" className="grain" />
        {/* Phone */}
        <div className="relative z-10 order-2 lg:order-1">
          <PhoneMockup
            screenLabel={copy.screen.label}
            screenIntent={copy.screen.intent}
            tilt={-6}
            chips={
              <div className="absolute -right-2 top-12 rotate-[5deg] rounded-2xl border border-white/15 bg-white px-4 py-3 shadow-xl">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-blue">
                  {isVenue ? "Redeemed" : "Free today"}
                </p>
                <p className="text-xs font-bold text-navy">
                  {isVenue ? "+1 new customer" : "Your daily Roundie"}
                </p>
              </div>
            }
          />
        </div>

        {/* Copy */}
        <div className="relative z-10 order-1 lg:order-2">
          <h2 className="text-3xl font-extrabold leading-[0.98] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
            {copy.heading}
          </h2>
          <ul className="mt-8 border-t border-white/12">
            {copy.lines.map((line) => (
              <li
                key={line}
                className="flex items-center gap-3 border-b border-white/12 py-4"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue/15 text-blue">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-base font-medium text-white/90">{line}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            {isVenue ? (
              <PillButton href={copy.href} icon="plus">
                {copy.cta}
              </PillButton>
            ) : (
              <DownloadButtons />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
