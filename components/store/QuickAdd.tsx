'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/store/ui';
import { useCartStore } from '@/store/cart';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ProductImage } from './ProductImage';
import { formatPrice } from '@/lib/format';
import { getDiscountPercent, isSizeInStock, isLowStock, getAvailableStock } from '@/lib/pricing';
import { Size } from '@/types';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export function QuickAddModal() {
  const { quickAddProduct, setQuickAddProduct } = useUIStore();
  const { addItem } = useCartStore();

  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (!quickAddProduct) return null;

  const product = quickAddProduct;
  const discountPercent = getDiscountPercent(product.price, product.mrp);

  const handleClose = () => {
    setQuickAddProduct(null);
    setSelectedSize(null);
    setSelectedColor(null);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    const color = selectedColor || product.colorways[0]?.name;
    const added = addItem(product.id, selectedSize, color, 1);
    if (added) {
      toast.success('Item added to your cart', {
        description: `${product.title} (${selectedSize})`,
      });
      handleClose();
    }
  };

  return (
    <Sheet open={Boolean(quickAddProduct)} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent side="bottom" className="p-6 bg-white border-t border-zinc-200 max-w-lg mx-auto text-black rounded-t-xl">
        <SheetHeader className="pb-4 border-b border-zinc-200 text-left">
          <SheetTitle className="font-display font-bold text-sm sm:text-base uppercase tracking-wider text-black">
            QUICK ADD TO BAG
          </SheetTitle>
        </SheetHeader>

        <div className="py-4 space-y-4">
          {/* Product Summary Row */}
          <div className="flex gap-4 items-center">
            <div className="relative w-16 h-20 rounded-md overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
              <ProductImage
                src={product.images[0]?.src || `/products/${product.slug}/1.svg`}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <h4 className="font-display text-xs font-bold uppercase text-black line-clamp-2">
                {product.title}
              </h4>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-black">
                  {formatPrice(product.price)}
                </span>
                {product.mrp > product.price && (
                  <span className="font-mono text-xs text-zinc-400 line-through">
                    {formatPrice(product.mrp)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="font-mono text-[10px] text-red-700 font-bold">
                    SAVE {discountPercent}%
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Color Selector if available */}
          {product.colorways.length > 1 && (
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-600 font-semibold">
                COLOR:{' '}
                <span className="text-black font-bold">
                  {selectedColor || product.colorways[0]?.name}
                </span>
              </span>
              <div className="flex gap-2">
                {product.colorways.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    className={cn(
                      'px-3 py-1.5 rounded-sm font-mono text-xs uppercase flex items-center gap-2 border transition-all',
                      (selectedColor || product.colorways[0]?.name) === col.name
                        ? 'border-black bg-black text-white'
                        : 'border-zinc-300 text-zinc-700 hover:border-black'
                    )}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.hex }} />
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-xs uppercase">
              <span className="text-zinc-600 font-semibold">SELECT SIZE</span>
              {selectedSize && isLowStock(product, selectedSize) && (
                <span className="text-amber-600 font-bold text-[11px] animate-pulse">
                  Only {getAvailableStock(product, selectedSize)} left!
                </span>
              )}
            </div>

            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => {
                const inStock = isSizeInStock(product, size);
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    disabled={!inStock}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'h-11 rounded-sm font-mono text-xs font-bold uppercase transition-all duration-150 flex flex-col items-center justify-center border',
                      !inStock
                        ? 'bg-zinc-100 text-zinc-400 border-zinc-200 line-through cursor-not-allowed opacity-40'
                        : isSelected
                        ? 'bg-black text-white border-2 border-black shadow-md'
                        : 'bg-zinc-50 border-zinc-300 text-black hover:border-black'
                    )}
                  >
                    <span>{size}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full h-12 text-xs font-bold uppercase mt-2 bg-black text-white hover:bg-zinc-800 tracking-widest"
          >
            {selectedSize ? `ADD SIZE ${selectedSize} TO BAG` : 'SELECT A SIZE'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
