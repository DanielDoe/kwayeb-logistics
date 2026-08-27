"use server";

import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/auth/env";
import { clearDemoSession, saveDemoUser, signInDemoUser } from "@/lib/auth/demo-session";
import { getDefaultStaffRedirect, isStaffRole } from "@/lib/auth/roles";
import { createAuthClient } from "@/lib/supabase/server-auth";
import { authSchema, signUpSchema } from "@/lib/validations/quotes";

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

export async function signIn(formData: FormData): Promise<{ error?: string } | void> {
  const parsed = authSchema.safeParse({
    email: field(formData, "email"),
    password: field(formData, "password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid credentials" };
  }

  if (!isSupabaseConfigured()) {
    const result = await signInDemoUser(parsed.data.email, parsed.data.password);
    if (result.error) return { error: result.error };
    const redirectTo = formData.get("redirect") as string | null;
    if (redirectTo) redirect(redirectTo);
    if (result.session && isStaffRole(result.session.role)) {
      redirect(getDefaultStaffRedirect(result.session.role));
    }
    redirect("/dashboard");
  }

  const supabase = await createAuthClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) return { error: error.message };

  const redirectTo = formData.get("redirect") as string | null;
  redirect(redirectTo || "/dashboard");
}

export async function signUp(formData: FormData): Promise<{ error?: string } | void> {
  const parsed = signUpSchema.safeParse({
    email: field(formData, "email"),
    password: field(formData, "password"),
    confirmPassword: field(formData, "confirmPassword"),
    fullName: field(formData, "fullName"),
    role: field(formData, "role") || "customer",
    company: field(formData, "company"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const role = parsed.data.role === "business" ? "business" : "customer";
  const company = parsed.data.company?.trim() || "";

  if (role === "business" && !company) {
    return { error: "Company name is required for business accounts." };
  }

  if (!isSupabaseConfigured()) {
    const result = await saveDemoUser({
      email: parsed.data.email,
      password: parsed.data.password,
      fullName: parsed.data.fullName ?? parsed.data.email.split("@")[0],
      company,
      role,
    });
    if (result.error) return { error: result.error };
    redirect("/dashboard");
  }

  const supabase = await createAuthClient();
  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {
        full_name: parsed.data.fullName ?? "",
        role,
        company,
      },
    },
  });

  if (error) return { error: error.message };

  redirect("/dashboard");
}

export async function signOut() {
  if (isSupabaseConfigured()) {
    const supabase = await createAuthClient();
    await supabase.auth.signOut();
  }

  await clearDemoSession();
  redirect("/");
}
