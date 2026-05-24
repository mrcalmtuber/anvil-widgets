import { useConfig } from "@/context/ConfigContext";
import { WidgetWrapper } from "./WidgetWrapper";

export function CalendarWidget({ delay = 0, onRemove }: { delay?: number; onRemove?: () => void }) {
  const { config } = useConfig("calendar");
  const calendarName = String(config.calendarName);
  const event1 = String(config.event1);
  const event1Time = String(config.event1Time);
  const event2 = String(config.event2);
  const event2Time = String(config.event2Time);

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dayNum = today.getDate();

  const events = [
    { title: event1, time: event1Time, color: "#FF3B30" },
    { title: event2, time: event2Time, color: "#34C759" }
  ];

  return (
    <WidgetWrapper delay={delay} onRemove={onRemove} className="p-4 justify-between bg-card text-card-foreground">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-[#FF3B30] text-sm font-semibold tracking-wide uppercase">{dayName}</h4>
          <div className="text-4xl font-light tracking-tighter mt-1">{dayNum}</div>
        </div>
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{calendarName}</span>
      </div>
      <div className="space-y-2 mt-4">
        {events.map((e, i) => (
          <div key={i} className="flex gap-2 items-center">
            <div className="w-1 h-8 rounded-full" style={{ backgroundColor: e.color }} />
            <div className="flex flex-col">
              <span className="text-xs font-semibold">{e.title}</span>
              <span className="text-[10px] text-muted-foreground">{e.time}</span>
            </div>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
