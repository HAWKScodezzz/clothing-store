import { create } from 'zustand';
import { Product } from '@/types';

interface UIState {
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;

  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  isSizeGuideOpen: boolean;
  sizeGuideCategory: string | null;
  openSizeGuide: (category?: string) => void;
  closeSizeGuide: () => void;

  quickAddProduct: Product | null;
  setQuickAddProduct: (product: Product | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),

  isMobileMenuOpen: false,
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),

  isSizeGuideOpen: false,
  sizeGuideCategory: null,
  openSizeGuide: (category = 'Jeans') => set({ isSizeGuideOpen: true, sizeGuideCategory: category }),
  closeSizeGuide: () => set({ isSizeGuideOpen: false }),

  quickAddProduct: null,
  setQuickAddProduct: (product) => set({ quickAddProduct: product }),
}));
