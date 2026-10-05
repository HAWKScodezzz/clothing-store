'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FanCard {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  link: string;
  image: string;
  themeColor: string;
}

const FAN_CARDS: FanCard[] = [
  {
    id: 'c1',
    title: 'CYBERPUNK / RACING JACKET',
    subtitle: 'ジャケット : レーシング',
    category: 'JACKETS',
    link: '/products/ellane-racing-panel-jacket',
    image: '/photos/racing-jacket-1.jpg',
    themeColor: '#e11d48',
  },
  {
    id: 'c2',
    title: 'GAARA / BARREL SWEATPANTS',
    subtitle: 'バレル : スウェットパンツ',
    category: 'BOTTOMS',
    link: '/products/ellane-gaara-barrel-sweatpants',
    image: '/photos/barrel-sweatpants-1.jpg',
    themeColor: '#d4c5a9',
  },
  {
    id: 'c3',
    title: 'ZORO / TACTICAL BACKPACK',
    subtitle: 'ゾロ : バックパック',
    category: 'BACKPACK',
    link: '/products/ellane-tactical-backpack-green',
    image: '/photos/black-backpack-1.jpg',
    themeColor: '#22c55e',
  },
  {
    id: 'c4',
    title: 'CHERRY BLOSSOM / HAKAMA PANTS',
    subtitle: '桜 : ジョガーパンツ',
    category: 'BOTTOMS',
    link: '/products/ellane-cherry-blossom-sweatpants',
    image: '/photos/cherry-blossom-pants-1.jpg',
    themeColor: '#f43f5e',
  },
  {
    id: 'c5',
    title: 'BERSERK / DENIM SLING BAG',
    subtitle: 'ベルセルク : デニムバッグ',
    category: 'SLING BAG',
    link: '/products/ellane-berserk-denim-backpack',
    image: '/photos/berserk-denim-bag-1.jpg',
    themeColor: '#dc2626',
  },
];

export function FanDeckShowcase() {
  const [activeIndex, setActiveIndex] = useState(2); // Center card (ZORO BACKPACK)

  const activeCard = FAN_CARDS[activeIndex] || FAN_CARDS[2]!;

  return (
    <section
      aria-label="3D Featured Showcase"
      className="w-full py-14 sm:py-20 bg-white overflow-hidden flex flex-col items-center justify-center border-b border-zinc-200 select-none relative"
    >
      {/* Background Subtle Monogram Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <span className="font-display font-black text-[18vw] text-black tracking-widest uppercase">
          ELLANE
        </span>
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
        {/* 3D Fan Deck Container */}
        <div className="relative w-full h-[460px] sm:h-[560px] flex items-center justify-center perspective-[1200px]">
          {FAN_CARDS.map((card, index) => {
            const offset = index - activeIndex;
            const isCenter = offset === 0;

            // Compute 3D translations and rotations for fan effect
            const xOffset = offset * (typeof window !== 'undefined' && window.innerWidth < 640 ? 45 : 95);
            const rotateZ = offset * 4;
            const rotateY = offset * -12;
            const scale = isCenter ? 1.08 : 1 - Math.abs(offset) * 0.08;
            const zIndex = 20 - Math.abs(offset) * 3;
            const opacity = Math.abs(offset) > 2 ? 0.3 : 1 - Math.abs(offset) * 0.15;

            return (
              <motion.div
                key={card.id}
                onClick={() => setActiveIndex(index)}
                animate={{
                  x: xOffset,
                  y: isCenter ? -15 : Math.abs(offset) * 12,
                  rotateZ,
                  rotateY,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 180,
                  damping: 22,
                }}
                className={cn(
                  'absolute w-[220px] sm:w-[280px] lg:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer shadow-2xl border transition-colors',
                  isCenter
                    ? 'border-black ring-2 ring-black/10 shadow-[0_25px_60px_rgba(0,0,0,0.35)]'
                    : 'border-zinc-300 hover:border-zinc-500'
                )}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Product Photoshoot Image */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 240px, 340px"
                  className="object-cover"
                />

                {/* Card Top Title & Kanji Header */}
                <div className="absolute top-0 inset-x-0 p-4 pt-5 bg-gradient-to-b from-black/90 via-black/40 to-transparent text-center space-y-0.5">
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold text-white tracking-[0.25em] uppercase block">
                    {card.title}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono tracking-wider block">
                    {card.subtitle}
                  </span>
                </div>

                {/* Card Bottom Gradient Shadow */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90 to-transparent" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Category Selector & Shop Now Action (Matching Screenshot 1) */}
        <div className="flex items-center gap-4 mt-8 z-30">
          <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-black">
            {activeCard.category}
          </span>

          <Link
            href={activeCard.link}
            className="px-6 py-2 rounded-full border border-black text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <span>SHOP NOW</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
