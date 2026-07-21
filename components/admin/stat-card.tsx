"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  subtitle,
  delay = 0,
  className,
}: {
  label: string;
  value: string;
  subtitle?: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: delay * 0.04, ease: "easeOut" }}
    >
      <Card
        className={cn(
          "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] transition-shadow hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-8px_rgba(0,0,0,0.12)]",
          className,
        )}
      >
        <CardContent className="py-2">
          <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
            {label}
          </p>
          <p className="mt-2 truncate font-heading text-3xl font-medium tracking-tight">
            {value}
          </p>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </CardContent>
      </Card>
    </motion.div>
  );
}
