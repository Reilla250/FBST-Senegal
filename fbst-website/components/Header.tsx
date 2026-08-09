"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNav } from "@/lib/nav";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 text-slate-100 shadow-sm shadow-slate-950/20 backdrop-blur-sm border-b border-white/10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-950 font-display text-lg font-semibold transition-all group-hover:scale-105">
            FB
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-white">FBST-Senegal</span>
            <span className="block text-xs text-slate-100/70 tracking-wide">Dakar, Sénégal</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 text-sm">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-full text-slate-100/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-full bg-baobab px-5 py-2.5 text-sm font-semibold text-white hover:bg-baobab-dark transition-colors"
          >
            Get confidential support
          </Link>
          <ThemeToggle />
        </div>

        <button
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-slate-100/90 hover:bg-white/10 transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Menu</span>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-slate-950">
          <nav className="mx-auto max-w-6xl px-5 py-4 flex flex-col gap-1 text-sm">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg text-slate-100/80 hover:text-white hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-baobab px-5 py-2.5 font-semibold text-white hover:bg-baobab-dark transition-colors"
            >
              Get confidential support
            </Link>
            <div className="mt-3">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
