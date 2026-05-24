import { WidgetWrapper } from "./WidgetWrapper";

export function FilesWidget({ delay = 0 }: { delay?: number }) {
  const files = [
    { name: "Q4 Report", ext: "pdf", date: "Yesterday", color: "text-[#FF375F]" },
    { name: "Design Brief", ext: "fig", date: "Tuesday", color: "text-[#BF5AF2]" },
    { name: "Notes", ext: "md", date: "Oct 12", color: "text-[#0A84FF]" }
  ];

  return (
    <WidgetWrapper delay={delay} className="p-4 bg-card text-card-foreground">
      <div className="flex gap-2 items-center mb-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#0A84FF]"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
        <h4 className="font-semibold text-sm">Recents</h4>
      </div>
      <div className="flex flex-col gap-2.5">
        {files.map((f, i) => (
          <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className={`text-xs font-bold ${f.color} uppercase w-6 text-center`}>{f.ext}</span>
              <span className="text-xs font-medium truncate">{f.name}</span>
            </div>
            <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">{f.date}</span>
          </div>
        ))}
      </div>
    </WidgetWrapper>
  );
}
