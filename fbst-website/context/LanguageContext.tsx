"use client";

import React, { createContext, useContext, useEffect, useState, useTransition } from "react";
import { Language, getTranslation, translations } from "@/lib/translations";

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
  const [, startTransition] = useTransition();

  // Hydrate language preference from localStorage
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

  // Perform DOM text node translation when language changes or route changes
  useEffect(() => {
    document.documentElement.lang = language;

    const translateNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue;
        if (!text || !text.trim()) return;

        if (!originalTextMap.has(node)) {
          originalTextMap.set(node, text);
        }

        const original = originalTextMap.get(node) || text;

        if (language === "fr") {
          const translated = getTranslation(original, "fr");
          if (translated !== original) {
            node.nodeValue = translated;
          }
        } else {
          node.nodeValue = original;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const elem = node as HTMLElement;
        // Ignore scripts, styles, input elements
        const tagName = elem.tagName.toLowerCase();
        if (
          tagName === "script" ||
          tagName === "style" ||
          tagName === "textarea" ||
          tagName === "code" ||
          elem.isContentEditable
        ) {
          return;
        }

        // Translate placeholders of inputs
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

    // Run translation on state update & initial mount
    runDOMTranslation();

    // Set up MutationObserver to translate dynamically loaded content seamlessly
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          translateNode(node);
        });
      }
    });

    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
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
