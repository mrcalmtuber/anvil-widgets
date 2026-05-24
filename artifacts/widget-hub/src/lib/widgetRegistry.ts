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

export type WidgetDef = {
  id: string;
  name: string;
  description: string;
  category: "Time & Location" | "Productivity" | "Wellness";
  accentColor: string; // hex
  colSpan: 1 | 2;
  component: React.ComponentType<{ delay?: number; onRemove?: () => void }>;
};

export const widgetRegistry: WidgetDef[] = [
  {
    id: "weather",
    name: "Weather",
    description: "Real-time temperatures & hourly forecasts",
    category: "Time & Location",
    accentColor: "#4FC3F7",
    colSpan: 2,
    component: WeatherWidget,
  },
  {
    id: "calendar",
    name: "Calendar",
    description: "Today's events & agenda at a glance",
    category: "Productivity",
    accentColor: "#FF3B30",
    colSpan: 1,
    component: CalendarWidget,
  },
  {
    id: "clock",
    name: "Clock",
    description: "World clocks & analog time display",
    category: "Time & Location",
    accentColor: "#FFFFFF",
    colSpan: 1,
    component: ClockWidget,
  },
  {
    id: "batteries",
    name: "Batteries",
    description: "iPhone, AirPods & Apple Watch charge",
    category: "Wellness",
    accentColor: "#34C759",
    colSpan: 1,
    component: BatteriesWidget,
  },
  {
    id: "reminders",
    name: "Reminders",
    description: "Daily tasks you can check off",
    category: "Productivity",
    accentColor: "#FF9500",
    colSpan: 1,
    component: RemindersWidget,
  },
  {
    id: "notes",
    name: "Notes",
    description: "Pinned sticky note on your screen",
    category: "Productivity",
    accentColor: "#FFD60A",
    colSpan: 1,
    component: NotesWidget,
  },
  {
    id: "screentime",
    name: "Screen Time",
    description: "Daily digital habit tracking",
    category: "Wellness",
    accentColor: "#BF5AF2",
    colSpan: 1,
    component: ScreenTimeWidget,
  },
  {
    id: "shortcuts",
    name: "Shortcuts",
    description: "One-tap macro automations",
    category: "Productivity",
    accentColor: "#007AFF",
    colSpan: 1,
    component: ShortcutsWidget,
  },
  {
    id: "files",
    name: "Files",
    description: "Recent documents & iCloud folders",
    category: "Productivity",
    accentColor: "#5AC8FA",
    colSpan: 1,
    component: FilesWidget,
  },
  {
    id: "fitness",
    name: "Fitness",
    description: "Move, Exercise & Stand rings",
    category: "Wellness",
    accentColor: "#FF2D55",
    colSpan: 2,
    component: FitnessWidget,
  },
  {
    id: "health",
    name: "Health",
    description: "Heart rate, sleep & water intake",
    category: "Wellness",
    accentColor: "#FF2D55",
    colSpan: 1,
    component: HealthWidget,
  },
  {
    id: "photos",
    name: "Photos",
    description: "Memories cycling through your album",
    category: "Wellness",
    accentColor: "#FFD60A",
    colSpan: 1,
    component: PhotosWidget,
  },
  {
    id: "music",
    name: "Music",
    description: "Playback controls & now playing",
    category: "Wellness",
    accentColor: "#FC3C44",
    colSpan: 2,
    component: MusicWidget,
  },
  {
    id: "findmy",
    name: "Find My",
    description: "Track AirTags & family members",
    category: "Time & Location",
    accentColor: "#34C759",
    colSpan: 1,
    component: FindMyWidget,
  },
  {
    id: "maps",
    name: "Maps",
    description: "Recent destinations & travel time",
    category: "Time & Location",
    accentColor: "#4FC3F7",
    colSpan: 1,
    component: MapsWidget,
  },
];
