'use client';

import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Category, Gender, Size, SortOption } from '@/types';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { formatPrice } from '@/lib/format';

interface FilterBarProps {
  totalCount: number;
}

const CATEGORIES: Category[] = [
  'Jeans',
  'Hoodies',
  'Jackets',
  'Shirts',
  'Polos',
  'Womens',
  'Accessories',
  'Socks',
  'Caps',
];

const GENDERS: Gender[] = ['Men', 'Women', 'Unisex'];
const SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36', 'FREE'];

export function FilterBar({ totalCount }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Read current filters from searchParams
  const selectedCategories = searchParams.getAll('category') as Category[];
  const selectedGenders = searchParams.getAll('gender') as Gender[];
  const selectedSizes = searchParams.getAll('size') as Size[];
  const inStockOnly = searchParams.get('inStock') === 'true';
  const maxPriceParam = searchParams.get('maxPrice');
  const maxPrice = maxPriceParam ? parseInt(maxPriceParam, 10) : 4000;
  const currentSort = (searchParams.get('sort') as SortOption) || 'featured';

  const updateParam = (updater: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    updater(params);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCategoryToggle = (cat: Category) => {
    updateParam((params) => {
      const current = params.getAll('category');
      params.delete('category');
      if (current.includes(cat)) {
        current.filter((c) => c !== cat).forEach((c) => params.append('category', c));
      } else {
        [...current, cat].forEach((c) => params.append('category', c));
      }
    });
  };

  const handleGenderToggle = (gen: Gender) => {
    updateParam((params) => {
      const current = params.getAll('gender');
      params.delete('gender');
      if (current.includes(gen)) {
        current.filter((g) => g !== gen).forEach((g) => params.append('gender', g));
      } else {
        [...current, gen].forEach((g) => params.append('gender', g));
      }
    });
  };

  const handleSizeToggle = (size: Size) => {
    updateParam((params) => {
      const current = params.getAll('size');
      params.delete('size');
      if (current.includes(size)) {
        current.filter((s) => s !== size).forEach((s) => params.append('size', s));
      } else {
        [...current, size].forEach((s) => params.append('size', s));
      }
    });
  };

  const handleInStockToggle = (checked: boolean) => {
    updateParam((params) => {
      if (checked) {
        params.set('inStock', 'true');
      } else {
        params.delete('inStock');
      }
    });
  };

  const handlePriceChange = (val: number[]) => {
    const newMax = val[0] || 4000;
    updateParam((params) => {
      if (newMax < 4000) {
        params.set('maxPrice', newMax.toString());
      } else {
        params.delete('maxPrice');
      }
    });
  };

  const handleSortChange = (newSort: string) => {
    updateParam((params) => {
      params.set('sort', newSort);
    });
  };

  const handleResetFilters = () => {
    const params = new URLSearchParams();
    if (currentSort !== 'featured') {
      params.set('sort', currentSort);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const totalActiveFilters =
    selectedCategories.length +
    selectedGenders.length +
    selectedSizes.length +
    (inStockOnly ? 1 : 0) +
    (maxPrice < 4000 ? 1 : 0);

  const FilterContent = (
    <div className="space-y-6 select-none">
      {/* Active Filter Chips */}
      {totalActiveFilters > 0 && (
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
          <span className="font-mono text-xs text-zinc-500 font-bold uppercase">
            ACTIVE FILTERS ({totalActiveFilters})
          </span>
          <button
            onClick={handleResetFilters}
            className="font-mono text-[11px] text-red-700 hover:underline uppercase font-bold flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET ALL</span>
          </button>
        </div>
      )}

      {/* Availability */}
      <div className="space-y-3">
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black">
          AVAILABILITY
        </h4>
        <label className="flex items-center gap-2.5 text-xs text-zinc-800 hover:text-black cursor-pointer">
          <Checkbox
            checked={inStockOnly}
            onCheckedChange={(c) => handleInStockToggle(Boolean(c))}
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Price Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black">
            MAX PRICE
          </h4>
          <span className="font-mono text-xs font-bold text-red-700">
            {formatPrice(maxPrice)}
          </span>
        </div>
        <Slider
          value={[maxPrice]}
          min={299}
          max={4000}
          step={100}
          onValueChange={handlePriceChange}
        />
        <div className="flex justify-between text-[10px] font-mono text-zinc-500">
          <span>{formatPrice(299)}</span>
          <span>{formatPrice(4000)}</span>
        </div>
      </div>

      {/* Size Selector */}
      <div className="space-y-3">
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black">
          SIZE
        </h4>
        <div className="grid grid-cols-4 gap-1.5">
          {SIZES.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`h-8 rounded-sm font-mono text-xs uppercase font-bold transition-all border ${
                  isSelected
                    ? 'bg-black text-white border-black'
                    : 'bg-zinc-100 text-zinc-800 border-zinc-200 hover:bg-zinc-200'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gender */}
      <div className="space-y-2.5">
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black">
          GENDER
        </h4>
        <div className="space-y-2">
          {GENDERS.map((gen) => (
            <label
              key={gen}
              className="flex items-center gap-2.5 text-xs text-zinc-800 hover:text-black cursor-pointer"
            >
              <Checkbox
                checked={selectedGenders.includes(gen)}
                onCheckedChange={() => handleGenderToggle(gen)}
              />
              <span>{gen}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-2.5">
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-black">
          CATEGORIES
        </h4>
        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 text-xs text-zinc-800 hover:text-black cursor-pointer"
            >
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => handleCategoryToggle(cat)}
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="border-y border-zinc-200 bg-white py-3 my-6 select-none">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Filter Drawer Button & Count */}
        <div className="flex items-center gap-3">
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="font-mono text-xs uppercase flex items-center gap-2 border-zinc-300 text-black hover:bg-zinc-100"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-red-600" />
                <span>FILTERS</span>
                {totalActiveFilters > 0 && (
                  <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {totalActiveFilters}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-sm p-6 overflow-y-auto bg-white text-black border-r border-zinc-200">
              <SheetHeader className="pb-4 border-b border-zinc-200">
                <SheetTitle className="font-display text-base uppercase tracking-wider text-black">
                  FILTER PRODUCTS
                </SheetTitle>
              </SheetHeader>
              <div className="py-4">{FilterContent}</div>
            </SheetContent>
          </Sheet>

          <span className="font-mono text-xs text-zinc-500 uppercase">
            {totalCount} {totalCount === 1 ? 'PRODUCT' : 'PRODUCTS'}
          </span>
        </div>

        {/* Right: Sort Dropdown */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block font-mono text-xs text-zinc-500 uppercase">
            SORT BY:
          </span>
          <Select value={currentSort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px] h-9 text-xs border-zinc-300 bg-white text-black">
              <SelectValue placeholder="Sort Products" />
            </SelectTrigger>
            <SelectContent className="bg-white border-zinc-200 text-black shadow-xl">
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="best-selling">Best Selling</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="created-desc">Newest First</SelectItem>
              <SelectItem value="title-asc">Alphabetical (A–Z)</SelectItem>
              <SelectItem value="title-desc">Alphabetical (Z–A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filter Tags Row (Desktop) */}
      {totalActiveFilters > 0 && (
        <div className="hidden sm:flex flex-wrap items-center gap-2 pt-3 mt-3 border-t border-zinc-200">
          <span className="font-mono text-[10px] text-zinc-500 uppercase font-bold mr-1">
            APPLIED:
          </span>
          {selectedCategories.map((c) => (
            <button
              key={c}
              onClick={() => handleCategoryToggle(c)}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-zinc-100 border border-zinc-300 text-[11px] font-mono text-zinc-800 hover:text-black hover:bg-zinc-200"
            >
              <span>{c}</span>
              <X className="w-3 h-3 text-zinc-500 hover:text-black" />
            </button>
          ))}
          {selectedGenders.map((g) => (
            <button
              key={g}
              onClick={() => handleGenderToggle(g)}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-zinc-100 border border-zinc-300 text-[11px] font-mono text-zinc-800 hover:text-black hover:bg-zinc-200"
            >
              <span>{g}</span>
              <X className="w-3 h-3 text-zinc-500 hover:text-black" />
            </button>
          ))}
          {selectedSizes.map((s) => (
            <button
              key={s}
              onClick={() => handleSizeToggle(s)}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-zinc-100 border border-zinc-300 text-[11px] font-mono text-zinc-800 hover:text-black hover:bg-zinc-200"
            >
              <span>Size: {s}</span>
              <X className="w-3 h-3 text-zinc-500 hover:text-black" />
            </button>
          ))}
          {inStockOnly && (
            <button
              onClick={() => handleInStockToggle(false)}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-zinc-100 border border-zinc-300 text-[11px] font-mono text-zinc-800 hover:text-black hover:bg-zinc-200"
            >
              <span>In Stock Only</span>
              <X className="w-3 h-3 text-zinc-500 hover:text-black" />
            </button>
          )}
          {maxPrice < 4000 && (
            <button
              onClick={() => handlePriceChange([4000])}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-zinc-100 border border-zinc-300 text-[11px] font-mono text-zinc-800 hover:text-black hover:bg-zinc-200"
            >
              <span>Under {formatPrice(maxPrice)}</span>
              <X className="w-3 h-3 text-zinc-500 hover:text-black" />
            </button>
          )}
          <button
            onClick={handleResetFilters}
            className="text-[11px] font-mono text-red-700 hover:underline uppercase font-bold ml-2"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
