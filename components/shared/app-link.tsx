"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent, TouchEvent } from "react";

type AppLinkProps = ComponentProps<typeof Link>;

/**
 * Site-wide replacement for next/link. Next's default prefetches every link the
 * moment it scrolls into view -- on link-heavy pages (landing grids, episode
 * lists) that fired dozens of background page fetches per visitor and blew
 * through the Vercel Hobby ISR-read quota (Oct 2026, site got paused). Here a
 * page is prefetched only on intent (hover / touch start), which keeps clicks
 * fast without the viewport-wide flood. Pass `prefetch` explicitly to opt back in.
 */
function AppLink({ prefetch, onMouseEnter, onTouchStart, href, ...props }: AppLinkProps) {
  const router = useRouter();

  const prefetchOnIntent = () => {
    if (typeof href === "string" && href.startsWith("/")) router.prefetch(href);
  };

  return (
    <Link
      href={href}
      prefetch={prefetch ?? false}
      onMouseEnter={(event: MouseEvent<HTMLAnchorElement>) => {
        if (prefetch === undefined) prefetchOnIntent();
        onMouseEnter?.(event);
      }}
      onTouchStart={(event: TouchEvent<HTMLAnchorElement>) => {
        if (prefetch === undefined) prefetchOnIntent();
        onTouchStart?.(event);
      }}
      {...props}
    />
  );
}

export { AppLink as Link };
