'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { PRODUCTS, getProductById } from '@/data/products';
import { calculateCartTotals } from '@/lib/pricing';
import { formatPrice } from '@/lib/format';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FreeShipBar } from './FreeShipBar';
import { CartLineItem } from './CartLine';
import { UpsellRail } from './UpsellRail';
import { ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { PREPAID } from '@/lib/config';

export function CartDrawer() {
  const router = useRouter();
  const { lines, isOpen, closeCart, setQty, removeItem } = useCartStore();

  const totals = calculateCartTotals(lines, PRODUCTS);

  const handleCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  const handleViewCart = () => {
    closeCart();
    router.push('/cart');
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col bg-white border-l border-zinc-200 text-black select-none"
      >
        {/* Drawer Header */}
        <SheetHeader className="p-5 border-b border-zinc-200 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-700" />
            <SheetTitle className="font-display font-bold text-sm sm:text-base uppercase tracking-wider text-black">
              YOUR BAG ({totals.itemsCount})
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Free Shipping Calculation Bar */}
        {lines.length > 0 && (
          <div className="p-4 border-b border-zinc-200 bg-zinc-50">
            <FreeShipBar subtotal={totals.subtotal} />
          </div>
        )}

        {/* Drawer Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-2 space-y-4">
          {lines.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto text-zinc-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base uppercase tracking-wider text-black">
                  YOUR BAG IS EMPTY
                </h3>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto font-mono">
                  Looks like you haven&apos;t added any items yet. Elevate your wardrobe today.
                </p>
              </div>
              <Button
                variant="primary"
                onClick={closeCart}
                className="font-mono text-xs uppercase bg-black text-white hover:bg-zinc-800"
              >
                START SHOPPING
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Line Items */}
              <div className="divide-y divide-zinc-200">
                {lines.map((line) => {
                  const product = getProductById(line.productId);
                  if (!product) return null;

                  return (
                    <CartLineItem
                      key={`${line.productId}-${line.size}-${line.color || ''}`}
                      line={line}
                      product={product}
                      onUpdateQty={(newQty) => setQty(line.productId, line.size, newQty, line.color)}
                      onRemove={() => removeItem(line.productId, line.size, line.color)}
                      onCloseDrawer={closeCart}
                    />
                  );
                })}
              </div>

              {/* Upsell Rail */}
              <UpsellRail />

              {/* Optional Prepaid Discount Promo (only if enabled) */}
              {PREPAID.enabled && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-sm text-xs text-emerald-800 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>
                    Pay online for extra {PREPAID.percent}% instant discount (up to {formatPrice(PREPAID.cap)})!
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Sticky Drawer Footer with Totals & 3 Actions */}
        {lines.length > 0 && (
          <div className="p-5 border-t border-zinc-200 bg-zinc-50 space-y-3 pb-safe">
            {/* Breakdown */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-zinc-600">
                <span>SUBTOTAL</span>
                <span className="text-black font-bold">{formatPrice(totals.subtotal)}</span>
              </div>

              {totals.savings > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>TOTAL SAVINGS</span>
                  <span className="font-bold">-{formatPrice(totals.savings)}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-600">
                <span>ESTIMATED DELIVERY</span>
                <span>
                  {totals.shippingFee === 0 ? (
                    <strong className="text-emerald-700 font-bold uppercase">FREE</strong>
                  ) : (
                    formatPrice(totals.shippingFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-zinc-200">
                <span>TOTAL</span>
                <span className="font-mono text-base text-black font-extrabold">{formatPrice(totals.grandTotal)}</span>
              </div>
            </div>

            {/* Action Buttons (VIEW CART / CHECK OUT / CONTINUE SHOPPING) */}
            <div className="space-y-2 pt-1">
              <Button
                variant="primary"
                onClick={handleCheckout}
                className="w-full h-12 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg bg-black text-white hover:bg-zinc-800"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  onClick={handleViewCart}
                  className="h-10 text-[11px] font-mono uppercase tracking-wider bg-zinc-200 text-black hover:bg-zinc-300 border-none"
                >
                  VIEW CART
                </Button>

                <Button
                  variant="outline"
                  onClick={closeCart}
                  className="h-10 text-[11px] font-mono uppercase tracking-wider border-zinc-300 text-black hover:bg-zinc-200"
                >
                  CONTINUE SHOPPING
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
