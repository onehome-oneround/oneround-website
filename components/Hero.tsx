"use client";

import Image from "next/image";
// HIDDEN until launch - re-enable: app store links (user-side hero CTA)
// import DownloadButtons from "./DownloadButtons";
import PillButton from "./PillButton";
import LaunchCountdown from "./LaunchCountdown";
import WaitlistCounters from "./WaitlistCounters";
import WaitlistForm from "./WaitlistForm";
import { useAudience } from "./AudienceProvider";
import { useVenueContact } from "./useVenueContact";

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
  const goToVenueContact = useVenueContact();

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
    // No py-* here (unlike the py-20 sm:py-24 section rhythm) is intentional: the
    // hero is a full-viewport masthead sized by min-h-[100svh] + the inner grid's
    // own padding, so it's an exception to the rhythm alongside Marquee/Footer.
    <section id="get-the-app" className="focus-on-dark relative scroll-mt-16 bg-[color:var(--accent)]">
      <div className="relative z-10">
        <div className="mx-auto grid min-h-[100svh] max-w-[96rem] grid-cols-1 gap-0 px-5 pb-12 pt-20 sm:px-8 lg:grid-cols-12 lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0">
          {/* LEFT — masthead, headline, subhead, CTAs */}
          <div className="flex flex-col justify-center lg:col-span-7 lg:py-20 lg:pl-8 lg:pr-12 xl:pl-12">
            {/* Headline */}
            <h1 className="display-masthead mt-8 text-white lg:mt-0">
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
                    <i style={{ ["--d" as string]: "0.05s" }}>Five Rounds.</i>
                  </span>
                  <span className="mask">
                    <i style={{ ["--d" as string]: "0.16s" }}>Every month.</i>
                  </span>
                  <span className="mask">
                    <i style={{ ["--d" as string]: "0.27s" }}>
                      <span
                        className="accent-ital"
                        style={{ color: accentColor, ["--rule-color" as string]: accentColor, ["--d" as string]: "0.9s" }}
                      >
                        On us
                      </span>
                      .
                    </i>
                  </span>
                </>
              )}
            </h1>

            {/* Subhead + CTAs */}
            <div className="rise mt-6 max-w-xl sm:mt-6" style={{ ["--d" as string]: "0.6s" }}>
              <p className={`text-base font-medium leading-relaxed sm:text-lg ${soft}`}>
                {subhead}
              </p>
              {/* Launch countdown. Sits here so it occupies the space the store
                  badges will take once the launch guard lifts — it counts down
                  to, and is replaced by, the thing below it. Inside this `rise`
                  wrapper so it inherits the existing load reveal rather than
                  adding one; the digits are the only new motion. Removes itself
                  entirely once the target passes. */}
              <LaunchCountdown softClassName={soft} />
              {/* Consumer pre-launch: a launch-offer line then the waitlist
                  capture, under the countdown, so every visitor can ask to be
                  notified at launch. The offer is a quiet serif statement, not a
                  banner — headline white to sit with the masthead, subline in the
                  same navy/75 as the subhead so it reads as muted supporting copy.
                  All static text in the consumer SSR path, so it can't shift. */}
              {!isVenue && (
                <div className="mt-6">
                  <p className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl">
                    First month on us.
                  </p>
                  <p className={`mt-2 text-base leading-relaxed ${soft}`}>
                    Join the waitlist and your first month of OneRound is free.
                  </p>
                  <WaitlistForm className="mt-6" />
                  {/* Live social proof — real waitlist + venue counts, fetched
                      client-side, faded in when ready. Sits below the form,
                      centered under it; reserves its height so appearing shifts
                      nothing (incl. the vertically-centred hero column). */}
                  <WaitlistCounters className="mt-5" />
                </div>
              )}
              {/* The venue CTA stays; the user-side store badges are hidden until
                  launch, so the CTA block only renders on the venue side for now. */}
              {isVenue && (
                <div className="mt-6 flex flex-col gap-3">
                  <PillButton
                    href="/?view=venue#contact"
                    variant="solid"
                    onDark
                    onClick={goToVenueContact}
                  >
                    Become a partner for free
                  </PillButton>
                </div>
              )}
              {/* HIDDEN until launch - re-enable: app store links (user-side hero CTA).
                  To restore, replace the venue-only block above with this ternary
                  (and re-enable the DownloadButtons import + `meta` const):
              <div className="mt-6 flex flex-col gap-3">
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
          <div className="relative mt-8 lg:col-span-5 lg:mt-0 lg:py-10 lg:pl-3 lg:pr-10">
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
