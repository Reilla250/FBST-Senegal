"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className="inline-flex items-center rounded-lg p-0.5 border"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        borderColor: "#3A4255",
      }}
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 text-xs font-bold rounded transition-all duration-200 ${
          language === "en"
            ? "shadow-sm"
            : "hover:text-white"
        }`}
        style={{
          background: language === "en" ? "#08B4D0" : "transparent",
          color: language === "en" ? "#FFFFFF" : "#A8B2BF",
        }}
        aria-pressed={language === "en"}
      >
        EN
      </button>

      <span className="text-xs px-0.5 opacity-30 select-none" style={{ color: "#A8B2BF" }}>|</span>

      <button
        type="button"
        onClick={() => setLanguage("fr")}
        className={`px-2 py-1 text-xs font-bold rounded transition-all duration-200 ${
          language === "fr"
            ? "shadow-sm"
            : "hover:text-white"
        }`}
        style={{
          background: language === "fr" ? "#08B4D0" : "transparent",
          color: language === "fr" ? "#FFFFFF" : "#A8B2BF",
        }}
        aria-pressed={language === "fr"}
      >
        FR
      </button>
    </div>
  );
}
