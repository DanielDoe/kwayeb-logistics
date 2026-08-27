import type { UserRole } from "@/lib/constants/logistics";

export const DEMO_STAFF_PASSWORD = "KwayebStaff1!";

export interface DemoSeedUser {
  email: string;
  password: string;
  fullName: string;
  company: string | null;
  role: Exclude<UserRole, "guest">;
}

/** Pre-seeded demo accounts — merged into the demo users cookie on sign-in. */
export const DEMO_SEED_USERS: DemoSeedUser[] = [
  {
    email: "test.customer@kwayeb.test",
    password: "KwayebDemo1!",
    fullName: "Test Customer",
    company: null,
    role: "customer",
  },
  {
    email: "admin@kwayeb.test",
    password: DEMO_STAFF_PASSWORD,
    fullName: "Admin User",
    company: "Kwayeb Logistics",
    role: "admin",
  },
  {
    email: "operations@kwayeb.test",
    password: DEMO_STAFF_PASSWORD,
    fullName: "Operations Manager",
    company: "Kwayeb Logistics",
    role: "operations",
  },
  {
    email: "warehouse@kwayeb.test",
    password: DEMO_STAFF_PASSWORD,
    fullName: "Warehouse Lead",
    company: "Kwayeb Logistics",
    role: "warehouse",
  },
  {
    email: "finance@kwayeb.test",
    password: DEMO_STAFF_PASSWORD,
    fullName: "Finance Officer",
    company: "Kwayeb Logistics",
    role: "finance",
  },
  {
    email: "support@kwayeb.test",
    password: DEMO_STAFF_PASSWORD,
    fullName: "Support Agent",
    company: "Kwayeb Logistics",
    role: "support",
  },
];
