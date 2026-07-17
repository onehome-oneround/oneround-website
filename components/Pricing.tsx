"use client";

import EditorialTag from "./EditorialTag";
import PillButton from "./PillButton";
import { useAudience } from "./AudienceProvider";

/*
  Membership pricing — a hard blue slab between The Good Stuff (dark photo) and
  the FAQ (white), so it reads as its own beat rather than merging into either.
  It also restores the blue band the colour rhythm calls for, which went missing
  while ClosingCTA is behind the launch guard.

  Consumer only. Venues join free ("Free to join" / "Become a partner for free"),
  so a $11.99 membership price on the venue side would simply be wrong. Like
  Contact and GoodStuff, this branches on audience, which means it inherits the
  known post-hydration content swap documented in AGENTS.md — a returning venue
  visitor sees it briefly before it unmounts. That's the existing site-wide
  issue, not a new one, and it goes away with the cookie fix.

  Static by design: no reveal, no fade, no parallax. Note the accent word does
  NOT use .accent-ital — that class animates a rule underneath itself. It uses
  the plain static `italic` treatment the how-it-works pages already use.

  Colour is all tokens. On the blue slab, body copy is navy, not white: white at
  body size measures ~3.4:1 here, under AA. The price itself is white because it
  is display-size (AA needs 3:1 for large text) and matches the headline
  treatment everywhere else on a blue slab.
*/

export default function Pricing() {
  const { audience } = useAudience();
  if (audience === "venue") return null;

  return (
    <section
      id="pricing"
      className="scroll-mt-16 bg-[color:var(--accent)] px-5 py-24 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-[96rem]">
        <EditorialTag index="07" label="Membership" className="text-navy" />

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Price + pitch */}
          <div className="lg:col-span-7">
            <h2
              className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-white"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", lineHeight: "0.9", fontWeight: 600 }}
            >
              $11.99
              <span className="kicker text-navy">per month</span>
            </h2>
            <p className="mt-7 max-w-md text-base font-medium leading-relaxed text-navy sm:text-lg">
              One membership. Every venue. Every night out.
            </p>
          </div>

          {/* The maths — mono, because it's listings data, same voice as the
              kickers and index numerals elsewhere. */}
          <div className="lg:col-span-5 lg:border-l lg:border-white/25 lg:pl-12">
            <p className="font-mono text-sm font-bold leading-relaxed text-navy">
              5 Roundies × ~$10 = $50+ value
            </p>
            <p
              className="mt-3 font-display italic text-navy"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: "1", fontWeight: 400 }}
            >
              4× return
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/25 pt-10">
          {/* Points at the hero for now; at launch the store badges live there,
              so this can be re-pointed straight at them. Height is pinned so the
              button can't resize as the font loads. */}
          <PillButton href="#get-the-app" variant="solid" onDark className="h-14">
            Get Started
          </PillButton>
        </div>
      </div>
    </section>
  );
}
