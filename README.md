# BodhiProtocol

A premium knowledge platform for understanding complex systems — essays, visual
explanations, and interactive learning experiences on AI, capital markets,
business analysis, decision making, and economics.

## Tech stack

- [Next.js 15](https://nextjs.org) — App Router, Server Components, static generation
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (Base UI primitives)
- [Framer Motion](https://www.framer.com/motion/) — mobile nav animation only, lazy-loaded
- [MDX](https://mdxjs.com) via `next-mdx-remote` — essays and blueprints are git-tracked files, no CMS
- [Fuse.js](https://www.fusejs.io) — client-side fuzzy search
- [Vercel Analytics](https://vercel.com/analytics)
- Deployed on [Vercel](https://vercel.com)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` if you need to override the site URL locally
(optional — it falls back to sensible defaults).

## Project structure

```
app/                Routes (App Router)
components/
  ui/                Design-system primitives (Button, Card, Tag, Typography, ...)
  layout/             Nav, footer, theme toggle, search
  home/               Homepage-only sections
  essays/             Essay-specific components
  lighthouse/         Project Lighthouse (blueprint) components
  labs/               Labs components
  shared/             Cross-section components (TOC, prev/next nav, JSON-LD)
content/
  essays/*.mdx         Essay content (frontmatter + MDX body)
  blueprints/*.mdx      Project Lighthouse content
lib/                 Data access (content parsing, search index, site config)
types/               Shared content types
```

## Adding content

**An essay** — add a file to `content/essays/your-slug.mdx`:

```mdx
---
title: "Your Title"
description: "One-sentence summary."
category: "Capital Markets"
tags: ["markets"]
author: "Your Name"
date: "2026-07-14"
---

Essay body in Markdown/MDX. Use `##`/`###` headings — they automatically
populate the table of contents.
```

**A Project Lighthouse blueprint** — add a file to `content/blueprints/your-slug.mdx`:

```mdx
---
title: "Your Title"
summary: "One-sentence summary."
module: "Economics"
season: "Season 1"
tags: ["pricing"]
---

Blueprint body. Use `<Callout type="insight">...</Callout>` or
`type="question"` for expandable callouts.
```

**A Tool** — add an entry to the `tools` array in `lib/tools.ts`.

Both essays and blueprints are picked up automatically by their index pages,
the homepage, sitemap, RSS feed, and search — no other wiring required.

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build (also runs lint + type check)
npm run lint     # ESLint
```

## Deploying

This is a zero-config Next.js app — any Vercel deployment works out of the box:

1. Push this repo to GitHub.
2. Import it in [Vercel](https://vercel.com/new).
3. Optionally set `NEXT_PUBLIC_SITE_URL` in the project's environment variables
   if deploying under a custom domain (see `.env.example`).

CI (`.github/workflows/ci.yml`) runs lint, type-check, and build on every push
and pull request to `main`.
