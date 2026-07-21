"use client";

import Image from "next/image";
import PillButton from "./PillButton";
import EditorialTag from "./EditorialTag";
import { useAudience } from "./AudienceProvider";

/*
  "One app. Every outing." (Users) / "One app. More customers." (Venues). Sits on
  the held paper ground: editorial index tag, a giant Fraunces head, then three
  cards (Roundies / Deals / Social), each with a framed photo, number, tagline,
  body, and a how-it-works link. Every card carries the same anatomy and the same
  type sizes — they are siblings, and the only thing separating them is width.
  Copy swaps with the toggle; layout, photos, numbers, and buttons are shared.
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
    body: "Redeem five Roundies a month at participating venues, one per outing. Your reason to get out and find somewhere new.",
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
    <section className="bg-[color:var(--paper)] px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-[96rem]">
        <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <EditorialTag index="02" label="Introducing OneRound" className="text-navy" />
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

        {/* Three sibling cards in ONE row, 4/3/3 of a ten-column grid. Roundies
            leads at 1.33x the width of the other two and holds top-left reading
            priority; that width and position are the ONLY emphasis it gets.

            This replaces a two-row bento where Roundies was col-span-2
            row-span-2 and its photo was `lg:aspect-auto lg:flex-1`. That photo
            had no intrinsic size — it absorbed whatever height was left after
            the copy, and since row-span-2 made the card as tall as the two
            stacked cards beside it (1278px), the photo took 903px of that and
            pushed the entire copy block below the fold. The anatomy was all
            present in the markup and none of it was on screen.

            A single row is what prevents that recurring: grid stretches every
            card to the same height, so no card can outgrow its siblings by
            construction. Keep it that way — do not reintroduce row spans here.
            On mobile everything stacks full width. */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.n}
              className="flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[color:var(--rule)] bg-white shadow-[0_18px_44px_-28px_rgba(var(--navy-rgb),0.3)]"
            >
              {/* One ratio for all three. Safe now the cards are equal width —
                  identical width plus identical ratio means identical photo
                  height, so every copy block starts at the same y. */}
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-offwhite">
                <Image
                  src={f.image}
                  alt={f.heading}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="index-num accent-text text-3xl">{f.n}</span>
                <h3 className="display-section mt-3 font-display text-ink">
                  {f.heading}
                </h3>
                <p className="kicker text-navy mt-2">{f.sub}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.body}</p>
                {/* mt-auto pins every CTA to the card floor, so all three align
                    even though the body copy runs to different lengths. */}
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
