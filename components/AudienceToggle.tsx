"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAudience, type Audience } from "./AudienceProvider";

/*
  Audience toggle — a clear, tactile segmented pill. A light track holds a
  sliding indicator that fills with the active side's accent (blue = Users,
  navy = Venues) and lifts on a soft shadow so the selected side is unmistakable.
  Active label: white, bold. Inactive: muted ink but clearly readable. Flips the
  page's accent + content in place; off the home page it routes home.
*/

export default function AudienceToggle({ className = "" }: { className?: string }) {
  const { audience, setAudience } = useAudience();
  const pathname = usePathname();
  const router = useRouter();
  const isVenue = audience === "venue";

  function choose(a: Audience) {
    setAudience(a);
    if (pathname !== "/") router.push("/");
  }

  return (
    <div
      role="group"
      aria-label="Choose your view"
      className={`relative grid grid-cols-2 rounded-full border border-[color:var(--rule)] bg-[#eef0f8] p-1 ${className}`}
    >
      {/* sliding filled indicator (geometry set inline so it never collapses) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute rounded-full bg-[color:var(--accent)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          top: "0.25rem",
          bottom: "0.25rem",
          left: "0.25rem",
          width: "calc(50% - 0.25rem)",
          transform: isVenue ? "translateX(100%)" : "translateX(0)",
          boxShadow: isVenue
            ? "0 4px 14px -4px rgba(2,0,49,0.55)"
            : "0 4px 14px -4px rgba(30,136,243,0.6)",
        }}
      />
      <button
        type="button"
        onClick={() => choose("consumer")}
        aria-pressed={!isVenue}
        className={`relative z-10 whitespace-nowrap rounded-full px-5 py-2 text-center text-sm transition-colors duration-300 ${
          !isVenue ? "font-bold text-white" : "font-medium text-ink-soft hover:text-ink"
        }`}
      >
        Users
      </button>
      <button
        type="button"
        onClick={() => choose("venue")}
        aria-pressed={isVenue}
        className={`relative z-10 whitespace-nowrap rounded-full px-5 py-2 text-center text-sm transition-colors duration-300 ${
          isVenue ? "font-bold text-white" : "font-medium text-ink-soft hover:text-ink"
        }`}
      >
        Venues
      </button>
    </div>
  );
}
