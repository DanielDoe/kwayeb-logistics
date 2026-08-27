import type { UserRole } from "@/lib/constants/logistics";
import { isValidDemoRole } from "@/lib/auth/roles";

export const DEMO_SESSION_COOKIE = "kwayeb_demo_session";
export const DEMO_USERS_COOKIE = "kwayeb_demo_users";

export type CustomerFacingRole = "customer" | "business";
export type DemoUserRole = Exclude<UserRole, "guest">;

export interface DemoSession {
  id: string;
  email: string;
  fullName: string;
  company: string | null;
  role: DemoUserRole;
}

export function parseDemoSession(value: string | undefined): DemoSession | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as DemoSession;
    if (!parsed.id || !parsed.email || !isValidDemoRole(parsed.role)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
