# ELLANE ("Elevate Your Outfits") — D2C Storefront

A high-performance, mobile-first, dark-mode D2C fashion storefront built with Next.js 15, React 19, TypeScript (strict), and Tailwind CSS v4, architected after the Zenin Clothing (zenin.co.in) storefront model with ELLANE's authentic brand identity.

---

## 1. Quick Start

### Prerequisites
- Node.js >= 18.18 (v20+ recommended)
- pnpm >= 9.x (or npm / yarn)

### Installation & Development
```bash
# Install dependencies
pnpm install

# Run asset generator (creates all local vector SVGs for products, categories, hero & social feeds)
pnpm run generate-assets

# Start development dev server
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Unit Tests
```bash
pnpm test
```

### Production Build
```bash
pnpm build
pnpm start
```

---

## 2. Brand & Architecture Highlights

- **Visual & Structural Similarity to Zenin**:
  - Sticky header with slim announcement ticker marquee.
  - Category pill shortcuts row directly below header.
  - Embla Feature Slider for the signature **Jeans** line.
  - `NEW ARRIVAL / ಹೊಸ ಆಗಮನ` 7-product grid + View All tile.
  - Full-width looping video campaign showcase with local fallback poster.
  - 10 large Category Tiles with hover zoom effects.
  - Full-width Instagram community banner featuring real `@ellane_store_` follower count (431).
  - Newsletter with instant Zod validation.
  - Interactive Product Cards with 2-image hover crossfade, floored `SAVE xx%` discount badge (`Math.floor((1 - price/mrp) * 100)`), struck-through MRP, and instant Quick-Add (desktop hover & mobile sheet).
  - Slide-over Cart Drawer with free shipping progress bar, line item quantity steppers, upsell accessories rail, and `VIEW CART / CHECK OUT / CONTINUE SHOPPING` actions.
  - Live Order Tracking (`/track-order`) with 6-stage visual `TrackStepper` and courier links.

---

## 3. How to Customize & Manage the Store

### Central Config File (`lib/config.ts`)
All numbers, promo flags, shipping thresholds, follower counts, and phone numbers are managed in one file:

```ts
export const SITE = {
  name: 'ELLANE',
  tagline: 'Elevate Your Outfits',
  kannadaName: 'ಎಲ್ಲೇನ್',
  handle: '@ellane_store_',
  instagramUrl: 'https://www.instagram.com/ellane_store_/',
  followers: 431,              // Real count from Instagram bio
  phone: '7204154843',          // Bio phone number
  whatsapp: '917204154843',     // WhatsApp concierge number
  currencyStyle: 'Rs.',         // Switch between 'Rs.' and '₹'
  demoMode: true,               // Shows demo disclaimer in footer
  pricesArePlaceholders: true,
};

export const PROMO = {
  enabled: true,                // Set to false to disable festive banner
  label: 'GANESHA FESTIVAL SALE',
  text: 'FLAT 40% OFF · T&C APPLY',
  extraDiscountPercent: 0,
};

