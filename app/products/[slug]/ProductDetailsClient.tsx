'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product, Review, Size } from '@/types';
import { formatPrice } from '@/lib/format';
import { getDiscountPercent, isSizeInStock, calculateMonthlyEmi, getAvailableStock } from '@/lib/pricing';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { SizeSelector } from '@/components/store/SizeSelector';
import { ReviewList } from '@/components/store/ReviewList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RefreshCw,
  Minus,
  Plus,
  MapPin,
  CreditCard,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductDetailsClientProps {
  product: Product;
  reviews: Review[];
}

export function ProductDetailsClient({
  product,
  reviews,
}: ProductDetailsClientProps) {
  const router = useRouter();
  const { addItem, buyNow } = useCartStore();
  const { isInWishlist, toggleWishlist, hasHydrated } = useWishlistStore();

  const [selectedSize, setSelectedSize] = useState<Size | null>(
    product.sizes.length === 1 ? product.sizes[0] || null : null
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colorways[0]?.name || ''
  );
  const [qty, setQty] = useState(1);

  // PIN code checker state
  const [pincode, setPincode] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{
    tested: boolean;
    valid: boolean;
    date?: string;
    cod?: boolean;
  } | null>(null);

  // Mobile sticky bar visibility
  const mainCtaRef = useRef<HTMLDivElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const isFavorited = hasHydrated ? isInWishlist(product.id) : false;
  const discountPercent = getDiscountPercent(product.price, product.mrp);
  const emiAmount = calculateMonthlyEmi(product.price);
  const isOutOfStock = product.sizes.every((s) => !isSizeInStock(product, s));
  const availableStock = selectedSize ? getAvailableStock(product, selectedSize) : 10;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setShowStickyBar(!entry.isIntersecting);
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = mainCtaRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }
    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, []);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size first');
      return;
    }
    const added = addItem(product.id, selectedSize, selectedColor, qty);
    if (added) {
      toast.success('Item added to your cart', {
        description: `${product.title} (Size: ${selectedSize})`,
      });
    }
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error('Please select a size first');
      return;
    }
    buyNow(product.id, selectedSize, selectedColor);
    router.push('/checkout');
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode.trim())) {
      toast.error('Please enter a valid 6-digit Indian PIN code');
      return;
    }

    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 3);
    const dateString = estimatedDate.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    setPincodeResult({
      tested: true,
      valid: true,
      date: dateString,
      cod: true,
    });
  };

  return (
    <div className="space-y-6 select-none">
      {/* Category Tag & Wishlist */}
      <div className="flex items-center justify-between">
        <Link
          href={`/collections/${product.category.toLowerCase()}`}
          className="font-mono text-xs font-bold uppercase tracking-widest text-red-700 hover:underline"
        >
          {product.category} // {product.gender}
        </Link>

        <button
          onClick={() => {
            const added = toggleWishlist(product.id);
            if (added) toast.success(`Saved to wishlist: ${product.title}`);
            else toast.info(`Removed from wishlist: ${product.title}`);
          }}
          className={cn(
            'p-2 rounded-sm border transition-colors flex items-center gap-1.5 text-xs font-mono',
            isFavorited
              ? 'bg-red-600 text-white border-red-600'
              : 'bg-zinc-100 border-zinc-300 text-zinc-700 hover:text-black hover:bg-zinc-200'
          )}
        >
          <Heart className={cn('w-4 h-4', isFavorited && 'fill-current')} />
          <span>{isFavorited ? 'SAVED' : 'WISHLIST'}</span>
        </button>
      </div>

      {/* Title & SKU */}
      <div className="space-y-1">
        <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-wider text-black leading-tight">
          {product.title}
        </h1>
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
          <span>SKU: <strong className="text-zinc-800">{product.sku}</strong></span>
          <span>·</span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-bold text-black">{product.rating}</span>
            <span className="text-zinc-500">({product.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Price Block */}
      <div className="p-4 rounded-md bg-zinc-50 border border-zinc-200 space-y-2">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-2xl sm:text-3xl font-black text-black">
            {formatPrice(product.price)}
          </span>

          {product.mrp > product.price && (
            <span className="font-mono text-base text-zinc-400 line-through">
              {formatPrice(product.mrp)}
            </span>
          )}

          {discountPercent > 0 && (
            <Badge variant="save" className="text-xs px-2.5 py-0.5 bg-[#8b0000] text-white">
              SAVE {discountPercent}%
            </Badge>
          )}
        </div>

        <p className="text-[11px] font-mono text-zinc-500">
          Inclusive of all applicable taxes.
        </p>

        {emiAmount && (
          <div className="flex items-center gap-2 pt-1 text-xs font-mono text-zinc-700 border-t border-zinc-200">
            <CreditCard className="w-3.5 h-3.5 text-red-700" />
            <span>
              Or 3 monthly interest-free payments of{' '}
              <strong className="text-black font-bold">{formatPrice(emiAmount)}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Colorway Selection */}
      {product.colorways.length > 0 && (
        <div className="space-y-2.5">
          <span className="font-mono text-xs uppercase tracking-wider text-zinc-600 font-bold block">
            COLOR: <strong className="text-black">{selectedColor}</strong>
          </span>
          <div className="flex flex-wrap gap-2">
            {product.colorways.map((col) => (
              <button
                key={col.name}
                onClick={() => setSelectedColor(col.name)}
                className={cn(
                  'px-3.5 py-2 rounded-sm font-mono text-xs uppercase flex items-center gap-2 border transition-all',
                  selectedColor === col.name
                    ? 'border-black bg-black text-white'
                    : 'border-zinc-300 text-zinc-700 bg-zinc-50 hover:border-black hover:text-black'
                )}
              >
                <span className="w-3 h-3 rounded-full border border-black/40" style={{ backgroundColor: col.hex }} />
                <span>{col.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size Selector */}
      <SizeSelector
        product={product}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
      />

      {/* Quantity Stepper & CTA Action Block */}
      <div className="space-y-3 pt-2" ref={mainCtaRef}>
        <div className="flex items-center gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-zinc-300 rounded-sm bg-zinc-50 h-12 px-2">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              disabled={qty <= 1}
              className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-black disabled:opacity-40"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center font-mono text-sm font-bold text-black">
              {qty}
            </span>
            <button
              onClick={() => setQty(Math.min(availableStock, qty + 1))}
              disabled={qty >= availableStock}
              className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-black disabled:opacity-40"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Primary Add to Bag Button */}
          <Button
            variant="primary"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className="flex-1 h-12 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl bg-black text-white hover:bg-zinc-800"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isOutOfStock ? 'SOLD OUT' : 'ADD TO BAG'}</span>
          </Button>
        </div>

        {/* Buy It Now Button */}
        {!isOutOfStock && (
          <Button
            variant="secondary"
            onClick={handleBuyNow}
            className="w-full h-12 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 bg-red-700 text-white hover:bg-red-800 border-none"
          >
            <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span>BUY IT NOW</span>
          </Button>
        )}
      </div>

      {/* PIN Code Delivery Check */}
      <div className="p-4 rounded-md bg-zinc-50 border border-zinc-200 space-y-3 select-none">
        <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-black">
          <MapPin className="w-4 h-4 text-red-700" />
          <span>ESTIMATE DELIVERY &amp; COD AVAILABILITY</span>
        </div>

        <form onSubmit={handlePincodeCheck} className="flex gap-2">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 6-digit PIN code"
            className="flex-1 h-10 px-3 rounded-sm bg-white border border-zinc-300 font-mono text-xs text-black placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-black"
          />
          <Button type="submit" variant="secondary" size="sm" className="font-mono text-xs uppercase bg-black text-white hover:bg-zinc-800">
            CHECK
          </Button>
        </form>

        {pincodeResult?.tested && (
          <div className="space-y-1 text-xs font-mono pt-1 text-emerald-700">
            <p className="flex items-center gap-1.5 font-bold">
              <Truck className="w-3.5 h-3.5" />
              <span>Expected Delivery by {pincodeResult.date}</span>
            </p>
            <p className="text-zinc-600 text-[11px] pl-5">
              Cash on Delivery (COD) is available for PIN {pincode}.
            </p>
          </div>
        )}
      </div>

      {/* Trust & Guarantee Grid */}
      <div className="grid grid-cols-3 gap-2 py-2 border-y border-zinc-200 text-center font-mono text-[11px] text-zinc-600">
        <div className="p-2 space-y-1">
          <RefreshCw className="w-4 h-4 text-red-700 mx-auto" />
          <span className="block font-bold text-zinc-800 uppercase">7-DAY EXCHANGE</span>
        </div>
        <div className="p-2 space-y-1 border-x border-zinc-200">
          <Truck className="w-4 h-4 text-red-700 mx-auto" />
          <span className="block font-bold text-zinc-800 uppercase">FAST DISPATCH</span>
        </div>
        <div className="p-2 space-y-1">
          <ShieldCheck className="w-4 h-4 text-red-700 mx-auto" />
          <span className="block font-bold text-zinc-800 uppercase">100% SECURE</span>
        </div>
      </div>

      {/* Accordions: Description, Fabric, Shipping, Care */}
      <Accordion type="single" collapsible defaultValue="description" className="w-full">
        <AccordionItem value="description">
          <AccordionTrigger className="text-black font-mono font-bold text-xs uppercase">DESCRIPTION // 詳細</AccordionTrigger>
          <AccordionContent>
            <p className="leading-relaxed text-zinc-700 text-xs font-mono">{product.description}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="fabric">
          <AccordionTrigger className="text-black font-mono font-bold text-xs uppercase">MATERIAL &amp; FIT</AccordionTrigger>
          <AccordionContent className="space-y-2 text-xs font-mono">
            <div>
              <strong className="text-black font-mono uppercase text-[11px] block">Fabric:</strong>
              <span className="text-zinc-700">{product.details.fabric}</span>
            </div>
            <div>
              <strong className="text-black font-mono uppercase text-[11px] block">Fit:</strong>
              <span className="text-zinc-700">{product.details.fit}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="shipping">
          <AccordionTrigger className="text-black font-mono font-bold text-xs uppercase">SHIPPING &amp; RETURNS</AccordionTrigger>
          <AccordionContent className="space-y-1.5 text-zinc-700 text-xs font-mono">
            <p>• Free express delivery across India on orders above Rs. 1,999.</p>
            <p>• Dispatched within 24 hours from our fulfillment hub.</p>
            <p>• 7-day hassle-free reverse pickup size exchange available.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="care">
          <AccordionTrigger className="text-black font-mono font-bold text-xs uppercase">CARE INSTRUCTIONS</AccordionTrigger>
          <AccordionContent className="space-y-1 text-zinc-700 text-xs font-mono">
            {product.details.care.map((c, i) => (
              <p key={i}>• {c}</p>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Customer Reviews Section */}
      <ReviewList
        reviews={reviews}
        rating={product.rating}
        reviewsCount={product.reviewsCount}
      />

      {/* Mobile Sticky Add to Bag Bar (shows when main CTA scrolls off) */}
      {showStickyBar && (
        <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-zinc-200 p-3 px-4 flex items-center justify-between gap-3 md:hidden shadow-2xl pb-safe">
          <div className="min-w-0">
            <h4 className="font-display font-bold text-xs uppercase text-black truncate max-w-[150px]">
              {product.title}
            </h4>
            <span className="font-mono text-xs font-bold text-red-700">
              {formatPrice(product.price)}
            </span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleAddToCart}
            className="font-mono text-xs uppercase font-bold px-5 h-10 bg-black text-white hover:bg-zinc-800"
          >
            {selectedSize ? `ADD (${selectedSize})` : 'ADD TO BAG'}
          </Button>
        </div>
      )}
    </div>
  );
}
