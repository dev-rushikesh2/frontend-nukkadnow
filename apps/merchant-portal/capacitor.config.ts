export interface CapacitorConfig {
  appId: string;
  appName: string;
  webDir: string;
  bundledWebRuntime: boolean;
  plugins?: Record<string, any>;
  server?: {
    androidScheme?: string;
    cleartext?: boolean;
    url?: string;
  };
}

const config: CapacitorConfig = {
  appId: 'in.nukkadnow.merchant',
  appName: 'NukkadNow Merchant',
  webDir: 'dist/apps/merchant-portal/browser',
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    },
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#0F172A',
      showSpinner: false
    }
  },
  server: {
    androidScheme: 'https',
    cleartext: false
  }
};

export default config;
