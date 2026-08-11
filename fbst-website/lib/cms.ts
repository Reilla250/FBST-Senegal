import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { query, hasDatabase } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

// ── JSON fallback paths (used when DATABASE_URL is not configured) ─────────
const CONTENT_PATH     = path.join(process.cwd(), "data", "site-content.json");
const SUBMISSIONS_PATH = path.join(process.cwd(), "data", "submissions.json");
const SETTINGS_PATH    = path.join(process.cwd(), "data", "site-settings.json");

const TMP_CONTENT_PATH     = path.join("/tmp", "site-content.json");
const TMP_SUBMISSIONS_PATH = path.join("/tmp", "submissions.json");
const TMP_SETTINGS_PATH    = path.join("/tmp", "site-settings.json");

// ── Global in-memory caches (survive hot-reload in dev) ───────────────────
declare global {
  // eslint-disable-next-line no-var
  var __memoryPagesCache__: PageContent[] | undefined;
  // eslint-disable-next-line no-var
  var __memorySettingsCache__: SiteSettings | undefined;
  // eslint-disable-next-line no-var
  var __memorySubmissionsCache__: ContactSubmission[] | undefined;
}

// ── Types ─────────────────────────────────────────────────────────────────
export type PageContent = {
  slug: string;
  label: string;
  title: string;
  description: string;
  heroHeading: string;
  heroSubheading?: string;
  heroText?: string;
  heroCtaLabel?: string;
  heroCtaHref?: string;
  /** Array of URLs — either absolute (Unsplash/external) or /api/images/<id> */
  images: string[];
  autoplay: boolean;
};

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

export type NavItem     = { label: string; href: string };
export type ProgramItem = { n: string; title: string; text: string };
export type StatItem    = { value: string; label: string };

export type SiteSettings = {
  siteName: string;
  legalName: string;
  registrationNo: string;
  email: string;
  phone: string;
  address: string;
  primaryNav: NavItem[];
  programs: ProgramItem[];
  stats: StatItem[];
};

// ── Stored image metadata (returned by listPageImages) ────────────────────
export type StoredImage = {
  id: string;
  filename: string;
  mimeType: string;
  sizeBytes: number;
  createdAt: string;
  /** Absolute path that Next.js <Image> or <img> can use */
  url: string;
};

