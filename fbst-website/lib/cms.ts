import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { query, hasDatabase } from "@/lib/db";

const CONTENT_PATH = path.join(process.cwd(), "data", "site-content.json");
const SUBMISSIONS_PATH = path.join(process.cwd(), "data", "submissions.json");

type RawPageContent = {
  slug: string;
  label: string;
  title: string;
  description: string;
  heroHeading: string;
  heroSubheading?: string;
  heroText?: string;
  heroCtaLabel?: string;
  heroCtaHref?: string;
  images: string[];
  autoplay: boolean;
};

export type PageContent = RawPageContent;

export type ContactSubmission = {
  id: string;
  receivedAt: string;
  name: string;
  contact: string;
  reason: string;
  preferredMethod: string;
  preferredTime?: string;
  message: string;
  consent: boolean;
};

async function readFallbackContent(): Promise<PageContent[]> {
  try {
    const raw = await fs.readFile(CONTENT_PATH, "utf-8");
    return JSON.parse(raw) as PageContent[];
  } catch {
    return [];
  }
}

async function writeFallbackContent(pages: PageContent[]) {
  await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
  await fs.writeFile(CONTENT_PATH, JSON.stringify(pages, null, 2), "utf-8");
}

async function readFallbackSubmissions(): Promise<ContactSubmission[]> {
  try {
    const raw = await fs.readFile(SUBMISSIONS_PATH, "utf-8");
    return JSON.parse(raw) as ContactSubmission[];
  } catch {
    return [];
  }
}

async function writeFallbackSubmissions(items: ContactSubmission[]) {
  await fs.mkdir(path.dirname(SUBMISSIONS_PATH), { recursive: true });
  await fs.writeFile(SUBMISSIONS_PATH, JSON.stringify(items, null, 2), "utf-8");
}

export async function getAllPageData(): Promise<PageContent[]> {
  if (hasDatabase) {
    const rows = await query<any[]>("SELECT * FROM pages ORDER BY slug");
    if (Array.isArray(rows) && rows.length > 0) {
      return rows.map((row) => ({
        slug: String(row.slug),
        label: String(row.label),
        title: String(row.title),
        description: String(row.description ?? ""),
        heroHeading: String(row.hero_heading ?? ""),
        heroSubheading: row.hero_subheading ? String(row.hero_subheading) : undefined,
        heroText: row.hero_text ? String(row.hero_text) : undefined,
        heroCtaLabel: row.hero_cta_label ? String(row.hero_cta_label) : undefined,
        heroCtaHref: row.hero_cta_href ? String(row.hero_cta_href) : undefined,
        images: Array.isArray(row.images) ? (row.images as string[]) : JSON.parse(String(row.images ?? "[]")),
        autoplay: Boolean(row.autoplay),
      }));
    }
  }

  return readFallbackContent();
}

export async function getPageData(slug: string): Promise<PageContent> {
  const pages = await getAllPageData();
  const page = pages.find((item) => item.slug === slug);
  return (
    page ?? {
      slug,
      label: slug,
      title: slug.replace(/[-/]/g, " "),
      description: "",
      heroHeading: "",
      heroSubheading: undefined,
      heroText: undefined,
      heroCtaLabel: undefined,
      heroCtaHref: undefined,
      images: [],
      autoplay: true,
    }
  );
}

export async function savePageData(page: PageContent): Promise<PageContent> {
  if (hasDatabase) {
    await query(
      `INSERT INTO pages(
        slug,
        label,
        title,
        description,
        hero_heading,
        hero_subheading,
        hero_text,
        hero_cta_label,
        hero_cta_href,
        images,
        autoplay
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        label = VALUES(label),
        title = VALUES(title),
        description = VALUES(description),
        hero_heading = VALUES(hero_heading),
        hero_subheading = VALUES(hero_subheading),
        hero_text = VALUES(hero_text),
        hero_cta_label = VALUES(hero_cta_label),
        hero_cta_href = VALUES(hero_cta_href),
        images = VALUES(images),
        autoplay = VALUES(autoplay);`,
      [
        page.slug,
        page.label,
        page.title,
        page.description,
        page.heroHeading,
        page.heroSubheading ?? null,
        page.heroText ?? null,
        page.heroCtaLabel ?? null,
        page.heroCtaHref ?? null,
        JSON.stringify(page.images || []),
        page.autoplay,
      ]
    );
    return page;
  }

  const pages = await readFallbackContent();
  const updated = pages.filter((item) => item.slug !== page.slug).concat(page);
  await writeFallbackContent(updated);
  return page;
}

export async function deletePageData(slug: string): Promise<void> {
  if (hasDatabase) {
    await query(`DELETE FROM pages WHERE slug = ?`, [slug]);
    return;
  }

  const pages = await readFallbackContent();
  const updated = pages.filter((item) => item.slug !== slug);
  if (updated.length !== pages.length) {
    await writeFallbackContent(updated);
  }
}

export async function saveContactSubmission(submission: Omit<ContactSubmission, "id" | "receivedAt">) {
  if (hasDatabase) {
    await query(
      `INSERT INTO contact_submissions(
        id,
        name,
        contact,
        reason,
        preferred_method,
        preferred_time,
        message,
        consent
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        crypto.randomUUID(),
        submission.name,
        submission.contact,
        submission.reason,
        submission.preferredMethod,
        submission.preferredTime ?? null,
        submission.message,
        submission.consent,
      ]
    );
    return;
  }

  const now = new Date().toISOString();
  const current = await readFallbackSubmissions();
  const item: ContactSubmission = {
    id: crypto.randomUUID(),
    receivedAt: now,
    ...submission,
  };
  current.push(item);
  await writeFallbackSubmissions(current);
}
