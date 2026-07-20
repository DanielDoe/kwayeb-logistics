"use server";

import { redirect } from "next/navigation";
import { createAuthClient } from "@/lib/supabase/server-auth";
import { authSchema } from "@/lib/validations/quotes";

export async function signIn(formData: FormData): Promise<{ error?: string } | void> {
  const parsed = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid credentials" };
  }

  const supabase = await createAuthClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) return { error: error.message };

  const redirectTo = formData.get("redirect") as string | null;
  redirect(redirectTo || "/dashboard");
}

export async function signUp(formData: FormData): Promise<{ error?: string } | void> {
  const parsed = authSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    fullName: formData.get("fullName"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createAuthClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.fullName ?? "" },
    },
  });

  if (error) return { error: error.message };

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createAuthClient();
  await supabase.auth.signOut();
  redirect("/");
}
