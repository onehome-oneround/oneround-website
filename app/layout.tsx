import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { AudienceProvider } from "@/components/AudienceProvider";

/*
  Typography — "Brisbane gig-poster" type system. Three families, each with a job:
  - Bricolage Grotesque (--font-display): big, characterful headlines. Set HUGE
    and tight — poster type, not body scaled up. Carries all the personality.
  - Hanken Grotesk (--font-sans): clean, warm body / UI. Quiet on purpose.
  - Space Mono (--font-mono): the micro-labels — kickers, placeholder slugs.
    Ticket-stub / listings energy.

  The brand's licensed brush script "Monarda" is no longer used as the accent
  here — the accent word is now set in the display font with a blue highlight
  swipe (see .accent-swipe in globals.css). If Monarda is licensed later, it can
  be reintroduced via a --font-accent variable without touching the structure.
*/

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
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
    default: "OneRound — However you go out, one app",
    template: "%s · OneRound",
  },
  description:
    "A free item every day at Brisbane's best venues, exclusive deals you won't find anywhere else, and a live look at where everyone's headed. Whatever the occasion, one app.",
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
    title: "OneRound — However you go out, one app",
    description:
      "Brisbane's going-out app. A free item every day, exclusive deals, and a live look at where everyone's headed.",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "OneRound — However you go out, one app",
    description:
      "Brisbane's going-out app. A free item every day, exclusive deals, and a live look at where everyone's headed.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${bricolage.variable} ${hanken.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-ink">
        <AudienceProvider>{children}</AudienceProvider>
      </body>
    </html>
  );
}
