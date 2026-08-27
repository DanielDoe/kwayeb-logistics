/**
 * Seed demo/staff auth users into Supabase (production or staging).
 *
 * Loads .env.local automatically if present.
 *
 * Requires:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *
 * Run: npm run seed:users
 */

import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";

function loadEnvFile(filename) {
  const filePath = path.join(process.cwd(), filename);
  if (!fs.existsSync(filePath)) return;

  for (const line of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env.development.local");

const USERS = [
  {
    email: "test.customer@kwayeb.test",
    password: "KwayebDemo1!",
    fullName: "Test Customer",
    company: null,
    role: "customer",
  },
  {
    email: "admin@kwayeb.test",
    password: "KwayebStaff1!",
    fullName: "Admin User",
    company: "Kwayeb Logistics",
    role: "admin",
  },
  {
    email: "operations@kwayeb.test",
    password: "KwayebStaff1!",
    fullName: "Operations Manager",
    company: "Kwayeb Logistics",
    role: "operations",
  },
  {
    email: "warehouse@kwayeb.test",
    password: "KwayebStaff1!",
    fullName: "Warehouse Lead",
    company: "Kwayeb Logistics",
    role: "warehouse",
  },
  {
    email: "finance@kwayeb.test",
    password: "KwayebStaff1!",
    fullName: "Finance Officer",
    company: "Kwayeb Logistics",
    role: "finance",
  },
  {
    email: "support@kwayeb.test",
    password: "KwayebStaff1!",
    fullName: "Support Agent",
    company: "Kwayeb Logistics",
    role: "support",
  },
];

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    console.error(
      "Missing Supabase credentials.\n\n" +
        "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY, then rerun:\n" +
        "  npm run seed:users\n\n" +
        "Get keys from Supabase → Project Settings → API.\n" +
        "Use the same values as your Vercel production env for kwayeblogistics.com.",
    );
    process.exit(1);
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  console.log(`Seeding ${USERS.length} users into ${url}...\n`);

  for (const user of USERS) {
    const email = user.email.toLowerCase();

    const { data: listed, error: listError } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

    if (listError) {
      console.error("Failed to list users:", listError.message);
      process.exit(1);
    }

    const existing = listed.users.find((u) => u.email?.toLowerCase() === email);

    if (existing) {
      const { error: updateError } = await supabase.auth.admin.updateUserById(existing.id, {
        password: user.password,
        user_metadata: {
          full_name: user.fullName,
          role: user.role,
          company: user.company ?? "",
        },
      });

      if (updateError) {
        console.error(`✗ ${email}: ${updateError.message}`);
        continue;
      }

      await supabase
        .from("kwayeb_profiles")
        .update({
          full_name: user.fullName,
          role: user.role,
          company: user.company,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      console.log(`↻ updated ${email} (${user.role})`);
      continue;
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password: user.password,
      email_confirm: true,
      user_metadata: {
        full_name: user.fullName,
        role: user.role,
        company: user.company ?? "",
      },
    });

    if (error) {
      console.error(`✗ ${email}: ${error.message}`);
      continue;
    }

    console.log(`✓ created ${email} (${user.role}) → ${data.user?.id ?? "ok"}`);
  }

  console.log("\nDone. Sign in at /login with the seeded emails and passwords.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
