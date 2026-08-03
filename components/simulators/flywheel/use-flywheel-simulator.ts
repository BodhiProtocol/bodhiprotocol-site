"use client";

import * as React from "react";

export interface SimulatorState {
  investmentStrength: number;
  customerValueStrength: number;
  growthStrength: number;
  reinvestmentStrength: number;
  friction: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  hint: string;
  takeaway: string;
  check: (state: SimulatorState, momentum: number) => boolean;
}

const LOOP_KEYS = [
  "investmentStrength",
  "customerValueStrength",
  "growthStrength",
  "reinvestmentStrength",
] as const;

// momentum at these values sits at 55 (see computeMomentum) — already turning,
// but slow enough that any slider move reads as a clear change, not maxed out.
const DEFAULT_STATE: SimulatorState = {
  investmentStrength: 40,
  customerValueStrength: 40,
  growthStrength: 40,
  reinvestmentStrength: 40,
  friction: 30,
};

function computeMomentum(state: SimulatorState): number {
  const factors = LOOP_KEYS.map((key) => state[key]);
  const avgStrength = factors.reduce((sum, value) => sum + value, 0) / factors.length;
  return Math.max(0, Math.min(100, Math.round(50 + (avgStrength - state.friction) / 2)));
}

const CHALLENGES: Challenge[] = [
  {
    id: "self-sustaining",
    title: "Go Self-Sustaining",
    description: "Push Momentum to 80 or higher.",
    hint: "Raise all four loop-strength sliders while keeping Friction low.",
    takeaway: "Past a threshold, the loop feeds itself — it no longer needs an outside push.",
    check: (_state, momentum) => momentum >= 80,
  },
  {
    id: "beat-the-friction",
    title: "Beat the Friction",
    description: "Get Momentum above 60 while Friction is 60 or higher.",
    hint: "Push all four loop stages high enough to out-run heavy resistance.",
    takeaway: "A strong enough loop can out-grow real resistance — it doesn't need friction at zero.",
    check: (state, momentum) => momentum > 60 && state.friction >= 60,
  },
  {
    id: "weak-link",
    title: "The Weak Link",
    description: "Stall the flywheel (Momentum below 40) while three of the four loop stages sit above 70.",
    hint: "Max out three stages, then starve the fourth one or raise Friction instead.",
    takeaway: "A flywheel is only as strong as its weakest stage — three strong links can't save a broken fourth.",
    check: (state, momentum) => {
      const strong = LOOP_KEYS.filter((key) => state[key] > 70).length;
      return momentum < 40 && strong >= 3;
    },
  },
];

function getExplanation(
  prev: SimulatorState,
  next: SimulatorState,
  prevMomentum: number,
  nextMomentum: number,
): string {
  const prevSpinning = prevMomentum > 50;
  const nextSpinning = nextMomentum > 50;
  const prevSelfSustaining = prevMomentum >= 80;
  const nextSelfSustaining = nextMomentum >= 80;

  if (nextSelfSustaining !== prevSelfSustaining) {
    return nextSelfSustaining
      ? "The loop just crossed the threshold — it's producing more push than it costs to keep turning. This is self-sustaining."
      : "Momentum dropped back below the self-sustaining line — it needs outside help again to keep spinning this fast.";
  }
  if (nextSpinning !== prevSpinning) {
    return nextSpinning
      ? "The wheel just started turning forward — the loop finally produces more than friction takes away."
      : "The wheel stalled — friction now outweighs everything the loop produces.";
  }
  if (next.investmentStrength !== prev.investmentStrength) {
    return next.investmentStrength > prev.investmentStrength
      ? "More goes into the loop up front — money, time, or effort spent before any payoff exists."
      : "Less is being invested up front — the loop has less raw fuel to work with.";
  }
  if (next.customerValueStrength !== prev.customerValueStrength) {
    return next.customerValueStrength > prev.customerValueStrength
      ? "That investment is converting into something customers actually notice and want more of."
      : "The investment is converting into customer value less efficiently than before.";
  }
  if (next.growthStrength !== prev.growthStrength) {
    return next.growthStrength > prev.growthStrength
      ? "Happier customers are turning into real growth — more of them, or more from each one."
      : "Growth is converting less of that customer value into new demand than before.";
  }
  if (next.reinvestmentStrength !== prev.reinvestmentStrength) {
    return next.reinvestmentStrength > prev.reinvestmentStrength
      ? "Growth is funding the next round of investment — this is the link that turns a cycle into a compounding loop."
      : "Growth is throwing off less fuel for the next cycle — the loop leaks more than it recycles.";
  }
  if (next.friction !== prev.friction) {
    return next.friction > prev.friction
      ? "Competition, complexity, or cost pressure is now eating more of what the loop produces."
      : "Less resistance is dragging on the loop — more of what it produces stays inside it.";
  }
  return "This loop is just starting out. Move a slider to see how it changes the spin.";
}

