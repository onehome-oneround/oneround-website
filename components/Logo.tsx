import Image from "next/image";
import Link from "next/link";

/*
  OneRound wordmark. Two supplied files:
  - oneround-logo-white.png  → white "One" + blue "Round". For the DARK navy site.
  - oneround-logo-navy.png   → dark "One" + blue "Round" + emblem. For LIGHT sections.
  Real logo image only — never typeset "OneRound" as text.

  Source files are tightly cropped to the wordmark (~5.9:1), so height controls size.
*/

type Props = {
  variant?: "white" | "navy";
  /** Rendered height in px (width auto from aspect ratio). */
  height?: number;
  className?: string;
  /** Wrap in a Link to home. */
  href?: string;
  priority?: boolean;
};

export default function Logo({
  variant = "white",
  height = 30,
  className = "",
  href = "/",
  priority = false,
}: Props) {
  const src =
    variant === "white"
      ? "/oneround-logo-white.png"
      : "/oneround-logo-navy.png";
  const ratio = 3953 / 667; // cropped wordmark aspect
  const width = Math.round(height * ratio);

  const img = (
    <span className="inline-flex items-center" style={{ height }}>
      <Image
        src={src}
        alt="OneRound"
        width={width}
        height={height}
        priority={priority}
        className={`h-full w-auto ${className}`}
      />
    </span>
  );

  if (href) {
    return (
      <Link href={href} aria-label="OneRound, home" className="inline-flex shrink-0">
        {img}
      </Link>
    );
  }
  return img;
}
