import { Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { widgetRegistry } from "@/lib/widgetRegistry";
import { useWidgets } from "@/context/WidgetContext";
import { Button } from "@/components/ui/button";

export function MyScreenPage({ onAddMore }: { onAddMore: () => void }) {
  const { addedWidgets, removeWidget } = useWidgets();

  const activeWidgets = widgetRegistry.filter((w) => addedWidgets.has(w.id));

  if (activeWidgets.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[70vh]">
        <div className="w-24 h-24 mb-6 text-white/20">
          <Smartphone className="w-full h-full stroke-[1px]" />
        </div>
        <h2 className="text-xl font-semibold mb-2">No widgets yet</h2>
        <p className="text-sm text-white/50 mb-8 max-w-[200px]">
          Go to Discover to add widgets to your home screen
        </p>
        <Button
          onClick={onAddMore}
          variant="outline"
          className="rounded-full px-8 border-white/20 hover:bg-white/5 h-11"
          data-testid="button-browse-widgets"
        >
          Browse Widgets
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-12">
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-3xl font-bold tracking-tight">My Screen</h1>
          <span className="text-[12px] px-2 py-0.5 rounded-full bg-white/10 font-semibold text-white/70">
            {activeWidgets.length} widgets
          </span>
        </div>
        <p className="text-[15px] text-white/50">Tap — to remove a widget</p>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4 pb-8">
        <AnimatePresence mode="popLayout">
          {activeWidgets.map((widget, index) => {
            const WidgetComponent = widget.component;
            return (
              <WidgetComponent
                key={widget.id}
                delay={index * 0.05}
                onRemove={() => removeWidget(widget.id)}
              />
            );
          })}
        </AnimatePresence>
      </div>

      <div className="px-4 pb-12 mt-4">
        <Button
          onClick={onAddMore}
          variant="outline"
          className="w-full rounded-2xl border-dashed border-white/20 hover:bg-white/5 h-14 text-white/60"
          data-testid="button-add-more"
        >
          Add More
        </Button>
      </div>
    </div>
  );
}
