import { useConfig } from "@/context/ConfigContext";
import { WidgetWrapper } from "./WidgetWrapper";
import { motion } from "framer-motion";

export function ShortcutsWidget({ delay = 0, onRemove }: { delay?: number; onRemove?: () => void }) {
  const { config } = useConfig("shortcuts");
  const shortcuts = [
    { label: String(config.shortcut1), color: "bg-[#0A84FF]", icon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
    { label: String(config.shortcut2), color: "bg-[#FF9F0A]", icon: "M9 18h6M10 22h4M12 2v1M19 4l-1 1M5 4l1 1M12 6a6 6 0 0 0-6 6c0 2 1.5 3.5 2 4.5h8c.5-1 2-2.5 2-4.5a6 6 0 0 0-6-6z" },
    { label: String(config.shortcut3), color: "bg-[#BF5AF2]", icon: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" },
    { label: String(config.shortcut4), color: "bg-[#FF375F]", icon: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" }
  ];

  return (
    <WidgetWrapper delay={delay} onRemove={onRemove} className="p-3 bg-card grid grid-cols-2 grid-rows-2 gap-3">
      {shortcuts.map((s, i) => (
        <motion.div 
          key={i}
          whileTap={{ scale: 0.9 }}
          className={`rounded-[16px] ${s.color} p-2 flex flex-col justify-between items-start cursor-pointer shadow-sm`}
        >
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={s.icon} />
            </svg>
          </div>
          <span className="text-[10px] font-bold text-white leading-tight mt-1">{s.label}</span>
        </motion.div>
      ))}
    </WidgetWrapper>
  );
}
