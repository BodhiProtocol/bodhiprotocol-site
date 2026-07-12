import type { MDXComponents } from "mdx/types";

// Central place to override HTML elements rendered by MDX content
// (e.g. headings, links, code blocks) with design-system components.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}
