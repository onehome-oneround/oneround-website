"use client";

import { useAudience } from "./AudienceProvider";

/*
  Closing catchphrase for the how-it-works pages. The same slot, but the line
  swaps per side (Users / Venues) to mirror the home-page feature card taglines.
  Keeps the editorial italic blue accent on the closing words.
*/

type Phrase = { lead: string; accent: string };

export default function ClosingHeadline({
  users,
  venues,
}: {
  users: Phrase;
  venues: Phrase;
}) {
  const { audience } = useAudience();
  const p = audience === "venue" ? venues : users;
  return (
    <h2
      className="mt-6 max-w-[18ch] text-white"
      style={{ fontSize: "clamp(2.8rem, 7vw, 7rem)", lineHeight: "0.98", fontWeight: 600 }}
    >
      {p.lead}{" "}
      <span className="italic text-blue">{p.accent}</span>
    </h2>
  );
}
