'use client';

import React from 'react';
import Link from 'next/link';
import { useUIStore } from '@/store/ui';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { COLLECTIONS } from '@/data/collections';
import { SITE, PROMO } from '@/lib/config';
import { Search, Heart, Truck, Phone, MessageSquare, Instagram, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu, openSearch } = useUIStore();

  const handleSearchClick = () => {
    closeMobileMenu();
    openSearch();
  };

  const categoryLinks = COLLECTIONS.filter((c) => c.filterType === 'category');
  const collectionLinks = COLLECTIONS.filter((c) => c.filterType === 'collection');

  return (
    <Sheet open={isMobileMenuOpen} onOpenChange={(open) => !open && closeMobileMenu()}>
      <SheetContent side="left" className="w-[88vw] max-w-sm p-0 flex flex-col bg-white border-r border-zinc-200 text-black z-50">
        <SheetHeader className="p-4 sm:p-5 border-b border-zinc-200 flex flex-row items-center justify-between bg-[#ebebeb]">
          <Logo size="sm" variant="dark" />
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        </SheetHeader>

        {/* Quick Search trigger inside mobile menu */}
        <div className="p-3.5 border-b border-zinc-200 bg-zinc-50">
          <button
            onClick={handleSearchClick}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-full bg-white border border-zinc-300 text-zinc-600 text-xs font-mono tracking-wider hover:border-black transition-colors"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-red-700" />
              <span>SEARCH PRODUCTS...</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-100 text-[10px] font-mono text-zinc-600 border border-zinc-200">FIND</span>
          </button>
        </div>

        {/* Navigation items list */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          <nav className="flex flex-col space-y-1 font-mono text-xs uppercase tracking-wider">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="py-3 text-black font-bold flex items-center justify-between border-b border-zinc-100 hover:text-red-700 transition-colors"
            >
              <span>HOME // ホーム</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </Link>

            <Link
              href="/collections/all-products"
              onClick={closeMobileMenu}
              className="py-3 text-black font-bold flex items-center justify-between border-b border-zinc-100 hover:text-red-700 transition-colors"
            >
              <span>ALL PRODUCTS // 全商品</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </Link>

            {/* Categories Accordion */}
            <Accordion type="single" collapsible className="w-full border-none">
              <AccordionItem value="categories" className="border-b border-zinc-100">
                <AccordionTrigger className="py-3 text-black font-bold font-mono text-xs hover:text-red-700">
                  CATEGORIES // カテゴリー
                </AccordionTrigger>
                <AccordionContent className="pl-3 pb-2 space-y-2 border-l-2 border-zinc-200 ml-1">
                  {categoryLinks.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/collections/${cat.slug}`}
                      onClick={closeMobileMenu}
                      className="flex items-center justify-between py-1.5 text-xs text-zinc-700 hover:text-black font-mono tracking-wider"
                    >
                      <span>{cat.title}</span>
                      <span className="text-[10px] text-zinc-400 font-mono">{cat.subTitle}</span>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="collections" className="border-b border-zinc-100">
                <AccordionTrigger className="py-3 text-black font-bold font-mono text-xs hover:text-red-700">
                  COLLECTIONS // コレクション
                </AccordionTrigger>
                <AccordionContent className="pl-3 pb-2 space-y-2 border-l-2 border-zinc-200 ml-1">
                  {collectionLinks.map((col) => (
                    <Link
                      key={col.slug}
                      href={`/collections/${col.slug}`}
                      onClick={closeMobileMenu}
                      className="flex items-center justify-between py-1.5 text-xs text-zinc-700 hover:text-black font-mono tracking-wider"
                    >
                      <span>{col.title}</span>
                      <span className="text-[10px] text-zinc-400 font-mono">{col.subTitle}</span>
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {PROMO.enabled && (
              <Link
                href="/collections/festive-sale"
                onClick={closeMobileMenu}
                className="py-3 text-red-700 font-bold flex items-center justify-between border-b border-zinc-100"
              >
                <span>FESTIVE SALE // セール</span>
                <span className="text-[10px] bg-red-700 text-white px-2 py-0.5 rounded-full font-bold">52% OFF</span>
              </Link>
            )}

            <Link
              href="/track-order"
              onClick={closeMobileMenu}
              className="py-3 text-black font-bold flex items-center justify-between border-b border-zinc-100 hover:text-red-700"
            >
              <span className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-red-700" />
                <span>ORDER TRACKING</span>
              </span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </Link>

            <Link
              href="/wishlist"
              onClick={closeMobileMenu}
              className="py-3 text-black font-bold flex items-center justify-between border-b border-zinc-100 hover:text-red-700"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-700" />
                <span>WISHLIST</span>
              </span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </Link>

            <Link
              href="/pages/contact"
              onClick={closeMobileMenu}
              className="py-3 text-black font-bold flex items-center justify-between hover:text-red-700"
            >
              <span>CONTACT // お問い合わせ</span>
              <ChevronRight className="w-4 h-4 text-zinc-400" />
            </Link>
          </nav>
        </div>

        {/* Footer Contact Strip */}
        <div className="p-4 border-t border-zinc-200 bg-zinc-50 space-y-3 pb-safe">
          <div className="flex items-center justify-around gap-2 text-xs font-mono">
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-700 font-semibold hover:underline"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-1.5 text-zinc-800 font-semibold hover:underline"
            >
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </a>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-rose-700 font-semibold hover:underline"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
