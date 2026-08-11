import { createPool, Pool } from "mysql2/promise";
import { promises as fs, readFileSync } from "fs";
import path from "path";
import crypto from "crypto";
import bcrypt from "bcryptjs";

declare global {
  // eslint-disable-next-line no-var
  var __mysqlPool__: Pool | undefined;
  var __dbInitPromise__: Promise<void> | undefined;
}

function parseDatabaseUrl(url: string) {
  try {
    const parsed = new URL(url);
    return {
      host: parsed.hostname,
      port: Number(parsed.port || "3306"),
      user: parsed.username,
      password: parsed.password,
      database: parsed.pathname?.replace(/^\//, "") || undefined,
    };
  } catch {
    return null;
  }
}

function getDatabaseConfig() {
  const connectionString = process.env.DATABASE_URL;
  const config: {
    host?: string;
    port?: number;
    user?: string;
    password?: string;
    database?: string;
    ssl?: any;
  } = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };

  if (connectionString) {
    const parsed = parseDatabaseUrl(connectionString);
    if (parsed) {
      config.host = parsed.host;
      config.port = parsed.port;
      config.user = parsed.user;
      config.password = parsed.password;
      config.database = parsed.database;
    }
  }

  // DB_SSL_CA can be either:
  //   - A file path  e.g. "db/isrgrootx1.pem"  (local dev — file exists on disk)
  //   - The raw PEM  e.g. "-----BEGIN CERTIFICATE-----\n..."  (Vercel — paste cert directly)
  const sslCaEnv = process.env.DB_SSL_CA;
  let sslCa: string | undefined;
  if (sslCaEnv) {
    if (sslCaEnv.trim().startsWith("-----BEGIN")) {
      // Raw PEM content passed as env var (Vercel production)
      sslCa = sslCaEnv.replace(/\\n/g, "\n");
    } else {
      // File path (local dev or bundled in deployment)
      const possiblePaths = [
        sslCaEnv,
        path.join(process.cwd(), sslCaEnv),
        path.join(process.cwd(), "db", "isrgrootx1.pem"),
        path.join(process.cwd(), "fbst-website", "db", "isrgrootx1.pem"),
      ];
      for (const p of possiblePaths) {
        try {
          sslCa = readFileSync(p, "utf-8");
          if (sslCa) break;
        } catch {}
      }
      if (!sslCa) {
        console.warn("DB_SSL_CA file not found in paths:", sslCaEnv);
      }
    }
  }

  if (sslCa) {
    config.ssl = {
      ca: sslCa,
      rejectUnauthorized: true,
      servername: config.host,
    };
  } else {
    config.ssl = {
      rejectUnauthorized: false,
      servername: config.host,
    };
  }

  if (!config.host || !config.user || !config.database) {
    return null;
  }

  return config;
}

