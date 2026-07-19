import { Check, Lock } from "lucide-react";

import { Eyebrow, H3 } from "@/components/ui/typography";
import type { Challenge } from "@/components/simulators/network-effects/use-network-effects-simulator";
import { cn } from "@/lib/utils";

interface ChallengePanelProps {
  challenges: Challenge[];
  completedChallenges: string[];
  activeChallengeIndex: number;
}

function ChallengePanel({ challenges, completedChallenges, activeChallengeIndex }: ChallengePanelProps) {
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
                "flex items-start gap-3 rounded-2xl border p-4 transition-colors",
                completed && "border-brand/30 bg-brand/5",
                active && "border-brand/40 bg-brand/[0.03] shadow-sm shadow-brand/10",
                locked && "border-dashed border-border opacity-50",
                !completed && !active && !locked && "border-border",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-xs",
                  completed ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {locked ? <Lock className="size-3.5" /> : completed ? <Check className="size-3.5" /> : index + 1}
              </span>
              <div className="flex flex-col gap-1">
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
