"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  /** Where on the site this form was rendered, stored alongside the email. */
  source: string;
  className?: string;
  placeholder?: string;
  ariaLabel?: string;
  buttonLabel?: string;
  loadingLabel?: string;
  successMessage?: string;
  errorFallback?: string;
}

function NewsletterForm({
  source,
  className,
  placeholder = "you@email.com",
  ariaLabel = "Email address",
  buttonLabel = "Subscribe",
  loadingLabel = "Subscribing...",
  successMessage = "You're on the list.",
  errorFallback = "Something went wrong. Try again.",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website, source }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError(data.error ?? errorFallback);
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError(errorFallback);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className={cn("flex items-center gap-2 text-sm font-medium text-brand", className)}>
        <Check className="size-4" />
        {successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("flex flex-col gap-2", className)}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          disabled={status === "loading"}
          className="h-10 flex-1"
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          className="hidden"
          aria-hidden="true"
        />
        <Button type="submit" disabled={status === "loading"} className="h-10 shrink-0 px-5">
          {status === "loading" ? loadingLabel : buttonLabel}
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </form>
  );
}

export { NewsletterForm };
