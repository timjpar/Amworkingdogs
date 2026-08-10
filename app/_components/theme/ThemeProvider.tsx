"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { ThemeName } from "@/app/_types";

const STORAGE_KEY = "awd-theme";
const DEFAULT_THEME: ThemeName = "ridgeline";
const ALLOWED_THEMES: ThemeName[] = [
  "ridgeline",
  "pasture",
  "clay",
  "nightwatch",
];

/**
 * The <html data-theme> attribute is the single source of truth. The inline
 * script in layout.tsx sets it from localStorage before React hydrates, so we
 * read from the DOM rather than mirroring it into React state — that keeps the
 * switcher in sync with what's actually painted and avoids a hydration flash.
 */

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): ThemeName {
  const attr = document.documentElement.getAttribute("data-theme");
  return attr && ALLOWED_THEMES.includes(attr as ThemeName)
    ? (attr as ThemeName)
    : DEFAULT_THEME;
}

/** Server render (and the hydration pass) always assumes the default. */
function getServerSnapshot(): ThemeName {
  return DEFAULT_THEME;
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: ThemeName) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage — the theme still applies for this visit.
    }
    listeners.forEach((listener) => listener());
  }, []);

  return { theme, setTheme };
}

/**
 * Kept as a component so layout.tsx reads the same as any other themed app,
 * and so we have a place to hang future theme-scoped context.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
