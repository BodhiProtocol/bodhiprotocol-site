"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { useLanguageTargets } from "@/components/layout/language-switcher";
import { isNavLinkActive, navLinks, seriesLinks } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

interface MobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function MobileDrawer({ open, onOpenChange }: MobileDrawerProps) {
  const pathname = usePathname();
  const { isPtBr, enHref, ptBrHref } = useLanguageTargets();

  // Portaled to document.body: the drawer must stay fixed to the viewport,
  // but the navbar it lives under gets backdrop-blur once scrolled, and
  // backdrop-filter on an ancestor creates a new containing block for
  // position:fixed descendants — without the portal the drawer ends up
  // pinned to the header's box and scrolls away with the page instead.
  return createPortal(
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col gap-8 border-l border-border bg-background p-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <div className="flex items-center justify-between">
              <Logo />
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                autoFocus
                onClick={() => onOpenChange(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.slice(0, 2).map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index + 0.1 }}
                >
                  <Link
                    href={link.href}
                    aria-current={isNavLinkActive(pathname, link.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-2 font-heading text-lg text-foreground/80 transition-colors hover:bg-muted hover:text-foreground",
                      isNavLinkActive(pathname, link.href) && "text-brand",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.p
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * 2 + 0.1 }}
                className="px-3 pt-3 pb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase"
              >
                Series
              </motion.p>
              {seriesLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * (index + 3) + 0.1 }}
                >
                  <Link
                    href={link.href}
                    aria-current={isNavLinkActive(pathname, link.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-2 font-heading text-lg text-foreground/80 transition-colors hover:bg-muted hover:text-foreground",
                      isNavLinkActive(pathname, link.href) && "text-brand",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {navLinks.slice(2).map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * (index + 3 + seriesLinks.length) + 0.1 }}
                >
                  <Link
                    href={link.href}
                    aria-current={isNavLinkActive(pathname, link.href) ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-2 font-heading text-lg text-foreground/80 transition-colors hover:bg-muted hover:text-foreground",
                      isNavLinkActive(pathname, link.href) && "text-brand",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.p
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * (navLinks.length + seriesLinks.length) + 0.1 }}
                className="px-3 pt-3 pb-1 text-xs font-medium tracking-wide text-muted-foreground uppercase"
              >
                Language
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * (navLinks.length + seriesLinks.length + 1) + 0.1 }}
                className="flex gap-1 px-3"
              >
                <Link
                  href={enHref}
                  aria-current={!isPtBr ? "page" : undefined}
                  className={cn(
                    "rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground",
                    !isPtBr && "border-brand text-brand",
                  )}
                >
                  English
                </Link>
                <Link
                  href={ptBrHref}
                  aria-current={isPtBr ? "page" : undefined}
                  className={cn(
                    "rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground",
                    isPtBr && "border-brand text-brand",
                  )}
                >
                  Português (Brasil)
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export { MobileDrawer };
