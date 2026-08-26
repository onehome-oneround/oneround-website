// Only venues that have confirmed public naming are listed here — the page reads
// `publicVenues`, never the full `venues` list. See components/venues.ts.
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EditorialTag from "@/components/EditorialTag";
import { publicVenues } from "@/components/venues";

const count = publicVenues.length;

export const metadata: Metadata = {
  title: "Partnered venues",
  description: `Meet OneRound's ${count} launch partners across Brisbane. Redeem five Roundies a month, unlock exclusive Deals, and see where everyone's headed.`,
  alternates: { canonical: "https://oneround.au/partnered-venues" },
};

// A tile whose own background is near-white bleeds into the white page, so it
// needs a hairline to hold its edge. Dark tiles define their own edge, and a
// border on those would only draw a box around nothing. Threshold is relative
// luminance, so the two cream Pig N Whistle tiles count as light too.
function needsEdge(bg: string) {
  const n = parseInt(bg.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 200;
}

export default function PartneredVenuesPage() {
  return (
    <>
      <Nav />
      <main id="main-content" className="flex-1">
        {/* Header — white slab */}
        <section className="bg-white px-5 pb-12 pt-24 sm:px-8 sm:pt-28">
          <div className="mx-auto max-w-[96rem]">
            <Link
              href="/"
              className="kicker inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M19 12H5m6 6-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to home
            </Link>

            <div className="mt-8">
              <EditorialTag index="·" label="Partner venues" className="text-navy" />
            </div>
            <h1
              className="mt-6 max-w-[16ch] text-ink"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: "0.98", fontWeight: 600 }}
            >
              Partnered <span className="italic accent-text">venues.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              {`${count} launch partners across Brisbane, with more added all the time. Redeem Roundies on us each month, unlock exclusive Deals, and see where everyone’s headed.`}
            </p>
          </div>
        </section>

        {/*
          Venue grid. Every tile is an identical 4:3 box filled edge to edge
          (`object-cover` over a pre-generated 4:3 asset), so the venues' wildly
          different logo shapes and baked-in background colours read as one grid.
          The box is reserved by aspect-ratio and painted in the tile's own
          background colour, so nothing shifts and no dark tile flashes white.
        */}
        <section className="bg-white px-5 pb-24 sm:px-8 sm:pb-28">
          <ul className="mx-auto grid max-w-[96rem] grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {publicVenues.map((v, i) => (
              <li key={v.slug} className="group flex h-full flex-col">
                <div
                  className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl transition-transform duration-200 ease-out group-hover:-translate-y-1 ${
                    needsEdge(v.tile.bg) ? "ring-1 ring-inset ring-black/15" : ""
                  }`}
                  style={{ backgroundColor: v.tile.bg }}
                >
                  <Image
                    src={v.tile.src}
                    alt={`${v.name} logo`}
                    fill
                    sizes="(min-width: 1280px) 18vw, (min-width: 1024px) 23vw, (min-width: 640px) 31vw, 45vw"
                    className="object-cover"
                    preload={i < 5}
                  />
                </div>
                <div className="mt-3 flex-1 rounded-lg border border-black/10 px-3 py-2.5">
                  <h2 className="text-[15px] font-bold leading-snug text-navy">{v.name}</h2>
                  <p className="mt-0.5 text-[13px] text-ink-soft">{v.suburb}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Closing — navy slab */}
        <section className="on-dark bg-navy px-5 py-24 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-[96rem]">
            <p className="kicker text-white/60">Get the app</p>
            <h2
              className="mt-6 max-w-[18ch] text-white"
              style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)", lineHeight: "0.98", fontWeight: 600 }}
            >
              See where everyone&rsquo;s <span className="italic text-blue">going.</span>
            </h2>
            <div className="mt-10 border-t border-white/25 pt-10">
              <Link href="/" className="kicker text-white/60 transition-colors hover:text-white">
                ← Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
