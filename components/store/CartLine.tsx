'use client';

import React from 'react';
import Link from 'next/link';
import { CartLine as CartLineType, Product } from '@/types';
import { formatPrice } from '@/lib/format';
import { getAvailableStock } from '@/lib/pricing';
import { ProductImage } from './ProductImage';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartLineProps {
  line: CartLineType;
  product: Product;
  onUpdateQty: (qty: number) => void;
  onRemove: () => void;
  onCloseDrawer?: () => void;
}

export function CartLineItem({
  line,
  product,
  onUpdateQty,
  onRemove,
  onCloseDrawer,
}: CartLineProps) {
  const availableStock = getAvailableStock(product, line.size);
  const isAtMaxStock = line.qty >= availableStock;

  return (
    <div className="flex gap-3.5 py-4 border-b border-border/80 text-text group">
      {/* Product Image Thumbnail */}
      <div className="relative w-20 h-24 rounded-sm overflow-hidden bg-surface-2 shrink-0 border border-border">
        <Link
          href={`/products/${product.slug}`}
          onClick={onCloseDrawer}
          className="block w-full h-full"
        >
          <ProductImage
            src={product.images[0]?.src || `/products/${product.slug}/1.svg`}
            alt={product.title}
            fill
            className="object-cover"
          />
        </Link>
      </div>

      {/* Item Details */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/products/${product.slug}`}
              onClick={onCloseDrawer}
              className="block hover:text-accent transition-colors"
            >
              <h4 className="font-display font-bold text-xs uppercase tracking-wide text-white truncate max-w-[190px] sm:max-w-[220px]">
                {product.title}
              </h4>
            </Link>
            <button
              onClick={onRemove}
              className="text-muted hover:text-rose-400 p-1 transition-colors"
              aria-label={`Remove ${product.title} from cart`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-muted uppercase">
            <span>SIZE: <strong className="text-white font-semibold">{line.size}</strong></span>
            {line.color && (
              <>
                <span>·</span>
                <span>COLOR: <strong className="text-white font-semibold">{line.color}</strong></span>
              </>
            )}
          </div>
        </div>

        {/* Quantity Stepper & Price */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center border border-border rounded-sm bg-surface-2">
            <button
              onClick={() => onUpdateQty(line.qty - 1)}
              className="w-7 h-7 flex items-center justify-center text-muted hover:text-white hover:bg-surface transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-7 text-center font-mono text-xs font-bold text-white">
              {line.qty}
            </span>
            <button
              onClick={() => onUpdateQty(line.qty + 1)}
              disabled={isAtMaxStock}
              className={cn(
                'w-7 h-7 flex items-center justify-center transition-colors',
                isAtMaxStock
                  ? 'text-zinc-600 cursor-not-allowed'
                  : 'text-muted hover:text-white hover:bg-surface'
              )}
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <div className="text-right">
            <span className="font-mono text-xs sm:text-sm font-bold text-white">
              {formatPrice(product.price * line.qty)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
