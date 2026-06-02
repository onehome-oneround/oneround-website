"use client";

import DownloadButtons from "./DownloadButtons";
import PillButton from "./PillButton";
import { useAudience } from "./AudienceProvider";

/*
  "Out the door in three steps" — a confident, fully-saturated brand gradient
  block (navy #020031 → blue #1e88f3, diagonal) with heading + CTA top-left and
  3 white frosted step cards. No photo here (the photo banner is the Social Layer
  section). Same gradient block both sides; copy + CTA swap with the toggle.
*/

const consumerSteps = [
  {
    title: "See what's on",
    body: "Check which venues have the best Roundies and Deals, and which are planned to pop off.",
  },
  {
    title: "Pick your spot",
    body: "Select where you're heading to show your friends and the OneRound community.",
  },
  {
    title: "Go & enjoy",
    body: "Head to the venue, redeem, and enjoy.",
  },
];

const venueSteps = [
  {
    title: "Get set up",
    body: "We handle the hardware and onboarding — scanner and screen, ready to go.",
  },
  {
    title: "Go live",
    body: "Your venue appears in the app with your Roundie and any deals.",
  },
  {
    title: "Feature your venue",
    body: "Optionally boost your visibility to reach even more people.",
  },
];

export default function HowItWorks() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";
  const steps = isVenue ? venueSteps : consumerSteps;

  return (
    <section id="how-it-works" className="relative scroll-mt-20 overflow-hidden">
      {/* bold navy → blue brand gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #020031 0%, #061159 40%, #1e88f3 100%)",
        }}
      />
      <span aria-hidden="true" className="grain" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:gap-20">
        {/* Heading + CTA top-left */}
        <div className="max-w-xl">
          <p className="kicker mb-4 text-white/70">How it works</p>
          <h2 className="text-4xl font-extrabold leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl">
            {isVenue ? "Live in three simple steps." : "Out the door in three steps."}
          </h2>
          <div className="mt-7">
            {isVenue ? (
              <PillButton href="/partners" icon="arrow" onDark>
                Partner with us
              </PillButton>
            ) : (
              <DownloadButtons />
            )}
          </div>
        </div>

        {/* Frosted step cards */}
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={i}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md"
            >
              <span className="font-display text-5xl font-extrabold leading-none tracking-tight text-white/85">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-lg font-extrabold text-white">{s.title}</h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/85">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
