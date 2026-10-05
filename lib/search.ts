import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';

export function searchProducts(query: string, products: Product[] = PRODUCTS): Product[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const tokens = cleanQuery.split(/\s+/).filter(Boolean);

  return products.filter((product) => {
    const searchableText = [
      product.title,
      product.category,
      product.gender,
      product.sku,
      ...product.collections,
      ...product.tags,
      ...product.colorways.map((c) => c.name),
      product.description,
    ]
      .join(' ')
      .toLowerCase();

    return tokens.every((token) => searchableText.includes(token));
  });
}

const RECENT_SEARCHES_KEY = 'ellane_recent_searches_v1';

export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, 5) : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(query: string): void {
  if (typeof window === 'undefined') return;
  const clean = query.trim();
  if (!clean) return;

  try {
    const existing = getRecentSearches().filter((item) => item.toLowerCase() !== clean.toLowerCase());
    const updated = [clean, ...existing].slice(0, 5);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota or disabled errors
  }
}

export function clearRecentSearches(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch {
    // Ignore
  }
}
