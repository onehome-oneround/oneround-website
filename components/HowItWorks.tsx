"use client";

// HIDDEN until launch - re-enable: app store links (user-side "how it works" CTA)
// import DownloadButtons from "./DownloadButtons";
import PillButton from "./PillButton";
import EditorialTag from "./EditorialTag";
import { useAudience } from "./AudienceProvider";

/*
  "Out the door in three steps" — the saturated blue slab. This is the page's one
  full-strength blue ground, and it is deliberate: the palette runs blue, navy,
  paper and white across the page rather than holding a single ground, and this
  section carries the blue.

  The word "three" takes navy against the blue, the same opposite-colour accent
  device the hero uses. The three steps are solid white cards with a deeper
  shadow so they lift off the saturated ground — no hairline border here, unlike
  the Features cards, because --rule is a navy alpha and reads as grime on blue.

  Copy/CTA swap with the toggle. Content unchanged.
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
      className="focus-on-dark scroll-mt-16 bg-blue px-5 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-[96rem]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            {/* Navy, not white. The kicker is 11px/700 — small text, so AA wants
                4.5:1, and white on --blue only reaches 3.58:1. Navy on blue is
                5.61:1, the same figure Hero cites for small text on this ground.
                The h2 below stays white: at display-section it is large text,
                where 3.58:1 clears the 3:1 bar. */}
            <EditorialTag index="04" label="How it works" className="text-navy" />
            <h2 className="display-section mt-6 text-white">
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
              <PillButton href="#contact" variant="solid" onDark>
                Partner with us
              </PillButton>
            </div>
          )}
          {/* HIDDEN until launch - re-enable: app store links (user-side "how it works" CTA).
              To restore, replace the venue-only block above with this ternary
              (and re-enable the DownloadButtons import). Keep onDark — this
              section is the saturated blue slab.
          <div className="lg:col-span-4 lg:pb-2">
            {isVenue ? (
              <PillButton href="#contact" variant="solid" onDark>
                Partner with us
              </PillButton>
            ) : (
              <DownloadButtons />
            )}
          </div>
          */}
        </div>

        <ol className="mt-12 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={i}
              className="rounded-3xl bg-white p-7 shadow-[0_26px_55px_-26px_rgba(var(--navy-rgb),0.55)] sm:p-8"
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
