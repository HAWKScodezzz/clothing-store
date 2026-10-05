'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlistStore } from '@/store/wishlist';
import { PRODUCTS, getProductById } from '@/data/products';
import { ProductCard } from '@/components/store/ProductCard';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft, Trash2 } from 'lucide-react';

export default function WishlistPage() {
  const { itemIds, clearWishlist, hasHydrated } = useWishlistStore();

  if (!hasHydrated) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center font-mono text-xs text-muted uppercase animate-pulse">
        Loading wishlist...
      </div>
    );
  }

  const wishlistProducts = itemIds
    .map((id) => getProductById(id))
    .filter((p): p is typeof PRODUCTS[number] => Boolean(p));

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-12 select-none bg-white text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-zinc-200 gap-4">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-700 block">
            SAVED ITEMS // お気に入り
          </span>
          <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-wider text-black">
            MY WISHLIST ({wishlistProducts.length})
          </h1>
        </div>

        {wishlistProducts.length > 0 && (
          <button
            onClick={clearWishlist}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-zinc-500 hover:text-red-600 uppercase font-bold transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>CLEAR ALL</span>
          </button>
        )}
      </div>

      {/* Wishlist Grid or Empty State */}
      {wishlistProducts.length === 0 ? (
        <div className="py-20 text-center space-y-6 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto text-zinc-500">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display font-bold text-xl uppercase tracking-wider text-black">
              YOUR WISHLIST IS EMPTY
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 font-mono">
              Tap the heart icon on any product card to save your favorite fits for later.
            </p>
          </div>
          <Button asChild variant="primary" className="font-mono text-xs uppercase px-8 bg-black text-white hover:bg-zinc-800">
            <Link href="/collections/all-products" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>EXPLORE DROPS</span>
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 mt-8">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
