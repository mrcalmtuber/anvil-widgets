import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { widgetConfigFields } from "@/lib/widgetConfigs";
import { useConfig } from "@/context/ConfigContext";
import type { WidgetDef } from "@/lib/widgetRegistry";

interface ConfigSheetProps {
  widget: WidgetDef | null;
  onClose: () => void;
}

export function ConfigSheet({ widget, onClose }: ConfigSheetProps) {
  const isOpen = widget !== null;
  
  // Only call hooks when widget is not null
  const widgetId = widget?.id ?? "";
  const { config, setConfig } = useConfig(widgetId);
  const fields = widgetId ? (widgetConfigFields[widgetId] ?? []) : [];
  
  const [localConfig, setLocalConfig] = useState<Record<string, string | number>>({});
  
  useEffect(() => {
    if (widget) {
      setLocalConfig({ ...config });
    }
  }, [widget?.id, config]);
  
  const handleSave = () => {
    setConfig(localConfig);
    setTimeout(onClose, 200);
  };
  
  const updateField = (key: string, value: string | number) => {
    setLocalConfig((prev) => ({ ...prev, [key]: value }));
  };
  
  return (
    <AnimatePresence>
      {isOpen && widget && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#1c1c1e] rounded-t-[28px] max-h-[85vh] overflow-hidden flex flex-col"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>
            
            <div className="flex items-center justify-between px-5 pb-4 flex-shrink-0">
              <div>
                <h2 className="text-xl font-bold text-white">{widget.name} Settings</h2>
                <p className="text-[13px] text-white/50">Personalize this widget</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center" data-testid="close-config-sheet">
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1 px-5 pb-6 space-y-5">
              {fields.length > 0 && (
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
              )}
              
              <button
                onClick={handleSave}
                className="w-full py-3.5 rounded-2xl font-semibold text-[16px] bg-white text-black transition-all flex items-center justify-center gap-2"
                data-testid="save-config-btn"
              >
                <Check className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
