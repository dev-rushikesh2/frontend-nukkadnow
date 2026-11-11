const fs = require('fs');
const path = require('path');

const pwaFeaturesDir = path.join(__dirname, '..', 'apps', 'customer-pwa', 'src', 'app', 'features');

function fixPwa(dir) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      fixPwa(full);
    } else if (item.name.endsWith('-details.page.ts')) {
      let content = fs.readFileSync(full, 'utf8');
      if (/template:\s*\r?\n\s*</.test(content)) {
        content = content.replace(/template:\s*\r?\n\s*([\s\S]*?),\r?\n\s*changeDetection:/, (match, html) => {
          return `template: \`\n${html.trim()}\n  \`,\n  changeDetection:`;
        });
        fs.writeFileSync(full, content, 'utf8');
        console.log('Fixed backticks in PWA:', full);
      }
    } else if (item.name.endsWith('.routes.ts')) {
      let content = fs.readFileSync(full, 'utf8');
      const featName = path.basename(dir);
      const expectedConst = featName.toUpperCase().replace(/-/g, '_') + '_ROUTES';
      if (content.includes('export const _ROUTES')) {
        content = content.replace('export const _ROUTES', `export const ${expectedConst}`);
        fs.writeFileSync(full, content, 'utf8');
        console.log(`Updated PWA route in ${item.name} to ${expectedConst}`);
      }
    }
  }
}

fixPwa(pwaFeaturesDir);
console.log('Finished PWA checks.');
