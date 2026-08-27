import { createHash, randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { DEMO_SEED_USERS } from "@/lib/auth/demo-staff-users";
import {
  DEMO_SESSION_COOKIE,
  DEMO_USERS_COOKIE,
  type CustomerFacingRole,
  type DemoSession,
  type DemoUserRole,
  parseDemoSession,
} from "@/lib/auth/demo-session-shared";

export type { CustomerFacingRole, DemoSession, DemoUserRole };
export { DEMO_SESSION_COOKIE, DEMO_USERS_COOKIE, parseDemoSession };

export interface DemoUser {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  company: string | null;
  role: DemoUserRole;
}

export function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

function parseDemoUsers(value: string | undefined): DemoUser[] {
  if (!value) return [];

  try {
    const parsed = JSON.parse(value) as DemoUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
  };
}

export async function getDemoUsers() {
  const store = await cookies();
  return parseDemoUsers(store.get(DEMO_USERS_COOKIE)?.value);
}

export async function getDemoSession() {
  const store = await cookies();
  return parseDemoSession(store.get(DEMO_SESSION_COOKIE)?.value);
}

/** Merge pre-seeded demo accounts into the users cookie if missing. */
export async function ensureDemoSeedUsers() {
  const store = await cookies();
  const existing = parseDemoUsers(store.get(DEMO_USERS_COOKIE)?.value);
  const knownEmails = new Set(existing.map((user) => user.email));
  const additions: DemoUser[] = [];

  for (const seed of DEMO_SEED_USERS) {
    const email = seed.email.trim().toLowerCase();
    if (knownEmails.has(email)) continue;

    additions.push({
      id: randomUUID(),
      email,
      passwordHash: hashPassword(seed.password),
      fullName: seed.fullName,
      company: seed.company,
      role: seed.role,
    });
    knownEmails.add(email);
  }

  if (!additions.length) return existing;

  const merged = [...existing, ...additions];
  store.set(DEMO_USERS_COOKIE, JSON.stringify(merged), cookieOptions());
  return merged;
}

export async function saveDemoUser(input: {
  email: string;
  password: string;
  fullName: string;
  company?: string;
  role: CustomerFacingRole;
}): Promise<{ error?: string; session?: DemoSession }> {
  await ensureDemoSeedUsers();
  const store = await cookies();
  const users = parseDemoUsers(store.get(DEMO_USERS_COOKIE)?.value);
  const email = input.email.trim().toLowerCase();

  if (users.some((user) => user.email === email)) {
    return { error: "An account with this email already exists." };
  }

  const user: DemoUser = {
    id: randomUUID(),
    email,
    passwordHash: hashPassword(input.password),
    fullName: input.fullName.trim(),
    company: input.company?.trim() || null,
    role: input.role,
  };

  const session: DemoSession = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    company: user.company,
    role: user.role,
  };

  store.set(DEMO_USERS_COOKIE, JSON.stringify([...users, user]), cookieOptions());
  store.set(DEMO_SESSION_COOKIE, JSON.stringify(session), cookieOptions());

  return { session };
}

export async function signInDemoUser(email: string, password: string) {
  const users = await ensureDemoSeedUsers();
  const user = users.find((entry) => entry.email === email.trim().toLowerCase());

  if (!user || user.passwordHash !== hashPassword(password)) {
    return { error: "Invalid email or password." };
  }

  const session: DemoSession = {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    company: user.company,
    role: user.role,
  };

  const store = await cookies();
  store.set(DEMO_SESSION_COOKIE, JSON.stringify(session), cookieOptions());
  return { session };
}

export async function clearDemoSession() {
  const store = await cookies();
  store.delete(DEMO_SESSION_COOKIE);
}
