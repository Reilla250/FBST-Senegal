import { NextRequest, NextResponse } from "next/server";
import { getAllSubmissions } from "@/lib/cms";

export async function GET(req: NextRequest) {
  const authCookie = req.cookies.get("admin_auth");
  if (!authCookie || authCookie.value !== "1") {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await getAllSubmissions();
  return NextResponse.json({ ok: true, submissions });
}
