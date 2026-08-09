"use client";

import { useState } from "react";

type FaqAccordionProps = {
  faqs: Array<[string, string]>;
};

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl divide-y divide-baobab/15 border-y border-baobab/15">
      {faqs.map(([q, a], i) => {
        const isOpen = openIndex === i;
        return (
          <div key={q}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-lg font-medium text-baobab-dark">{q}</span>
              <span className="mt-1 shrink-0 text-baobab text-xl leading-none" aria-hidden="true">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen && <p className="pb-5 pr-8 text-ink/85 leading-relaxed">{a}</p>}
          </div>
        );
      })}
    </div>
  );
}
