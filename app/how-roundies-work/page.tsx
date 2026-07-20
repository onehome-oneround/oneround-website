import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Image from "next/image";
// HIDDEN until launch - re-enable: app store links (closing CTA download badges)
// import DownloadButtons from "@/components/DownloadButtons";
import EditorialTag from "@/components/EditorialTag";
import ClosingHeadline from "@/components/ClosingHeadline";

export const metadata: Metadata = {
  title: "How Roundies work",
  description:
    "A Roundie is a complimentary item at a participating venue. Membership gives you five a month, one per outing. Select from the Roundie menu, scan, and enjoy.",
  alternates: { canonical: "https://oneround.au/how-roundies-work" },
};

type Step = {
  n: string;
  title: string;
  body: string;
  visual: "phone" | "photo";
  src: string;
};

const steps: Step[] = [
  {
    n: "01",
    title: "Browse the Roundie menu",
    body: "Open the app and browse the venue's Roundie menu to see what's on offer, and find the item you want.",
    visual: "phone",
    src: "/images/menu-round.png",
  },
  {
    n: "02",
    title: "Order and scan",
    body: "At the venue, let the staff know what you'd like, then scan your unique code to redeem it. Quick and contactless, one per outing.",
    visual: "phone",
    src: "/images/qr-round.png",
  },
  {
    n: "03",
    title: "Enjoy",
    body: "Grab your item on us and enjoy. That's one of your five Roundies this month, come back for the next.",
    visual: "photo",
    src: "/images/enjoy-round.png",
  },
];

export default function HowRoundiesWorkPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Header — white slab */}
        <section className="bg-white px-5 pb-12 pt-24 sm:px-8 sm:pt-28">
          <div className="mx-auto max-w-[96rem]">
            <Link href="/" className="kicker inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M19 12H5m6 6-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to home
            </Link>

            <div className="mt-8">
              <EditorialTag index="·" label="Roundies" className="text-navy" />
            </div>
            <h1
              className="mt-6 max-w-[16ch] text-ink"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: "0.98", fontWeight: 600 }}
            >
              How Roundies <span className="italic accent-text">work.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              A Roundie is a complimentary item at a participating venue. Your
              membership gives you five a month, one per outing. An actual item on us,
              not a discount. Here&rsquo;s all there is to it.
            </p>
          </div>
        </section>

        {/* Two kinds of Roundies — primary flow, deliberately ahead of the redeem
            steps: a reader needs to know WHAT a Roundie is before HOW to claim
            one, and "some come with a purchase" is the fact most likely to catch
            someone out later.

            Ground stays --paper even though this is now main flow rather than an
            aside. The header above and the steps below are both white, so a white
            section here would leave the entire page body one uninterrupted white
            field until the navy close. Paper gives white → paper → white → navy,
            and separates the conceptual chapter from the procedural one.

            No cards: this page separates with hairlines. */}
        <section className="bg-[color:var(--paper)] px-5 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-[96rem]">
            {/* Still "·", not "01", now that this leads. Two reasons. This page's
                EditorialTag convention is "·" — the masthead above uses it, and
                nothing on the page numbers its sections. More decisively, the
                steps immediately below open with a display "01" for "Browse the
                Roundie menu": tagging this section "01" would put two different
                01s within a screen of each other, meaning different things. The
                dot sidesteps that collision entirely. */}
            <EditorialTag index="·" label="Two kinds of Roundies" className="text-navy" />
            <h2 className="mt-6 max-w-[18ch] font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Two kinds of Roundies.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
              Both are complimentary. One you claim with nothing at all. The other
              comes with a small purchase alongside it, and unlocks items a venue
              would rarely give away otherwise.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <span className="kicker text-navy">Standalone</span>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink">
                  An item on us, no strings.
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  You claim it, you get it. Nothing to buy, nothing to add. Walk in,
                  scan, walk out with it.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-faint">
                  A beer. A coffee. A slice of pizza.
                </p>
              </div>

              {/* Tailwind border utilities, NOT `lg:hair-l`. hair-l is a plain
                  CSS class from globals.css, and a `lg:` variant cannot be
                  applied to a non-utility class — it compiles to nothing and the
                  rule silently never renders. Verified: border-left-width came
                  back 0px. */}
              <div className="lg:border-l lg:border-[color:var(--rule)] lg:pl-16">
                <span className="kicker text-navy">Paired</span>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink">
                  An item on us, with a small purchase.
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  The venue asks you to buy something alongside it. That trade is what
                  lets them put up bigger and better items than they could afford to
                  hand over for nothing.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-faint">
                  A bowl of chips with a beer. A spirit with any main.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Steps — alternating editorial rows.

            pt-24/sm:pt-32 is required now that this follows the paper section
            rather than the header. It previously had no top padding and borrowed
            the header's pb-12; after the reorder the first row's border-t landed
            flush on the paper→white seam, putting a hairline exactly on a colour
            boundary where it reads as a dirty edge rather than an opening rule. */}
        <section className="bg-white px-5 pb-12 pt-20 sm:px-8 sm:pt-24">
          <div className="mx-auto flex max-w-[96rem] flex-col">
            {steps.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <div
                  key={s.n}
                  className="grid items-center gap-8 border-t border-[color:var(--rule)] py-10 lg:grid-cols-2 lg:gap-12 lg:py-12"
                >
                  <div
                    className={`flex justify-center ${
                      flip ? "lg:order-2 lg:justify-start" : "lg:justify-end"
                    }`}
                  >
                    {s.visual === "phone" ? (
                      <Image
                        src={s.src}
                        alt={s.title}
                        width={3375}
                        height={4219}
                        sizes="(max-width: 1024px) 70vw, 340px"
                        className="h-auto w-full max-w-[300px] sm:max-w-[340px]"
                        style={{ objectFit: "contain" }}
                      />
                    ) : (
                      <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-3xl bg-offwhite">
                        <Image
                          src={s.src}
                          alt={s.title}
                          fill
                          quality={90}
                          // The 3:2 source is cover-cropped into a 4:5 box, so the
                          // browser scales it to fill by height. A width-only sizes
                          // hint (e.g. 420px) under-provisions the height and the
                          // browser upscales the result. Requesting a large slot makes
                          // Next serve the full-resolution source (capped at 1537px).
                          sizes="1024px"
                          className="object-cover"
                          style={{ objectFit: "cover", objectPosition: "center" }}
                        />
                      </div>
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
        <section className="on-dark bg-navy px-5 py-24 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-[96rem]">
            {/* HIDDEN until launch - re-enable: app store links ("Get the app" kicker) */}
            {/* <p className="kicker text-white/60">Get the app</p> */}
            <ClosingHeadline
              users={{ lead: "Five on us,", accent: "every month." }}
              venues={{ lead: "Bring people through", accent: "your door." }}
            />
            <div className="mt-10 flex flex-col gap-4 border-t border-white/25 pt-10 sm:flex-row sm:items-center sm:justify-between">
              {/* HIDDEN until launch - re-enable: app store links (download badges) */}
              {/* <DownloadButtons /> */}
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
