"use client";

import * as React from "react";
import { Check, Lock, Target } from "lucide-react";

import { ChallengeCelebration } from "@/components/simulators/challenge-celebration";
import { Eyebrow, H3 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

interface ChallengeSummary {
  id: string;
  title: string;
  description: string;
}

interface ChallengePanelProps {
  challenges: ChallengeSummary[];
  completedChallenges: string[];
  activeChallengeIndex: number;
}

function ChallengePanel({ challenges, completedChallenges, activeChallengeIndex }: ChallengePanelProps) {
  const prevCompletedRef = React.useRef<string[]>(completedChallenges);
  const [celebratingId, setCelebratingId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const prev = prevCompletedRef.current;
    const freshlyCompleted = completedChallenges.find((id) => !prev.includes(id));
    if (freshlyCompleted) {
      setCelebratingId(freshlyCompleted);
    }
    prevCompletedRef.current = completedChallenges;
  }, [completedChallenges]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Eyebrow className="text-brand">Challenge Mode</Eyebrow>
        <H3>Put it to the test</H3>
      </div>
      <div className="flex flex-col gap-3">
        {challenges.map((challenge, index) => {
          const completed = completedChallenges.includes(challenge.id);
          const active = index === activeChallengeIndex && !completed;
          const locked = index > activeChallengeIndex;

          return (
            <div
              key={challenge.id}
              className={cn(
                "relative flex items-start gap-4 overflow-hidden rounded-2xl border p-5 transition-colors",
                completed && "border-brand/30 bg-brand/5",
                active && "border-brand/40 bg-brand/[0.03] shadow-sm shadow-brand/10",
                locked && "border-dashed border-border opacity-50",
                !completed && !active && !locked && "border-border",
              )}
            >
              {celebratingId === challenge.id ? (
                <ChallengeCelebration onDone={() => setCelebratingId(null)} />
              ) : null}
              <span
                className={cn(
                  "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                  completed ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {locked ? (
                  <Lock className="size-3.5" />
                ) : completed ? (
                  <Check className="size-4" />
                ) : (
                  <Target className="size-3.5" />
                )}
              </span>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] tracking-[0.15em] text-brand uppercase">
                  Mission {index + 1}
                </span>
                <span className="text-sm font-semibold">{challenge.title}</span>
                <span className="text-sm text-muted-foreground">{challenge.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { ChallengePanel };
export type { ChallengeSummary };
