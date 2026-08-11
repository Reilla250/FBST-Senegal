import { NextRequest, NextResponse } from "next/server";
import { savePageImage, deletePageImage, listPageImages } from "@/lib/cms";

// Maximum accepted upload size: 10 MB (raw, before compression)
const MAX_BYTES = 10 * 1024 * 1024;

// ── Helpers ───────────────────────────────────────────────────────────────

function unauthorized() {
  return NextResponse.json(
    { ok: false, error: "Unauthorized. Please log in as admin again." },
    { status: 401 }
  );
}

function isAuthed(req: NextRequest) {
  const v = req.cookies.get("admin_auth")?.value;
  return v === "1" || v === "true";
}

/**
 * Extract a UUID-shaped image id from any of the URL forms the admin panel
 * may send:
 *   - /api/images/<id>
 *   - https://example.com/api/images/<id>
 *   - bare <id>  (36-char UUID)
 */
function extractImageId(raw: string): string | null {
  const UUID_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;
  const match = raw.match(UUID_RE);
  return match ? match[0] : null;
}

// ── GET /api/admin/upload — list stored images ────────────────────────────

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return unauthorized();

  try {
    const images = await listPageImages();
    return NextResponse.json({ ok: true, images });
  } catch (err: any) {
    console.error("Image list error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Unable to list images" },
      { status: 500 }
    );
  }
}

// ── POST /api/admin/upload — receive a file and store it in TiDB ──────────
//
// The admin panel sends a pre-compressed JPEG via Canvas.toBlob() on the
// client side (see AdminPageClient.tsx handleUpload).  We store the raw
// buffer directly — no server-side re-encoding needed.
//
// Storage strategy to minimise TiDB usage:
//   • Client compresses to JPEG at ≤80 % quality and max 1 400 px wide
//     before sending, keeping most uploads under 200 KB.
//   • We hard-reject anything over MAX_BYTES so the MEDIUMBLOB (16 MB
//     limit) is never stressed.

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return unauthorized();

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { ok: false, error: "No image file provided." },
        { status: 400 }
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        {
          ok: false,
          error: `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum is ${MAX_BYTES / 1024 / 1024} MB.`,
        },
        { status: 413 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Sanitise filename
    const safeName = (file.name || "image.jpg")
      .replace(/[^a-zA-Z0-9.\-_]/g, "_")
      .slice(0, 200);

    // Prefer JPEG to minimise storage; fall back to actual mime type
    const mimeType =
      file.type === "image/png" || file.type === "image/webp" || file.type === "image/gif"
        ? file.type          // keep original if not already JPEG
        : "image/jpeg";

    const id = await savePageImage(safeName, mimeType, buffer);
    const url = `/api/images/${id}`;

    return NextResponse.json({
      ok: true,
      url,
      id,
      storage: "tidb",
      sizeKb: Math.round(buffer.length / 1024),
      message: "Image stored in TiDB Cloud.",
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Upload failed." },
      { status: 500 }
    );
  }
}

// ── DELETE /api/admin/upload?file=<url-or-id> ─────────────────────────────

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) return unauthorized();

  const raw = req.nextUrl.searchParams.get("file") ?? "";
  if (!raw) {
    return NextResponse.json({ ok: false, error: "No file specified." }, { status: 400 });
  }

  const id = extractImageId(raw);
  if (!id) {
    // Not a TiDB-managed image (e.g. external Unsplash URL) — nothing to delete
    return NextResponse.json({ ok: true, message: "External URL — no stored image to remove." });
  }

  try {
    await deletePageImage(id);
    return NextResponse.json({ ok: true, message: "Image deleted." });
  } catch (err: any) {
    console.error("Image delete error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Delete failed." },
      { status: 500 }
    );
  }
}
