"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, RotateCcw, Send, XCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { outcomes } from "./scenarios";
import type { OutcomeId, Scenario } from "./types";

interface OrderTicketProps {
  scenario: Scenario;
  selected: OutcomeId | null;
  onSelect: (id: OutcomeId) => void;
  submitted: boolean;
  onSubmit: () => void;
  onNext: () => void;
}

function OrderTicket({ scenario, selected, onSelect, submitted, onSubmit, onNext }: OrderTicketProps) {
  const correct = submitted && selected === scenario.correctOutcome;

  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 sm:p-7">
      <div>
        <div className="font-mono text-[10px] font-bold tracking-[0.16em] text-brand uppercase">
          {scenario.desk}
        </div>
        <h3 className="mt-2 font-serif text-2xl leading-tight font-medium text-balance">
          {scenario.requestType} — {scenario.record.id}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{scenario.requestDetail}</p>
        <p className="mt-1 font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
          Requested by: {scenario.requestedBy}
        </p>
      </div>

      <div className="grid gap-2">
        <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-muted-foreground uppercase">
          Predict the engine&apos;s response
        </span>
        {outcomes.map((option) => {
          const isSelected = selected === option.id;
          const isCorrectAnswer = option.id === scenario.correctOutcome;
          const stateClass = submitted
            ? isCorrectAnswer
              ? "border-brand bg-brand/10 text-brand"
              : isSelected
                ? "border-destructive/40 bg-destructive/10 text-destructive"
                : "opacity-60"
            : isSelected
              ? "border-brand bg-brand/10 text-brand"
              : "";

          return (
            <button
              key={option.id}
              type="button"
              disabled={submitted}
              onClick={() => onSelect(option.id)}
              className={cn(
                "rounded-2xl border border-border bg-card p-3 text-left transition-colors hover:border-brand/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-default",
                stateClass,
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium">{option.label}</span>
                {submitted && isCorrectAnswer ? <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" /> : null}
                {submitted && isSelected && !isCorrectAnswer ? (
                  <XCircle className="size-4 shrink-0" aria-hidden="true" />
                ) : null}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{option.hint}</p>
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          type="button"
          disabled={!selected}
          onClick={onSubmit}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40"
        >
          Send to engine <Send className="size-4" aria-hidden="true" />
        </button>
      ) : (
        <div className="flex flex-col gap-4">
          <div
            className={cn(
              "flex items-center gap-2 rounded-2xl border p-3 text-sm font-semibold",
              correct
                ? "border-brand/30 bg-brand/10 text-brand"
                : "border-destructive/30 bg-destructive/10 text-destructive",
            )}
          >
            {correct ? <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" /> : <XCircle className="size-4 shrink-0" aria-hidden="true" />}
            {correct ? "Correct — that's what the engine did." : "Not quite — see what the engine actually did."}
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{scenario.explanation}</p>
          <Link
            href={scenario.essay.href}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-[0.08em] text-brand uppercase hover:underline"
          >
            {scenario.essay.label} <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-card-foreground hover:border-brand/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            Next scenario <RotateCcw className="size-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

export { OrderTicket };
