import { createContext, useContext, useEffect, useState, ReactNode } from "react";

import { Capacitor } from "@capacitor/core";

interface WidgetContextType {
  addedWidgets: Set<string>;
  addWidget: (id: string) => void;
  removeWidget: (id: string) => void;
}

const WidgetContext = createContext<WidgetContextType | undefined>(undefined);

export function WidgetProvider({ children }: { children: ReactNode }) {
  const [addedWidgets, setAddedWidgets] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("added-widgets");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setAddedWidgets(new Set(parsed));
        }
      } catch (e) {
        console.error("Failed to parse added-widgets from localStorage", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (isLoaded) {
      const addedArr = Array.from(addedWidgets);
      localStorage.setItem("added-widgets", JSON.stringify(addedArr));

      if (Capacitor.isNativePlatform()) {
        try {
          const savedConfigs = localStorage.getItem("widget-configs");
          let configs = {};
          if (savedConfigs) {
            try { configs = JSON.parse(savedConfigs); } catch {}
          }
          Capacitor.Plugins.MyWidgetPlugin.syncWidgets({
            added: addedArr,
            configs: configs
          });
        } catch (err) {
          console.error("Failed to sync widgets to native iOS", err);
        }
      }
    }
  }, [addedWidgets, isLoaded]);

  const addWidget = (id: string) => {
    setAddedWidgets((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const removeWidget = (id: string) => {
    setAddedWidgets((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  return (
    <WidgetContext.Provider value={{ addedWidgets, addWidget, removeWidget }}>
      {children}
    </WidgetContext.Provider>
  );
}

export function useWidgets() {
  const context = useContext(WidgetContext);
  if (context === undefined) {
    throw new Error("useWidgets must be used within a WidgetProvider");
  }
  return context;
}
