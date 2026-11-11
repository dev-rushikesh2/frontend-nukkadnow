const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, '..', 'apps', 'merchant-portal', 'src', 'app', 'features');

// 1. Fix template backticks in *-details.page.ts
function fixDetails(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      fixDetails(full);
    } else if (item.name.endsWith('-details.page.ts')) {
      let content = fs.readFileSync(full, 'utf8');
      // If template: <div ... , without backticks
      if (/template:\s*\r?\n\s*</.test(content)) {
        content = content.replace(/template:\s*\r?\n\s*([\s\S]*?),\r?\n\s*changeDetection:/, (match, html) => {
          return `template: \`\n${html.trim()}\n  \`,\n  changeDetection:`;
        });
        fs.writeFileSync(full, content, 'utf8');
        console.log('Fixed backticks in:', full);
      }
    }
  }
}

// 2. Fix route constants in *.routes.ts
// E.g. queue-board.routes.ts -> QUEUE_BOARD_ROUTES
// variants.routes.ts -> VARIANTS_ROUTES
// inventory.routes.ts -> INVENTORY_ROUTES
// seller-modes.routes.ts -> SELLER_MODES_ROUTES
// business-profile.routes.ts -> BUSINESS_PROFILE_ROUTES
// settings.routes.ts -> SETTINGS_ROUTES
// onboarding.routes.ts -> ONBOARDING_ROUTES
function fixRoutes(dir) {
  for (const feat of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!feat.isDirectory()) continue;
    const featPath = path.join(dir, feat.name);
    for (const f of fs.readdirSync(featPath, { withFileTypes: true })) {
      if (f.name.endsWith('.routes.ts')) {
        const full = path.join(featPath, f.name);
        let content = fs.readFileSync(full, 'utf8');
        const expectedConst = feat.name.toUpperCase().replace(/-/g, '_') + '_ROUTES';
        if (content.includes('export const _ROUTES')) {
          content = content.replace('export const _ROUTES', `export const ${expectedConst}`);
          fs.writeFileSync(full, content, 'utf8');
          console.log(`Updated route in ${f.name} to ${expectedConst}`);
        }
      }
    }
  }
}

fixDetails(featuresDir);
fixRoutes(featuresDir);
console.log('Finished fix-details and fix-routes.');
