import type { ReactNode } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

/*
  Tilted phone mockup showing a real app screen (placeholder until screenshots
  are supplied), with small floating UI chips/cards overlapping it to make the
  app feel alive — the UniWorker phone-mockup pattern, in OneRound's brand.
*/

type Props = {
  screenLabel: string;
  screenIntent: string;
  /** Floating chip cards positioned around the phone. */
  chips?: ReactNode;
  /** Tilt in degrees (negative = lean left). */
  tilt?: number;
  className?: string;
};

export default function PhoneMockup({
  screenLabel,
  screenIntent,
  chips,
  tilt = -6,
  className = "",
}: Props) {
  return (
    <div className={`relative mx-auto w-full max-w-[300px] ${className}`}>
      {/* soft accent bloom behind the phone */}
      <div className="bloom absolute inset-0 -z-10 scale-110 opacity-60" />

      <div
        className="relative rounded-[2.75rem] border border-white/10 bg-navy p-2.5 shadow-[0_40px_80px_-30px_rgba(2,0,49,0.45)]"
        style={{ transform: `rotate(${tilt}deg)` }}
      >
        {/* notch */}
        <div className="absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-navy" />
        <div className="overflow-hidden rounded-[2.25rem]">
          <ImagePlaceholder
            label={screenLabel}
            intent={screenIntent}
            tone="deep"
            align="center"
            className="aspect-[9/19.5] w-full"
          />
        </div>
      </div>

      {/* floating chips (kept upright over the tilted phone) */}
      {chips}
    </div>
  );
}
