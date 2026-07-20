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
  title: "How Social works",
  description:
    "See where your friends and the wider community are heading, pick your spot, and find your vibe. Members go in the draw for weekly cash and prizes with Weekly Wins.",
  alternates: { canonical: "https://oneround.au/how-social-works" },
};

type Step = {
  n: string;
  title: string;
  body: string;
  visual: "phone" | "photo";
  src: string;
  w?: number;
  h?: number;
};

const steps: Step[] = [
  {
    n: "01",
    title: "See where your friends and the wider community are heading",
    body: "Open the app to see where your friends and the wider community are heading, so you can plan where to go.",
    visual: "phone",
    src: "/images/map-social.png",
    w: 3375,
    h: 4219,
  },
  {
    n: "02",
    title: "Pick where you're going and show up, and as a member go in the draw for weekly cash and prizes",
    body: "Choose your spot and show up. Members who show up go in the draw for weekly cash and prizes — Weekly Wins is part of membership.",
    visual: "phone",
    src: "/images/going-social.png",
    w: 3375,
    h: 4219,
  },
  {
    n: "03",
    title: "Find your vibe, whether you want it busy or laid back, and enjoy",
    body: "See which places are busy and which are laid back, find your vibe, and enjoy.",
    visual: "photo",
    src: "/images/venue-social.png",
  },
];

export default function HowSocialWorksPage() {
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
              <EditorialTag index="·" label="Social" className="accent-text" />
            </div>
            <h1
              className="mt-6 max-w-[16ch] text-ink"
              style={{ fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: "0.98", fontWeight: 600 }}
            >
              How Social <span className="italic accent-text">works.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
              Seeing where everyone is heading is always free. It shows you where the
              crowd is going, so you can decide where to go and meet up before you head
              out. Here is all there is to it.
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
                        width={s.w}
                        height={s.h}
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
              users={{ lead: "Know where the", accent: "crowd's at." }}
              venues={{ lead: "Get your venue", accent: "discovered." }}
            />
            <div className="mt-10 flex flex-col gap-4 border-t border-white/25 pt-10 sm:flex-row sm:items-center sm:justify-between">
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
    </>
  );
}
