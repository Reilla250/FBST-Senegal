"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNav } from "@/lib/nav";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 shadow-lg" style={{ background: "#1E2430" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-8 flex items-center justify-between h-16 sm:h-20">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 group shrink-0"
          onClick={() => setOpen(false)}
        >
          <span
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded text-white font-display text-sm sm:text-base font-bold transition-all group-hover:opacity-90"
            style={{ background: "#08B4D0" }}
          >
            FB
          </span>
          <span className="leading-tight hidden xs:block sm:block">
            <span
              className="block font-display text-lg sm:text-xl font-bold transition-colors group-hover:opacity-90"
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
              className="px-3 py-2 uppercase tracking-wider text-xs font-bold transition-colors whitespace-nowrap"
              style={{ color: "#A8B2BF" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#08B4D0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#A8B2BF")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA & Theme Toggle */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link href="/contact" className="btn-primary">
            Get support
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile: Theme Toggle + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded border text-lg font-bold transition-colors"
            style={{ borderColor: "#3A4255", color: "#A8B2BF", background: "transparent" }}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          style={{
            background: "#252B38",
            borderTop: "1px solid #2E3646",
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 100,
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded text-sm font-bold uppercase tracking-wider transition-colors block w-full"
                style={{ color: "#A8B2BF" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#08B4D0";
                  (e.currentTarget as HTMLElement).style.background = "rgba(8,180,208,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#A8B2BF";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 pb-1">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary w-full justify-center text-center"
                style={{ display: "flex" }}
              >
                Get support
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
