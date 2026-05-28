import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getDefaults } from "@/lib/widgetConfigs";
import { Capacitor } from "@capacitor/core";

type Configs = Record<string, Record<string, string | number>>;

interface ConfigContextType {
  getConfig: (widgetId: string) => Record<string, string | number>;
  setConfig: (widgetId: string, config: Record<string, string | number>) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [configs, setConfigs] = useState<Configs>({});

  useEffect(() => {
    const saved = localStorage.getItem("widget-configs");
    if (saved) {
      try { setConfigs(JSON.parse(saved)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("widget-configs", JSON.stringify(configs));

    if (Capacitor.isNativePlatform()) {
      try {
        const savedWidgets = localStorage.getItem("added-widgets");
        let added = [];
        if (savedWidgets) {
          try { added = JSON.parse(savedWidgets); } catch {}
        }
        Capacitor.Plugins.MyWidgetPlugin.syncWidgets({
          added: added,
          configs: configs
        });
      } catch (err) {
        console.error("Failed to sync configs to native iOS", err);
      }
    }
  }, [configs]);

  const getConfig = (widgetId: string) => ({
    ...getDefaults(widgetId),
    ...(configs[widgetId] ?? {}),
  });

  const setConfig = (widgetId: string, config: Record<string, string | number>) => {
    setConfigs((prev) => ({ ...prev, [widgetId]: config }));
  };

  return (
    <ConfigContext.Provider value={{ getConfig, setConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig(widgetId: string) {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error("useConfig must be used within ConfigProvider");
  return {
    config: ctx.getConfig(widgetId),
    setConfig: (c: Record<string, string | number>) => ctx.setConfig(widgetId, c),
  };
}
