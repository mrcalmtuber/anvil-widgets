import { WidgetWrapper } from "./WidgetWrapper";

export function ScreenTimeWidget({ delay = 0, onRemove }: { delay?: number; onRemove?: () => void }) {
  const bars = [
    { label: "IG", height: "80%", color: "#BF5AF2" },
    { label: "Safari", height: "50%", color: "#0A84FF" },
    { label: "Msgs", height: "40%", color: "#30D158" },
    { label: "Mail", height: "20%", color: "#5E5E62" }
  ];

  return (
    <WidgetWrapper delay={delay} onRemove={onRemove} className="p-4 bg-card text-card-foreground flex flex-col justify-between">
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground">Screen Time</h4>
        <p className="text-xl font-bold tracking-tight text-[#BF5AF2] mt-0.5">4h 32m</p>
      </div>
      
      <div className="flex justify-between items-end h-[60px] px-1">
        {bars.map((bar, i) => (
          <div key={i} className="flex flex-col items-center gap-1 w-6">
            <div className="w-4 bg-muted rounded-t-sm relative flex flex-col justify-end overflow-hidden h-[40px]">
              <div className="w-full rounded-t-sm" style={{ height: bar.height, backgroundColor: bar.color }} />
            </div>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
