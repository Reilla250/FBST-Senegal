import { NextRequest, NextResponse } from "next/server";
import { hasDatabase, query } from "../../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const user = String(body.user ?? "");
  const pass = String(body.pass ?? "");

  const ADMIN_USER = process.env.ADMIN_USER ?? "admin";
  const ADMIN_PASS = process.env.ADMIN_PASS ?? "password";

  if (hasDatabase) {
    try {
      const rows = await query<any[]>(`SELECT password_hash FROM admins WHERE username = ? LIMIT 1`, [user]);
      if (Array.isArray(rows) && rows.length === 1) {
        const hash = String(rows[0].password_hash);
        const ok = await bcrypt.compare(pass, hash);
        if (ok) {
          const res = NextResponse.json({ ok: true });
          res.headers.set("Set-Cookie", `admin_auth=1; Path=/; HttpOnly; SameSite=Lax`);
          return res;
        }
      }
    } catch (e) {
      console.error("Admin login (db) error:", e);
    }
  }

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    const res = NextResponse.json({ ok: true });
    res.headers.set("Set-Cookie", `admin_auth=1; Path=/; HttpOnly; SameSite=Lax`);
    return res;
  }

  return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
}
