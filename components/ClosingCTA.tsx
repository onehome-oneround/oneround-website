"use client";

import DownloadButtons from "./DownloadButtons";
import { useAudience } from "./AudienceProvider";

/*
  Closing CTA — the bookend. A full BLUE slab, type-dominant: a giant Fraunces
  headline with the editorial italic accent on the closing words, the store
  badges, and a mono note. The tagline swaps per side (Users / Venues).
  id="download" is the nav store target.
*/

export default function ClosingCTA() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";
  const lead = isVenue ? "Their reason to " : "Your reason to ";
  const accent = isVenue ? "walk in" : "get out";
  return (
    <section id="download" className="scroll-mt-16 bg-blue px-5 py-24 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[96rem]">
        <p className="kicker text-white/70">Download / Free / iOS + Android</p>
        <h2
          className="mt-6 max-w-[18ch] text-white"
          style={{ fontSize: "clamp(3rem, 9vw, 9.5rem)", lineHeight: "0.98", fontWeight: 600 }}
        >
          {lead}
          <span
            className="accent-ital"
            style={{ color: "var(--navy)", ["--rule-color" as string]: "var(--navy)" }}
          >
            {accent}
          </span>
          .
        </h2>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/25 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <DownloadButtons />
          <p className="max-w-xs text-sm font-medium leading-relaxed text-navy">
            Download the app today. Free to download. Available on iOS and Android.
          </p>
        </div>
      </div>
    </section>
  );
}
