"use client";

import * as React from "react";

export type OrderSide = "buy" | "sell";
export type OrderFireSize = "small" | "large";

export interface SliderState {
  buyInterest: number;
  sellInterest: number;
  liquidity: number;
  orderSize: number;
}

export interface OrderBookState extends SliderState {
  orderFireSize: OrderFireSize;
  priceShift: number;
}

export interface BookLevel {
  price: number;
  size: number;
}

export interface Book {
  bidLevels: BookLevel[];
  askLevels: BookLevel[];
  midPrice: number;
  spread: number;
  bestBid: number;
  bestAsk: number;
}

export type StatusLabel =
  | "Price Discovery"
  | "Volatile Market"
  | "Very Thin Market"
  | "Heavy Buying Pressure"
  | "Heavy Selling Pressure"
  | "Healthy Liquidity";

export interface OrderImpact {
  side: OrderSide;
  size: OrderFireSize;
  levelsCleared: number;
  priceDelta: number;
}

export interface Computed {
  book: Book;
  statusLabel: StatusLabel;
  playedScenarios: string[];
  lastOrderImpact: OrderImpact | null;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  check: (state: SliderState, computed: Computed, baseline: SliderState) => boolean;
}

export interface ScenarioStep {
  sliders?: Partial<SliderState>;
  marketOrder?: { side: OrderSide; size: OrderFireSize };
  insight: string;
  holdMs: number;
}

export interface Scenario {
  id: string;
  label: string;
  steps: ScenarioStep[];
}

export interface TimelinePreset {
  label: string;
  sliders: SliderState;
}

const BASE_PRICE = 100;
const TICK = 0.05;
const LEVEL_COUNT = 6;
const HISTORY_CAP = 30;
const SHOCK_MS = 1500;
const VOLATILE_WINDOW_MS = 8000;
const VOLATILE_DECAY_MS = 4000;

// Staggered delays (ms) for a single market-order cascade, so the effects of one
// action read as one causal chain — impact, then price, then classification,
// then narration — instead of six independent widgets updating at once.
const FIRE_PHASE_PRICE_MS = 130;
const FIRE_PHASE_STATUS_MS = 280;
const FIRE_PHASE_INSIGHT_MS = 430;

const DEFAULT_STATE: OrderBookState = {
  buyInterest: 50,
  sellInterest: 50,
  liquidity: 50,
  orderSize: 50,
  orderFireSize: "small",
  priceShift: 0,
};

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function decayForLevel(index: number) {
  return Math.max(0.15, 1 - index * 0.15);
}

function computeBook(state: OrderBookState): Book {
  const liquidityFactor = 0.3 + (state.liquidity / 100) * 0.7;
  const sizeScale = 30 + (state.orderSize / 100) * 90;
  const buySkew = 0.5 + (state.buyInterest / 100) * 1;
  const sellSkew = 0.5 + (state.sellInterest / 100) * 1;

  const spreadTicks = clamp(Math.round(2 + ((100 - state.liquidity) / 100) * 8), 1, 10);
  const spread = round2(spreadTicks * TICK);

  const skew = ((state.buyInterest - state.sellInterest) / 100) * 2;
  const midPrice = round2(BASE_PRICE + state.priceShift + skew);
  const bestBid = round2(midPrice - spread / 2);
  const bestAsk = round2(midPrice + spread / 2);

  const bidLevels: BookLevel[] = [];
  const askLevels: BookLevel[] = [];
  for (let i = 0; i < LEVEL_COUNT; i++) {
    const decay = decayForLevel(i);
    bidLevels.push({
      price: round2(bestBid - i * TICK),
      size: Math.round(sizeScale * liquidityFactor * decay * buySkew),
    });
    askLevels.push({
      price: round2(bestAsk + i * TICK),
      size: Math.round(sizeScale * liquidityFactor * decay * sellSkew),
    });
  }

  return { bidLevels, askLevels, midPrice, spread, bestBid, bestAsk };
}

function fireSizeUnits(orderSize: number, size: OrderFireSize) {
  return size === "small" ? 40 + (orderSize / 100) * 60 : 220 + (orderSize / 100) * 380;
}

function consumeLevels(levels: BookLevel[], units: number) {
  let remaining = units;
  let levelsCleared = 0;
  for (const level of levels) {
    if (remaining <= 0) break;
    if (level.size <= remaining) {
      remaining -= level.size;
      levelsCleared++;
    } else {
      break;
    }
  }
  return levelsCleared;
}

