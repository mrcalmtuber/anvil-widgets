import { useConfig } from "@/context/ConfigContext";
import { WidgetWrapper } from "./WidgetWrapper";

export function NotesWidget({ delay = 0, onRemove }: { delay?: number; onRemove?: () => void }) {
  const { config } = useConfig("notes");
  const noteTitle = String(config.noteTitle);
  const noteContent = String(config.noteContent);

  return (
    <WidgetWrapper delay={delay} onRemove={onRemove} className="p-4 bg-[#FFD60A]/10 text-[#FFD60A] relative overflow-hidden">
      {/* Lined paper texture effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_bottom,transparent_19px,#FFD60A_20px)] bg-[length:100%_20px]" />
      
      <div className="flex gap-2 items-center mb-2">
        <img src="/icons/notes.png" alt="Notes" className="w-5 h-5 rounded-[4px]" />
        <h4 className="font-semibold text-sm">{noteTitle}</h4>
      </div>
      
      <p className="text-xs leading-5 font-medium mt-1 pr-2 opacity-90 text-foreground line-clamp-5 whitespace-pre-wrap">
        {noteContent}
      </p>
    </WidgetWrapper>
  );
}
