import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import PillButton from "@/components/PillButton";

export const metadata: Metadata = {
  title: "For venues",
  description:
    "OneRound brings new customers into your venue and gives them a reason to spend — free to join, with the option to feature your venue for more reach.",
  alternates: { canonical: "https://oneround.au/partners" },
};

const EMAIL = "hello@oneround.au";

const reasons = [
  {
    title: "Free to join",
    body: "There's no cost to be on OneRound. List your venue, go live with your Roundie, and start reaching people deciding where to go.",
  },
  {
    title: "Real foot traffic",
    body: "Roundies and Deals give people a reason to choose your venue now, not someday.",
  },
  {
    title: "New faces",
    body: "The social layer puts your venue in front of people deciding where to go.",
  },
];

const steps = [
  {
    n: "1",
    title: "Get set up",
    body: "We handle the hardware and onboarding — scanner and screen, ready to go.",
  },
  {
    n: "2",
    title: "Go live",
    body: "Your venue appears in the app with your Roundie and any deals.",
  },
  {
    n: "3",
    title: "Feature your venue",
    body: "Optionally boost your visibility with a featured spot to reach even more people.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <Nav />
      {/* Force the navy accent across the venue page */}
      <main data-audience="venue" className="flex-1">
        {/* Hero */}
        <section className="px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="kicker accent-text">For venue partners</p>
              <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[0.95] tracking-[-0.03em] text-ink sm:text-5xl lg:text-7xl">
                More feet through the door. Free to join.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
                OneRound brings new customers into your venue and gives them a
                reason to spend — free to join, with the option to feature your
                venue for more reach.
              </p>
              <div className="mt-8">
                <PillButton
                  href={`mailto:${EMAIL}?subject=OneRound%20for%20my%20venue`}
                  icon="arrow"
                >
                  Email {EMAIL}
                </PillButton>
              </div>
            </div>
            <ImagePlaceholder
              label="partner-dashboard-ui"
              intent="Clean shot of the venue dashboard — redemptions and new customers at a glance."
              tone="deep"
              className="aspect-[4/3] w-full rounded-3xl border border-[color:var(--line)] shadow-[0_30px_70px_-40px_rgba(2,0,49,0.4)]"
            />
          </div>
        </section>

        {/* Why venues join */}
        <section className="px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <p className="kicker accent-text">Why venues join</p>
              <h2 className="mt-4 text-3xl font-extrabold leading-[0.98] tracking-[-0.03em] text-ink sm:text-5xl">
                Free to join. Grow from there.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {reasons.map((r, i) => (
                <div
                  key={r.title}
                  className="flex flex-col rounded-3xl border border-[color:var(--line)] bg-offwhite p-7"
                >
                  <span className="font-display text-4xl font-extrabold leading-none tracking-tight accent-text">
                    0{i + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-extrabold text-ink">{r.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{r.body}</p>
                </div>
              ))}
            </div>
            <ImagePlaceholder
              label="partner-venue-interior"
              intent="Real venue interior / crowd — a great-looking Brisbane bar full of people. Trust and atmosphere."
              tone="deep"
              className="mt-6 aspect-[16/9] w-full rounded-3xl border border-[color:var(--line)]"
            />
          </div>
        </section>

        {/* How partnering works */}
        <section className="px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-3xl font-extrabold leading-[0.98] tracking-[-0.03em] text-ink sm:text-5xl">
              How partnering works
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">
              {steps.map((s) => (
                <div key={s.n}>
                  <div className="accent-fill flex h-12 w-12 items-center justify-center rounded-full font-display text-xl font-extrabold text-white">
                    {s.n}
                  </div>
                  <h3 className="mt-5 text-xl font-extrabold text-ink">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner CTA */}
        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 overflow-hidden rounded-[2rem] bg-navy px-6 py-16 text-center sm:px-12">
            <span aria-hidden="true" className="grain" />
            <h2 className="relative z-10 text-3xl font-extrabold leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl">
              Want OneRound in your venue?
            </h2>
            <p className="relative z-10 max-w-md text-base leading-relaxed text-white/75">
              Get in touch and we&rsquo;ll get you set up.
            </p>
            <a
              href={`mailto:${EMAIL}?subject=OneRound%20for%20my%20venue`}
              className="relative z-10 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-8 text-base font-bold text-navy transition hover:brightness-95 active:scale-[0.98]"
            >
              Email {EMAIL}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
