import { CartLine, Product, Size } from '@/types';
import { EMI, PREPAID, SHIPPING } from './config';

/**
 * Calculates the discount percentage using Math.floor to match Zenin's exact discount formula.
 * Formula: Math.floor((1 - price / mrp) * 100), clamped 0..99
 */
export function getDiscountPercent(price: number, mrp: number): number {
  if (mrp <= 0 || price <= 0 || price >= mrp) {
    return 0;
  }
  const discount = Math.floor((1 - price / mrp) * 100);
  return Math.max(0, Math.min(99, discount));
}

export interface CartCalculationResult {
  itemsCount: number;
  subtotal: number;
  mrpTotal: number;
  savings: number;
  shippingFee: number;
  shippingGap: number;
  isFreeShipping: boolean;
  prepaidDiscount: number;
  grandTotal: number;
}

export function calculateCartTotals(
  lines: CartLine[],
  products: Product[]
): CartCalculationResult {
  let itemsCount = 0;
  let subtotal = 0;
  let mrpTotal = 0;

  for (const line of lines) {
    const product = products.find((p) => p.id === line.productId);
    if (!product) continue;

    const qty = Math.max(0, line.qty);
    itemsCount += qty;
    subtotal += product.price * qty;
    mrpTotal += (product.mrp || product.price) * qty;
  }

  const savings = Math.max(0, mrpTotal - subtotal);
  const isFreeShipping = subtotal >= SHIPPING.freeThreshold || subtotal === 0;
  const shippingFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : SHIPPING.flatFee;
  const shippingGap = Math.max(0, SHIPPING.freeThreshold - subtotal);

  let prepaidDiscount = 0;
  if (PREPAID.enabled && subtotal > 0) {
    const rawDiscount = Math.round(subtotal * (PREPAID.percent / 100));
    prepaidDiscount = Math.min(PREPAID.cap, rawDiscount);
  }

  const grandTotal = Math.max(0, subtotal + shippingFee - prepaidDiscount);

  return {
    itemsCount,
    subtotal,
    mrpTotal,
    savings,
    shippingFee,
    shippingGap,
    isFreeShipping,
    prepaidDiscount,
    grandTotal,
  };
}

export function getAvailableStock(product: Product, size: Size): number {
  const stockValue = product.stock[size];
  if (typeof stockValue === 'number') {
    return stockValue;
  }
  // If not explicitly declared, default to 5 for non-free sizes, or 10 for FREE
  return size === 'FREE' ? 10 : 5;
}

export function isSizeInStock(product: Product, size: Size): boolean {
  return getAvailableStock(product, size) > 0;
}

export function isLowStock(product: Product, size: Size): boolean {
  const stock = getAvailableStock(product, size);
  return stock >= 1 && stock <= 3;
}

export function clampQuantity(requestedQty: number, availableStock: number): number {
  if (availableStock <= 0) return 0;
  return Math.max(1, Math.min(requestedQty, availableStock));
}

export function calculateMonthlyEmi(price: number, months: number = EMI.months): number | null {
  if (!EMI.enabled || price < EMI.minPrice || months <= 0) {
    return null;
  }
  return Math.ceil(price / months);
}
