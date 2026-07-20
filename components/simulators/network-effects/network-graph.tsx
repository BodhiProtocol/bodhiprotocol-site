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
  /** Increment to trigger a one-shot ripple pulse (e.g. on hovering a platform example). */
  pulseKey?: number;
  className?: string;
}

const MIN_NODES = 12;
const MAX_NODES = 120;
const USERS_MIN = 100;
const USERS_MAX = 100000;
const PARTICLE_COUNT = 9;

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

function connectionKey(connection: Connection) {
  return `${connection.from}-${connection.to}`;
}

function NetworkGraph({ users, mode, congested, pulseKey = 0, className }: NetworkGraphProps) {
  const { ref, played, reducedMotion } = useRevealOnScroll();
  const [hoveredId, setHoveredId] = React.useState<number | null>(null);
  const [hoveredConnection, setHoveredConnection] = React.useState<string | null>(null);
  const [showPulse, setShowPulse] = React.useState(false);
  const isFirstPulseRef = React.useRef(true);

  const nodeCount = nodeCountForUsers(users);
  const density = (nodeCount - MIN_NODES) / (MAX_NODES - MIN_NODES);
  const neighborsPerNode = congested ? 2 : Math.round(2 + density * 2);

  const points = React.useMemo(() => computeNodePositions(nodeCount), [nodeCount]);
  const connections = React.useMemo(
    () => computeConnections(points, neighborsPerNode),
    [points, neighborsPerNode],
  );

  const adjacency = React.useMemo(() => {
    const map = new Map<number, Set<number>>();
    for (const connection of connections) {
      if (!map.has(connection.from)) map.set(connection.from, new Set());
      if (!map.has(connection.to)) map.set(connection.to, new Set());
      map.get(connection.from)?.add(connection.to);
      map.get(connection.to)?.add(connection.from);
    }
    return map;
  }, [connections]);

  const particleEdges = React.useMemo(() => {
    if (connections.length === 0) return [];
    const count = Math.min(PARTICLE_COUNT, connections.length);
    const step = connections.length / count;
    return Array.from({ length: count }, (_, i) => connections[Math.floor(i * step)]);
  }, [connections]);

  const hoveredEdge = React.useMemo(
    () => connections.find((connection) => connectionKey(connection) === hoveredConnection) ?? null,
    [connections, hoveredConnection],
  );

  React.useEffect(() => {
    if (isFirstPulseRef.current) {
      isFirstPulseRef.current = false;
      return;
    }
    setShowPulse(true);
    const timeout = setTimeout(() => setShowPulse(false), 700);
    return () => clearTimeout(timeout);
  }, [pulseKey]);

  return (
    <div ref={ref} className={cn("relative aspect-square w-full", className)}>
      <motion.div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-[10%] rounded-full blur-2xl",
          congested ? "bg-destructive/10" : "bg-brand/15",
        )}
        animate={
          played
            ? {
                opacity: 0.3 + density * 0.4,
                scale: reducedMotion ? 1 : [1, 1.04, 1],
              }
            : { opacity: 0 }
        }
        transition={{
          opacity: { duration: 0.6 },
          scale: reducedMotion ? { duration: 0 } : { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      <AnimatePresence>
        {showPulse ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[10%] rounded-full border-2 border-brand/40"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 0.7, scale: 1.15 }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: reducedMotion ? 0 : 0.6, ease: "easeOut" }}
          />
        ) : null}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0"
        animate={played && !reducedMotion ? { scale: [1, 1.015, 1] } : { scale: 1 }}
        transition={{ duration: 6, repeat: played && !reducedMotion ? Infinity : 0, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <AnimatePresence>
            {connections.map((connection) => {
              const from = points[connection.from];
              const to = points[connection.to];
              const key = connectionKey(connection);
              const isConnectionHovered = hoveredConnection === key;
              const isHoverRelated =
                isConnectionHovered ||
                (hoveredId !== null && (connection.from === hoveredId || connection.to === hoveredId));
              const dimmed = (hoveredId !== null || hoveredConnection !== null) && !isHoverRelated;
              return (
                <React.Fragment key={key}>
                  <motion.line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: !played ? 0 : dimmed ? 0.08 : isHoverRelated ? 0.7 : congested ? 0.12 : 0.35,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.3 }}
                    stroke={congested ? "var(--color-muted-foreground)" : "var(--color-brand)"}
                    strokeWidth={isHoverRelated ? 0.6 : congested ? 0.2 : 0.35}
                  />
                  {/* Wider invisible hit-target — the visible line is too thin to hover reliably. */}
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="transparent"
                    strokeWidth={3}
                    onMouseEnter={() => setHoveredConnection(key)}
                    onMouseLeave={() => setHoveredConnection((current) => (current === key ? null : current))}
                  />
                </React.Fragment>
              );
            })}
          </AnimatePresence>

          {played && !reducedMotion
            ? particleEdges.map((edge, i) => {
                const from = points[edge.from];
                const to = points[edge.to];
                return (
                  <motion.circle
                    key={`particle-${edge.from}-${edge.to}`}
                    r={0.5}
                    className={congested ? "fill-muted-foreground" : "fill-brand"}
                    animate={{
                      cx: [from.x, to.x, from.x],
                      cy: [from.y, to.y, from.y],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 3 + (i % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4,
                    }}
                  />
                );
              })
            : null}

          <AnimatePresence>
            {hoveredEdge && !reducedMotion
              ? (() => {
                  const from = points[hoveredEdge.from];
                  const to = points[hoveredEdge.to];
                  return (
                    <motion.circle
                      key={`hover-flash-${hoveredConnection}`}
                      r={0.8}
                      className="fill-brand"
                      initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                      animate={{ cx: to.x, cy: to.y, opacity: [0, 1, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  );
                })()
              : null}
          </AnimatePresence>
        </svg>

        <AnimatePresence>
          {points.map((point) => {
            const isHovered = hoveredId === point.id;
            const dimmed = hoveredId !== null && !isHovered && !adjacency.get(hoveredId)?.has(point.id);
            const baseOpacity = congested ? 0.55 : 0.9;
            const pulseLow = congested ? 0.4 : 0.7;
            const pulseHigh = congested ? 0.6 : 1;
            const animateOpacity = !played
              ? 0
              : dimmed
                ? 0.25
                : reducedMotion
                  ? baseOpacity
                  : [pulseLow, pulseHigh, pulseLow];
            const canDrift = played && !reducedMotion && !dimmed;
            const driftX = ((point.id % 5) - 2) * 1.2;
            const driftY = (((point.id * 3) % 5) - 2) * 1.2;

            return (
              <motion.div
                key={point.id}
                layout
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                onMouseEnter={() => setHoveredId(point.id)}
                onMouseLeave={() => setHoveredId(null)}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{
                  opacity: animateOpacity,
                  scale: isHovered ? 1.5 : 1,
                  x: canDrift ? [0, driftX, 0, -driftX, 0] : 0,
                  y: canDrift ? [0, driftY, 0, -driftY, 0] : 0,
                }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{
                  scale: { duration: 0.25, ease: "easeOut" },
                  opacity:
                    played && !reducedMotion && !dimmed
                      ? {
                          duration: 2.2 + (point.id % 5) * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: (point.id % 7) * 0.15,
                        }
                      : { duration: reducedMotion ? 0 : 0.5, ease: "easeOut" },
                  x: canDrift
                    ? { duration: 10 + (point.id % 5), repeat: Infinity, ease: "easeInOut", delay: (point.id % 7) * 0.3 }
                    : { duration: 0 },
                  y: canDrift
                    ? { duration: 11 + (point.id % 4), repeat: Infinity, ease: "easeInOut", delay: (point.id % 6) * 0.25 }
                    : { duration: 0 },
                }}
                className={cn(
                  "absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-2.5",
                  congested ? "bg-destructive" : "bg-brand shadow-[0_0_6px_var(--color-brand)]",
                )}
              />
            );
          })}
        </AnimatePresence>
      </motion.div>

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
