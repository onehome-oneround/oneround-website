"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/*
  Tracking-consent state — gates GA4 and the Meta Pixel behind an explicit
  choice (see components/Analytics.tsx and components/ConsentGate.tsx).

  "unknown"  — no choice yet; the consent card is shown.
  "accepted" — trackers may load.
  "declined" — trackers never load.

  HYDRATION SAFETY. The choice lives in localStorage, which the server cannot
  read. Like AudienceProvider, the value is read through useSyncExternalStore
  rather than a setState-in-effect (which this repo's lint config rejects): the
  server snapshot is "unknown", hydration matches it exactly, and the real value
  is picked up immediately after — no mismatch, no scheduled second effect pass.

  `ready` is a separate hydrated flag (the standard no-op-subscribe idiom). It is
  false on the server and during the hydration render, then true. ConsentGate
  waits for it, so the card is never in the first paint: a returning visitor who
  already chose never sees it flash, and a genuine first visitor only gets the
  "unknown" reading once the store has actually been read on the client.
*/

export type Consent = "unknown" | "accepted" | "declined";

type Ctx = {
  consent: Consent;
  setConsent: (v: Consent) => void;
  /* False on the server and during hydration, true once mounted on the client.
     Lets the gate hold the card back until the stored value is genuinely known. */
  ready: boolean;
};

const ConsentContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "or-consent";

/* Snapshot cache — getSnapshot must be referentially stable between changes or
   useSyncExternalStore re-renders forever. Primitives compare by value, so a
   cached string is enough. */
let cached: Consent | null = null;
const listeners = new Set<() => void>();

function read(): Consent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "declined") return stored;
  } catch {
    /* ignore */
  }
  return "unknown";
}

function getSnapshot(): Consent {
  if (cached === null) cached = read();
  return cached;
}

/* The server has no storage, so consent is always unknown there. */
function getServerSnapshot(): Consent {
  return "unknown";
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  /* Cross-tab sync: choosing in one tab updates any other open tab. `storage`
     only fires in OTHER tabs, so it cannot loop with our own writes. */
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    cached = read();
    emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function write(next: Consent) {
  cached = next;
  try {
    if (next === "unknown") {
      // The reopen-from-footer path: clear the choice so the card returns to
      // its genuine first-visit state.
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, next);
    }
  } catch {
    /* ignore */
  }
  emit();
}

/* Hydrated flag via the no-op-subscribe idiom: false on the server and during
   hydration, true afterwards. No setState, so it stays lint-clean. */
const noopSubscribe = () => () => {};
const getReady = () => true;
const getServerReady = () => false;

export function ConsentProvider({ children }: { children: ReactNode }) {
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const ready = useSyncExternalStore(noopSubscribe, getReady, getServerReady);

  const setConsent = useCallback((v: Consent) => write(v), []);

  return (
    <ConsentContext.Provider value={{ consent, setConsent, ready }}>
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within ConsentProvider");
  return ctx;
}
