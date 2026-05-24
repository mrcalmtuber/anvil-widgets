import { useConfig } from "@/context/ConfigContext";
import { WidgetWrapper } from "./WidgetWrapper";

export function FindMyWidget({ delay = 0, onRemove }: { delay?: number; onRemove?: () => void }) {
  const { config } = useConfig("findmy");
  const items = [
    { name: String(config.item1), location: String(config.item1Location), status: "nearby", icon: "M3 14h3v5H3zm15 0h3v5h-3zM3 14c0-4.97 4.03-9 9-9s9 4.03 9 9" },
    { name: String(config.item2), location: String(config.item2Location), status: "away", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
    { name: String(config.item3), location: String(config.item3Location), status: "nearby", icon: "M4 4h16v16H4z" }
  ];

  return (
    <WidgetWrapper delay={delay} onRemove={onRemove} className="p-4 bg-card text-card-foreground">
      <div className="flex gap-2 items-center mb-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#34C759]"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>
        <h4 className="font-semibold text-sm">Find My</h4>
      </div>
      <div className="flex flex-col gap-2.5 flex-1">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2 items-center">
            <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0`}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className={item.status === 'nearby' ? 'text-[#34C759]' : 'text-muted-foreground'}>
                <path d={item.icon} />
              </svg>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold truncate">{item.name}</span>
              <span className="text-[10px] text-muted-foreground truncate">{item.location}</span>
            </div>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
