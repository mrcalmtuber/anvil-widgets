require 'xcodeproj'
require 'fileutils'

puts "Checking Xcode project paths..."
ROOT = File.expand_path(File.dirname(__FILE__))
project_path = File.join(ROOT, 'ios/App/App.xcodeproj')

unless File.exist?(project_path)
  puts "ERROR: Xcode project not found at #{project_path}"
  exit 1
end

puts "Opening Xcode project: #{project_path}"
project = Xcodeproj::Project.open(project_path)

# ── 1. CONFIGURE CUSTOM CAPACITOR PLUGIN IN MAIN APP ───────────────────
app_target = project.targets.find { |t| t.name == 'App' }
if app_target.nil?
  puts "ERROR: Main 'App' target not found in project."
  exit 1
end

app_group = project.main_group.find_subpath('App/App', true)

# Create plugin file references in Xcode
plugin_swift = app_group.find_file_by_path('MyWidgetPlugin.swift') || app_group.new_file('MyWidgetPlugin.swift')
plugin_m = app_group.find_file_by_path('MyWidgetPlugin.m') || app_group.new_file('MyWidgetPlugin.m')

# Add plugin files to main target's source compilation phase (if not already added)
unless app_target.source_build_phase.files.any? { |f| f.file_ref == plugin_swift }
  app_target.source_build_phase.add_file_reference(plugin_swift)
  puts "Linked MyWidgetPlugin.swift to main App target compile sources"
end

unless app_target.source_build_phase.files.any? { |f| f.file_ref == plugin_m }
  app_target.source_build_phase.add_file_reference(plugin_m)
  puts "Linked MyWidgetPlugin.m to main App target compile sources"
end


# ── 2. CREATE WIDGET EXTENSION TARGET STRUCTURE ──────────────────────
widget_dir = File.join(ROOT, 'ios/App/WidgetHubWidget')
FileUtils.mkdir_p(widget_dir)

group = project.main_group.find_subpath('WidgetHubWidget', true)

# Create blank placeholders so project reference doesn't fail
swift_file_path = File.join(widget_dir, 'WidgetHubWidget.swift')
plist_file_path = File.join(widget_dir, 'Info.plist')

FileUtils.touch(swift_file_path) unless File.exist?(swift_file_path)
FileUtils.touch(plist_file_path) unless File.exist?(plist_file_path)

widget_swift = group.find_file_by_path('WidgetHubWidget.swift') || group.new_file('WidgetHubWidget/WidgetHubWidget.swift')
widget_plist = group.find_file_by_path('Info.plist') || group.new_file('WidgetHubWidget/Info.plist')


# ── 3. CREATE & BUILD WIDGET TARGET ───────────────────────────────────
widget_target = project.targets.find { |t| t.name == 'WidgetHubWidget' }
if widget_target.nil?
  puts "Creating a new Widget Extension target: WidgetHubWidget..."
  widget_target = project.new_target(:app_extension, 'WidgetHubWidget', :ios, '15.0')
else
  puts "Target 'WidgetHubWidget' already exists. Re-linking..."
end

widget_target.source_build_phase.clear
widget_target.resources_build_phase.clear

# Link swift file to compilation phase of the extension
widget_target.source_build_phase.add_file_reference(widget_swift)

# Set the target's product name explicitly
widget_target.product_name = 'WidgetHubWidget'
if widget_target.product_reference
  widget_target.product_reference.name = 'WidgetHubWidget.appex'
  widget_target.product_reference.path = 'WidgetHubWidget.appex'
end

# ── 4. CONFIGURE TARGET BUILD SETTINGS ───────────────────────────────
puts "Applying build settings to Widget target..."
widget_target.build_configurations.each do |config|
  config.build_settings['PRODUCT_NAME'] = 'WidgetHubWidget'
  config.build_settings['WRAPPER_EXTENSION'] = 'appex'
  config.build_settings['PRODUCT_BUNDLE_IDENTIFIER'] = 'com.shah.widgethub.widget'
  config.build_settings['INFOPLIST_FILE'] = 'WidgetHubWidget/Info.plist'
  config.build_settings['LD_RUNPATH_SEARCH_PATHS'] = '$(inherited) @executable_path/Frameworks @executable_path/../../Frameworks'
  config.build_settings['SWIFT_VERSION'] = '5.0'
  config.build_settings['IPHONEOS_DEPLOYMENT_TARGET'] = '15.0'
  config.build_settings['CODE_SIGN_STYLE'] = 'Automatic'
  config.build_settings['DEVELOPMENT_TEAM'] = 'YOUR_TEAM_ID'
  config.build_settings['CURRENT_PROJECT_VERSION'] = '1'
  config.build_settings['MARKETING_VERSION'] = '1.0'
end


# ── 5. LINK DEPENDENCIES ──────────────────────────────────────────────
# Make the widget target a dependency of the main App target
unless app_target.dependencies.any? { |d| d.target == widget_target }
  app_target.add_dependency(widget_target)
end

# Find or create Embed App Extensions build phase
embed_extensions_phase = app_target.copy_files_build_phases.find { |p| p.dst_subfolder_spec == '13' }
if embed_extensions_phase.nil?
  embed_extensions_phase = app_target.new_copy_files_build_phase
  embed_extensions_phase.name = 'Embed App Extensions'
  embed_extensions_phase.dst_subfolder_spec = '13'
end

# Embed the widget target's output product inside the App
unless embed_extensions_phase.files.any? { |f| f.file_ref == widget_target.product_reference }
  embed_extensions_phase.add_file_reference(widget_target.product_reference)
end

# ── 6. ENABLE AUTOMATIC SIGNING IN TARGET ATTRIBUTES ──────────────────
puts "Enabling automatic signing in target attributes..."
project.root_object.attributes['TargetAttributes'] ||= {}

# Get the Development Team ID from the main App target to be consistent
app_attributes = project.root_object.attributes['TargetAttributes'][app_target.uuid] || {}
team_id = app_attributes['DevelopmentTeam'] || 'YOUR_TEAM_ID'

# Apply automatic signing style and Development Team to the Widget target
project.root_object.attributes['TargetAttributes'][widget_target.uuid] ||= {}
project.root_object.attributes['TargetAttributes'][widget_target.uuid]['ProvisioningStyle'] = 'Automatic'
project.root_object.attributes['TargetAttributes'][widget_target.uuid]['DevelopmentTeam'] = team_id

# Save changes
project.save
puts "Xcode project configured successfully with Widget target and native custom plugin!"
