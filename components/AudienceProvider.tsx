"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
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

  READING THE STORE. localStorage is an external mutable source, so it is read
  through useSyncExternalStore rather than an effect that calls setState. The
  previous version hydrated with useState("consumer") and then setState-d inside
  an effect on every single page load — a scheduled second render pass for every
  visitor, on a provider that wraps the entire tree, even when the value never
  changed. useSyncExternalStore gives React the server value for hydration and
  the real value immediately afterwards, with no effect in the middle.

  This does NOT fix the content swap documented in AGENTS.md. A returning venue
  visitor still gets consumer content in the SSR HTML and sees it change after
  hydration, because the server genuinely cannot read browser storage. That needs
  a cookie and per-request rendering. What this removes is the extra render pass
  that every visitor paid, including consumers whose value never changed.
*/

export type Audience = "consumer" | "venue";

type Ctx = {
  audience: Audience;
  setAudience: (a: Audience) => void;
  toggle: () => void;
};

const AudienceContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "oneround-audience";

/*
  Snapshot cache. getSnapshot must return a referentially stable value between
  changes or React re-renders forever, so the resolved audience is held here and
  only recomputed when something actually writes it. Primitives compare by value,
  so a cached string is enough.
*/
let cached: Audience | null = null;
const listeners = new Set<() => void>();

/* A ?view=venue|users query param wins, so the venue home can be deep-linked. */
function read(): Audience {
  try {
    const view = new URLSearchParams(window.location.search).get("view");
    if (view === "venue") return "venue";
    if (view === "users") return "consumer";
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "consumer" || saved === "venue") return saved;
  } catch {
    /* ignore */
  }
  return "consumer";
}

function getSnapshot(): Audience {
  if (cached === null) cached = read();
  return cached;
}

/*
  The server has no storage, so it always renders the consumer side. Hydration
  matches this exactly; the real value is picked up immediately after.
*/
function getServerSnapshot(): Audience {
  return "consumer";
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  /*
    Cross-tab sync, which the effect-based version never had: choosing Venues in
    one tab now updates any other open tab. `storage` only fires in OTHER tabs,
    so this cannot loop with our own writes.
  */
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

function write(next: Audience) {
  cached = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore */
  }
  emit();
}

export function AudienceProvider({ children }: { children: ReactNode }) {
  const audience = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  /*
    Keep <html data-audience> in step with React. The inline script sets it for
    the first paint; from here on this is the only thing that can change it.
    This effect stays an effect on purpose — it synchronises an external system
    (the DOM) rather than setting state, which is exactly what effects are for.
  */
  useEffect(() => {
    document.documentElement.setAttribute("data-audience", audience);
  }, [audience]);

  const setAudience = useCallback((a: Audience) => write(a), []);

  const toggle = useCallback(
    () => write(getSnapshot() === "consumer" ? "venue" : "consumer"),
    [],
  );

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
