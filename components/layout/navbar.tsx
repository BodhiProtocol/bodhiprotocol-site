"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CommandMenu } from "@/components/layout/command-menu";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Container } from "@/components/ui/container";
import { navLinks } from "@/lib/nav-links";
import type { SearchItem } from "@/lib/search-index";
import { cn } from "@/lib/utils";

function Navbar({ searchItems }: { searchItems: SearchItem[] }) {
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300 ease-out",
        scrolled ? "px-3 pt-3 sm:px-4" : "px-0 pt-0",
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl rounded-2xl border transition-all duration-300 ease-out",
          scrolled
            ? "border-border/60 bg-background/80 shadow-sm backdrop-blur-md"
            : "border-transparent bg-transparent shadow-none",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium text-foreground/70 transition-colors duration-200 hover:bg-muted hover:text-foreground",
                  pathname === link.href && "text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CommandMenu items={searchItems} />
            <ThemeToggle />
            <MobileNav />
          </div>
        </Container>
      </div>
    </header>
  );
}

export { Navbar };
