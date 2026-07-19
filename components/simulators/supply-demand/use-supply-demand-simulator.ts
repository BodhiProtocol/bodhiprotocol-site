"use client";

import * as React from "react";

export interface SupplyDemandState {
  demand: number;
  supply: number;
  marketSize: number;
}

export interface Equilibrium {
  maxQ: number;
  demandP0: number;
  supplyP0: number;
  price: number;
  quantity: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  check: (state: SupplyDemandState, equilibrium: Equilibrium, baseline: SupplyDemandState) => boolean;
}

const DEFAULT_STATE: SupplyDemandState = {
  demand: 70,
  supply: 50,
  marketSize: 100,
};

function computeEquilibrium(state: SupplyDemandState): Equilibrium {
  const maxQ = 10 + state.marketSize * 0.9;
  const demandP0 = 15 + state.demand * 1.6;
  const supplyP0 = 45 - state.supply * 0.8;

  const spread = demandP0 - supplyP0;
  const ratio = Math.max(0, Math.min(1, spread / (spread + 100)));

  return {
    maxQ,
    demandP0,
    supplyP0,
    price: Math.max(0, Math.round(demandP0 * (1 - ratio))),
    quantity: Math.max(0, Math.round(ratio * maxQ)),
  };
}

const CHALLENGES: Challenge[] = [
  {
    id: "price-squeeze",
    title: "Price Squeeze",
    description: "Reach an equilibrium price of $75 or higher.",
    check: (_state, equilibrium) => equilibrium.price >= 75,
  },
  {
    id: "buyers-market",
    title: "Buyer's Market",
    description: "Reach an equilibrium price of $25 or lower.",
    check: (_state, equilibrium) => equilibrium.price <= 25,
  },
  {
    id: "scale-up",
    title: "Scale Up",
    description: "Reach an equilibrium quantity of 65 units or higher.",
    check: (_state, equilibrium) => equilibrium.quantity >= 65,
  },
];

function getExplanation(prev: SupplyDemandState, next: SupplyDemandState): string {
  if (next.demand !== prev.demand) {
    return next.demand > prev.demand
      ? "Demand went up — buyers are willing to pay more at every quantity, so the equilibrium price rises."
      : "Demand went down — buyers pull back, so sellers have to accept a lower price to clear the market.";
  }
  if (next.supply !== prev.supply) {
    return next.supply > prev.supply
      ? "Supply went up — sellers are willing to offer more at every price, so the equilibrium price falls even as quantity traded rises."
      : "Supply went down — fewer sellers means less available at every price, pushing the equilibrium price higher.";
  }
  if (next.marketSize !== prev.marketSize) {
    return next.marketSize > prev.marketSize
      ? "The market grew — both curves stretch across more potential quantity, so more units trade at roughly the same price."
      : "The market shrank — fewer units are traded overall, though the price stays roughly where supply and demand agree.";
  }
  return "Move a slider to see how the equilibrium responds.";
}

export function useSupplyDemandSimulator() {
  const [state, setState] = React.useState<SupplyDemandState>(DEFAULT_STATE);
  const [baseline] = React.useState<SupplyDemandState>(DEFAULT_STATE);
  const [completedChallenges, setCompletedChallenges] = React.useState<string[]>([]);
  const prevStateRef = React.useRef<SupplyDemandState>(DEFAULT_STATE);

  const equilibrium = computeEquilibrium(state);

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
    if (activeChallenge.check(state, equilibrium, baseline)) {
      setCompletedChallenges((prev) => [...prev, activeChallenge.id]);
    }
  }, [state, equilibrium, activeChallenge, completedChallenges, allChallengesComplete, baseline]);

  const updateField = React.useCallback(
    <K extends keyof SupplyDemandState>(key: K, value: SupplyDemandState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const reset = React.useCallback(() => {
    setState(DEFAULT_STATE);
    setCompletedChallenges([]);
  }, []);

  return {
    state,
    equilibrium,
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
