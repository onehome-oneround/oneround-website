/*
  ImagePlaceholder — an OBVIOUS, labelled stand-in for a real photo/asset.
  Not stock filler: it names the intended shot (e.g. "hero-packed-venue") so the
  real asset drops straight in. Styled on-brand so the page reads premium while
  assets are pending.

  Swap to a real image: replace the <ImagePlaceholder/> with
  <Image src="/photos/hero-packed-venue.jpg" fill ... /> using the same label as
  the filename.
*/

type Props = {
  /** Asset slug, e.g. "hero-packed-venue". Doubles as the target filename. */
  label: string;
  /** One line describing the intended shot (the art direction). */
  intent: string;
  /** Extra classes for the wrapper (sizing / rounding). */
  className?: string;
  /** Tone of the placeholder surface. */
  tone?: "dark" | "deep" | "light";
  /** Where the label sits — "top" keeps it clear of bottom-anchored copy. */
  align?: "center" | "top";
};

export default function ImagePlaceholder({
  label,
  intent,
  className = "",
  tone = "dark",
  align = "center",
}: Props) {
  const light = tone === "light";
  const bg = tone === "deep" ? "bg-[#04022e]" : tone === "light" ? "bg-[#eef0f6]" : "bg-[#070540]";
  const line = light ? "rgba(2,0,49,0.5)" : "rgba(255,255,255,0.5)";
  const tick = light ? "border-navy/20" : "border-white/30";
  const slug = light ? "text-navy" : "text-white";
  const desc = light ? "text-navy/45" : "text-white/55";

  return (
    <div
      className={`relative overflow-hidden ${bg} ${className}`}
      role="img"
      aria-label={`Placeholder for ${label}: ${intent}`}
    >
      {/* faint blue lighting to suggest venue atmosphere */}
      <div
        className="pointer-events-none absolute -inset-10"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 18%, rgba(30,136,243,0.22), transparent 60%), radial-gradient(50% 40% at 20% 90%, rgba(30,136,243,0.14), transparent 60%)",
        }}
      />
      {/* hairline grid so it reads as a deliberate placeholder frame */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />
      {/* corner ticks */}
      <span className={`pointer-events-none absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 ${tick}`} />
      <span className={`pointer-events-none absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 ${tick}`} />
      <span className={`pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 ${tick}`} />
      <span className={`pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 ${tick}`} />

      {/* label */}
      <div
        className={`absolute inset-0 flex flex-col items-center gap-3 p-6 text-center ${
          align === "top" ? "justify-start pt-[18vh]" : "justify-center"
        }`}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-blue/40 bg-blue/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M3 8.5A2.5 2.5 0 0 1 5.5 6h1.2a1 1 0 0 0 .8-.4l.9-1.2a1 1 0 0 1 .8-.4h3.6a1 1 0 0 1 .8.4l.9 1.2a1 1 0 0 0 .8.4h1.2A2.5 2.5 0 0 1 21 8.5v8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-8Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          Photo placeholder
        </span>
        <p className={`font-mono text-sm font-semibold sm:text-base ${slug}`}>{label}</p>
        <p className={`max-w-[34ch] text-xs leading-relaxed sm:text-sm ${desc}`}>{intent}</p>
      </div>
    </div>
  );
}
