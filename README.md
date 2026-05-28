# Anvil | Custom Screen Widgets

A polished iOS home screen widget app built with React, TypeScript, and Capacitor. Users can add, configure, and theme a collection of aesthetic widgets — clock, weather, batteries, notes, and more — directly from the app. A native SwiftUI widget extension pushes the active configuration to the iOS home screen in real time.

---

## Features

- 15 configurable widgets (Clock, Weather, Batteries, Notes, Calendar, Fitness, Health, Music, Maps, Photos, Reminders, Screen Time, Shortcuts, Files, Find My)
- Live accent color picker — color wheel, brightness slider, hex input, and 8 Apple system color presets
- Full theme engine: changing the accent color re-tints the background, cards, borders, and widget outlines automatically
- Reset to Black — one tap restores the pure black default palette
- Native SwiftUI widget extension synced via App Groups / UserDefaults
- Sideloadable via Sideloadly (free Apple ID) or distributable via the App Store

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 18, TypeScript, Tailwind CSS v4 |
| Native bridge | Capacitor 8 |
| Widget extension | SwiftUI + WidgetKit |
| Animations | Framer Motion |
| Components | Radix UI primitives |
| Build | Vite, pnpm workspaces |

---

## Project Structure
Widget-Hub/
├── artifacts/widget-hub/ # Main Capacitor app
│ ├── src/
│ │ ├── components/
│ │ │ ├── widgets/ # Individual widget components
│ │ │ ├── ColorPickerSheet # Accent color picker
│ │ │ ├── AddWidgetSheet # Widget browser
│ │ │ └── ConfigSheet # Per-widget config
│ │ ├── context/
│ │ │ ├── ThemeContext # Accent color + CSS variable injection
│ │ │ ├── WidgetContext # Active widget set
│ │ │ └── ConfigContext # Per-widget config values
│ │ └── pages/
│ │ ├── DiscoverPage # Widget browser tab
│ │ ├── MyScreenPage # Active widgets tab
│ │ └── SettingsPage # Settings + color picker tab
│ ├── ios/App/
│ │ ├── App/
│ │ │ ├── MyWidgetPlugin.swift # Capacitor bridge plugin
│ │ │ └── MyWidgetPlugin.m
│ │ └── WidgetHubWidget/
│ │ └── WidgetHubWidget.swift # SwiftUI widget extension
│ └── setup-widget-target.rb # Xcode project configuration script
├── build-ios.sh # One-command iOS build script
└── package.json

---
## Prerequisites
- macOS with Xcode installed (App Store)
- Node.js 18+
- pnpm (`npm install -g pnpm`)
- Ruby (pre-installed on macOS)
- `xcodeproj` gem: `gem install xcodeproj`
- Apple ID (free for sideloading, $99/yr for App Store)
---
## Local Development
```bash
# Install dependencies
pnpm install
# Start dev server
cd artifacts/widget-hub
pnpm dev
Building the iOS IPA
Edit the top of build-ios.sh to set your Team ID:

TEAM_ID="XXXXXXXXXX"    # Your 10-char Apple Team ID
BUNDLE_ID="com.shah.widgethub"
Then run:

./build-ios.sh
This will:

Install dependencies
Build the React app
Sync assets into Xcode via Capacitor
Configure the SwiftUI widget extension target
Archive and export the IPA to artifacts/widget-hub/build/ipa/App.ipa
Sideloading (Free Apple ID)
Download Sideloadly
Connect your iPhone via USB
Drag App.ipa into Sideloadly
Enter your Apple ID and click Start
Note: The IPA is built with development export method for sideloading. The widget extension bundle ID is com.shah.widgethub.widget — the lowercase suffix is required to prevent Sideloadly's regex rewriter from stripping it.

App Store Distribution
Enroll in the Apple Developer Program ($99/yr)
Register the following Bundle IDs at developer.apple.com → Identifiers:
com.shah.widgethub (App ID, with App Groups capability)
com.shah.widgethub.widget (App Extension ID)
Register App Group: group.com.shah.widgethub
Create the app in App Store Connect with name Anvil | Custom Screen Widgets
In build-ios.sh, change the export method:
# change "development" to "app-store-connect"
Run ./build-ios.sh and upload the IPA via Transporter
Bundle IDs
Target	Bundle ID
Main app	com.shah.widgethub
Widget extension	com.shah.widgethub.widget
App Group	group.com.shah.widgethub
Team ID	J7LQPHFL9K
App Icon
Replace the icon at:

artifacts/widget-hub/ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png
Requirements: 1024×1024px PNG, no transparency, no rounded corners.

Theming
The accent color is stored in localStorage under accent-color. Changing it via Settings → Appearance → Accent Color updates the following CSS variables live:

Variable	Purpose
--primary	Buttons, active states, tab indicators
--background	Full-screen background (hue-tinted dark)
--card	Widget and section card surfaces
--muted	Secondary surfaces, inputs
--border	Dividers and outlines
Resetting to Black restores all surfaces to the original pure-black palette.

License
Private — all rights reserved.
