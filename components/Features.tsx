"use client";

import Image from "next/image";
import PillButton from "./PillButton";
import EditorialTag from "./EditorialTag";
import { useAudience } from "./AudienceProvider";

/*
  "One app. Every outing." (Users) / "One app. More customers." (Venues). A white
  slab: editorial index tag, a giant Fraunces head, then three cards (Roundies /
  Deals / Social) with a framed photo, number, tagline, body, and a how-it-works
  link. Copy swaps with the toggle; layout, photos, numbers, and buttons are shared.
*/

type Feature = {
  n: string;
  heading: string;
  sub: string;
  body: string;
  image: string;
  cta: { label: string; href: string };
};

const consumerFeatures: Feature[] = [
  {
    n: "01",
    heading: "Roundies",
    sub: "Five on us, every month.",
    body: "Claim five complimentary items a month at participating venues, one per outing. Your reason to get out and find somewhere new.",
    image: "/images/feature-roundie.png",
    cta: { label: "How Roundies work", href: "/how-roundies-work" },
  },
  {
    n: "02",
    heading: "Deals",
    sub: "Offers you won't find anywhere else.",
    body: "Exclusive deals at venues across the city, only through OneRound.",
    image: "/images/feature-deal.png",
    cta: { label: "How Deals work", href: "/how-deals-work" },
  },
  {
    n: "03",
    heading: "Social",
    sub: "Know where the crowd's at.",
    body: "See where your friends and the crowd are going before you head out.",
    image: "/images/feature-social.png",
    cta: { label: "How Social works", href: "/how-social-works" },
  },
];

const venueFeatures: Feature[] = [
  {
    n: "01",
    heading: "Roundies",
    sub: "Bring people through your door.",
    body: "Roundies give locals a reason to choose your venue and walk in, then spend while they're there.",
    image: "/images/feature-roundie.png",
    cta: { label: "How Roundies work", href: "/how-roundies-work" },
  },
  {
    n: "02",
    heading: "Deals",
    sub: "Fill your quiet periods.",
    body: "Run exclusive deals to draw customers in when you want them most.",
    image: "/images/feature-deal.png",
    cta: { label: "How Deals work", href: "/how-deals-work" },
  },
  {
    n: "03",
    heading: "Social",
    sub: "Get your venue discovered.",
    body: "Be the venue people see when they're deciding where to go.",
    image: "/images/feature-social.png",
    cta: { label: "How Social works", href: "/how-social-works" },
  },
];

export default function Features() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";
  const features = isVenue ? venueFeatures : consumerFeatures;
  const intro = isVenue
    ? "Three ways OneRound brings people to your venue. Free to join, every venue welcome."
    : "Three reasons to get out: Roundies, Deals, and seeing where everyone's going. One membership, every venue.";

  return (
    <section className="bg-white px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[96rem]">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <EditorialTag index="02" label="Introducing OneRound" className="accent-text" />
            <h2
              className={`display-section mt-6 font-display ${isVenue ? "text-ink" : "text-blue"}`}
            >
              {isVenue ? (
                <>
                  <span className="whitespace-nowrap">One app.</span>{" "}
                  <span className="whitespace-nowrap">
                    More <span className="italic" style={{ color: "var(--blue)" }}>customers.</span>
                  </span>
                </>
              ) : (
                <>
                  <span className="whitespace-nowrap">One app.</span>{" "}
                  <span className="whitespace-nowrap">
                    Every <span className="italic" style={{ color: "var(--navy)" }}>outing.</span>
                  </span>
                </>
              )}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-ink-soft lg:col-span-4 lg:pb-3">
            {intro}
          </p>
        </div>

        {/* Bento — Roundies is the hero perk, so it's the large cell (two wide,
            two tall on desktop); Deals and Social are the smaller cells stacked
            beside it. Three equal cards read as a template; mixed sizes read
            editorial. Rows are auto: the two small cards set the row heights and
            the large card fills both. On mobile everything stacks full width.
            Card headline sizes step down (large ~text-5xl > small ~text-2xl),
            beneath the section h2's display-section — the type ramp as hierarchy
            rather than the section-tier class competing inside the section. */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:grid-rows-2">
          {/* Large — Roundies */}
          <article className="flex flex-col overflow-hidden rounded-3xl border border-[color:var(--rule)] bg-white shadow-[0_18px_44px_-28px_rgba(2,0,49,0.3)] lg:col-span-2 lg:row-span-2">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-offwhite lg:aspect-auto lg:min-h-[16rem] lg:flex-1">
              <Image
                src={features[0].image}
                alt={features[0].heading}
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
            <div className="flex flex-col p-7 sm:p-9">
              <span className="index-num accent-text text-4xl">{features[0].n}</span>
              <h3 className="mt-4 font-display text-4xl font-semibold leading-[0.98] text-ink sm:text-5xl">
                {features[0].heading}
              </h3>
              <p className="kicker accent-text mt-3">{features[0].sub}</p>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
                {features[0].body}
              </p>
              <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
                <PillButton href={features[0].cta.href} variant="outline">
                  {features[0].cta.label}
                </PillButton>
              </div>
            </div>
          </article>

          {/* Small — Deals, Social */}
          {features.slice(1).map((f) => (
            <article
              key={f.n}
              className="flex flex-col overflow-hidden rounded-3xl border border-[color:var(--rule)] bg-white shadow-[0_18px_44px_-28px_rgba(2,0,49,0.3)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-offwhite">
                <Image
                  src={f.image}
                  alt={f.heading}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <span className="index-num accent-text text-3xl">{f.n}</span>
                <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink">
                  {f.heading}
                </h3>
                <p className="kicker accent-text mt-2">{f.sub}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.body}</p>
                <div style={{ marginTop: "auto", paddingTop: "1.5rem" }}>
                  <PillButton href={f.cta.href} variant="outline">
                    {f.cta.label}
                  </PillButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
