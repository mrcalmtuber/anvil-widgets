import { format } from "date-fns";
import { WeatherWidget } from "@/components/widgets/WeatherWidget";
import { CalendarWidget } from "@/components/widgets/CalendarWidget";
import { ClockWidget } from "@/components/widgets/ClockWidget";
import { BatteriesWidget } from "@/components/widgets/BatteriesWidget";
import { RemindersWidget } from "@/components/widgets/RemindersWidget";
import { NotesWidget } from "@/components/widgets/NotesWidget";
import { ScreenTimeWidget } from "@/components/widgets/ScreenTimeWidget";
import { ShortcutsWidget } from "@/components/widgets/ShortcutsWidget";
import { FilesWidget } from "@/components/widgets/FilesWidget";
import { FitnessWidget } from "@/components/widgets/FitnessWidget";
import { HealthWidget } from "@/components/widgets/HealthWidget";
import { PhotosWidget } from "@/components/widgets/PhotosWidget";
import { MusicWidget } from "@/components/widgets/MusicWidget";
import { FindMyWidget } from "@/components/widgets/FindMyWidget";
import { MapsWidget } from "@/components/widgets/MapsWidget";

export default function Home() {
  const today = new Date();

  return (
    <div className="min-h-[100dvh] w-full bg-black text-white selection:bg-white/20 pb-12">
      <div className="max-w-[390px] mx-auto w-full px-4 pt-12 pb-6 min-h-screen flex flex-col relative">
        {/* Header */}
        <header className="mb-6 px-1">
          <h1 className="text-[28px] font-bold tracking-tight">My Widgets</h1>
          <p className="text-[13px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">
            {format(today, "EEEE, MMMM d")}
          </p>
        </header>

        {/* Widget Grid */}
        <div className="grid grid-cols-2 gap-4 pb-8">
          <WeatherWidget delay={0.05} />
          
          <CalendarWidget delay={0.1} />
          <ClockWidget delay={0.15} />
          
          <BatteriesWidget delay={0.2} />
          <RemindersWidget delay={0.25} />
          
          <NotesWidget delay={0.3} />
          <ScreenTimeWidget delay={0.35} />
          
          <ShortcutsWidget delay={0.4} />
          <FilesWidget delay={0.45} />
          
          <FitnessWidget delay={0.5} />
          
          <HealthWidget delay={0.55} />
          <PhotosWidget delay={0.6} />
          
          <MusicWidget delay={0.65} />
          
          <FindMyWidget delay={0.7} />
          <MapsWidget delay={0.75} />
        </div>
      </div>
    </div>
  );
}
