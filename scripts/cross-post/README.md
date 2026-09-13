# Cross-post an essay to Medium / Substack

Takes one essay from `content/essays/*.mdx`, strips the frontmatter, rewrites
internal links to absolute URLs, and:

- **Medium**: creates a **draft** post via Medium's API, with `canonicalUrl`
  pointed back at bodhiprotocol.com (so Google treats this site as the
  original, not Medium).
- **Substack**: emails the post to your Substack's hidden posting address,
  where it lands as a **draft**.

Both platforms always stop at a draft — publishing is a manual click, on
purpose, so a bad auto-post never goes out under your name.

## One-time setup

1. `npm install` (adds `nodemailer` and `marked`, used only by this script).
2. Copy `scripts/cross-post/env.example` to `scripts/cross-post/.env.local`
   and fill it in:
   - **Medium**: Settings → Integration tokens → generate one.
   - **Substack**: find your posting-by-email address in your publication's
     settings, and set up any SMTP account you control to send from (a
     Gmail app password works fine for low volume).

`.env.local` files are already gitignored — nothing here gets committed.

## Usage

```bash
# Dry run — no credentials needed. Writes the generated Medium payload and
# Substack email HTML into .crosspost-output/ so you can inspect them first.
node scripts/cross-post/publish-essay.mjs bonds-the-fixed-deposit-you-can-sell --dry-run

# Real run, once .env.local is filled in. Different cover image per platform:
node --env-file=scripts/cross-post/.env.local scripts/cross-post/publish-essay.mjs \
  bonds-the-fixed-deposit-you-can-sell \
  --medium-image ./path/to/medium-cover.png \
  --substack-image ./path/to/substack-cover.png
```

Image arguments accept either a local file path or an `http(s)://` URL. If
omitted, both platforms fall back to the essay's own OG image
(`/essays/<slug>/opengraph-image`) — fine for a quick test, but pick distinct
images per platform for anything you're actually publishing (Medium and
Substack render cover images at different aspect ratios).

Flags: `--medium-only`, `--substack-only`, `--dry-run`.

With no credentials configured at all, the script behaves as if `--dry-run`
were passed (with a warning) rather than failing outright.

## Known limitation

A handful of essays/episodes use bespoke React diagram components instead of
plain Markdown — those won't render on Medium or Substack. The script warns
when an essay contains one; for those, cross-post the text and either drop
the diagram or swap in a screenshot of it as a regular image.
