'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
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

  const handleNext = () => {
    setActiveIndex((prev) => (prev < FAN_CARDS.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : FAN_CARDS.length - 1));
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -40) {
      handleNext();
    } else if (info.offset.x > 40) {
      handlePrev();
    }
  };

  return (
    <section
      aria-label="3D Featured Showcase"
      className="w-full py-10 sm:py-20 bg-white overflow-hidden flex flex-col items-center justify-center border-b border-zinc-200 select-none relative"
    >
      {/* Background Subtle Monogram Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <span className="font-mono font-black text-[18vw] text-black tracking-widest uppercase">
          ELLANE
        </span>
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
        {/* 3D Fan Deck Container */}
        <div className="relative w-full h-[380px] sm:h-[560px] flex items-center justify-center perspective-[1200px] touch-pan-y">
          {FAN_CARDS.map((card, index) => {
            const offset = index - activeIndex;
            const isCenter = offset === 0;

            // Responsive 3D fan offset calculation
            const xOffset = offset * 50;
            const rotateZ = offset * 4;
            const rotateY = offset * -12;
            const scale = isCenter ? 1.06 : Math.max(0.8, 1 - Math.abs(offset) * 0.08);
            const zIndex = 20 - Math.abs(offset) * 3;
            const opacity = Math.abs(offset) > 2 ? 0.2 : 1 - Math.abs(offset) * 0.15;

            return (
              <motion.div
                key={card.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                onClick={() => setActiveIndex(index)}
                animate={{
                  x: xOffset,
                  y: isCenter ? -12 : Math.abs(offset) * 10,
                  rotateZ,
                  rotateY,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 190,
                  damping: 24,
                }}
                className={cn(
                  'absolute w-[180px] sm:w-[280px] lg:w-[320px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer shadow-2xl border transition-colors',
                  isCenter
                    ? 'border-black ring-2 ring-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]'
                    : 'border-zinc-300 hover:border-zinc-500'
                )}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Product Photoshoot Image */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 200px, 340px"
                  className="object-cover pointer-events-none"
                />

                {/* Card Top Title & Kanji Header */}
                <div className="absolute top-0 inset-x-0 p-3 sm:p-4 pt-4 bg-gradient-to-b from-black/90 via-black/40 to-transparent text-center space-y-0.5">
                  <span className="font-mono text-[8px] sm:text-[10px] font-bold text-white tracking-[0.2em] uppercase block line-clamp-1">
                    {card.title}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-zinc-400 font-mono tracking-wider block">
                    {card.subtitle}
                  </span>
                </div>

                {/* Card Bottom Gradient Shadow */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/90 to-transparent" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Category Selector & Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8 z-30">
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full border border-zinc-300 bg-white text-black flex items-center justify-center hover:border-black active:scale-90 transition-all sm:hidden"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-black">
            {activeCard.category}
          </span>

          <Link
            href={activeCard.link}
            className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full border border-black text-black font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-200 flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <span>SHOP NOW</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full border border-zinc-300 bg-white text-black flex items-center justify-center hover:border-black active:scale-90 transition-all sm:hidden"
            aria-label="Next card"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
