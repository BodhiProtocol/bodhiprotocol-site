import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { navLinks } from "@/lib/nav-links";

function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Understand complex systems through essays, visual explanations, and
            interactive learning.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} BodhiProtocol. All rights reserved.
        </p>
        <a
          href="https://github.com/BodhiProtocol"
          target="_blank"
          rel="noreferrer"
          className="text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          GitHub
        </a>
      </Container>
    </footer>
  );
}

export { Footer };
