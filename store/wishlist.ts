import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WishlistState {
  itemIds: string[];
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  toggleWishlist: (productId: string) => boolean; // returns true if added, false if removed
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      itemIds: [],
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),

      toggleWishlist: (productId: string) => {
        const current = get().itemIds;
        const exists = current.includes(productId);
        if (exists) {
          set({ itemIds: current.filter((id) => id !== productId) });
          return false;
        } else {
          set({ itemIds: [...current, productId] });
          return true;
        }
      },

      isInWishlist: (productId: string) => {
        return get().itemIds.includes(productId);
      },

      removeFromWishlist: (productId: string) => {
        set((state) => ({ itemIds: state.itemIds.filter((id) => id !== productId) }));
      },

      clearWishlist: () => set({ itemIds: [] }),
    }),
    {
      name: 'ellane-wishlist-v1',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