function percentDelta(base: number, current: number): number {
  if (base === 0) return current === 0 ? 0 : 100;
  return Math.round(((current - base) / base) * 100);
}

function getInsightReason(momentum: number): string {
  if (momentum >= 80) {
    return "The loop is generating more than it costs to keep turning — it will keep accelerating on its own.";
  }
  if (momentum <= 39) {
    return "Friction is winning. Without a change, this wheel grinds to a stop.";
  }
  return "Adjust the sliders to see how each stage changes the spin.";
}

export function useFlywheelSimulator() {
  const [state, setState] = React.useState<SimulatorState>(DEFAULT_STATE);
  const [baseline] = React.useState<SimulatorState>(DEFAULT_STATE);
  const [selectedExample, setSelectedExample] = React.useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = React.useState<string[]>([]);
  const prevStateRef = React.useRef<SimulatorState>(DEFAULT_STATE);
  const prevMomentumRef = React.useRef(computeMomentum(DEFAULT_STATE));

  const momentum = computeMomentum(state);
  const spinning = momentum > 50;
  const selfSustaining = momentum >= 80;

  const explanation = React.useMemo(
    () => getExplanation(prevStateRef.current, state, prevMomentumRef.current, momentum),
    [state, momentum],
  );

  React.useEffect(() => {
    prevStateRef.current = state;
    prevMomentumRef.current = momentum;
  }, [state, momentum]);

  const activeChallengeIndex = Math.min(completedChallenges.length, CHALLENGES.length - 1);
  const activeChallenge = CHALLENGES[activeChallengeIndex];
  const allChallengesComplete = completedChallenges.length === CHALLENGES.length;

  React.useEffect(() => {
    if (allChallengesComplete) return;
    if (completedChallenges.includes(activeChallenge.id)) return;
    if (activeChallenge.check(state, momentum)) {
      setCompletedChallenges((prev) => [...prev, activeChallenge.id]);
    }
  }, [state, momentum, activeChallenge, completedChallenges, allChallengesComplete]);

  const insights = React.useMemo(() => {
    const growthLoopNow = (state.growthStrength + state.reinvestmentStrength) / 2;
    const growthLoopBase = (baseline.growthStrength + baseline.reinvestmentStrength) / 2;
    return {
      investmentDelta: percentDelta(baseline.investmentStrength, state.investmentStrength),
      customerValueDelta: percentDelta(baseline.customerValueStrength, state.customerValueStrength),
      growthLoopDelta: percentDelta(growthLoopBase, growthLoopNow),
      frictionDelta: percentDelta(baseline.friction, state.friction),
      reason: getInsightReason(momentum),
    };
  }, [state, baseline, momentum]);

  const updateField = React.useCallback(<K extends keyof SimulatorState>(key: K, value: SimulatorState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = React.useCallback(() => {
    setState(DEFAULT_STATE);
    setSelectedExample(null);
    setCompletedChallenges([]);
  }, []);

  return {
    state,
    baseline,
    momentum,
    spinning,
    selfSustaining,
    explanation,
    insights,
    challenges: CHALLENGES,
    activeChallengeIndex,
    completedChallenges,
    allChallengesComplete,
    selectedExample,
    setSelectedExample,
    updateField,
    reset,
  };
}

export { DEFAULT_STATE, LOOP_KEYS };
