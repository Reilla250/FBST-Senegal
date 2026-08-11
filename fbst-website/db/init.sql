-- Create the database schema for the FBST website admin content and contact storage.
CREATE TABLE IF NOT EXISTS pages (
  slug         VARCHAR(191) PRIMARY KEY,
  label        VARCHAR(191) NOT NULL,
  title        VARCHAR(255) NOT NULL,
  description  TEXT,
  hero_heading    VARCHAR(255) NOT NULL,
  hero_subheading VARCHAR(255),
  hero_text    TEXT,
  hero_cta_label  VARCHAR(191),
  hero_cta_href   VARCHAR(512),
  images       JSON NOT NULL DEFAULT (JSON_ARRAY()),
  autoplay     BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id               VARCHAR(36) PRIMARY KEY,
  received_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name             VARCHAR(191) NOT NULL,
  contact          VARCHAR(255) NOT NULL,
  reason           VARCHAR(255) NOT NULL,
  preferred_method VARCHAR(255) NOT NULL,
  preferred_time   VARCHAR(255),
  message          TEXT NOT NULL,
  consent          BOOLEAN NOT NULL
);

-- Stores binary image data uploaded through the admin panel.
-- Images are stored as compressed JPEG blobs to minimise TiDB storage.
-- mime_type is always image/jpeg after server-side normalisation.
CREATE TABLE IF NOT EXISTS page_images (
  id          VARCHAR(36) PRIMARY KEY,
  filename    VARCHAR(255) NOT NULL,
  mime_type   VARCHAR(64)  NOT NULL DEFAULT 'image/jpeg',
  size_bytes  INT UNSIGNED NOT NULL DEFAULT 0,
  data        MEDIUMBLOB   NOT NULL,
  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Stores all CMS site settings as a single JSON document.
CREATE TABLE IF NOT EXISTS site_settings (
  id         INT PRIMARY KEY DEFAULT 1,
  data       JSON NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
