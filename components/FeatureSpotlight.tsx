"use client";

import Image from "next/image";
import ImagePlaceholder from "./ImagePlaceholder";
import EditorialTag from "./EditorialTag";
import SectionFade from "./SectionFade";
import { useAudience } from "./AudienceProvider";

/*
  Social Layer spotlight — a FULL-BLEED real photo (edge to edge) under a navy
  scrim, white editorial copy on the left and the tilted phone mockup on the
  right. Photo + copy + app screen swap with the toggle; layout identical both
  sides. Labelled placeholder photo for now:
    Users  → social-layer-crowd
    Venues → social-layer-venue
*/

export default function FeatureSpotlight() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";

  const copy = isVenue
    ? {
        kicker: "For venues",
        heading: "Be where they're heading.",
        body: "When people open OneRound to decide where to go, your venue is right there. Get seen by the crowd before they pick their spot.",
        bg: {
          label: "social-layer-venue",
          intent: "Real photo, a busy venue interior full of customers; warm and welcoming.",
        },
      }
    : {
        kicker: "The social layer",
        heading: "Know before you go.",
        body: "Open the app and see where your friends and the crowd are heading before you head out. Pick your spot, meet up, and be where the action is.",
        bg: {
          label: "social-layer-crowd",
          intent: "Real photo, a crowd out and about; the social buzz.",
        },
      };

  return (
    <section className="on-dark relative isolate overflow-hidden">
      {/* full-bleed photo */}
      <ImagePlaceholder
        label={copy.bg.label}
        intent={copy.bg.intent}
        tone="deep"
        align="top"
        className="absolute inset-0 -z-20 h-full w-full"
      />
      {/* navy scrim — darker on the copy side for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(var(--navy-rgb),0.94) 0%, rgba(var(--navy-rgb),0.86) 40%, rgba(var(--navy-rgb),0.62) 100%)",
        }}
      />
      <span aria-hidden="true" className="grain" />
      {/* Top fade — eases the pale tint ticker above into this navy anchor. */}
      <SectionFade edge="top" color="var(--tint)" height="h-28" />

      <div className="relative z-10 mx-auto grid max-w-[96rem] grid-cols-1 items-center gap-12 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7 lg:pr-12">
          <EditorialTag index="03" label={copy.kicker} className="text-white" />
          <h2
            className="display-section mt-8 text-white [text-shadow:0_2px_30px_rgba(var(--navy-rgb),0.6)]"
          >
            {copy.heading}
          </h2>
          <p className="mt-7 max-w-md text-base leading-relaxed text-white/85 [text-shadow:0_1px_16px_rgba(var(--navy-rgb),0.6)]">
            {copy.body}
          </p>
        </div>

        <div className="relative flex justify-center py-6 lg:col-span-5">
          {/* real app mockup — transparent PNG, no box/backing behind it */}
          <div className="relative mx-auto w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[520px]">
            <Image
              src="/images/venmap-mock.png"
              alt="OneRound map of where the crowd is heading"
              width={3375}
              height={4219}
              sizes="(max-width: 1024px) 80vw, 520px"
              className="h-auto w-full"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
      {/* Bottom fade — eases this navy anchor down into the blue HowItWorks slab. */}
      <SectionFade edge="bottom" color="var(--blue)" height="h-28" />
    </section>
  );
}
