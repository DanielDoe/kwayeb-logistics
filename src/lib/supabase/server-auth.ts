import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getDemoSession } from "@/lib/auth/demo-session";
import { isSupabaseConfigured } from "@/lib/auth/env";
import type { Database } from "@/types/database";

export async function createAuthClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Called from Server Component — ignore
          }
        },
      },
    },
  );
}

export async function getSessionUser() {
  const demo = await getDemoSession();
  if (demo) {
    return { id: demo.id, email: demo.email };
  }

  if (!isSupabaseConfigured()) return null;

  const supabase = await createAuthClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile() {
  const demo = await getDemoSession();
  if (demo) {
    return {
      id: demo.id,
      email: demo.email,
      full_name: demo.fullName,
      company: demo.company,
      phone: null,
      whatsapp: null,
      role: demo.role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  if (!isSupabaseConfigured()) return null;

  const supabase = await createAuthClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("kwayeb_profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return profile;
}
