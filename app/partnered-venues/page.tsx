// Only venues that have confirmed public naming are listed here — the page reads
// `publicVenues`, never the full `venues` list. See components/venues.ts.
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EditorialTag from "@/components/EditorialTag";
import BrisbaneMap from "@/components/BrisbaneMap";
import { publicVenues } from "@/components/venues";

export const metadata: Metadata = {
  title: "Partnered venues",
  description:
    "The Brisbane venues live on OneRound. Redeem five Roundies a month, unlock exclusive Deals, and see where everyone's headed.",
  alternates: { canonical: "https://oneround.au/partnered-venues" },
};

/*
  Hidden pre-launch — restore once partner venues are signed and confirmed.
  The full page (header, venue grid, "More venues" callout, closing navy slab)
  is preserved verbatim in the SHOW_VENUES branch of the component below; while
  SHOW_VENUES is false a "Coming soon" holding page renders instead. To restore,
  flip this to true — nothing else to change. (A flag rather than a block comment
  because the old JSX contains its own nested JSX comments, which a plain comment
  wrapper cannot span.)
*/
const SHOW_VENUES = false;

/*
  The grid is 1 / 2 / 3 columns, so the venue count decides how much of the last
  row the trailing cell has to itself. Left as a single cell it would strand empty
  cells beside it, which read as bare rule-coloured blocks — so it stretches to
  fill the remainder, becoming a full-width band when the venues divide evenly.
  (Class names are spelled out in full so Tailwind still emits them.)
*/
const trailingSpan = [
  publicVenues.length % 2 === 0 ? "sm:col-span-2" : "",
  publicVenues.length % 3 === 0
    ? "lg:col-span-3 lg:flex-row lg:items-center lg:gap-8"
    : publicVenues.length % 3 === 1
      ? "lg:col-span-2"
      : "",
]
  .filter(Boolean)
  .join(" ");

export default function PartneredVenuesPage() {
  return (
    <>
      <Nav />
      {SHOW_VENUES ? (
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
              The Brisbane venues live on OneRound, with more added all the time. Redeem
              Roundies on us each month, unlock exclusive Deals, and see where
              everyone&rsquo;s headed.
            </p>
          </div>
        </section>

        {/* Venue grid */}
        <section className="bg-white px-5 pb-24 sm:px-8 sm:pb-28">
          <div className="mx-auto grid max-w-[96rem] grid-cols-1 gap-px border border-[color:var(--rule)] bg-[color:var(--rule)] sm:grid-cols-2 lg:grid-cols-3">
            {publicVenues.map((v, i) => (
              <article key={v.slug} className="group flex flex-col bg-white">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={v.photo}
                    alt={`${v.name}, Brisbane`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="hair-b flex items-baseline justify-between pb-3">
                    <span className="kicker text-navy">{String(i + 1).padStart(2, "0")}</span>
                    <span className="kicker text-ink-faint">Brisbane</span>
                  </div>
                  {/* One step up from text-3xl, taking the space the placeholder
                      description used to occupy. Deliberately NOT promoted onto
                      the display-* ramp: those tiers run 2.6rem-10rem and would
                      overrun a ~434px card column and compete with the h1. */}
                  <h2 className="mt-5 font-display text-4xl font-semibold text-ink">{v.name}</h2>
                </div>
              </article>
            ))}

            {/* Trailing cell — keeps the grid tidy + nods at what's next */}
            <article
              className={`flex flex-col items-start justify-center gap-4 bg-offwhite p-7 ${trailingSpan}`}
            >
              <span className="index-num accent-text text-5xl">+</span>
              <p className="font-display text-2xl font-medium leading-tight text-ink">
                More venues, all the time.
              </p>
              <p className="text-sm leading-relaxed text-ink-soft">
                We&rsquo;re adding venues across Brisbane, check back soon.
              </p>
            </article>
          </div>
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
      ) : (
      <main
        id="main-content"
        className="flex-1 bg-[color:var(--paper)] px-5 pb-24 pt-32 sm:px-8"
      >
        <div className="mx-auto max-w-[72rem]">
          {/* Blurred Brisbane map as a decorative backdrop, with the "Coming
              soon" content centred on top. Locked height so the client-loaded
              map shifts nothing (CLS 0). */}
          <div className="relative min-h-[500px] overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--rule)] sm:min-h-[600px]">
            {/* Map background — non-interactive, blurred, and extended past the
                container so the blur's soft edge is clipped rather than haloed. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6"
              style={{ filter: "blur(6px)" }}
            >
              <BrisbaneMap />
            </div>

            {/* Soft radial white scrim + centred content: opaque behind the text
                for legibility, lighter at the edges so the map stays visible. */}
            <div
              className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(var(--white-rgb),0.86) 0%, rgba(var(--white-rgb),0.62) 48%, rgba(var(--white-rgb),0.42) 100%)",
              }}
            >
              <p className="kicker text-navy">Partnered venues</p>
              <h1 className="display-section mt-6 text-navy">Coming soon.</h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
                Our launch lineup goes live in early August. Venue names revealed
                on launch day.
              </p>
            </div>

            {/* OSM attribution — outside the blur so it stays legible (OSM policy). */}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 z-10 rounded bg-white/85 px-1.5 py-0.5 text-[10px] leading-none text-ink-soft transition-colors hover:text-navy"
            >
              &copy; OpenStreetMap contributors
            </a>
          </div>
        </div>
      </main>
      )}
      <Footer />
    </>
  );
}
