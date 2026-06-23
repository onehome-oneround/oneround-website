import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
// HIDDEN until launch - re-enable: app store links (closing CTA download badges)
// import DownloadButtons from "@/components/DownloadButtons";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import EditorialTag from "@/components/EditorialTag";
import ClosingHeadline from "@/components/ClosingHeadline";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "How Deals work",
  description:
    "Deals are exclusive offers you will only find through OneRound. See what a venue is offering, scan the deal's QR code, and enjoy.",
  alternates: { canonical: "https://oneround.au/how-deals-work" },
};

type Step = {
  n: string;
  title: string;
  body: string;
  visual: "phone" | "photo";
  label: string;
  intent: string;
};

const steps: Step[] = [
  {
    n: "01",
    title: "See what deals a venue is offering",
    body: "Open the app and browse a venue's deals to see what is on, then choose the one you want.",
    visual: "phone",
    label: "app-deals-list",
    intent: "Venue deals list screen. Real UI later.",
  },
  {
    n: "02",
    title: "Scan the deal's QR code",
    body: "At the venue, scan the deal's QR code to unlock the offer. Quick and contactless.",
    visual: "phone",
    label: "app-deals-scan",
    intent: "Scan and redeem screen. Real UI later.",
  },
  {
    n: "03",
    title: "Enjoy",
    body: "Enjoy your deal, and there is always another one waiting.",
    visual: "photo",
    label: "people-enjoying",
    intent: "Real photo, people enjoying a venue with food and drinks.",
  },
];

export default function HowDealsWorkPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Header — white slab */}
        <section className="bg-white px-5 pb-12 pt-28 sm:px-8 sm:pt-36">
          <div className="mx-auto max-w-[96rem]">
            <Link href="/" className="kicker inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M19 12H5m6 6-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to home
            </Link>

            <div className="mt-10">
              <EditorialTag index="·" label="Deals" className="accent-text" />
            </div>
            <h1
              className="mt-8 max-w-[16ch] text-ink"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: "0.98", fontWeight: 600 }}
            >
              How Deals <span className="italic accent-text">work.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Deals are exclusive offers you will only find through OneRound, on top of
              your monthly Roundies. Use as many as you like, whenever they are running.
              Here is all there is to it.
            </p>
          </div>
        </section>

        {/* Steps — alternating editorial rows */}
        <section className="bg-white px-5 pb-12 sm:px-8">
          <div className="mx-auto flex max-w-[96rem] flex-col">
            {steps.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <div
                  key={s.n}
                  className="on-scroll grid items-center gap-8 border-t border-[color:var(--rule)] py-10 lg:grid-cols-2 lg:gap-16 lg:py-12"
                >
                  <div
                    className={`flex justify-center ${
                      flip ? "lg:order-2 lg:justify-start" : "lg:justify-end"
                    }`}
                  >
                    {s.visual === "phone" ? (
                      // Placeholder sized to the real phone image footprint used on the
                      // roundies/social pages (4:5 box at max-w 300/340) so proportions
                      // stay consistent. Swap for an <Image> when the UI is ready.
                      <ImagePlaceholder
                        label={s.label}
                        intent={s.intent}
                        tone="deep"
                        fig={s.n}
                        className="aspect-[4/5] w-full max-w-[300px] rounded-3xl sm:max-w-[340px]"
                      />
                    ) : (
                      <ImagePlaceholder
                        label={s.label}
                        intent={s.intent}
                        tone="deep"
                        fig={s.n}
                        className="aspect-[4/5] w-full max-w-[420px] rounded-3xl"
                      />
                    )}
                  </div>
                  <div
                    className={`flex justify-start ${
                      flip ? "lg:order-1 lg:justify-end" : "lg:justify-start"
                    }`}
                  >
                    <div className="w-full max-w-md">
                      <span className="index-num accent-text text-7xl sm:text-8xl">{s.n}</span>
                      <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                        {s.title}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-ink-soft">{s.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Closing — navy slab */}
        <section className="on-dark bg-navy px-5 py-28 sm:px-8 sm:py-32">
          <div className="on-scroll mx-auto max-w-[96rem]">
            {/* HIDDEN until launch - re-enable: app store links ("Get the app" kicker) */}
            {/* <p className="kicker text-white/60">Get the app</p> */}
            <ClosingHeadline
              users={{ lead: "Offers you won't find", accent: "anywhere else." }}
              venues={{ lead: "Fill your", accent: "quiet periods." }}
            />
            <div className="mt-12 flex flex-col gap-4 border-t border-white/25 pt-10 sm:flex-row sm:items-center sm:justify-between">
              {/* HIDDEN until launch - re-enable: app store links (download badges) */}
              {/* <DownloadButtons /> */}
              <Link href="/" className="kicker text-white/60 transition-colors hover:text-white">
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollReveal />
    </>
  );
}
