"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type FaqAccordionProps = {
  faqs: Array<[string, string]>;
};

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  return (
    <div className="max-w-3xl divide-y divide-baobab/15 border-y border-slate-200 dark:border-slate-800">
      {faqs.map(([q, a], i) => {
        const isOpen = openIndex === i;
        return (
          <div key={q}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-lg font-medium text-blue-900 dark:text-blue-400">{t(q)}</span>
              <span className="mt-1 shrink-0 text-blue-800 dark:text-blue-400 text-xl leading-none" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && <p className="pb-5 pr-8 text-slate-600 dark:text-slate-300 leading-relaxed">{t(a)}</p>}
          </div>
        );
      })}
    </div>
  );
}

