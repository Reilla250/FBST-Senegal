import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("admin_auth");
  if (!cookie) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const file = path.join(process.cwd(), "db", "init.sql");
  try {
    const content = await fs.promises.readFile(file, "utf-8");
    return new NextResponse(content, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Unable to read schema file" }, { status: 500 });
  }
}