// ── Default settings (used when nothing is stored yet) ───────────────────
const defaultSettings: SiteSettings = {
  siteName: "FBST-Senegal",
  legalName: "Fondation La Bonne Santé Pour Tous",
  registrationNo: "978",
  email: "info@fdnlabonnesantepourtous.org",
  phone: "+221 77 857 70 78",
  address: "Dakar, Senegal",
  primaryNav: [
    { label: "Home",    href: "/" },
    { label: "About",   href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Impact",  href: "/impact" },
    { label: "Contact", href: "/contact" },
  ],
  programs: [
    { n: "01", title: "Youth mental health and school return",       text: "We support young people aged 10 to 24 through confidential identification, wellbeing circles, individual support plans, family-school mediation and safe referral." },
    { n: "02", title: "HIV prevention and treatment continuity",     text: "We provide clear HIV prevention and treatment information, confidential testing referrals, treatment re-linkage, adherence support and follow-up." },
    { n: "03", title: "Peer navigation and safe linkage to care",    text: "Trusted and supervised peers help people understand their options, agree on a safe referral plan, reach an appropriate service and receive respectful follow-up." },
    { n: "04", title: "Sexual and reproductive health support",      text: "We provide non-judgemental information and referral related to sexual and reproductive health, PrEP, STI services, safer sex, counselling and youth-friendly care." },
    { n: "05", title: "Rights, protection and anti-stigma action",   text: "We help people understand confidentiality, informed consent, respectful care and safe ways to seek help after stigma, discrimination, violence, blackmail or forced disclosure." },
    { n: "06", title: "Health-system partnership and accountability", text: "We work with schools, health facilities, public services, community groups and civil-society partners to improve referrals, confidentiality and respectful communication." },
  ],
  stats: [
    { value: "210",   label: "young people joined the NOUVEAU DÉPART pilot" },
    { value: "181",   label: "completed the NOUVEAU DÉPART pathway" },
    { value: "69%",   label: "reported improved psychosocial wellbeing" },
    { value: "1,847", label: "community members reached with stigma-reduction information" },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// SITE SETTINGS
// ═══════════════════════════════════════════════════════════════════════════

export async function getSiteSettings(): Promise<SiteSettings> {
  noStore();

  if (globalThis.__memorySettingsCache__) {
    return globalThis.__memorySettingsCache__;
  }

  // ── Try TiDB ─────────────────────────────────────────────────────────────
  if (hasDatabase) {
    try {
      const rows = await query<any[]>(
        `SELECT data FROM site_settings WHERE id = 1 LIMIT 1`
      );
      if (Array.isArray(rows) && rows.length > 0) {
        const raw = typeof rows[0].data === "string"
          ? JSON.parse(rows[0].data)
          : rows[0].data;
        const data: SiteSettings = { ...defaultSettings, ...raw };
        globalThis.__memorySettingsCache__ = data;
        return data;
      }
    } catch (err) {
      console.warn("DB settings read failed; using fallback:", err);
    }
  }

  // ── JSON file fallback ────────────────────────────────────────────────────
  for (const filePath of [TMP_SETTINGS_PATH, SETTINGS_PATH]) {
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      const data: SiteSettings = { ...defaultSettings, ...JSON.parse(raw) };
      globalThis.__memorySettingsCache__ = data;
      return data;
    } catch {}
  }

  return defaultSettings;
}

export async function saveSiteSettings(
  settings: Partial<SiteSettings>
): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const updated: SiteSettings = { ...current, ...settings };
  globalThis.__memorySettingsCache__ = updated;

  // ── Persist to TiDB ───────────────────────────────────────────────────────
  if (hasDatabase) {
    try {
      await query(
        `INSERT INTO site_settings (id, data) VALUES (1, ?)
         ON DUPLICATE KEY UPDATE data = VALUES(data), updated_at = CURRENT_TIMESTAMP`,
        [JSON.stringify(updated)]
      );
      return updated;
    } catch (err) {
      console.warn("DB settings write failed; falling back to file:", err);
    }
  }

  // ── JSON file fallback ────────────────────────────────────────────────────
  for (const filePath of [SETTINGS_PATH, TMP_SETTINGS_PATH]) {
    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(updated, null, 2), "utf-8");
      return updated;
    } catch {}
  }
  console.warn("Unable to persist site settings anywhere.");
  return updated;
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE CONTENT
// ═══════════════════════════════════════════════════════════════════════════

async function readFallbackContent(): Promise<PageContent[]> {
  if (globalThis.__memoryPagesCache__) return globalThis.__memoryPagesCache__;
  for (const filePath of [TMP_CONTENT_PATH, CONTENT_PATH]) {
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      const pages = JSON.parse(raw) as PageContent[];
      globalThis.__memoryPagesCache__ = pages;
      return pages;
    } catch {}
  }
  return [];
}

async function writeFallbackContent(pages: PageContent[]) {
  globalThis.__memoryPagesCache__ = pages;
  for (const filePath of [CONTENT_PATH, TMP_CONTENT_PATH]) {
    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(pages, null, 2), "utf-8");
      return;
    } catch {}
  }
  console.warn("Unable to persist page content to disk/tmp.");
}

