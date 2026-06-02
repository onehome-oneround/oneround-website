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

  // Hydrate from storage after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "consumer" || saved === "venue") setAudienceState(saved);
    } catch {
      /* ignore */
    }
  }, []);

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
