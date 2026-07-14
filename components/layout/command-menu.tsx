"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SearchItem } from "@/lib/search-index";

const SearchDialog = dynamic(() =>
  import("@/components/layout/search-dialog").then((mod) => mod.SearchDialog),
);

function CommandMenu({ items }: { items: SearchItem[] }) {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setMounted(true);
        setOpen((prev) => !prev);
        return;
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, []);

  function handleOpen() {
    setMounted(true);
    setOpen(true);
  }

  return (
    <>
      <Button
        variant="outline"
        className="h-9 w-9 justify-center p-0 sm:h-8 sm:w-40 sm:justify-between sm:px-3"
        onClick={handleOpen}
      >
        <span className="flex items-center gap-2 text-muted-foreground">
          <Search className="size-4" />
          <span className="hidden sm:inline">Search</span>
        </span>
        <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline-block">
          ⌘K
        </kbd>
      </Button>
      {mounted ? <SearchDialog items={items} open={open} onOpenChange={setOpen} /> : null}
    </>
  );
}

export { CommandMenu };
