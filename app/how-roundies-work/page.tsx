import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import DownloadButtons from "@/components/DownloadButtons";
import PhoneMockup from "@/components/PhoneMockup";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "How Roundies work",
  description:
    "A Roundie is one free food or drink item you can claim each day at a participating venue. Select from the Roundie menu, scan, and enjoy.",
  alternates: { canonical: "https://oneround.au/how-roundies-work" },
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
    title: "Select from the Roundie menu",
    body: "Open the app and browse the venue's Roundie menu to see what's free today, then pick your item.",
    visual: "phone",
    label: "app-roundie-menu",
    intent: "Real app screenshot — the venue's Roundie menu screen. (User to supply UI.)",
  },
  {
    n: "02",
    title: "Scan",
    body: "At the venue, scan your unique Roundie code to redeem your pick — quick and contactless.",
    visual: "phone",
    label: "app-roundie-scan",
    intent: "Real app screenshot — the scan / redeem screen. (User to supply UI.)",
  },
  {
    n: "03",
    title: "Enjoy",
    body: "Grab your complimentary item and enjoy. That's your daily Roundie — come back tomorrow for another.",
    visual: "photo",
    label: "people-enjoying",
    intent: "Real photo — people having a great time at a venue, drinks/food in hand.",
  },
];

export default function HowRoundiesWorkPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Header */}
        <section className="px-5 pb-8 pt-32 sm:px-8 sm:pt-40">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft transition hover:text-ink"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M19 12H5m6 6-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to home
            </Link>

            <p className="kicker accent-text mt-10">Roundies</p>
            <h1 className="mt-4 text-balance text-5xl font-extrabold leading-[0.9] tracking-[-0.035em] text-ink sm:text-7xl">
              How Roundies{" "}
              <span
                className="accent-swipe"
                style={{ ["--swipe" as string]: "var(--accent)", ["--swipe-d" as string]: "0.45s" }}
              >
                work
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              A Roundie is one free food or drink item you can claim each day at a
              participating venue — an actual item on us, not a discount. Here&rsquo;s
              all there is to it.
            </p>
          </div>
        </section>

        {/* Steps — alternating rows */}
        <section className="px-5 py-10 sm:px-8 sm:py-12">
          <div className="mx-auto flex max-w-5xl flex-col gap-16 sm:gap-24">
            {steps.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <div
                  key={s.n}
                  className="on-scroll grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                >
                  {/* Visual */}
                  <div className={`flex justify-center ${flip ? "lg:order-2" : ""}`}>
                    {s.visual === "phone" ? (
                      <PhoneMockup
                        screenLabel={s.label}
                        screenIntent={s.intent}
                        tilt={flip ? 5 : -5}
                      />
                    ) : (
                      <div className="relative w-full max-w-[420px]">
                        <div className="bloom absolute inset-0 -z-10 opacity-60" />
                        <ImagePlaceholder
                          label={s.label}
                          intent={s.intent}
                          tone="deep"
                          className="aspect-[4/5] w-full rotate-[3deg] rounded-3xl border border-[color:var(--line)] shadow-2xl"
                        />
                      </div>
                    )}
                  </div>

                  {/* Copy */}
                  <div className={flip ? "lg:order-1" : ""}>
                    <span className="font-display text-6xl font-extrabold leading-none tracking-tight accent-text">
                      {s.n}
                    </span>
                    <h2 className="mt-4 text-3xl font-extrabold leading-[0.98] tracking-[-0.03em] text-ink sm:text-4xl">
                      {s.title}
                    </h2>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
                      {s.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Closing — one per day + download */}
        <section className="px-5 py-16 sm:px-8 sm:py-20">
          <div className="on-scroll relative mx-auto flex max-w-5xl flex-col items-center gap-6 overflow-hidden rounded-[2rem] bg-navy px-6 py-16 text-center sm:px-12">
            <span aria-hidden="true" className="grain" />
            <h2 className="relative z-10 text-3xl font-extrabold leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl">
              One Roundie a day, every day.
            </h2>
            <p className="relative z-10 max-w-md text-base leading-relaxed text-white/75">
              Get the app and start claiming at venues across Brisbane.
            </p>
            <div className="relative z-10 mt-2 flex flex-col items-center gap-3">
              <DownloadButtons center />
              <Link
                href="/"
                className="text-sm font-semibold text-white/70 transition hover:text-white"
              >
                ← Back to home
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
