import { useState } from "react";
import { Grid2X2, Smartphone } from "lucide-react";
import { DiscoverPage } from "./DiscoverPage";
import { MyScreenPage } from "./MyScreenPage";

export default function Home() {
  const [tab, setTab] = useState<"discover" | "myscreen">("discover");

  return (
    <div className="min-h-[100dvh] w-full bg-black text-white flex flex-col">
      <div className="flex-1 overflow-y-auto pb-[calc(60px+env(safe-area-inset-bottom))]">
        {tab === "discover" ? (
          <DiscoverPage />
        ) : (
          <MyScreenPage onAddMore={() => setTab("discover")} />
        )}
      </div>

      {/* Bottom Tab Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 h-[60px] bg-black/80 backdrop-blur-xl border-t border-white/10 flex items-center z-50"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <button
          onClick={() => setTab("discover")}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2 relative"
          data-testid="tab-discover"
        >
          <Grid2X2
            className={`w-5 h-5 transition-colors ${
              tab === "discover" ? "text-white" : "text-white/40"
            }`}
          />
          <span
            className={`text-[10px] font-medium transition-colors ${
              tab === "discover" ? "text-white" : "text-white/40"
            }`}
          >
            Discover
          </span>
          {tab === "discover" && (
            <div className="absolute bottom-1 w-1 h-1 bg-white rounded-full" />
          )}
        </button>
        <button
          onClick={() => setTab("myscreen")}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2 relative"
          data-testid="tab-myscreen"
        >
          <Smartphone
            className={`w-5 h-5 transition-colors ${
              tab === "myscreen" ? "text-white" : "text-white/40"
            }`}
          />
          <span
            className={`text-[10px] font-medium transition-colors ${
              tab === "myscreen" ? "text-white" : "text-white/40"
            }`}
          >
            My Screen
          </span>
          {tab === "myscreen" && (
            <div className="absolute bottom-1 w-1 h-1 bg-white rounded-full" />
          )}
        </button>
      </div>
    </div>
  );
}
