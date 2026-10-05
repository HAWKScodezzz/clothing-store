import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartLine, Size } from '@/types';
import { clampQuantity, getAvailableStock } from '@/lib/pricing';
import { getProductById } from '@/data/products';

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (productId: string, size: Size, color?: string, qty?: number) => boolean;
  removeItem: (productId: string, size: Size, color?: string) => void;
  setQty: (productId: string, size: Size, qty: number, color?: string) => void;
  clearCart: () => void;
  buyNow: (productId: string, size: Size, color?: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (productId, size, color, requestedQty = 1) => {
        const product = getProductById(productId);
        if (!product) return false;

        const available = getAvailableStock(product, size);
        if (available <= 0) return false;

        const currentLines = get().lines;
        const lineIndex = currentLines.findIndex(
          (l) => l.productId === productId && l.size === size && (l.color || '') === (color || '')
        );

        let newLines: CartLine[];
        if (lineIndex > -1) {
          const currentLine = currentLines[lineIndex];
          if (!currentLine) return false;
          const newQty = clampQuantity(currentLine.qty + requestedQty, available);
          newLines = [...currentLines];
          newLines[lineIndex] = { ...currentLine, qty: newQty };
        } else {
          const initialQty = clampQuantity(requestedQty, available);
          newLines = [...currentLines, { productId, size, color, qty: initialQty }];
        }

        set({ lines: newLines, isOpen: true });
        return true;
      },

      removeItem: (productId, size, color) => {
        set((state) => ({
          lines: state.lines.filter(
            (l) => !(l.productId === productId && l.size === size && (l.color || '') === (color || ''))
          ),
        }));
      },

      setQty: (productId, size, qty, color) => {
        if (qty <= 0) {
          get().removeItem(productId, size, color);
          return;
        }

        const product = getProductById(productId);
        const available = product ? getAvailableStock(product, size) : 99;
        const finalQty = clampQuantity(qty, available);

        set((state) => ({
          lines: state.lines.map((l) => {
            if (l.productId === productId && l.size === size && (l.color || '') === (color || '')) {
              return { ...l, qty: finalQty };
            }
            return l;
          }),
        }));
      },

      clearCart: () => set({ lines: [] }),

      buyNow: (productId, size, color) => {
        const product = getProductById(productId);
        const available = product ? getAvailableStock(product, size) : 1;
        if (available <= 0) return;

        set({
          lines: [{ productId, size, color, qty: 1 }],
          isOpen: false,
        });
      },
    }),
    {
      name: 'ellane-cart-v1',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
