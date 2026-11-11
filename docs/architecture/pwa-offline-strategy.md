# PWA & Offline Strategy

## PWA Capabilities
- **Service Worker Caching**: Shell assets, fonts, icons, and critical CSS are pre-cached for instant offline launch.
- **Offline Fallback**: When network is lost, the customer PWA gracefully degrades to cached catalog browsing with an offline badge.
- **Cart Resilience**: Single-merchant cart is stored in persistent `indexedDB` / LocalStorage so customer cart state survives app refreshes and network drops.
- **Reconnection Sync**: On network reconnect, order tracking and socket relays automatically reconnect with exponential backoff and refetch authoritative API state.
- **Web App Manifest**: Configured for standalone display, custom splash screens, native app badges, and theme-color matches.
