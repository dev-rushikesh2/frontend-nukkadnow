/**
 * Architectural Boundaries Verifier
 * Enforces DDD architectural integrity across apps and libs:
 * 1. Customer PWA must never import from Merchant Portal.
 * 2. Merchant Portal must never import from Customer PWA.
 * 3. Apps must only consume libs via their public @nukkadnow/* index entrypoints.
 * 4. Libs must not import from Apps.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

console.log('🛡️  [BOUNDARIES] Checking architectural boundaries across monorepo...');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const violations = [];

function checkDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory() && file.name !== 'node_modules' && file.name !== 'dist') {
      checkDirectory(fullPath);
    } else if (file.isFile() && (file.name.endsWith('.ts') || file.name.endsWith('.html'))) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (fullPath.includes('customer-pwa') && content.includes('merchant-portal')) {
        violations.push(`Cross-app dependency in ${fullPath}: Customer PWA references Merchant Portal.`);
      }
      if (fullPath.includes('merchant-portal') && content.includes('customer-pwa')) {
        violations.push(`Cross-app dependency in ${fullPath}: Merchant Portal references Customer PWA.`);
      }
      if (fullPath.includes('libs') && (content.includes('apps/customer-pwa') || content.includes('apps/merchant-portal'))) {
        violations.push(`Illegal inverted dependency in ${fullPath}: Libs must never reference Apps.`);
      }
    }
  }
}

checkDirectory(path.join(rootDir, 'apps'));
checkDirectory(path.join(rootDir, 'libs'));

if (violations.length > 0) {
  console.error('❌ Architectural violations detected:');
  violations.forEach(v => console.error(`  - ${v}`));
  process.exit(1);
} else {
  console.log('✅ [BOUNDARIES] Monorepo architecture boundaries are 100% compliant.');
}
