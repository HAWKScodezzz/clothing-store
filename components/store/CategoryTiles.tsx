import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface CategoryTileItem {
  title: string;
  subtitle: string;
  slug: string;
  image: string;
}

const TILES: CategoryTileItem[] = [
  { title: 'BOTTOMS & SWEATPANTS', subtitle: 'ボトムス', slug: 'jeans', image: '/photos/barrel-sweatpants-1.jpg' },
  { title: 'BAGS & BACKPACKS', subtitle: 'バックパック', slug: 'accessories', image: '/photos/black-backpack-1.jpg' },
  { title: 'JACKETS & OUTERWEAR', subtitle: 'ジャケット', slug: 'jackets', image: '/photos/racing-jacket-1.jpg' },
  { title: 'HOODIES & SWEATSHIRTS', subtitle: 'フーディー', slug: 'hoodies', image: '/photos/oversized-hoodie-1.jpg' },
  { title: 'SHIRTS & RESORT', subtitle: 'シャツ', slug: 'shirts', image: '/photos/resort-shirt-1.jpg' },
  { title: 'CROSSBODY & SLING', subtitle: 'スリングバッグ', slug: 'accessories', image: '/photos/crossbody-bag-1.jpg' },
  { title: 'VINTAGE DENIM', subtitle: 'デニム', slug: 'jeans', image: '/photos/baggy-jeans-1.jpg' },
  { title: "WOMEN'S COLLECTION", subtitle: 'レディース', slug: 'womens-wear', image: '/photos/cherry-blossom-pants-1.jpg' },
];

export function CategoryTiles() {
  return (
    <section aria-label="Shop by Category" className="max-w-[1440px] mx-auto px-3 sm:px-8 py-10 sm:py-16 select-none">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 pb-3 border-b border-zinc-200 gap-1.5">
        <div>
          <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-red-700 block pb-0.5">
            CATEGORIES // カテゴリー
          </span>
          <h2 className="font-mono font-bold text-lg sm:text-2xl uppercase tracking-wider text-black">
            SHOP BY CATEGORY
          </h2>
        </div>

        <span className="font-mono text-[11px] sm:text-xs text-zinc-500">
          CURATED ESSENTIALS
        </span>
      </div>

      {/* Grid of Category Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
        {TILES.map((tile) => (
          <Link
            key={tile.title}
            href={`/collections/${tile.slug}`}
            className="group relative aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 hover:border-zinc-400 transition-all duration-300 flex flex-col justify-end p-3 sm:p-4 shadow-sm active:scale-[0.98]"
          >
            {/* Background Photoshoot Image */}
            <Image
              src={tile.image}
              alt={tile.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5" />

            {/* Content at Bottom */}
            <div className="relative z-10 space-y-0.5 sm:space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] text-zinc-300 font-bold block">
                {tile.subtitle}
              </span>
              <h3 className="font-mono font-bold text-[11px] sm:text-sm uppercase tracking-wider text-white line-clamp-2 leading-tight">
                {tile.title}
              </h3>
              <div className="flex items-center gap-1 pt-1 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-zinc-300 group-hover:text-white">
                <span>SHOP NOW</span>
                <ArrowUpRight className="w-3 h-3 text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
