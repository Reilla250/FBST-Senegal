import { NextRequest, NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // Clear cookie
  res.headers.set("Set-Cookie", `admin_auth=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`);
  return res;
}
