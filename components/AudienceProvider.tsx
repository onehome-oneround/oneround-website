"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/*
  Audience state — the signature interaction. "consumer" (Users, blue accent)
  or "venue" (For Venues, navy accent). Persisted to localStorage so a returning
  visitor keeps their side. The chosen value is mirrored onto a wrapper element's
  `data-audience` attribute, which flips the --accent CSS variable (see globals.css).

  Accent flash: storage is invisible to the server, so this used to render blue
  and repaint navy once the effect ran. The pre-paint script in app/layout.tsx
  now resolves the same value and stamps it on <html> before the first paint.
  This provider keeps <html> in sync afterwards — that sync is required, not
  cosmetic: --accent is set by [data-audience="venue"], so once <html> says
  "venue" a nested wrapper saying "consumer" matches no rule and simply inherits
  navy. Without syncing <html>, toggling back to Users would not restore blue.
*/

export type Audience = "consumer" | "venue";

type Ctx = {
  audience: Audience;
  setAudience: (a: Audience) => void;
  toggle: () => void;
};

const AudienceContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "oneround-audience";

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudienceState] = useState<Audience>("consumer");

  // Hydrate from storage after mount (avoids SSR mismatch). A ?view=venue|users
  // query param wins, so the venue home can be deep-linked directly.
  useEffect(() => {
    try {
      const view = new URLSearchParams(window.location.search).get("view");
      if (view === "venue" || view === "users") {
        setAudienceState(view === "venue" ? "venue" : "consumer");
        return;
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "consumer" || saved === "venue") setAudienceState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  // Keep <html data-audience> in step with React. The inline script sets it for
  // the first paint; from here on this is the only thing that can change it.
  useEffect(() => {
    document.documentElement.setAttribute("data-audience", audience);
  }, [audience]);

  const setAudience = useCallback((a: Audience) => {
    setAudienceState(a);
    try {
      localStorage.setItem(STORAGE_KEY, a);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setAudienceState((prev) => {
      const next = prev === "consumer" ? "venue" : "consumer";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return (
    <AudienceContext.Provider value={{ audience, setAudience, toggle }}>
      <div data-audience={audience} className="contents">
        {children}
      </div>
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  const ctx = useContext(AudienceContext);
  if (!ctx) throw new Error("useAudience must be used within AudienceProvider");
  return ctx;
}
