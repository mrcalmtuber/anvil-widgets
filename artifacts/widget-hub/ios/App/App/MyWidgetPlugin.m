#import <Capacitor/Capacitor.h>

CAP_PLUGIN(MyWidgetPlugin, "MyWidgetPlugin",
           CAP_PLUGIN_METHOD(syncWidgets, CAPPluginReturnPromise);
)
