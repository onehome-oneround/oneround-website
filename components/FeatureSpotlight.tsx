"use client";

import PhoneMockup from "./PhoneMockup";
import ImagePlaceholder from "./ImagePlaceholder";
import { useAudience } from "./AudienceProvider";

/*
  Social Layer spotlight — a FULL-BLEED real photo banner (edge to edge) with a
  dark scrim, white copy on the left and the tilted phone mockup on the right.
  Identical layout on both sides; copy + app screen swap with the toggle.
*/

function Chip({ kicker, line }: { kicker: string; line: string }) {
  return (
    <div className="absolute -right-3 top-12 rotate-[5deg] rounded-2xl border border-white/15 bg-white px-4 py-3 shadow-xl">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-blue">{kicker}</p>
      <p className="text-xs font-bold text-navy">{line}</p>
    </div>
  );
}

export default function FeatureSpotlight() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";

  const copy = isVenue
    ? {
        kicker: "For venues",
        heading: "Your venue, in the mix.",
        body: "Appear in the app right where people are deciding where to go. Put your Roundie and exclusive Deals in front of new customers — free to join, with the option to feature your venue for even more reach.",
        bg: {
          label: "venue-interior-busy",
          intent: "Real photo — a busy venue interior full of customers.",
        },
        screen: {
          label: "app-venue-listing",
          intent: "Real app screenshot — a venue's listing as customers see it.",
        },
        chip: { kicker: "New", line: "A customer just found you" },
      }
    : {
        kicker: "The social layer",
        heading: "Follow the action, live.",
        body: "Open the app to a live feed and map of where your friends — and the crowd — are headed. Decide where to go, meet up, and follow it as it happens. Always free.",
        bg: {
          label: "social-layer-crowd",
          intent: "Real photo — a lively crowd out and about; the social buzz.",
        },
        screen: {
          label: "app-social-layer",
          intent: "Real app screenshot — the live feed/map of where the crowd is headed.",
        },
        chip: { kicker: "Right now", line: "The crowd's heading out" },
      };

  return (
    <section className="relative overflow-hidden">
      {/* full-bleed photo background */}
      <ImagePlaceholder
        label={copy.bg.label}
        intent={copy.bg.intent}
        tone="deep"
        align="center"
        className="absolute inset-0 h-full w-full"
      />
      {/* dark scrim for legibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(2,0,49,0.82) 0%, rgba(2,0,49,0.6) 45%, rgba(2,0,49,0.85) 100%)",
        }}
      />
      <span aria-hidden="true" className="grain" />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-8">
        {/* Copy */}
        <div>
          <p className="kicker text-white/70">{copy.kicker}</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[0.98] tracking-[-0.03em] text-white sm:text-4xl lg:text-6xl">
            {copy.heading}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-white/85">
            {copy.body}
          </p>
        </div>

        {/* Phone mockup on top */}
        <div className="relative flex justify-center py-6">
          <PhoneMockup
            screenLabel={copy.screen.label}
            screenIntent={copy.screen.intent}
            chips={<Chip kicker={copy.chip.kicker} line={copy.chip.line} />}
            tilt={-6}
          />
        </div>
      </div>
    </section>
  );
}
