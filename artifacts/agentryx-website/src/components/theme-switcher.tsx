import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Palette, Check } from "lucide-react";
import { useTheme, type Theme } from "@/contexts/theme-context";
import { cn } from "@/lib/utils";

const themes: { id: Theme; label: string; description: string; swatch: string; ring: string }[] = [
  {
    id: "midnight",
    label: "Midnight",
    description: "Deep space dark",
    swatch: "linear-gradient(135deg, #0d0f1f 50%, #4f46e5)",
    ring: "rgba(99,102,241,0.5)",
  },
  {
    id: "frost",
    label: "Frost",
    description: "Crisp & clean light",
    swatch: "linear-gradient(135deg, #f6f7fb 50%, #7c3aed)",
    ring: "rgba(124,58,237,0.4)",
  },
  {
    id: "dusk",
    label: "Dusk",
    description: "Warm amber hybrid",
    swatch: "linear-gradient(135deg, #0e0a05 50%, #f59e0b)",
    ring: "rgba(245,158,11,0.5)",
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const active = themes.find((t) => t.id === theme)!;

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-2.5">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong rounded-2xl p-2 flex flex-col gap-0.5 shadow-2xl min-w-[200px]"
          >
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold px-3 pt-2 pb-1">
              Theme
            </p>
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => { setTheme(t.id); setOpen(false); }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 w-full",
                  theme === t.id
                    ? "bg-white/[0.09]"
                    : "hover:bg-white/[0.05]"
                )}
              >
                {/* Swatch */}
                <div
                  className="w-7 h-7 rounded-lg flex-shrink-0 border border-white/10"
                  style={{ background: t.swatch }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-tight">{t.label}</p>
                  <p className="text-[11px] text-muted-foreground leading-tight">{t.description}</p>
                </div>
                {theme === t.id && (
                  <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Change theme"
        className="relative w-11 h-11 rounded-full glass-strong flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-transform duration-150 overflow-hidden"
      >
        {/* Mini swatch inside button */}
        <div
          className="absolute inset-0 opacity-30"
          style={{ background: active.swatch }}
        />
        <Palette className="w-4 h-4 text-foreground relative z-10" />
      </button>
    </div>
  );
}
