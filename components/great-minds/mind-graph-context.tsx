"use client";

import * as React from "react";

import type { GreatMindWheelNode } from "@/types/content";

interface MindGraphContextValue {
  active: GreatMindWheelNode | null;
  setActive: (node: GreatMindWheelNode | null) => void;
}

// Default no-op context: pages that don't wrap their hero in a
// MindGraphProvider (Newton, Darwin, and any future figure that doesn't
// need reactive quote/background swapping) simply never get an active
// node, so consumers fall back to their static props with zero behavior
// change.
const MindGraphContext = React.createContext<MindGraphContextValue>({
  active: null,
  setActive: () => {},
});

function MindGraphProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = React.useState<GreatMindWheelNode | null>(null);
  const value = React.useMemo(() => ({ active, setActive }), [active]);
  return <MindGraphContext.Provider value={value}>{children}</MindGraphContext.Provider>;
}

function useMindGraph() {
  return React.useContext(MindGraphContext);
}

export { MindGraphProvider, useMindGraph };
