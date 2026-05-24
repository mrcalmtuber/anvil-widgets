import { useState } from "react";
import { Grid2X2, Smartphone, Settings as SettingsIcon } from "lucide-react";
import { DiscoverPage } from "./DiscoverPage";
import { MyScreenPage } from "./MyScreenPage";
import { SettingsPage } from "./SettingsPage";
import { OnboardingPage } from "./OnboardingPage";

type Tab = "discover" | "myscreen" | "settings";

export default function Home() {
  const [showOnboarding, setShowOnboarding] = useState(
    () => localStorage.getItem("onboarding-complete") !== "true"
  );
  const [tab, setTab] = useState<Tab>("discover");

  if (showOnboarding) {
    return <OnboardingPage onComplete={() => setShowOnboarding(false)} />;
  }

  const tabs: Array<{ id: Tab; label: string; icon: React.ReactNode }> = [
    { id: "discover", label: "Discover", icon: <Grid2X2 className="w-5 h-5" /> },
    { id: "myscreen", label: "My Screen", icon: <Smartphone className="w-5 h-5" /> },
    { id: "settings", label: "Settings", icon: <SettingsIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-[100dvh] w-full bg-black text-white flex flex-col">
      <div className="flex-1 overflow-y-auto pb-[calc(60px+env(safe-area-inset-bottom))]">
        {tab === "discover" && <DiscoverPage />}
        {tab === "myscreen" && <MyScreenPage onAddMore={() => setTab("discover")} />}
        {tab === "settings" && <SettingsPage />}
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 flex items-stretch z-50"
        style={{ height: "calc(60px + env(safe-area-inset-bottom))", paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className="flex-1 flex flex-col items-center justify-center gap-1 relative"
            data-testid={`tab-${id}`}
          >
            <div className={tab === id ? "text-white" : "text-white/40"}>{icon}</div>
            <span className={`text-[10px] font-medium ${tab === id ? "text-white" : "text-white/40"}`}>{label}</span>
            {tab === id && <div className="absolute bottom-2 w-1 h-1 bg-white rounded-full" />}
          </button>
        ))}
      </div>
    </div>
  );
}
