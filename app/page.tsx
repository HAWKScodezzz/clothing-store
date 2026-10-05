import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { HeroArcShowcase } from '@/components/store/HeroArcShowcase';
import { FanDeckShowcase } from '@/components/store/FanDeckShowcase';
import { ProductCard } from '@/components/store/ProductCard';
import { CategoryTiles } from '@/components/store/CategoryTiles';
import { InstagramBanner } from '@/components/store/InstagramBanner';
import { Newsletter } from '@/components/store/Newsletter';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  const newArrivals = PRODUCTS.slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* 1. 3D Hero Arc Showcase (Screenshot 4: Floating Bottoms in Neon Studio Room) */}
      <HeroArcShowcase />

      {/* 2. NEW ARRIVAL / 新品上市 Grid (Screenshot 3: Authentic Streetwear Photoshoots) */}
      <section aria-label="New Arrivals" className="max-w-[1440px] mx-auto px-4 sm:px-8 py-12 sm:py-20 select-none w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-zinc-200 gap-2">
          <div>
            <h2 className="font-mono font-bold text-lg sm:text-2xl uppercase tracking-wider text-black">
              NEW ARRIVAL / 新品上市
            </h2>
          </div>

          <Link
            href="/collections/all-products"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-zinc-700 hover:text-black transition-colors group"
          >
            <span>VIEW ALL ({PRODUCTS.length})</span>
            <ArrowRight className="w-4 h-4 text-red-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4-Column Dense Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {newArrivals.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 4} />
          ))}
        </div>
      </section>

      {/* 3. 3D Fan-out Card Deck Showcase (Screenshot 1: 3D Hand Fan Deck with ZORO Backpack) */}
      <FanDeckShowcase />

      {/* 4. Category Tiles Grid with Photoshoot Visuals */}
      <CategoryTiles />

      {/* 5. Instagram Editorial Banner (Screenshot 2: 171K / 431 FOLLOWERS) */}
      <InstagramBanner />

      {/* 6. Minimal Email Newsletter Subscription (Screenshot 2) */}
      <Newsletter />
    </div>
  );
}
