"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await response.json().catch(() => null);
      setError(data?.error ?? "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="w-full max-w-sm"
      >
        <Card className="shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)]">
          <CardContent className="py-2">
            <p className="font-mono text-xs tracking-[0.15em] text-muted-foreground uppercase">
              BodhiProtocol
            </p>
            <h1 className="mt-1 font-heading text-2xl font-medium">Analytics</h1>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
              <Input
                type="password"
                autoFocus
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={error != null}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" disabled={loading || password.length === 0}>
                {loading ? "Checking..." : "Unlock"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
