import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const uploadsDir = path.join(process.cwd(), "public", "uploads");

function getSafeUploadPath(fileName: string) {
  const safeName = path.basename(fileName);
  return path.join(uploadsDir, safeName);
}

export async function GET() {
  try {
    await fs.promises.mkdir(uploadsDir, { recursive: true });
    const files = await fs.promises.readdir(uploadsDir);
    return NextResponse.json({ ok: true, files: files.map((name) => `/uploads/${name}`) });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to read uploads" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get("admin_auth");
  if (!cookie || (cookie.value !== "1" && cookie.value !== "true")) {
    return NextResponse.json({ ok: false, error: "Unauthorized. Please log in as admin again." }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file") as unknown as File | null;
    if (!file || typeof file === "string") {
      return NextResponse.json({ ok: false, error: "No image file selected" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.promises.mkdir(uploadsDir, { recursive: true });

    const cleanFilename = file.name ? file.name.replace(/[^a-zA-Z0-9.\-]/g, "_") : "image.jpg";
    const safeName = `${Date.now()}-${cleanFilename}`;
    const dest = path.join(uploadsDir, safeName);
    await fs.promises.writeFile(dest, buffer);

    const url = `/uploads/${safeName}`;
    return NextResponse.json({ ok: true, url, message: "File uploaded successfully" });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "File upload failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const cookie = req.cookies.get("admin_auth");
  if (!cookie) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const file = req.nextUrl.searchParams.get("file");
  if (!file) return NextResponse.json({ ok: false, error: "No file specified" }, { status: 400 });

  const dest = getSafeUploadPath(file);
  if (!dest.startsWith(uploadsDir)) {
    return NextResponse.json({ ok: false, error: "Invalid file path" }, { status: 400 });
  }

  try {
    await fs.promises.unlink(dest);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to delete file" }, { status: 500 });
  }
}
