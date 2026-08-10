"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import type { ThemeName, ThemeOption } from "@/app/_types";

const THEMES: ThemeOption[] = [
  { id: "ridgeline", label: "Ridgeline", swatch: "#4a5d4e", swatchAlt: "#c68a3e" },
  { id: "pasture", label: "Pasture", swatch: "#5c7f4a", swatchAlt: "#d9a441" },
  { id: "clay", label: "Clay", swatch: "#9c5a34", swatchAlt: "#4f6b57" },
  { id: "nightwatch", label: "Night Watch", swatch: "#232825", swatchAlt: "#d9a441" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 z-50">
      {open && (
        <>
          <div
            className="fixed inset-0"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-14 right-0 rounded-card shadow-2xl border p-4 w-52"
            style={{ background: "var(--c-page)", borderColor: "var(--c-line)" }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: "var(--c-ink-2)", fontFamily: "var(--font-body)" }}
            >
              Choose a Theme
            </p>
            <div className="flex flex-col gap-2">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id as ThemeName);
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-btn text-left transition-all"
                  style={{
                    background:
                      theme === t.id
                        ? "color-mix(in srgb, var(--c-brand) 12%, transparent)"
                        : "transparent",
                    outline: theme === t.id ? "2px solid var(--c-brand)" : "none",
                    fontFamily: "var(--font-body)",
                  }}
                  aria-pressed={theme === t.id}
                >
                  <span className="flex-none relative w-7 h-7 rounded-full overflow-hidden shadow-sm">
                    <span className="absolute inset-0" style={{ background: t.swatch }} />
                    <span
                      className="absolute right-0 top-0 bottom-0 w-1/2"
                      style={{ background: t.swatchAlt }}
                    />
                  </span>
                  <span
                    className="text-sm font-medium leading-tight"
                    style={{ color: "var(--c-ink)" }}
                  >
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform active:scale-95"
        style={{ background: "var(--c-brand)" }}
        aria-label="Change theme"
        aria-expanded={open}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--c-brand-fg)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>
    </div>
  );
}
