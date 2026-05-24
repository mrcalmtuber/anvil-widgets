import { WidgetWrapper } from "./WidgetWrapper";

export function HealthWidget({ delay = 0 }: { delay?: number }) {
  return (
    <WidgetWrapper delay={delay} className="p-4 bg-card text-card-foreground flex flex-col justify-between">
      <div>
        <div className="flex gap-2 items-center mb-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#FF2D55]"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          <h4 className="font-semibold text-xs text-[#FF2D55]">Heart Rate</h4>
        </div>
        <p className="text-xl font-bold tracking-tight mt-0.5">72 <span className="text-xs font-normal text-muted-foreground">BPM</span></p>
      </div>
      
      <div className="w-full h-8 mt-2 flex items-center">
        {/* Simple sparkline */}
        <svg viewBox="0 0 100 30" className="w-full h-full stroke-[#FF2D55]" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0,15 L10,15 L15,5 L20,25 L25,15 L35,15 L40,10 L45,20 L50,15 L100,15" className="opacity-80" />
        </svg>
      </div>
      
      <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-white/5">
        <div className="flex-1 flex gap-0.5">
          {[1,2,3,4,5,6].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#5AC8FA]" />)}
          {[1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white/10" />)}
        </div>
      </div>
    </WidgetWrapper>
  );
}
