import React from 'react';
import { Product } from '@/types';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

interface ProductGridProps {
  products: Product[];
  className?: string;
  priorityCount?: number;
}

export function ProductGrid({
  products,
  className,
  priorityCount = 4,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center space-y-3 bg-zinc-50 border border-zinc-200 rounded-md p-8">
        <h3 className="font-display font-bold text-base uppercase tracking-wider text-black">
          NO PRODUCTS FOUND
        </h3>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto font-mono">
          Try resetting your active filters or searching for another category.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4',
        className
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
