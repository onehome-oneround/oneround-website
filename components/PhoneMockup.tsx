import type { ReactNode } from "react";
import ImagePlaceholder from "./ImagePlaceholder";

/*
  Phone mockup — a clean device frame holding a real app screen (placeholder
  until supplied), with floating UI chips overlapping it to make the app feel
  alive. Editorial: hairline frame, no soft glow. Optional tilt.
*/

type Props = {
  screenLabel: string;
  screenIntent: string;
  chips?: ReactNode;
  tilt?: number;
  className?: string;
};

export default function PhoneMockup({
  screenLabel,
  screenIntent,
  chips,
  tilt = -4,
  className = "",
}: Props) {
  return (
    <div className={`relative mx-auto w-full max-w-[300px] ${className}`}>
      <div
        className="relative border border-white/15 bg-[#04022e] p-2.5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]"
        style={{ transform: `rotate(${tilt}deg)`, borderRadius: "2.5rem" }}
      >
        <div className="absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#04022e]" />
        <div className="overflow-hidden" style={{ borderRadius: "2rem" }}>
          <ImagePlaceholder
            label={screenLabel}
            intent={screenIntent}
            tone="deep"
            align="center"
            className="aspect-[9/19.5] w-full"
          />
        </div>
      </div>
      {chips}
    </div>
  );
}
