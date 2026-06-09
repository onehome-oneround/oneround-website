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
    body: "Claim five free food or drink items a month at participating venues, one per outing. Your reason to get out and find somewhere new.",
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
    <section className="bg-white px-5 pb-4 pt-20 sm:px-8 sm:pt-28">
      <div className="mx-auto max-w-[96rem]">
        <div className="on-scroll grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <EditorialTag index="02" label="Introducing OneRound" className="accent-text" />
            <h2
              className={`mt-6 font-display ${isVenue ? "text-ink" : "text-blue"}`}
              style={{ fontSize: "clamp(2.2rem, 5.4vw, 5rem)", lineHeight: "1.05", fontWeight: 600 }}
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

        <div className="mt-14 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3">
          {features.map((f, i) => (
            <article
              key={f.n}
              className="on-scroll-card overflow-hidden rounded-2xl border border-[color:var(--rule)] bg-white shadow-[0_18px_44px_-28px_rgba(2,0,49,0.3)]"
              style={{
                ["--d" as string]: `${i * 0.12}s`,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* image on top */}
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
              {/* content — flexes so the button always pins to the bottom edge */}
              <div
                className="p-6 sm:p-7"
                style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
              >
                <span className="index-num accent-text text-4xl">{f.n}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink">
                  {f.heading}
                </h3>
                <p className="kicker accent-text mt-3">{f.sub}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{f.body}</p>
                <div style={{ marginTop: "auto", paddingTop: "2.5rem" }}>
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