export async function getAllPageData(): Promise<PageContent[]> {
  noStore();
  const fallbackPages = await readFallbackContent();
  const fallbackMap = new Map(fallbackPages.map((p) => [p.slug, p.images]));

  if (hasDatabase) {
    try {
      const rows = await query<any[]>("SELECT * FROM pages ORDER BY slug");
      if (Array.isArray(rows) && rows.length > 0) {
        return rows.map((row) => {
          const slug = String(row.slug);

          let rawImages: string[] = [];
          try {
            rawImages = Array.isArray(row.images)
              ? (row.images as string[])
              : JSON.parse(String(row.images ?? "[]"));
          } catch {}

          // Strip data: URLs and empty strings; keep /api/images/* and http(s) URLs
          const validImages = rawImages.filter(
            (img) =>
              img &&
              typeof img === "string" &&
              !img.startsWith("data:") &&
              !img.startsWith("/uploads/")
          );

          const finalImages =
            validImages.length > 0
              ? validImages
              : fallbackMap.get(slug) || [];

          return {
            slug,
            label:          String(row.label),
            title:          String(row.title),
            description:    String(row.description ?? ""),
            heroHeading:    String(row.hero_heading ?? ""),
            heroSubheading: row.hero_subheading ? String(row.hero_subheading) : undefined,
            heroText:       row.hero_text        ? String(row.hero_text)        : undefined,
            heroCtaLabel:   row.hero_cta_label   ? String(row.hero_cta_label)   : undefined,
            heroCtaHref:    row.hero_cta_href     ? String(row.hero_cta_href)    : undefined,
            images:         finalImages,
            autoplay:       Boolean(row.autoplay),
          } as PageContent;
        });
      }
    } catch (err) {
      console.warn("DB pages query failed; using JSON fallback:", err);
    }
  }

  return fallbackPages;
}

export async function getPageData(slug: string): Promise<PageContent> {
  const pages = await getAllPageData();
  return (
    pages.find((p) => p.slug === slug) ?? {
      slug,
      label:       slug,
      title:       slug.replace(/[-/]/g, " "),
      description: "",
      heroHeading: "",
      images:      [],
      autoplay:    true,
    }
  );
}

export async function savePageData(page: PageContent): Promise<PageContent> {
  if (hasDatabase) {
    await query(
      `INSERT INTO pages (
        slug, label, title, description,
        hero_heading, hero_subheading, hero_text,
        hero_cta_label, hero_cta_href, images, autoplay
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        label           = VALUES(label),
        title           = VALUES(title),
        description     = VALUES(description),
        hero_heading    = VALUES(hero_heading),
        hero_subheading = VALUES(hero_subheading),
        hero_text       = VALUES(hero_text),
        hero_cta_label  = VALUES(hero_cta_label),
        hero_cta_href   = VALUES(hero_cta_href),
        images          = VALUES(images),
        autoplay        = VALUES(autoplay);`,
      [
        page.slug,
        page.label,
        page.title,
        page.description,
        page.heroHeading,
        page.heroSubheading ?? null,
        page.heroText       ?? null,
        page.heroCtaLabel   ?? null,
        page.heroCtaHref    ?? null,
        JSON.stringify(page.images || []),
        page.autoplay,
      ]
    );
    return page;
  }

  const pages = await readFallbackContent();
  const updated = pages.filter((p) => p.slug !== page.slug).concat(page);
  await writeFallbackContent(updated);
  return page;
}

export async function deletePageData(slug: string): Promise<void> {
  if (hasDatabase) {
    await query(`DELETE FROM pages WHERE slug = ?`, [slug]);
    return;
  }
  const pages = await readFallbackContent();
  const updated = pages.filter((p) => p.slug !== slug);
  if (updated.length !== pages.length) await writeFallbackContent(updated);
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTACT SUBMISSIONS
// ═══════════════════════════════════════════════════════════════════════════

async function readFallbackSubmissions(): Promise<ContactSubmission[]> {
  if (globalThis.__memorySubmissionsCache__) return globalThis.__memorySubmissionsCache__;
  for (const filePath of [TMP_SUBMISSIONS_PATH, SUBMISSIONS_PATH]) {
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      const items = JSON.parse(raw) as ContactSubmission[];
      globalThis.__memorySubmissionsCache__ = items;
      return items;
    } catch {}
  }
  return [];
}

async function writeFallbackSubmissions(items: ContactSubmission[]) {
  globalThis.__memorySubmissionsCache__ = items;
  for (const filePath of [SUBMISSIONS_PATH, TMP_SUBMISSIONS_PATH]) {
    try {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(items, null, 2), "utf-8");
      return;
    } catch {}
  }
  console.warn("Unable to persist submissions.");
}

