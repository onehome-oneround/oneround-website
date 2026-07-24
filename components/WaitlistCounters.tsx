"use client";

import { useEffect, useState } from "react";

/*
  Live signup ticker under the Hero waitlist form (consumer path only).

  A single GET to the Google Apps Script webhook (NEXT_PUBLIC_WAITLIST_URL),
  which returns { users, venues, recentSignups: [{ name, timestamp }] }. We only
  use recentSignups here — the users/venues aggregate counts are intentionally
  not displayed. Fetched once per page session (module cache); silently absent
  while loading, on ANY error (network, CORS, non-2xx, bad JSON, missing env),
  or when there are no recent signups.

  It ROTATES every 5s through the recent signups, one at a time, shown as
  "<Name> just joined the waitlist · <time ago>". One entry just sits; two or
  more rotate. Each slot is keyed so it re-mounts and replays the .rise fade.

  CLS: the wrapper reserves its height from the first render (one line at sm+, up
  to two if a long name wraps on a narrow column), so nothing shifts as the row
  appears or rotates.
*/

const WAITLIST_URL = process.env.NEXT_PUBLIC_WAITLIST_URL;
const ROTATE_MS = 5000;

type Signup = { name: string; timestamp: string };

// Session cache — fetch once, reuse across re-renders and the audience toggle
// remounting the Hero subtree. Module scope so it isn't a React dep, keeping the
// fetch effect's dependency array empty (fetch strictly on mount).
let cache: Signup[] | null = null;

/* "just now" (<60s), "X min ago" (<60m), "X hour(s) ago" (<24h),
   "yesterday" (24-48h), "X days ago" (>48h). null if the timestamp is unparseable. */
function timeAgo(iso: string): string | null {
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  const mins = (Date.now() - t) / 60000;
  if (mins < 1) return "just now";
  if (mins < 60) return `${Math.floor(mins)} min ago`;
  const hours = mins / 60;
  if (hours < 24) {
    const h = Math.floor(hours);
    return `${h} hour${h === 1 ? "" : "s"} ago`;
  }
  const days = hours / 24;
  if (days < 2) return "yesterday";
  return `${Math.floor(days)} days ago`;
}

export default function WaitlistCounters({ className = "" }: { className?: string }) {
  const [signups, setSignups] = useState<Signup[] | null>(cache);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (cache || !WAITLIST_URL) return;
    let active = true;
    (async () => {
      try {
        const res = await fetch(WAITLIST_URL, { method: "GET" });
        if (!res.ok) return;
        const raw = (await res.json()) as { recentSignups?: unknown };
        const recentSignups = Array.isArray(raw?.recentSignups)
          ? raw.recentSignups
              .filter(
                (s): s is Signup =>
                  !!s &&
                  typeof (s as Signup).name === "string" &&
                  typeof (s as Signup).timestamp === "string",
              )
              .map((s) => ({ name: s.name, timestamp: s.timestamp }))
          : [];
        cache = recentSignups;
        if (active) setSignups(cache);
      } catch {
        /* network / CORS / bad JSON — stay silently hidden */
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const count = signups?.length ?? 0;

  useEffect(() => {
    if (count <= 1) return; // one entry just sits; nothing to rotate
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [count]);

  const current = count > 0 && signups ? signups[index % count] : null;
  const ago = current ? timeAgo(current.timestamp) : null;

  return (
    <div className={`min-h-[3.25rem] sm:min-h-[1.75rem] ${className}`}>
      {current && (
        <p
          key={index}
          className="rise text-[0.8125rem] leading-relaxed text-navy/70"
        >
          <span className="text-[0.9375rem] font-semibold text-navy">
            {current.name}
          </span>{" "}
          just joined the waitlist
          {ago && (
            <>
              <span aria-hidden="true" className="px-2 text-navy/40">
                &middot;
              </span>
              {ago}
            </>
          )}
        </p>
      )}
    </div>
  );
}
