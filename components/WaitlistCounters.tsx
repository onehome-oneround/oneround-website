"use client";

import { useEffect, useState } from "react";

/*
  Live social-proof counters under the Hero countdown (consumer path only).

  A single GET to the Google Apps Script webhook (NEXT_PUBLIC_WAITLIST_URL),
  which returns { users, venues }. users -> "Brisbane locals on the waitlist",
  venues -> "venues on board". Fetched once per page session (module cache) and
  faded in on success; silently absent while loading or on ANY error (network,
  CORS, non-2xx, bad JSON, missing env) — a broken counter is worse than none.

  CLS: the wrapper reserves its height from the first render (one line at sm+,
  up to two when the label wraps on a narrow column), so the row appearing
  shifts nothing.
*/

const WAITLIST_URL = process.env.NEXT_PUBLIC_WAITLIST_URL;

type Counts = { users: number; venues: number };

// Session cache — fetch once, reuse across re-renders and the audience toggle
// remounting the Hero subtree. Lives at module scope so it is not a React dep,
// which keeps the effect's dependency array empty (fetch strictly on mount).
let cache: Counts | null = null;

export default function WaitlistCounters({ className = "" }: { className?: string }) {
  const [counts, setCounts] = useState<Counts | null>(cache);

  useEffect(() => {
    if (cache || !WAITLIST_URL) return;
    let active = true;
    (async () => {
      try {
        const res = await fetch(WAITLIST_URL, { method: "GET" });
        if (!res.ok) return;
        const data = (await res.json()) as { users?: unknown; venues?: unknown };
        const users = Number(data?.users);
        const venues = Number(data?.venues);
        if (!Number.isFinite(users) || !Number.isFinite(venues)) return;
        cache = { users, venues };
        if (active) setCounts(cache);
      } catch {
        /* network / CORS / bad JSON — stay silently hidden */
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className={`min-h-[3rem] sm:min-h-[1.75rem] ${className}`}>
      {counts && (
        <p className="rise text-sm leading-relaxed text-navy/70">
          <span className="font-semibold text-navy">{counts.venues}</span> venues on board
          <span aria-hidden="true" className="px-2 text-navy/40">
            &middot;
          </span>
          <span className="font-semibold text-navy">{counts.users}</span> Brisbane locals on the waitlist
        </p>
      )}
    </div>
  );
}
