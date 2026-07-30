"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

function NettingIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  const fade = (delay: number) => ({
    opacity: played ? 1 : 0,
    transform: played ? "translateY(0)" : "translateY(8px)",
    transition: reducedMotion
      ? "none"
      : `opacity 420ms ease ${delay}ms, transform 420ms ease ${delay}ms`,
  });

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border bg-muted p-4 font-mono text-[10px] text-foreground sm:p-5"
    >
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-border pb-3">
        <span className="font-bold uppercase text-muted-foreground">
          Web to pebble
        </span>
        <span className="rounded-full bg-brand px-2.5 py-1 font-bold uppercase text-brand-foreground">
          Netting engine
        </span>
      </div>

      <div className="grid gap-3">
        <div
          className="grid gap-3 rounded-xl border border-border bg-card p-3"
          style={fade(0)}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold uppercase text-muted-foreground">
              1. Gross web
            </span>
            <span className="text-brand">$562M</span>
          </div>
          <div className="relative h-44 overflow-hidden rounded-lg bg-background">
            <div className="absolute left-[9%] top-[16%] grid size-9 place-items-center rounded-full border border-border bg-card font-bold">
              A
            </div>
            <div className="absolute right-[18%] top-[9%] grid size-9 place-items-center rounded-full border border-border bg-card font-bold">
              B
            </div>
            <div className="absolute right-[7%] top-[48%] grid size-9 place-items-center rounded-full border border-border bg-card font-bold">
              C
            </div>
            <div className="absolute bottom-[9%] right-[24%] grid size-9 place-items-center rounded-full border border-border bg-card font-bold">
              D
            </div>
            <div className="absolute bottom-[13%] left-[19%] grid size-9 place-items-center rounded-full border border-border bg-card font-bold">
              E
            </div>
            <div className="absolute left-[5%] top-[54%] grid size-9 place-items-center rounded-full border border-border bg-card font-bold">
              F
            </div>
            <span className="absolute left-[18%] top-[24%] h-0.5 w-[48%] rotate-[-9deg] bg-brand" />
            <span className="absolute right-[19%] top-[24%] h-0.5 w-[39%] rotate-[63deg] bg-foreground/50" />
            <span className="absolute right-[18%] top-[58%] h-0.5 w-[50%] rotate-[151deg] bg-brand" />
            <span className="absolute bottom-[23%] left-[19%] h-0.5 w-[39%] rotate-[-112deg] bg-foreground/50" />
            <span className="absolute left-[13%] top-[56%] h-0.5 w-[65%] rotate-[-34deg] bg-brand/70" />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr]" style={fade(160)}>
          <div className="rounded-xl border border-border bg-card p-3">
            <span className="font-bold uppercase text-muted-foreground">
              2. Two-way motion
            </span>
            <div className="mt-4 grid gap-2">
              <div className="flex items-center justify-between rounded-lg bg-background px-3 py-2">
                <span>Bank A to Bank B</span>
                <strong>$100M</strong>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-background px-3 py-2">
                <span>Bank B to Bank A</span>
                <strong>$96M</strong>
              </div>
            </div>
          </div>
          <div className="grid place-items-center px-2 font-bold uppercase text-brand">
            cancels
          </div>
          <div className="rounded-xl border border-brand/30 bg-brand/10 p-3">
            <span className="font-bold uppercase text-muted-foreground">
              3. One remainder
            </span>
            <div className="mt-4 flex items-center justify-between rounded-lg bg-background px-3 py-2">
              <span>Bank A to Bank B</span>
              <strong className="text-brand">$4M</strong>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2" style={fade(320)}>
          <div className="rounded-xl border border-border bg-card p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-bold uppercase text-muted-foreground">
                4. Hub
              </span>
              <span className="text-brand">clearinghouse</span>
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              {["A", "B", "C", "D", "E", "F"].map((bank) => (
                <span
                  key={bank}
                  className="rounded-lg border border-border bg-background px-2 py-2 text-center font-bold"
                >
                  {bank}
                </span>
              ))}
              <span className="col-span-3 rounded-full bg-foreground px-3 py-2 text-center font-bold text-background">
                final balances
              </span>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-3">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-bold uppercase text-muted-foreground">
                5. Legal floor
              </span>
              <span className="text-brand">enforceable</span>
            </div>
            <div className="grid gap-2">
              <div className="rounded-full bg-brand px-4 py-3 text-center font-bold text-brand-foreground">
                one final number
              </div>
              <div className="rounded-lg border border-border bg-background px-3 py-3 text-center font-bold uppercase">
                law + contracts + default rules
              </div>
            </div>
          </div>
        </div>

        <div
          className="grid gap-3 rounded-xl border border-border bg-card p-3 sm:grid-cols-[1.2fr_auto_.8fr]"
          style={fade(480)}
        >
          <div className="rounded-lg bg-foreground p-4 text-background">
            <span className="block font-bold uppercase opacity-70">
              Mountain
            </span>
            <strong className="block text-3xl">$562M</strong>
            <span className="opacity-70">gross promises</span>
          </div>
          <div className="grid place-items-center font-bold uppercase text-brand">
            compress
          </div>
          <div className="rounded-full bg-brand p-4 text-center text-brand-foreground">
            <span className="block font-bold uppercase opacity-80">Pebble</span>
            <strong className="block text-3xl">$48M</strong>
            <span className="opacity-80">net settlement</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { NettingIllustration };
