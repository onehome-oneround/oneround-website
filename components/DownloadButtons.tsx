"use client";

import { useEffect, useState } from "react";

/*
  App Store + Google Play download buttons — OS-aware.
  - iOS visitors get the App Store badge first; Android gets Google Play first;
    desktop shows both equally. Both are always rendered (honest + available).
  - The app isn't published yet, so both point at href="#".

  ⚠️ TODO before launch:
    1. Replace href="#" with the real store URLs:
         APP_STORE_URL  = "https://apps.apple.com/app/idXXXXXXXXX"
         GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=au.oneround.app"
    2. Swap these hand-built badges for the official Apple / Google badge artwork
       (Apple "Download on the App Store" + Google "Get it on Google Play"),
       per their brand guidelines. These are close stand-ins, not the official files.
*/

// TODO: real store URLs at launch
const APP_STORE_URL = "#";
const GOOGLE_PLAY_URL = "#";

type OS = "ios" | "android" | "other";

function AppStoreBadge() {
  return (
    <span className="inline-flex h-[54px] items-center gap-2.5 border border-white/15 bg-black px-4 text-white transition group-hover/badge:border-white/40">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.36 12.78c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.75 2.28-1.6 2.78-.41 6.89 1.15 9.14.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.43-3.64M14.09 5.83c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.68 1.37-.59.67-1.1 1.76-.96 2.79 1.02.08 2.06-.52 2.7-1.26" />
      </svg>
      <span className="flex flex-col items-start leading-none">
        <span className="text-[10px] font-medium tracking-wide text-white/80">
          Download on the
        </span>
        <span className="text-[18px] font-semibold leading-tight">App Store</span>
      </span>
    </span>
  );
}

function GooglePlayBadge() {
  return (
    <span className="inline-flex h-[54px] items-center gap-2.5 border border-white/15 bg-black px-4 text-white transition group-hover/badge:border-white/40">
      <svg width="20" height="22" viewBox="0 0 512 512" aria-hidden="true">
        <path d="M48 59v394c0 6 3 11 8 14l228-211L56 45c-5 3-8 8-8 14z" fill="#34A853" />
        <path d="M380 196l-72-42-58 53 58 53 73-42c12-7 12-15-1-22z" fill="#FBBC04" />
        <path d="M56 45l228 158 58-53L96 18c-15-9-31-3-40 13z" fill="#EA4335" />
        <path d="M56 467l284-160-58-53L56 453c-1 6 0 11 0 14z" fill="#4285F4" />
      </svg>
      <span className="flex flex-col items-start leading-none">
        <span className="text-[10px] font-medium tracking-wide text-white/80">
          GET IT ON
        </span>
        <span className="text-[18px] font-semibold leading-tight">Google Play</span>
      </span>
    </span>
  );
}

type Props = {
  className?: string;
  /** Center the row (e.g. centered CTAs). */
  center?: boolean;
};

export default function DownloadButtons({ className = "", center = false }: Props) {
  const [os, setOs] = useState<OS>("other");

  useEffect(() => {
    const ua = navigator.userAgent || "";
    if (/iPhone|iPad|iPod/i.test(ua)) setOs("ios");
    else if (/Android/i.test(ua)) setOs("android");
    else setOs("other");
  }, []);

  const apple = (
    <a
      key="apple"
      href={APP_STORE_URL}
      aria-label="Download OneRound on the App Store"
      className="group/badge inline-flex active:scale-[0.98]"
      style={{ order: os === "android" ? 2 : 1 }}
    >
      <AppStoreBadge />
    </a>
  );

  const google = (
    <a
      key="google"
      href={GOOGLE_PLAY_URL}
      aria-label="Get OneRound on Google Play"
      className="group/badge inline-flex active:scale-[0.98]"
      style={{ order: os === "android" ? 1 : 2 }}
    >
      <GooglePlayBadge />
    </a>
  );

  return (
    <div
      className={`flex flex-wrap gap-3 ${center ? "justify-center" : ""} ${className}`}
    >
      {apple}
      {google}
    </div>
  );
}
