"use client";

import { useSyncExternalStore } from "react";

/*
  Launch countdown — editorial event punctuation in the Hero, not a sale banner.

  Sits between the subhead and the CTA block. On the consumer path the store
  badges are hidden behind the launch guard, so the left column currently stops
  after the subhead; this occupies exactly the space those badges will take, and
  disappears as they arrive. Shown on both audiences deliberately: for venues the
  date is a signup deadline (they need to be live BEFORE it), which is more
  actionable than the consumer's anticipation, so there is no audience branch.

  TIME HANDLING — see the wall-clock note in AGENTS.md before changing this.
  The target is stored as a fixed instant in UTC and compared against Date.now()
  in absolute milliseconds. No local-timezone arithmetic anywhere: the visitor's
  own timezone is irrelevant to "how long until this instant". Brisbane is
  UTC+10 year-round (no daylight saving), so 10 Aug 2026 00:00 AEST is exactly
  9 Aug 2026 14:00 UTC and needs no seasonal adjustment.

  SSR — the page is statically prerendered, so server HTML is baked at BUILD
  time. Rendering digits server-side would ship values that are stale by however
  long sits between deploy and visit, and they would visibly snap to the truth on
  hydration. So the server renders STRUCTURE ONLY: the label, the four unit
  labels, and four width-reserved numeral slots holding a non-breaking space.
  The slot establishes both its width (w-[2ch]) and its line box (the nbsp), so
  populating the digits shifts nothing. First paint is meaningful and correct;
  no wrong value is ever displayed.

  useSyncExternalStore rather than useState+useEffect: the clock is an external
  mutable source, which is precisely what this hook is for. It also keeps the
  server/hydration snapshot explicit, and avoids calling setState synchronously
  inside an effect (which this repo's lint config rejects).

  MOTION — the digits changing is the only movement. No transitions, no reveal;
  the block inherits the Hero's existing `rise` from its parent rather than
  introducing an animation of its own.
*/

// 10 August 2026, 00:00:00 AEST (UTC+10) === 9 August 2026, 14:00:00 UTC.
const TARGET_MS = Date.UTC(2026, 7, 9, 14, 0, 0);

/*
  Build-time gate. Evaluated once when the module is first loaded, which for a
  statically prerendered page is at build. A build that runs after the target
  ships no markup at all and reserves no space — the Hero returns to exactly its
  pre-countdown composition with nothing to clean up.
*/
const LAUNCHED_AT_BUILD = Date.now() >= TARGET_MS;

/*
  Placeholder for a numeral slot before the client snapshot arrives. Must be a
  non-breaking space, not a literal " ": JSX collapses ordinary whitespace, and
  a collapsed slot has no line box, so the row would have no height until the
  digits land — reintroducing exactly the shift the reserved slot prevents.
  Built from a char code rather than pasted as a literal U+00A0 so the source
  stays pure ASCII — an invisible character here is silently destroyed by
  editors, formatters and search-and-replace, and the failure mode (a row with
  no height) looks like a CSS bug rather than a lost character.
*/
const NBSP = String.fromCharCode(160);

const SEGMENTS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
] as const;

type SegmentKey = (typeof SEGMENTS)[number]["key"];

function partsFrom(remainingMs: number): Record<SegmentKey, string> {
  const total = Math.floor(remainingMs / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    // Days is padded to 2 like the rest. The window from build to target is
    // three weeks, and it only counts down, so this never needs a third digit —
    // which is what makes the fixed 2ch slot safe.
    days: pad(Math.floor(total / 86400)),
    hours: pad(Math.floor(total / 3600) % 24),
    minutes: pad(Math.floor(total / 60) % 60),
    seconds: pad(total % 60),
  };
}

function subscribe(onStoreChange: () => void) {
  const id = setInterval(onStoreChange, 1000);
  // Background tabs throttle setInterval to roughly once a minute, so a tab
  // returning to the foreground can be showing a stale second. Re-read on focus
  // so the first thing a returning visitor sees is correct.
  document.addEventListener("visibilitychange", onStoreChange);
  return () => {
    clearInterval(id);
    document.removeEventListener("visibilitychange", onStoreChange);
  };
}

// Second granularity, not raw Date.now(): the snapshot must be stable between
// ticks or React re-renders on every pass and never settles.
const getSnapshot = () => Math.floor(Date.now() / 1000);

// 0 is the "not on the client yet" sentinel — it drives the empty-slot render
// during SSR and hydration.
const getServerSnapshot = () => 0;

export default function LaunchCountdown({
  softClassName,
}: {
  /* The Hero's audience-aware secondary-text class. Passed in rather than read
     from context so the AA contrast reasoning stays documented in one place. */
  softClassName: string;
}) {
  if (LAUNCHED_AT_BUILD) return null;
  return <Countdown softClassName={softClassName} />;
}

function Countdown({ softClassName }: { softClassName: string }) {
  const nowSeconds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const isPrePaint = nowSeconds === 0;
  const remainingMs = TARGET_MS - nowSeconds * 1000;

  /*
    Past the target on the client: hide entirely, per the brief. This covers a
    skewed system clock and the one accepted edge case — a pre-launch build
    still being served after launch, where the reserved slot collapses once on
    mount. A rebuild removes the component altogether via LAUNCHED_AT_BUILD.
  */
  if (!isPrePaint && remainingMs <= 0) return null;

  const parts = isPrePaint ? null : partsFrom(remainingMs);

  return (
    <div className="mt-8">
      <p className={`kicker ${softClassName}`}>Launching Brisbane</p>
      {/* Gap and numeral size step down on small screens. At text-5xl/gap-6 the
          four columns have an intrinsic width of ~337px, which overflows the
          content box on a 360px-wide phone (a very common Android width) and
          produces horizontal page scroll. Measured, not guessed. */}
      <div className="mt-4 flex items-start gap-4 sm:gap-8">
        {SEGMENTS.map((segment) => (
          <div key={segment.key} className="flex flex-col">
            <span
              className="index-num text-4xl text-white sm:text-5xl"
              // Equal glyph advance so a 1 and a 7 occupy the same width. The
              // 2ch slot below is the belt-and-braces if the face lacks
              // tabular figures.
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              <span className="inline-block w-[2ch]">
                {/* Before the client snapshot arrives, a non-breaking space
                    holds the line box open so the slot has its final height as
                    well as its final width. */}
                {parts ? parts[segment.key] : NBSP}
              </span>
            </span>
            <span className={`kicker mt-3 ${softClassName}`}>
              {segment.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
