import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { COLLECTIONS, getCollectionBySlug } from '@/data/collections';
import { PRODUCTS } from '@/data/products';
import { Product, Category, Gender, Size, SortOption } from '@/types';
import { FilterBar } from '@/components/store/FilterBar';
import { ProductGrid } from '@/components/store/ProductGrid';
import { CategoryPills } from '@/components/store/CategoryPills';
import { isSizeInStock } from '@/lib/pricing';
import { SITE } from '@/lib/config';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateStaticParams() {
  return COLLECTIONS.map((col) => ({
    slug: col.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return { title: 'Collection Not Found' };
  }

  return {
    title: `${collection.title} — ${SITE.name}`,
    description: collection.description,
    openGraph: {
      title: `${collection.title} — ${SITE.name}`,
      description: collection.description,
    },
  };
}

export default async function CollectionPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  // Initial products based on collection type
  let baseProducts: Product[] = [];
  if (collection.filterType === 'all') {
    baseProducts = [...PRODUCTS];
  } else if (collection.filterType === 'category' && collection.targetValue) {
    baseProducts = PRODUCTS.filter(
      (p) => p.category.toLowerCase() === collection.targetValue?.toLowerCase()
    );
  } else if (collection.filterType === 'collection' && collection.targetValue) {
    baseProducts = PRODUCTS.filter((p) =>
      p.collections.some(
        (c) => c.toLowerCase() === collection.targetValue?.toLowerCase()
      )
    );
  } else {
    baseProducts = [...PRODUCTS];
  }

  // Parse filters from searchParams
  const getArrayParam = (val: string | string[] | undefined): string[] => {
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
  };

  const selectedCategories = getArrayParam(resolvedSearchParams.category) as Category[];
  const selectedGenders = getArrayParam(resolvedSearchParams.gender) as Gender[];
  const selectedSizes = getArrayParam(resolvedSearchParams.size) as Size[];
  const inStockOnly = resolvedSearchParams.inStock === 'true';
  const maxPriceParam = resolvedSearchParams.maxPrice as string | undefined;
  const maxPrice = maxPriceParam ? parseInt(maxPriceParam, 10) : 4000;
  const sort = (resolvedSearchParams.sort as SortOption) || 'featured';

  // Apply filters
  let filteredProducts = baseProducts.filter((product) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    if (selectedGenders.length > 0 && !selectedGenders.includes(product.gender)) {
      return false;
    }
    if (
      selectedSizes.length > 0 &&
      !selectedSizes.some((s) => product.sizes.includes(s) && isSizeInStock(product, s))
    ) {
      return false;
    }
    if (inStockOnly && product.sizes.every((s) => !isSizeInStock(product, s))) {
      return false;
    }
    if (product.price > maxPrice) {
      return false;
    }
    return true;
  });

  // Apply sorting
  filteredProducts.sort((a, b) => {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'created-desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'best-selling':
        return b.reviewsCount - a.reviewsCount;
      case 'featured':
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <CategoryPills />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-12 select-none w-full">
        {/* Collection Header Banner */}
        <div className="space-y-2 pb-6 border-b border-zinc-200">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-700">
              COLLECTION // {collection.subTitle || '新品'}
            </span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-wider text-black">
            {collection.title}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl leading-relaxed font-mono">
            {collection.description}
          </p>
        </div>

        {/* Filter and Sort Control Bar */}
        <FilterBar totalCount={filteredProducts.length} />

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} priorityCount={4} />
      </div>
    </div>
  );
}