export async function saveContactSubmission(
  submission: Omit<ContactSubmission, "id" | "receivedAt">
) {
  if (hasDatabase) {
    await query(
      `INSERT INTO contact_submissions (
        id, name, contact, reason,
        preferred_method, preferred_time, message, consent
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

  const current = await readFallbackSubmissions();
  current.push({
    id:         crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    ...submission,
  });
  await writeFallbackSubmissions(current);
}

export async function getAllSubmissions(): Promise<ContactSubmission[]> {
  if (hasDatabase) {
    try {
      const rows = await query<any[]>(
        `SELECT * FROM contact_submissions ORDER BY received_at DESC`
      );
      if (Array.isArray(rows)) {
        return rows.map((r) => ({
          id:              String(r.id),
          receivedAt:      String(r.received_at ?? r.receivedAt ?? new Date().toISOString()),
          name:            String(r.name),
          contact:         String(r.contact),
          reason:          String(r.reason),
          preferredMethod: String(r.preferred_method ?? r.preferredMethod),
          preferredTime:   r.preferred_time ? String(r.preferred_time) : undefined,
          message:         String(r.message),
          consent:         Boolean(r.consent),
        }));
      }
    } catch {
      // fall through to JSON fallback
    }
  }
  return readFallbackSubmissions();
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE IMAGES  (binary blobs stored in TiDB)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Persist a compressed image buffer to TiDB and return the image id.
 * The caller is responsible for compressing the buffer before passing it in
 * (the upload route does this via Canvas on the client side).
 */
export async function savePageImage(
  filename: string,
  mimeType: string,
  buffer: Buffer
): Promise<string> {
  const id = crypto.randomUUID();

  if (hasDatabase) {
    await query(
      `INSERT INTO page_images (id, filename, mime_type, size_bytes, data)
       VALUES (?, ?, ?, ?, ?)`,
      [id, filename, mimeType, buffer.length, buffer]
    );
    return id;
  }

  // Fallback: write to local /tmp/uploads/<id>
  const dir = path.join("/tmp", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, id), buffer);
  return id;
}

/**
 * Read an image from TiDB. Returns null if not found.
 */
export async function getPageImage(
  id: string
): Promise<{ data: Buffer; mimeType: string; filename: string } | null> {
  if (hasDatabase) {
    try {
      const rows = await query<any[]>(
        `SELECT data, mime_type, filename FROM page_images WHERE id = ? LIMIT 1`,
        [id]
      );
      if (Array.isArray(rows) && rows.length > 0) {
        const row = rows[0];
        return {
          data:     Buffer.isBuffer(row.data) ? row.data : Buffer.from(row.data),
          mimeType: String(row.mime_type),
          filename: String(row.filename),
        };
      }
    } catch (err) {
      console.warn("DB image read failed:", err);
    }
    return null;
  }

  // Fallback: read from /tmp/uploads/<id>
  try {
    const data = await fs.readFile(path.join("/tmp", "uploads", id));
    return { data, mimeType: "image/jpeg", filename: id };
  } catch {
    return null;
  }
}

/**
 * Delete an image from TiDB by id.
 */
export async function deletePageImage(id: string): Promise<void> {
  if (hasDatabase) {
    await query(`DELETE FROM page_images WHERE id = ?`, [id]);
    return;
  }
  try {
    await fs.unlink(path.join("/tmp", "uploads", id));
  } catch {}
}

/**
 * List all stored images (metadata only — no binary data).
 */
export async function listPageImages(): Promise<StoredImage[]> {
  if (hasDatabase) {
    try {
      const rows = await query<any[]>(
        `SELECT id, filename, mime_type, size_bytes, created_at
         FROM page_images
         ORDER BY created_at DESC`
      );
      if (Array.isArray(rows)) {
        return rows.map((r) => ({
          id:         String(r.id),
          filename:   String(r.filename),
          mimeType:   String(r.mime_type),
          sizeBytes:  Number(r.size_bytes),
          createdAt:  String(r.created_at),
          url:        `/api/images/${r.id}`,
        }));
      }
    } catch (err) {
      console.warn("DB image list failed:", err);
    }
    return [];
  }

  // Fallback: list files in /tmp/uploads
  try {
    const dir = path.join("/tmp", "uploads");
    const files = await fs.readdir(dir);
    return files.map((f) => ({
      id:        f,
      filename:  f,
      mimeType:  "image/jpeg",
      sizeBytes: 0,
      createdAt: new Date().toISOString(),
      url:       `/api/images/${f}`,
    }));
  } catch {
    return [];
  }
}
