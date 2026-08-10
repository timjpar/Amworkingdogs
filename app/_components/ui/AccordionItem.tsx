"use client";

import { useState } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
}

export function AccordionItem({ question, answer }: AccordionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b" style={{ borderColor: "var(--c-line)" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full py-5 px-1 text-left gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--c-brand)] rounded-sm cursor-pointer"
        aria-expanded={open}
      >
        <span
          className="font-semibold text-base md:text-lg leading-snug"
          style={{ color: "var(--c-title)", fontFamily: "var(--font-display)" }}
        >
          {question}
        </span>
        <span
          className="flex-none w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-200"
          style={{
            background: open
              ? "var(--c-brand)"
              : "color-mix(in srgb, var(--c-brand) 12%, transparent)",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={open ? "var(--c-brand-fg)" : "var(--c-brand)"}
            strokeWidth="2.5"
            strokeLinecap="round"
            className="w-3.5 h-3.5"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      {open && (
        <div
          className="pb-5 px-1 text-base leading-relaxed"
          style={{ color: "var(--c-ink)" }}
        >
          {answer}
        </div>
      )}
    </div>
  );
}
