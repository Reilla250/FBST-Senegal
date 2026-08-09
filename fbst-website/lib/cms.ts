import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import { query, hasDatabase } from "@/lib/db";
import { unstable_noStore as noStore } from "next/cache";

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

export type NavItem = { label: string; href: string };
export type ProgramItem = { n: string; title: string; text: string };
export type StatItem = { value: string; label: string };

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

const SETTINGS_PATH = path.join(process.cwd(), "data", "site-settings.json");

const defaultSettings: SiteSettings = {
  siteName: "FBST-Senegal",
  legalName: "Fondation La Bonne Santé Pour Tous",
  registrationNo: "978",
  email: "info@fdnlabonnesantepourtous.org",
  phone: "+221 77 857 70 78",
  address: "Dakar, Senegal",
  primaryNav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Impact", href: "/impact" },
    { label: "Contact", href: "/contact" },
  ],
  programs: [
    { n: "01", title: "Youth mental health and school return", text: "We support young people aged 10 to 24 through confidential identification, wellbeing circles, individual support plans, family-school mediation and safe referral." },
    { n: "02", title: "HIV prevention and treatment continuity", text: "We provide clear HIV prevention and treatment information, confidential testing referrals, treatment re-linkage, adherence support and follow-up." },
    { n: "03", title: "Peer navigation and safe linkage to care", text: "Trusted and supervised peers help people understand their options, agree on a safe referral plan, reach an appropriate service and receive respectful follow-up." },
    { n: "04", title: "Sexual and reproductive health support", text: "We provide non-judgemental information and referral related to sexual and reproductive health, PrEP, STI services, safer sex, counselling and youth-friendly care." },
    { n: "05", title: "Rights, protection and anti-stigma action", text: "We help people understand confidentiality, informed consent, respectful care and safe ways to seek help after stigma, discrimination, violence, blackmail or forced disclosure." },
    { n: "06", title: "Health-system partnership and accountability", text: "We work with schools, health facilities, public services, community groups and civil-society partners to improve referrals, confidentiality and respectful communication." },
  ],
  stats: [
    { value: "210", label: "young people joined the NOUVEAU DÉPART pilot" },
    { value: "181", label: "completed the NOUVEAU DÉPART pathway" },
    { value: "69%", label: "reported improved psychosocial wellbeing" },
    { value: "1,847", label: "community members reached with stigma-reduction information" },
  ],
};

export async function getSiteSettings(): Promise<SiteSettings> {
  noStore();
  try {
    const raw = await fs.readFile(SETTINGS_PATH, "utf-8");
    return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    return defaultSettings;
  }
}

export async function saveSiteSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await getSiteSettings();
  const updated = { ...current, ...settings };
  await fs.mkdir(path.dirname(SETTINGS_PATH), { recursive: true });
  await fs.writeFile(SETTINGS_PATH, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}

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
  noStore();
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

export async function getAllSubmissions(): Promise<ContactSubmission[]> {
  if (hasDatabase) {
    try {
      const rows = await query<any[]>("SELECT * FROM contact_submissions ORDER BY created_at DESC");
      if (Array.isArray(rows)) {
        return rows.map((r) => ({
          id: String(r.id),
          receivedAt: String(r.created_at ?? r.receivedAt ?? new Date().toISOString()),
          name: String(r.name),
          contact: String(r.contact),
          reason: String(r.reason),
          preferredMethod: String(r.preferred_method ?? r.preferredMethod),
          preferredTime: r.preferred_time ? String(r.preferred_time) : undefined,
          message: String(r.message),
          consent: Boolean(r.consent),
        }));
      }
    } catch {
      // Fallback if table doesn't exist
    }
  }

  return readFallbackSubmissions();
}

