"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { navLinks, seriesLinks } from "@/lib/nav-links";

function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  // Nav link labels stay in English everywhere — they're the site's branded
  // section names (Essays, BA Playbooks, Tools...) and every link still
  // points at English content except the BA Playbooks pt-br hub itself.
  // Only the surrounding interface copy switches for the pt-br experience.
  const isPtBr = pathname?.startsWith("/pt-br") ?? false;

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            {isPtBr
              ? "Roteiros visuais, Essays, BA Playbooks, Tools e Simulators para analistas de negócio que estão aprendendo mercado de capitais e sistemas complexos."
              : "Visual roadmaps, essays, BA Playbooks, tools, and simulators for business analysts learning capital markets and complex systems."}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {[...navLinks, ...seriesLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-2 sm:w-64">
          <p className="text-sm font-medium">{isPtBr ? "Boletim semanal" : "Weekly briefing"}</p>
          <NewsletterForm
            source="footer"
            {...(isPtBr
              ? {
                  placeholder: "voce@email.com",
                  ariaLabel: "Endereço de e-mail",
                  buttonLabel: "Assinar",
                  loadingLabel: "Enviando...",
                  successMessage: "Você está na lista.",
                  errorFallback: "Algo deu errado. Tente novamente.",
                }
              : {})}
          />
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">
          {isPtBr
            ? `© ${new Date().getFullYear()} BodhiProtocol. Todos os direitos reservados.`
            : `© ${new Date().getFullYear()} BodhiProtocol. All rights reserved.`}
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
