import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { AudienceProvider } from "@/components/AudienceProvider";
import { ConsentProvider } from "@/components/ConsentProvider";
import ConsentGate from "@/components/ConsentGate";
import Analytics from "@/components/Analytics";

/*
  Typography — "After Dark broadsheet" editorial system. Three families:
  - Fraunces (--font-display): a high-contrast display serif with real character
    (opsz/soft/wonk). Carries the headlines at magazine scale; the italic is the
    signature accent treatment. Distinctive, premium, expressive.
  - Hanken Grotesk (--font-sans): clean grotesque for body / UI. Quiet, modern,
    legible — the foil that lets the serif sing.
  - Space Mono (--font-mono): listings-style metadata — kickers, captions, index
    labels, fine print. Ticket-stub / culture-paper energy.

  Brand's licensed "Monarda" is not used; the editorial italic replaces it and
  can be reintroduced later via --font-accent without structural change.
*/

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const siteUrl = "https://oneround.au";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OneRound",
    template: "%s · OneRound",
  },
  description:
    "Five Roundies a month at Brisbane's best venues, plus exclusive deals and a live look at where everyone's going.",
  applicationName: "OneRound",
  keywords: [
    "OneRound",
    "Brisbane going out",
    "bars Brisbane",
    "venue deals",
    "things to do Brisbane",
  ],
  authors: [{ name: "ONEROUND PTY LTD" }],
  creator: "ONEROUND PTY LTD",
  publisher: "ONEROUND PTY LTD",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "OneRound",
    title: "OneRound",
    description:
      "Five Roundies a month at Brisbane's best venues, plus exclusive deals and a live look at where everyone's going.",
    locale: "en_AU",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OneRound",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OneRound",
    description:
      "Five Roundies a month at Brisbane's best venues, plus exclusive deals and a live look at where everyone's going.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

/*
  Pre-paint audience-accent resolution. The audience lives in browser storage,
  which the server can't read — so AudienceProvider only learns the real value in
  an effect, i.e. after first paint. Without this, a returning "venue" visitor
  would see the blue accent repaint to navy after hydration.

  This runs synchronously during HTML parse, before the browser paints, resolves
  the audience (?view param, else localStorage) and stamps data-audience on
  <html>. globals.css keys --accent off it, so the first paint is already the
  right colour — no accent flash.

  It must be a plain inline <script>, not next/script: `beforeInteractive`
  explicitly does not block hydration and Next controls its placement, so it
  cannot guarantee execution before paint. Keep this tiny and dependency-free —
  it is parse-blocking, so every byte is on the critical path.

  The storage key is duplicated from AudienceProvider by necessity (this string
  ships to the browser before any module loads); keep the two in sync. (This does
  NOT fix the content swap — see AGENTS.md; it only prevents the accent flash.)
*/
const PRE_PAINT = `(function(){try{var d=document.documentElement;var v=null;try{v=new URLSearchParams(location.search).get("view")}catch(e){}var a=v==="venue"?"venue":v==="users"?"consumer":localStorage.getItem("oneround-audience");if(a==="venue"||a==="consumer")d.setAttribute("data-audience",a)}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${fraunces.variable} ${hanken.variable} ${spaceMono.variable} h-full antialiased`}
      // The script below mutates <html> before React hydrates, which React would
      // otherwise flag as a server/client attribute mismatch.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT }} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-ink">
        {/* Skip link — first focusable element, visually hidden until focused,
            jumps keyboard users past the nav to the page's <main id="main-content">. */}
        <a
          href="#main-content"
          className="sr-only rounded-sm bg-navy px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        {/* ConsentProvider wraps everything that reads the tracking choice: the
            consent card and the analytics gate both live inside it. */}
        <ConsentProvider>
          <AudienceProvider>{children}</AudienceProvider>
          {/* Bottom-right consent card; renders only on a genuine first visit. */}
          <ConsentGate />
          {/* GA4 + Meta Pixel. Renders nothing until consent is accepted, and
              nothing outside production or without IDs; see
              components/Analytics.tsx for the three guards and why paid ads
              depend on this staying live. */}
          <Analytics />
        </ConsentProvider>
      </body>
    </html>
  );
}
