import { NextRequest, NextResponse } from "next/server";
import { hasDatabase, query } from "../../../../lib/db";
import bcrypt from "bcryptjs";

const isProduction = process.env.NODE_ENV === "production";
const COOKIE_FLAGS = `Path=/; HttpOnly; SameSite=Lax; Max-Age=300${isProduction ? "; Secure" : ""}`;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const user = String(body.user ?? "");
  const pass = String(body.pass ?? "");

  const ADMIN_USER = process.env.ADMIN_USER ?? "admin@fdnlabonnesantepourtous.com";
  const ADMIN_PASS = process.env.ADMIN_PASS ?? "Nkurunziza123";

  if (hasDatabase) {
    try {
      const rows = await query<any[]>(`SELECT password_hash FROM admins WHERE username = ? LIMIT 1`, [user]);
      if (Array.isArray(rows) && rows.length === 1) {
        const hash = String(rows[0].password_hash);
        const ok = await bcrypt.compare(pass, hash);
        if (ok) {
          const res = NextResponse.json({ ok: true });
          res.headers.set("Set-Cookie", `admin_auth=1; ${COOKIE_FLAGS}`);
          return res;
        }
      }
    } catch (e) {
      console.error("Admin login (db) error:", e);
    }
  }

  if (user.toLowerCase() === ADMIN_USER.toLowerCase() && pass === ADMIN_PASS) {
    const res = NextResponse.json({ ok: true });
    res.headers.set("Set-Cookie", `admin_auth=1; ${COOKIE_FLAGS}`);
    return res;
  }

  return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
}
