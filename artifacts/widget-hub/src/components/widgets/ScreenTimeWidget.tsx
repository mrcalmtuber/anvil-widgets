import { useConfig } from "@/context/ConfigContext";
import { WidgetWrapper } from "./WidgetWrapper";

export function ScreenTimeWidget({ delay = 0, onRemove }: { delay?: number; onRemove?: () => void }) {
  const { config } = useConfig("screentime");
  const totalHours = Number(config.totalHours);
  const totalMins = Number(config.totalMins);

  const bars = [
    { label: String(config.app1Name), time: String(config.app1Time), color: "#BF5AF2", height: "80%" },
    { label: String(config.app2Name), time: String(config.app2Time), color: "#0A84FF", height: "50%" },
    { label: String(config.app3Name), time: String(config.app3Time), color: "#30D158", height: "40%" },
    { label: "Other", time: "20m", color: "#5E5E62", height: "20%" }
  ];

  return (
    <WidgetWrapper delay={delay} onRemove={onRemove} className="p-4 bg-card text-card-foreground flex flex-col justify-between">
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground">Screen Time</h4>
        <p className="text-xl font-bold tracking-tight text-[#BF5AF2] mt-0.5">{totalHours}h {totalMins}m</p>
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
