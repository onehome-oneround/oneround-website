/*
  A static gradient seam that bridges two adjacent section colours, so a
  dark↔light boundary reads as a tonal step rather than a hard cut. Part of the
  "make it flow" pass.

  Purely presentational: an absolutely-positioned gradient strip pinned to the
  top or bottom edge of a section. The parent section must be position:relative.
  Inside a dark section with a -z photo, this sits at z-0 — above the photo,
  below the z-10 content — so it fades the section's own colour, not the text.

  No motion: it's a static CSS gradient, consistent with the calm post-parallax
  direction. `color` should be a token (e.g. "var(--paper)") — the neighbour's
  colour the fade resolves to.
*/
export default function SectionFade({
  edge,
  color,
  height = "h-32",
}: {
  edge: "top" | "bottom";
  color: string;
  height?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-0 ${
        edge === "top" ? "top-0" : "bottom-0"
      } ${height}`}
      style={{
        background: `linear-gradient(to ${edge}, transparent, ${color})`,
      }}
    />
  );
}
