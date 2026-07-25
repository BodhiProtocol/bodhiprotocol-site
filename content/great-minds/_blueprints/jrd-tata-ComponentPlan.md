# Stage 6 — Component Plan — J. R. D. Tata

Architecture only. No implementation. Reuses the established `heroDiagrams`/`heroBackgrounds` slug-registry pattern from `app/great-minds/[slug]/page.tsx`.

## Naming collision flagged
Ratan Tata already owns the `tata-` prefix (`components/great-minds/tata-return-loop-diagram.tsx`, `tata-hero-background.tsx`). JRD's slug is `jrd-tata`, so his files must use a `jrd-` prefix, not `tata-`, to avoid colliding with or being confused for Ratan Tata's components.

## New files
- `components/great-minds/jrd-orbit-diagram.tsx` — bespoke hero diagram (Concept B, true orbit paths)
- `components/great-minds/jrd-hero-background.tsx` — bespoke low-opacity night-sky field background
- `content/great-minds/jrd-tata.mdx` — new content file, `draft: true` initially, matching the standing publish workflow

## Type extensions (`types/content.ts`)
All three additions are optional fields on existing shared types — no-ops for every other mind that doesn't set them, following the same pattern already used for `pruned`, `quote`, `relatedNodes`, `side` on `GreatMindWheelNode`.
- `GreatMindWheelNode.orbitRadius?: "inner" | "mid" | "outer"` — which of 3 concentric orbit paths a node sits on; only `JrdOrbitDiagram` reads it.
- `GreatMindWheelNode.highlight?: boolean` — marks the Air India node for the distinct ring + emphasized aria treatment; only `JrdOrbitDiagram` reads it.
- `GreatMind.promoteTurningPoint?: boolean` — mirrors the existing `promoteMentalModels` flag. When true, Turning Point renders right after Core Philosophy instead of its current fixed slot after Mental Models. Defaults to false/undefined, so Ratan Tata's and Ramanujan's existing layouts are untouched.

## `app/great-minds/[slug]/page.tsx` changes (architecture, not code)
- Register `"jrd-tata": (mind) => <JrdOrbitDiagram nodes={mind.wheel} />` in `heroDiagrams`.
- Register `"jrd-tata": <JrdHeroBackground />` in `heroBackgrounds`.
- `tocSections` array: wrap the `turning-point` entry in a `mind.promoteTurningPoint` conditional, inserting it right after `core-philosophy` when true, keeping today's position (after Mental Models) when false — same technique already used for the `promoteMentalModels` Thinking-Process/Mental-Models swap.
- Main render JSX: same conditional restructuring, moving `<GreatMindsTurningPoint>` above the Thinking Process/Mental Models block when `promoteTurningPoint` is true.

## `JrdOrbitDiagram` props
`{ nodes: GreatMindWheelNode[] }` — same signature as every other hero diagram (reuses `mind.wheel` directly, no new prop shape). Places each node on one of 3 concentric elliptical orbit paths per its `orbitRadius`, renders the `highlight`-flagged node (Air India) with a distinct ring. Reuses the existing shared `aria-live` detail-panel hover/tap/focus pattern — no new interaction model invented.

**Hard layout constraint:** minimum spacing between nodes must hold even at the innermost orbit radius, so the autonomy-scale visual signal never shrinks a node's tap target below the site's existing accessibility floor.

## `JrdHeroBackground` props
None — matches every other hero background's signature (static decorative motif, very low opacity). Scattered point field only, no connecting lines, so it doesn't visually compete with the foreground orbit diagram sitting on top of it.

## Reused, unchanged (no new components)
`GreatMindsHero`, `GreatMindsPageToc`, `GreatMindsCorePhilosophy`, `GreatMindsThinkingProcess`, `GreatMindsMentalModels`, `GreatMindsTurningPoint`, `GreatMindsBigIdeas`, `GreatMindsConceptIllustration`, `GreatMindsTimeline`, `GreatMindsBooks`, `GreatMindsScholarshipNotes`, `GreatMindsClosingReflection`, `GreatMindsRelated`.

## Animation plan
- Nodes fade/scale in on scroll-reveal, staggered per node — same `useRevealOnScroll`-driven convention as every other diagram, no new primitive.
- Air India's highlighted ring gets a slow pulse, reusing the site's existing pulse utility (the same one other diagrams use for their center hub) rather than inventing a new animation.
- Orbit paths are static ellipses, not literally rotating — matches every other Great Minds diagram's "static after reveal" convention.

## Accessibility
- Reduced-motion: stagger/pulse gated behind the existing `use-prefers-reduced-motion.ts` hook, same as every other diagram.
- Minimum tap-target spacing rule (above).
- Air India node's `aria-label` carries the emphasis too (e.g. "Air India — nationalized 1953, chairmanship ended 1978"), so screen-reader/keyboard users get the same foreshadowing non-visually, not just a visual ring.
- Standard hover/tap/focus → shared `aria-live` detail panel, identical to every other figure — no new pattern.
