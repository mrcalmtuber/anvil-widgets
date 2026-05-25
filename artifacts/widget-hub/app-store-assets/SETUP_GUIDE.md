# Widget Hub — iOS Setup Guide

## Get a .ipa in one command

### What you need on your Mac

| Tool | How to get it |
|---|---|
| macOS | Your Mac |
| Xcode 15+ | [Mac App Store](https://apps.apple.com/app/xcode/id497799835) (free) |
| Node.js 18+ | [nodejs.org](https://nodejs.org) |
| pnpm | `npm install -g pnpm` |
| Apple Developer Account | [developer.apple.com](https://developer.apple.com) — $99/year |

---

### Step 1 — Unzip the project

Unzip the downloaded file, open Terminal, type `cd ` then drag the unzipped folder into Terminal and press Enter. You should be in the folder that contains `build-ios.sh`.

---

### Step 2 — Edit two lines in `build-ios.sh`

Open `build-ios.sh` in any text editor and change these two lines near the top:

```
TEAM_ID="XXXXXXXXXX"              ← your Apple Team ID
BUNDLE_ID="com.yourname.widgethub"  ← any unique ID you choose
```

**Finding your Team ID:**
1. Go to [developer.apple.com/account](https://developer.apple.com/account)
2. Click **Membership Details**
3. Copy the **Team ID** (10 characters, e.g. `A1B2C3D4E5`)

**Choosing a Bundle ID:**
- Must be globally unique across all iOS apps
- Use reverse-domain format: `com.yourname.widgethub`
- You can use anything — just be consistent (same value in Xcode and App Store Connect)

---

### Step 3 — Run the build script

```
bash build-ios.sh
```

That's it. The script runs all 6 steps automatically:

```
[1/6] Installing dependencies
[2/6] Building web app
[3/6] Setting up iOS platform
[4/6] Syncing web assets
[5/6] Archiving with Xcode  ← takes 3–5 minutes
[6/6] Exporting .ipa
```

When it finishes you'll see:

```
  ╔═══════════════════════════════════╗
  ║    Build Complete!                ║
  ╚═══════════════════════════════════╝

  Your .ipa:
  /path/to/artifacts/widget-hub/build/ipa/App.ipa
```

---

### Step 4 — Install on your iPhone (sideload)

1. Download **Sideloadly** from [sideloadly.io](https://sideloadly.io) (free)
2. Connect your iPhone via USB
3. Drag `App.ipa` into Sideloadly
4. Enter your Apple ID → click **Start**
5. On your iPhone: **Settings → General → VPN & Device Management** → trust your certificate

---

## Upload to TestFlight / App Store

After `bash build-ios.sh` succeeds, open Xcode Organizer:

```
npx cap open ios
```

Then in Xcode: **Window → Organizer** → select the archive → **Distribute App → App Store Connect → Upload**

Once uploaded, open [appstoreconnect.apple.com](https://appstoreconnect.apple.com) to manage TestFlight testers or submit for App Store review.

---

## App Store listing (copy-paste ready)

**App Name:** Widget Hub
**Subtitle:** Your Widget Command Center
**Category:** Utilities
**Content Rating:** 4+

**Description:**
```
Widget Hub is the ultimate companion for your iPhone home screen.

Browse a curated library of 15 fully customizable widgets — Weather, Calendar, Clock, Fitness, Health, Music, and more. Configure every detail, preview live, then build your perfect layout.

FEATURES
• 15 widget previews — Weather, Calendar, Clock, Fitness, Health, Music, Find My, and more
• Fully customizable — change city, task names, goals, song titles, and every detail
• Live preview before adding any widget
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

**Screenshots:** in `app-store-assets/screenshots/`
**App Icon:** `app-store-assets/app-icon-1024.png`

---

## Updating the app

After making changes in Replit, download the zip again and re-run:

```
bash build-ios.sh
```

The script always produces a fresh build from scratch.
