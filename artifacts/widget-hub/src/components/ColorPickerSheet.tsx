import { useRef, useEffect, useState, useCallback } from "react";
import { Check, X, RotateCcw } from "lucide-react";
import { hexToHsl, hslToHex, isValidHex, DEFAULT_ACCENT } from "@/context/ThemeContext";

// ── Constants ────────────────────────────────────────────────────────────────

const WHEEL_SIZE = 240;
const WHEEL_RADIUS = WHEEL_SIZE / 2;

const PRESETS = [
  { hex: "#007AFF", label: "Blue" },
  { hex: "#00C7BE", label: "Teal" },
  { hex: "#BF5AF2", label: "Purple" },
  { hex: "#FF375F", label: "Pink" },
  { hex: "#FF9F0A", label: "Orange" },
  { hex: "#FFD60A", label: "Yellow" },
  { hex: "#30D158", label: "Green" },
  { hex: "#FF3B30", label: "Red" },
];

// CSS conic gradient for the hue ring — 36 stops every 10° for smoothness
const CONIC_STOPS = Array.from({ length: 37 }, (_, i) => `hsl(${i * 10},100%,50%) ${i * 10}deg`).join(", ");
const WHEEL_BACKGROUND = `radial-gradient(circle at center, white 0%, rgba(255,255,255,0) 100%), conic-gradient(${CONIC_STOPS})`;

// ── Gradient slider ──────────────────────────────────────────────────────────

interface GradientSliderProps {
  value: number; // 0–100
  onChange: (v: number) => void;
  gradient: string;
  thumbColor: string;
}

