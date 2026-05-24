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
  }, [widget?.id, config, addedWidgets]);
  
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
              
              {/* iOS Home Screen Instructions */}
              <div className="bg-[#2c2c2e] rounded-2xl p-4">
                <h3 className="text-[13px] font-semibold text-white/50 uppercase tracking-wider mb-3">Add to iPhone Home Screen</h3>
                <p className="text-[12px] text-white/40 mb-4">Works on iPhone 7 and later. Open in Safari to install.</p>
                <div className="space-y-3">
                  {[
                    { step: "1", icon: "safari", text: "Open Widget Hub in Safari" },
                    { step: "2", icon: "share", text: "Tap the Share button at the bottom" },
                    { step: "3", icon: "add", text: 'Scroll down and tap "Add to Home Screen"' },
                    { step: "4", icon: "confirm", text: 'Tap "Add" in the top right corner' },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex items-start gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[11px] font-bold"
                        style={{ backgroundColor: widget.accentColor + "33", color: widget.accentColor }}
                      >
                        {step}
                      </div>
                      <p className="text-[13px] text-white/70 leading-snug pt-0.5">{text}</p>
                    </div>
                  ))}
                </div>
                {/* Share icon visual hint */}
                <div className="mt-4 flex items-center gap-2 bg-[#1c1c1e] rounded-xl p-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 flex-shrink-0">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                  <p className="text-[12px] text-white/50">Look for this icon in Safari's toolbar</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
