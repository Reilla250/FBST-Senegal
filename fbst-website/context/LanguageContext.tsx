"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, getTranslation } from "@/lib/translations";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (text) => text,
});

const originalTextMap = new WeakMap<Node, string>();

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Hydrate language choice from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("preferred_language") as Language;
      if (saved === "fr" || saved === "en") {
        setLanguageState(saved);
      }
    } catch {}
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("preferred_language", lang);
    } catch {}
    document.documentElement.lang = lang;
  };

  const t = (text: string): string => {
    return getTranslation(text, language);
  };

  // Perform DOM text node translation whenever active language or page content updates
  useEffect(() => {
    document.documentElement.lang = language;

    const translateNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const rawText = node.nodeValue;
        if (!rawText || !rawText.trim()) return;

        if (!originalTextMap.has(node)) {
          originalTextMap.set(node, rawText);
        }

        const original = originalTextMap.get(node) || rawText;
        const leadingWhitespace = rawText.match(/^\s*/)?.[0] || "";
        const trailingWhitespace = rawText.match(/\s*$/)?.[0] || "";
        const trimmed = original.trim();

        if (language === "fr") {
          const translated = getTranslation(trimmed, "fr");
          if (translated !== trimmed) {
            node.nodeValue = leadingWhitespace + translated + trailingWhitespace;
          }
        } else {
          node.nodeValue = original;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const elem = node as HTMLElement;
        const tagName = elem.tagName.toLowerCase();

        // Skip non-translatable elements
        if (
          tagName === "script" ||
          tagName === "style" ||
          tagName === "code" ||
          elem.isContentEditable ||
          elem.closest("[data-no-translate]")
        ) {
          return;
        }

        // Input & Textarea Placeholders
        if (tagName === "input" || tagName === "textarea") {
          const inputElem = elem as HTMLInputElement;
          if (inputElem.placeholder) {
            const attr = "data-orig-placeholder";
            if (!inputElem.getAttribute(attr)) {
              inputElem.setAttribute(attr, inputElem.placeholder);
            }
            const orig = inputElem.getAttribute(attr) || inputElem.placeholder;
            inputElem.placeholder = language === "fr" ? getTranslation(orig, "fr") : orig;
          }
        }

        for (let i = 0; i < elem.childNodes.length; i++) {
          translateNode(elem.childNodes[i]);
        }
      }
    };

    const runDOMTranslation = () => {
      if (typeof window !== "undefined" && document.body) {
        translateNode(document.body);
      }
    };

    // Execute translation
    runDOMTranslation();
    const timeoutId = setTimeout(runDOMTranslation, 50);

    // Watch for DOM changes (navigation, page switches, client-side renders)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          translateNode(node);
        });
      });
    });

    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