function GradientSlider({ value, onChange, gradient, thumbColor }: GradientSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    onChange(Math.round(pct));
  }, [onChange]);

  return (
    <div className="relative flex items-center" style={{ height: 44, touchAction: "none" }}>
      <div
        ref={trackRef}
        className="w-full rounded-full"
        style={{ height: 14, background: gradient, cursor: "pointer" }}
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); update(e.clientX); }}
        onPointerMove={(e) => { if (!e.currentTarget.hasPointerCapture(e.pointerId)) return; update(e.clientX); }}
        onPointerUp={(e) => e.currentTarget.releasePointerCapture(e.pointerId)}
        onPointerCancel={(e) => e.currentTarget.releasePointerCapture(e.pointerId)}
      />
      {/* Thumb */}
      <div
        className="absolute pointer-events-none rounded-full border-2 border-white"
        style={{
          width: 24, height: 24,
          left: `${value}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
          background: thumbColor,
          boxShadow: "0 0 0 1px rgba(0,0,0,0.25), 0 2px 8px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

interface ColorPickerSheetProps {
  open: boolean;
  currentColor: string;
  onApply: (hex: string) => void;
  onClose: () => void;
}

export function ColorPickerSheet({ open, currentColor, onApply, onClose }: ColorPickerSheetProps) {
  const wheelRef = useRef<HTMLDivElement>(null);

  const [hue, setHue] = useState(211);
  const [sat, setSat] = useState(100);
  const [light, setLight] = useState(50);
  const [hexInput, setHexInput] = useState(currentColor.toUpperCase());

  const currentHex = hslToHex(hue, sat, light);

  // Sync from prop when opened
  useEffect(() => {
    if (open) {
      const [h, s, l] = hexToHsl(currentColor);
      setHue(h); setSat(s); setLight(l);
      setHexInput(currentColor.toUpperCase());
    }
  }, [open, currentColor]);

  // Keep hex input in sync when wheel/slider moves
  useEffect(() => {
    setHexInput(currentHex.toUpperCase());
  }, [currentHex]);

  // ── Wheel drag ───────────────────────────────────────────────────────
  const updateFromPointer = useCallback((clientX: number, clientY: number) => {
    const el = wheelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const x = clientX - rect.left - cx;
    const y = clientY - rect.top - cy;
    const angle = (Math.atan2(y, x) * 180) / Math.PI;
    const h = (angle + 360) % 360;
    const dist = Math.sqrt(x * x + y * y);
    const s = Math.min(100, (dist / (rect.width / 2)) * 100);
    setHue(Math.round(h));
    setSat(Math.round(s));
  }, []);

  const onWheelPointerDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPointer(e.clientX, e.clientY);
  }, [updateFromPointer]);

  const onWheelPointerMove = useCallback((e: React.PointerEvent) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    updateFromPointer(e.clientX, e.clientY);
  }, [updateFromPointer]);

  // ── Hex input ────────────────────────────────────────────────────────
  const handleHexChange = (raw: string) => {
    const val = raw.startsWith("#") ? raw : `#${raw}`;
    setHexInput(val.toUpperCase());
    if (isValidHex(val)) {
      const [h, s, l] = hexToHsl(val);
      setHue(h); setSat(s); setLight(l);
    }
  };

  // ── Handle position on wheel ─────────────────────────────────────────
  const angleRad = (hue * Math.PI) / 180;
  const handleX = WHEEL_RADIUS + (sat / 100) * (WHEEL_RADIUS - 2) * Math.cos(angleRad);
  const handleY = WHEEL_RADIUS + (sat / 100) * (WHEEL_RADIUS - 2) * Math.sin(angleRad);

  // Lightness slider
  const pureHue = hslToHex(hue, sat, 50);
  const lightnessGradient = `linear-gradient(to right, #000000, ${pureHue}, #ffffff)`;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(10px)" }}
    >
      <div
        className="w-full max-w-sm bg-card rounded-t-[28px] px-5 pt-4"
        style={{ paddingBottom: "max(28px, env(safe-area-inset-bottom))" }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-white/60" />
          </button>
          <h3 className="text-[16px] font-semibold text-white">Accent Color</h3>
          <button
            onClick={() => { onApply(currentHex); onClose(); }}
            className="px-4 py-1.5 rounded-full text-[14px] font-semibold text-black"
            style={{ background: currentHex }}
          >
            Apply
          </button>
        </div>

        {/* ── Live preview strip ── */}
        <div
          className="w-full h-10 rounded-2xl mb-5 border border-white/10"
          style={{
            background: `linear-gradient(135deg, ${hslToHex(hue, sat, Math.min(light + 15, 95))}, ${currentHex}, ${hslToHex(hue, sat, Math.max(light - 15, 5))})`,
          }}
        />

        {/* ── CSS Color wheel ── */}
        <div className="flex justify-center mb-5">
          <div
            ref={wheelRef}
            className="relative rounded-full overflow-hidden"
            style={{
              width: WHEEL_SIZE,
              height: WHEEL_SIZE,
              background: WHEEL_BACKGROUND,
              touchAction: "none",
              cursor: "crosshair",
              // Border
              boxShadow: "0 0 0 1px rgba(255,255,255,0.08)",
              flexShrink: 0,
            }}
            onPointerDown={onWheelPointerDown}
            onPointerMove={onWheelPointerMove}
            onPointerUp={(e) => e.currentTarget.releasePointerCapture(e.pointerId)}
            onPointerCancel={(e) => e.currentTarget.releasePointerCapture(e.pointerId)}
          >
            {/* Lightness overlay — darkens or lightens the whole wheel */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  light < 50
                    ? `rgba(0,0,0,${((50 - light) / 50) * 0.85})`
                    : `rgba(255,255,255,${((light - 50) / 50) * 0.85})`,
              }}
            />

            {/* Draggable handle — positioned absolutely, overflows overflow:hidden via transform trick */}
            <div
              className="pointer-events-none absolute rounded-full border-[2.5px] border-white"
              style={{
                width: 24,
                height: 24,
                left: handleX,
                top: handleY,
                transform: "translate(-50%, -50%)",
                background: currentHex,
                boxShadow: "0 0 0 1.5px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.6)",
                zIndex: 10,
              }}
            />
          </div>
        </div>

        {/* ── Brightness slider ── */}
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-1">Brightness</p>
          <GradientSlider
            value={light}
            onChange={setLight}
            gradient={lightnessGradient}
            thumbColor={hslToHex(hue, sat, light)}
          />
        </div>

        {/* ── Hex input ── */}
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-2">Hex</p>
          <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3">
            <div
              className="w-6 h-6 rounded-md flex-shrink-0 border border-white/10"
              style={{ background: isValidHex(hexInput) ? hexInput : currentHex }}
            />
            <input
              type="text"
              value={hexInput}
              onChange={(e) => handleHexChange(e.target.value)}
              onBlur={(e) => {
                const val = e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`;
                if (!isValidHex(val)) setHexInput(currentHex.toUpperCase());
              }}
              className="flex-1 bg-transparent text-[15px] font-mono text-white outline-none"
              maxLength={7}
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              placeholder="#000000"
            />
          </div>
        </div>

        {/* ── Presets ── */}
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-3">Presets</p>
          <div className="flex gap-2">
            {PRESETS.map(({ hex, label }) => {
              const active = currentHex.toLowerCase() === hex.toLowerCase();
              return (
                <button
                  key={hex}
                  aria-label={label}
                  onClick={() => {
                    const [h, s, l] = hexToHsl(hex);
                    setHue(h); setSat(s); setLight(l);
                  }}
                  className="flex-1 aspect-square rounded-full relative flex items-center justify-center border-2 transition-all"
                  style={{
                    background: hex,
                    borderColor: active ? "white" : "transparent",
                    boxShadow: active ? `0 0 0 1px ${hex}` : "none",
                  }}
                >
                  {active && <Check className="w-3 h-3 text-white drop-shadow" strokeWidth={3} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Reset ── */}
        <button
          onClick={() => { onApply("#000000"); onClose(); }}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/10 active:bg-white/5"
        >
          <RotateCcw className="w-4 h-4 text-white/40" />
          <span className="text-[14px] text-white/40 font-medium">Reset to Black</span>
        </button>
      </div>
    </div>
  );
}
