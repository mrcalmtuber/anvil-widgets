import { WidgetWrapper } from "./WidgetWrapper";

export function CalendarWidget({ delay = 0 }: { delay?: number }) {
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
  const dayNum = today.getDate();

  const events = [
    { title: "Design Sync", time: "2:00 PM", color: "#FF3B30" },
    { title: "Review PRs", time: "4:30 PM", color: "#34C759" }
  ];

  return (
    <WidgetWrapper delay={delay} className="p-4 justify-between bg-card text-card-foreground">
      <div>
        <h4 className="text-[#FF3B30] text-sm font-semibold tracking-wide uppercase">{dayName}</h4>
        <div className="text-4xl font-light tracking-tighter mt-1">{dayNum}</div>
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
