import { useWidgets } from "@/context/WidgetContext";
import { widgetRegistry } from "@/lib/widgetRegistry";
import { Trash2, Info, Star, Shield, ChevronRight, RotateCcw } from "lucide-react";
import { useState } from "react";

export function SettingsPage() {
  const { addedWidgets, removeWidget } = useWidgets();
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleClearAll = () => {
    widgetRegistry.forEach((w) => removeWidget(w.id));
    localStorage.removeItem("widget-configs");
    setShowConfirmClear(false);
  };

  const handleReplayOnboarding = () => {
    localStorage.removeItem("onboarding-complete");
    window.location.reload();
  };

  type SettingItem = {
    icon: React.ReactNode;
    label: string;
    value?: string;
    action?: () => void;
    destructive?: boolean;
  };

  type Section = {
    title: string;
    items: SettingItem[];
  };

  const sections: Section[] = [
    {
      title: "Your Widgets",
      items: [
        {
          icon: <div className="w-8 h-8 rounded-xl bg-blue-500/20 flex items-center justify-center"><span className="text-blue-400 font-bold text-[13px]">{addedWidgets.size}</span></div>,
          label: "Active Widgets",
          value: `${addedWidgets.size} of 15`,
        },
      ],
    },
    {
      title: "App",
      items: [
        {
          icon: <div className="w-8 h-8 rounded-xl bg-yellow-500/20 flex items-center justify-center"><Star className="w-4 h-4 text-yellow-400" /></div>,
          label: "Rate Widget Hub",
          action: () => {},
        },
        {
          icon: <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center"><Shield className="w-4 h-4 text-purple-400" /></div>,
          label: "Privacy Policy",
          action: () => {},
        },
        {
          icon: <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center"><Info className="w-4 h-4 text-white/60" /></div>,
          label: "Version",
          value: "1.0.0",
        },
      ],
    },
    {
      title: "Reset",
      items: [
        {
          icon: <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center"><RotateCcw className="w-4 h-4 text-orange-400" /></div>,
          label: "Replay Intro",
          action: handleReplayOnboarding,
        },
        {
          icon: <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center"><Trash2 className="w-4 h-4 text-red-400" /></div>,
          label: "Clear All Widgets",
          action: () => setShowConfirmClear(true),
          destructive: true,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col pt-12 pb-8">
      <div className="px-5 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-[15px] text-white/50 mt-1">Manage your widget preferences</p>
      </div>

      <div className="flex flex-col gap-8 px-4">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-[12px] font-semibold text-white/40 uppercase tracking-wider mb-2 px-1">{section.title}</p>
            <div className="bg-[#1c1c1e] rounded-2xl overflow-hidden divide-y divide-white/5">
              {section.items.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  disabled={!item.action}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left ${item.action ? "active:bg-white/5" : "cursor-default"}`}
                  data-testid={`setting-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {item.icon}
                  <span className={`flex-1 text-[15px] font-medium ${item.destructive ? "text-red-400" : "text-white"}`}>{item.label}</span>
                  {item.value && <span className="text-[14px] text-white/40">{item.value}</span>}
                  {item.action && !item.value && <ChevronRight className="w-4 h-4 text-white/20" />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showConfirmClear && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end justify-center pb-8 px-4">
          <div className="bg-[#1c1c1e] rounded-2xl w-full max-w-sm overflow-hidden">
            <div className="px-6 pt-6 pb-4 text-center">
              <h3 className="text-[17px] font-semibold mb-1">Clear All Widgets?</h3>
              <p className="text-[14px] text-white/50">This will remove all widgets and reset your configurations.</p>
            </div>
            <div className="border-t border-white/10 divide-y divide-white/10">
              <button onClick={handleClearAll} className="w-full py-4 text-red-400 text-[16px] font-semibold" data-testid="confirm-clear-all">Clear All</button>
              <button onClick={() => setShowConfirmClear(false)} className="w-full py-4 text-white text-[16px]" data-testid="cancel-clear-all">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
