import Image from "next/image";
import PillButton from "./PillButton";
import SectionFade from "./SectionFade";
import { publicVenues, type Venue } from "./venues";

/*
  Venue logo slider — two full-bleed rows scrolling in OPPOSITE directions, a
  continuous seamless loop (the track is duplicated; CSS translateX(-50%) lands
  on the repeat). Frozen under prefers-reduced-motion (see globals.css).

  The logos sit directly on the navy section (no per-logo boxes). They have mixed
  luminosity, so the dark/transparent ones flip to white via their `invert` flag
  while the colour logos read in their real colours on navy. Big, generously
  spaced, edge to edge. (Full-colour venue photos live on the Partnered Venues page.)
*/

// Each half of the track must out-run the widest viewport, or the loop's
// translateX(-50%) reveals dead space at the tail. Cells are a fixed 13rem, so
// repeat the venues until a half spans >= 15 cells (195rem ≈ 3120px) however few
// venues are confirmed.
const CELLS_PER_HALF = 15;
const REPEATS = publicVenues.length
  ? Math.ceil(CELLS_PER_HALF / publicVenues.length)
  : 0;
const sequence = Array.from({ length: REPEATS }, () => publicVenues).flat();

// The rows scroll opposite ways, but with only a handful of venues an identical
// order in both reads as one mirrored strip. Offsetting the reverse row's start
// keeps the two from marching in lockstep.
const offset = Math.floor(publicVenues.length / 2);
const reverseSequence = [...sequence.slice(offset), ...sequence.slice(0, offset)];

function Logo({ v }: { v: Venue }) {
  // Each logo sits centred in an identical fixed-width cell, so the cadence is
  // perfectly even regardless of how wide each logo is (the cause of the
  // bunched/gappy look when spacing by margins). Height normalised inline.
  return (
    <span
      className="flex shrink-0 items-center justify-center"
      style={{ width: "13rem" }}
    >
      <Image
        src={v.logo.src}
        alt={v.name}
        width={v.logo.w}
        height={v.logo.h}
        className="object-contain"
        style={{
          height: "3.25rem",
          width: "auto",
          maxWidth: "10.5rem",
          ...(v.logo.invert ? { filter: "brightness(0) invert(1)" } : {}),
          ...(v.logo.screen ? { mixBlendMode: "screen" as const } : {}),
        }}
      />
    </span>
  );
}

function Row({ reverse }: { reverse?: boolean }) {
  const cells = reverse ? reverseSequence : sequence;
  return (
    <div className={`marquee w-full ${reverse ? "marquee--rev" : ""}`}>
      <div className="marquee__track">
        {[0, 1].map((seq) => (
          <span key={seq} className="flex items-center">
            {cells.map((v, i) => (
              <Logo key={`${seq}-${i}`} v={v} />
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function VenueLogos() {
  // No confirmed venues means no slider at all, rather than an empty navy slab.
  if (!publicVenues.length) return null;

  return (
    <section
      aria-label="Partner venues"
      className="on-dark relative w-full overflow-hidden border-b border-white/15 bg-navy py-16 sm:py-20"
    >
      {/* Top fade — the white WhatToExpect above eases into this navy strip.
          Kept short so it stays in the top padding and never washes the logos. */}
      <SectionFade edge="top" color="var(--white)" height="h-16" />
      <div className="relative z-10 flex flex-col gap-12 sm:gap-14">
        <Row />
        <Row reverse />
      </div>
      <div className="relative z-10 mt-14 flex justify-center px-5 sm:mt-16 sm:px-8">
        <PillButton href="/partnered-venues" variant="solid" onDark>
          See partnered venues
        </PillButton>
      </div>
    </section>
  );
}
