"use client";

import Image from "next/image";
// HIDDEN until launch - re-enable: app store links (user-side hero CTA)
// import DownloadButtons from "./DownloadButtons";
import PillButton from "./PillButton";
import SectionFade from "./SectionFade";
import { useAudience } from "./AudienceProvider";

/*
  Hero — the masthead spread. A hard accent slab (Users = blue, Venues = navy)
  split editorial-style: masthead + giant Fraunces headline + subhead + badges on
  the left, a framed venue figure on the right. Headline reveals line-by-line
  with a mask wipe on load; nothing moves after that.

  This used to pin for 132vh on desktop while a scroll-scrubbed parallax drifted
  the headline and figure. All of it is gone: the drift read as the page not
  being settled, and the pin only existed to give the scrub somewhere to happen —
  keeping it would have meant a hero that holds the viewport doing nothing. The
  section is now its natural height and scrolls like everything else.
*/

export default function Hero() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";

  const subhead = isVenue
    ? "OneRound brings new faces to your venue and gets them spending, with no upfront cost and no risk."
    : "At Brisbane's best venues. Plus deals you won't find anywhere else, and see where everyone's going, before you head out. One app, for any occasion.";

  const heroImage = isVenue
    ? { src: "/images/newhero-venue.png", alt: "A buzzing Brisbane venue interior" }
    : { src: "/images/hero-user.png", alt: "A packed Brisbane venue" };

  // On the blue slab, secondary text is navy for AA contrast; on navy, it's white.
  const soft = isVenue ? "text-white/72" : "text-navy/75";
  // HIDDEN until launch - re-enable: app store links (used by the user-side "Free download" line)
  // Users side is navy-on-blue: at the kicker's 11px/700, navy/60 measures 3.16:1
  // and navy/80 only reaches 4.49:1 — both under WCAG AA's 4.5:1, so it runs at
  // full navy (5.61:1). Venues is white-on-navy and clears it at /60 (7.19:1).
  // const meta = isVenue ? "text-white/60" : "text-navy";
  // The accent word sits in the OPPOSITE brand colour to the slab.
  const accentColor = isVenue ? "var(--blue)" : "var(--navy)";

  return (
    // id is the target of the Pricing section's "Get Started" CTA — at launch
    // the store badges appear in this hero, so that CTA can point straight at them.
    // No py-* here (unlike the py-24 sm:py-32 section rhythm) is intentional: the
    // hero is a full-viewport masthead sized by min-h-[100svh] + the inner grid's
    // own padding, so it's an exception to the rhythm alongside Marquee/Footer.
    <section id="get-the-app" className="focus-on-dark relative scroll-mt-16 bg-[color:var(--accent)]">
      {/* Bottom fade — the accent masthead melts into the white Features section
          below instead of hard-cutting. Static gradient; content sits above it. */}
      <SectionFade edge="bottom" color="var(--white)" height="h-32" />
      <div className="relative z-10">
        <div className="mx-auto grid min-h-[100svh] max-w-[96rem] grid-cols-1 gap-0 px-5 pb-12 pt-20 sm:px-8 lg:grid-cols-12 lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0">
          {/* LEFT — masthead, headline, subhead, CTAs */}
          <div className="flex flex-col justify-center lg:col-span-7 lg:py-24 lg:pl-8 lg:pr-12 xl:pl-12">
            {/* Headline */}
            <h1 className="display-masthead mt-10 text-white lg:mt-0">
              {isVenue ? (
                <>
                  <span className="mask">
                    <i style={{ ["--d" as string]: "0.05s" }}>More customers</i>
                  </span>
                  <span className="mask">
                    <i style={{ ["--d" as string]: "0.16s" }}>through your door.</i>
                  </span>
                  <span className="mask">
                    <i style={{ ["--d" as string]: "0.27s" }}>
                      <span
                        className="accent-ital"
                        style={{ color: accentColor, ["--rule-color" as string]: accentColor, ["--d" as string]: "0.9s" }}
                      >
                        Free to join
                      </span>
                      .
                    </i>
                  </span>
                </>
              ) : (
                <>
                  <span className="mask">
                    <i style={{ ["--d" as string]: "0.05s" }}>Five complimentary</i>
                  </span>
                  <span className="mask">
                    <i style={{ ["--d" as string]: "0.16s" }}>items,</i>
                  </span>
                  <span className="mask">
                    <i style={{ ["--d" as string]: "0.27s" }}>
                      <span
                        className="accent-ital"
                        style={{ color: accentColor, ["--rule-color" as string]: accentColor, ["--d" as string]: "0.9s" }}
                      >
                        every month
                      </span>
                      .
                    </i>
                  </span>
                </>
              )}
            </h1>

            {/* Subhead + CTAs */}
            <div className="rise mt-6 max-w-xl sm:mt-7" style={{ ["--d" as string]: "0.6s" }}>
              <p className={`text-base font-medium leading-relaxed sm:text-lg ${soft}`}>
                {subhead}
              </p>
              {/* The venue CTA stays; the user-side store badges are hidden until
                  launch, so the CTA block only renders on the venue side for now. */}
              {isVenue && (
                <div className="mt-8 flex flex-col gap-3">
                  <PillButton href="#contact" variant="solid" onDark>
                    Become a partner for free
                  </PillButton>
                </div>
              )}
              {/* HIDDEN until launch - re-enable: app store links (user-side hero CTA).
                  To restore, replace the venue-only block above with this ternary
                  (and re-enable the DownloadButtons import + `meta` const):
              <div className="mt-8 flex flex-col gap-3">
                {isVenue ? (
                  <PillButton href="#contact" variant="solid" onDark>
                    Become a partner for free
                  </PillButton>
                ) : (
                  <>
                    <DownloadButtons />
                    <p className={`kicker ${meta}`}>Free download / iOS + Android</p>
                  </>
                )}
              </div>
              */}
            </div>
          </div>

          {/* RIGHT — inset photo panel (rounded, lifted) */}
          <div className="relative mt-10 lg:col-span-5 lg:mt-0 lg:py-10 lg:pl-3 lg:pr-10">
            <div className="relative h-[58vw] overflow-hidden rounded-3xl shadow-[0_30px_70px_-42px_rgba(var(--navy-rgb),0.55)] sm:h-[44vw] lg:h-full">
              <div className="absolute inset-0">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  priority
                  quality={90}
                  // The column is cover-cropped and tall, so it binds on height.
                  // A width-based vw hint under-provisions it; request the full
                  // source (capped at the file's native 1024px) so no
                  // under-resolution variant is served.
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
