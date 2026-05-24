import { useConfig } from "@/context/ConfigContext";
import { WidgetWrapper } from "./WidgetWrapper";

export function BatteriesWidget({ delay = 0, onRemove }: { delay?: number; onRemove?: () => void }) {
  const { config } = useConfig("batteries");
  const devices = [
    { name: "iPhone", level: Number(config.iphoneLevel), type: "phone", color: "#34C759" },
    { name: "AirPods L", level: Number(config.airpodsL), type: "headphones", color: "#34C759" },
    { name: "AirPods R", level: Number(config.airpodsR), type: "headphones", color: "#34C759" },
    { name: "Watch", level: Number(config.watchLevel), type: "watch", color: "#FF9500" }
  ];

  return (
    <WidgetWrapper delay={delay} onRemove={onRemove} className="p-4 justify-between bg-card text-card-foreground">
      <div className="grid grid-cols-2 grid-rows-2 gap-3 h-full">
        {devices.map((device, i) => (
          <div key={i} className="flex flex-col items-center justify-center relative">
            <svg viewBox="0 0 36 36" className="w-12 h-12 transform -rotate-90">
              <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/10" />
              <circle 
                cx="18" cy="18" r="16" fill="none" 
                stroke={device.level > 20 ? device.color : "#FF3B30"} strokeWidth="3" strokeLinecap="round"
                strokeDasharray={`${(device.level / 100) * 100.5} 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              {device.type === 'phone' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mb-0.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/></svg>
              )}
              {device.type === 'headphones' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mb-0.5"><path d="M3 14h3v5H3zm15 0h3v5h-3zM3 14c0-4.97 4.03-9 9-9s9 4.03 9 9"/></svg>
              )}
              {device.type === 'watch' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mb-0.5"><rect x="6" y="4" width="12" height="16" rx="3" ry="3"/></svg>
              )}
              {device.type === 'case' && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="mb-0.5"><rect x="4" y="6" width="16" height="12" rx="4" ry="4"/></svg>
              )}
              <span className="text-[9px] font-bold">{device.level}%</span>
            </div>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
