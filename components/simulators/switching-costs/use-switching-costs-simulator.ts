"use client";

import * as React from "react";

export interface SimulatorState {
  dataStored: number;
  integrationsBuilt: number;
  networkOnPlatform: number;
  contractLockIn: number;
  timeInvested: number;
  alternativeQuality: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  hint: string;
  takeaway: string;
  check: (state: SimulatorState, switchingCost: number, baseline: SimulatorState) => boolean;
}

const COST_KEYS = [
  "dataStored",
  "integrationsBuilt",
  "networkOnPlatform",
  "contractLockIn",
  "timeInvested",
] as const;

// switchingCost at these values is 18 (see computeSwitchingCost below); alternativeQuality
// is kept below that so the simulator opens resting, not mid-escape.
const DEFAULT_STATE: SimulatorState = {
  dataStored: 25,
  integrationsBuilt: 15,
  networkOnPlatform: 20,
  contractLockIn: 10,
  timeInvested: 20,
  alternativeQuality: 15,
};

function computeSwitchingCost(state: SimulatorState): number {
  const factors = COST_KEYS.map((key) => state[key]);
  const base = factors.reduce((sum, value) => sum + value, 0) / factors.length;

  // Multiple strong lock-in factors reinforce each other — losing your data,
  // your integrations, and your network all at once costs more than the sum
  // of each one alone.
  const highCount = factors.filter((value) => value >= 50).length;
  const synergy = highCount >= 3 ? (highCount - 2) * 5 : 0;

  return Math.max(0, Math.min(100, Math.round(base + synergy)));
}

const CHALLENGES: Challenge[] = [
  {
    id: "stuck-but-unhappy",
    title: "Stuck but Unhappy",
    description: "Get Switching Cost and Alternative Quality both above 70 at the same time.",
    hint: "Raise several cost sliders, then raise Alternative Quality without lowering them.",
    takeaway: "Lock-in doesn't require happiness — only a cost that still outweighs the pull.",
    check: (state, switchingCost) => switchingCost > 70 && state.alternativeQuality > 70,
  },
  {
    id: "clean-break",
    title: "The Clean Break",
    description: "Make Alternative Quality exceed Switching Cost — engineer an actual escape.",
    hint: "Lower a few cost sliders, or push Alternative Quality past the current Switching Cost.",
    takeaway: "The moment the pull exceeds the cost, even a loyal-looking customer leaves.",
    check: (state, switchingCost) => state.alternativeQuality > switchingCost,
  },
  {
    id: "sticky-by-design",
    title: "Sticky by Design",
    description: "Reach a Switching Cost of 80+ while keeping Contract & Financial Lock-in under 20.",
    hint: "Max out Data, Integrations, Network, and Time — leave Contract Lock-in low.",
    takeaway: "The strongest lock-in usually isn't a contract — it's data, habits, and relationships.",
    check: (state, switchingCost) => switchingCost >= 80 && state.contractLockIn < 20,
  },
];

function getExplanation(
  prev: SimulatorState,
  next: SimulatorState,
  prevEscaped: boolean,
  nextEscaped: boolean,
): string {
  if (nextEscaped !== prevEscaped) {
    return nextEscaped
      ? "The alternative just won. Its quality exceeded Switching Cost — this is the moment someone actually leaves."
      : "Back below the line — the cost of leaving once again outweighs the alternative's pull.";
  }
  if (next.dataStored !== prev.dataStored) {
    return next.dataStored > prev.dataStored
      ? "More of your history lives here now — photos, files, conversations. Leaving means losing it or migrating it by hand."
      : "Less of your data is locked in here — one less reason to stay if something better comes along.";
  }
  if (next.integrationsBuilt !== prev.integrationsBuilt) {
    return next.integrationsBuilt > prev.integrationsBuilt
      ? "Other tools now depend on this one. Untangling those connections would be its own project."
      : "Fewer dependencies means switching wouldn't break anything else you rely on.";
  }
  if (next.networkOnPlatform !== prev.networkOnPlatform) {
    return next.networkOnPlatform > prev.networkOnPlatform
      ? "More of the people you actually need are here. Leaving means losing touch with them too — not just the product."
      : "Fewer people tying you here — the network itself isn't the reason to stay anymore.";
  }
  if (next.contractLockIn !== prev.contractLockIn) {
    return next.contractLockIn > prev.contractLockIn
      ? "A contract or exit fee now makes leaving cost real money, not just effort."
      : "No contract holding you here — this cost is now entirely psychological, not financial.";
  }
  if (next.timeInvested !== prev.timeInvested) {
    return next.timeInvested > prev.timeInvested
      ? "The longer you've used this, the more habits and muscle memory you've built around it."
      : "Less history means less to unlearn if you switched.";
  }
  if (next.alternativeQuality !== prev.alternativeQuality) {
    return next.alternativeQuality > prev.alternativeQuality
      ? "The alternative looks more tempting now — but notice: Switching Cost hasn't moved. Wanting to leave and being able to are different things."
      : "The alternative looks less appealing now — even a low Switching Cost wouldn't be enough to pull you away.";
  }
  return "This is a fairly ordinary customer — some cost to leaving, some curiosity about alternatives. Move a slider to see what changes.";
}