function buildEventExplanation(side: OrderSide, levelsCleared: number) {
  if (levelsCleared === 0) {
    return side === "buy"
      ? "That buy order got filled without moving price — there was enough liquidity waiting."
      : "That sell order got filled without moving price — there was enough liquidity waiting.";
  }
  const levelWord = levelsCleared > 1 ? "levels" : "level";
  return side === "buy"
    ? `That buy order swept through ${levelsCleared} price ${levelWord} — sellers near the old price ran out, so the market had to move higher to find new ones.`
    : `That sell order swept through ${levelsCleared} price ${levelWord} — buyers near the old price ran out, so the market had to move lower to find new ones.`;
}

function getStatusLabel(
  state: SliderState,
  shockActive: boolean,
  volatile: boolean,
): StatusLabel {
  if (shockActive) return "Price Discovery";
  if (volatile) return "Volatile Market";
  if (state.liquidity < 25) return "Very Thin Market";
  const imbalance = state.buyInterest - state.sellInterest;
  if (imbalance > 35) return "Heavy Buying Pressure";
  if (imbalance < -35) return "Heavy Selling Pressure";
  return "Healthy Liquidity";
}

function getExplanation(prev: SliderState, next: SliderState): string {
  if (next.buyInterest !== prev.buyInterest) {
    return next.buyInterest > prev.buyInterest
      ? "More buyers are bidding — the bid wall grows and price tilts upward to meet them."
      : "Buyers are pulling back — the bid wall thins and price tilts lower.";
  }
  if (next.sellInterest !== prev.sellInterest) {
    return next.sellInterest > prev.sellInterest
      ? "More sellers are offering — the ask wall grows and price tilts downward to meet them."
      : "Sellers are pulling back — the ask wall thins and price tilts higher.";
  }
  if (next.liquidity !== prev.liquidity) {
    return next.liquidity > prev.liquidity
      ? "Liquidity is deepening — both walls thicken and the spread narrows. Big orders will move price less now."
      : "Liquidity is drying up — both walls thin out and the spread widens. Even small orders will move price more.";
  }
  if (next.orderSize !== prev.orderSize) {
    return next.orderSize > prev.orderSize
      ? "Typical order size just grew — each resting order on the book now represents more shares."
      : "Typical order size just shrank — each resting order on the book now represents fewer shares.";
  }
  return "Buyers and sellers are currently in balance. Neither side has enough pressure to move the price.";
}

const CHALLENGES: Challenge[] = [
  {
    id: "price-up-five",
    title: "Buy It Higher",
    description: "Move the price up $5 using only market buy orders — don't touch the interest sliders.",
    check: (state, computed, baseline) =>
      state.buyInterest === baseline.buyInterest &&
      state.sellInterest === baseline.sellInterest &&
      computed.book.midPrice - BASE_PRICE >= 5,
  },
  {
    id: "balanced-market",
    title: "Find Equilibrium",
    description: "Reach a Healthy Liquidity status with buyers and sellers in balance.",
    check: (_state, computed) => computed.statusLabel === "Healthy Liquidity",
  },
  {
    id: "flash-crash",
    title: "Trigger a Flash Crash",
    description: "Play the Flash Crash market scenario and watch the book react.",
    check: (_state, computed) => computed.playedScenarios.includes("flash-crash"),
  },
  {
    id: "tight-spread",
    title: "Squeeze the Spread",
    description: "Pull the spread below $0.15 by maximizing liquidity.",
    check: (_state, computed) => computed.book.spread <= 0.15,
  },
  {
    id: "absorb-large-sell",
    title: "Absorb the Shock",
    description: "Fire a Large market sell order while keeping the price drop under $1 — that's what deep liquidity buys you.",
    check: (_state, computed) =>
      computed.lastOrderImpact !== null &&
      computed.lastOrderImpact.side === "sell" &&
      computed.lastOrderImpact.size === "large" &&
      Math.abs(computed.lastOrderImpact.priceDelta) < 1,
  },
];

