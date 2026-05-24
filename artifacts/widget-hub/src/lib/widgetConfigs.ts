export type FieldType = "text" | "number" | "select";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  defaultValue: string | number;
  options?: string[];   // for select type
  min?: number;
  max?: number;
  placeholder?: string;
};

export const widgetConfigFields: Record<string, FieldDef[]> = {
  weather: [
    { key: "city", label: "City", type: "text", defaultValue: "San Francisco", placeholder: "e.g. New York" },
    { key: "unit", label: "Temperature Unit", type: "select", defaultValue: "F", options: ["F", "C"] },
    { key: "temp", label: "Current Temp (°)", type: "number", defaultValue: 72, min: -40, max: 130 },
    { key: "condition", label: "Condition", type: "text", defaultValue: "Partly Cloudy", placeholder: "e.g. Sunny" },
  ],
  calendar: [
    { key: "calendarName", label: "Calendar Name", type: "text", defaultValue: "Personal", placeholder: "e.g. Work" },
    { key: "event1", label: "Event 1", type: "text", defaultValue: "Design Sync", placeholder: "Event name" },
    { key: "event1Time", label: "Event 1 Time", type: "text", defaultValue: "2:00 PM", placeholder: "e.g. 9:00 AM" },
    { key: "event2", label: "Event 2", type: "text", defaultValue: "Review PRs", placeholder: "Event name" },
    { key: "event2Time", label: "Event 2 Time", type: "text", defaultValue: "4:30 PM", placeholder: "e.g. 2:00 PM" },
  ],
  clock: [
    { key: "city1", label: "Clock 1 City", type: "text", defaultValue: "Cupertino", placeholder: "e.g. London" },
    { key: "city2", label: "Clock 2 City", type: "text", defaultValue: "New York", placeholder: "e.g. Tokyo" },
    { key: "city3", label: "Clock 3 City", type: "text", defaultValue: "London", placeholder: "e.g. Sydney" },
  ],
  batteries: [
    { key: "iphoneLevel", label: "iPhone Battery %", type: "number", defaultValue: 87, min: 0, max: 100 },
    { key: "airpodsL", label: "AirPods Left %", type: "number", defaultValue: 64, min: 0, max: 100 },
    { key: "airpodsR", label: "AirPods Right %", type: "number", defaultValue: 71, min: 0, max: 100 },
    { key: "airpodsCase", label: "AirPods Case %", type: "number", defaultValue: 55, min: 0, max: 100 },
    { key: "watchLevel", label: "Apple Watch %", type: "number", defaultValue: 43, min: 0, max: 100 },
  ],
  reminders: [
    { key: "task1", label: "Task 1", type: "text", defaultValue: "Buy groceries", placeholder: "Task name" },
    { key: "task2", label: "Task 2", type: "text", defaultValue: "Call doctor", placeholder: "Task name" },
    { key: "task3", label: "Task 3", type: "text", defaultValue: "Submit report", placeholder: "Task name" },
    { key: "task4", label: "Task 4", type: "text", defaultValue: "Gym session", placeholder: "Task name" },
  ],
  notes: [
    { key: "noteContent", label: "Note Content", type: "text", defaultValue: "Grocery list: oat milk, avocado, sourdough, olive oil, pasta", placeholder: "Your note..." },
    { key: "noteTitle", label: "Note Title", type: "text", defaultValue: "Quick Note", placeholder: "Title" },
  ],
  screentime: [
    { key: "totalHours", label: "Daily Hours", type: "number", defaultValue: 4, min: 0, max: 24 },
    { key: "totalMins", label: "Daily Minutes", type: "number", defaultValue: 32, min: 0, max: 59 },
    { key: "app1Name", label: "Top App 1", type: "text", defaultValue: "Instagram", placeholder: "App name" },
    { key: "app1Time", label: "App 1 Time", type: "text", defaultValue: "1h 12m", placeholder: "e.g. 2h 30m" },
    { key: "app2Name", label: "Top App 2", type: "text", defaultValue: "Safari", placeholder: "App name" },
    { key: "app2Time", label: "App 2 Time", type: "text", defaultValue: "58m", placeholder: "e.g. 45m" },
    { key: "app3Name", label: "Top App 3", type: "text", defaultValue: "Messages", placeholder: "App name" },
    { key: "app3Time", label: "App 3 Time", type: "text", defaultValue: "44m", placeholder: "e.g. 30m" },
  ],
  shortcuts: [
    { key: "shortcut1", label: "Shortcut 1", type: "text", defaultValue: "Send ETA", placeholder: "Shortcut name" },
    { key: "shortcut2", label: "Shortcut 2", type: "text", defaultValue: "Smart Lights", placeholder: "Shortcut name" },
    { key: "shortcut3", label: "Shortcut 3", type: "text", defaultValue: "Focus Mode", placeholder: "Shortcut name" },
    { key: "shortcut4", label: "Shortcut 4", type: "text", defaultValue: "Morning Routine", placeholder: "Shortcut name" },
  ],
  files: [
    { key: "file1", label: "File 1 Name", type: "text", defaultValue: "Q4 Report.pdf", placeholder: "filename.pdf" },
    { key: "file2", label: "File 2 Name", type: "text", defaultValue: "Design Brief.fig", placeholder: "filename.fig" },
    { key: "file3", label: "File 3 Name", type: "text", defaultValue: "Notes.md", placeholder: "filename.md" },
  ],
  fitness: [
    { key: "moveGoal", label: "Move Goal (cal)", type: "number", defaultValue: 500, min: 100, max: 1500 },
    { key: "moveCurrent", label: "Move Current (cal)", type: "number", defaultValue: 420, min: 0, max: 1500 },
    { key: "exerciseGoal", label: "Exercise Goal (min)", type: "number", defaultValue: 30, min: 5, max: 120 },
    { key: "exerciseCurrent", label: "Exercise Current (min)", type: "number", defaultValue: 28, min: 0, max: 120 },
    { key: "standGoal", label: "Stand Goal (hrs)", type: "number", defaultValue: 12, min: 1, max: 24 },
    { key: "standCurrent", label: "Stand Current (hrs)", type: "number", defaultValue: 10, min: 0, max: 24 },
  ],
  health: [
    { key: "heartRate", label: "Heart Rate (BPM)", type: "number", defaultValue: 72, min: 40, max: 220 },
    { key: "sleepHours", label: "Sleep Hours", type: "number", defaultValue: 7, min: 0, max: 12 },
    { key: "sleepMins", label: "Sleep Minutes", type: "number", defaultValue: 14, min: 0, max: 59 },
    { key: "waterCurrent", label: "Water Glasses Drunk", type: "number", defaultValue: 6, min: 0, max: 16 },
    { key: "waterGoal", label: "Water Goal (glasses)", type: "number", defaultValue: 8, min: 1, max: 16 },
  ],
  photos: [
    { key: "albumName", label: "Album Name", type: "text", defaultValue: "Favorites", placeholder: "e.g. Summer 2024" },
    { key: "memoryCaption", label: "Memory Caption", type: "text", defaultValue: "3 years ago today", placeholder: "e.g. 1 year ago today" },
  ],
  music: [
    { key: "songTitle", label: "Song Title", type: "text", defaultValue: "Blinding Lights", placeholder: "Song name" },
    { key: "artistName", label: "Artist Name", type: "text", defaultValue: "The Weeknd", placeholder: "Artist name" },
    { key: "albumName", label: "Album Name", type: "text", defaultValue: "After Hours", placeholder: "Album name" },
  ],
  findmy: [
    { key: "item1", label: "Item 1 Name", type: "text", defaultValue: "AirPods", placeholder: "e.g. AirPods" },
    { key: "item1Location", label: "Item 1 Location", type: "text", defaultValue: "Home", placeholder: "e.g. Home" },
    { key: "item2", label: "Item 2 Name", type: "text", defaultValue: "Keys AirTag", placeholder: "e.g. Keys" },
    { key: "item2Location", label: "Item 2 Location", type: "text", defaultValue: "Office", placeholder: "e.g. Office" },
    { key: "item3", label: "Item 3 Name", type: "text", defaultValue: "iPad", placeholder: "e.g. MacBook" },
    { key: "item3Location", label: "Item 3 Location", type: "text", defaultValue: "In bag", placeholder: "e.g. Car" },
  ],
  maps: [
    { key: "dest1", label: "Destination 1", type: "text", defaultValue: "Home", placeholder: "e.g. Home" },
    { key: "dest1Time", label: "Dest 1 Travel Time", type: "text", defaultValue: "12 min", placeholder: "e.g. 8 min" },
    { key: "dest2", label: "Destination 2", type: "text", defaultValue: "Work", placeholder: "e.g. Work" },
    { key: "dest2Time", label: "Dest 2 Travel Time", type: "text", defaultValue: "24 min", placeholder: "e.g. 20 min" },
    { key: "dest3", label: "Destination 3", type: "text", defaultValue: "Gym", placeholder: "e.g. Gym" },
    { key: "dest3Time", label: "Dest 3 Travel Time", type: "text", defaultValue: "8 min", placeholder: "e.g. 5 min" },
  ],
};

export function getDefaults(widgetId: string): Record<string, string | number> {
  const fields = widgetConfigFields[widgetId] ?? [];
  return Object.fromEntries(fields.map((f) => [f.key, f.defaultValue]));
}
