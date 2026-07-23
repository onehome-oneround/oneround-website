import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EditorialTag from "@/components/EditorialTag";

export const metadata: Metadata = {
  title: { absolute: "About | OneRound" },
  description:
    "Why we built OneRound. Two founders, one problem: going out in Brisbane shouldn't be the same night, every time.",
  alternates: { canonical: "https://oneround.au/about" },
};

const FOUNDERS = [
  {
    index: "01",
    name: "Oscar",
    paragraphs: [
      "My friends and I always ended up at the same handful of venues. Not because they weren’t great, they were. We just didn’t have a reason to try somewhere new. Brisbane’s got so much more, and we were missing most of it.",
      "That’s why we built OneRound. Five Roundies a month give you a reason to try somewhere new. Member-only deals make going out cost less. And the app shows you where your mates are already heading. More venues in your mix, more nights that surprise you.",
    ],
  },
  {
    index: "02",
    name: "Joe",
    paragraphs: [
      "Talking to venue owners in Brisbane, I kept hearing the same thing. Quiet nights that stayed quiet no matter what they tried. Loyalty programs that never quite paid back. Marketing spend that felt like a coin flip. They needed something built for how hospitality actually runs.",
      "That’s why we built OneRound. Venues pick the item, the day, the cap. Members show up because they’ve already paid for the round. No ad spend, no lock-in, no complicated tech. Just people through the door on the nights it matters.",
    ],
  },
];

export default function AboutPage() {
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
              <EditorialTag index="·" label="About" className="text-navy" />
            </div>
            <h1
              className="mt-6 max-w-[18ch] text-ink"
              style={{ fontSize: "clamp(2.75rem, 7vw, 7rem)", lineHeight: "0.98", fontWeight: 600 }}
            >
              Why we built <span className="italic accent-text">OneRound.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Two founders. Two frustrations with going out in Brisbane. One
              product.
            </p>
          </div>
        </section>

        {/* Founder notes — two-column on desktop with a hairline divider, stacked
            on mobile. */}
        <section className="bg-[color:var(--paper)] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto grid max-w-[96rem] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {FOUNDERS.map((f, i) => (
              <div
                key={f.name}
                className={
                  i > 0
                    ? "lg:border-l lg:border-[color:var(--rule)] lg:pl-16"
                    : ""
                }
              >
                <EditorialTag index={f.index} label={f.name} className="text-navy" />

                <div className="mt-8 max-w-prose font-display text-lg leading-relaxed text-ink-soft sm:text-xl">
                  {f.paragraphs.map((p, j) => (
                    <p key={j} className={j > 0 ? "mt-5" : ""}>
                      {p}
                    </p>
                  ))}
                  <p className="mt-6 italic text-ink">&mdash; {f.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
