"use client";

import PillButton from "./PillButton";
import EditorialTag from "./EditorialTag";
import { useAudience } from "./AudienceProvider";

/*
  Membership pricing — a blue slab between The Good Stuff (dark photo) and the
  FAQ (white), which also restores the blue band the colour rhythm calls for
  while ClosingCTA sits behind the launch guard.

  Composition: one contained white card, centered, max-w-md. Everything —
  price, value line, included list, CTA — lives inside that single card, so it
  reads as ONE object rather than items pinned to opposite corners of a slab.
  The section is only as tall as the card plus breathing room; no forced height.
  This follows the "Minimal Single Column" pattern for a single-plan product
  (one price, a short benefit list, one centered CTA) rather than a multi-tier
  comparison.

  Consumer only. Venues join free ("Free to join" / "Become a partner for free"),
  so a $11.99 membership price on the venue side would be wrong. Like Contact and
  GoodStuff this branches on audience, inheriting the known post-hydration content
  swap documented in AGENTS.md rather than adding a new one.

  Voice: value line matches Features ("Five on us, every month.") — short warm
  fragments, no numbers, price framed against the reward it buys (a drink on us).
  No maths, no "4× return". The list claims only paid membership features, in the
  in-app paywall's order. Weekly Wins is a membership perk (the app confirms it's
  paid, not part of the free social side), so it heads the list. There is no
  annual plan, so nothing here references one.

  Static by design: no reveal, no fade, no parallax, no hover movement. (The
  "fade" below is a static CSS gradient background, not motion.)

  Flow: this used to be a full-saturation blue slab, which hard-cut against the
  navy GoodStuff above and the FAQ below. It's now a static tonal gradient —
  paper (top, catching GoodStuff's bottom fade) → tint (the softened "blue"
  moment) → paper (bottom, so it melts into the paper FAQ with no seam). Both
  ends are paper because the palette-descent pass grounded the closing stretch
  (Pricing, FAQ, Contact) in paper before the navy footer. Brand blue still
  reads via the CTA and price.

  Colour is all tokens: gradient ground, white card, navy ink, blue accent CTA +
  ticks. Everything on the white card clears AA comfortably (navy on white ~16:1).
*/

const INCLUDED = [
  "Entry into Weekly Wins",
  "Five Roundies every month",
  "Exclusive member Deals at every venue",
  "Cancel anytime",
];

/* Fixed 16x16 glyph in a fixed 20px box so the row height can't shift on load. */
function Tick() {
  return (
    <span
      aria-hidden="true"
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-[color:var(--accent)]"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 12.5l5.2 5.2L20 6.9"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Pricing() {
  const { audience } = useAudience();
  if (audience === "venue") return null;

  return (
    <section
      id="pricing"
      className="scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
      style={{
        background:
          "linear-gradient(180deg, var(--paper) 0%, var(--tint) 55%, var(--paper) 100%)",
      }}
    >
      <div className="mx-auto max-w-[96rem]">
        <EditorialTag index="07" label="Membership" className="text-navy" />

        {/* The card — the single contained object. Rounded + lifted so it floats
            on the tonal ground rather than sitting as another hard rectangle. */}
        <div className="mx-auto mt-12 w-full max-w-md rounded-3xl bg-white px-8 py-10 shadow-[0_40px_90px_-45px_rgba(2,0,49,0.45)] sm:px-10 sm:py-12">
          <div className="flex items-baseline gap-3">
            <span
              className="font-display text-navy"
              style={{ fontSize: "clamp(3rem, 8vw, 4.5rem)", lineHeight: "0.9", fontWeight: 600 }}
            >
              $11.99
            </span>
            <span className="kicker text-ink-soft">per month</span>
          </div>

          <p className="mt-5 font-display text-2xl font-semibold leading-snug text-navy sm:text-[1.75rem]">
            Less than a cocktail. One on us, every outing.
          </p>

          <ul className="mt-8">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 border-t border-[color:var(--rule)] py-4 first:border-t-0 first:pt-0"
              >
                <Tick />
                <span className="text-base leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ul>

          {/* CTA points at the hero for now; at launch the store badges live
              there, so this can re-point straight at them. Full card width, fixed
              height, so it can't reflow as the font loads. */}
          <PillButton
            href="#get-the-app"
            variant="solid"
            className="mt-8 h-14 w-full justify-center"
          >
            Get Started
          </PillButton>
        </div>
      </div>
    </section>
  );
}
