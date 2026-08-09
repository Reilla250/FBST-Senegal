"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored) setTheme(stored);
      else {
        const prefers = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefers ? "dark" : "light");
      }
    } catch (e) {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (!theme) return;
    const doc = document.documentElement;
    doc.classList.remove("theme-dark", "theme-light");
    doc.classList.add(theme === "dark" ? "theme-dark" : "theme-light");
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  function toggle() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-sand/90 hover:bg-white/6 transition-colors"
    >
      {theme === "dark" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M6.76 4.84l-1.8-1.79L3.17 4.85l1.79 1.79 1.8-1.8zM1 13h3v-2H1v2zm10-9h2V1h-2v3zm7.03 1.05l1.8-1.8-1.79-1.79-1.8 1.8 1.79 1.79zM20 11v2h3v-2h-3zM6.76 19.16l-1.79 1.79 1.79 1.79 1.8-1.8-1.8-1.78zM11 21h2v3h-2v-3zm7.03-1.05l1.79 1.8 1.79-1.79-1.8-1.8-1.78 1.79z" fill="currentColor"/>
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}
