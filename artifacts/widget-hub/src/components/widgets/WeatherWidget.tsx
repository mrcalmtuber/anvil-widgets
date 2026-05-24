import { useConfig } from "@/context/ConfigContext";
import { WidgetWrapper } from "./WidgetWrapper";

export function WeatherWidget({ delay = 0, onRemove }: { delay?: number; onRemove?: () => void }) {
  const { config } = useConfig("weather");
  const city = String(config.city);
  const unit = String(config.unit);
  const temp = Number(config.temp);
  const condition = String(config.condition);

  const hourly = [
    { time: "Now", temp: temp },
    { time: "1 PM", temp: temp + 1 },
    { time: "2 PM", temp: temp + 2 },
    { time: "3 PM", temp: temp },
    { time: "4 PM", temp: temp - 2 },
    { time: "5 PM", temp: temp - 4 },
  ];

  return (
    <WidgetWrapper colSpan={2} delay={delay} onRemove={onRemove} className="bg-gradient-to-b from-[#1A457B] to-[#4FC3F7] border-none text-white p-4 justify-between">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-medium tracking-tight shadow-black/20 drop-shadow-sm">{city}</h3>
          <p className="text-5xl font-light tracking-tighter mt-1 shadow-black/20 drop-shadow-sm">{temp}°</p>
        </div>
        <div className="text-right flex flex-col items-end">
          <img src="/icons/weather.png" alt="Weather" className="w-10 h-10 mb-1 drop-shadow-md rounded-[8px]" />
          <p className="text-sm font-medium opacity-90">{condition}</p>
          <p className="text-xs font-medium opacity-80">H:{temp+3}° L:{temp-5}°</p>
        </div>
      </div>
      <div className="flex justify-between items-end border-t border-white/20 pt-3 mt-4">
        {hourly.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="text-[11px] font-medium opacity-90">{h.time}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-300">
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
              <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
            </svg>
            <span className="text-sm font-medium">{h.temp}°</span>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
