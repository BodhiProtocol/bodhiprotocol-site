"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";

import { CommandMenu } from "@/components/layout/command-menu";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Container } from "@/components/ui/container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLinkItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isNavLinkActive, navLinks, seriesLinks } from "@/lib/nav-links";
import type { SearchItem } from "@/lib/search-index";
import { cn } from "@/lib/utils";

const navLinkClassName =
  "rounded-full px-2.5 py-1.5 text-sm font-medium text-foreground/70 transition-colors duration-200 hover:bg-muted hover:text-foreground";

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
          <Logo className={pathname === "/" ? "hero-enter" : undefined} />

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isNavLinkActive(pathname, link.href) ? "page" : undefined}
                className={cn(
                  navLinkClassName,
                  isNavLinkActive(pathname, link.href) && "text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  navLinkClassName,
                  "inline-flex items-center gap-1",
                  seriesLinks.some((link) => isNavLinkActive(pathname, link.href)) &&
                    "text-foreground",
                )}
              >
                Series
                <ChevronDownIcon className="size-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {seriesLinks.map((link) => (
                  <DropdownMenuLinkItem
                    key={link.href}
                    render={<Link href={link.href} />}
                    aria-current={isNavLinkActive(pathname, link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </DropdownMenuLinkItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isNavLinkActive(pathname, link.href) ? "page" : undefined}
                className={cn(
                  navLinkClassName,
                  isNavLinkActive(pathname, link.href) && "text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <LanguageSwitcher className="hidden lg:inline-flex" />
            <CommandMenu items={searchItems} />
            <ThemeToggle className="hidden lg:inline-flex" />
            <MobileNav />
          </div>
        </Container>
      </div>
    </header>
  );
}

export { Navbar };
