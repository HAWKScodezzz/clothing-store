import { describe, it, expect } from 'vitest';
import {
  getDiscountPercent,
  calculateCartTotals,
  getAvailableStock,
  isLowStock,
  clampQuantity,
  calculateMonthlyEmi,
} from './pricing';
import { Product } from '@/types';
import { SHIPPING } from './config';

describe('Pricing & Discount Logic', () => {
  it('correctly calculates floored discount percent for specific test cases', () => {
    // 1899 / 3999 = 0.4748687 -> 52.51% -> floored to 52%
    expect(getDiscountPercent(1899, 3999)).toBe(52);

    // 1899 / 2999 = 0.633211 -> 36.67% -> floored to 36%
    expect(getDiscountPercent(1899, 2999)).toBe(36);

    // 1299 / 2199 = 0.590723 -> 40.92% -> floored to 40%
    expect(getDiscountPercent(1299, 2199)).toBe(40);

    // 2499 / 3999 = 0.624906 -> 37.50% -> floored to 37%
    expect(getDiscountPercent(2499, 3999)).toBe(37);

    // 1499 / 2499 = 0.599839 -> 40.01% -> floored to 40%
    expect(getDiscountPercent(1499, 2499)).toBe(40);
  });

  it('handles discount edge cases gracefully', () => {
    expect(getDiscountPercent(0, 1000)).toBe(0);
    expect(getDiscountPercent(1000, 1000)).toBe(0);
    expect(getDiscountPercent(1200, 1000)).toBe(0);
    expect(getDiscountPercent(100, 0)).toBe(0);
  });

  it('calculates cart totals, shipping threshold and savings accurately', () => {
    const mockProducts: Product[] = [
      {
        id: 'p1',
        slug: 'item-1',
        sku: 'SKU1',
        title: 'ELLANE / ITEM 1',
        category: 'Jeans',
        gender: 'Men',
        collections: ['Mens Wear'],
        price: 1299,
        mrp: 2199,
        colorways: [{ name: 'Blue', hex: '#000' }],
        images: [{ src: '/img1.svg', alt: '1' }],
        sizes: ['30', '32'],
        stock: { '30': 5, '32': 2 },
        tags: ['New'],
        description: 'Mock',
        details: { fabric: 'Cotton', fit: 'Regular', care: ['Wash'] },
        rating: 4.8,
        reviewsCount: 10,
        createdAt: '2026-01-01',
      },
      {
        id: 'p2',
        slug: 'item-2',
        sku: 'SKU2',
        title: 'ELLANE / ITEM 2',
        category: 'Socks',
        gender: 'Unisex',
        collections: ['Everyday Style'],
        price: 299,
        mrp: 499,
        colorways: [{ name: 'Black', hex: '#000' }],
        images: [{ src: '/img2.svg', alt: '2' }],
        sizes: ['FREE'],
        stock: { FREE: 10 },
        tags: ['Best Seller'],
        description: 'Mock',
        details: { fabric: 'Cotton', fit: 'Free', care: ['Wash'] },
        rating: 4.9,
        reviewsCount: 5,
        createdAt: '2026-01-01',
      },
    ];

    // Case 1: Under shipping threshold (1299 < 1999)
    const cartUnder = [{ productId: 'p1', size: '30' as const, qty: 1 }];
    const resUnder = calculateCartTotals(cartUnder, mockProducts);

    expect(resUnder.subtotal).toBe(1299);
    expect(resUnder.mrpTotal).toBe(2199);
    expect(resUnder.savings).toBe(900);
    expect(resUnder.shippingFee).toBe(SHIPPING.flatFee);
    expect(resUnder.shippingGap).toBe(1999 - 1299);
    expect(resUnder.isFreeShipping).toBe(false);
    expect(resUnder.grandTotal).toBe(1299 + SHIPPING.flatFee);

    // Case 2: Over shipping threshold (1299 + 1299 = 2598 >= 1999)
    const cartOver = [{ productId: 'p1', size: '30' as const, qty: 2 }];
    const resOver = calculateCartTotals(cartOver, mockProducts);

    expect(resOver.subtotal).toBe(2598);
    expect(resOver.mrpTotal).toBe(4398);
    expect(resOver.savings).toBe(1800);
    expect(resOver.shippingFee).toBe(0);
    expect(resOver.shippingGap).toBe(0);
    expect(resOver.isFreeShipping).toBe(true);
    expect(resOver.grandTotal).toBe(2598);
  });

  it('validates stock rules, low stock warning and quantity clamps', () => {
    const mockProduct: Product = {
      id: 'p1',
      slug: 'item-1',
      sku: 'SKU1',
      title: 'ELLANE / ITEM 1',
      category: 'Jeans',
      gender: 'Men',
      collections: ['Mens Wear'],
      price: 1299,
      mrp: 2199,
      colorways: [],
      images: [],
      sizes: ['28', '30', '32', '34', '36'],
      stock: { '28': 4, '30': 8, '32': 2, '34': 1, '36': 0 },
      tags: [],
      description: '',
      details: { fabric: '', fit: '', care: [] },
      rating: 5,
      reviewsCount: 0,
      createdAt: '2026-01-01',
    };

    expect(getAvailableStock(mockProduct, '36')).toBe(0);
    expect(getAvailableStock(mockProduct, '34')).toBe(1);
    expect(getAvailableStock(mockProduct, '32')).toBe(2);

    expect(isLowStock(mockProduct, '34')).toBe(true); // 1 left
    expect(isLowStock(mockProduct, '32')).toBe(true); // 2 left
    expect(isLowStock(mockProduct, '28')).toBe(false); // 4 left (> 3)
    expect(isLowStock(mockProduct, '36')).toBe(false); // 0 left (sold out)

    expect(clampQuantity(5, 2)).toBe(2);
    expect(clampQuantity(1, 0)).toBe(0);
    expect(clampQuantity(2, 10)).toBe(2);
  });

  it('computes monthly EMI correctly', () => {
    expect(calculateMonthlyEmi(2499, 3)).toBe(833);
    expect(calculateMonthlyEmi(999, 3)).toBe(null); // below minPrice 1500
  });
});
