import fs from "node:fs";
import path from "node:path";
import pg from "pg";

const { Client } = pg;

async function main() {
  const dbUrl = process.env.DATABASE_URL ?? process.env.SUPABASE_DB_URL;

  if (!dbUrl) {
    console.error(
      "Missing DATABASE_URL or SUPABASE_DB_URL.\n" +
        "Get it from Supabase → Project Settings → Database → Connection string (URI).\n" +
        "Then run: DATABASE_URL='postgresql://...' npm run db:setup",
    );
    process.exit(1);
  }

  const migrationFiles = [
    "20260720000000_kwayeb_logistics.sql",
    "20260720000001_kwayeb_features.sql",
  ];

  const sql = migrationFiles
    .map((f) => fs.readFileSync(path.join(process.cwd(), "supabase/migrations", f), "utf8"))
    .join("\n\n");

  const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

  try {
    await client.connect();
    await client.query(sql);
    console.log("✓ KWAYEB LOGISTICS database schema applied successfully.");
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