const SCENARIOS: Scenario[] = [
  {
    id: "balanced-market",
    label: "Balanced Market",
    steps: [
      {
        sliders: { buyInterest: 50, sellInterest: 50, liquidity: 60 },
        insight: "Balanced. Neither buyers nor sellers dominate.",
        holdMs: 2200,
      },
      {
        insight: "This is what a healthy, liquid market looks like at rest.",
        holdMs: 1800,
      },
    ],
  },
  {
    id: "buying-frenzy",
    label: "Buying Frenzy",
    steps: [
      {
        sliders: { buyInterest: 85, sellInterest: 30 },
        insight: "Buyers are piling in — the bid wall is building fast.",
        holdMs: 1800,
      },
      {
        marketOrder: { side: "buy", size: "large" },
        insight: "A large buyer just swept the book — notice how far price had to move to find new sellers.",
        holdMs: 2400,
      },
    ],
  },
  {
    id: "panic-selling",
    label: "Panic Selling",
    steps: [
      {
        sliders: { buyInterest: 25, sellInterest: 90 },
        insight: "Sellers are rushing for the exit.",
        holdMs: 1800,
      },
      {
        marketOrder: { side: "sell", size: "large" },
        insight: "Panic selling hits a thin bid side — price drops fast because there's no one left to sell to.",
        holdMs: 2400,
      },
    ],
  },
  {
    id: "low-liquidity",
    label: "Low Liquidity",
    steps: [
      {
        sliders: { liquidity: 10, buyInterest: 50, sellInterest: 50 },
        insight: "Liquidity just dried up — the walls are thin.",
        holdMs: 2000,
      },
      {
        marketOrder: { side: "buy", size: "small" },
        insight: "Even a small order moves price a lot when there's nothing standing in the way.",
        holdMs: 2200,
      },
    ],
  },
  {
    id: "flash-crash",
    label: "Flash Crash",
    steps: [
      {
        sliders: { liquidity: 15, buyInterest: 40, sellInterest: 60 },
        insight: "A quiet, thin market — the calm before the storm.",
        holdMs: 1600,
      },
      {
        marketOrder: { side: "sell", size: "large" },
        insight: "One large sell order sweeps every buyer in sight.",
        holdMs: 1800,
      },
      {
        marketOrder: { side: "sell", size: "large" },
        insight: "This is a flash crash: thin liquidity plus big orders equals a price collapse in seconds.",
        holdMs: 2400,
      },
    ],
  },
  {
    id: "earnings-announcement",
    label: "Earnings Announcement",
    steps: [
      {
        sliders: { liquidity: 70, buyInterest: 75, sellInterest: 75 },
        insight: "Earnings just dropped — everyone wants to trade, on both sides.",
        holdMs: 1800,
      },
      {
        marketOrder: { side: "buy", size: "large" },
        insight: "Buyers move first...",
        holdMs: 1400,
      },
      {
        marketOrder: { side: "sell", size: "large" },
        insight: "...then sellers react just as fast. Big news means big volume on both sides — that's volatility.",
        holdMs: 2400,
      },
    ],
  },
];

const TIMELINE_PRESETS: TimelinePreset[] = [
  { label: "Market Open", sliders: { buyInterest: 65, sellInterest: 60, liquidity: 30, orderSize: 60 } },
  { label: "Morning", sliders: { buyInterest: 55, sellInterest: 50, liquidity: 55, orderSize: 50 } },
  { label: "Lunch", sliders: { buyInterest: 40, sellInterest: 40, liquidity: 25, orderSize: 35 } },
  { label: "Closing Hour", sliders: { buyInterest: 60, sellInterest: 65, liquidity: 75, orderSize: 70 } },
];

