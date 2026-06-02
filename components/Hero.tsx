"use client";

import DownloadButtons from "./DownloadButtons";
import ImagePlaceholder from "./ImagePlaceholder";
import { useAudience } from "./AudienceProvider";

/*
  Home hero — IDENTICAL on both sides; only the accent colour + copy change.
  A bright accent band fades down into white (Users = light-blue #1e88f3 fade,
  Venues = navy #020031 fade — same treatment via --accent). White headline +
  subhead + badges sit on the band; the "going" accent word is the OPPOSITE
  colour to the band for contrast. A contained hero visual fills the space below.
*/

export default function Hero() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";

  const subhead = isVenue
    ? "More customers through your door — free to join, with the option to feature your venue for more reach."
    : "A free item every day at Brisbane's best venues, deals you won't find anywhere else, and a live look at where everyone's headed. Whatever the occasion, one app.";

  const heroImage = isVenue
    ? {
        label: "hero-venue-interior",
        intent: "Real photo — a buzzing Brisbane venue interior. Premium, busy, inviting.",
      }
    : {
        label: "hero-packed-venue",
        intent: "Real photo — a packed Brisbane venue, big energy. Wide, fills the frame.",
      };

  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-28 text-center sm:px-8 sm:pb-24 sm:pt-36">
      {/* Accent band fading to white (colour follows --accent) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(90% 55% at 50% -8%, rgba(255,255,255,0.5), rgba(255,255,255,0) 55%), linear-gradient(180deg, var(--accent) 0%, var(--accent) 26%, color-mix(in srgb, var(--accent) 48%, transparent) 48%, color-mix(in srgb, var(--accent) 12%, transparent) 66%, rgba(255,255,255,0) 84%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <h1
          className="reveal-clip text-balance text-[3.4rem] font-extrabold leading-[0.9] tracking-[-0.035em] text-white [text-shadow:0_2px_24px_rgba(2,0,49,0.28)] sm:text-[5.75rem]"
          style={{ ["--d" as string]: "0.12s" }}
        >
          See where everyone&rsquo;s{" "}
          <span
            className="accent-swipe"
            style={{
              ["--swipe" as string]: isVenue ? "var(--blue)" : "var(--navy)",
              ["--swipe-d" as string]: "0.8s",
            }}
          >
            going
          </span>
          .
        </h1>

        <p
          className="reveal mx-auto mt-7 max-w-xl text-base font-medium leading-relaxed text-white [text-shadow:0_1px_14px_rgba(2,0,49,0.35)] sm:text-lg"
          style={{ ["--d" as string]: "0.28s" }}
        >
          {subhead}
        </p>

        <div
          className="reveal mt-9 flex flex-col items-center gap-3"
          style={{ ["--d" as string]: "0.42s" }}
        >
          <DownloadButtons center />
          <p className="text-xs font-medium text-white/90 [text-shadow:0_1px_10px_rgba(2,0,49,0.4)]">
            Free to download. Available on iOS and Android.
          </p>
        </div>
      </div>

      {/* Contained hero visual filling the space below the copy */}
      <div
        className="reveal relative z-10 mx-auto mt-12 max-w-5xl sm:mt-16"
        style={{ ["--d" as string]: "0.55s" }}
      >
        <ImagePlaceholder
          label={heroImage.label}
          intent={heroImage.intent}
          tone="deep"
          align="center"
          className="aspect-[16/9] w-full rounded-[1.75rem] border border-white/50 shadow-[0_40px_90px_-40px_rgba(2,0,49,0.45)] sm:aspect-[16/7]"
        />
      </div>
    </section>
  );
}
