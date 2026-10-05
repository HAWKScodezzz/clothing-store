import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    slug: 'ellane-gaara-barrel-sweatpants',
    sku: 'EL-BRL-001',
    title: 'GAARA / BARREL SWEATPANTS',
    category: 'Jeans',
    gender: 'Unisex',
    collections: ['Mens Wear', 'Casual Fashion', 'Everyday Style', 'Festive Sale'],
    price: 1899,
    mrp: 2999,
    colorways: [
      { name: 'Sand Beige', hex: '#d4c5a9' },
      { name: 'Onyx Black', hex: '#18181b' },
    ],
    images: [
      { src: '/photos/barrel-sweatpants-1.jpg', alt: 'ELLANE Gaara Barrel Sweatpants Front View' },
      { src: '/photos/baggy-jeans-1.jpg', alt: 'ELLANE Gaara Barrel Sweatpants Texture View' },
    ],
    sizes: ['28', '30', '32', '34', '36'],
    stock: { '28': 4, '30': 8, '32': 2, '34': 1, '36': 0 },
    tags: ['New', 'Best Seller', 'Festive'],
    description:
      'Heavyweight 420 GSM french terry barrel sweatpants with oversized silhouette, heavy braided white rope drawstrings, and embroidered dragon emblem on thigh.',
    details: {
      fabric: '100% Heavy French Terry Cotton (420 GSM)',
      fit: 'Oversized Barrel Silhouette with Elastic Cuffed Hem',
      care: ['Machine wash cold inside-out', 'Do not bleach', 'Hang dry in shade'],
    },
    rating: 4.9,
    reviewsCount: 47,
    createdAt: '2026-10-01T10:00:00.000Z',
    isPlaceholder: false,
  },
  {
    id: 'prod_2',
    slug: 'ellane-cherry-blossom-sweatpants',
    sku: 'EL-BRL-002',
    title: 'CHERRY BLOSSOM / BARREL SWEATPANTS',
    category: 'Jeans',
    gender: 'Unisex',
    collections: ['Mens Wear', 'Womens Wear', 'Casual Fashion', 'Festive Sale'],
    price: 1949,
    mrp: 3999,
    colorways: [
      { name: 'Samurai Black', hex: '#09090b' },
      { name: 'Washed Grey', hex: '#3f3f46' },
    ],
    images: [
      { src: '/photos/cherry-blossom-pants-1.jpg', alt: 'ELLANE Cherry Blossom Barrel Sweatpants Front' },
      { src: '/photos/barrel-sweatpants-1.jpg', alt: 'ELLANE Cherry Blossom Detail' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: { S: 3, M: 5, L: 2, XL: 0, XXL: 4 },
    tags: ['New', 'Best Seller', 'Limited'],
    description:
      'Black samurai wide-leg hakama style sweatpants with thick woven rope cord belt and delicate embroidered sakura floral branches cascading down the leg.',
    details: {
      fabric: '100% Heavy Combed Cotton Terry',
      fit: 'Hakama Wide Leg Pleated Fit',
      care: ['Hand wash or delicate cycle', 'Do not iron embroidery', 'Line dry in shade'],
    },
    rating: 4.9,
    reviewsCount: 52,
    createdAt: '2026-09-28T14:30:00.000Z',
    isPlaceholder: false,
  },
  {
    id: 'prod_3',
    slug: 'ellane-crossbody-tactical-backpack',
    sku: 'EL-BAG-003',
    title: 'GAARA / CROSSBODY BACKPACK',
    category: 'Accessories',
    gender: 'Unisex',
    collections: ['Casual Fashion', 'Everyday Style', 'Festive Sale'],
    price: 1699,
    mrp: 3599,
    colorways: [
      { name: 'Desert Sand & Black', hex: '#d4c5a9' },
      { name: 'All Black', hex: '#18181b' },
    ],
    images: [
      { src: '/photos/crossbody-bag-1.jpg', alt: 'ELLANE Crossbody Tactical Bag Front' },
      { src: '/photos/berserk-denim-bag-1.jpg', alt: 'ELLANE Crossbody Tactical Bag Angle' },
    ],
    sizes: ['FREE'],
    stock: { FREE: 18 },
    tags: ['New', 'Best Seller'],
    description:
      'Two-tone beige and black cordura tactical sling bag with heavy-duty metal cobra clip closures, modular webbing straps, and multi-compartment storage.',
    details: {
      fabric: '1000D Ballistic Cordura Nylon + Heavy Metal Hardware',
      fit: 'Ergonomic Crossbody Sling Fit with Adjustable Harness',
      care: ['Wipe clean with damp cloth only', 'Do not machine wash'],
    },
    rating: 4.8,
    reviewsCount: 63,
    createdAt: '2026-09-25T09:15:00.000Z',
    isPlaceholder: false,
  },
  {
    id: 'prod_4',
    slug: 'ellane-berserk-denim-backpack',
    sku: 'EL-BAG-004',
    title: 'BERSERK DENIM / CROSSBODY BACKPACK',
    category: 'Accessories',
    gender: 'Unisex',
    collections: ['Casual Fashion', 'Everyday Style'],
    price: 1999,
    mrp: 3141,
    colorways: [
      { name: 'Washed Denim & Crimson', hex: '#27272a' },
    ],
    images: [
      { src: '/photos/berserk-denim-bag-1.jpg', alt: 'ELLANE Berserk Denim Backpack Front' },
      { src: '/photos/crossbody-bag-1.jpg', alt: 'ELLANE Berserk Denim Backpack Detail' },
    ],
    sizes: ['FREE'],
    stock: { FREE: 12 },
    tags: ['New', 'Limited'],
    description:
      'Acid-washed heavy black denim crossbody sling backpack featuring crimson red woven tactical webbing, metal D-rings, and heavy zipper hardware.',
    details: {
      fabric: '14 oz Washed Denim + Tactical Webbing',
      fit: 'One Shoulder Sling Fit with Quick-Release Buckle',
      care: ['Spot clean with cold water', 'Air dry'],
    },
    rating: 4.9,
    reviewsCount: 39,
    createdAt: '2026-09-22T11:20:00.000Z',
    isPlaceholder: false,
  },
  {
    id: 'prod_5',
    slug: 'ellane-racing-panel-jacket',
    sku: 'EL-JKT-005',
    title: 'CYBERPUNK / RACING PANEL JACKET',
    category: 'Jackets',
    gender: 'Men',
    collections: ['Mens Wear', 'Casual Fashion', 'Festive Sale'],
    price: 2499,
    mrp: 3999,
    colorways: [
      { name: 'Black & Crimson', hex: '#121214' },
      { name: 'Dark Slate', hex: '#1e293b' },
    ],
    images: [
      { src: '/photos/racing-jacket-1.jpg', alt: 'ELLANE Racing Panel Jacket Front' },
      { src: '/photos/oversized-hoodie-1.jpg', alt: 'ELLANE Racing Panel Jacket Back' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: { S: 3, M: 5, L: 2, XL: 0, XXL: 4 },
    tags: ['New', 'Best Seller', 'Festive'],
    description:
      'Structured faux-leather racing jacket with contrast chest paneling, heavy-duty metal zip closure, storm flap collar, and ribbed cuffs. Built to make a statement.',
    details: {
      fabric: 'Premium PU Leather shell with satin polyester lining',
      fit: 'Boxy Street Fit with Dropped Shoulders',
      care: ['Wipe clean with a damp cloth only', 'Do not machine wash'],
    },
    rating: 4.9,
    reviewsCount: 41,
    createdAt: '2026-09-20T16:00:00.000Z',
    isPlaceholder: false,
  },
  {
    id: 'prod_6',
    slug: 'ellane-kanji-oversized-hoodie',
    sku: 'EL-HD-006',
    title: 'TOKYO STREET / OVERSIZED HOODIE',
    category: 'Hoodies',
    gender: 'Unisex',
    collections: ['Mens Wear', 'Casual Fashion', 'Festive Sale'],
    price: 1499,
    mrp: 2499,
    colorways: [
      { name: 'Pitch Black', hex: '#09090b' },
      { name: 'Royal Blue', hex: '#1d4ed8' },
    ],
    images: [
      { src: '/photos/oversized-hoodie-1.jpg', alt: 'ELLANE Oversized Hoodie Front' },
      { src: '/photos/racing-jacket-1.jpg', alt: 'ELLANE Oversized Hoodie Back' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: { S: 2, M: 6, L: 4, XL: 3, XXL: 1 },
    tags: ['New', 'Best Seller', 'Festive'],
    description:
      'Heavyweight 380 GSM fleece hoodie with oversized dropped shoulder cut, double-layered hood, kangaroo pocket, and high-density chest typography graphic.',
    details: {
      fabric: '80% Combed Cotton, 20% Polyester Fleece (380 GSM)',
      fit: 'Oversized Boxy Silhouette',
      care: ['Machine wash warm gentle', 'Wash with like colors', 'Tumble dry low'],
    },
    rating: 4.8,
    reviewsCount: 56,
    createdAt: '2026-09-18T12:00:00.000Z',
    isPlaceholder: false,
  },
  {
    id: 'prod_7',
    slug: 'ellane-baggy-drawstring-jeans',
    sku: 'EL-JNS-007',
    title: 'BAGGY DRAWSTRING / DENIM JEANS',
    category: 'Jeans',
    gender: 'Men',
    collections: ['Mens Wear', 'Casual Fashion', 'Everyday Style', 'Festive Sale'],
    price: 1899,
    mrp: 3999,
    colorways: [
      { name: 'Vintage Washed Blue', hex: '#5b82b0' },
      { name: 'Washed Black', hex: '#26262a' },
    ],
    images: [
      { src: '/photos/baggy-jeans-1.jpg', alt: 'ELLANE Baggy Drawstring Jeans Front' },
      { src: '/photos/barrel-sweatpants-1.jpg', alt: 'ELLANE Baggy Drawstring Jeans Back' },
    ],
    sizes: ['28', '30', '32', '34', '36'],
    stock: { '28': 4, '30': 8, '32': 2, '34': 1, '36': 0 },
    tags: ['New', 'Best Seller', 'Festive'],
    description:
      'Wide-leg relaxed silhouette with an elastic drawstring waist. Crafted from heavyweight washed cotton denim with distressed hems and deep side pockets.',
    details: {
      fabric: '100% Cotton 13.5 oz Denim',
      fit: 'Relaxed Baggy Fit · Mid-Rise with Drawstring Elastic Waist',
      care: ['Machine wash cold inside-out', 'Do not bleach', 'Hang dry in shade'],
    },
    rating: 4.8,
    reviewsCount: 38,
    createdAt: '2026-09-15T15:30:00.000Z',
    isPlaceholder: false,
  },
  {
    id: 'prod_8',
    slug: 'ellane-floral-embroidered-shirt',
    sku: 'EL-SHT-008',
    title: 'FLORAL EMBROIDERED / RESORT SHIRT',
    category: 'Shirts',
    gender: 'Men',
    collections: ['Mens Wear', 'Casual Fashion', 'Festive Sale'],
    price: 1299,
    mrp: 1999,
    colorways: [
      { name: 'Black & White', hex: '#18181b' },
    ],
    images: [
      { src: '/photos/resort-shirt-1.jpg', alt: 'ELLANE Floral Embroidered Shirt Front' },
      { src: '/photos/oversized-hoodie-1.jpg', alt: 'ELLANE Floral Embroidered Shirt Back' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: { S: 1, M: 7, L: 3, XL: 0, XXL: 2 },
    tags: ['New', 'Festive'],
    description:
      'Camp-collar short-sleeve resort shirt with intricate botanical floral embroidery along the front placket. Lightweight, breathable, and vacation-ready.',
    details: {
      fabric: '100% Textured Cotton Rayon Blend',
      fit: 'Relaxed Vacation Fit · Cuban Collar',
      care: ['Hand wash or gentle cycle', 'Dry flat', 'Medium iron'],
    },
    rating: 4.7,
    reviewsCount: 29,
    createdAt: '2026-09-12T10:00:00.000Z',
    isPlaceholder: false,
  },
  {
    id: 'prod_9',
    slug: 'ellane-tactical-backpack-green',
    sku: 'EL-BAG-009',
    title: 'ZORO / TACTICAL BACKPACK',
    category: 'Accessories',
    gender: 'Unisex',
    collections: ['Casual Fashion', 'Everyday Style'],
    price: 2299,
    mrp: 3999,
    colorways: [
      { name: 'Tactical Black & Neon Green', hex: '#171717' },
    ],
    images: [
      { src: '/photos/black-backpack-1.jpg', alt: 'ELLANE Zoro Tactical Backpack Front' },
      { src: '/photos/crossbody-bag-1.jpg', alt: 'ELLANE Zoro Tactical Backpack Angle' },
    ],
    sizes: ['FREE'],
    stock: { FREE: 15 },
    tags: ['New', 'Best Seller', 'Limited'],
    description:
      'Heavy tactical backpack with neon green molle webbing straps, woven patches, metal carabiners, multi-pocket utility layout, and water-repellent ballistic nylon.',
    details: {
      fabric: '1000D Ballistic Cordura Nylon',
      fit: 'Universal Ergonomic Padded Backpack',
      care: ['Wipe clean with damp cloth only'],
    },
    rating: 5.0,
    reviewsCount: 71,
    createdAt: '2026-09-10T14:00:00.000Z',
    isPlaceholder: false,
  },
];

export const UPSELL_PRODUCTS = PRODUCTS.filter((p) => p.category === 'Accessories');

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.category === product.category || p.gender === product.gender || p.collections.some((c) => product.collections.includes(c)))
  ).slice(0, limit);
}
