'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { PRODUCTS, getProductById } from '@/data/products';
import { calculateCartTotals } from '@/lib/pricing';
import { formatPrice } from '@/lib/format';
import { CartLineItem } from '@/components/store/CartLine';
import { FreeShipBar } from '@/components/store/FreeShipBar';
import { UpsellRail } from '@/components/store/UpsellRail';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { lines, setQty, removeItem, hasHydrated } = useCartStore();
  const [orderNote, setOrderNote] = useState('');

  if (!hasHydrated) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="font-mono text-xs text-muted uppercase animate-pulse">
          Loading bag...
        </div>
      </div>
    );
  }

  const totals = calculateCartTotals(lines, PRODUCTS);

  if (lines.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-20 text-center select-none space-y-6 bg-white text-black">
        <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto text-zinc-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-wider text-black">
            YOUR SHOPPING BAG IS EMPTY
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 max-w-sm mx-auto font-mono">
            You don&apos;t have any items in your shopping bag. Explore our freshest drops and elevate your outfits.
          </p>
        </div>
        <Button asChild variant="primary" className="font-mono text-xs uppercase px-8 bg-black text-white hover:bg-zinc-800">
          <Link href="/collections/all-products">DISCOVER PRODUCTS</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-12 select-none bg-white text-black">
      <div className="space-y-2 pb-6 border-b border-zinc-200">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-700">
          SHOPPING BAG // ショッピングバッグ
        </span>
        <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-wider text-black">
          YOUR CART ({totals.itemsCount} {totals.itemsCount === 1 ? 'ITEM' : 'ITEMS'})
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 items-start">
        {/* Left Column: Line Items & Notes */}
        <div className="lg:col-span-8 space-y-6">
          <FreeShipBar subtotal={totals.subtotal} />

          <div className="p-6 rounded-md bg-white border border-zinc-200 divide-y divide-zinc-200">
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
                />
              );
            })}
          </div>

          {/* Special Instructions Note Box */}
          <div className="p-5 rounded-md bg-zinc-50 border border-zinc-200 space-y-2">
            <label className="font-mono text-xs uppercase font-bold text-black block">
              SPECIAL INSTRUCTIONS FOR SELLER (OPTIONAL)
            </label>
            <textarea
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="E.g. Please leave package at the security desk or call before arrival."
              rows={3}
              className="w-full p-3 rounded-sm bg-white border border-zinc-300 text-xs text-black placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-black font-mono"
            />
          </div>

          <UpsellRail />
        </div>

        {/* Right Column: Order Summary Box */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="p-6 rounded-md bg-zinc-50 border border-zinc-200 space-y-4 shadow-xl">
            <h2 className="font-display font-bold text-base uppercase tracking-wider text-black border-b border-zinc-200 pb-3">
              ORDER SUMMARY
            </h2>

            <div className="space-y-2 text-xs font-mono">
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
                <span>ESTIMATED SHIPPING</span>
                <span>
                  {totals.shippingFee === 0 ? (
                    <strong className="text-emerald-700 font-bold uppercase">FREE</strong>
                  ) : (
                    formatPrice(totals.shippingFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-black pt-3 border-t border-zinc-200">
                <span>ESTIMATED TOTAL</span>
                <span className="font-mono text-lg text-black font-extrabold">
                  {formatPrice(totals.grandTotal)}
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={() => router.push('/checkout')}
              className="w-full h-12 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl bg-black text-white hover:bg-zinc-800"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full h-10 text-xs font-mono uppercase tracking-wider border-zinc-300 text-black hover:bg-zinc-200"
            >
              <Link href="/collections/all-products" className="flex items-center justify-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>CONTINUE SHOPPING</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
