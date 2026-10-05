'use client';

import React, { useState } from 'react';
import { ProductImage as ProductImageType } from '@/types';
import { ProductImage } from './ProductImage';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface ProductGalleryProps {
  images: ProductImageType[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const activeImage = images[activeIndex] || images[0] || {
    src: '/categories/all-products.svg',
    alt: title,
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3 sm:gap-4 select-none">
      {/* Thumbnail Strip (Vertical on Desktop, Horizontal on Mobile) */}
      {images.length > 1 && (
        <div className="flex md:flex-col gap-2.5 overflow-x-auto md:overflow-y-auto scrollbar-none md:w-20 shrink-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                'relative w-16 h-20 md:w-20 md:h-24 rounded-md overflow-hidden bg-zinc-100 shrink-0 border transition-all',
                activeIndex === idx
                  ? 'border-black ring-1 ring-black'
                  : 'border-zinc-200 opacity-70 hover:opacity-100 hover:border-zinc-400'
              )}
            >
              <ProductImage
                src={img.src}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image Display */}
      <div className="relative flex-1 aspect-[4/5] rounded-md overflow-hidden bg-zinc-100 border border-zinc-200 group">
        <ProductImage
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(
            'object-cover transition-transform duration-300',
            isZoomed && 'scale-125 cursor-zoom-out'
          )}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Zoom Hint Icon */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute bottom-3 right-3 p-2 rounded-sm bg-black/70 text-white/80 hover:text-white border border-border/80 backdrop-blur-sm transition-opacity opacity-80 group-hover:opacity-100"
          aria-label="Toggle image zoom"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Navigation Arrows on Mobile / Hover */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center border border-border/60 hover:bg-black transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center border border-border/60 hover:bg-black transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Mobile Index Dots */}
        {images.length > 1 && (
          <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={cn(
                  'w-1.5 h-1.5 rounded-full transition-all',
                  activeIndex === idx ? 'bg-accent w-3' : 'bg-white/50'
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
