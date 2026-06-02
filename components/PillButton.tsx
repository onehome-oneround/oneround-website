import Link from "next/link";
import type { ReactNode } from "react";

/*
  Signature pill button with a circular "+" (or arrow) icon — the UniWorker-style
  component family, in OneRound's brand (blue/navy accent, never orange).
  Accent-aware: "solid" fills with the live --accent; "outline" outlines it.
*/

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline";
  icon?: "plus" | "arrow";
  className?: string;
  /** Force white surface (e.g. on a navy/dark section). */
  onDark?: boolean;
};

function Icon({ icon }: { icon: "plus" | "arrow" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {icon === "plus" ? (
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      ) : (
        <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export default function PillButton({
  children,
  href = "#",
  variant = "solid",
  icon = "plus",
  className = "",
  onDark = false,
}: Props) {
  const base =
    "group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-sm font-bold transition active:scale-[0.98]";

  const styles =
    variant === "solid"
      ? onDark
        ? "bg-white text-navy hover:brightness-95"
        : "accent-fill text-white hover:brightness-110"
      : onDark
        ? "border border-white/30 text-white hover:bg-white/10"
        : "border accent-border accent-text hover:bg-offwhite";

  const circle =
    variant === "solid"
      ? onDark
        ? "bg-navy text-white"
        : "bg-white/25 text-white"
      : "accent-fill text-white";

  return (
    <Link href={href} className={`${base} ${styles} ${className}`}>
      {children}
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:rotate-90 ${circle}`}
      >
        <Icon icon={icon} />
      </span>
    </Link>
  );
}
