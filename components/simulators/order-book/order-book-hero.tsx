"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { BookOpenText } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface OrderBookHeroProps {
  diagram: ReactNode;
}

function OrderBookHero({ diagram }: OrderBookHeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-border">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,color-mix(in_oklab,var(--brand)_14%,transparent),transparent)]"
        animate={{ opacity: [0.75, 1, 0.75], scale: [1, 1.06, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-8 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <Badge variant="outline" className="w-fit gap-1.5 py-1 pr-3 pl-2.5 text-brand">
            <BookOpenText className="size-3" />
            Interactive Simulator
          </Badge>

          <div className="flex flex-col gap-3">
            <h1 className="font-serif text-6xl leading-[1.02] font-medium tracking-tight text-balance sm:text-7xl">
              Order Book
            </h1>
            <p className="max-w-md font-serif text-xl text-balance text-muted-foreground sm:text-2xl">
              Every market price is simply the place where buyers and sellers finally agree.
            </p>
          </div>

          <div className="h-px w-16 bg-border" />

          <p className="max-w-sm text-muted-foreground">Move the sliders, send an order, and watch price discovery happen.</p>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-fit pt-1"
          >
            <Button size="lg" nativeButton={false} render={<a href="#simulator" />}>
              Start Exploring
            </Button>
          </motion.div>
        </motion.div>

        <div className="flex flex-col items-center gap-4">{diagram}</div>
      </div>
    </div>
  );
}

export { OrderBookHero };
