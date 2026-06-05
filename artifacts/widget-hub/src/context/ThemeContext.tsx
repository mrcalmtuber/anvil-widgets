import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export const DEFAULT_ACCENT = "#007AFF";

// ── Color math ──────────────────────────────────────────────────────────────

export function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * c).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function isValidHex(hex: string) {
  return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

// ── CSS injection ────────────────────────────────────────────────────────────
// When hex === "#000000" it means "reset" — use pure black surfaces and the
// default blue as the accent so buttons/icons remain visible.

function applyAccentCss(hex: string) {
  const isReset = hex === "#000000";
  const root = document.documentElement;

  // --- Accent / primary (drives buttons, rings, active states) ---
  const [ph, ps, pl] = isReset ? [211, 100, 50] : hexToHsl(hex);
  root.style.setProperty("--primary", `${ph} ${ps}% ${pl}%`);
  root.style.setProperty("--ring", `${ph} ${ps}% ${pl}%`);
  root.style.setProperty("--sidebar-primary", `${ph} ${ps}% ${pl}%`);
  root.style.setProperty("--sidebar-ring", `${ph} ${ps}% ${pl}%`);

  // --- Surfaces (background, cards, borders) ---
  if (isReset) {
    // Pure-black defaults — original app palette
    root.style.setProperty("--background", "0 0% 0%");
    root.style.setProperty("--card",       "0 0% 11%");
    root.style.setProperty("--muted",      "0 0% 17%");
    root.style.setProperty("--border",     "0 0% 17%");
    root.style.setProperty("--input",      "0 0% 17%");
  } else {
    // Deeply dark, subtly hue-tinted surfaces
    // All at very low lightness so the tint is tasteful, not garish.
    root.style.setProperty("--background", `${ph} 15% 4%`);
    root.style.setProperty("--card",       `${ph} 10% 8%`);
    root.style.setProperty("--muted",      `${ph}  8% 13%`);
    root.style.setProperty("--border",     `${ph}  7% 18%`);
    root.style.setProperty("--input",      `${ph}  8% 13%`);
  }

  // --- Raw values for rgba() usage in WidgetWrapper borders ---
  const accentHex = isReset ? "#007AFF" : hex;
  const r = parseInt(accentHex.slice(1, 3), 16);
  const g = parseInt(accentHex.slice(3, 5), 16);
  const b = parseInt(accentHex.slice(5, 7), 16);
  root.style.setProperty("--accent-r",   String(r));
  root.style.setProperty("--accent-g",   String(g));
  root.style.setProperty("--accent-b",   String(b));
  root.style.setProperty("--accent-hex", accentHex);
}

// ── Context ──────────────────────────────────────────────────────────────────

interface ThemeContextType {
  accentColor: string;
  setAccentColor: (hex: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  accentColor: DEFAULT_ACCENT,
  setAccentColor: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accentColor, setAccentColorState] = useState<string>(() => {
    return localStorage.getItem("accent-color") || DEFAULT_ACCENT;
  });

  // Apply on mount and on every change
  useEffect(() => {
    applyAccentCss(accentColor);
  }, [accentColor]);

  const setAccentColor = (hex: string) => {
    setAccentColorState(hex);
    localStorage.setItem("accent-color", hex);
  };

  return (
    <ThemeContext.Provider value={{ accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
