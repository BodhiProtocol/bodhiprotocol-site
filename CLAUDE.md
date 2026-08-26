# bodhiprotocol.com — AI Agent Context

This file briefs any AI coding tool (Codex, Cursor, Claude Code, etc.) working on this repo. Read it before making changes. Keep it updated when a new durable pattern is established — this file is the source of truth, not any one AI's memory of past sessions.

## What this is

Flagship site for BodhiProtocol — a portfolio proving an IT Business Analyst with no formal coding background can ship real products by directing AI. **Next.js 15 (App Router) + TypeScript + Tailwind v4 + shadcn/ui**, deployed on **Vercel**, content-driven via git-tracked MDX (no CMS, no database). CI (lint/type-check/build) runs on every push to `main`.

Sections: Essays, Invisible Businesses, Great Minds, Project Lighthouse (blueprint curriculum), Tools (catalog of other BodhiProtocol single-file HTML tools), Library, About.

The owner, Surya, is non-technical by background — explain tradeoffs in plain terms, don't assume prior software engineering vocabulary, and don't skip straight to code on anything with visual/design judgment calls (see Working Style below).

## Design system

- Brand purple: `#7c3aed`. Secondary text: `#52525b`. Light-theme bg/text: `#fafafa` / `#0a0a0a`.
- **Theme defaults to light, `enableSystem={false}`** (`app/layout.tsx`). This was deliberately reverted from system-theme — shared links (e.g. Invisible Businesses episodes) were opening dark for recipients with dark-mode OS, which broke WhatsApp/social previews. The manual light/dark toggle still works; system-preference-following does not. If touching `ThemeProvider`, do not reintroduce `defaultTheme="system"`.
- OG image routes (`**/opengraph-image.tsx`) must use the **light** template (`#fafafa` bg, `#7c3aed` accents) — a dark `#0f0a1f` variant existed on two routes from an earlier convention and was a real bug (broke WhatsApp/Meta link previews). Default every new content type's OG image to light.
- Glass-morphism (`glass-card.tsx`) is used per-feature-folder on purpose (e.g. `components/invisible-businesses/glass-card.tsx` is a deliberate small duplicate, not a shared import) — feature folders stay self-contained.

## Core design philosophy: bespoke, not templatized

The recurring judgment call across this codebase: **each new entry in a content series gets its own one-off visual metaphor grounded in that specific subject's actual mechanic — not a reused generic template.**

- Invisible Businesses: 9 of 11 episodes have bespoke diagrams (Amazon = horizontal funnel, NVIDIA = vertical stack, Visa = trust-bridge, Disney = radial hub-and-spoke, etc.) — only Netflix/Apple share the standard circular-flywheel template.
- Great Minds: explicitly rejected templatizing Leonardo da Vinci's 8-node radial wheel across future figures — the diagram type is bespoke per person (would be a spiral for Buffett, a tree for Darwin), while the layout skeleton (left text column + right portrait-as-hub) and typography/spacing stay constant.

When adding a new entry to either series, default to designing a new bespoke visual unless there's a specific reason to reuse an existing one. Don't propose "just reuse the last diagram" as the default.

## Architecture pattern for a new content type

Mirror the existing pattern (Invisible Businesses / Great Minds):
1. `types/content.ts` — add the frontmatter interface
2. `lib/<type>.ts` — fs + gray-matter loader (`getAll*`, `get*BySlug`)
3. `content/<type>/*.mdx` — git-tracked content, no database
4. `app/<type>/page.tsx` (landing grid) + `app/<type>/[slug]/page.tsx` + `opengraph-image.tsx`
5. `components/<type>/` — generic/reusable components (hero, TOC, card) vs. bespoke-per-entry components (diagrams), wired via a **slug-keyed registry** (e.g. `customEpisodeBodies` in `app/invisible-businesses/[slug]/page.tsx`, `heroDiagrams`/`heroBackgrounds` in Great Minds) — not a growing if/ternary chain.

## Workflow conventions

- **Draft/publish**: content types use a `draft?: boolean` frontmatter flag. `getAll*()` filters drafts from landing grid/sitemap/search; `get*BySlug()` returns `undefined` for a draft so the direct URL 404s too. "Publish X" / "make X live" means: flip that entry's `draft` to `false`, AND update the *previous* entry's `nextEpisode`/equivalent field to link forward instead of showing "coming soon."
- **Verifying a deploy is live**: don't trust a single `curl`/fetch immediately after push — Vercel builds take 30s–2min and a check mid-build reads as a false negative. Poll instead.
- **AI-generated product imagery**: if using a photorealistic AI mockup of a real branded product (e.g. an iPhone render with visible logo), flag the trademark distinction vs. a generic icon before building it in, even if the image is clean — this has come up before and was reverted once already.
- Floating-arrow connector animation (small looping drift, staggered delay, gated on scroll-reveal + reduced-motion check) is the standard treatment wherever two diagram nodes connect in a row/loop.
- **Every essay, not just one section**: pair one Indian example with one international example throughout the piece — every desk/concept/mechanism gets both, not just the "Why markets needed this" section (e.g. an MCX gold futures hedge next to an ICE coffee futures hedge; RBI's insurable-interest rule for CDS next to the pre-2008 naked-CDS US market). Indian example first, then international, is the established order. This is load-bearing for the site's positioning — don't drop to a single-market example for a new essay.
- **Essay readership span**: every essay must work for a total beginner (someone who's never heard the term) through to a deep professional — business analyst, QA/testing professional, market/domain reviewer, researcher — in the same piece — not a beginner version and a separate expert version. The mechanism: open every dense concept with a plain "Think of X..." everyday analogy (a fixed deposit, a pizza, two friends lending money, two bosses) before naming the technical term, then let the technical depth (mechanics, settlement, regulation) sit right after it rather than being cut for simplicity. If a section only works for one end of that range, it needs an analogy pass, not a rewrite into two versions. Depth must be complete, not merely sufficient — cover the concept fully enough that an expert reader (BA, QA, market reviewer) never feels something load-bearing was skipped or glossed over; a gap for the sake of brevity is a defect, not a simplification.
- **"Ten by ten"**: a quality bar, not a length or section-count format (corrected after initially misreading it as the latter). It means a 10/10 rating on four things at once — content quality, depth, the hook (does the opening actually pull you in), and how interesting it is to read — while staying simple enough that even a curious ten-year-old could follow the core idea from the opening, before the piece goes on to earn its professional depth. The "Think of X" analogy pass above is necessary but not sufficient for this — a correct analogy can still sit inside a flat, un-hooky opening. Judge a draft against this by asking: would a ten-year-old stay with the first three paragraphs, and does a professional reader still learn something by the end?

## Working style / approval process

- For a **new visual section or page type** (not a small tweak), do a structured critique first if a reference mockup exists: what works/doesn't, what should stay constant vs. vary as reusable "design language," full page structure with reasoning, then **wait for explicit approval** before writing code. A bare "go" counts as approval for everything just discussed.
- Surya approves commits/pushes individually — don't assume a broad go-ahead extends past what was actually scoped, but a clear "all of that" / "deploy all" does cover the full bundled action (build + verify + publish) without re-asking at each step.
- Single-file, zero-dependency HTML is the standard for the *separate* game/tool repos under the BodhiProtocol org (not this Next.js site) — don't suggest that constraint here, and don't suggest a framework rewrite for those simpler repos.
