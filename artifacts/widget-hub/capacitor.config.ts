import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.widgethub.app',
  appName: 'Widget Hub',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#000000',
    scrollEnabled: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      backgroundColor: '#000000',
      showSpinner: false,
    },
    StatusBar: {
      style: 'Dark',
      backgroundColor: '#000000',
    },
  },
};

export default config;
