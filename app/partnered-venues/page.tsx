// Only venues that have confirmed public naming are listed here — the page reads
// `publicVenues`, never the full `venues` list. See components/venues.ts.
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EditorialTag from "@/components/EditorialTag";
import { publicVenues } from "@/components/venues";

export const metadata: Metadata = {
  title: "Partnered venues",
  description:
    "Meet OneRound's 14 launch partners across Brisbane. Redeem five Roundies a month, unlock exclusive Deals, and see where everyone's headed.",
  alternates: { canonical: "https://oneround.au/partnered-venues" },
};

const darkLogoSlugs = new Set([
  "eclipse",
  "pawn-and-co",
  "sugar-nightclub",
  "summa-house",
  "pop-world-nightclub",
  "the-normanby",
]);

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
              14 launch partners across Brisbane, with more added all the time. Redeem
              Roundies on us each month, unlock exclusive Deals, and see where
              everyone&rsquo;s headed.
            </p>
          </div>
        </section>

        {/* Venue grid */}
        <section className="bg-white px-5 pb-24 sm:px-8 sm:pb-28">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-stretch gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {publicVenues.map((v) => {
              return (
                <article key={v.slug} className="group flex h-full flex-col items-center rounded-xl bg-white p-5 text-center shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.10)]">
                  <div className="relative flex h-[160px] w-full shrink-0 items-center justify-center overflow-hidden">
                    <Image
                      src={v.logo.src}
                      alt={`${v.name} logo`}
                      width={v.logo.w}
                      height={v.logo.h}
                      className={`max-h-[130px] w-auto max-w-[90%] object-contain ${darkLogoSlugs.has(v.slug) ? "bg-white p-2" : ""}`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col items-center">
                    <h2 className="mt-3 text-base font-bold leading-tight text-navy">{v.name}</h2>
                    <p className="mt-1 text-[13px] text-ink-soft">{v.suburb}</p>
                  </div>
                </article>
              );
            })}
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
      <Footer />
    </>
  );
}
