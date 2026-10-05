'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { useCartStore } from '@/store/cart';
import { useUIStore } from '@/store/ui';
import { COLLECTIONS } from '@/data/collections';
import {
  Menu,
  Search,
  User,
  ShoppingBag,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const { openCart, lines, hasHydrated: cartHydrated } = useCartStore();
  const { openSearch, openMobileMenu } = useUIStore();

  const totalCartCount = cartHydrated ? lines.reduce((acc, line) => acc + line.qty, 0) : 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categoryLinks = COLLECTIONS.filter((c) => c.filterType === 'category');

  // Exact sub-header categories from Zenin screenshot
  const subCategories = [
    { label: 'BACKPACKS', href: '/collections/accessories' },
    { label: 'BOTTOMS', href: '/collections/jeans' },
    { label: 'JACKET', href: '/collections/jackets' },
    { label: 'WINTER', href: '/collections/hoodies' },
    { label: 'T-SHIRTS', href: '/collections/all-products' },
    { label: 'ACCESSORIES', href: '/collections/accessories' },
    { label: 'HOODIE', href: '/collections/hoodies' },
    { label: 'CAPS', href: '/collections/accessories' },
    { label: 'DESKMAT', href: '/collections/accessories' },
    { label: 'JERSEY', href: '/collections/all-products' },
    { label: 'COMPRESSION', href: '/collections/all-products' },
    { label: 'VEST', href: '/collections/jackets' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full select-none shadow-sm">
      {/* 1. Main Navigation Bar (Screenshot Exact Match: Light grey bg, logo on left, links next to logo, icons on right) */}
      <div className="w-full bg-[#ebebeb] border-b border-zinc-300">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-6">
          {/* Left: Hamburger (mobile), Logo + Main Nav Links */}
          <div className="flex items-center gap-6 sm:gap-10">
            <button
              onClick={openMobileMenu}
              className="lg:hidden p-1 -ml-1 text-zinc-900 hover:text-black focus:outline-none"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Logo */}
            <Logo variant="dark" />

            {/* Desktop Navigation Links directly beside Logo */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-6 xl:gap-8 font-mono text-xs xl:text-[13px] text-zinc-800"
            >
              <Link
                href="/"
                className={cn(
                  'hover:text-black transition-colors py-0.5',
                  pathname === '/'
                    ? 'text-black font-bold underline underline-offset-4 decoration-1 decoration-black'
                    : 'text-zinc-800'
                )}
              >
                Home
              </Link>

              <Link
                href="/collections/all-products"
                className={cn(
                  'hover:text-black transition-colors py-0.5',
                  pathname === '/collections/all-products'
                    ? 'text-black font-bold underline underline-offset-4 decoration-1 decoration-black'
                    : 'text-zinc-800'
                )}
              >
                All Products
              </Link>

              {/* Categories Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={cn(
                    'flex items-center gap-1 hover:text-black transition-colors py-0.5 focus:outline-none cursor-pointer group',
                    pathname.startsWith('/collections/') &&
                      pathname !== '/collections/all-products' &&
                      'text-black font-bold underline underline-offset-4 decoration-1 decoration-black'
                  )}
                >
                  <span>Categories</span>
                  <ChevronDown className="w-3.5 h-3.5 group-data-[state=open]:rotate-180 transition-transform duration-200 text-zinc-600" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-60 p-1.5 bg-white border border-zinc-200 shadow-2xl rounded-sm z-50"
                >
                  {categoryLinks.map((cat) => (
                    <DropdownMenuItem key={cat.slug} asChild>
                      <Link
                        href={`/collections/${cat.slug}`}
                        className="w-full flex items-center justify-between px-3 py-2 text-xs font-mono uppercase tracking-wider text-zinc-800 hover:text-black hover:bg-zinc-100 cursor-pointer rounded-sm"
                      >
                        <span>{cat.title}</span>
                        <span className="text-[10px] text-zinc-400 font-mono">
                          {cat.subTitle}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link
                href="/track-order"
                className={cn(
                  'hover:text-black transition-colors py-0.5',
                  pathname === '/track-order'
                    ? 'text-black font-bold underline underline-offset-4 decoration-1 decoration-black'
                    : 'text-zinc-800'
                )}
              >
                Order Tracking
              </Link>

              <Link
                href="/pages/contact"
                className={cn(
                  'hover:text-black transition-colors py-0.5',
                  pathname === '/pages/contact'
                    ? 'text-black font-bold underline underline-offset-4 decoration-1 decoration-black'
                    : 'text-zinc-800'
                )}
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Right: Actions (Search, Account, Cart) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="p-1.5 text-zinc-900 hover:text-black transition-colors relative focus:outline-none"
              aria-label="Search store"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.6]" />
            </button>

            {/* User Account / Wishlist */}
            <Link
              href="/wishlist"
              className="p-1.5 text-zinc-900 hover:text-black transition-colors relative focus:outline-none"
              aria-label="Account / Wishlist"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.6]" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="p-1.5 text-zinc-900 hover:text-black transition-colors relative focus:outline-none"
              aria-label={`Cart (${totalCartCount} items)`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.6]" />
              {totalCartCount > 0 && (
                <span className="absolute top-0 right-0 min-w-[16px] h-[16px] flex items-center justify-center rounded-full bg-red-600 text-[9px] font-mono font-bold text-white px-1 leading-none animate-scale-in">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Sub-Header Category Navigation Strip (Screenshot Exact Match: Pure Monospace Uppercase Text Links) */}
      <div className="w-full bg-[#f8f8f8] border-b border-zinc-300 overflow-x-auto scrollbar-none py-2 px-4 sm:px-8">
        <div className="max-w-[1520px] mx-auto flex items-center gap-5 sm:gap-7 xl:gap-9 text-[11px] sm:text-xs font-mono font-medium tracking-wider text-zinc-800 whitespace-nowrap">
          {subCategories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.href}
              className="hover:text-black hover:underline underline-offset-4 decoration-1 transition-colors shrink-0"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
