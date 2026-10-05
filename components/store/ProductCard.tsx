'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, Size } from '@/types';
import { formatPrice } from '@/lib/format';
import { getDiscountPercent, isSizeInStock } from '@/lib/pricing';
import { useWishlistStore } from '@/store/wishlist';
import { useCartStore } from '@/store/cart';
import { useUIStore } from '@/store/ui';
import { Heart, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  const { isInWishlist, toggleWishlist, hasHydrated: wishlistHydrated } = useWishlistStore();
  const { addItem } = useCartStore();
  const { setQuickAddProduct } = useUIStore();

  const isFavorited = wishlistHydrated ? isInWishlist(product.id) : false;
  const discountPercent = getDiscountPercent(product.price, product.mrp);

  const primaryImage = product.images[0]?.src || '/photos/barrel-sweatpants-1.jpg';
  const secondaryImage = product.images[1]?.src || primaryImage;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const added = toggleWishlist(product.id);
    if (added) {
      toast.success('Added to wishlist', { description: product.title });
    } else {
      toast.info('Removed from wishlist', { description: product.title });
    }
  };

  const handleQuickAddSize = (e: React.MouseEvent, size: Size) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSizeInStock(product, size)) return;

    const selectedColor = product.colorways[activeColorIndex]?.name;
    const added = addItem(product.id, size, selectedColor, 1);
    if (added) {
      toast.success('Item added to your cart', {
        description: `${product.title} (${size})`,
      });
    }
  };

  const handleMobileQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickAddProduct(product);
  };

  const isOutOfStock = product.sizes.every((s) => !isSizeInStock(product, s));

  return (
    <div className="group relative flex flex-col bg-transparent select-none transition-transform active:scale-[0.98]">
      {/* 4:5 Media Container with Zenin aesthetics */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg sm:rounded-xl bg-zinc-100 border border-zinc-200 group-hover:border-zinc-400 transition-all duration-300">
        <Link href={`/products/${product.slug}`} className="block w-full h-full relative">
          {/* Primary Photo */}
          <Image
            src={primaryImage}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
            className={cn(
              'object-cover transition-all duration-500 group-hover:scale-105',
              product.images.length > 1 && 'group-hover:opacity-0'
            )}
          />

          {/* Secondary Photo for smooth crossfade hover */}
          {product.images.length > 1 && (
            <Image
              src={secondaryImage}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105 hidden sm:block"
            />
          )}

          {/* Subtle Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </Link>

        {/* SAVE xx% Pill Badge (Bottom-Left) */}
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 z-10 pointer-events-none">
          {discountPercent > 0 && !isOutOfStock && (
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#8b0000] text-white font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-md">
              SAVE {discountPercent}%
            </span>
          )}
          {isOutOfStock && (
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-zinc-800 text-zinc-300 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border border-zinc-700">
              SOLD OUT
            </span>
          )}
        </div>

        {/* Wishlist Heart Toggle (Top-Right) */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className={cn(
            'absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none shadow-md active:scale-90',
            isFavorited
              ? 'bg-red-600 text-white scale-105'
              : 'bg-black/60 text-white hover:bg-black backdrop-blur-sm'
          )}
        >
          <Heart className={cn('w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform', isFavorited && 'fill-current')} />
        </button>

        {/* Desktop Quick Add Size Overlay on Hover */}
        {!isOutOfStock && (
          <div className="absolute inset-x-0 bottom-0 z-20 hidden md:flex flex-col gap-1.5 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-3 pt-6 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-300 text-center font-bold">
              QUICK ADD SIZE
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {product.sizes.map((size) => {
                const inStock = isSizeInStock(product, size);
                return (
                  <button
                    key={size}
                    onClick={(e) => handleQuickAddSize(e, size)}
                    disabled={!inStock}
                    className={cn(
                      'min-w-[32px] h-7 px-1.5 rounded-sm font-mono text-[11px] font-bold uppercase transition-all duration-150 flex items-center justify-center',
                      inStock
                        ? 'bg-white border border-zinc-300 text-black hover:bg-red-600 hover:border-red-600 hover:text-white'
                        : 'bg-zinc-800 text-zinc-500 border border-zinc-700 line-through cursor-not-allowed opacity-50'
                    )}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile Quick Add Plus Button */}
        {!isOutOfStock && (
          <button
            onClick={handleMobileQuickAdd}
            className="md:hidden absolute bottom-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shadow-lg active:scale-90 font-bold border border-zinc-300"
            aria-label={`Quick add ${product.title}`}
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Product Info Block */}
      <div className="pt-2 pb-1 flex flex-col gap-0.5 sm:gap-1">
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="font-mono text-[11px] sm:text-xs font-medium uppercase tracking-wider text-black truncate hover:text-zinc-600 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Price Row */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono">
          {product.mrp > product.price && (
            <span className="text-zinc-500 line-through text-[10px] sm:text-[11px]">
              {formatPrice(product.mrp)}
            </span>
          )}
          <span className="font-bold text-black">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
