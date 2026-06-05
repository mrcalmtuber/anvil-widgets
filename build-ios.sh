#!/bin/bash
set -e

# ════════════════════════════════════════════════════════════════════
#  Widget Hub — iOS Build Script
#  Produces a sideloadable .ipa in one command.
#
#  EDIT THESE TWO LINES BEFORE RUNNING:
# ════════════════════════════════════════════════════════════════════
TEAM_ID="YOUR_TEAM_ID"            # Your 10-char Apple Team ID
                                # Find it: developer.apple.com → Account → Membership
BUNDLE_ID="com.shah.widgethub"  # Must be globally unique (change yourname)
# ════════════════════════════════════════════════════════════════════

# ── Paths ────────────────────────────────────────────────────────────
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WIDGET="$ROOT/artifacts/widget-hub"
BUILD="$WIDGET/build"
ARCHIVE="$BUILD/App.xcarchive"
IPA_DIR="$BUILD/ipa"

# ── Color helpers ────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; CYAN='\033[0;36m'; NC='\033[0m'
step() { echo -e "\n${CYAN}[$1/6] $2${NC}"; }
ok()   { echo -e "${GREEN}✓ $1${NC}"; }
err()  { echo -e "${RED}ERROR: $1${NC}" >&2; exit 1; }

echo ""
echo "  ╔═══════════════════════════════════╗"
echo "  ║    Widget Hub — iOS Build         ║"
echo "  ╚═══════════════════════════════════╝"

# ── Preflight checks ─────────────────────────────────────────────────
[ "$TEAM_ID"   = "XXXXXXXXXX" ]          && err "Set your TEAM_ID at the top of this script.\n  Find it at: developer.apple.com → Account → Membership"
[ "$BUNDLE_ID" = "com.yourname.widgethub" ] && err "Set a unique BUNDLE_ID at the top of this script."
command -v pnpm        &>/dev/null       || err "pnpm not found. Run: npm install -g pnpm"
command -v xcodebuild  &>/dev/null       || err "Xcode not found. Install Xcode from the Mac App Store."
command -v node        &>/dev/null       || err "Node.js not found. Install from nodejs.org"

step 1 "Installing dependencies..."
cd "$ROOT"
pnpm install
ok "Dependencies ready"

step 2 "Building web app for Capacitor..."
pnpm --filter @workspace/widget-hub run cap:build
ok "Web build complete → artifacts/widget-hub/dist/"

step 3 "Setting up iOS platform (checking if regeneration is needed)..."
cd "$WIDGET"
if [ ! -d "ios" ]; then
  echo "No ios/ folder found. Adding iOS platform..."
  npx cap add ios
  ok "iOS Xcode project created"
else
  ok "ios/ folder already exists, preserving custom native extensions."
fi

step 4 "Syncing web assets into iOS..."
npx cap sync ios
ok "Sync complete"

step 4.5 "Configuring Native SwiftUI Widget Extension target in Xcode..."
ruby setup-widget-target.rb
ok "Xcode project setup successfully"

step 5 "Archiving with Xcode (takes 3–5 minutes)..."
mkdir -p "$BUILD"
rm -rf "$ARCHIVE"

xcodebuild \
  -project ios/App/App.xcodeproj \
  -scheme App \
  -configuration Release \
  -archivePath "$ARCHIVE" \
  -destination "generic/platform=iOS" \
  -allowProvisioningUpdates \
  DEVELOPMENT_TEAM="$TEAM_ID" \
  CODE_SIGN_STYLE=Automatic \
  archive

[ -d "$ARCHIVE" ] || err "Archive failed — check the output above."
ok "Archive created"

step 6 "Exporting .ipa..."
mkdir -p "$IPA_DIR"
rm -rf "$IPA_DIR"/*

cat > "$BUILD/ExportOptions.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>development</string>
    <key>teamID</key>
    <string>${TEAM_ID}</string>
    <key>signingStyle</key>
    <string>automatic</string>
    <key>uploadSymbols</key>
    <true/>
    <key>compileBitcode</key>
    <false/>
</dict>
</plist>
PLIST

xcodebuild \
  -exportArchive \
  -archivePath "$ARCHIVE" \
  -exportPath "$IPA_DIR" \
  -exportOptionsPlist "$BUILD/ExportOptions.plist" \
  -allowProvisioningUpdates

IPA=$(find "$IPA_DIR" -name "*.ipa" | head -1)
[ -n "$IPA" ] || err "Export failed — .ipa file not found."

echo ""
echo "  ╔═══════════════════════════════════╗"
echo "  ║    Build Complete!                ║"
echo "  ╚═══════════════════════════════════╝"
echo ""
echo -e "  ${GREEN}Your .ipa:${NC}"
echo "  $IPA"
echo ""
echo "  To install on your iPhone:"
echo "  1. Open Sideloadly  →  sideloadly.io"
echo "  2. Drag the .ipa file into Sideloadly"
echo "  3. Enter your Apple ID and click Start"
echo ""
