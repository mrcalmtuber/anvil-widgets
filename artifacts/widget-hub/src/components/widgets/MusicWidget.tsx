import { WidgetWrapper } from "./WidgetWrapper";
import { useState } from "react";
import { motion } from "framer-motion";

export function MusicWidget({ delay = 0 }: { delay?: number }) {
  const [playing, setPlaying] = useState(true);

  return (
    <WidgetWrapper colSpan={2} delay={delay} className="p-4 bg-card text-card-foreground flex items-center gap-4">
      <div className="w-[68px] h-[68px] rounded-[12px] bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 flex-shrink-0 shadow-md relative overflow-hidden">
        {/* simulate album art */}
        <div className="absolute inset-0 bg-black/10" />
      </div>
      
      <div className="flex flex-col flex-1 min-w-0">
        <h4 className="font-semibold text-sm truncate">Blinding Lights</h4>
        <p className="text-xs text-muted-foreground truncate">The Weeknd</p>
        
        <div className="flex items-center gap-4 mt-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white opacity-80 hover:opacity-100 cursor-pointer"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="w-[65%] h-full bg-white rounded-full" />
          </div>
          
          <div className="text-[10px] text-muted-foreground font-medium">2:14</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setPlaying(!playing)}
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white"
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>
          )}
        </motion.button>
      </div>
    </WidgetWrapper>
  );
}
