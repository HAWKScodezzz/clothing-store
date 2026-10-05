'use client';

import React from 'react';
import { Product, Size } from '@/types';
import { isSizeInStock, isLowStock, getAvailableStock } from '@/lib/pricing';
import { useUIStore } from '@/store/ui';
import { Ruler } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SizeSelectorProps {
  product: Product;
  selectedSize: Size | null;
  onSelectSize: (size: Size) => void;
}

export function SizeSelector({
  product,
  selectedSize,
  onSelectSize,
}: SizeSelectorProps) {
  const { openSizeGuide } = useUIStore();

  return (
    <div className="space-y-3 select-none">
      <div className="flex items-center justify-between font-mono text-xs uppercase">
        <div className="flex items-center gap-2">
          <span className="text-zinc-600 font-bold tracking-wider">SIZE:</span>
          <span className="text-black font-extrabold">{selectedSize || 'SELECT'}</span>
        </div>

        <button
          type="button"
          onClick={() => openSizeGuide(product.category)}
          className="flex items-center gap-1 text-red-700 hover:underline font-bold tracking-wider text-[11px]"
        >
          <Ruler className="w-3.5 h-3.5" />
          <span>SIZE GUIDE</span>
        </button>
      </div>

      {/* Size Buttons Grid */}
      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
        {product.sizes.map((size) => {
          const inStock = isSizeInStock(product, size);
          const isSelected = selectedSize === size;
          const lowStock = isLowStock(product, size);

          return (
            <button
              key={size}
              type="button"
              disabled={!inStock}
              onClick={() => onSelectSize(size)}
              className={cn(
                'relative h-12 rounded-sm font-mono text-xs font-bold uppercase transition-all duration-150 flex flex-col items-center justify-center border',
                !inStock
                  ? 'bg-zinc-100 text-zinc-400 border-zinc-200 line-through cursor-not-allowed opacity-40'
                  : isSelected
                  ? 'bg-black text-white border-2 border-black shadow-md scale-[1.02]'
                  : 'bg-zinc-50 border-zinc-300 text-black hover:border-black hover:bg-zinc-100'
              )}
            >
              <span>{size}</span>
            </button>
          );
        })}
      </div>

      {/* Low stock warning banner */}
      {selectedSize && isLowStock(product, selectedSize) && (
        <p className="font-mono text-xs text-amber-400 font-bold animate-pulse pt-1">
          ⚡ Hurry, only {getAvailableStock(product, selectedSize)} left in size {selectedSize}!
        </p>
      )}
    </div>
  );
}
