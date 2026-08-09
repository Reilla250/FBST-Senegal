import { NextRequest, NextResponse } from "next/server";
import { getAllPageData, savePageData, deletePageData } from "@/lib/cms";

export async function GET() {
  const pages = await getAllPageData();
  return NextResponse.json(pages);
}

export async function POST(req: NextRequest) {
  const cookie = req.cookies.get("admin_auth");
  if (!cookie) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const requiredFields = ["slug", "label", "title", "heroHeading", "images"];
  for (const field of requiredFields) {
    if (!body[field]) {
      return NextResponse.json({ ok: false, error: `Missing field ${field}.` }, { status: 400 });
    }
  }

  const page = await savePageData({
    slug: String(body.slug),
    label: String(body.label),
    title: String(body.title),
    description: String(body.description ?? ""),
    heroHeading: String(body.heroHeading),
    heroSubheading: body.heroSubheading ? String(body.heroSubheading) : undefined,
    heroText: body.heroText ? String(body.heroText) : undefined,
    heroCtaLabel: body.heroCtaLabel ? String(body.heroCtaLabel) : undefined,
    heroCtaHref: body.heroCtaHref ? String(body.heroCtaHref) : undefined,
    images: Array.isArray(body.images) ? body.images.map(String) : String(body.images).split(/[\r\n]+/).filter(Boolean),
    autoplay: Boolean(body.autoplay),
  });

  return NextResponse.json({ ok: true, page });
}

export async function DELETE(req: NextRequest) {
  const cookie = req.cookies.get("admin_auth");
  if (!cookie) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ ok: false, error: "Missing slug" }, { status: 400 });

  await deletePageData(slug);
  return NextResponse.json({ ok: true });
}
