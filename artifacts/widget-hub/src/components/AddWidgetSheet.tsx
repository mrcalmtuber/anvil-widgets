import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Check } from "lucide-react";
import { widgetConfigFields } from "@/lib/widgetConfigs";
import { useConfig } from "@/context/ConfigContext";
import { useWidgets } from "@/context/WidgetContext";
import type { WidgetDef } from "@/lib/widgetRegistry";

interface AddWidgetSheetProps {
  widget: WidgetDef | null;
  onClose: () => void;
}

export function AddWidgetSheet({ widget, onClose }: AddWidgetSheetProps) {
  const isOpen = widget !== null;
  const { addWidget, addedWidgets } = useWidgets();
  
  // Only call hooks when widget is not null
  const widgetId = widget?.id ?? "";
  const { config, setConfig } = useConfig(widgetId);
  const fields = widgetId ? (widgetConfigFields[widgetId] ?? []) : [];
  
  const [localConfig, setLocalConfig] = useState<Record<string, string | number>>({});
  const [added, setAdded] = useState(false);
  
  useEffect(() => {
    if (widget) {
      setLocalConfig({ ...config });
      setAdded(addedWidgets.has(widget.id));
    }
    // Only re-initialize when the selected widget changes, not on every config/addedWidgets reference change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widget?.id]);
  
  const handleSave = () => {
    setConfig(localConfig);
    if (!added) {
      addWidget(widgetId);
      setAdded(true);
    }
    setTimeout(onClose, 400);
  };
  
  const updateField = (key: string, value: string | number) => {
    setLocalConfig((prev) => ({ ...prev, [key]: value }));
  };
  
  return (
    <AnimatePresence>
      {isOpen && widget && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#1c1c1e] rounded-t-[28px] max-h-[85vh] overflow-hidden flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>
            
            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-4 flex-shrink-0">
              <div>
                <h2 className="text-xl font-bold text-white">{widget.name}</h2>
                <p className="text-[13px] text-white/50">{widget.description}</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center" data-testid="close-sheet">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            
            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1 px-5 pb-6 space-y-5">
              {/* Live Widget Preview */}
              <div>
                <h3 className="text-[13px] font-semibold text-white/50 uppercase tracking-wider mb-3">Preview</h3>
                <div
                  className="w-full rounded-2xl overflow-hidden relative bg-[#0a0a0a]"
                  style={{ height: "160px" }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{ transform: "scale(0.82)", transformOrigin: "center center" }}
                  >
                    <div className="w-full h-full">
                      <widget.component delay={0} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Config fields */}
              {fields.length > 0 && (
                <div>
                  <h3 className="text-[13px] font-semibold text-white/50 uppercase tracking-wider mb-3">Configure</h3>
                  <div className="space-y-2">
                    {fields.map((field) => (
                      <div key={field.key} className="bg-[#2c2c2e] rounded-xl p-3">
                        <label className="text-[12px] text-white/50 block mb-1.5">{field.label}</label>
                        {field.type === "select" ? (
                          <div className="flex gap-2">
                            {field.options?.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => updateField(field.key, opt)}
                                className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                  String(localConfig[field.key] ?? field.defaultValue) === opt
                                    ? "bg-white text-black"
                                    : "bg-white/10 text-white"
                                }`}
                                data-testid={`config-option-${field.key}-${opt}`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        ) : field.type === "number" ? (
                          <input
                            type="number"
                            min={field.min}
                            max={field.max}
                            value={String(localConfig[field.key] ?? field.defaultValue)}
                            onChange={(e) => updateField(field.key, e.target.valueAsNumber || 0)}
                            className="w-full bg-transparent text-white text-[15px] font-medium outline-none"
                            data-testid={`config-input-${field.key}`}
                          />
                        ) : (
                          <input
                            type="text"
                            value={String(localConfig[field.key] ?? field.defaultValue)}
                            onChange={(e) => updateField(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full bg-transparent text-white text-[15px] font-medium outline-none placeholder:text-white/20"
                            data-testid={`config-input-${field.key}`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add to My Screen button */}
              <button
                onClick={handleSave}
                className={`w-full py-3.5 rounded-2xl font-semibold text-[16px] transition-all flex items-center justify-center gap-2 ${
                  added
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-white text-black"
                }`}
                data-testid="add-to-screen-btn"
              >
                {added ? (
                  <><Check className="w-4 h-4" /> Added to My Screen</>
                ) : (
                  <><Plus className="w-4 h-4" /> Add to My Screen</>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
