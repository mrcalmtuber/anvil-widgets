import { WidgetWrapper } from "./WidgetWrapper";

export function FitnessWidget({ delay = 0 }: { delay?: number }) {
  // Move: 420/500, Exercise: 28/30, Stand: 10/12
  const move = 420 / 500;
  const exercise = 28 / 30;
  const stand = 10 / 12;

  const getStrokeDasharray = (radius: number, percent: number) => {
    const circumference = 2 * Math.PI * radius;
    return `${percent * circumference} ${circumference}`;
  };

  return (
    <WidgetWrapper colSpan={2} delay={delay} className="p-4 bg-card text-card-foreground flex items-center gap-6">
      <div className="relative w-24 h-24 shrink-0 -rotate-90">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Background rings */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#FF2D55" strokeWidth="10" className="opacity-20" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="#a4ff2d" strokeWidth="10" className="opacity-20" />
          <circle cx="50" cy="50" r="16" fill="none" stroke="#4cd964" strokeWidth="10" className="opacity-20" />
          
          {/* Active rings */}
          <circle cx="50" cy="50" r="40" fill="none" stroke="#FF2D55" strokeWidth="10" strokeLinecap="round" strokeDasharray={getStrokeDasharray(40, move)} />
          <circle cx="50" cy="50" r="28" fill="none" stroke="#a4ff2d" strokeWidth="10" strokeLinecap="round" strokeDasharray={getStrokeDasharray(28, exercise)} />
          <circle cx="50" cy="50" r="16" fill="none" stroke="#4cd964" strokeWidth="10" strokeLinecap="round" strokeDasharray={getStrokeDasharray(16, stand)} />
        </svg>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <span className="text-[#FF2D55] font-bold text-xs">Move</span>
          <span className="text-white font-bold text-sm">420<span className="text-[10px] text-muted-foreground ml-0.5">/500</span></span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-[#a4ff2d] font-bold text-xs">Exercise</span>
          <span className="text-white font-bold text-sm">28<span className="text-[10px] text-muted-foreground ml-0.5">/30</span></span>
        </div>
        <div className="flex justify-between items-end">
          <span className="text-[#4cd964] font-bold text-xs">Stand</span>
          <span className="text-white font-bold text-sm">10<span className="text-[10px] text-muted-foreground ml-0.5">/12</span></span>
        </div>
      </div>
    </WidgetWrapper>
  );
}
