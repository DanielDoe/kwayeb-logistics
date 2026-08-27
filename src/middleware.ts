import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { DEMO_SESSION_COOKIE, parseDemoSession } from "@/lib/auth/demo-session-shared";
import { isSupabaseConfigured } from "@/lib/auth/env";
import { canAccessAdminPath, getDefaultStaffRedirect, isStaffRole } from "@/lib/auth/roles";

const PROTECTED_PREFIXES = ["/dashboard"];
const ADMIN_PREFIXES = ["/admin"];

function redirectToLogin(request: NextRequest, path: string) {
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("redirect", path);
  return NextResponse.redirect(url);
}

function redirectToDashboard(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/dashboard";
  return NextResponse.redirect(url);
}

function redirectToStaffHome(request: NextRequest, role: string) {
  const url = request.nextUrl.clone();
  url.pathname = getDefaultStaffRedirect(role);
  return NextResponse.redirect(url);
}

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const path = request.nextUrl.pathname;
  const isProtected = PROTECTED_PREFIXES.some((prefix) => path.startsWith(prefix));
  const isAdmin = ADMIN_PREFIXES.some((prefix) => path.startsWith(prefix));

  if (!isProtected && !isAdmin) {
    return supabaseResponse;
  }

  if (!isSupabaseConfigured()) {
    const session = parseDemoSession(request.cookies.get(DEMO_SESSION_COOKIE)?.value);

    if (!session) {
      return redirectToLogin(request, path);
    }

    if (isAdmin) {
      if (!isStaffRole(session.role)) {
        return redirectToDashboard(request);
      }
      if (!canAccessAdminPath(session.role, path)) {
        return redirectToStaffHome(request, session.role);
      }
    }

    return supabaseResponse;
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirectToLogin(request, path);
  }

  if (isAdmin) {
    const { data: profile } = await supabase
      .from("kwayeb_profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    const role = profile?.role;
    if (!role || !isStaffRole(role)) {
      return redirectToDashboard(request);
    }
    if (!canAccessAdminPath(role, path)) {
      return redirectToStaffHome(request, role);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/admin", "/admin/:path*"],
};
