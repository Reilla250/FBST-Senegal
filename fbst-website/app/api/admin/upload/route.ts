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
    const cleanFilename = file.name ? file.name.replace(/[^a-zA-Z0-9.\-]/g, "_") : "image.jpg";
    const safeName = `${Date.now()}-${cleanFilename}`;

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_READ_WRITE_TOKEN;

    // Method 1: Vercel Blob Storage (Best: Fast CDN, persistent across deployments)
    if (blobToken) {
      try {
        const { put } = await import("@vercel/blob");
        const blob = await put(`uploads/${safeName}`, buffer, {
          access: "public",
          token: blobToken,
        });
        return NextResponse.json({
          ok: true,
          url: blob.url,
          storage: "vercel-blob",
          message: "File uploaded successfully to Vercel Blob CDN",
        });
      } catch (blobErr: any) {
        console.error("Vercel Blob upload failed:", blobErr);
        return NextResponse.json(
          { ok: false, error: `Vercel Blob Upload Error: ${blobErr?.message || "Failed to upload to Vercel Blob"}` },
          { status: 500 }
        );
      }
    }

    // Method 2: Local Filesystem (Works in local development)
    try {
      await fs.promises.mkdir(uploadsDir, { recursive: true });
      const dest = path.join(uploadsDir, safeName);
      await fs.promises.writeFile(dest, buffer);
      const url = `/uploads/${safeName}`;
      return NextResponse.json({
        ok: true,
        url,
        storage: "local",
        message: "File uploaded locally (Note: Set BLOB_READ_WRITE_TOKEN for production deployment)",
      });
    } catch (fsError) {
      // Method 3: Base64 fallback (only for small images in dev fallback)
      if (buffer.length > 2 * 1024 * 1024) {
        return NextResponse.json(
          {
            ok: false,
            error: "File is too large for local fallback. Please configure BLOB_READ_WRITE_TOKEN in Vercel to upload large files.",
          },
          { status: 400 }
        );
      }

      const mimeType = file.type || "image/jpeg";
      const base64Data = buffer.toString("base64");
      const url = `data:${mimeType};base64,${base64Data}`;
      return NextResponse.json({
        ok: true,
        url,
        storage: "base64",
        message: "File converted to data URL. Configure Vercel Blob token for production storage.",
      });
    }
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ ok: false, error: err?.message || "File upload failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const cookie = req.cookies.get("admin_auth");
  if (!cookie || (cookie.value !== "1" && cookie.value !== "true")) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const file = req.nextUrl.searchParams.get("file");
  if (!file) return NextResponse.json({ ok: false, error: "No file specified" }, { status: 400 });

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL_BLOB_READ_WRITE_TOKEN;

  // If it's a Vercel Blob URL, delete from blob storage
  if ((file.includes("blob.vercel-storage.com") || file.startsWith("https://")) && blobToken) {
    try {
      const { del } = await import("@vercel/blob");
      await del(file, { token: blobToken });
      return NextResponse.json({ ok: true, message: "Deleted from Vercel Blob" });
    } catch (blobErr: any) {
      console.warn("Blob delete failed:", blobErr?.message);
    }
  }

  // Local file delete
  const dest = getSafeUploadPath(file.replace("/uploads/", ""));
  if (dest.startsWith(uploadsDir)) {
    try {
      await fs.promises.unlink(dest);
    } catch {
      // File might not exist locally
    }
  }

  return NextResponse.json({ ok: true });
}
