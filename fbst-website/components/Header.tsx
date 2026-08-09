"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNav } from "@/lib/nav";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-lg" style={{ background: "#1E2430" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between h-20">

        {/* Logo – cyan accent exactly like Porto */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          onClick={() => setOpen(false)}
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded text-white font-display text-base font-bold transition-all group-hover:opacity-90"
            style={{ background: "#08B4D0" }}
          >
            FB
          </span>
          <span className="leading-tight">
            <span
              className="block font-display text-xl font-bold transition-colors group-hover:opacity-90"
              style={{ color: "#08B4D0" }}
            >
              FBST-Senegal
            </span>
            <span className="block text-xs font-medium tracking-wide" style={{ color: "#8C939E" }}>
              Dakar, Sénégal
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 uppercase tracking-wider text-xs font-bold transition-colors"
              style={{ color: "#A8B2BF" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#08B4D0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#A8B2BF")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA & Theme Toggle */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="btn-primary">
            Get support
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded border text-sm font-bold transition-colors"
            style={{ borderColor: "#3A4255", color: "#A8B2BF" }}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{ background: "#252B38", borderTop: "1px solid #2E3646" }}>
          <nav className="mx-auto max-w-7xl px-5 py-4 flex flex-col gap-1">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded text-sm font-bold uppercase tracking-wider transition-colors"
                style={{ color: "#A8B2BF" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#08B4D0")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#A8B2BF")}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary mt-3 justify-center text-center"
            >
              Get support
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
