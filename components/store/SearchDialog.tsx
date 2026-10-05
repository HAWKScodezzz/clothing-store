'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/store/ui';
import { PRODUCTS } from '@/data/products';
import { searchProducts, getRecentSearches, saveRecentSearch, clearRecentSearches } from '@/lib/search';
import { formatPrice } from '@/lib/format';
import { ProductImage } from './ProductImage';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { History, Tag, ArrowRight, Trash2 } from 'lucide-react';

export function SearchDialog() {
  const router = useRouter();
  const { isSearchOpen, closeSearch, openSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    if (isSearchOpen) {
      setRecentSearches(getRecentSearches());
    }
  }, [isSearchOpen]);

  // Global ⌘K shortcut listener
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName))) {
        e.preventDefault();
        openSearch();
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [openSearch]);

  const searchResults = query ? searchProducts(query, PRODUCTS) : [];

  const handleSelectProduct = (slug: string) => {
    if (query) saveRecentSearch(query);
    closeSearch();
    setQuery('');
    router.push(`/products/${slug}`);
  };

  const handleSelectQuery = (term: string) => {
    setQuery(term);
  };

  const handleClearHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearRecentSearches();
    setRecentSearches([]);
  };

  return (
    <CommandDialog open={isSearchOpen} onOpenChange={(open) => !open && closeSearch()}>
      <CommandInput
        placeholder="Search jeans, hoodies, shirts, caps, sizes (e.g. 32, Oversized)..."
        value={query}
        onValueChange={setQuery}
      />

      <CommandList>
        {query && searchResults.length === 0 && (
          <CommandEmpty className="py-8 text-center space-y-3">
            <p className="text-xs text-muted">No products found matching &ldquo;{query}&rdquo;</p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {['Jeans', 'Hoodies', 'Jackets', 'Shirts', 'Womens'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setQuery(cat)}
                  className="px-2.5 py-1 rounded-sm bg-surface-2 border border-border text-[11px] font-mono text-zinc-300 hover:text-white"
                >
                  {cat}
                </button>
              ))}
            </div>
          </CommandEmpty>
        )}

        {/* Live Search Results */}
        {query && searchResults.length > 0 && (
          <CommandGroup heading={`MATCHING PRODUCTS (${searchResults.length})`}>
            {searchResults.map((product) => (
              <CommandItem
                key={product.id}
                onSelect={() => handleSelectProduct(product.slug)}
                className="flex items-center justify-between gap-3 p-2 cursor-pointer hover:bg-zinc-100"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-12 rounded-sm overflow-hidden bg-zinc-100 shrink-0 border border-zinc-200">
                    <ProductImage
                      src={product.images[0]?.src || `/products/${product.slug}/1.svg`}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-display font-bold text-xs uppercase text-black truncate">
                      {product.title}
                    </h5>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                      <span>{product.category}</span>
                      <span>·</span>
                      <span className="text-black font-bold">{formatPrice(product.price)}</span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-400 shrink-0" />
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Recent Search History when input is empty */}
        {!query && recentSearches.length > 0 && (
          <CommandGroup
            heading={
              <div className="flex items-center justify-between w-full">
                <span>RECENT SEARCHES</span>
                <button
                  onClick={handleClearHistory}
                  className="text-zinc-500 hover:text-red-600 p-0.5"
                  title="Clear history"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            }
          >
            {recentSearches.map((term) => (
              <CommandItem
                key={term}
                onSelect={() => handleSelectQuery(term)}
                className="flex items-center justify-between cursor-pointer hover:bg-zinc-100"
              >
                <div className="flex items-center gap-2">
                  <History className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-mono text-xs text-zinc-800">{term}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {/* Popular Categories Shortcut when input is empty */}
        {!query && (
          <CommandGroup heading="TRENDING CATEGORIES">
            {[
              { name: 'Jeans & Bottoms', query: 'Jeans' },
              { name: 'Oversized Hoodies', query: 'Hoodies' },
              { name: 'Racing Jackets', query: 'Jackets' },
              { name: 'Embroidered Shirts', query: 'Shirts' },
              { name: "Women's Collection", query: 'Womens' },
            ].map((item) => (
              <CommandItem
                key={item.query}
                onSelect={() => handleSelectQuery(item.query)}
                className="flex items-center justify-between cursor-pointer hover:bg-zinc-100"
              >
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-red-600" />
                  <span className="font-mono text-xs text-zinc-800">{item.name}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
