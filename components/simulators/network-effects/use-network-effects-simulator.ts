"use client";

import * as React from "react";

export type NetworkMode = "positive" | "negative";

export interface SimulatorState {
  users: number;
  growthRate: number;
  engagement: number;
  businesses: number;
  developers: number;
  mode: NetworkMode;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  check: (state: SimulatorState, platformValue: number, baseline: SimulatorState) => boolean;
}

export interface TimelinePreset {
  year: number;
  state: Omit<SimulatorState, "mode">;
}

const USERS_MIN = 100;
const USERS_MAX = 100000;
const BUSINESSES_MAX = 300;
const DEVELOPERS_MAX = 150;
const CONGESTION_THRESHOLD = 0.55;

const DEFAULT_STATE: SimulatorState = {
  users: 100,
  growthRate: 50,
  engagement: 70,
  businesses: 2,
  developers: 1,
  mode: "positive",
};

const TIMELINE_PRESETS: TimelinePreset[] = [
  { year: 2010, state: { users: 500, businesses: 5, developers: 2, growthRate: 40, engagement: 55 } },
  { year: 2013, state: { users: 5000, businesses: 40, developers: 15, growthRate: 55, engagement: 62 } },
  { year: 2016, state: { users: 20000, businesses: 120, developers: 45, growthRate: 65, engagement: 70 } },
  { year: 2020, state: { users: 60000, businesses: 220, developers: 90, growthRate: 75, engagement: 78 } },
  { year: 2025, state: { users: 100000, businesses: 300, developers: 150, growthRate: 80, engagement: 85 } },
];

function usersNormalized(users: number) {
  const logMin = Math.log10(USERS_MIN);
  const logMax = Math.log10(USERS_MAX);
  const logUsers = Math.log10(Math.max(users, USERS_MIN));
  return (logUsers - logMin) / (logMax - logMin);
}

function computePlatformValue(state: SimulatorState): number {
  const normalizedUsers = usersNormalized(state.users);
  const base = 0.05 + 0.55 * normalizedUsers;

  const businessesNormalized = Math.min(state.businesses / BUSINESSES_MAX, 1);
  const developersNormalized = Math.min(state.developers / DEVELOPERS_MAX, 1);
  const ecosystemMultiplier = 1 + businessesNormalized * 0.6 + developersNormalized * 0.6;

  const engagementMultiplier = 0.6 + (state.engagement / 100) * 0.6;
  const growthMultiplier = 0.85 + (state.growthRate / 100) * 0.3;

  let raw = base * ecosystemMultiplier * engagementMultiplier * growthMultiplier * 195;

  if (state.mode === "negative" && normalizedUsers > CONGESTION_THRESHOLD) {
    const overshoot = (normalizedUsers - CONGESTION_THRESHOLD) / (1 - CONGESTION_THRESHOLD);
    const penalty = Math.max(1 - overshoot * 0.9, 0.1);
    raw *= penalty;
  }

  return Math.max(0, Math.min(100, Math.round(raw)));
}

function isCongested(state: SimulatorState): boolean {
  return state.mode === "negative" && usersNormalized(state.users) > CONGESTION_THRESHOLD;
}

const CHALLENGES: Challenge[] = [
  {
    id: "no-growth-rate",
    title: "The Quiet Climb",
    description: "Reach a Platform Value of 60 or higher without increasing Growth Rate.",
    check: (state, value, baseline) => value >= 60 && state.growthRate <= baseline.growthRate,
  },
  {
    id: "congestion",
    title: "Too Much of a Good Thing",
    description: "Switch to Negative mode and grow Users past 20,000 to trigger congestion.",
    check: (state) => state.mode === "negative" && state.users >= 20000,
  },
  {
    id: "lean-ecosystem",
    title: "Quality Over Quantity",
    description: "Reach a Platform Value of 90 or higher while keeping Users under 5,000.",
    check: (state, value) => value >= 90 && state.users < 5000,
  },
];

function getExplanation(prev: SimulatorState, next: SimulatorState, prevValue: number, nextValue: number): string {
  if (next.mode !== prev.mode) {
    return next.mode === "negative"
      ? "Notice what happens in Negative mode: past a certain point, more users doesn't mean more value. Spam and congestion can make a platform worse, not better."
      : "Back to Positive mode — here, more users almost always means more value, because every new person creates new possible connections.";
  }
  if (next.users !== prev.users) {
    return next.users > prev.users
      ? "Interesting... more people means more possible connections. The platform gets more useful for everyone already on it — that's why WhatsApp and LinkedIn grew the way they did."
      : "Fewer users means fewer possible connections — the network shrinks, and so does its value.";
  }
  if (next.businesses !== prev.businesses) {
    return next.businesses > prev.businesses
      ? "More businesses joined, giving users more reasons to stay — and developers a bigger audience to build for."
      : "Fewer businesses means fewer reasons for users to stay, which slows everything else down.";
  }
  if (next.developers !== prev.developers) {
    return next.developers > prev.developers
      ? "More developers means more tools and improvements — the platform itself gets better, which attracts even more users."
      : "Fewer developers means slower improvement — the platform's edge dulls over time.";
  }
  if (next.engagement !== prev.engagement) {
    return next.engagement > prev.engagement
      ? "Higher engagement means each connection is worth more — an active network is a valuable network."
      : "Lower engagement weakens every connection in the network, even if the user count stays the same.";
  }
  if (next.growthRate !== prev.growthRate) {
    return next.growthRate > prev.growthRate
      ? "A faster growth rate just gets you there sooner — the real value still comes from users, businesses, developers, and engagement."
      : "A slower growth rate just means it takes longer — it doesn't cap how valuable the network can eventually become.";
  }
  if (nextValue > prevValue + 5) {
    return "Notice what happened: value didn't increase in a straight line — it accelerated. Small changes early, bigger changes later. That's what network effects feel like.";
  }
  return "This network is just getting started — a small group of users, testing whether it's worth staying for. Value is still low because there aren't many people to connect with yet.";
}

