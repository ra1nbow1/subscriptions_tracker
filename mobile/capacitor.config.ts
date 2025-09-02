import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.subscriptions',
  appName: 'SubscriptionsTracker',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
}

export default config
