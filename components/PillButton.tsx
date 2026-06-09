"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";

/*
  Editorial CTA — sharp-edged, magnetic, tactile. The signature button of the
  "After Dark" system: a hard rectangle with a mono micro-label feel and an arrow
  that slides on hover. Subtly magnetises toward the pointer (disabled for
  reduced-motion). Accent-aware via --accent; onDark flips to a white block.
  Keeps the old API (children/href/variant/icon/onDark) so call sites are intact.
*/

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "solid" | "outline";
  icon?: "plus" | "arrow";
  className?: string;
  onDark?: boolean;
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
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
  }
  function reset() {
    if (ref.current) ref.current.style.transform = "";
  }

  const base =
    "group inline-flex items-center gap-4 px-6 py-4 text-sm font-bold uppercase tracking-[0.08em] transition-[transform,background-color,color] duration-200 ease-out will-change-transform";
  const styles =
    variant === "solid"
      ? onDark
        ? "bg-white text-navy hover:bg-white/90"
        : "bg-[color:var(--accent)] text-white hover:brightness-110"
      : onDark
        ? "border border-white/35 text-white hover:bg-white/10"
        : "border border-[color:var(--ink)] text-ink hover:bg-ink hover:text-white";

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`${base} ${styles} ${className}`}
    >
      <span>{children}</span>
      <span className="transition-transform duration-300 ease-out group-hover:translate-x-1.5">
        <Icon icon={icon} />
      </span>
    </Link>
  );
}
