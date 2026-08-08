"use client";

import * as React from "react";
import Link from "next/link";
import {
  Boxes,
  Brain,
  Compass,
  Cpu,
  Layers,
  LayoutGrid,
  Network,
  Route,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { TagButton } from "@/components/ui/tag";
import { Muted } from "@/components/ui/typography";
import { categoryIcons } from "@/lib/category-icons";
import type { ConceptArc, ConceptBridge, ConceptMapData } from "@/lib/concept-map";

const activeChipClassName =
  "data-[active=true]:border-brand data-[active=true]:bg-brand data-[active=true]:text-brand-foreground";

// Icons arrive as lucide display names because a component can't cross the
// server/client boundary. Anything unmapped falls back rather than blanking out.
const arcIcons: Record<string, LucideIcon> = {
  Boxes,
  Brain,
  Compass,
  Cpu,
  Layers,
  Network,
  Route,
  Workflow,
};

interface BridgePath {
  key: string;
  d: string;
  midX: number;
  midY: number;
  label: string;
  from: string;
  to: string;
}

/**
 * Curve geometry is measured from the laid-out DOM rather than computed from a
 * fixed grid, so the lines stay glued to the stations at every container width.
 */
function useBridgePaths(
  containerRef: React.RefObject<HTMLDivElement | null>,
  bridges: ConceptBridge[],
  enabled: boolean,
) {
  const [paths, setPaths] = React.useState<BridgePath[]>([]);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || !enabled) {
      setPaths([]);
      return;
    }

    const measure = () => {
      const box = container.getBoundingClientRect();
      setSize({ width: box.width, height: box.height });

      const centreOf = (slug: string) => {
        const node = container.querySelector<HTMLElement>(
          `[data-station="${CSS.escape(slug)}"] [data-dot]`,
        );
        if (!node) return null;
        const rect = node.getBoundingClientRect();
        return {
          x: rect.left - box.left + rect.width / 2,
          y: rect.top - box.top + rect.height / 2,
        };
      };

      const next: BridgePath[] = [];
      for (const bridge of bridges) {
        const a = centreOf(bridge.from.slug);
        const b = centreOf(bridge.to.slug);
        if (!a || !b) continue;

        // Ease out of the source station vertically so the curve never runs
        // along a transit line and read as part of it.
        const lift = Math.max(28, Math.abs(b.y - a.y) * 0.45);
        const d = `M ${a.x} ${a.y} C ${a.x} ${a.y + (b.y > a.y ? lift : -lift)}, ${b.x} ${b.y - (b.y > a.y ? lift : -lift)}, ${b.x} ${b.y}`;

        next.push({
          key: `${bridge.from.slug}->${bridge.to.slug}`,
          d,
          midX: (a.x + b.x) / 2,
          midY: (a.y + b.y) / 2,
          label: bridge.label,
          from: bridge.from.slug,
          to: bridge.to.slug,
        });
      }
      setPaths(next);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    for (const node of container.querySelectorAll("[data-station]")) {
      observer.observe(node);
    }

    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [containerRef, bridges, enabled]);

  return { paths, size };
}

