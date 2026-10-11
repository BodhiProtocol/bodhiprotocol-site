"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

// Left: the camera records every order event so it can be replayed later.
// Right: the smoke detector records nothing, but escalates the moment a signal crosses a line.
const frames = ["NEW", "MOD", "CXL", "CXL", "CXL", "TRD"];
const stages = ["STAGE I", "STAGE II", "STAGE III", "STAGE IV"];
// Each stage up the ladder is a stronger restriction, so it fills a little hotter.
const stageFill = ["bg-rose-600/10", "bg-rose-600/20", "bg-rose-600/30", "bg-rose-600/40"];

function CameraSmokeDetectorIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(4px)",
    transition: reducedMotion ? "none" : `opacity 350ms ease ${delay}ms, transform 350ms ease ${delay}ms`,
  });

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <style>{`
        @keyframes surv-rec-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
      `}</style>

      <div className="mb-3 text-[9px] font-bold tracking-wide text-muted-foreground">
        MARKET SURVEILLANCE · TWO WAYS TO WATCH ONE MARKET
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Camera */}
        <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[8px] font-bold tracking-wide text-brand">CAMERA · US</span>
            <span className="flex items-center gap-1 text-[7px] font-bold text-rose-600 dark:text-rose-500">
              <span
                className="inline-block size-1.5 rounded-full bg-rose-600 dark:bg-rose-500"
                style={{
                  animation: played && !reducedMotion ? "surv-rec-blink 1.6s ease-in-out infinite" : undefined,
                }}
                aria-hidden="true"
              />
              REC
            </span>
          </div>

          <div className="rounded-md border border-border bg-muted px-1 py-1">
            <div className="mb-1 flex justify-between px-0.5" aria-hidden="true">
              {frames.map((_, i) => (
                <span key={i} className="size-1 rounded-[1px] bg-border" />
              ))}
            </div>
            <div className="grid grid-cols-6 gap-0.5">
              {frames.map((frame, i) => (
                <span
                  key={i}
                  className={`rounded-[3px] py-1 text-center text-[7px] font-bold ${
                    frame === "CXL" ? "bg-brand/15 text-brand" : "bg-card text-muted-foreground"
                  }`}
                  style={fade(150 + i * 120)}
                >
                  {frame}
                </span>
              ))}
            </div>
            <div className="mt-1 flex justify-between px-0.5" aria-hidden="true">
              {frames.map((_, i) => (
                <span key={i} className="size-1 rounded-[1px] bg-border" />
              ))}
            </div>
          </div>

          <span className="text-[8px] font-bold tracking-wide text-muted-foreground" style={fade(950)}>
            ◀◀ REPLAY LATER · PROVE IT
          </span>
        </div>

        {/* Smoke detector */}
        <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-2.5">
          <span className="text-[8px] font-bold tracking-wide text-rose-600 dark:text-rose-500">
            SMOKE DETECTOR · INDIA
          </span>

          <div className="flex flex-col-reverse gap-0.5">
            {stages.map((stage, i) => (
              <div
                key={stage}
                className={`flex items-center justify-between rounded-[3px] border px-1.5 py-[3px] transition-colors duration-300 ${
                  played ? `border-rose-600/40 dark:border-rose-500/40 ${stageFill[i]}` : "border-border"
                }`}
                style={{ transitionDelay: reducedMotion ? "0ms" : `${250 + i * 220}ms` }}
              >
                <span className="text-[7px] font-bold text-rose-600 dark:text-rose-500">{stage}</span>
                <span className="text-[7px] font-bold text-rose-600 dark:text-rose-500" style={fade(300 + i * 220)}>
                  ▲
                </span>
              </div>
            ))}
          </div>

          <span className="text-[8px] font-bold tracking-wide text-muted-foreground" style={fade(1250)}>
            ACTS NOW · RECORDS NOTHING
          </span>
        </div>
      </div>

      <div
        className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5"
        style={fade(1350)}
      >
        <span className="text-[9px] font-bold tracking-wide text-brand">CAT · BUILT AFTER THE 2010 FLASH CRASH</span>
        <span className="text-[9px] font-bold tracking-wide text-rose-600 dark:text-rose-500">GSM + ASM</span>
      </div>
    </div>
  );
}

export { CameraSmokeDetectorIllustration };
