import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSiteSettings, saveSiteSettings } from "@/lib/cms";

export async function GET() {
  const settings = await getSiteSettings();
  return NextResponse.json({ ok: true, settings });
}

export async function POST(req: NextRequest) {
  const authCookie = req.cookies.get("admin_auth");
  if (!authCookie || authCookie.value !== "1") {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const updated = await saveSiteSettings(body);
  try {
    revalidatePath("/", "layout");
  } catch (e) {
    console.error("Revalidation error:", e);
  }
  return NextResponse.json({ ok: true, settings: updated });
}