function percentDelta(base: number, current: number): number {
  if (base === 0) return current === 0 ? 0 : 100;
  return Math.round(((current - base) / base) * 100);
}

function getInsightReason(state: SimulatorState, escaped: boolean): string {
  if (escaped) {
    return "The alternative's pull finally exceeded the cost of staying — this customer just switched.";
  }
  if (state.contractLockIn < 20 && state.dataStored + state.integrationsBuilt + state.networkOnPlatform > 180) {
    return "Almost none of this lock-in comes from a contract — it's data, integrations, and relationships doing the work.";
  }
  return "Adjust the sliders to see how each source of lock-in changes the picture.";
}

export function useSwitchingCostsSimulator() {
  const [state, setState] = React.useState<SimulatorState>(DEFAULT_STATE);
  const [baseline] = React.useState<SimulatorState>(DEFAULT_STATE);
  const [selectedExample, setSelectedExample] = React.useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = React.useState<string[]>([]);
  const prevStateRef = React.useRef<SimulatorState>(DEFAULT_STATE);
  const prevEscapedRef = React.useRef(false);

  const switchingCost = computeSwitchingCost(state);
  const escaped = state.alternativeQuality > switchingCost;
  const strainRatio = switchingCost > 0 ? state.alternativeQuality / switchingCost : 0;

  const explanation = React.useMemo(
    () => getExplanation(prevStateRef.current, state, prevEscapedRef.current, escaped),
    [state, escaped],
  );

  React.useEffect(() => {
    prevStateRef.current = state;
    prevEscapedRef.current = escaped;
  }, [state, escaped]);

  const activeChallengeIndex = Math.min(completedChallenges.length, CHALLENGES.length - 1);
  const activeChallenge = CHALLENGES[activeChallengeIndex];
  const allChallengesComplete = completedChallenges.length === CHALLENGES.length;

  React.useEffect(() => {
    if (allChallengesComplete) return;
    if (completedChallenges.includes(activeChallenge.id)) return;
    if (activeChallenge.check(state, switchingCost, baseline)) {
      setCompletedChallenges((prev) => [...prev, activeChallenge.id]);
    }
  }, [state, switchingCost, activeChallenge, completedChallenges, allChallengesComplete, baseline]);

  const insights = React.useMemo(() => {
    const dataToolsNow = (state.dataStored + state.integrationsBuilt) / 2;
    const dataToolsBase = (baseline.dataStored + baseline.integrationsBuilt) / 2;
    const peopleHabitNow = (state.networkOnPlatform + state.timeInvested) / 2;
    const peopleHabitBase = (baseline.networkOnPlatform + baseline.timeInvested) / 2;

    return {
      dataToolsDelta: percentDelta(dataToolsBase, dataToolsNow),
      peopleHabitDelta: percentDelta(peopleHabitBase, peopleHabitNow),
      contractDelta: percentDelta(baseline.contractLockIn, state.contractLockIn),
      alternativeDelta: percentDelta(baseline.alternativeQuality, state.alternativeQuality),
      reason: getInsightReason(state, escaped),
    };
  }, [state, baseline, escaped]);

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
    switchingCost,
    escaped,
    strainRatio,
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

export { DEFAULT_STATE, COST_KEYS };
