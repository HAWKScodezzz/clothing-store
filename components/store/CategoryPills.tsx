'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function CategoryPills() {
  const pathname = usePathname();

  const pills = [
    { slug: 'all-products', label: 'ALL PRODUCTS', sub: '全商品' },
    { slug: 'jeans', label: 'BOTTOMS', sub: 'ボトムス' },
    { slug: 'accessories', label: 'BAGS', sub: 'バックパック' },
    { slug: 'hoodies', label: 'HOODIES', sub: 'フーディー' },
    { slug: 'jackets', label: 'JACKETS', sub: 'ジャケット' },
    { slug: 'shirts', label: 'SHIRTS', sub: 'シャツ' },
    { slug: 'mens-wear', label: "MEN'S", sub: 'メンズ' },
    { slug: 'womens-wear', label: "WOMEN'S", sub: 'レディース' },
    { slug: 'festive-sale', label: 'SALE', sub: 'セール' },
  ];

  return (
    <div className="w-full bg-white border-b border-zinc-200 select-none overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-2.5">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none snap-x py-1">
          {pills.map((pill) => {
            const href = `/collections/${pill.slug}`;
            const isActive = pathname === href;

            return (
              <Link
                key={pill.slug}
                href={href}
                className={cn(
                  'snap-start shrink-0 px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 border',
                  isActive
                    ? 'bg-black text-white border-black font-bold shadow-sm'
                    : 'bg-zinc-100 text-zinc-800 border-zinc-200 hover:bg-zinc-200 hover:text-black'
                )}
              >
                <span>{pill.label}</span>
                <span className={cn('text-[10px] font-mono opacity-80', isActive ? 'text-zinc-300' : 'text-zinc-500')}>
                  {pill.sub}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
