"use client";

import EditorialTag from "./EditorialTag";
import PillButton from "./PillButton";
import { useAudience } from "./AudienceProvider";

/*
  Membership pricing — a blue slab between The Good Stuff (dark photo) and the
  FAQ (white), so it reads as its own beat rather than merging into either. It
  also restores the blue band the colour rhythm calls for, missing while
  ClosingCTA sits behind the launch guard.

  Composition: price → maths → tagline → CTA is ONE stack, in reading order, so
  the CTA is the natural end of the argument rather than something stranded in a
  corner. The included list is the second column and is a filled navy panel, so
  the slab has no dead space and the section is only as tall as its content.

  Weight: blue slab, white price, navy panel, blue ticks. Three levels out of a
  three-colour palette, no new colours.

  Consumer only. Venues join free ("Free to join" / "Become a partner for free"),
  so a $11.99 membership price on the venue side would be wrong. Like Contact and
  GoodStuff this branches on audience, inheriting the known post-hydration content
  swap documented in AGENTS.md rather than adding a new one.

  Copy: the list claims only what membership actually buys. faqData.ts states the
  social side is "always free", so the crowd/draw features are deliberately NOT
  listed here — claiming them would contradict the FAQ directly below.

  Static by design: no reveal, no fade, no parallax, no hover movement. The accent
  word avoids .accent-ital, which animates a rule beneath itself; it uses the plain
  static `italic` treatment the how-it-works pages use.

  Colour is all tokens. Body copy on blue is navy, not white: white at body size
  measures ~3.4:1 here, under AA. The price is white because it's display-size,
  where AA needs 3:1, and it matches the headline treatment on every other slab.

  scroll-mt-24 (96px) clears the 89px fixed nav. scroll-mt-16 (64px) leaves the
  section's top 25px under a translucent nav, which washes the index tag out.
*/

const INCLUDED = [
  "Five Roundies a month",
  "One per outing, five every month",
  "Exclusive Deals you won't find elsewhere",
  "Monthly or annual — your call",
];

/* Fixed 16x16 in a fixed 20px box, so the row height can't shift as fonts load. */
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
      className="scroll-mt-24 bg-[color:var(--accent)] px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-[96rem]">
        <EditorialTag index="07" label="Membership" className="text-navy" />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* The argument, in one stack: price → maths → tagline → CTA */}
          <div className="lg:col-span-7">
            <h2
              className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-white"
              style={{ fontSize: "clamp(3.25rem, 7vw, 6rem)", lineHeight: "0.9", fontWeight: 600 }}
            >
              $11.99
              <span className="kicker text-navy">per month</span>
            </h2>

            <p className="mt-5 font-mono text-sm font-bold leading-relaxed text-navy">
              5 Roundies × ~$10 = $50+ value
            </p>
            <p
              className="mt-1 font-display italic text-navy"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: "1.1", fontWeight: 400 }}
            >
              4× return
            </p>

            <p className="mt-6 max-w-lg text-xl font-semibold leading-snug text-navy sm:text-2xl">
              One membership. Every venue. Every night out.
            </p>

            <PillButton href="#get-the-app" variant="solid" onDark className="mt-8 h-14">
              Get Started
            </PillButton>
          </div>

          {/* What the money actually buys. Filled panel — carries the weight and
              leaves no empty slab beside the stack. */}
          <div className="lg:col-span-5">
            <div className="h-full bg-navy p-8 sm:p-9">
              <p className="kicker text-white/70">What&rsquo;s included</p>
              <ul className="mt-6">
                {INCLUDED.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 border-t border-white/15 py-4 first:border-t-0 first:pt-0 last:pb-0"
                  >
                    <Tick />
                    <span className="text-base leading-relaxed text-white">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
