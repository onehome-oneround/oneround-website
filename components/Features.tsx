import ImagePlaceholder from "./ImagePlaceholder";
import PillButton from "./PillButton";

/*
  "Introducing OneRound → One app. Every outing." — Roundies, Deals, Social Layer
  as three light cards inside ONE soft warm grey-white rounded panel (premium,
  structured — no saturated blue background). Identical on both sides; only the
  accent (kicker + pill) differs via --accent. The Roundies card carries the
  "How Roundies work" button → /how-roundies-work.
*/

type Feature = {
  heading: string;
  sub: string;
  body: string;
  image: { label: string; intent: string };
  cta?: { label: string; href: string };
};

const features: Feature[] = [
  {
    heading: "Roundies",
    sub: "One on us, every day.",
    body: "Claim a free food or drink item each day at a participating venue. Your daily reason to get out and find somewhere new.",
    image: {
      label: "roundies-qr-in-venue",
      intent: "Phone showing the QR claim screen — inside a packed venue.",
    },
    cta: { label: "How Roundies work", href: "/how-roundies-work" },
  },
  {
    heading: "Deals",
    sub: "Offers you won't find anywhere else.",
    body: "Exclusive deals at venues across the city, only through OneRound.",
    image: {
      label: "deals-venue-with-offer",
      intent: "Real venue photo with a light app UI overlay showing an offer.",
    },
  },
  {
    heading: "See where everyone's headed",
    sub: "Know where the crowd's at.",
    body: "A live feed and map showing where your friends and the crowd are headed. Always free.",
    image: {
      label: "app-social-layer",
      intent: "Real app screenshot — the live map/feed. Show the UI clearly.",
    },
  },
];

// Subtle entrance rotation per card (alternating), staggered on scroll.
const rotations = ["-2deg", "1.5deg", "-1.5deg"];

export default function Features() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl rounded-[2.5rem] border border-[color:var(--line)] bg-[#f6f5f2] p-6 sm:p-10 lg:p-14">
        <div className="on-scroll mx-auto max-w-2xl text-center">
          <span className="accent-text mb-5 inline-flex items-center rounded-full border border-[color:var(--line)] bg-white px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
            Introducing OneRound
          </span>
          <h2 className="text-[2.1rem] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink sm:text-6xl">
            One app.
            <br className="sm:hidden" /> Every outing.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={f.heading}
              className="on-scroll-card flex flex-col overflow-hidden rounded-3xl border border-[color:var(--line)] bg-white shadow-[0_14px_40px_-28px_rgba(2,0,49,0.25)]"
              style={{ ["--d" as string]: `${i * 0.12}s`, ["--rot" as string]: rotations[i] }}
            >
              <ImagePlaceholder
                label={f.image.label}
                intent={f.image.intent}
                tone="light"
                className="aspect-[4/3] w-full"
              />
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-extrabold text-ink">{f.heading}</h3>
                <p className="mt-1 text-sm font-semibold accent-text">{f.sub}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.body}</p>
                {f.cta && (
                  <div className="mt-auto pt-6">
                    <PillButton href={f.cta.href} icon="arrow">
                      {f.cta.label}
                    </PillButton>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
