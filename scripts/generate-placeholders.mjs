import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function createProductSvg(title, sku, category, view, primaryColor = '#1e1e24', accentColor = '#e11d48') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141418"/>
      <stop offset="50%" stop-color="${primaryColor}"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accentColor}"/>
      <stop offset="100%" stop-color="#f43f5e"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="45%" r="45%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.4"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#27272a" stroke-width="0.75" stroke-opacity="0.6"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="800" height="1000" fill="url(#bgGrad)"/>
  <rect width="800" height="1000" fill="url(#grid)"/>
  <rect width="800" height="1000" fill="url(#glow)"/>

  <!-- Top Decorative Bar -->
  <rect x="40" y="40" width="720" height="1" fill="#27272a"/>
  <text x="40" y="65" fill="#a1a1aa" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="600" letter-spacing="4">ELLANE // STUDIO SPEC</text>
  <text x="760" y="65" text-anchor="end" fill="#e11d48" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="3">${sku}</text>

  <!-- Geometric Monogram & Silhouette Centerpiece -->
  <g transform="translate(400, 440)">
    <!-- Outer Rings -->
    <circle cx="0" cy="0" r="220" fill="none" stroke="#27272a" stroke-width="1.5" stroke-dasharray="6,6"/>
    <circle cx="0" cy="0" r="170" fill="#121216" stroke="#3f3f46" stroke-width="1"/>
    
    <!-- Central E Monogram / Symbol -->
    <path d="M -60 -90 L 60 -90 L 60 -60 L -25 -60 L -25 -15 L 45 -15 L 45 15 L -25 15 L -25 60 L 60 60 L 60 90 L -60 90 Z" fill="#fafafa"/>
    <rect x="-85" y="-115" width="170" height="230" fill="none" stroke="${accentColor}" stroke-width="2" stroke-opacity="0.8"/>
    
    <!-- Category Badge in Center -->
    <rect x="-60" y="125" width="120" height="24" rx="2" fill="#09090b" stroke="#27272a"/>
    <text x="0" y="141" text-anchor="middle" fill="#a1a1aa" font-family="'JetBrains Mono', monospace" font-size="11" font-weight="600" letter-spacing="3">${category.toUpperCase()}</text>
  </g>

  <!-- Bottom Details Block -->
  <g transform="translate(40, 780)">
    <rect x="0" y="0" width="720" height="150" rx="4" fill="#121216" stroke="#27272a" fill-opacity="0.85"/>
    <text x="30" y="45" fill="#ffffff" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="800" letter-spacing="2">${title}</text>
    <text x="30" y="75" fill="#a1a1aa" font-family="'JetBrains Mono', monospace" font-size="13" letter-spacing="2">VIEW: ${view.toUpperCase()} · D2C ORIGINAL</text>
    <text x="30" y="115" fill="#71717a" font-family="'JetBrains Mono', monospace" font-size="11" letter-spacing="1">AUTHENTIC STREETWEAR // ELEVATE YOUR OUTFITS</text>
    
    <!-- Kannada accent watermark -->
    <text x="690" y="115" text-anchor="end" fill="#3f3f46" font-family="'Noto Sans Kannada', sans-serif" font-size="24" font-weight="bold">ಎಲ್ಲೇನ್</text>
  </g>

  <!-- Frame Corners -->
  <path d="M 30 50 L 30 30 L 50 30" fill="none" stroke="#e11d48" stroke-width="3"/>
  <path d="M 770 50 L 770 30 L 750 30" fill="none" stroke="#e11d48" stroke-width="3"/>
  <path d="M 30 950 L 30 970 L 50 970" fill="none" stroke="#e11d48" stroke-width="3"/>
  <path d="M 770 950 L 770 970 L 750 970" fill="none" stroke="#e11d48" stroke-width="3"/>
