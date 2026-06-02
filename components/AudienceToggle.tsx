"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAudience, type Audience } from "./AudienceProvider";

/*
  Persistent audience pill toggle (Users / For Venues). A sliding pill indicator
  fills with the active side's accent (blue / navy). Switching flips the whole
  page's accent + toggle-aware content in place. If the visitor isn't on the home
  page (e.g. /partners), choosing a side takes them home to that view — so the
  toggle is never a dead-end.
*/

export default function AudienceToggle({ className = "" }: { className?: string }) {
  const { audience, setAudience } = useAudience();
  const pathname = usePathname();
  const router = useRouter();

  function choose(a: Audience) {
    setAudience(a);
    if (pathname !== "/") router.push("/");
  }

  return (
    <div
      role="group"
      aria-label="Choose your view"
      className={`relative grid grid-cols-2 rounded-full border border-[color:var(--line)] bg-offwhite p-1 ${className}`}
    >
      {/* sliding indicator — two equal segments, so 50% aligns exactly */}
      <span
        aria-hidden="true"
        className="accent-fill absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: audience === "venue" ? "translateX(100%)" : "translateX(0)",
        }}
      />
      <button
        type="button"
        onClick={() => choose("consumer")}
        aria-pressed={audience === "consumer"}
        className={`relative z-10 w-full whitespace-nowrap rounded-full px-4 py-1.5 text-center text-xs font-bold transition-colors duration-300 sm:text-sm ${
          audience === "consumer" ? "text-white" : "text-ink-soft hover:text-ink"
        }`}
      >
        Users
      </button>
      <button
        type="button"
        onClick={() => choose("venue")}
        aria-pressed={audience === "venue"}
        className={`relative z-10 w-full whitespace-nowrap rounded-full px-4 py-1.5 text-center text-xs font-bold transition-colors duration-300 sm:text-sm ${
          audience === "venue" ? "text-white" : "text-ink-soft hover:text-ink"
        }`}
      >
        For Venues
      </button>
    </div>
  );
}
