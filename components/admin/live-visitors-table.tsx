"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { formatDuration } from "@/lib/analytics/format";
import { REFERRER_LABELS } from "@/lib/analytics/referrer";
import type { LiveVisitor } from "@/lib/analytics/queries";

const POLL_INTERVAL_MS = 10_000;
const TICK_INTERVAL_MS = 1_000;

export function LiveVisitorsTable({ initialVisitors }: { initialVisitors: LiveVisitor[] }) {
  const [visitors, setVisitors] = useState(initialVisitors);
  const [fetchedAt, setFetchedAt] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());

  // Refetches the full list periodically; "time on page" itself ticks locally
  // between polls (below) so the page feels live without hammering the server.
  useEffect(() => {
    const poll = setInterval(async () => {
      try {
        const res = await fetch("/api/admin/live");
        if (!res.ok) return;
        const data: { visitors?: LiveVisitor[] } = await res.json();
        setVisitors(data.visitors ?? []);
        setFetchedAt(Date.now());
      } catch {
        // Transient network hiccup -- keep showing the last known list.
      }
    }, POLL_INTERVAL_MS);
    return () => clearInterval(poll);
  }, []);

  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), TICK_INTERVAL_MS);
    return () => clearInterval(tick);
  }, []);

  if (visitors.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-foreground/20 p-10 text-center text-sm text-muted-foreground">
        No one&apos;s on the site right now.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <AnimatePresence initial={false}>
        {visitors.map((visitor) => {
          const elapsedMs = visitor.timeOnPageMs + (now - fetchedAt);
          return (
            <motion.div
              key={visitor.sessionId}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <Card className="shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
                <CardContent className="flex flex-wrap items-center gap-x-8 gap-y-2 py-3">
                  <Field label="Location" value={visitor.location ?? "Unknown"} />
                  <Field
                    label="Current Page"
                    value={visitor.currentPage}
                    className="min-w-0 flex-1"
                  />
                  <Field label="Device" value={visitor.device ?? "Unknown"} />
                  <Field label="Referrer" value={REFERRER_LABELS[visitor.referrerSource]} />
                  <Field label="Time on Page" value={formatDuration(elapsedMs)} />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="font-mono text-[0.65rem] tracking-[0.12em] text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-0.5 truncate text-sm font-medium">{value}</p>
    </div>
  );
}
