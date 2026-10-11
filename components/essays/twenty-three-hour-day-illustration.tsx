"use client";

import * as React from "react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

// Both strips run for one US trade date: from 8 PM New York (hour 0) to the
// next 8 PM (hour 24). Every position below is in hours from that start.
const HOURS = 24;
const pct = (hour: number) => `${(hour / HOURS) * 100}%`;

type Season = "winter" | "summer";

// Hours India is ahead of New York. The US moves its clocks; India doesn't.
const offset: Record<Season, number> = { winter: 10.5, summer: 9.5 };

const nySegments = [
  {
    key: "night",
    label: "Night",
    sub: "9 PM–4 AM",
    start: 1,
    end: 8,
    className: "text-indigo-50",
    fill: "bg-indigo-900",
    chip: "bg-indigo-900",
  },
  {
    key: "day",
    label: "Day session",
    sub: "4 AM–8 PM",
    start: 8,
    end: 24,
    className: "text-amber-900 dark:text-amber-200",
    fill: "bg-amber-400/25",
    chip: "",
  },
];

const nyTicks = [
  { hour: 0, label: "8 PM" },
  { hour: 8, label: "4 AM" },
  { hour: 16, label: "12 PM" },
  { hour: 24, label: "8 PM" },
];

// Clock time in India for a position on the strip, e.g. "6:30 AM".
function indiaTime(hour: number, season: Season) {
  const total = (((20 + hour + offset[season]) % 24) + 24) % 24;
  const h = Math.floor(total);
  const m = Math.round((total - h) * 60);
  const suffix = h < 12 ? "AM" : "PM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

// Strip position for a clock time in India, e.g. 9.5 for 9:30 AM.
function stripHourForIndia(indiaHour: number, season: Season) {
  return (((indiaHour - offset[season] - 20) % 24) + 24) % 24;
}

function TwentyThreeHourDayIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [season, setSeason] = React.useState<Season>("winter");

  const reveal = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion ? "none" : `opacity 380ms ease ${delay}ms, transform 380ms ease ${delay}ms`,
  });

  const grow = (delay: number) => ({
    transform: played ? "scaleX(1)" : "scaleX(0)",
    transformOrigin: "left",
    transition: reducedMotion ? "none" : `transform 520ms ease ${delay}ms`,
  });

  const slide = reducedMotion ? "none" : "left 420ms ease, width 420ms ease";

  const officeStart = stripHourForIndia(9.5, season);
  const officeEnd = stripHourForIndia(18, season);
  const pin = stripHourForIndia(10, season);
  const nightEndsInIndia = indiaTime(8, season);
  const pinInNewYork = season === "winter" ? "11:30 PM Sunday" : "12:30 AM Monday";

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-border bg-muted font-mono text-[11px]">
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between gap-3 text-[9px] font-bold tracking-wide text-muted-foreground">
          <span>ONE TRADE DATE, TWO CLOCKS</span>
          <span>NEW YORK -&gt; INDIA</span>
        </div>
        <div className="mt-3">
          <div className="text-[22px] font-bold leading-none tracking-tight text-card-foreground">
            23 hours open. 1 hour that holds everything.
          </div>
          <div className="mt-1 text-[9px] font-bold tracking-wide text-muted-foreground">
            New York&apos;s night is India&apos;s working morning.
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2" style={reveal(60)}>
          <span className="text-[8px] font-bold tracking-wide text-muted-foreground">NEW YORK (ET)</span>
          <span className="text-[8px] font-bold tracking-wide text-brand">NEW TRADE DATE STARTS AT 8 PM</span>
        </div>

        <div className="relative mt-4">
          {/* The Pune pin runs through both strips. */}
          <div className="pointer-events-none absolute inset-0 z-[5]" style={reveal(900)} aria-hidden="true">
            <div
              className="absolute -top-2 bottom-4 w-px bg-card-foreground/70"
              style={{ left: pct(pin), transition: slide }}
            >
              <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-card-foreground" />
            </div>
          </div>

          <div className="relative h-11 overflow-hidden rounded-lg border border-border bg-card">
            <div
              className="absolute inset-y-0 z-[1] flex items-center justify-center bg-brand text-[8px] font-bold text-brand-foreground"
              style={{ left: 0, width: `max(${pct(1)}, 14px)`, ...grow(120) }}
              title="The pause, 8 PM–9 PM"
            />
            {nySegments.map((segment, index) => (
              <div
                key={segment.key}
                className={`absolute inset-y-0 flex flex-col items-center justify-center ${segment.className}`}
                style={{ left: pct(segment.start), width: pct(segment.end - segment.start) }}
              >
                <div className={`absolute inset-0 ${segment.fill}`} style={grow(220 + index * 160)} />
                <span
                  className={`relative z-[6] flex flex-col items-center rounded px-1 ${segment.chip}`}
                  style={reveal(380 + index * 160)}
                >
                  <span className="text-[9px] font-bold tracking-wide">{segment.label}</span>
                  <span className="text-[8px] font-bold tracking-wide opacity-80">{segment.sub}</span>
                </span>
              </div>
            ))}
            <div
              className="absolute bottom-0 h-1 bg-amber-500/70"
              style={{ left: pct(13.5), width: pct(6.5), ...grow(560) }}
              title="Regular hours, 9:30 AM–4 PM"
            />
          </div>

          <div className="relative mt-1 h-3">
            {nyTicks.map((tick) => (
              <span
                key={`ny-${tick.hour}`}
                className="absolute z-[6] whitespace-nowrap bg-muted px-0.5 text-[8px] font-bold text-muted-foreground"
                style={{
                  left: pct(tick.hour),
                  transform:
                    tick.hour === 0 ? "none" : tick.hour === HOURS ? "translateX(-100%)" : "translateX(-50%)",
                }}
              >
                {tick.label}
              </span>
            ))}
          </div>

          <div className="mt-2 flex items-start gap-2" style={reveal(700)}>
            <span className="mt-0.5 size-2 shrink-0 rounded-sm bg-brand" />
            <span className="relative z-[6] bg-muted text-[8px] font-bold leading-snug tracking-wide text-card-foreground">
              THE PAUSE, 8–9 PM: <span className="text-muted-foreground">trade date flips · clearing · price feed pauses</span>
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between gap-2" style={reveal(760)}>
            <span className="relative z-[6] bg-muted pr-1 text-[8px] font-bold tracking-wide text-muted-foreground">INDIA (IST)</span>
            <span className="relative z-[6] bg-muted pl-1 text-[8px] font-bold tracking-wide text-muted-foreground">DIRECTLY BELOW = SAME MOMENT</span>
          </div>

          <div className="relative mt-1.5 h-8 overflow-hidden rounded-lg border border-border bg-card" style={reveal(780)}>
            <div
              className="absolute inset-y-0 flex items-center justify-end border-x border-emerald-600/40 bg-emerald-500/20 text-[8px] font-bold tracking-wide text-emerald-800 dark:text-emerald-200"
              style={{ left: pct(officeStart), width: pct(officeEnd - officeStart), transition: slide }}
            >
              <span className="pr-1.5">Office 9:30–6</span>
            </div>
          </div>

          <div className="relative mt-1 h-3">
            {nyTicks.map((tick) => (
              <span
                key={`in-${tick.hour}`}
                className="absolute z-[6] whitespace-nowrap bg-muted px-0.5 text-[8px] font-bold text-muted-foreground"
                style={{
                  left: pct(tick.hour),
                  transform:
                    tick.hour === 0 ? "none" : tick.hour === HOURS ? "translateX(-100%)" : "translateX(-50%)",
                }}
              >
                {indiaTime(tick.hour, season)}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-3 rounded-lg border border-border bg-card p-2.5" style={reveal(960)}>
          <div className="text-[9px] font-bold tracking-wide text-card-foreground">
            <span className="mr-1 inline-block size-2 rounded-full bg-card-foreground align-middle" />
            10:00 AM Monday in Pune = {pinInNewYork} in New York
          </div>
          <div className="mt-1 text-[8px] font-bold tracking-wide text-muted-foreground">
            Your whole working day is open. Until {nightEndsInIndia}, it&apos;s New York&apos;s night.
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-2" style={reveal(1020)}>
          <span className="text-[8px] font-bold tracking-wide text-muted-foreground">US CLOCKS</span>
          <div className="flex rounded-full border border-border bg-card p-0.5" role="group" aria-label="US clock season">
            {(
              [
                { value: "winter", label: "Nov–Mar" },
                { value: "summer", label: "Mar–Nov" },
              ] as const
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={season === option.value}
                onClick={() => setSeason(option.value)}
                className={`rounded-full px-2.5 py-1 text-[8px] font-bold tracking-wide transition-colors ${
                  season === option.value ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:text-card-foreground"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-1 text-right text-[8px] font-bold tracking-wide text-muted-foreground" style={reveal(1040)}>
          {season === "winter" ? "India is 10½ hours ahead" : "US summer time: India is 9½ hours ahead"}
        </div>
      </div>

      <div className="border-t border-border bg-background/70 p-3 text-center text-[9px] font-bold tracking-wide text-muted-foreground">
        WEEKEND: CLOSED SAT {indiaTime(24, season)} → MON {indiaTime(1, season)} IST
      </div>
    </div>
  );
}

export { TwentyThreeHourDayIllustration };
