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
    "The Brisbane venues live on OneRound. Claim complimentary Roundies each month, unlock exclusive Deals, and see where everyone's headed.",
  alternates: { canonical: "https://oneround.au/partnered-venues" },
};

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
      <main className="flex-1">
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
              <EditorialTag index="·" label="Partner venues" className="accent-text" />
            </div>
            <h1
              className="mt-6 max-w-[16ch] text-ink"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: "0.98", fontWeight: 600 }}
            >
              Partnered <span className="italic accent-text">venues.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              The Brisbane venues live on OneRound, with more added all the time. Claim
              complimentary Roundies each month, unlock exclusive Deals, and see where
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
                    <span className="kicker accent-text">{String(i + 1).padStart(2, "0")}</span>
                    <span className="kicker text-ink-faint">Brisbane</span>
                  </div>
                  <h2 className="mt-5 font-display text-3xl font-semibold text-ink">{v.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{v.description}</p>
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
      <Footer />
    </>
  );
}
