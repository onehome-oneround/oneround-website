import type { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/*
  Shared shell for the legal pages (Privacy, Members Terms, Venue Terms) so the
  header, measure and prose styling are identical across all three. Body content
  is passed in verbatim from each source document; this component only supplies
  the consistent visual frame.
*/

export default function LegalPage({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="flex-1 px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <article className="mx-auto max-w-2xl">
          <p className="kicker text-navy">Legal</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] text-ink sm:text-5xl">
            {title}
          </h1>
          {meta ? (
            <div className="mt-4 space-y-1 text-sm text-ink-faint">{meta}</div>
          ) : null}
          <div className="legal-prose mt-8">{children}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
