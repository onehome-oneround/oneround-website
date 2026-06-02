import DownloadButtons from "./DownloadButtons";

/*
  Closing CTA band — full BLUE block with white text (a deliberate colour
  punctuation, bookending the hero). Repeated headline + "Download the app today"
  + store badges. id="download" is the nav Download target.
*/

export default function ClosingCTA() {
  return (
    <section id="download" className="scroll-mt-20 px-5 py-12 sm:px-8 sm:py-16">
      <div className="on-scroll relative mx-auto flex max-w-6xl flex-col items-center overflow-hidden rounded-[2rem] bg-blue px-6 py-20 text-center sm:py-28">
        {/* subtle depth */}
        <div
          className="pointer-events-none absolute inset-0 -z-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 80% at 50% 0%, rgba(255,255,255,0.18), transparent 70%)",
          }}
        />
        <span aria-hidden="true" className="grain" />
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-balance text-5xl font-extrabold leading-[0.9] tracking-[-0.03em] text-white sm:text-7xl">
            However you go out,{" "}
            <span
              className="accent-swipe"
              style={{ ["--swipe" as string]: "var(--navy)" }}
            >
              one app
            </span>
            .
          </h2>
          <p className="mt-5 text-base font-semibold text-white/85 sm:text-lg">
            Download the app today.
          </p>
          <div className="mt-9">
            <DownloadButtons center />
          </div>
          <p className="mt-4 text-xs text-white/70">
            Free to download. Available on iOS and Android.
          </p>
        </div>
      </div>
    </section>
  );
}
