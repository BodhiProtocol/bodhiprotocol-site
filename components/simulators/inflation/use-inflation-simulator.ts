"use client";

import * as React from "react";

export interface InflationState {
  interestRate: number;
  moneySupply: number;
  productivity: number;
}

export interface Indicators {
  inflation: number;
  gdpGrowth: number;
  unemployment: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  check: (state: InflationState, indicators: Indicators, baseline: InflationState) => boolean;
}

const DEFAULT_STATE: InflationState = {
  interestRate: 4,
  moneySupply: 100,
  productivity: 100,
};

const HISTORY_CAP = 24;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function computeIndicators(state: InflationState): Indicators {
  const deltaRate = state.interestRate - 4;
  const deltaMoney = state.moneySupply - 100;
  const deltaProd = state.productivity - 100;

  const inflation = clamp(2 + deltaMoney * 0.13 - deltaRate * 0.5 - deltaProd * 0.02, 0, 20);
  const gdpGrowth = clamp(2.5 - deltaRate * 0.35 + deltaMoney * 0.015 + deltaProd * 0.03, -5, 10);
  const unemployment = clamp(4.5 + deltaRate * 0.3 - deltaMoney * 0.015 - deltaProd * 0.03, 1, 20);

  return {
    inflation: Math.round(inflation * 10) / 10,
    gdpGrowth: Math.round(gdpGrowth * 10) / 10,
    unemployment: Math.round(unemployment * 10) / 10,
  };
}

const CHALLENGES: Challenge[] = [
  {
    id: "cool-it-down",
    title: "Cool It Down",
    description: "Bring inflation below 2%.",
    check: (_state, indicators) => indicators.inflation < 2,
  },
  {
    id: "soft-landing",
    title: "Soft Landing",
    description: "Reach 3%+ GDP growth while keeping inflation at 4% or below.",
    check: (_state, indicators) => indicators.gdpGrowth >= 3 && indicators.inflation <= 4,
  },
  {
    id: "boom-without-bust",
    title: "Boom Without Bust",
    description: "Reach 6%+ GDP growth while keeping unemployment at 5% or below.",
    check: (_state, indicators) => indicators.gdpGrowth >= 6 && indicators.unemployment <= 5,
  },
];

function getExplanation(prev: InflationState, next: InflationState): string {
  if (next.interestRate !== prev.interestRate) {
    return next.interestRate > prev.interestRate
      ? "Higher interest rates make borrowing more expensive — that cools inflation, but growth slows and unemployment tends to rise."
      : "Lower interest rates make borrowing cheaper — that boosts growth, but can let inflation creep back up.";
  }
  if (next.moneySupply !== prev.moneySupply) {
    return next.moneySupply > prev.moneySupply
      ? "More money in the economy means more spending — inflation and growth both tend to rise as more money chases the same goods."
      : "Less money in the economy cools spending — inflation eases, but so does growth.";
  }
  if (next.productivity !== prev.productivity) {
    return next.productivity > prev.productivity
      ? "Higher productivity means the economy produces more without needing more money — growth rises and inflation actually falls."
      : "Lower productivity means the same money now chases fewer goods — inflation creeps up even without any change in spending.";
  }
  return "Move a slider to see how the economy responds.";
}

export function useInflationSimulator() {
  const [state, setState] = React.useState<InflationState>(DEFAULT_STATE);
  const [baseline] = React.useState<InflationState>(DEFAULT_STATE);
  const [completedChallenges, setCompletedChallenges] = React.useState<string[]>([]);
  const prevStateRef = React.useRef<InflationState>(DEFAULT_STATE);

  const indicators = computeIndicators(state);

  const [history, setHistory] = React.useState<Indicators[]>(() => [computeIndicators(DEFAULT_STATE)]);
  const lastRecordedRef = React.useRef<Indicators>(computeIndicators(DEFAULT_STATE));

  React.useEffect(() => {
    const last = lastRecordedRef.current;
    if (
      last.inflation === indicators.inflation &&
      last.gdpGrowth === indicators.gdpGrowth &&
      last.unemployment === indicators.unemployment
    ) {
      return;
    }
    lastRecordedRef.current = indicators;
    setHistory((prev) => {
      const next = [...prev, indicators];
      return next.length > HISTORY_CAP ? next.slice(next.length - HISTORY_CAP) : next;
    });
  }, [indicators]);

  const explanation = React.useMemo(() => getExplanation(prevStateRef.current, state), [state]);

  React.useEffect(() => {
    prevStateRef.current = state;
  }, [state]);

  const activeChallengeIndex = Math.min(completedChallenges.length, CHALLENGES.length - 1);
  const activeChallenge = CHALLENGES[activeChallengeIndex];
  const allChallengesComplete = completedChallenges.length === CHALLENGES.length;

  React.useEffect(() => {
    if (allChallengesComplete) return;
    if (completedChallenges.includes(activeChallenge.id)) return;
    if (activeChallenge.check(state, indicators, baseline)) {
      setCompletedChallenges((prev) => [...prev, activeChallenge.id]);
    }
  }, [state, indicators, activeChallenge, completedChallenges, allChallengesComplete, baseline]);

  const updateField = React.useCallback(
    <K extends keyof InflationState>(key: K, value: InflationState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const reset = React.useCallback(() => {
    setState(DEFAULT_STATE);
    setCompletedChallenges([]);
    setHistory([computeIndicators(DEFAULT_STATE)]);
  }, []);

  return {
    state,
    indicators,
    history,
    explanation,
    challenges: CHALLENGES,
    activeChallengeIndex,
    completedChallenges,
    allChallengesComplete,
    updateField,
    reset,
  };
}

export { DEFAULT_STATE };
