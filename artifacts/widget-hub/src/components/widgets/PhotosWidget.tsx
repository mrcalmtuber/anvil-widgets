import { WidgetWrapper } from "./WidgetWrapper";

export function PhotosWidget({ delay = 0, onRemove }: { delay?: number; onRemove?: () => void }) {
  return (
    <WidgetWrapper delay={delay} onRemove={onRemove} className="p-0 border-none bg-black relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 opacity-80" />
      <div className="absolute inset-0 bg-black/20" />
      
      <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <h4 className="text-white font-bold text-[15px] drop-shadow-md leading-tight">Memories<br/><span className="text-white/80 font-medium text-xs">3 years ago today</span></h4>
        </div>
      </div>
    </WidgetWrapper>
  );
}
