import WidgetKit
import SwiftUI

// ── 1. WIDGET DATA MODEL ──────────────────────────────────────────────
struct SimpleEntry: TimelineEntry {
    let date: Date
    let addedWidgets: [String]
    let widgetConfigs: [String: [String: Any]]
}

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(
            date: Date(),
            addedWidgets: ["notes", "batteries"],
            widgetConfigs: [
                "notes": ["noteTitle": "Quick Note", "noteContent": "Example Note content here!"],
                "batteries": ["iphoneLevel": 85, "watchLevel": 45]
            ]
        )
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = fetchEntry()
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let entry = fetchEntry()
        // Refresh every 15 minutes automatically if not forced by App
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 15, to: Date())!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }
    
    private func fetchEntry() -> SimpleEntry {
        let suiteName = "group.com.shah.widgethub"
        let defaults = UserDefaults(suiteName: suiteName) ?? UserDefaults.standard
        let added = defaults.array(forKey: "addedWidgets") as? [String] ?? []
        let configs = defaults.dictionary(forKey: "widgetConfigs") as? [String: [String: Any]] ?? [:]
        return SimpleEntry(date: Date(), addedWidgets: added, widgetConfigs: configs)
    }
}


// ── 2. HIGH FIDELITY WIDGET VIEWS (SWIFTUI) ───────────────────────────

// A. STICKY NOTE WIDGET
struct NotesWidgetView: View {
    let title: String
    let content: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                Text(title.uppercased())
                    .font(.system(size: 10, weight: .black, design: .default))
                    .foregroundColor(Color.black.opacity(0.5))
                Spacer()
                Circle()
                    .fill(Color.black.opacity(0.1))
                    .frame(width: 8, height: 8)
            }
            
            Text(content)
                .font(.system(size: 13, weight: .medium, design: .serif))
                .foregroundColor(Color.black.opacity(0.8))
                .lineLimit(4)
                .multilineTextAlignment(.leading)
                .frame(maxWidth: .infinity, alignment: .leading)
            
            Spacer()
        }
        .padding(14)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(
            LinearGradient(
                gradient: Gradient(colors: [Color(red: 1.0, green: 0.92, blue: 0.55), Color(red: 1.0, green: 0.84, blue: 0.40)]),
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
    }
}

// B. CIRCULAR BATTERY RINGS WIDGET
struct BatteriesWidgetView: View {
    let iphoneLevel: Double
    let watchLevel: Double
    
    var body: some View {
        VStack(spacing: 8) {
            HStack {
                Text("BATTERIES")
                    .font(.system(size: 9, weight: .bold))
                    .foregroundColor(.white.opacity(0.4))
                    .tracking(1)
                Spacer()
            }
            
            HStack(spacing: 16) {
                // iPhone Ring
                VStack(spacing: 4) {
                    ZStack {
                        Circle()
                            .stroke(Color.white.opacity(0.08), lineWidth: 5.5)
                        Circle()
                            .trim(from: 0.0, to: iphoneLevel / 100.0)
                            .stroke(Color(red: 0.20, green: 0.78, blue: 0.35), style: StrokeStyle(lineWidth: 5.5, lineCap: .round))
                            .rotationEffect(.degrees(-90))
                        
                        Image(systemName: "iphone")
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(.white)
                    }
                    .frame(width: 44, height: 44)
                    
                    Text("\(Int(iphoneLevel))%")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(.white)
                }
                
                // Watch Ring
                VStack(spacing: 4) {
                    ZStack {
                        Circle()
                            .stroke(Color.white.opacity(0.08), lineWidth: 5.5)
                        Circle()
                            .trim(from: 0.0, to: watchLevel / 100.0)
                            .stroke(Color(red: 0.0, green: 0.48, blue: 1.0), style: StrokeStyle(lineWidth: 5.5, lineCap: .round))
                            .rotationEffect(.degrees(-90))
                        
                        Image(systemName: "applewatch")
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundColor(.white)
                    }
                    .frame(width: 44, height: 44)
                    
                    Text("\(Int(watchLevel))%")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(.white)
                }
            }
            Spacer()
        }
        .padding(14)
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color(red: 0.07, green: 0.07, blue: 0.08))
    }
}

// C. WEATHER WIDGET
struct WeatherWidgetView: View {
    let city: String
    let temp: Double
    let condition: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(city)
                .font(.system(size: 15, weight: .bold))
                .foregroundColor(.white)
            
