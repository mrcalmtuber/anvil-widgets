import { WidgetWrapper } from "./WidgetWrapper";
import { useEffect, useState } from "react";

export function ClockWidget({ delay = 0, onRemove }: { delay?: number; onRemove?: () => void }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secDeg = seconds * 6;
  const minDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <WidgetWrapper delay={delay} onRemove={onRemove} className="p-4 bg-black flex flex-col items-center justify-center">
      <div className="relative w-[110px] h-[110px] rounded-full border-[3px] border-white flex items-center justify-center bg-black">
        {/* Ticks */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-full p-1"
            style={{ transform: `rotate(${i * 30}deg)` }}
          >
            <div className={`mx-auto bg-white ${i % 3 === 0 ? 'w-1 h-3' : 'w-[2px] h-2 opacity-50'}`} />
          </div>
        ))}
        {/* Hour Hand */}
        <div 
          className="absolute w-1.5 h-[30%] bg-white rounded-full origin-bottom bottom-1/2"
          style={{ transform: `rotate(${hourDeg}deg)` }}
        />
        {/* Minute Hand */}
        <div 
          className="absolute w-1 h-[40%] bg-white rounded-full origin-bottom bottom-1/2"
          style={{ transform: `rotate(${minDeg}deg)` }}
        />
        {/* Second Hand */}
        <div 
          className="absolute w-[2px] h-[45%] bg-[#FF9500] rounded-full origin-bottom bottom-1/2"
          style={{ transform: `rotate(${secDeg}deg)` }}
        />
        {/* Center dot */}
        <div className="absolute w-2 h-2 bg-[#FF9500] rounded-full" />
      </div>
      <div className="absolute top-3 left-3">
        <span className="text-[10px] font-semibold text-white/50 tracking-widest uppercase">CUPERTINO</span>
      </div>
    </WidgetWrapper>
  );
}
