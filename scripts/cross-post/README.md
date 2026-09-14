# Cross-post an essay to Medium / Substack

Takes one essay from `content/essays/*.mdx`, strips the frontmatter, and
rewrites internal links to absolute URLs. Neither platform lets an outside
tool publish for you anymore, so this produces **paste-ready HTML files** you
copy into each platform's own editor by hand — no retyping or reformatting,
but the final Publish/Send click is always yours.

- **Substack**: no public API, no post-by-email feature. Always gets a
  paste-ready file.
- **Medium**: stopped issuing new API integration tokens in 2025. If your
  account has one from before then, the script creates a real **draft** post
  via the API (with `canonicalUrl` pointed back at bodhiprotocol.com, so
  Google treats this site as the original). Otherwise — true for most
  accounts, check Settings → Security and apps → "Integration tokens" — it
  gets the same paste-ready file as Substack.

## One-time setup

1. `npm install` (adds `marked`, used only by this script, to convert
   Markdown to HTML for the paste-ready files).
2. Only relevant if your Medium account has a pre-2025 integration token:
   copy `scripts/cross-post/env.example` to `scripts/cross-post/.env.local`
   and paste the token in. `.env.local` files are already gitignored.

## Usage

```bash
node scripts/cross-post/publish-essay.mjs bonds-the-fixed-deposit-you-can-sell \
  --medium-image ./path/to/medium-cover.png \
  --substack-image ./path/to/substack-cover.png
```

This writes `.crosspost-output/<slug>.medium.html` and
`.crosspost-output/<slug>.substack.html`. Open each in a browser, select all,
copy, and paste into a new story/post on that platform — then add the cover
image if it didn't carry over with the paste, and hit Publish/Send once
you're happy with it.

Image arguments accept either a local file path or an `http(s)://` URL. If
omitted, both platforms fall back to the essay's own OG image
(`/essays/<slug>/opengraph-image`) — fine for a quick test, but pick distinct
images per platform for anything you're actually publishing (Medium and
Substack render cover images at different aspect ratios).

Flags: `--medium-only`, `--substack-only`.

## Known limitation

A handful of essays/episodes use bespoke React diagram components instead of
plain Markdown — those won't render on Medium or Substack. The script warns
when an essay contains one; for those, cross-post the text and either drop
the diagram or swap in a screenshot of it as a regular image.
