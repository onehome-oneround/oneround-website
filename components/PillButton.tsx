"use client";

import Link from "next/link";
import { type MouseEvent, type ReactNode } from "react";

/*
  Editorial CTA — the signature button of the "After Dark" system: a hard
  rectangle with a mono micro-label feel. Accent-aware via --accent; onDark
  flips to a white block. Keeps the old API (children/href/variant/icon/onDark)
  so call sites are intact.

  Motion: colour only. This button previously magnetised toward the pointer
  (a per-mousemove translate) and slid its arrow on hover; both were removed —
  a CTA that moves under the cursor is a moving target and reads as instability.
  Hover/press change colour and nothing else, so the button never shifts.
*/

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline";
  icon?: "plus" | "arrow";
  className?: string;
  onDark?: boolean;
  /** Optional click handler on the underlying link (e.g. to intercept for a
      client-side scroll/state change while keeping href as the fallback). */
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

function Icon({ icon }: { icon: "plus" | "arrow" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {icon === "plus" ? (
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      ) : (
        <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export default function PillButton({
  children,
  href = "#",
  variant = "solid",
  icon = "arrow",
  className = "",
  onDark = false,
  onClick,
}: Props) {
  const base =
    "inline-flex items-center gap-4 px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] transition-colors duration-200 ease-out";
  const styles =
    variant === "solid"
      ? onDark
        ? "bg-white text-navy hover:bg-white/90"
        : "bg-[color:var(--accent)] text-white hover:brightness-110"
      : onDark
        ? "border border-white/35 text-white hover:bg-white/10"
        : "border border-[color:var(--ink)] text-ink hover:bg-ink hover:text-white";

  return (
    <Link href={href} onClick={onClick} className={`${base} ${styles} ${className}`}>
      <span>{children}</span>
      <span>
        <Icon icon={icon} />
      </span>
    </Link>
  );
}
