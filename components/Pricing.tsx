"use client";

import PillButton from "./PillButton";
import EditorialTag from "./EditorialTag";
import { useAudience } from "./AudienceProvider";
import {
  Badge,
  Glasses,
  Lock,
  Rays,
  ShieldCheck,
  Squiggle,
} from "./PricingMarks";

/*
  Membership pricing — a blue slab between The Good Stuff (dark photo) and the
  FAQ (white), which also restores the blue band the colour rhythm calls for
  while ClosingCTA sits behind the launch guard.

  Composition: a two-column editorial spread. Left carries the pitch — eyebrow,
  a two-colour display statement, subhead, and a line-art clink. Right carries
  the card. A circular badge straddles the gutter between them, and small marks
  sit in the top-right and bottom-right corners of the section.

  The card itself is untouched from the single-column version: same price, same
  value line, same four included items, same CTA, same white / rounded / lifted
  treatment. It is still ONE object; the spread is built around it, not through
  it.

  Everything decorative is inline SVG with locked width and height — see
  PricingMarks. None of it is interactive or announced: all aria-hidden, all
  pointer-events-none where it overlaps content.

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

  Static by design: no reveal, no fade, no parallax, no hover movement.

  Flow: ground is --paper. The closing stretch reads paper → white → paper →
  navy, so Membership, Good to know and Contact still alternate rather than
  collapsing into one field, which was the problem the earlier tint fixed.

  Colour is all tokens: paper ground, white card, navy ink, blue accent CTA,
  ticks and line-art. Everything on the white card clears AA comfortably (navy on
  white ~16:1), and navy on paper ~15:1. The line-art is decorative only, so its
  blue-on-paper contrast carries no information requirement.
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
      className="relative isolate scroll-mt-24 overflow-hidden bg-[color:var(--paper)] px-5 py-20 sm:px-8 sm:py-24"
    >
      {/* Corner marks. Hidden below sm, where the section is a single narrow
          column and they would crowd the type rather than frame it. */}
      <Rays className="pointer-events-none absolute right-6 top-8 hidden text-blue sm:block" />
      <Squiggle className="pointer-events-none absolute bottom-8 right-8 hidden text-blue sm:block" />

      <div className="relative mx-auto max-w-[96rem]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center lg:gap-8">
          {/* LEFT — the pitch */}
          <div className="lg:col-span-6">
            <EditorialTag index="07" label="Membership" className="text-navy" />
            <h2 className="display-statement mt-6">
              <span className="block text-navy">More rounds.</span>
              <span className="block text-blue">More reasons.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Your membership unlocks exclusive rewards and deals at the best
              venues, every single month.
            </p>
            <Glasses className="mt-10 text-blue" />
          </div>

          {/* Badge straddling the gutter. Only at lg, where there IS a gutter —
              below that the columns stack and it would land on top of copy.
              Absolutely positioned so it cannot affect the grid's height. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 text-blue lg:block"
          >
            <Badge />
          </div>

          {/* RIGHT — the card, unchanged */}
          <div className="lg:col-span-6">
            {/* The card — the single contained object. Rounded + lifted so it floats
                on the tonal ground rather than sitting as another hard rectangle. */}
            <div className="mx-auto w-full max-w-md rounded-3xl bg-white px-8 py-10 shadow-[0_40px_90px_-45px_rgba(var(--navy-rgb),0.45)] sm:px-10 sm:py-12">
          <div className="flex items-baseline gap-3">
            {/* The price is a display NUMBER inside the (preserved) pricing card,
                not a section heading — deliberately kept off the display-* ramp,
                whose tiers (5.5-10rem) would all oversize it and change the card. */}
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

            {/* Trust markers, centred under the card. Two only — more would read
                as reassurance-by-volume, which undercuts it. */}
            <ul className="mx-auto mt-8 flex max-w-md flex-wrap items-start justify-center gap-x-10 gap-y-5">
              {[
                { Icon: ShieldCheck, one: "Secure payments", two: "cancel anytime" },
                { Icon: Lock, one: "Your data is safe", two: "and private" },
              ].map(({ Icon, one, two }) => (
                <li key={one} className="flex items-start gap-3">
                  <Icon className="mt-0.5 shrink-0 text-blue" />
                  <span className="kicker leading-[1.5] text-ink-soft">
                    {one}
                    <br />
                    {two}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
