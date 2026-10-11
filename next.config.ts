import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

// `npm run build:static` sets this to produce a plain-files site (out/) that any
// static host can serve, e.g. Cloudflare Pages. Server-only features (admin,
// /api, middleware) are left out of that build -- see scripts/build-static.mjs.
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  output: isStaticExport ? "export" : undefined,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isStaticExport,
  },
  poweredByHeader: false,
  // Static hosts can't run these; build-static.mjs writes them to out/_redirects.
  ...(!isStaticExport && { redirects }),
};

async function redirects() {
  return [
    { source: "/labs", destination: "/tools", permanent: true },
    { source: "/navigator", destination: "/lighthouse#suggested-path", permanent: true },
  ];
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
      [
        rehypePrettyCode,
        {
          theme: { dark: "github-dark", light: "github-light" },
          keepBackground: false,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
