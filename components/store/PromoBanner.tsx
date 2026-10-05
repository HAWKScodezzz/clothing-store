import React from 'react';
import Link from 'next/link';
import { PROMO } from '@/lib/config';
import { ArrowRight, Sparkles } from 'lucide-react';

export function PromoBanner() {
  if (!PROMO.enabled) return null;

  return (
    <section aria-label="Festive Promotion" className="max-w-[1440px] mx-auto px-4 sm:px-8 my-8 sm:my-12 select-none">
      <div className="relative overflow-hidden rounded-md border border-red-900 bg-black p-6 sm:p-10 shadow-lg">
        {/* Decorative Radial Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-red-900/40 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-red-950/80 border border-red-700/60 text-red-400 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIMITED TIME FESTIVE PROMOTION // 期間限定セール</span>
            </div>

            <h2 className="font-mono font-black text-2xl sm:text-4xl uppercase tracking-wider text-white">
              {PROMO.label}
            </h2>

            <p className="font-mono text-sm sm:text-base text-zinc-300 font-medium">
              {PROMO.text} · ELEVATE YOUR OUTFITS FOR THE FESTIVITIES
            </p>
          </div>

          <Link
            href="/collections/festive-sale"
            className="shrink-0 px-8 py-4 rounded-full bg-white text-black font-mono text-xs font-black uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all duration-200 flex items-center gap-2 shadow-xl hover:scale-105"
          >
            <span>SHOP THE SALE</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
