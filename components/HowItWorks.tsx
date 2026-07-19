"use client";

// HIDDEN until launch - re-enable: app store links (user-side "how it works" CTA)
// import DownloadButtons from "./DownloadButtons";
import PillButton from "./PillButton";
import EditorialTag from "./EditorialTag";
import { useAudience } from "./AudienceProvider";

/*
  "Out the door in three steps" — sits on the held paper ground. This used to be
  a saturated blue slab; the ground consolidation removed it, since a colour
  change per section was what stopped the bleed-vs-contain rhythm from reading.
  The word "three" now takes brand blue against the navy heading, the same
  accent-word device the hero uses. The three steps are white cards, bordered and
  softly shadowed so they read as objects on the paper ground — identical
  treatment to the Features cards. Copy/CTA swap with the toggle. Content
  unchanged.
*/

const consumerSteps = [
  { title: "See what's on", body: "Check which venues have the best Roundies and Deals, and which are planned to pop off." },
  { title: "Pick your spot", body: "Select where you're heading to show your friends and the OneRound community." },
  { title: "Go & enjoy", body: "Head to the venue, redeem, and enjoy." },
];

const venueSteps = [
  { title: "Share your interest", body: "Reach out and we'll handle onboarding, from scanners to screens to setup." },
  { title: "Go live", body: "Your venue appears in the app with your Roundies and any deals." },
  { title: "Get customers", body: "Watch the new faces walk through your door." },
];

export default function HowItWorks() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";
  const steps = isVenue ? venueSteps : consumerSteps;
  // Paper ground on both sides; the accent word is blue against the navy heading.
  const wordColor = "var(--blue)";

  return (
    <section
      id="how-it-works"
      className="scroll-mt-16 bg-[color:var(--paper)] px-5 py-24 sm:px-8 sm:py-32"
    >
      {/* No SectionFade: WhatToExpect below shares this paper ground, so there is
          no seam left to bridge. */}
      <div className="mx-auto max-w-[96rem]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <EditorialTag index="04" label="How it works" className="accent-text" />
            <h2 className="display-section mt-8 text-ink">
              {isVenue ? (
                <>
                  Live in <span className="italic" style={{ color: wordColor }}>three</span> simple
                  steps.
                </>
              ) : (
                <>
                  Out the door in <span className="italic" style={{ color: wordColor }}>three</span>{" "}
                  steps.
                </>
              )}
            </h2>
          </div>
          {/* The venue CTA stays; the user-side store badges are hidden until launch. */}
          {isVenue && (
            <div className="lg:col-span-4 lg:pb-2">
              <PillButton href="/partners" variant="solid">
                Partner with us
              </PillButton>
            </div>
          )}
          {/* HIDDEN until launch - re-enable: app store links (user-side "how it works" CTA).
              To restore, replace the venue-only block above with this ternary
              (and re-enable the DownloadButtons import). Note: no onDark — this
              section sits on the light paper ground since the ground consolidation.
          <div className="lg:col-span-4 lg:pb-2">
            {isVenue ? (
              <PillButton href="/partners" variant="solid">
                Partner with us
              </PillButton>
            ) : (
              <DownloadButtons />
            )}
          </div>
          */}
        </div>

        <ol className="mt-16 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={i}
              className="rounded-3xl border border-[color:var(--rule)] bg-white p-7 shadow-[0_18px_44px_-28px_rgba(var(--navy-rgb),0.3)] sm:p-8"
              style={{ display: "flex", flexDirection: "column", height: "100%" }}
            >
              <span className="index-num accent-text text-6xl leading-none">0{i + 1}</span>
              <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