export const SHIPPING = {
  freeThreshold: 1999,          // Free shipping unlocked above Rs. 1,999
  flatFee: 99,
  codFee: 0,
};
```

---

## 4. How to Swap In Real Product Photos and Logo

1. **Logo**:
   - Place your real logo image at `public/logo.png` or `public/logo.svg`.
   - Pass the path to the `<Logo src="/logo.png" />` component in `components/layout/Header.tsx` and `components/layout/Footer.tsx`.

2. **Product Photos**:
   - To replace the generated local SVGs with high-res photoshoot JPGs/WebPs:
   - Place image files inside `public/products/<product-slug>/1.jpg`, `2.jpg`, etc.
   - Update the image references in `data/products.ts` or keep `.svg` as fallback.

---

## 5. "Confirm with the Owner" Checklist

Before launching commercially with live payment gateway processing:

1. **Phone / WhatsApp Number**: Confirm whether `7204154843` / `917204154843` is the dedicated business WhatsApp number.
2. **Product Pricing & Margins**: Verify placeholder prices and MRPs in `data/products.ts` against actual inventory.
3. **Free Delivery Threshold**: Confirm if `Rs. 1,999` free shipping threshold and `Rs. 99` standard shipping fee fit courier rates.
4. **Prepaid Offer**: Confirm whether to activate extra 5% instant discount on online payments (`PREPAID.enabled` in `lib/config.ts`).
5. **Kannada Spellings**: Confirm spelling of brand name **ಎಲ್ಲೇನ್** and bilingual section headers with local signage.
6. **Physical Store Address**: Confirm exact shop room number, building complex, and business hours in Bengaluru.
7. **Legal Policies**: Replace draft policy texts in `data/policies.ts` with the company's official registered terms.

---

## 6. Assumptions List

1. **Brand Aesthetic**: Built with a sleek dark obsidian theme (`#09090b` background, `#121216` surface, `#e11d48` sale red accent) matching Zenin's high-contrast streetwear aesthetic.
2. **Currency**: Configured with `Rs. 1,299` format with a flag to toggle to `₹1,299`.
3. **Asset Generation**: High-quality dark-mode local vector SVGs generated via `scripts/generate-placeholders.mjs` ensuring 100% offline autonomy without remote image dependencies.
4. **Order Fixtures**: Demo orders `#EL-1001`, `#EL-1002`, and `#EL-1003` are hardwired in `data/orders.ts` to facilitate immediate testing of the order tracking system.
5. **Checkout**: Implemented as a complete mock checkout form with Zod schema validation and order placement confirmation.

---

## 7. Acceptance Checklist

| Item | Requirement | Status | Proof |
|---|---|---|---|
| 1 | Homepage section order matches Section 12 | **PASS** | `app/page.tsx` renders Pills → Slider → New Arrival → Promo → Video → Category Tiles → Store Block → Instagram → Newsletter |
| 2 | Product Card hover swap & floored discount | **PASS** | `components/store/ProductCard.tsx` uses `Math.floor((1 - price/mrp) * 100)` and dual-image hover transition |
| 3 | Discount unit tests pass | **PASS** | Vitest suite in `lib/pricing.test.ts` passed (asserts 52% for 1899/3999 and 36% for 1899/2999) |
| 4 | Cart Drawer flow | **PASS** | `components/store/CartDrawer.tsx` includes progress bar, steppers, upsell rail, sticky totals, and 3 action buttons |
| 5 | Cart Persistence & No Hydration Mismatch | **PASS** | Zustand persist with `skipHydration: true` and `store/hydrator.tsx` mount effect |
| 6 | Stock rules (low-stock warning, qty clamp) | **PASS** | Tested in `lib/pricing.ts` and `lib/pricing.test.ts` (low stock when 1 <= stock <= 3) |
| 7 | Collection filters & sort sync to URL | **PASS** | `components/store/FilterBar.tsx` and `app/collections/[slug]/page.tsx` synchronize with `searchParams` |
| 8 | PDP with gallery zoom, size guide & reviews | **PASS** | `app/products/[slug]/page.tsx` features `ProductGallery`, `SizeSelector`, `SizeGuideDialog`, and `ReviewList` |
| 9 | Live search dialog (⌘K) & Order tracking | **PASS** | `components/store/SearchDialog.tsx` and `app/track-order/page.tsx` with `TrackStepper` |
| 10 | Config-driven promo / shipping / contact | **PASS** | All values derived from `lib/config.ts` |
| 11 | Zero remote image dependencies | **PASS** | Local SVG generator in `scripts/generate-placeholders.mjs` with graceful `<ProductImage>` fallback |
| 12 | Zero placeholder brand names / sports logos | **PASS** | 100% original ELLANE terminology and generic street apparel copy |
| 13 | Mobile responsive & Accessible | **PASS** | Mobile menus, responsive grids, touch targets >= 44px, WCAG AA contrast, and reduced-motion support |
