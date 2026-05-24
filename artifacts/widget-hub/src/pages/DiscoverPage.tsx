import { useState, useMemo } from "react";
import { Plus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { widgetRegistry, type WidgetDef } from "@/lib/widgetRegistry";
import { useWidgets } from "@/context/WidgetContext";
import { AddWidgetSheet } from "@/components/AddWidgetSheet";

const CATEGORIES = ["All", "Time & Location", "Productivity", "Wellness"] as const;

export function DiscoverPage() {
  const { addedWidgets, removeWidget } = useWidgets();
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>("All");
  const [selectedWidget, setSelectedWidget] = useState<WidgetDef | null>(null);

  const filteredWidgets = useMemo(() => {
    if (activeCategory === "All") return widgetRegistry;
    return widgetRegistry.filter((w) => w.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="flex flex-col gap-6 pt-12">
      <div className="px-5">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-3xl font-bold tracking-tight">Widget Library</h1>
          <span className="text-[12px] px-2 py-0.5 rounded-full bg-white/10 font-semibold text-white/70">
            {addedWidgets.size} added
          </span>
        </div>
        <p className="text-[15px] text-white/50">Tap + to add widgets to your home screen</p>
      </div>

      {/* Category filter chips */}
      <div className="flex gap-2 px-5 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border whitespace-nowrap ${
              activeCategory === category
                ? "bg-white text-black border-white"
                : "bg-black text-white border-white/20"
            }`}
            data-testid={`filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Widget list */}
      <div className="flex flex-col gap-3 pb-8">
        {filteredWidgets.map((widget) => (
          <WidgetListCard
            key={widget.id}
            widget={widget}
            isAdded={addedWidgets.has(widget.id)}
            onAdd={() => setSelectedWidget(widget)}
            onRemove={() => removeWidget(widget.id)}
          />
        ))}
      </div>

      <AddWidgetSheet
        widget={selectedWidget}
        onClose={() => setSelectedWidget(null)}
      />
    </div>
  );
}

function WidgetListCard({
  widget,
  isAdded,
  onAdd,
  onRemove,
}: {
  widget: typeof widgetRegistry[0];
  isAdded: boolean;
  onAdd: () => void;
  onRemove: () => void;
}) {
  const { id, name, description, category, accentColor, component: WidgetComponent } = widget;

  return (
    <div className="flex gap-4 items-center bg-[#1c1c1e] rounded-2xl p-4 mx-4">
      {/* Left: mini widget preview */}
      <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden flex-shrink-0 relative pointer-events-none bg-black/20">
        <div className="scale-[0.35] origin-top-left absolute" style={{ width: "206px", height: "206px" }}>
          <WidgetComponent delay={0} />
        </div>
      </div>

      {/* Middle: name, description, category badge */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-semibold text-[15px] text-white">{name}</span>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
            style={{ background: accentColor + "22", color: accentColor }}
          >
            {category}
          </span>
        </div>
        <p className="text-[13px] text-white/50 leading-snug line-clamp-2">{description}</p>
      </div>

      {/* Right: Add/Added button */}
      <button
        onClick={() => (isAdded ? onRemove() : onAdd())}
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
          isAdded ? "bg-white/10" : "bg-white"
        }`}
        data-testid={isAdded ? `remove-widget-${id}` : `add-widget-${id}`}
      >
        <AnimatePresence mode="wait">
          {isAdded ? (
            <motion.div
              key="check"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Check className="w-4 h-4 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="plus"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Plus className="w-4 h-4 text-black" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
