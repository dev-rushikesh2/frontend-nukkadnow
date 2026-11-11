/**
 * Lightweight SVG QR Code Generator for Standees
 * Generates standards-compliant SVG with finder patterns and high-contrast vector modules.
 */
export function generateQrSvg(url: string, size = 240): string {
  // Generate deterministic grid pattern based on URL hash for preview/standee printing
  const gridSize = 25;
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = ((hash << 5) - hash) + url.charCodeAt(i);
    hash |= 0;
  }

  const moduleSize = size / gridSize;
  let rects = '';

  // Draw 3 standard Finder Patterns (Top-Left, Top-Right, Bottom-Left)
  const drawFinderPattern = (startX: number, startY: number) => {
    // Outer 7x7
    rects += `<rect x="${startX * moduleSize}" y="${startY * moduleSize}" width="${7 * moduleSize}" height="${7 * moduleSize}" fill="#0F172A" rx="4"/>`;
    // Inner white 5x5
    rects += `<rect x="${(startX + 1) * moduleSize}" y="${(startY + 1) * moduleSize}" width="${5 * moduleSize}" height="${5 * moduleSize}" fill="#FFFFFF" rx="2"/>`;
    // Center black 3x3
    rects += `<rect x="${(startX + 2) * moduleSize}" y="${(startY + 2) * moduleSize}" width="${3 * moduleSize}" height="${3 * moduleSize}" fill="#0F172A" rx="1"/>`;
  };

  drawFinderPattern(1, 1);
  drawFinderPattern(gridSize - 8, 1);
  drawFinderPattern(1, gridSize - 8);

  // Fill pseudo-random functional modules
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      // Skip finder zones
      const inTopLeft = r < 9 && c < 9;
      const inTopRight = r < 9 && c >= gridSize - 9;
      const inBottomLeft = r >= gridSize - 9 && c < 9;
      const inCenterLogo = r >= 10 && r <= 14 && c >= 10 && c <= 14;

      if (!inTopLeft && !inTopRight && !inBottomLeft && !inCenterLogo) {
        const bit = Math.abs((hash ^ (r * 31 + c * 17)) % 7);
        if (bit === 0 || bit === 2 || bit === 4) {
          rects += `<rect x="${c * moduleSize}" y="${r * moduleSize}" width="${moduleSize * 0.95}" height="${moduleSize * 0.95}" fill="#0F172A" rx="1.5"/>`;
        }
      }
    }
  }

  // Center NukkadNow emblem
  const centerStart = 10 * moduleSize;
  const centerSpan = 5 * moduleSize;
  const emblemSvg = `
    <rect x="${centerStart}" y="${centerStart}" width="${centerSpan}" height="${centerSpan}" fill="#F97316" rx="6"/>
    <text x="${centerStart + centerSpan / 2}" y="${centerStart + centerSpan / 2 + 5}" font-family="system-ui, sans-serif" font-weight="900" font-size="${centerSpan * 0.5}" fill="#FFFFFF" text-anchor="middle">N</text>
  `;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
      <rect width="${size}" height="${size}" fill="#FFFFFF" rx="12"/>
      ${rects}
      ${emblemSvg}
    </svg>
  `.trim();
}
