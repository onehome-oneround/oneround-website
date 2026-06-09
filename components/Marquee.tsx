"use client";

import { useAudience } from "./AudienceProvider";

/*
  Ticker — the connective thread of the broadsheet. A hard-edged strip that
  scrolls big Fraunces words split by mono tokens, at slab seams. Phrases swap
  with the audience toggle. Track is duplicated for a seamless loop; pauses on
  hover; frozen for reduced-motion. tone + direction stay configurable.
*/

type Tone = "navy" | "blue" | "white";

const USER_WORDS = [
  "Five free items a month",
  "Exclusive deals",
  "See where everyone's going",
  "Your reason to get out",
  "Brisbane's best venues",
];

const VENUE_WORDS = [
  "More customers through your door",
  "Free to join",
  "Brisbane's best venues",
  "Exclusive deals drive traffic",
  "New faces, real spend",
];

const toneClass: Record<Tone, string> = {
  navy: "bg-navy text-white",
  blue: "bg-blue text-white",
  white: "bg-white text-ink",
};

function Sep({ tone }: { tone: Tone }) {
  return (
    <span
      aria-hidden="true"
      className={`px-5 font-mono text-xs sm:px-8 ${
        tone === "white" ? "text-blue" : "text-white/55"
      }`}
    >
      ✳
    </span>
  );
}

export default function Marquee({
  tone = "blue",
  reverse = false,
}: {
  tone?: Tone;
  reverse?: boolean;
}) {
  const { audience } = useAudience();
  const words = audience === "venue" ? VENUE_WORDS : USER_WORDS;

  return (
    <section
      aria-label={words.join(", ")}
      className={`marquee hair-t hair-b py-4 sm:py-5 ${toneClass[tone]} ${
        reverse ? "marquee--rev" : ""
      }`}
    >
      <div className="marquee__track">
        {[0, 1].map((seq) => (
          <span key={seq} className="flex items-center">
            {words.map((w) => (
              <span key={w} className="flex items-center">
                <span className="font-display text-2xl italic sm:text-4xl">{w}</span>
                <Sep tone={tone} />
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  );
}
