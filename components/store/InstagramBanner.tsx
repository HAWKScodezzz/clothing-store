import React from 'react';
import Image from 'next/image';
import { SITE } from '@/lib/config';

export function InstagramBanner() {
  return (
    <section aria-label="Instagram Community Showcase" className="relative w-full h-[460px] sm:h-[620px] bg-bg overflow-hidden select-none border-t border-border">
      {/* Background Editorial Streetwear Photography from Screenshot 2 */}
      <div className="absolute inset-0">
        <Image
          src="/social/instagram-hero.jpg"
          alt="ELLANE Streetwear Editorial Showcase"
          fill
          priority={false}
          className="object-cover object-center brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
      </div>

      {/* Center Floating Instagram Badge from Screenshot 2 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 z-10">
        <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-white drop-shadow-md">
          {SITE.followers} FOLLOWERS
        </span>

        <a
          href={SITE.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="px-8 py-2.5 rounded-full border border-white/80 bg-black/40 backdrop-blur-sm text-white font-mono text-xs font-bold uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-200 shadow-xl hover:scale-105 active:scale-95"
        >
          INSTAGRAM
        </a>
      </div>
    </section>
  );
}
