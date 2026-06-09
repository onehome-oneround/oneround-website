/*
  ImagePlaceholder — an editorial figure stand-in. Names the intended shot as a
  mono caption ("FIG. 01 / hero-packed-venue") so the real asset drops straight
  in. Flat brand field + hairline frame; no stock filler, no soft glow.

  Swap for a real image: replace with
  <Image src="/images/hero-packed-venue.jpg" fill ... /> using the same slug.
*/

type Props = {
  label: string;
  intent: string;
  className?: string;
  tone?: "dark" | "deep" | "light";
  align?: "center" | "top";
  /** Optional figure number for the caption, e.g. "01". */
  fig?: string;
};

export default function ImagePlaceholder({
  label,
  intent,
  className = "",
  tone = "dark",
  align = "center",
  fig,
}: Props) {
  const light = tone === "light";
  const bg = tone === "deep" ? "bg-[#04022e]" : tone === "light" ? "bg-offwhite" : "bg-[#070540]";
  const frame = light ? "rgba(2,0,49,0.18)" : "rgba(255,255,255,0.22)";
  const slug = light ? "text-navy" : "text-white";
  const soft = light ? "text-navy/55" : "text-white/60";

  return (
    <div
      className={`relative overflow-hidden ${bg} ${className}`}
      role="img"
      aria-label={`Placeholder for ${label}: ${intent}`}
    >
      {/* hairline frame inset */}
      <div
        className="pointer-events-none absolute inset-3"
        style={{ border: `1px solid ${frame}` }}
      />
      {/* faint diagonal so an empty field still reads as a deliberate frame */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke={frame} strokeWidth="0.4" />
        <line x1="100" y1="0" x2="0" y2="100" stroke={frame} strokeWidth="0.4" />
      </svg>

      {/* caption block */}
      <div
        className={`absolute inset-0 flex flex-col gap-1.5 p-6 ${
          align === "top" ? "justify-start" : "justify-end"
        }`}
      >
        <span className={`kicker ${soft}`}>{fig ? `Fig. ${fig} / Photo` : "Photo"}</span>
        <span className={`font-mono text-sm font-bold ${slug}`}>{label}</span>
        <span className={`max-w-[36ch] font-mono text-[11px] leading-relaxed ${soft}`}>
          {intent}
        </span>
      </div>
    </div>
  );
}