function percentDelta(base: number, current: number): number {
  if (base === 0) return current === 0 ? 0 : 100;
  return Math.round(((current - base) / base) * 100);
}

function getInsightReason(state: SimulatorState, congested: boolean): string {
  if (congested) {
    return "Too many users without enough supporting engagement created congestion — the platform grew crowded before it grew valuable.";
  }
  if (state.businesses > DEFAULT_STATE.businesses && state.developers > DEFAULT_STATE.developers) {
    return "More users attracted more businesses. Businesses attracted more developers. Developers improved the platform. The flywheel accelerated.";
  }
  if (state.users > DEFAULT_STATE.users) {
    return "More users created more opportunities to connect — and platform value followed.";
  }
  return "Adjust the sliders to see how the ecosystem responds.";
}

export function useNetworkEffectsSimulator() {
  const [state, setState] = React.useState<SimulatorState>(DEFAULT_STATE);
  const [baseline] = React.useState<SimulatorState>(DEFAULT_STATE);
  const [selectedExample, setSelectedExample] = React.useState<string | null>(null);
  const [completedChallenges, setCompletedChallenges] = React.useState<string[]>([]);
  const [timelineYear, setTimelineYear] = React.useState<number | null>(null);
  const prevStateRef = React.useRef<SimulatorState>(DEFAULT_STATE);
  const prevValueRef = React.useRef<number>(computePlatformValue(DEFAULT_STATE));

  const platformValue = computePlatformValue(state);
  const congested = isCongested(state);

  const explanation = React.useMemo(
    () => getExplanation(prevStateRef.current, state, prevValueRef.current, platformValue),
    [state, platformValue],
  );

  React.useEffect(() => {
    prevStateRef.current = state;
    prevValueRef.current = platformValue;
  }, [state, platformValue]);

  const activeChallengeIndex = Math.min(completedChallenges.length, CHALLENGES.length - 1);
  const activeChallenge = CHALLENGES[activeChallengeIndex];
  const allChallengesComplete = completedChallenges.length === CHALLENGES.length;

  React.useEffect(() => {
    if (allChallengesComplete) return;
    if (completedChallenges.includes(activeChallenge.id)) return;
    if (activeChallenge.check(state, platformValue, baseline)) {
      setCompletedChallenges((prev) => [...prev, activeChallenge.id]);
    }
  }, [state, platformValue, activeChallenge, completedChallenges, allChallengesComplete, baseline]);

  const insights = React.useMemo(
    () => ({
      usersDelta: percentDelta(baseline.users, state.users),
      businessesDelta: percentDelta(baseline.businesses, state.businesses),
      developersDelta: percentDelta(baseline.developers, state.developers),
      platformValueDelta: percentDelta(computePlatformValue(baseline), platformValue),
      reason: getInsightReason(state, congested),
    }),
    [state, platformValue, baseline, congested],
  );

  const updateField = React.useCallback(<K extends keyof SimulatorState>(key: K, value: SimulatorState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const applyTimelineYear = React.useCallback((year: number) => {
    const preset = TIMELINE_PRESETS.find((entry) => entry.year === year);
    if (!preset) return;
    setState((prev) => ({ ...prev, ...preset.state }));
    setTimelineYear(year);
  }, []);

  const reset = React.useCallback(() => {
    setState(DEFAULT_STATE);
    setSelectedExample(null);
    setCompletedChallenges([]);
    setTimelineYear(null);
  }, []);

  return {
    state,
    baseline,
    platformValue,
    congested,
    explanation,
    insights,
    challenges: CHALLENGES,
    activeChallengeIndex,
    completedChallenges,
    allChallengesComplete,
    timelinePresets: TIMELINE_PRESETS,
    timelineYear,
    selectedExample,
    setSelectedExample,
    updateField,
    applyTimelineYear,
    reset,
  };
}

export { DEFAULT_STATE, USERS_MIN, USERS_MAX, BUSINESSES_MAX, DEVELOPERS_MAX, TIMELINE_PRESETS };
