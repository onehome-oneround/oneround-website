"use client";

import DownloadButtons from "./DownloadButtons";
import PillButton from "./PillButton";
import EditorialTag from "./EditorialTag";
import { useAudience } from "./AudienceProvider";

/*
  "Out the door in three steps" — a hard accent slab (Users = blue, Venues =
  navy), mirroring the hero. The word "three" takes the opposite brand colour to
  the band (navy on blue, blue on navy), like the hero's accent word. The three
  steps are solid white cards with a soft shadow so they stand out clearly on the
  band, consistent with the cards elsewhere on the site. Copy/CTA swap with the
  toggle. Content unchanged.
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
  // Solid blue section on both sides; the accent word is navy to contrast the blue.
  const wordColor = "var(--navy)";

  return (
    <section
      id="how-it-works"
      className="scroll-mt-16 bg-blue px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-[96rem]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <EditorialTag index="04" label="How it works" className="text-white" />
            <h2
              className="mt-8 text-white"
              style={{ fontSize: "clamp(2.8rem, 6.4vw, 7rem)", lineHeight: "0.98", fontWeight: 600 }}
            >
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
          <div className="lg:col-span-4 lg:pb-2">
            {isVenue ? (
              <PillButton href="/partners" variant="solid" onDark>
                Partner with us
              </PillButton>
            ) : (
              <DownloadButtons />
            )}
          </div>
        </div>

        <ol className="mt-16 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={i}
              className="rounded-2xl bg-white p-7 shadow-[0_26px_55px_-26px_rgba(2,0,49,0.55)] sm:p-8"
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
