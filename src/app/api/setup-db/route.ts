import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import pg from "pg";

export async function POST(request: Request) {
  const secret = request.headers.get("x-setup-secret");
  const expected = process.env.SETUP_SECRET ?? process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(-32);

  if (!secret || secret !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dbUrl = process.env.DATABASE_URL ?? process.env.SUPABASE_DB_URL;

  if (!dbUrl) {
    return NextResponse.json(
      {
        error: "Missing DATABASE_URL. Add it from Supabase → Settings → Database → Connection string.",
      },
      { status: 500 },
    );
  }

  const migrationPath = path.join(
    process.cwd(),
    "supabase/migrations/20260720000000_kwayeb_logistics.sql",
  );
  const sql = fs.readFileSync(migrationPath, "utf8");

  const client = new pg.Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } });

  try {
    await client.connect();
    await client.query(sql);
    return NextResponse.json({ success: true, message: "Database schema applied." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Migration failed";
    return NextResponse.json({ error: message }, { status: 500 });
  } finally {
    await client.end();
  }
}
