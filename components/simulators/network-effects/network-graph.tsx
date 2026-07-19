"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";
import type { NetworkMode } from "@/components/simulators/network-effects/use-network-effects-simulator";
import { cn } from "@/lib/utils";

interface NetworkGraphProps {
  users: number;
  mode: NetworkMode;
  congested: boolean;
  className?: string;
}

const MIN_NODES = 12;
const MAX_NODES = 120;
const USERS_MIN = 100;
const USERS_MAX = 100000;

interface NodePoint {
  id: number;
  x: number;
  y: number;
}

interface Connection {
  from: number;
  to: number;
}

function nodeCountForUsers(users: number) {
  const logMin = Math.log10(USERS_MIN);
  const logMax = Math.log10(USERS_MAX);
  const t = (Math.log10(Math.max(users, USERS_MIN)) - logMin) / (logMax - logMin);
  return Math.round(MIN_NODES + t * (MAX_NODES - MIN_NODES));
}

function computeNodePositions(count: number): NodePoint[] {
  const points: NodePoint[] = [];
  const center = 50;
  const goldenAngle = 137.5 * (Math.PI / 180);
  const maxRadius = 44;
  for (let i = 0; i < count; i++) {
    const t = count <= 1 ? 0 : i / (count - 1);
    const radius = maxRadius * Math.sqrt(t);
    const angle = i * goldenAngle;
    // Rounded to a fixed precision: Math.cos/sin can differ by a few ULPs between
    // server (Node) and client (browser) V8 builds, which fails SSR hydration checks
    // on the rendered SVG coordinates otherwise.
    points.push({
      id: i,
      x: Math.round((center + radius * Math.cos(angle)) * 1000) / 1000,
      y: Math.round((center + radius * Math.sin(angle)) * 1000) / 1000,
    });
  }
  return points;
}

function computeConnections(points: NodePoint[], neighborsPerNode: number): Connection[] {
  const connections: Connection[] = [];
  const seen = new Set<string>();
  for (const point of points) {
    const nearest = points
      .filter((other) => other.id !== point.id)
      .map((other) => ({ id: other.id, distance: Math.hypot(other.x - point.x, other.y - point.y) }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, neighborsPerNode);

    for (const neighbor of nearest) {
      const key = [point.id, neighbor.id].sort((a, b) => a - b).join("-");
      if (seen.has(key)) continue;
      seen.add(key);
      connections.push({ from: point.id, to: neighbor.id });
    }
  }
  return connections;
}

function NetworkGraph({ users, mode, congested, className }: NetworkGraphProps) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const nodeCount = nodeCountForUsers(users);
  const density = (nodeCount - MIN_NODES) / (MAX_NODES - MIN_NODES);
  const neighborsPerNode = congested ? 2 : Math.round(2 + density * 2);

  const points = React.useMemo(() => computeNodePositions(nodeCount), [nodeCount]);
  const connections = React.useMemo(
    () => computeConnections(points, neighborsPerNode),
    [points, neighborsPerNode],
  );

  return (
    <div ref={ref} className={cn("relative aspect-square w-full", className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
        <AnimatePresence>
          {connections.map((connection) => {
            const from = points[connection.from];
            const to = points[connection.to];
            return (
              <motion.line
                key={`${connection.from}-${connection.to}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                initial={{ opacity: 0 }}
                animate={{ opacity: played ? (congested ? 0.12 : 0.35) : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.4 }}
                stroke={congested ? "var(--color-muted-foreground)" : "var(--color-brand)"}
                strokeWidth={congested ? 0.2 : 0.35}
              />
            );
          })}
        </AnimatePresence>
      </svg>

      <AnimatePresence>
        {points.map((point) => (
          <motion.div
            key={point.id}
            layout
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: played ? (congested ? 0.55 : 0.9) : 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{ duration: reducedMotion ? 0 : 0.5, ease: "easeOut" }}
            className={cn(
              "absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-2.5",
              congested ? "bg-destructive" : "bg-brand shadow-[0_0_6px_var(--color-brand)]",
            )}
          />
        ))}
      </AnimatePresence>

      {mode === "negative" && congested ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 rounded-full bg-destructive/10"
        />
      ) : null}
    </div>
  );
}

export { NetworkGraph, nodeCountForUsers };
