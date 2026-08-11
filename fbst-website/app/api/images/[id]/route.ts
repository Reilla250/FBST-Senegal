import { NextRequest, NextResponse } from "next/server";
import { getPageImage } from "@/lib/cms";

// Images are immutable once uploaded (same id → same bytes), so we can
// cache aggressively.  1 year in the browser, stale-while-revalidate on
// the CDN edge.
const CACHE_CONTROL =
  "public, max-age=31536000, stale-while-revalidate=86400, immutable";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Basic UUID validation — prevents arbitrary string DB queries
  const UUID_RE =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!UUID_RE.test(id)) {
    return new NextResponse("Not found", { status: 404 });
  }

  try {
    const image = await getPageImage(id);

    if (!image) {
      return new NextResponse("Image not found", { status: 404 });
    }

    return new NextResponse(image.data, {
      status: 200,
      headers: {
        "Content-Type":  image.mimeType,
        "Content-Length": String(image.data.length),
        "Cache-Control":  CACHE_CONTROL,
        // ETag based on id — content never changes for a given id
        ETag:            `"${id}"`,
      },
    });
  } catch (err) {
    console.error("Image serve error:", err);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