</svg>`;
}

function createCategorySvg(title, kannadaTitle, sub, accent = '#e11d48') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="catBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181d"/>
      <stop offset="50%" stop-color="#0f0f12"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <pattern id="catGrid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#27272a" stroke-width="0.5"/>
    </pattern>
  </defs>

  <rect width="800" height="600" fill="url(#catBg)"/>
  <rect width="800" height="600" fill="url(#catGrid)"/>
  
  <circle cx="400" cy="280" r="160" fill="none" stroke="#27272a" stroke-width="1.5" stroke-dasharray="4,4"/>
  <circle cx="400" cy="280" r="120" fill="#121216" stroke="${accent}" stroke-width="1" stroke-opacity="0.4"/>
  
  <!-- Monogram -->
  <path d="M 370 230 L 430 230 L 430 245 L 390 245 L 390 270 L 425 270 L 425 285 L 390 285 L 390 315 L 430 315 L 430 330 L 370 330 Z" fill="#ffffff"/>
  
  <text x="400" y="440" text-anchor="middle" fill="#ffffff" font-family="'Space Grotesk', sans-serif" font-size="28" font-weight="900" letter-spacing="4">${title.toUpperCase()}</text>
  <text x="400" y="475" text-anchor="middle" fill="${accent}" font-family="'Noto Sans Kannada', sans-serif" font-size="20" font-weight="bold">${kannadaTitle}</text>
  <text x="400" y="510" text-anchor="middle" fill="#a1a1aa" font-family="'JetBrains Mono', monospace" font-size="12" letter-spacing="3">${sub.toUpperCase()}</text>

  <rect x="40" y="40" width="720" height="520" fill="none" stroke="#27272a" stroke-width="1"/>
</svg>`;
}

function createHeroSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 600" width="1600" height="600">
  <defs>
    <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2a0812"/>
      <stop offset="50%" stop-color="#121216"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>

  <rect width="1600" height="600" fill="url(#heroBg)"/>
  
  <!-- Festive Glow & Rings -->
  <circle cx="800" cy="300" r="280" fill="none" stroke="#e11d48" stroke-width="1" stroke-opacity="0.3"/>
  <circle cx="800" cy="300" r="220" fill="none" stroke="#fbbf24" stroke-width="1" stroke-opacity="0.3" stroke-dasharray="8,8"/>

  <text x="800" y="160" text-anchor="middle" fill="#fbbf24" font-family="'JetBrains Mono', monospace" font-size="18" font-weight="700" letter-spacing="6">GANESHA FESTIVAL SPECIAL OFFER</text>
  <text x="800" y="240" text-anchor="middle" fill="#ffffff" font-family="'Space Grotesk', sans-serif" font-size="64" font-weight="900" letter-spacing="6">GANESHA FESTIVAL SALE</text>
  <text x="800" y="320" text-anchor="middle" fill="url(#goldGrad)" font-family="'Space Grotesk', sans-serif" font-size="44" font-weight="900" letter-spacing="4">FLAT 40% OFF · T&amp;C APPLY</text>
  <text x="800" y="375" text-anchor="middle" fill="#fafafa" font-family="'Noto Sans Kannada', sans-serif" font-size="26" font-weight="bold">ಹಬ್ಬದ ಮಹಾ ಮಾರಾಟ · ಸೀಮಿತ ಅವಧಿ</text>
  <text x="800" y="440" text-anchor="middle" fill="#a1a1aa" font-family="'JetBrains Mono', monospace" font-size="14" letter-spacing="3">USE CODE: GANESHA40 · FREE SHIPPING OVER RS. 1,999</text>
</svg>`;
}

function createShopfrontSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 700" width="1000" height="700">
  <defs>
    <linearGradient id="shopBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181d"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
  </defs>
  <rect width="1000" height="700" fill="url(#shopBg)"/>
  
  <!-- Shop Signboard -->
  <rect x="150" y="120" width="700" height="160" rx="4" fill="#09090b" stroke="#e11d48" stroke-width="2"/>
  <text x="500" y="190" text-anchor="middle" fill="#ffffff" font-family="'Space Grotesk', sans-serif" font-size="44" font-weight="900" letter-spacing="6">ELLANE</text>
  <text x="500" y="240" text-anchor="middle" fill="#e11d48" font-family="'Noto Sans Kannada', sans-serif" font-size="28" font-weight="bold">ಎಲ್ಲೇನ್ ಸ್ಟೋರ್</text>
  
  <!-- Doorway / Window display simulation -->
  <rect x="250" y="320" width="500" height="340" fill="#121216" stroke="#27272a" stroke-width="2"/>
  <line x1="500" y1="320" x2="500" y2="660" stroke="#27272a" stroke-width="2"/>
  <circle cx="480" cy="490" r="6" fill="#e11d48"/>
  <circle cx="520" cy="490" r="6" fill="#e11d48"/>

  <text x="500" y="440" text-anchor="middle" fill="#a1a1aa" font-family="'JetBrains Mono', monospace" font-size="14" letter-spacing="3">PHYSICAL STORE · BENGALURU</text>
  <text x="500" y="480" text-anchor="middle" fill="#71717a" font-family="'JetBrains Mono', monospace" font-size="12" letter-spacing="2">OPEN DAILY: 11:00 AM – 9:30 PM</text>
</svg>`;
}