function reducedMotionPreferred() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useOrderBookSimulator() {
  const [state, setState] = React.useState<OrderBookState>(DEFAULT_STATE);
  const [baseline] = React.useState<SliderState>(DEFAULT_STATE);
  const [completedChallenges, setCompletedChallenges] = React.useState<string[]>([]);
  const [playedScenarios, setPlayedScenarios] = React.useState<string[]>([]);
  const [playingScenarioId, setPlayingScenarioId] = React.useState<string | null>(null);
  const [scenarioInsight, setScenarioInsight] = React.useState<string | null>(null);
  const [lastEventExplanation, setLastEventExplanation] = React.useState<string | null>(null);
  const [lastOrderImpact, setLastOrderImpact] = React.useState<OrderImpact | null>(null);
  const [shockActive, setShockActive] = React.useState(false);
  const [volatile, setVolatile] = React.useState(false);
  const [priceHistory, setPriceHistory] = React.useState<number[]>([BASE_PRICE]);
  const [timelineLabel, setTimelineLabel] = React.useState<string | null>(null);

  const prevStateRef = React.useRef<SliderState>(DEFAULT_STATE);
  const stateRef = React.useRef<OrderBookState>(state);
  stateRef.current = state;
  const shockTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const volatileTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastFireAtRef = React.useRef<number | null>(null);
  const scenarioTimeoutsRef = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const runIdRef = React.useRef(0);
  const fireTimeoutsRef = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const fireRunIdRef = React.useRef(0);

  const book = React.useMemo(() => computeBook(state), [state]);
  const statusLabel = getStatusLabel(state, shockActive, volatile);

  const computed: Computed = {
    book,
    statusLabel,
    playedScenarios,
    lastOrderImpact,
  };

  const activeChallengeIndex = Math.min(completedChallenges.length, CHALLENGES.length - 1);
  const activeChallenge = CHALLENGES[activeChallengeIndex];
  const allChallengesComplete = completedChallenges.length === CHALLENGES.length;

  React.useEffect(() => {
    if (allChallengesComplete) return;
    if (completedChallenges.includes(activeChallenge.id)) return;
    if (activeChallenge.check(state, computed, baseline)) {
      setCompletedChallenges((prev) => [...prev, activeChallenge.id]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, book, statusLabel, playedScenarios, lastOrderImpact, activeChallenge, completedChallenges, allChallengesComplete, baseline]);

  React.useEffect(() => {
    if (
      state.buyInterest !== prevStateRef.current.buyInterest ||
      state.sellInterest !== prevStateRef.current.sellInterest ||
      state.liquidity !== prevStateRef.current.liquidity ||
      state.orderSize !== prevStateRef.current.orderSize
    ) {
      setLastEventExplanation(null);
    }
    prevStateRef.current = state;
  }, [state]);

  React.useEffect(() => {
    return () => {
      if (shockTimeoutRef.current) clearTimeout(shockTimeoutRef.current);
      if (volatileTimeoutRef.current) clearTimeout(volatileTimeoutRef.current);
      scenarioTimeoutsRef.current.forEach(clearTimeout);
      fireTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const fireMarketOrder = React.useCallback(
    (side: OrderSide, size: OrderFireSize) => {
      const current = stateRef.current;
      const currentBook = computeBook(current);
      const levels = side === "buy" ? currentBook.askLevels : currentBook.bidLevels;
      const units = fireSizeUnits(current.orderSize, size);
      const levelsCleared = consumeLevels(levels, units);
      const priceDelta = round2(levelsCleared * TICK * (side === "buy" ? 1 : -1));
      const nextPriceShift = round2(current.priceShift + priceDelta);

      fireTimeoutsRef.current.forEach(clearTimeout);
      fireTimeoutsRef.current = [];
      fireRunIdRef.current += 1;
      const runId = fireRunIdRef.current;

      const now = performance.now();
      const isVolatile = lastFireAtRef.current !== null && now - lastFireAtRef.current < VOLATILE_WINDOW_MS;
      lastFireAtRef.current = now;

      const reduced = reducedMotionPreferred();
      const schedule = (fn: () => void, delayMs: number) => {
        if (reduced) {
          fn();
          return;
        }
        const timeout = setTimeout(() => {
          if (fireRunIdRef.current !== runId) return;
          fn();
        }, delayMs);
        fireTimeoutsRef.current.push(timeout);
      };

      // Phase 1 (immediate) — the cause becomes visible: the hit levels register.
      setLastOrderImpact({ side, size, levelsCleared, priceDelta });
      setPriceHistory((history) => {
        const next = [...history, round2(BASE_PRICE + nextPriceShift)];
        return next.length > HISTORY_CAP ? next.slice(next.length - HISTORY_CAP) : next;
      });

      // Phase 2 — the book reflows to the new price.
      schedule(() => {
        setState((prev) => ({ ...prev, priceShift: nextPriceShift }));
      }, FIRE_PHASE_PRICE_MS);

      // Phase 3 — the market classifies what just happened.
      schedule(() => {
        if (shockTimeoutRef.current) clearTimeout(shockTimeoutRef.current);
        setShockActive(true);
        shockTimeoutRef.current = setTimeout(() => setShockActive(false), SHOCK_MS);
        if (isVolatile) {
          if (volatileTimeoutRef.current) clearTimeout(volatileTimeoutRef.current);
          setVolatile(true);
          volatileTimeoutRef.current = setTimeout(() => setVolatile(false), VOLATILE_DECAY_MS);
        }
      }, FIRE_PHASE_STATUS_MS);

      // Phase 4 — Bodhi Insight narrates the outcome last.
      schedule(() => {
        setLastEventExplanation(buildEventExplanation(side, levelsCleared));
      }, FIRE_PHASE_INSIGHT_MS);
    },
    [],
  );

  const updateField = React.useCallback(
    <K extends keyof SliderState>(key: K, value: SliderState[K]) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const setOrderFireSize = React.useCallback((size: OrderFireSize) => {
    setState((prev) => ({ ...prev, orderFireSize: size }));
  }, []);

  const playScenario = React.useCallback((scenarioId: string) => {
    const scenario = SCENARIOS.find((entry) => entry.id === scenarioId);
    if (!scenario) return;

    scenarioTimeoutsRef.current.forEach(clearTimeout);
    scenarioTimeoutsRef.current = [];
    runIdRef.current += 1;
    const runId = runIdRef.current;
    fireTimeoutsRef.current.forEach(clearTimeout);
    fireTimeoutsRef.current = [];
    fireRunIdRef.current += 1;

    setState((prev) => ({ ...prev, priceShift: 0 }));
    setLastOrderImpact(null);
    setShockActive(false);
    setPlayingScenarioId(scenarioId);

    if (reducedMotionPreferred()) {
      const lastStep = scenario.steps[scenario.steps.length - 1];
      scenario.steps.forEach((step) => {
        if (step.sliders) setState((prev) => ({ ...prev, ...step.sliders }));
        if (step.marketOrder) fireMarketOrder(step.marketOrder.side, step.marketOrder.size);
      });
      setScenarioInsight(lastStep.insight);
      setPlayingScenarioId(null);
      setPlayedScenarios((prev) => (prev.includes(scenarioId) ? prev : [...prev, scenarioId]));
      return;
    }

    let elapsed = 0;
    scenario.steps.forEach((step) => {
      const timeout = setTimeout(() => {
        if (runIdRef.current !== runId) return;
        if (step.sliders) setState((prev) => ({ ...prev, ...step.sliders }));
        if (step.marketOrder) fireMarketOrder(step.marketOrder.side, step.marketOrder.size);
        setScenarioInsight(step.insight);
      }, elapsed);
      scenarioTimeoutsRef.current.push(timeout);
      elapsed += step.holdMs;
    });

    const finishTimeout = setTimeout(() => {
      if (runIdRef.current !== runId) return;
      setPlayingScenarioId(null);
      setPlayedScenarios((prev) => (prev.includes(scenarioId) ? prev : [...prev, scenarioId]));
    }, elapsed);
    scenarioTimeoutsRef.current.push(finishTimeout);
  }, [fireMarketOrder]);

  const applyTimelinePreset = React.useCallback((label: string) => {
    const preset = TIMELINE_PRESETS.find((entry) => entry.label === label);
    if (!preset) return;
    setState((prev) => ({ ...prev, ...preset.sliders, priceShift: 0 }));
    setLastOrderImpact(null);
    setTimelineLabel(label);
  }, []);

  const explanation = scenarioInsight ?? lastEventExplanation ?? getExplanation(prevStateRef.current, state);

  const reset = React.useCallback(() => {
    scenarioTimeoutsRef.current.forEach(clearTimeout);
    scenarioTimeoutsRef.current = [];
    runIdRef.current += 1;
    fireTimeoutsRef.current.forEach(clearTimeout);
    fireTimeoutsRef.current = [];
    fireRunIdRef.current += 1;
    if (shockTimeoutRef.current) clearTimeout(shockTimeoutRef.current);
    if (volatileTimeoutRef.current) clearTimeout(volatileTimeoutRef.current);
    setState(DEFAULT_STATE);
    setCompletedChallenges([]);
    setPlayedScenarios([]);
    setPlayingScenarioId(null);
    setScenarioInsight(null);
    setLastEventExplanation(null);
    setLastOrderImpact(null);
    setShockActive(false);
    setVolatile(false);
    setPriceHistory([BASE_PRICE]);
    setTimelineLabel(null);
  }, []);

  return {
    state,
    baseline,
    book,
    statusLabel,
    explanation,
    challenges: CHALLENGES,
    activeChallengeIndex,
    completedChallenges,
    allChallengesComplete,
    scenarios: SCENARIOS,
    playingScenarioId,
    playedScenarios,
    lastOrderImpact,
    priceHistory,
    timelinePresets: TIMELINE_PRESETS,
    timelineLabel,
    updateField,
    setOrderFireSize,
    fireMarketOrder,
    playScenario,
    applyTimelinePreset,
    reset,
  };
}

export { DEFAULT_STATE, BASE_PRICE, TICK };
