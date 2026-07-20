"use client";

import { useState, useTransition } from "react";
import { submitContactForm } from "@/lib/actions/support";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await submitContactForm({
        name: fd.get("name") as string,
        email: fd.get("email") as string,
        phone: (fd.get("phone") as string) || undefined,
        subject: fd.get("subject") as string,
        message: fd.get("message") as string,
      });
      if (res.success) setDone(true);
      else setError(res.error);
    });
  }

  if (done) {
    return <p className="text-center text-foreground">Message sent! We&apos;ll respond within 24 hours.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input id="name" name="name" label="Name *" required />
        <Input id="email" name="email" label="Email *" type="email" required />
      </div>
      <Input id="phone" name="phone" label="Phone" />
      <Input id="subject" name="subject" label="Subject *" required />
      <Textarea id="message" name="message" label="Message *" rows={5} required />
      <Button type="submit" disabled={isPending}>{isPending ? "Sending..." : "Send Message"}</Button>
    </form>
  );
}