function createSocialSvg(index, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="igBg${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1f1f26"/>
      <stop offset="100%" stop-color="#09090b"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#igBg${index})"/>
  <rect x="20" y="20" width="560" height="560" fill="none" stroke="#27272a" stroke-width="1"/>
  
  <g transform="translate(300, 260)">
    <circle cx="0" cy="0" r="90" fill="#121216" stroke="#3f3f46" stroke-width="1"/>
    <path d="M -25 -40 L 25 -40 L 25 -25 L -10 -25 L -10 -5 L 20 -5 L 20 10 L -10 10 L -10 25 L 25 25 L 25 40 L -25 40 Z" fill="#ffffff"/>
  </g>

  <text x="300" y="420" text-anchor="middle" fill="#ffffff" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="700" letter-spacing="2">${title}</text>
  <text x="300" y="455" text-anchor="middle" fill="#e11d48" font-family="'JetBrains Mono', monospace" font-size="12" letter-spacing="2">@ELLANE_STORE_</text>
  <text x="300" y="490" text-anchor="middle" fill="#71717a" font-family="'Noto Sans Kannada', sans-serif" font-size="14">ಎಲ್ಲೇನ್</text>
</svg>`;
}

const products = [
  { slug: 'ellane-baggy-drawstring-jeans', title: 'BAGGY DRAWSTRING JEANS', sku: 'EL-JNS-001', category: 'Jeans', color: '#1e3a8a', views: ['Front View', 'Detail View', 'Back View'] },
  { slug: 'ellane-racing-panel-jacket', title: 'RACING PANEL JACKET', sku: 'EL-JKT-002', category: 'Jackets', color: '#27272a', views: ['Front View', 'Back View'] },
  { slug: 'ellane-basketball-graphic-hoodie', title: 'BASKETBALL GRAPHIC HOODIE', sku: 'EL-HD-003', category: 'Hoodies', color: '#1e40af', views: ['Front View', 'Back View'] },
  { slug: 'ellane-floral-embroidered-shirt', title: 'FLORAL EMBROIDERED SHIRT', sku: 'EL-SHT-004', category: 'Shirts', color: '#18181b', views: ['Front View', 'Close-Up'] },
  { slug: 'ellane-contrast-collar-polo', title: 'CONTRAST COLLAR POLO', sku: 'EL-POL-005', category: 'Polos', color: '#3f6212', views: ['Front View', 'Collar Detail'] },
  { slug: 'ellane-red-check-shirt', title: 'RED CHECK SHIRT', sku: 'EL-SHT-006', category: 'Shirts', color: '#7f1d1d', views: ['Front View', 'Pattern Detail'] },
  { slug: 'ellane-pinstripe-shirt', title: 'PINSTRIPE SHIRT', sku: 'EL-SHT-007', category: 'Shirts', color: '#3b0764', views: ['Front View', 'Fabric Close-Up'] },
  { slug: 'ellane-maroon-graphic-shirt', title: 'MAROON GRAPHIC SHIRT', sku: 'EL-SHT-008', category: 'Shirts', color: '#881337', views: ['Front View', 'Back View'] },
  { slug: 'ellane-high-rise-wide-leg-jeans', title: 'HIGH-RISE WIDE-LEG JEANS', sku: 'EL-WJN-009', category: 'Womens', color: '#1d4ed8', views: ['Front View', 'Back View'] },
  { slug: 'ellane-ribbed-crop-tee', title: 'RIBBED CROP TEE', sku: 'EL-WTE-010', category: 'Womens', color: '#27272a', views: ['Front View', 'Fabric Close-Up'] },
  { slug: 'ellane-oversized-co-ord-set', title: 'OVERSIZED CO-ORD SET', sku: 'EL-WCD-011', category: 'Womens', color: '#3f3f46', views: ['Outfit View', 'Trousers Detail'] },
  { slug: 'ellane-crew-socks-pack', title: 'CREW SOCKS PACK', sku: 'EL-SCK-012', category: 'Socks', color: '#18181b', views: ['Pack View', 'Detail View'] },
  { slug: 'ellane-tinted-shades', title: 'TINTED SHADES', sku: 'EL-ACC-013', category: 'Accessories', color: '#78350f', views: ['Front View', 'Angle View'] },
  { slug: 'ellane-logo-cap', title: 'LOGO CAP', sku: 'EL-CAP-014', category: 'Caps', color: '#18181b', views: ['Front View', 'Back Strap'] },
];

const categories = [
  { slug: 'all-products', title: 'ALL PRODUCTS', kannada: 'ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು', sub: 'Complete Collection' },
  { slug: 'mens-wear', title: "MEN'S WEAR", kannada: 'ಪುರುಷರ ಉಡುಪುಗಳು', sub: 'Street Essentials' },
  { slug: 'womens-wear', title: "WOMEN'S WEAR", kannada: 'ಮಹಿಳೆಯರ ಉಡುಪುಗಳು', sub: 'Contemporary Fits' },
  { slug: 'casual-fashion', title: 'CASUAL FASHION', kannada: 'ಕ್ಯಾಶುಯಲ್ ಫ್ಯಾಷನ್', sub: 'Effortless Drapes' },
  { slug: 'everyday-style', title: 'EVERYDAY STYLE', kannada: 'ದೈನಂದಿನ ಶೈಲಿ', sub: 'Daily Staples' },
  { slug: 'festive-sale', title: 'FESTIVE SALE', kannada: 'ಹಬ್ಬದ ಮಾರಾಟ', sub: 'Special Offers' },
  { slug: 'jeans', title: 'JEANS & BOTTOMS', kannada: 'ಜೀನ್ಸ್', sub: 'Baggy & Wide Leg' },
  { slug: 'hoodies', title: 'HOODIES', kannada: 'ಹುಡೀಸ್', sub: '380 GSM Heavyweight' },
  { slug: 'jackets', title: 'JACKETS', kannada: 'ಜಾಕೆಟ್‌ಗಳು', sub: 'Racing & Outerwear' },
  { slug: 'shirts', title: 'SHIRTS', kannada: 'ಶರ್ಟ್‌ಗಳು', sub: 'Resort & Flannel' },
  { slug: 'polos', title: 'POLOS', kannada: 'ಪೋಲೋಗಳು', sub: 'Waffle Knit' },
  { slug: 'womens', title: 'WOMENS', kannada: 'ಮಹಿಳೆಯರ', sub: 'Modern Fits' },
  { slug: 'accessories', title: 'ACCESSORIES', kannada: 'ಪೂರಕ ಪರಿಕರಗಳು', sub: 'Shades & Chains' },
  { slug: 'socks', title: 'SOCKS', kannada: 'ಸಾಕ್ಸ್‌ಗಳು', sub: 'Cushioned Crew Packs' },
  { slug: 'caps', title: 'CAPS', kannada: 'ಕ್ಯಾಪ್‌ಗಳು', sub: 'Embroidered Strapbacks' },
];

console.log('Generating local SVG assets for ELLANE storefront...');

// Generate product SVGs
for (const p of products) {
  const prodDir = path.join(publicDir, 'products', p.slug);
  ensureDir(prodDir);
  p.views.forEach((v, idx) => {
    const filePath = path.join(prodDir, `${idx + 1}.svg`);
    fs.writeFileSync(filePath, createProductSvg(p.title, p.sku, p.category, v, p.color));
  });
}

// Generate category SVGs
const catDir = path.join(publicDir, 'categories');
ensureDir(catDir);
for (const c of categories) {
  const filePath = path.join(catDir, `${c.slug}.svg`);
  fs.writeFileSync(filePath, createCategorySvg(c.title, c.kannada, c.sub));
}

// Generate hero, video, store, social SVGs
const heroDir = path.join(publicDir, 'hero');
ensureDir(heroDir);
fs.writeFileSync(path.join(heroDir, 'festive-hero.svg'), createHeroSvg());
fs.writeFileSync(path.join(heroDir, 'feature-jeans.svg'), createCategorySvg('FEATURED JEANS', 'ಜೀನ್ಸ್ ಸಂಗ್ರಹ', 'Heavyweight Baggy Denim'));

const videoDir = path.join(publicDir, 'video');
ensureDir(videoDir);
fs.writeFileSync(path.join(videoDir, 'poster.svg'), createCategorySvg('ELEVATE YOUR OUTFITS', 'ಎಲ್ಲೇನ್ ಸ್ಟುಡಿಯೋ', 'Autoplay Visual Motion Fallback'));

const storeDir = path.join(publicDir, 'store');
ensureDir(storeDir);
fs.writeFileSync(path.join(storeDir, 'shopfront.svg'), createShopfrontSvg());

const socialDir = path.join(publicDir, 'social');
ensureDir(socialDir);
const socialTitles = ['NEW DROP // HOODIES', 'BENGALURU POP-UP', 'BAGGY FIT DENIM', 'FESTIVE EDIT', 'STREET ACCESSORIES', 'EVERYDAY ESSENTIALS'];
socialTitles.forEach((t, i) => {
  fs.writeFileSync(path.join(socialDir, `ig-${i + 1}.svg`), createSocialSvg(i + 1, t));
});

console.log('Successfully generated all placeholder assets!');
