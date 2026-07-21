import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { AudienceProvider } from "@/components/AudienceProvider";
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
    "Five Roundies a month at Brisbane's best venues — one on us at every outing, plus exclusive deals and a live look at where everyone's going.",
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
      "Five Roundies a month at Brisbane's best venues — one on us at every outing, plus exclusive deals and a live look at where everyone's going.",
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
      "Five Roundies a month at Brisbane's best venues — one on us at every outing, plus exclusive deals and a live look at where everyone's going.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

/*
  Pre-paint state resolution. Both the audience accent and the splash live in
  browser storage, which the server can't read — so React only learns about them
  in an effect, i.e. after the first paint. That produced two visible flashes:
  a returning "venue" visitor saw the blue accent repaint navy, and anyone who'd
  already dismissed the splash saw it flash up and vanish.

  This runs synchronously during HTML parse, before the browser paints, and
  writes both answers onto <html> as data attributes. CSS keys off them
  (globals.css), so the first paint is already correct — no repaint, no flash.

  It must be a plain inline <script>, not next/script: `beforeInteractive`
  explicitly does not block hydration and Next controls its placement, so it
  cannot guarantee execution before paint. Keep this tiny and dependency-free —
  it is parse-blocking, so every byte is on the critical path.

  Storage keys are duplicated from AudienceProvider/Splash by necessity (this
  string ships to the browser before any module loads); keep them in sync.
*/
const PRE_PAINT = `(function(){try{var d=document.documentElement;var v=null;try{v=new URLSearchParams(location.search).get("view")}catch(e){}var a=v==="venue"?"venue":v==="users"?"consumer":localStorage.getItem("oneround-audience");if(a==="venue"||a==="consumer")d.setAttribute("data-audience",a);if(sessionStorage.getItem("oneround-splash-seen"))d.setAttribute("data-splash-seen","1")}catch(e){}})()`;

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
        <AudienceProvider>{children}</AudienceProvider>
        {/* GA4 + Meta Pixel. Renders nothing outside production or without IDs;
            see components/Analytics.tsx for the guards and why paid ads depend
            on this staying live. */}
        <Analytics />
      </body>
    </html>
  );
}
