/*
  Marquee seam — the site's one signature device. A bold Bricolage ticker that
  scrolls edge-to-edge as a section seam (used once, between the feature panel
  and the Social Layer). Fills with the live --accent so it swaps blue/navy with
  the audience toggle. The track is duplicated so the loop is seamless; pauses on
  hover and freezes under prefers-reduced-motion (handled in globals.css).
*/

const WORDS = [
  "Roundies",
  "Exclusive deals",
  "Live in Brisbane",
  "See where everyone's going",
  "One on us, every day",
];

function Track() {
  // Two identical sequences sit back-to-back; the animation shifts by exactly
  // one sequence (-50%), so the seam is invisible.
  return (
    <div className="marquee__track" aria-hidden="true">
      {[0, 1].map((seq) => (
        <span key={seq} className="flex items-center">
          {WORDS.map((w) => (
            <span key={w} className="flex items-center">
              <span className="px-6 font-display text-2xl font-extrabold uppercase tracking-tight text-white sm:px-9 sm:text-3xl">
                {w}
              </span>
              <span aria-hidden="true" className="text-white/55">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.1L22 12l-7.6 2.9L12 22l-2.4-7.1L2 12l7.6-2.9L12 2z" />
                </svg>
              </span>
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      aria-label="Roundies, exclusive deals, live in Brisbane"
      className="accent-fill marquee relative border-y border-white/10 py-4 sm:py-5"
    >
      <span aria-hidden="true" className="grain opacity-40" />
      <div className="relative">
        <Track />
      </div>
    </section>
  );
}