async function initializeDatabase(pool: Pool) {
  try {
    // ── Core content tables ────────────────────────────────────────────────
    await pool.query(`CREATE TABLE IF NOT EXISTS pages (
      slug            VARCHAR(191) PRIMARY KEY,
      label           VARCHAR(191) NOT NULL,
      title           VARCHAR(255) NOT NULL,
      description     TEXT,
      hero_heading    VARCHAR(255) NOT NULL,
      hero_subheading VARCHAR(255),
      hero_text       TEXT,
      hero_cta_label  VARCHAR(191),
      hero_cta_href   VARCHAR(512),
      images          JSON NOT NULL DEFAULT (JSON_ARRAY()),
      autoplay        BOOLEAN NOT NULL DEFAULT TRUE,
      updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS contact_submissions (
      id               VARCHAR(36) PRIMARY KEY,
      received_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      name             VARCHAR(191) NOT NULL,
      contact          VARCHAR(255) NOT NULL,
      reason           VARCHAR(255) NOT NULL,
      preferred_method VARCHAR(255) NOT NULL,
      preferred_time   VARCHAR(255),
      message          TEXT NOT NULL,
      consent          BOOLEAN NOT NULL
    );`);

    // ── Binary image storage (compressed JPEG blobs) ───────────────────────
    // MEDIUMBLOB supports up to 16 MB per image; we target ~200 KB after
    // client-side Canvas compression, keeping total DB footprint minimal.
    await pool.query(`CREATE TABLE IF NOT EXISTS page_images (
      id          VARCHAR(36)  PRIMARY KEY,
      filename    VARCHAR(255) NOT NULL,
      mime_type   VARCHAR(64)  NOT NULL DEFAULT 'image/jpeg',
      size_bytes  INT UNSIGNED NOT NULL DEFAULT 0,
      data        MEDIUMBLOB   NOT NULL,
      created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`);

    // ── Site-wide settings (single JSON document, id always = 1) ──────────
    await pool.query(`CREATE TABLE IF NOT EXISTS site_settings (
      id         INT PRIMARY KEY DEFAULT 1,
      data       JSON NOT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`);

    // ── Admin accounts ────────────────────────────────────────────────────
    await pool.query(`CREATE TABLE IF NOT EXISTS admins (
      id            VARCHAR(36)  PRIMARY KEY,
      username      VARCHAR(191) UNIQUE NOT NULL,
      password_hash TEXT         NOT NULL,
      created_at    TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
    );`);

    // Seed default admin if none exists
    const [admins] = await pool.query<any[]>(`SELECT username FROM admins LIMIT 1`);
    if (Array.isArray(admins) && admins.length === 0) {
      const adminUser = process.env.ADMIN_USER ?? "admin";
      const adminPass = process.env.ADMIN_PASS ?? "password";
      const hash = await bcrypt.hash(adminPass, 10);
      await pool.query(
        `INSERT INTO admins (id, username, password_hash) VALUES (?, ?, ?)`,
        [crypto.randomUUID(), adminUser, hash]
      );
    }

    // ── Seed sample pages (no-op if they already exist) ──────────────────
    const samplePages = [
      {
        slug: "home",
        label: "Home",
        title: "Trusted care in Dakar",
        description:
          "FBST-Senegal provides youth-centred support rooted in safety, dignity and community.",
        heroHeading: "Trusted pathways to care, education and protection in Dakar.",
        heroSubheading: "Community wellbeing",
        heroText:
          "FBST-Senegal supports young people and communities with confidential peer guidance, safe referrals and strength-based programmes.",
        heroCtaLabel: "Request support",
        heroCtaHref: "/contact",
        images: [
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80",
        ],
        autoplay: true,
      },
      {
        slug: "about",
        label: "About Us",
        title: "Rooted in Dakar. Led by community.",
        description: "Who FBST-Senegal is, our mission, vision, values and who we serve.",
        heroHeading: "Community-led wellbeing in Senegal",
        heroSubheading: "A trusted partner for people facing stigma, exclusion and distress.",
        heroText:
          "Fondation La Bonne Santé Pour Tous is a youth-led organisation advancing mental wellbeing, safe referral and protection.",
        heroCtaLabel: "",
        heroCtaHref: "",
        images: [
          "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1400&q=80",
          "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80",
        ],
        autoplay: true,
      },
    ];

    for (const page of samplePages) {
      await pool.query(
        `INSERT INTO pages (
          slug, label, title, description,
          hero_heading, hero_subheading, hero_text,
          hero_cta_label, hero_cta_href, images, autoplay
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE slug = slug;`,
        [
          page.slug,
          page.label,
          page.title,
          page.description,
          page.heroHeading,
          page.heroSubheading || null,
          page.heroText || null,
          page.heroCtaLabel || null,
          page.heroCtaHref || null,
          JSON.stringify(page.images),
          page.autoplay ? 1 : 0,
        ]
      );
    }
  } catch (e) {
    console.error("DB initialization error:", e);
  }
}

function getPool(): Pool | null {
  const config = getDatabaseConfig();
  if (!config) return null;

  if (!globalThis.__mysqlPool__) {
    globalThis.__mysqlPool__ = createPool({
      ...config,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    globalThis.__dbInitPromise__ = initializeDatabase(globalThis.__mysqlPool__);
  }

  return globalThis.__mysqlPool__!;
}

export async function query<T = any>(text: string, params: unknown[] = []) {
  const pool = getPool();
  if (!pool) {
    throw new Error("Database configuration is missing.");
  }

  if (globalThis.__dbInitPromise__) {
    await globalThis.__dbInitPromise__;
  }

  const [rows] = await pool.query<any>(text, params);
  return rows as T;
}

export const hasDatabase = Boolean(getDatabaseConfig());
