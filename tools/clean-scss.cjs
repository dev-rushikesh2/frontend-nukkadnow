const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'apps', 'merchant-portal', 'src', 'app', 'features');

function cleanDir(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const full = path.join(d, f.name);
    if (f.isDirectory()) {
      cleanDir(full);
    } else if (f.name.endsWith('.scss')) {
      let content = fs.readFileSync(full, 'utf8');
      if (content.includes('@use')) {
        content = content.replace(/@use\s+['"][^'"]+['"]\s+as\s+tok;\r?\n\r?\n?/g, '');
        fs.writeFileSync(full, content, 'utf8');
        console.log('Cleaned SCSS:', full);
      }
    }
  }
}

cleanDir(dir);
console.log('Done cleaning SCSS.');
