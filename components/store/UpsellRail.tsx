'use client';

import React from 'react';
import { UPSELL_PRODUCTS } from '@/data/products';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/format';
import { ProductImage } from './ProductImage';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export function UpsellRail() {
  const { addItem, lines } = useCartStore();

  const handleQuickAdd = (product: typeof UPSELL_PRODUCTS[number]) => {
    const size = product.sizes[0] || 'FREE';
    const color = product.colorways[0]?.name;
    const added = addItem(product.id, size, color, 1);
    if (added) {
      toast.success(`Added ${product.title} to bag`);
    }
  };

  const availableUpsells = UPSELL_PRODUCTS.filter(
    (u) => !lines.some((l) => l.productId === u.id)
  );

  if (availableUpsells.length === 0) return null;

  return (
    <div className="space-y-3 pt-4 border-t border-zinc-200 select-none">
      <div className="flex items-center justify-between">
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black">
          PAIR IT WITH // おすすめ
        </h4>
        <span className="text-[10px] font-mono text-zinc-500 uppercase">ONE-TAP ADD</span>
      </div>

      <div className="space-y-2">
        {availableUpsells.slice(0, 2).map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2.5 rounded-md bg-zinc-50 border border-zinc-200 gap-3"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-11 h-13 rounded-md overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                <ProductImage
                  src={item.images[0]?.src || `/products/${item.slug}/1.svg`}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <h5 className="font-mono text-[11px] font-bold text-black uppercase truncate">
                  {item.title}
                </h5>
                <span className="font-mono text-xs font-bold text-zinc-700">
                  {formatPrice(item.price)}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleQuickAdd(item)}
              className="px-3 py-1.5 rounded-md bg-white border border-zinc-300 text-black text-[10px] font-mono font-bold uppercase hover:bg-black hover:border-black hover:text-white transition-colors flex items-center gap-1 shrink-0"
              aria-label={`Add ${item.title} to bag`}
            >
              <Plus className="w-3 h-3" />
              <span>ADD</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
