import Image from "next/image";
import PillButton from "./PillButton";
import { venues } from "./venues";

/*
  Venue logo slider — two full-bleed rows scrolling in OPPOSITE directions, a
  continuous seamless loop (the track is duplicated; CSS translateX(-50%) lands
  on the repeat). Frozen under prefers-reduced-motion (see globals.css).

  The logos sit directly on the navy section (no per-logo boxes). They have mixed
  luminosity, so the dark/transparent ones flip to white via their `invert` flag
  while the colour logos read in their real colours on navy. Big, generously
  spaced, edge to edge. (Full-colour venue photos live on the Partnered Venues page.)
*/

const sequence = [...venues, ...venues, ...venues];

function Logo({ v }: { v: (typeof venues)[number] }) {
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
  return (
    <div className={`marquee w-full ${reverse ? "marquee--rev" : ""}`}>
      <div className="marquee__track">
        {[0, 1].map((seq) => (
          <span key={seq} className="flex items-center">
            {sequence.map((v, i) => (
              <Logo key={`${seq}-${i}`} v={v} />
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function VenueLogos() {
  return (
    <section
      aria-label="Partner venues"
      className="on-dark w-full overflow-hidden border-b border-white/15 bg-navy py-16 sm:py-20"
    >
      <div className="flex flex-col gap-12 sm:gap-14">
        <Row />
        <Row reverse />
      </div>
      <div className="mt-14 flex justify-center px-5 sm:mt-16 sm:px-8">
        <PillButton href="/partnered-venues" variant="solid" onDark>
          See partnered venues
        </PillButton>
      </div>
    </section>
  );
}
