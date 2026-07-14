"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

const MobileDrawer = dynamic(() =>
  import("@/components/layout/mobile-drawer").then((mod) => mod.MobileDrawer),
);

function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function handleOpen() {
    setMounted(true);
    setOpen(true);
  }

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={handleOpen}
      >
        <Menu className="size-5" />
      </Button>
      {mounted ? <MobileDrawer open={open} onOpenChange={setOpen} /> : null}
    </div>
  );
}

export { MobileNav };