function useIsWide(query = "(min-width: 1024px)") {
  const [wide, setWide] = React.useState(false);
  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setWide(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return wide;
}

interface StationProps {
  essay: ConceptArc["essays"][number];
  index: number;
  arc: ConceptArc;
  dimmed: boolean;
  bridged: boolean;
  active: boolean;
  isLast: boolean;
  onActivate: (slug: string | null) => void;
}

function Station({
  essay,
  index,
  arc,
  dimmed,
  bridged,
  active,
  isLast,
  onActivate,
}: StationProps) {
  return (
    <li
      data-station={essay.slug}
      data-dimmed={dimmed}
      className="relative flex min-w-0 shrink-0 basis-40 flex-row items-start gap-3 transition-opacity duration-300 data-[dimmed=true]:opacity-30 lg:basis-0 lg:grow lg:flex-col lg:items-center lg:gap-2"
    >
      {/* Track between this station and the next. Horizontal only — the mobile
          layout draws one continuous rule down the whole line instead. */}
      {!isLast ? (
        <span
          aria-hidden="true"
          className="absolute top-[7px] left-1/2 z-0 hidden h-0.5 w-[calc(100%+0.5rem)] lg:block"
          style={{
            backgroundColor: arc.color,
            opacity: arc.standalone ? 0.35 : 0.55,
          }}
        />
      ) : null}

      <span
        data-dot
        aria-hidden="true"
        data-active={active}
        className="relative z-10 mt-1 flex size-4 shrink-0 items-center justify-center rounded-full border-2 bg-background transition-transform duration-300 data-[active=true]:scale-125 lg:mt-0"
        style={{ borderColor: arc.color }}
      >
        {bridged ? (
          <span
            className="size-1.5 rounded-full bg-brand"
            title="Connects to another line"
          />
        ) : null}
      </span>

      <Link
        href={`/essays/${essay.slug}`}
        onMouseEnter={() => onActivate(essay.slug)}
        onMouseLeave={() => onActivate(null)}
        onFocus={() => onActivate(essay.slug)}
        onBlur={() => onActivate(null)}
        className="group min-w-0 rounded-md outline-none lg:text-center"
      >
        <span className="flex items-baseline gap-1.5 lg:justify-center">
          <span className="font-mono text-[0.65rem] text-muted-foreground">
            {arc.standalone ? "·" : index + 1}
          </span>
          <span className="font-heading text-[0.8rem] leading-snug font-medium text-balance group-hover:text-brand group-focus-visible:text-brand">
            {essay.title}
          </span>
        </span>
        <Muted className="mt-0.5 block font-mono text-[0.65rem]">
          {essay.readingTime}
        </Muted>
        {essay.hook ? (
          <Muted className="mt-1 hidden text-[0.7rem] leading-snug text-pretty lg:block">
            {essay.hook}
          </Muted>
        ) : null}
      </Link>
    </li>
  );
}

function ConceptMap({ data }: { data: ConceptMapData }) {
  const { arcs, bridges, categories, totals } = data;
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const [activeStation, setActiveStation] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isWide = useIsWide();
  const { paths, size } = useBridgePaths(containerRef, bridges, isWide);

  const bridgedSlugs = React.useMemo(() => {
    const set = new Set<string>();
    for (const bridge of bridges) {
      set.add(bridge.from.slug);
      set.add(bridge.to.slug);
    }
    return set;
  }, [bridges]);

  const bridgesBySource = React.useMemo(() => {
    const map = new Map<string, ConceptBridge[]>();
    for (const bridge of bridges) {
      const list = map.get(bridge.from.slug) ?? [];
      list.push(bridge);
      map.set(bridge.from.slug, list);
    }
    return map;
  }, [bridges]);

  const isDimmed = (category: string) =>
    Boolean(activeCategory && category !== activeCategory);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        <TagButton
          active={activeCategory === null}
          onClick={() => setActiveCategory(null)}
          className={activeChipClassName}
        >
          <LayoutGrid className="size-3.5 shrink-0" />
          All
        </TagButton>
        {categories.map((category) => {
          const Icon = categoryIcons[category];
          return (
            <TagButton
              key={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className={activeChipClassName}
            >
              {Icon ? <Icon className="size-3.5 shrink-0" /> : null}
              {category}
            </TagButton>
          );
        })}
      </div>

      <div ref={containerRef} className="relative">
        {/* Interchanges. Decorative here — every one is also a link in the list below. */}
        {isWide && paths.length > 0 ? (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-visible"
            width={size.width}
            height={size.height}
            viewBox={`0 0 ${size.width} ${size.height}`}
            fill="none"
          >
            {paths.map((path) => {
              const lit = activeStation === path.from || activeStation === path.to;
              return (
                <path
                  key={path.key}
                  d={path.d}
                  stroke="var(--brand)"
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  strokeLinecap="round"
                  className="transition-opacity duration-300 motion-safe:[animation:cm-drift_1.8s_linear_infinite]"
                  style={{ opacity: lit ? 0.95 : 0.28 }}
                />
              );
            })}
          </svg>
        ) : null}

        {isWide
          ? paths.map((path) => {
              const lit = activeStation === path.from || activeStation === path.to;
              if (!lit) return null;
              return (
                <span
                  key={`${path.key}-label`}
                  aria-hidden="true"
                  className="pointer-events-none absolute z-20 max-w-56 -translate-x-1/2 -translate-y-1/2 rounded-md bg-brand px-2 py-1 text-[0.7rem] leading-snug text-balance text-brand-foreground shadow-lg"
                  style={{ left: path.midX, top: path.midY }}
                >
                  {path.label}
                </span>
              );
            })
          : null}

        <div className="relative z-10 flex flex-col gap-7">
          {arcs.map((arc) => {
            const Icon = arcIcons[arc.iconName] ?? Compass;
            const arcDimmed = isDimmed(arc.category);

            return (
              <section
                key={arc.id}
                data-dimmed={arcDimmed}
                className="flex flex-col gap-3 transition-opacity duration-300 data-[dimmed=true]:opacity-40"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span
                    className="flex size-7 shrink-0 items-center justify-center self-center rounded-lg"
                    style={{ backgroundColor: `${arc.color}1a`, color: arc.color }}
                  >
                    <Icon className="size-4" />
                  </span>
                  <h2 className="font-heading text-base leading-snug font-medium">
                    {arc.title}
                  </h2>
                  {arc.recommendedStart ? (
                    <span className="inline-flex h-5 shrink-0 items-center rounded-full bg-brand px-2 text-[0.65rem] font-semibold tracking-wide text-brand-foreground uppercase">
                      Start here
                    </span>
                  ) : null}
                  <Muted className="font-mono text-[0.7rem]">
                    {arc.essays.length} {arc.essays.length === 1 ? "part" : "parts"}
                    {arc.minutes > 0 ? ` · ${arc.minutes} min` : ""}
                  </Muted>
                </div>

                <div className="relative">
                  {/* Mobile draws one continuous rule down the stack; the desktop
                      row uses per-station tracks so the line ends at the outer dots. */}
                  <span
                    aria-hidden="true"
                    className="absolute top-3 bottom-3 left-[7px] w-0.5 rounded-full lg:hidden"
                    style={{
                      backgroundColor: arc.color,
                      opacity: arc.standalone ? 0.35 : 0.55,
                    }}
                  />
                  <ol className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-2">
                    {arc.essays.map((essay, index) => (
                      <React.Fragment key={essay.slug}>
                        <Station
                          essay={essay}
                          index={index}
                          arc={arc}
                          dimmed={isDimmed(essay.category) && !arcDimmed}
                          bridged={bridgedSlugs.has(essay.slug)}
                          active={activeStation === essay.slug}
                          isLast={index === arc.essays.length - 1}
                          onActivate={setActiveStation}
                        />
                        {/* Mobile keeps every interchange visible instead of hiding the layer. */}
                        {(bridgesBySource.get(essay.slug) ?? []).map((bridge) => (
                          <li
                            key={`${essay.slug}-${bridge.to.slug}`}
                            className="ml-7 lg:hidden"
                          >
                            <Link
                              href={`/essays/${bridge.to.slug}`}
                              className="group flex gap-2 rounded-lg border border-dashed border-brand/40 bg-brand/5 p-2.5 transition-colors hover:border-brand hover:bg-brand/10"
                            >
                              <span
                                aria-hidden="true"
                                className="font-mono text-xs text-brand"
                              >
                                ↳
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[0.7rem] leading-snug text-pretty text-muted-foreground">
                                  {bridge.label}
                                </span>
                                <span className="mt-0.5 block font-heading text-[0.75rem] leading-snug font-medium text-brand">
                                  {bridge.to.title}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </React.Fragment>
                    ))}
                  </ol>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      <Muted className="font-mono text-xs">
        {totals.essays} essays · {totals.arcs} lines · {totals.bridges} interchanges
      </Muted>
    </div>
  );
}

export { ConceptMap };
