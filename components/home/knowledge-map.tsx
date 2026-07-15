"use client";

import { Brain, ClipboardList, GitFork, Landmark, LineChart, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useRevealOnScroll } from "@/components/essays/use-reveal-on-scroll";

interface MapNode {
  slug: string;
  category: string;
  label: string;
  tagline: string;
  x: number;
  y: number;
  icon: LucideIcon;
  ring: string;
  fill: string;
  text: string;
}

const nodes: MapNode[] = [
  {
    slug: "artificial-intelligence",
    category: "Artificial Intelligence",
    label: "AI",
    tagline: "Intelligence at scale",
    x: 90,
    y: 42,
    icon: Brain,
    ring: "stroke-violet-500",
    fill: "fill-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
  },
  {
    slug: "capital-markets",
    category: "Capital Markets",
    label: "CAPITAL MARKETS",
    tagline: "Markets drive opportunity",
    x: 310,
    y: 22,
    icon: LineChart,
    ring: "stroke-blue-500",
    fill: "fill-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
  },
  {
    slug: "business-analysis",
    category: "Business Analysis",
    label: "BUSINESS ANALYSIS",
    tagline: "Bridge business and technology",
    x: 530,
    y: 42,
    icon: ClipboardList,
    ring: "stroke-teal-500",
    fill: "fill-teal-500/10",
    text: "text-teal-600 dark:text-teal-400",
  },
  {
    slug: "decision-making",
    category: "Decision Making",
    label: "DECISION MAKING",
    tagline: "Better decisions, better outcomes",
    x: 462,
    y: 168,
    icon: GitFork,
    ring: "stroke-orange-500",
    fill: "fill-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
  },
  {
    slug: "economics",
    category: "Economics",
    label: "ECONOMICS",
    tagline: "Incentives shape the world",
    x: 158,
    y: 168,
    icon: Landmark,
    ring: "stroke-emerald-500",
    fill: "fill-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
  },
];

const hub = { x: 310, y: 108 };

function LighthouseGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M10 3h4l2 5H8l2-5Z" className="fill-brand-foreground" />
      <path d="M8 8h8l1.5 13h-11L8 8Z" className="fill-brand-foreground" />
      <path d="M9.2 12h5.6M8.6 16h6.8" stroke="var(--brand)" strokeWidth="1.2" />
    </svg>
  );
}

function KnowledgeMap() {
  const { ref, played, reducedMotion } = useRevealOnScroll();

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Sparkles className="size-3.5 text-brand" />
        Learn through connections, not just content.
      </div>

      <svg viewBox="0 0 620 220" className="h-auto w-full max-w-3xl">
        {nodes.map((node, i) => (
          <path
            key={`line-${node.slug}`}
            d={`M${hub.x},${hub.y} Q${(hub.x + node.x) / 2},${(hub.y + node.y) / 2 - 20} ${node.x},${node.y}`}
            fill="none"
            className={node.ring}
            strokeWidth="1.25"
            strokeOpacity="0.4"
            style={{
              strokeDasharray: 260,
              strokeDashoffset: played ? 0 : 260,
              transition: reducedMotion
                ? "none"
                : `stroke-dashoffset 700ms cubic-bezier(.16,1,.3,1) ${i * 90}ms`,
            }}
          />
        ))}

        <g
          style={{
            opacity: played ? 1 : 0,
            transform: played ? "scale(1)" : "scale(0.4)",
            transformOrigin: `${hub.x}px ${hub.y}px`,
            transition: reducedMotion ? "none" : "opacity 400ms ease, transform 400ms cubic-bezier(.34,1.56,.64,1)",
          }}
        >
          <circle
            cx={hub.x}
            cy={hub.y}
            r="30"
            className="fill-brand/10 stroke-brand"
            strokeWidth="1.25"
            style={
              played && !reducedMotion
                ? { animation: "hub-glow 2.6s ease-in-out 1.4s infinite" }
                : undefined
            }
          />
          <g transform={`translate(${hub.x - 12}, ${hub.y - 14})`}>
            <LighthouseGlyph className="size-6" />
          </g>
          <text
            x={hub.x}
            y={hub.y + 40}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="9"
            fontWeight="700"
            letterSpacing="0.04em"
            className="fill-foreground"
          >
            BODHIPROTOCOL
          </text>
          <text
            x={hub.x}
            y={hub.y + 53}
            textAnchor="middle"
            fontFamily="var(--font-sans)"
            fontSize="8.5"
            className="fill-muted-foreground"
          >
            Everything connects. Everything matters.
          </text>
        </g>

        {nodes.map((node, i) => {
          const Icon = node.icon;
          const labelBelow = node.y > hub.y;
          return (
            <a key={node.slug} href={`/library?category=${node.slug}`} aria-label={node.category}>
              <g
                style={{
                  opacity: played ? 1 : 0,
                  transform: played ? "scale(1)" : "scale(0.4)",
                  transformOrigin: `${node.x}px ${node.y}px`,
                  transition: reducedMotion
                    ? "none"
                    : `opacity 450ms cubic-bezier(.34,1.4,.4,1) ${i * 90 + 250}ms, transform 450ms cubic-bezier(.34,1.4,.4,1) ${i * 90 + 250}ms`,
                }}
                className="cursor-pointer"
              >
                <circle cx={node.x} cy={node.y} r="22" className={`${node.fill} ${node.ring}`} strokeWidth="1" />
                <g transform={`translate(${node.x - 11}, ${node.y - 11})`} className={node.text}>
                  <Icon className="size-[22px]" strokeWidth={1.8} />
                </g>
                <text
                  x={node.x}
                  y={labelBelow ? node.y + 40 : node.y - 30}
                  textAnchor="middle"
                  fontFamily="var(--font-mono)"
                  fontSize="8.5"
                  fontWeight="700"
                  letterSpacing="0.03em"
                  className="fill-foreground"
                >
                  {node.label}
                </text>
                <text
                  x={node.x}
                  y={labelBelow ? node.y + 52 : node.y - 18}
                  textAnchor="middle"
                  fontFamily="var(--font-sans)"
                  fontSize="8"
                  className="fill-muted-foreground"
                >
                  {node.tagline}
                </text>
              </g>
            </a>
          );
        })}
      </svg>
    </div>
  );
}

export { KnowledgeMap };
