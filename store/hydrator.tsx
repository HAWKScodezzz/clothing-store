'use client';

import { useEffect } from 'react';
import { useCartStore } from './cart';
import { useWishlistStore } from './wishlist';

export function StoreHydrator() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useCartStore.getState().setHasHydrated(true);

    useWishlistStore.persist.rehydrate();
    useWishlistStore.getState().setHasHydrated(true);
  }, []);

  return null;
}
