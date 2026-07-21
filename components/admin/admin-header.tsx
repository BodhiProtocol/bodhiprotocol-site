"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/admin/logout-button";

const NAV_LINKS = [
  { href: "/admin", label: "Home" },
  { href: "/admin/live", label: "Live" },
];

export function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
      <div className="flex items-center gap-8">
        <div>
          <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
            BodhiProtocol
          </p>
          <h1 className="font-heading text-xl font-medium">Analytics</h1>
        </div>
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <LogoutButton />
    </header>
  );
}
