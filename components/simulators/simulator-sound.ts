type SimulatorSoundEvent = "challenge-complete" | "milestone";

/**
 * Inert extension point — no audio is implemented yet. Wiring the call sites
 * in now (challenge completion, tier milestones) means a real sound engine
 * can be dropped in later without touching every simulator again.
 */
function playSimulatorSound(event: SimulatorSoundEvent) {
  if (process.env.NODE_ENV !== "production") {
    console.debug(`[simulator-sound] ${event}`);
  }
}

export { playSimulatorSound };
export type { SimulatorSoundEvent };
