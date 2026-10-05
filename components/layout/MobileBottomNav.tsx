'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { Home, LayoutGrid, Heart, Truck, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { openCart, lines, hasHydrated: cartHydrated } = useCartStore();
  const { itemIds, hasHydrated: wishlistHydrated } = useWishlistStore();

  const totalCartCount = cartHydrated ? lines.reduce((acc, line) => acc + line.qty, 0) : 0;
  const totalWishlistCount = wishlistHydrated ? itemIds.length : 0;

  // Don't show bottom dock on checkout page or product details page (where sticky Add to Bag takes priority)
  if (pathname === '/checkout' || pathname.startsWith('/products/')) return null;

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Shop',
      href: '/collections/all-products',
      icon: LayoutGrid,
      isActive: pathname.startsWith('/collections'),
    },
    {
      label: 'Wishlist',
      href: '/wishlist',
      icon: Heart,
      badge: totalWishlistCount,
      isActive: pathname === '/wishlist',
    },
    {
      label: 'Track',
      href: '/track-order',
      icon: Truck,
      isActive: pathname === '/track-order',
    },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-zinc-200 select-none pb-[calc(env(safe-area-inset-bottom)+0.25rem)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 items-center h-14 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-1 relative transition-transform active:scale-90',
                item.isActive ? 'text-black' : 'text-zinc-500 hover:text-zinc-800'
              )}
            >
              <div className="relative">
                <Icon className={cn('w-5 h-5', item.isActive ? 'stroke-[2.2]' : 'stroke-[1.6]')} />
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] rounded-full bg-red-600 text-white font-mono text-[9px] font-bold flex items-center justify-center px-0.5 leading-none">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className={cn('text-[10px] font-mono tracking-tight pt-0.5', item.isActive ? 'font-bold text-black' : 'font-medium')}>
                {item.label}
              </span>
              {item.isActive && (
                <span className="w-1 h-1 rounded-full bg-black mt-0.5" />
              )}
            </Link>
          );
        })}

        {/* 5th Button: Shopping Bag with Drawer Trigger */}
        <button
          onClick={openCart}
          className={cn(
            'flex flex-col items-center justify-center py-1 relative transition-transform active:scale-90 text-zinc-500 hover:text-zinc-800',
            totalCartCount > 0 && 'text-black'
          )}
          aria-label={`Cart (${totalCartCount} items)`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 stroke-[1.6]" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] rounded-full bg-red-600 text-white font-mono text-[9px] font-bold flex items-center justify-center px-0.5 leading-none animate-scale-in">
                {totalCartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono font-medium tracking-tight pt-0.5">
            Bag
          </span>
        </button>
      </div>
    </div>
  );
}
