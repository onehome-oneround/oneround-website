"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import DownloadButtons from "./DownloadButtons";
import PillButton from "./PillButton";
import { useAudience } from "./AudienceProvider";

/*
  Hero — the masthead spread. A hard accent slab (Users = blue, Venues = navy)
  split editorial-style: masthead + giant Fraunces headline + subhead + badges on
  the left, a full-height framed venue figure on the right. On desktop it pins
  while a scroll-scrubbed parallax plays on the figure and headline (the one big
  motion moment); on mobile it's a deliberate stacked layout, no pin/parallax.
  Headline reveals line-by-line with a mask wipe on load.
*/

export default function Hero() {
  const { audience } = useAudience();
  const isVenue = audience === "venue";
  const outer = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!desktop.matches || reduce.matches) {
      el.style.setProperty("--p", "0");
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const p = Math.min(1, Math.max(0, -r.top / (total || 1)));
        el.style.setProperty("--p", String(p));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const subhead = isVenue
    ? "OneRound brings new faces to your venue and gets them spending, with no upfront cost and no risk."
    : "At Brisbane's best venues. Plus deals you won't find anywhere else, and see where everyone's going, before you head out. One app, for any occasion.";

  const heroImage = isVenue
    ? { src: "/images/newhero-venue.png", alt: "A buzzing Brisbane venue interior" }
    : { src: "/images/hero-user.png", alt: "A packed Brisbane venue" };

  // On the blue slab, secondary text is navy for AA contrast; on navy, it's white.
  const soft = isVenue ? "text-white/72" : "text-navy/75";
  const meta = isVenue ? "text-white/60" : "text-navy/60";
  // The accent word sits in the OPPOSITE brand colour to the slab.
  const accentColor = isVenue ? "var(--blue)" : "var(--navy)";

  return (
    <section
      ref={outer}
      className="relative bg-[color:var(--accent)] lg:h-[132vh]"
    >
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">
        <div className="mx-auto grid min-h-[100svh] max-w-[96rem] grid-cols-1 gap-0 px-5 pb-12 pt-20 sm:px-8 lg:grid-cols-12 lg:gap-0 lg:px-0 lg:pb-0 lg:pt-0">
          {/* LEFT — masthead, headline, subhead, CTAs */}
          <div className="flex flex-col justify-center lg:col-span-7 lg:py-24 lg:pl-8 lg:pr-12 xl:pl-12">
            {/* Headline */}
            <h1
              className="mt-10 text-white lg:mt-0"
              style={{
                fontSize: "clamp(2.5rem, 5.4vw, 5.5rem)",
                lineHeight: "1.02",
                fontWeight: 600,
                transform: "translateY(calc(var(--p, 0) * -2vh))",
              }}
            >
              {isVenue ? (
                <>
                  <span className="mask">
                    <i style={{ ["--d" as string]: "0.05s" }}>More customers</i>
                  </span>
                  <span className="mask">
                    <i style={{ ["--d" as string]: "0.16s" }}>through your door.</i>
                  </span>
                  <span className="mask">
                    <i style={{ ["--d" as string]: "0.27s" }}>
                      <span
                        className="accent-ital"
                        style={{ color: accentColor, ["--rule-color" as string]: accentColor, ["--d" as string]: "0.9s" }}
                      >
                        Free to join
                      </span>
                      .
                    </i>
                  </span>
                </>
              ) : (
                <>
                  <span className="mask">
                    <i style={{ ["--d" as string]: "0.05s" }}>Five free food</i>
                  </span>
                  <span className="mask">
                    <i style={{ ["--d" as string]: "0.16s" }}>or drink items,</i>
                  </span>
                  <span className="mask">
                    <i style={{ ["--d" as string]: "0.27s" }}>
                      <span
                        className="accent-ital"
                        style={{ color: accentColor, ["--rule-color" as string]: accentColor, ["--d" as string]: "0.9s" }}
                      >
                        every month
                      </span>
                      .
                    </i>
                  </span>
                </>
              )}
            </h1>

            {/* Subhead + CTAs */}
            <div className="rise mt-6 max-w-xl sm:mt-7" style={{ ["--d" as string]: "0.6s" }}>
              <p className={`text-base font-medium leading-relaxed sm:text-lg ${soft}`}>
                {subhead}
              </p>
              <div className="mt-8 flex flex-col gap-3">
                {isVenue ? (
                  <PillButton href="#contact" variant="solid" onDark>
                    Become a partner for free
                  </PillButton>
                ) : (
                  <>
                    <DownloadButtons />
                    <p className={`kicker ${meta}`}>Free download / iOS + Android</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT — inset photo panel (rounded, lifted) with parallax */}
          <div className="relative mt-10 lg:col-span-5 lg:mt-0 lg:py-10 lg:pl-3 lg:pr-10">
            <div className="relative h-[58vw] overflow-hidden rounded-3xl shadow-[0_30px_70px_-42px_rgba(2,0,49,0.55)] sm:h-[44vw] lg:h-full">
              <div
                className="absolute inset-0 lg:-inset-y-[10%]"
                style={{ transform: "translateY(calc(var(--p, 0) * 14%))" }}
              >
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  priority
                  quality={90}
                  // The column is cover-cropped and tall (and the parallax wrapper
                  // stretches it ~20% more), so it binds on height. A width-based vw
                  // hint under-provisions it; request the full source (capped at the
                  // file's native 1024px) so no under-resolution variant is served.
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
