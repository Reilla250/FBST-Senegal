import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("admin_auth");
  const isAuth = !!cookie;
  return NextResponse.json({ authenticated: isAuth });
}
