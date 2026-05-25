# Widget Hub — App Store Setup Guide

## What you need (on your Mac)

| Requirement | Where to get it |
|---|---|
| macOS Ventura 13+ | Your Mac |
| Xcode 15+ | [Mac App Store](https://apps.apple.com/app/xcode/id497799835) (free, ~15GB) |
| Node.js 18+ | [nodejs.org](https://nodejs.org) |
| Apple Developer Account | [developer.apple.com](https://developer.apple.com) — $99/year |
| CocoaPods | `sudo gem install cocoapods` |

---

## Step 1 — Unzip and open Terminal

1. Unzip the downloaded file — you'll get a folder (e.g. `workspace/` or your project name)
2. Open **Terminal** on your Mac
3. Drag the unzipped folder into the Terminal window — it will fill in the full path — then press Enter:

```bash
cd /path/shown/after/drag
```

> You should now be at the **project root** (the folder that contains `artifacts/`, `lib/`, `pnpm-workspace.yaml`, etc.)

---

## Step 2 — Install pnpm (one-time setup)

This project uses **pnpm** (not npm). Install it once:

```bash
npm install -g pnpm
```

Verify it worked:
```bash
pnpm --version
```

---

## Step 3 — Install all project dependencies

From the **project root** (same folder you're already in):

```bash
pnpm install
```

---

## Step 4 — Install Capacitor packages

```bash
pnpm --filter @workspace/widget-hub add --save-dev @capacitor/core @capacitor/cli @capacitor/ios
```

---

## Step 5 — Build the web app for Capacitor

```bash
pnpm --filter @workspace/widget-hub run cap:build
```

This creates a `dist/` folder inside `artifacts/widget-hub/` using `./` as the base path (required for Capacitor — different from the Replit dev build).

---

## Step 6 — Switch into the widget-hub directory

All Capacitor commands must be run from the folder that contains `capacitor.config.ts`:

```bash
cd artifacts/widget-hub
```

---

## Step 7 — Add the iOS native project

```bash
npx cap add ios
```

This creates an `ios/` folder containing a full Xcode project.

---

## Step 8 — Sync web assets into iOS

```bash
npx cap sync ios
```

Run this every time you rebuild the web app (Step 5 → Step 8).

---

## Step 9 — Open in Xcode

```bash
npx cap open ios
```

---

## Step 10 — Configure signing in Xcode

1. In the left sidebar, click **App** (the top-level project)
2. Select the **App** target → **Signing & Capabilities** tab
3. Check **Automatically manage signing**
4. Set **Team** to your Apple Developer account
5. Set **Bundle Identifier**: `com.widgethub.app`
   *(must be globally unique — change to something like `com.yourname.widgethub`)*

---

## Step 11 — Add the app icon

1. In Xcode, open `App → App → Assets.xcassets → AppIcon`
2. Drag `app-store-assets/app-icon-1024.png` into the **1024pt App Store** slot
3. Xcode will auto-generate all other sizes

---

## Step 12 — Test on a real device

1. Connect your iPhone via USB and trust the connection
2. In Xcode's toolbar, select your iPhone from the device dropdown
3. Press **⌘R** to build and run
4. First run: go to **Settings → General → VPN & Device Management** on iPhone and trust your developer certificate

---

## Step 13 — Generate a sideload .ipa (Ad Hoc)

Use this to share with up to 100 specific registered devices without going through the App Store.

1. In Xcode: select **Any iOS Device** (not your plugged-in phone) in the device picker
2. **Product → Archive** — wait for the build
3. The **Organizer** window opens automatically
4. Click **Distribute App**
5. Choose **Ad Hoc** → Next
6. Select or create an **Ad Hoc provisioning profile**
7. Click **Export** → choose a save location
8. You get a folder containing your `.ipa` file

### Installing the .ipa via AltStore (no jailbreak)
1. Install **AltStore** on your Mac from [altstore.io](https://altstore.io)
2. Install AltStore on your iPhone through the Mac app
3. Open AltStore on iPhone → **My Apps** → tap **+** → select your `.ipa`

### Installing via Sideloadly
1. Download **Sideloadly** from [sideloadly.io](https://sideloadly.io)
2. Drag your `.ipa` into Sideloadly, enter your Apple ID, click **Start**

---

## Step 14 — TestFlight (recommended before App Store)

TestFlight lets up to 10,000 testers install your app without going through full App Store review.

1. In Organizer → **Distribute App → App Store Connect → Upload**
2. Open [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
3. Go to **TestFlight** → add testers by email
4. Internal testers (your team, up to 100): available instantly
5. External testers (public): requires a brief Apple review (~24 hours)

---

## Step 15 — Submit to the App Store

### In App Store Connect:
1. **My Apps → + → New App**
2. Fill in:
   - **Platform**: iOS
   - **Name**: Widget Hub
   - **Primary Language**: English
   - **Bundle ID**: com.widgethub.app *(must match Xcode)*
   - **SKU**: widgethub-2024

### App Information:
- **Subtitle**: Your iOS Widget Command Center
- **Category**: Utilities (primary), Productivity (secondary)
- **Content Rating**: 4+ (no objectionable content)
- **Privacy Policy URL**: You must host a privacy policy page (free option: [privacypolicygenerator.info](https://www.privacypolicygenerator.info))

### Prepare for Submission:
1. Upload **screenshots** from `app-store-assets/screenshots/`
   - Required: 6.7" (iPhone 15 Pro Max) and 5.5" (iPhone 8 Plus)
2. Upload **app preview video** (optional but boosts conversions)
3. Write **description** (see below)
4. Add **keywords**: widget,home screen,customizer,ios widget,widget maker,customize,hub
5. Set **Support URL** (can be a simple webpage or social link)

### Submit:
1. Click **Add for Review**
2. Answer the export compliance questions (No encryption → answer No)
3. Submit — Apple review typically takes **1–3 business days**

---

## App Store listing copy

**Subtitle (30 chars max):**
```
Your Widget Command Center
```

**Description:**
```
Widget Hub is the ultimate companion app for your iPhone home screen.

Browse a curated library of 15 fully customizable widgets, personalize every detail to match your lifestyle, and preview exactly how they look — all in one premium dark-themed app.

FEATURES

• 15 beautiful widget previews — Weather, Calendar, Clock, Batteries, Fitness, Health, Music, Find My, and more
• Fully customizable — change your city, task names, goals, song title, destinations, and every detail
• Live preview — see your changes reflected instantly before adding
• My Screen — build and preview your perfect home screen layout
• Smart search and category filters (Time & Location, Productivity, Wellness)
• Persistent settings — your configuration saves automatically
• Elegant dark design inspired by iOS
• Works on iPhone 7 and later (iOS 13+)

Whether you're obsessed with your home screen aesthetic or just want to stay on top of your daily widgets, Widget Hub gives you the control you've always wanted.
```

**Keywords (100 chars max):**
```
widget,home screen,customizer,ios widget,widget maker,widgets,customize,hub,screen,design
```

---

## Checklist before submitting

- [ ] Bundle ID is unique and matches in Xcode + App Store Connect
- [ ] App icon 1024×1024 uploaded (no rounded corners — Apple adds them)
- [ ] Screenshots uploaded for 6.7" and 5.5" displays
- [ ] Privacy policy URL is live and accessible
- [ ] Support URL is live
- [ ] Description written and keywords filled
- [ ] TestFlight tested on a real device
- [ ] No crashes on launch
- [ ] Minimum deployment target set to iOS 13.0 in Xcode

---

## Keeping the app updated

When you make changes in Replit, download the zip again and on your Mac run (from the project root):
```bash
pnpm install
pnpm --filter @workspace/widget-hub run cap:build
cd artifacts/widget-hub
npx cap sync ios
# Open Xcode (npx cap open ios), bump the version number, Archive, and upload
```