            Text("\(Int(temp))°")
                .font(.system(size: 40, weight: .thin))
                .foregroundColor(.white)
                .padding(.vertical, 2)
            
            Spacer()
            
            HStack(spacing: 4) {
                Image(systemName: getWeatherIcon(condition))
                    .font(.system(size: 12))
                    .foregroundColor(Color(red: 0.31, green: 0.76, blue: 0.97))
                Text(condition)
                    .font(.system(size: 11, weight: .medium))
                    .foregroundColor(.white.opacity(0.6))
            }
        }
        .padding(14)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
        .background(
            LinearGradient(
                gradient: Gradient(colors: [Color(red: 0.11, green: 0.14, blue: 0.20), Color(red: 0.05, green: 0.06, blue: 0.09)]),
                startPoint: .top,
                endPoint: .bottom
            )
        )
    }
    
    private func getWeatherIcon(_ condition: String) -> String {
        let cond = condition.lowercased()
        if cond.contains("sunny") || cond.contains("clear") { return "sun.max.fill" }
        if cond.contains("cloud") { return "cloud.fill" }
        if cond.contains("rain") || cond.contains("shower") { return "cloud.rain.fill" }
        if cond.contains("snow") { return "snowflake" }
        if cond.contains("storm") || cond.contains("thunder") { return "cloud.bolt.rain.fill" }
        return "cloud.sun.fill"
    }
}

// D. FALLBACK EMPTY VIEW (AESTHETIC GLASSMORPHIC CARD)
struct FallbackWidgetView: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack(spacing: 6) {
                RoundedRectangle(cornerRadius: 4)
                    .fill(Color(red: 0.0, green: 0.48, blue: 1.0))
                    .frame(width: 14, height: 14)
                    .overlay(
                        Image(systemName: "square.grid.2x2.fill")
                            .font(.system(size: 8))
                            .foregroundColor(.white)
                    )
                
                Text("WIDGET HUB")
                    .font(.system(size: 10, weight: .black))
                    .foregroundColor(.white.opacity(0.6))
                    .tracking(1)
            }
            
            Spacer()
            
            Text("Add Widgets")
                .font(.system(size: 14, weight: .bold))
                .foregroundColor(.white)
            
            Text("Open the app to add and configure Home Screen widgets!")
                .font(.system(size: 10, weight: .medium))
                .foregroundColor(.white.opacity(0.4))
                .lineLimit(3)
                .multilineTextAlignment(.leading)
        }
        .padding(14)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
        .background(
            LinearGradient(
                gradient: Gradient(colors: [Color(red: 0.09, green: 0.09, blue: 0.10), Color(red: 0.02, green: 0.02, blue: 0.03)]),
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        )
    }
}


// ── 3. MAIN WIDGET VIEW ROUTER ────────────────────────────────────────
struct WidgetHubWidgetEntryView : View {
    var entry: Provider.Entry
    @Environment(\.widgetFamily) var family

    var body: some View {
        // Route according to active/configured widgets
        if entry.addedWidgets.contains("notes") {
            let noteConfig = entry.widgetConfigs["notes"]
            let title = noteConfig?["noteTitle"] as? String ?? "Quick Note"
            let content = noteConfig?["noteContent"] as? String ?? "No text entered in note."
            NotesWidgetView(title: title, content: content)
        } 
        else if entry.addedWidgets.contains("batteries") {
            let batConfig = entry.widgetConfigs["batteries"]
            let iphone = batConfig?["iphoneLevel"] as? Double ?? 87.0
            let watch = batConfig?["watchLevel"] as? Double ?? 43.0
            BatteriesWidgetView(iphoneLevel: iphone, watchLevel: watch)
        } 
        else if entry.addedWidgets.contains("weather") {
            let weatherConfig = entry.widgetConfigs["weather"]
            let city = weatherConfig?["city"] as? String ?? "San Francisco"
            let temp = weatherConfig?["temp"] as? Double ?? 72.0
            let condition = weatherConfig?["condition"] as? String ?? "Partly Cloudy"
            WeatherWidgetView(city: city, temp: temp, condition: condition)
        } 
        else {
            FallbackWidgetView()
        }
    }
}


// ── 4. EXTENSION REGISTRATION ─────────────────────────────────────────
@main
struct WidgetHubWidget: Widget {
    let kind: String = "WidgetHubWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            WidgetHubWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Widget Hub")
        .description("Elegant dynamic dashboard widgets.")
        .supportedFamilies([.systemSmall])
    }
}
