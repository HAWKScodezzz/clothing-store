import React from 'react';
import Link from 'next/link';
import { ProductImage } from './ProductImage';
import { ArrowRight, Play } from 'lucide-react';

export function VideoSection() {
  return (
    <section aria-label="Brand Visual Showcase" className="w-full bg-zinc-950 border-y border-zinc-800 my-10 sm:my-16 select-none overflow-hidden relative">
      <div className="relative w-full h-[380px] sm:h-[500px] lg:h-[560px] flex items-center justify-center">
        {/* Background Visual Poster & Motion Layer */}
        <div className="absolute inset-0">
          <ProductImage
            src="/video/poster.svg"
            alt="ELLANE Studio Campaign Showcase"
            fill
            className="object-cover brightness-50"
            priority={false}
          />
        </div>

        {/* Ambient Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80 pointer-events-none" />

        {/* Center Editorial Typography Content */}
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-zinc-700 text-zinc-300 font-mono text-[10px] sm:text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
            <Play className="w-3 h-3 text-red-600 fill-red-600" />
            <span>SEASON EDIT // スタジオコレクション</span>
          </div>

          <h2 className="font-mono font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-wider text-white leading-tight">
            ELEVATE YOUR OUTFITS
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 font-mono tracking-wide max-w-lg mx-auto">
            Engineered silhouettes, premium drape denim, and heavy-gauge fleece designed for daily street impact.
          </p>

          <div className="pt-2">
            <Link
              href="/collections/all-products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-200 shadow-xl"
            >
              <span>EXPLORE ALL DROPS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
