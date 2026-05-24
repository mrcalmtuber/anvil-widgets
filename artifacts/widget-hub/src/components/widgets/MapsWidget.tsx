import { WidgetWrapper } from "./WidgetWrapper";

export function MapsWidget({ delay = 0 }: { delay?: number }) {
  return (
    <WidgetWrapper delay={delay} className="p-0 border-none relative overflow-hidden bg-[#242426]">
      {/* simulated map background */}
      <div className="absolute inset-0 bg-[#2b2b2d] opacity-80" />
      <svg className="absolute inset-0 w-full h-full text-white/5" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,20 L30,40 L50,10 L80,30 L100,0 M20,100 L40,70 L70,80 L100,50 M40,70 L50,10 M80,30 L70,80" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
      
      {/* Location pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-3 h-3 bg-blue-500 border-2 border-white rounded-full shadow-md" />
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Work</span>
          <span className="text-xs font-semibold text-white">12 min drive</span>
        </div>
      </div>
    </WidgetWrapper>
  );
}
