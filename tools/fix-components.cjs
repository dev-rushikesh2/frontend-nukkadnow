const fs = require('fs');
const path = require('path');

function fixComponentsInDir(baseDir) {
  if (!fs.existsSync(baseDir)) return;
  for (const feat of fs.readdirSync(baseDir, { withFileTypes: true })) {
    if (!feat.isDirectory()) continue;
    const compDir = path.join(baseDir, feat.name, 'components');
    if (!fs.existsSync(compDir)) continue;

    for (const f of fs.readdirSync(compDir, { withFileTypes: true })) {
      if (!f.name.endsWith('.component.ts')) continue;
      const fullPath = path.join(compDir, f.name);
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // 1. Single-line template: template: <span ...>,
      if (/template:\s*<[^`\n\r]+>,/.test(content)) {
        content = content.replace(/template:\s*(<[^`\n\r]+>),/g, 'template: `$1`,');
        changed = true;
      }

      // 2. Multiline template without backticks
      if (/template:\s*\r?\n\s*</.test(content)) {
        content = content.replace(/template:\s*\r?\n\s*([\s\S]*?),\s*\r?\n\s*styles:/, (match, tpl) => {
          return `template: \`\n${tpl.trim()}\n  \`,\n  styles:`;
        });
        changed = true;
      }

      // 3. Remove invalid model import if present
      if (content.includes('../models/')) {
        content = content.replace(/import\s*\{[^}]*\}\s*from\s*'\.\.\/models\/[^']+';\r?\n?/g, '');
        content = content.replace(/item\s*=\s*input\.required<[^>]+>\(\);?/g, 'item = input<any>();');
        content = content.replace(/item\s*=\s*input<[^>]+>\(\);?/g, 'item = input<any>();');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Fixed component:', fullPath);
      }
    }
  }
}

fixComponentsInDir(path.join(__dirname, '..', 'apps', 'merchant-portal', 'src', 'app', 'features'));
fixComponentsInDir(path.join(__dirname, '..', 'apps', 'customer-pwa', 'src', 'app', 'features'));
console.log('Finished fixing all component templates & imports.');
