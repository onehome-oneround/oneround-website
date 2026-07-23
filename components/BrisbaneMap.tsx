"use client";

import dynamic from "next/dynamic";

/*
  Client wrapper that loads the Leaflet map only in the browser. next/dynamic
  with ssr:false is not allowed in a Server Component, so this thin client
  component owns the dynamic import; the partnered-venues page (a Server
  Component) renders <BrisbaneMap /> inside the fixed-height container.

  The loading state fills that container, so the swap to the live map shifts
  nothing (CLS 0).
*/
const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[color:var(--offwhite)]">
      <span className="kicker text-ink-faint">Loading map…</span>
    </div>
  ),
});

export default function BrisbaneMap() {
  return <InteractiveMap />;
}
