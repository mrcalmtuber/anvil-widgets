import Foundation
import Capacitor
import WidgetKit

@objc(MyWidgetPlugin)
public class MyWidgetPlugin: CAPPlugin {
    
    @objc func syncWidgets(_ call: CAPPluginCall) {
        let added = call.getArray("added") ?? []
        let configs = call.getObject("configs") ?? [:]
        
        // App Groups suite name
        let suiteName = "group.com.shah.widgethub"
        
        if let defaults = UserDefaults(suiteName: suiteName) {
            defaults.set(added, forKey: "addedWidgets")
            defaults.set(configs, forKey: "widgetConfigs")
            defaults.synchronize()
            print("WidgetHub Bridge: Successfully synced widgets to App Group UserDefaults")
            
            // Tell iOS to reload the widget display
            WidgetCenter.shared.reloadAllTimelines()
        } else {
            // Fallback for Simulator testing if App Group is not fully provisioned
            let defaults = UserDefaults.standard
            defaults.set(added, forKey: "addedWidgets")
            defaults.set(configs, forKey: "widgetConfigs")
            defaults.synchronize()
            print("WidgetHub Bridge: Saved to standard UserDefaults (no App Group container)")
            
            WidgetCenter.shared.reloadAllTimelines()
        }
        
        call.resolve([
            "success": true
        ])
    }
}
