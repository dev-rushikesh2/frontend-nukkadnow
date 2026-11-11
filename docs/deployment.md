# Frontend Deployment Architecture

## Targets
- **Customer PWA**:
  - Domain: `customer.nukkadnow.example` (or root domain with PWA headers)
  - Target: Cloudflare Pages / AWS CloudFront + S3 / Vercel
  - Caching: Cache-Control immutable on hashed assets (`dist/apps/customer-pwa/browser/*.[hash].js`), no-cache on `index.html` and `manifest.webmanifest`.
- **Merchant Portal**:
  - Domain: `merchant.nukkadnow.example`
  - Target: Secure CDN distribution with tenant header policy and rate limiting.
