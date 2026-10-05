'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/format';
import { getDiscountPercent } from '@/lib/pricing';
import { ProductImage } from './ProductImage';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FeatureSliderProps {
  products: Product[];
}

export function FeatureSlider({ products }: FeatureSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const jeansProducts = products.filter(
    (p) => p.category === 'Jeans' || p.slug.includes('jeans')
  );

  const displayProducts = jeansProducts.length > 0 ? jeansProducts : products.slice(0, 4);

  return (
    <section aria-label="Featured Jeans Line" className="py-8 sm:py-12 bg-white border-b border-zinc-200 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-6">
          <div className="space-y-1">
            <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-red-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-700 animate-pulse" />
              <span>FEATURED LINE // デニムコレクション</span>
            </span>
            <h2 className="font-mono font-black text-xl sm:text-3xl uppercase tracking-wider text-black">
              BAGGY &amp; WIDE LEG DENIM
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/collections/jeans"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-zinc-600 hover:text-black mr-4 transition-colors"
            >
              <span>EXPLORE ALL JEANS</span>
              <ArrowRight className="w-3.5 h-3.5 text-red-700" />
            </Link>

            <button
              onClick={scrollPrev}
              className="w-9 h-9 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-black hover:bg-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-9 h-9 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-black hover:bg-zinc-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Slider */}
        <div className="overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0" ref={emblaRef}>
          <div className="flex gap-4">
            {displayProducts.map((product) => {
              const discount = getDiscountPercent(product.price, product.mrp);

              return (
                <div
                  key={product.id}
                  className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_32%] lg:flex-[0_0_24%] min-w-0"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group block relative aspect-[4/5] rounded-md overflow-hidden bg-zinc-100 border border-zinc-200 hover:border-zinc-400 transition-all duration-300"
                  >
                    <ProductImage
                      src={product.images[0]?.src || `/products/${product.slug}/1.svg`}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                    {/* Badge */}
                    <div className="absolute bottom-3 left-3 z-10">
                      {discount > 0 && <Badge variant="save">SAVE {discount}%</Badge>}
                    </div>

                    {/* Overlay Text & Pricing */}
                    <div className="absolute inset-x-0 bottom-0 p-4 space-y-1 z-10">
                      <span className="font-mono text-[10px] text-red-400 uppercase font-bold tracking-widest block">
                        {product.category}
                      </span>
                      <h3 className="font-mono font-bold text-sm sm:text-base uppercase tracking-wider text-white line-clamp-1 group-hover:text-red-400 transition-colors">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2 pt-0.5">
                        <span className="font-mono text-sm sm:text-base font-extrabold text-white">
                          {formatPrice(product.price)}
                        </span>
                        {product.mrp > product.price && (
                          <span className="font-mono text-xs text-zinc-400 line-through">
                            {formatPrice(product.mrp)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
