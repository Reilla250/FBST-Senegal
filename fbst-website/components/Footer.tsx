"use client";

import Link from "next/link";
import { footerNav } from "@/lib/nav";

export default function Footer() {
  return (
    <footer style={{ background: "#1A1F2B", color: "#A8B2BF" }}>
      {/* Cyan top border */}
      <div style={{ height: "3px", background: "#08B4D0" }} />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded font-display text-sm font-bold text-white"
              style={{ background: "#08B4D0" }}
            >
              FB
            </span>
            <span className="font-display text-xl font-bold" style={{ color: "#08B4D0" }}>
              FBST-Senegal
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm" style={{ color: "#6B7785" }}>
            Fondation La Bonne Santé Pour Tous (FBST-Senegal) is a community-rooted,
            youth-led organisation in Dakar advancing mental wellbeing, education
            inclusion, HIV prevention, confidential referral, psychosocial support
            and protection.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="btn-outline"
              style={{ fontSize: "0.75rem" }}
            >
              Contact us →
            </Link>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <span
            className="block text-xs font-bold uppercase tracking-widest mb-5"
            style={{ color: "#08B4D0" }}
          >
            Quick links
          </span>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors"
                  style={{ color: "#6B7785" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#08B4D0")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7785")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/admin"
                className="transition-colors font-bold"
                style={{ color: "#08B4D0" }}
              >
                🔐 Admin Portal
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <span
            className="block text-xs font-bold uppercase tracking-widest mb-5"
            style={{ color: "#08B4D0" }}
          >
            Contact
          </span>
          <ul className="space-y-2.5 text-sm" style={{ color: "#6B7785" }}>
            <li>📍 Dakar, Senegal</li>
            <li>🔢 Registration No. 978</li>
            <li>
              <a
                href="mailto:info@fdnlabonnesantepourtous.org"
                className="transition-colors"
                style={{ color: "#6B7785" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#08B4D0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7785")}
              >
                info@fdnlabonnesantepourtous.org
              </a>
            </li>
            <li>
              <a
                href="tel:+221778577078"
                className="transition-colors"
                style={{ color: "#6B7785" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#08B4D0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7785")}
              >
                +221 77 857 70 78
              </a>
            </li>
            <li style={{ color: "#4A5260" }}>www.fdnlabonnesantepourtous.org</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid #252B38" }}>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs" style={{ color: "#4A5260" }}>
          <p className="max-w-lg leading-relaxed">
            FBST provides information, peer support, navigation and referral. Clinical and
            emergency services are delivered by qualified providers. We protect confidentiality
            and do not publish participant identities or sensitive referral locations.
          </p>
          <p className="shrink-0">© {new Date().getFullYear()} FBST-Senegal</p>
        </div>
      </div>
    </footer>
  );
}
