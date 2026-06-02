"use client";

import PillButton from "./PillButton";
import { useAudience } from "./AudienceProvider";

/*
  Contact — simple, no form. Audience-aware copy: Users get a friendly general
  line; Venues get the partner prompt. Both → mailto hello@oneround.au.
*/

export default function Contact() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";

  const copy = isVenue
    ? {
        heading: "Want OneRound in your venue?",
        body: "Let's talk — tell us about your venue and we'll get you set up.",
      }
    : {
        heading: "Get in touch.",
        body: "Questions, press, or just want to say hi? We'd love to hear from you.",
      };

  return (
    <section className="px-5 py-12 sm:px-8 sm:py-16">
      <div className="on-scroll mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-[2rem] border border-[color:var(--line)] bg-offwhite px-6 py-14 text-center sm:px-12">
        <h2 className="text-3xl font-extrabold leading-[0.98] tracking-[-0.03em] text-ink sm:text-5xl">
          {copy.heading}
        </h2>
        <p className="max-w-md text-base leading-relaxed text-ink-soft">{copy.body}</p>
        <PillButton href="mailto:hello@oneround.au" icon="arrow">
          Email hello@oneround.au
        </PillButton>
      </div>
    </section>
  );
}
