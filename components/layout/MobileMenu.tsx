'use client';

import React from 'react';
import Link from 'next/link';
import { useUIStore } from '@/store/ui';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { COLLECTIONS } from '@/data/collections';
import { SITE, PROMO } from '@/lib/config';
import { Search, Heart, Truck, Phone, MessageSquare, Instagram, MapPin } from 'lucide-react';
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
      <SheetContent side="left" className="w-[85vw] max-w-sm p-0 flex flex-col bg-surface border-r border-border text-text">
        <SheetHeader className="p-5 border-b border-border flex flex-row items-center justify-between">
          <Logo size="sm" />
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        </SheetHeader>

        {/* Quick Search trigger inside mobile menu */}
        <div className="p-4 border-b border-border">
          <button
            onClick={handleSearchClick}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-sm bg-surface-2 border border-border text-muted text-xs font-mono tracking-wider hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-accent" />
              <span>SEARCH PRODUCTS...</span>
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-surface text-[10px] text-zinc-400 border border-border">⌘K</kbd>
          </button>
        </div>

        {/* Navigation items list */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <nav className="flex flex-col space-y-1 font-mono text-xs uppercase tracking-wider">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="py-2.5 text-zinc-200 hover:text-accent font-bold transition-colors"
            >
              HOME
            </Link>

            <Link
              href="/collections/all-products"
              onClick={closeMobileMenu}
              className="py-2.5 text-zinc-200 hover:text-accent font-bold transition-colors"
            >
              ALL PRODUCTS
            </Link>

            {/* Categories Accordion */}
            <Accordion type="single" collapsible className="w-full border-none">
              <AccordionItem value="categories" className="border-none">
                <AccordionTrigger className="py-2.5 text-zinc-200 hover:text-accent font-bold font-mono text-xs">
                  CATEGORIES
                </AccordionTrigger>
                <AccordionContent className="pl-3 pb-2 space-y-2 border-l-2 border-border/70 ml-1">
                  {categoryLinks.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/collections/${cat.slug}`}
                      onClick={closeMobileMenu}
                      className="block py-1.5 text-xs text-muted hover:text-white font-mono tracking-wider"
                    >
                      {cat.title}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="collections" className="border-none">
                <AccordionTrigger className="py-2.5 text-zinc-200 hover:text-accent font-bold font-mono text-xs">
                  COLLECTIONS
                </AccordionTrigger>
                <AccordionContent className="pl-3 pb-2 space-y-2 border-l-2 border-border/70 ml-1">
                  {collectionLinks.map((col) => (
                    <Link
                      key={col.slug}
                      href={`/collections/${col.slug}`}
                      onClick={closeMobileMenu}
                      className="block py-1.5 text-xs text-muted hover:text-white font-mono tracking-wider"
                    >
                      {col.title}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {PROMO.enabled && (
              <Link
                href="/collections/festive-sale"
                onClick={closeMobileMenu}
                className="py-2.5 text-accent font-bold flex items-center justify-between"
              >
                <span>FESTIVE SALE</span>
                <span className="text-[10px] bg-accent text-white px-1.5 py-0.5 rounded-sm">52% OFF</span>
              </Link>
            )}

            <Link
              href="/track-order"
              onClick={closeMobileMenu}
              className="py-2.5 text-zinc-200 hover:text-accent font-bold flex items-center gap-2"
            >
              <Truck className="w-4 h-4 text-accent" />
              <span>ORDER TRACKING</span>
            </Link>

            <Link
              href="/wishlist"
              onClick={closeMobileMenu}
              className="py-2.5 text-zinc-200 hover:text-accent font-bold flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-accent" />
              <span>WISHLIST</span>
            </Link>

            <Link
              href="/pages/contact"
              onClick={closeMobileMenu}
              className="py-2.5 text-zinc-200 hover:text-accent font-bold"
            >
              CONTACT
            </Link>
          </nav>
        </div>

        {/* Footer Contact Strip */}
        <div className="p-4 border-t border-border bg-surface-2/50 space-y-3 pb-safe">
          <div className="flex items-center justify-around gap-2 text-xs font-mono">
            <a
              href={`https://wa.me/${SITE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:underline"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-1.5 text-zinc-300 hover:underline"
            >
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </a>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-rose-400 hover:underline"
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
