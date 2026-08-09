#!/usr/bin/env node
// Fix broken /uploads/ image paths in TiDB database
// Run from: fbst-website/

const { createPool } = require("mysql2/promise");
const { readFileSync } = require("fs");
const path = require("path");

const pool = createPool({
  host: process.env.TIDB_HOST || "gateway01.eu-central-1.prod.aws.tidbcloud.com",
  port: Number(process.env.TIDB_PORT) || 4000,
  user: process.env.TIDB_USER || "3QSRBZdjjJqX9M3.root",
  password: process.env.TIDB_PASSWORD || "ct9EtiLOoIIL8Pku",
  database: process.env.TIDB_DATABASE || "fbst-website",
  ssl: {
    ca: readFileSync(path.join(__dirname, "db", "isrgrootx1.pem"), "utf-8"),
    rejectUnauthorized: true,
    servername: process.env.TIDB_HOST || "gateway01.eu-central-1.prod.aws.tidbcloud.com",
  },
});

// Map of slug -> new images array (replacing broken /uploads/ paths)
const imageUpdates = {
  home: [
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80",
  ],
};

async function fix() {
  try {
    console.log("Connecting to TiDB Cloud database...");
    const conn = await pool.getConnection();

    // First, show all pages and their current images
    const [rows] = await conn.query("SELECT slug, images FROM pages ORDER BY slug");
    console.log("\nCurrent pages in database:");
    for (const row of rows) {
      const imgs = Array.isArray(row.images) ? row.images : JSON.parse(row.images || "[]");
      const hasBroken = imgs.some(img => img.startsWith("/uploads/") || img.startsWith("data:"));
      console.log(`  ${row.slug}: ${imgs.length} images ${hasBroken ? "⚠️  HAS BROKEN/LOCAL PATHS" : "✅"}`);
      if (hasBroken) {
        console.log(`    Paths: ${imgs.slice(0, 2).join(", ")}`);
      }
    }

    // Fix each page that has /uploads/ or data: URLs
    console.log("\nFixing broken image paths...");
    for (const row of rows) {
      const imgs = Array.isArray(row.images) ? row.images : JSON.parse(row.images || "[]");
      const hasBroken = imgs.some(img => img.startsWith("/uploads/") || img.startsWith("data:"));
      
      if (hasBroken) {
        let newImages;
        if (imageUpdates[row.slug]) {
          // Use specific images for this slug
          newImages = imageUpdates[row.slug];
        } else {
          // Filter out broken paths, keep only valid http(s) URLs
          newImages = imgs.filter(img => img.startsWith("http"));
          // If none left, use default Unsplash images
          if (newImages.length === 0) {
            newImages = [
              "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1600&q=80",
              "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1600&q=80",
            ];
          }
        }
        
        await conn.query("UPDATE pages SET images = ? WHERE slug = ?", [
          JSON.stringify(newImages),
          row.slug,
        ]);
        console.log(`  ✅ Fixed ${row.slug}: now has ${newImages.length} valid images`);
      }
    }

    await conn.release();
    console.log("\nDone! All broken image paths have been fixed in the database.");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

fix();
