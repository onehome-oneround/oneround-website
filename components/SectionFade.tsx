/*
  A static gradient seam that bridges two adjacent section colours, so a
  dark↔light boundary reads as a tonal step, not a hard cut. Purely
  presentational: an absolutely-positioned strip pinned to the top or bottom
  edge. Parent must be position:relative; it sits at z-0 (above a -z photo, below
  z-10 content) so it fades the section's own colour, not the text.

  Smoothness (why this isn't a 2-stop linear gradient):
  1. The transparent end is the SAME colour at 0 alpha — rgba(var(colorRgb), 0)
     — NOT the `transparent` keyword. `transparent` is black-transparent, so a
     `transparent → colour` blend dips through grey and shows a dirty band. Alpha
     is the only thing that interpolates here.
  2. The alpha runs through an eased, multi-stop ramp (roughly ease-in-out — slow
     at the ends, faster through the middle) instead of a straight line, so there
     is no hard "here the fade starts" edge and adjacent stops are close enough
     that 8-bit colour banding stays below the visible threshold.
  3. Give it runway via `height` — more distance = gentler per-pixel step.

  `colorRgb` is a channel token, e.g. "--paper-rgb". No motion — static gradient.
*/

// Alpha ramp: [position%, alpha]. Eased (ease-in-out-ish), 9 stops.
const EASE: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [12, 0.015],
  [25, 0.06],
  [37, 0.14],
  [50, 0.26],
  [63, 0.42],
  [75, 0.62],
  [88, 0.85],
  [100, 1],
];

export default function SectionFade({
  edge,
  colorRgb,
  height = "h-48",
}: {
  edge: "top" | "bottom";
  colorRgb: string;
  height?: string;
}) {
  const stops = EASE.map(
    ([pos, a]) => `rgba(var(${colorRgb}), ${a}) ${pos}%`,
  ).join(", ");
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-0 ${
        edge === "top" ? "top-0" : "bottom-0"
      } ${height}`}
      style={{ background: `linear-gradient(to ${edge}, ${stops})` }}
    />
  );
}
