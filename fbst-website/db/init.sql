-- Create the database schema for the FBST website admin content and contact storage.
CREATE TABLE IF NOT EXISTS pages (
  slug VARCHAR(191) PRIMARY KEY,
  label VARCHAR(191) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  hero_heading VARCHAR(255) NOT NULL,
  hero_subheading VARCHAR(255),
  hero_text TEXT,
  hero_cta_label VARCHAR(191),
  hero_cta_href VARCHAR(512),
  images JSON NOT NULL DEFAULT JSON_ARRAY(),
  autoplay BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id VARCHAR(36) PRIMARY KEY,
  received_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(191) NOT NULL,
  contact VARCHAR(255) NOT NULL,
  reason VARCHAR(255) NOT NULL,
  preferred_method VARCHAR(255) NOT NULL,
  preferred_time VARCHAR(255),
  message TEXT NOT NULL,
  consent BOOLEAN NOT NULL
);

-- Sample page records to seed the admin content store.
INSERT INTO pages (slug, label, title, description, hero_heading, hero_subheading, hero_text, hero_cta_label, hero_cta_href, images, autoplay)
VALUES
  ('home', 'Home', 'Trusted care in Dakar', 'FBST-Senegal provides youth-centred support rooted in safety, dignity and community.', 'Trusted pathways to care, education and protection in Dakar.', 'Community wellbeing', 'FBST-Senegal supports young people and communities with confidential peer guidance, safe referrals and strength-based programmes.', 'Request support', '/contact', JSON_ARRAY('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1400&q=80'), true),
  ('about', 'About Us', 'Rooted in Dakar. Led by community.', 'Who FBST-Senegal is, our mission, vision, values and who we serve.', 'Community-led wellbeing in Senegal', 'A trusted partner for people facing stigma, exclusion and distress.', 'Fondation La Bonne Santé Pour Tous is a youth-led organisation advancing mental wellbeing, safe referral and protection.', '', '', JSON_ARRAY('https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=1400&q=80','https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1400&q=80'), true);
