"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "";

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await signIn(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <Card>
      <CardContent className="p-6 sm:p-8">
        <form action={handleSubmit} className="space-y-4">
          {redirect && <input type="hidden" name="redirect" value={redirect} />}
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Input id="email" name="email" label="Email" type="email" required />
          <Input id="password" name="password" label="Password" type="password" required />
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted">
          No account?{" "}
          <Link href="/register" className="text-accent-text hover:underline">Register</Link>
        </p>
      </CardContent>
    </Card>
  );
}
