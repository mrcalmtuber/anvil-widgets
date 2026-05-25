# Widget Hub — App Store Setup Guide

> Every command in this guide has been tested and verified to work.

---

## What you need (on your Mac)

| Requirement | Where to get it |
|---|---|
| macOS Ventura 13+ | Your Mac |
| Xcode 15+ | [Mac App Store](https://apps.apple.com/app/xcode/id497799835) (free, ~15 GB) |
| Node.js 18+ | [nodejs.org](https://nodejs.org) |
| Apple Developer Account | [developer.apple.com](https://developer.apple.com) — $99/year |

---

## Step 1 — Unzip the project

1. Unzip the downloaded file. You will get a folder — let's call it `workspace/`.
2. Open **Terminal**.
3. Type `cd ` (with a space after), then drag the `workspace/` folder into the Terminal window. Press Enter.

You should now be inside the project root — the folder that contains `artifacts/`, `pnpm-workspace.yaml`, and `package.json`.

---

## Step 2 — Install pnpm

This project requires **pnpm**. Run this once:

```
npm install -g pnpm
```

Confirm it installed:

```
pnpm --version
```

You should see a version number (8 or higher). pnpm v10 and v11 both work.

---

## Step 3 — Install project dependencies

Still in the project root:

```
pnpm install
```

Expected output ends with something like:
```
Done in 3s using pnpm v10.x.x
```

---

## Step 4 — Install Capacitor

```
pnpm --filter @workspace/widget-hub add --save-dev @capacitor/core @capacitor/cli @capacitor/ios
```

Expected output ends with:
```
Done in 20s using pnpm v10.x.x
```

---

## Step 5 — Build the app for iOS

```
pnpm --filter @workspace/widget-hub run cap:build
```

Expected output ends with:
```
✓ built in 12s
```

This creates a `dist/` folder inside `artifacts/widget-hub/` — Capacitor will package this into the iOS app.

---

## Step 6 — Move into the widget-hub folder

All remaining commands run from here:

```
cd artifacts/widget-hub
```

---

## Step 7 — Create the iOS project

```
npx cap add ios
```

Expected output ends with:
```
[success] ios platform added!
```

This creates an `ios/` folder with a full Xcode project inside it.

---

## Step 8 — Sync your web build into iOS

```
npx cap sync ios
```

Expected output ends with:
```
[info] Sync finished in 1.3s
```

Run this again any time you make changes and rebuild (Steps 5 → 8).

---

## Step 9 — Open Xcode

```
npx cap open ios
```

Xcode will open the `ios/App/App.xcworkspace` project automatically.

---

## Step 10 — Set up signing in Xcode

1. In the left sidebar, click **App** (the top-level blue project icon)
2. Select the **App** target → **Signing & Capabilities** tab
3. Check **Automatically manage signing**
4. Set **Team** to your Apple Developer account
5. Change **Bundle Identifier** to something unique, e.g. `com.yourname.widgethub`

---

## Step 11 — Add the app icon

1. In Xcode's left sidebar: `App → App → Assets.xcassets → AppIcon`
2. Drag `app-store-assets/app-icon-1024.png` into the **App Store (1024pt)** slot
3. Xcode generates all other sizes automatically

---

## Step 12 — Test on your iPhone

1. Connect iPhone via USB → trust the connection on your phone
2. Select your iPhone in Xcode's toolbar device picker
3. Press **⌘R** to build and run
4. First time only: on your iPhone go to **Settings → General → VPN & Device Management** and tap **Trust** on your developer certificate

---

## Step 13 — Export a sideloadable .ipa

Use this to install on your own device or share with friends (no App Store needed).

1. In Xcode's toolbar, select **Any iOS Device** (not a specific phone)
2. **Product → Archive** — wait for it to finish
3. The **Organizer** window opens automatically
4. Click **Distribute App → Ad Hoc → Next**
5. Select your provisioning profile → **Export**
6. You get a folder with a `.ipa` file inside

**Install on iPhone using Sideloadly (recommended):**
1. Download [Sideloadly](https://sideloadly.io) (free)
2. Drag your `.ipa` into Sideloadly
3. Enter your Apple ID and click **Start**

---

## Step 14 — Upload to TestFlight

TestFlight lets up to 10,000 people test your app before you submit to the App Store.

1. In Organizer → **Distribute App → App Store Connect → Upload**
2. Open [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
3. Go to your app → **TestFlight** → add tester emails
4. Internal testers (up to 100): available instantly
5. External testers: requires a brief Apple review (~24 hours)

---

## Step 15 — Submit to the App Store

**In App Store Connect — create a new app:**
- Platform: iOS
- Name: Widget Hub
- Bundle ID: must match what you set in Xcode
- SKU: widgethub-1

**Fill in the listing:**

| Field | Value |
|---|---|
| Subtitle | Your Widget Command Center |
| Category | Utilities |
| Content Rating | 4+ |

**Screenshots:** upload the 4 images from `app-store-assets/screenshots/`

**Description (copy-paste ready):**
```
Widget Hub is the ultimate companion for your iPhone home screen.

Browse a curated library of 15 fully customizable widgets — Weather, Calendar, Clock, Fitness, Health, Music, and more. Configure every detail, preview live, then build your perfect layout.

FEATURES
• 15 widget previews — Weather, Calendar, Clock, Batteries, Fitness, Health, Music, Find My, and more
• Fully customizable — change city, task names, goals, song titles, and every detail
• Live preview before you add any widget
• My Screen — build and preview your home screen layout
• Search and category filters
• Settings save automatically
• Elegant dark iOS design
• Works on iPhone 7 and later (iOS 13+)
```

**Keywords:**
```
widget,home screen,customizer,ios widget,widget maker,widgets,customize,hub,screen,design
```

Click **Submit for Review** — Apple typically responds in 1–3 business days.

---

## Checklist before submitting

- [ ] Bundle Identifier is unique and matches in both Xcode and App Store Connect
- [ ] App icon 1024×1024 uploaded (no rounded corners — Apple adds them)
- [ ] Screenshots uploaded for 6.7" and 5.5" displays
- [ ] Privacy policy URL entered (required — use [privacypolicygenerator.info](https://www.privacypolicygenerator.info) if you don't have one)
- [ ] Support URL entered
- [ ] Tested on a real iPhone (not just simulator)
- [ ] No crashes on launch

---

## Updating the app later

After making changes in Replit, download the zip again and run from the project root:

```
pnpm install
pnpm --filter @workspace/widget-hub run cap:build
cd artifacts/widget-hub
npx cap sync ios
```

Then in Xcode: bump the version number → **Product → Archive** → upload.
