"use client";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

const tokens = Array.from({ length: 10 }, (_, i) => ({ id: i, pushedOut: i < 3 }));

const models = [
  { name: "Claude 3.5 Sonnet", tokens: "~200K", width: 10 },
  { name: "GPT-4o", tokens: "~128K", width: 6.4 },
  { name: "Gemini 1.5 Pro", tokens: "up to 2M", width: 100 },
];

function ContextWindowIllustration() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="rounded-xl border border-border bg-muted p-4 font-mono text-[11px]">
      <div className="mb-2 flex items-center justify-between text-[9px] font-bold tracking-wide">
        <span className="text-muted-foreground">PUSHED OUT</span>
        <span className="text-brand">IN CONTEXT WINDOW</span>
      </div>

      <div className="mb-3 flex gap-1">
        {tokens.map((token, i) => (
          <span
            key={token.id}
            className={
              token.pushedOut
                ? "h-5 flex-1 rounded-[3px] bg-border"
                : "h-5 flex-1 rounded-[3px] bg-brand"
            }
            style={{
              opacity: played ? (token.pushedOut ? 0.35 : 1) : 0,
              transform: played ? "scaleY(1)" : "scaleY(0.3)",
              transition: reducedMotion
                ? "none"
                : `opacity 350ms ease ${i * 60}ms, transform 350ms ease ${i * 60}ms`,
            }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        {models.map((model, i) => {
          const delay = 700 + i * 150;
          return (
            <div key={model.name} className="flex items-center gap-2">
              <span className="w-24 shrink-0 text-[9px] font-semibold text-card-foreground">
                {model.name}
              </span>
              <div className="h-3 flex-1 overflow-hidden rounded-sm bg-card">
                <div
                  className="h-full rounded-sm bg-brand/60"
                  style={{
                    width: played ? `${model.width}%` : "0%",
                    transition: reducedMotion ? "none" : `width 500ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
                  }}
                />
              </div>
              <span
                className="w-14 shrink-0 text-right text-[9px] font-semibold text-muted-foreground"
                style={{
                  opacity: played ? 1 : 0,
                  transition: reducedMotion ? "none" : `opacity 300ms ease ${delay + 200}ms`,
                }}
              >
                {model.tokens}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-dashed border-border pt-2.5">
        <span className="text-[9px] font-bold tracking-wide text-muted-foreground">
          100 TOKENS ≈ 75 WORDS
        </span>
        <span className="text-[9px] font-bold tracking-wide text-brand">NOT MEMORY — A BUDGET</span>
      </div>
    </div>
  );
}

export { ContextWindowIllustration };
