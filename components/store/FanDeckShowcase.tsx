'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, PanInfo } from 'framer-motion';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const activeCard = FAN_CARDS[activeIndex] || FAN_CARDS[2]!;

  const handleNext = () => {
    setActiveIndex((prev) => (prev < FAN_CARDS.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : FAN_CARDS.length - 1));
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -35) {
      handleNext();
    } else if (info.offset.x > 35) {
      handlePrev();
    }
  };

  return (
    <section
      aria-label="3D Featured Showcase"
      className="w-full py-8 sm:py-16 bg-white overflow-hidden flex flex-col items-center justify-center border-b border-zinc-200 select-none relative"
    >
      {/* Background Subtle Monogram Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <span className="font-mono font-black text-[22vw] text-black tracking-widest uppercase">
          ELLANE
        </span>
      </div>

      <div className="relative w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
        {/* 3D Fan Deck Stage */}
        <div className="relative w-full h-[330px] sm:h-[480px] lg:h-[540px] flex items-center justify-center perspective-[1000px] touch-pan-y">
          {FAN_CARDS.map((card, index) => {
            const offset = index - activeIndex;
            const isCenter = offset === 0;

            // Responsive 3D fan offset calculation
            const xOffset = isMobile ? offset * 38 : offset * 85;
            const rotateZ = isMobile ? offset * 3 : offset * 4;
            const rotateY = isMobile ? offset * -8 : offset * -12;
            const scale = isCenter ? 1.05 : isMobile ? Math.max(0.78, 0.95 - Math.abs(offset) * 0.08) : 1 - Math.abs(offset) * 0.08;
            const zIndex = 20 - Math.abs(offset) * 3;
            const opacity = Math.abs(offset) > 2 ? 0.15 : 1 - Math.abs(offset) * 0.18;

            return (
              <motion.div
                key={card.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                onClick={() => setActiveIndex(index)}
                animate={{
                  x: xOffset,
                  y: isCenter ? -10 : Math.abs(offset) * 8,
                  rotateZ,
                  rotateY,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 24,
                }}
                className={cn(
                  'absolute w-[165px] sm:w-[260px] lg:w-[300px] aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shadow-xl border transition-colors will-change-transform',
                  isCenter
                    ? 'border-black ring-2 ring-black/10 shadow-[0_15px_40px_rgba(0,0,0,0.28)]'
                    : 'border-zinc-300 hover:border-zinc-400'
                )}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Product Photoshoot Image */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 180px, 320px"
                  className="object-cover pointer-events-none"
                  priority={isCenter}
                />

                {/* Card Top Title & Subtitle */}
                <div className="absolute top-0 inset-x-0 p-2.5 sm:p-4 pt-3 sm:pt-4 bg-gradient-to-b from-black/90 via-black/40 to-transparent text-center space-y-0.5">
                  <span className="font-mono text-[8px] sm:text-[10px] font-bold text-white tracking-[0.18em] uppercase block truncate px-1">
                    {card.title}
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-zinc-300 font-mono tracking-wider block">
                    {card.subtitle}
                  </span>
                </div>

                {/* Card Bottom Shadow Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 bg-gradient-to-t from-black/80 to-transparent" />
              </motion.div>
            );
          })}
        </div>

        {/* Tactile Indicator Dots for Mobile */}
        <div className="flex items-center gap-1.5 mt-3 sm:mt-4 z-20">
          {FAN_CARDS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                idx === activeIndex ? 'w-6 bg-black' : 'w-1.5 bg-zinc-300 hover:bg-zinc-400'
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom Category Selector & Action Button */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 z-30 w-full max-w-xs">
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full border border-zinc-300 bg-white text-black flex items-center justify-center hover:border-black active:scale-90 transition-all sm:hidden shrink-0 shadow-sm"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 flex-1 justify-center">
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-black truncate">
              {activeCard.category}
            </span>

            <Link
              href={activeCard.link}
              className="px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full border border-black text-black font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-200 flex items-center gap-1 shadow-sm active:scale-95 shrink-0"
            >
              <span>SHOP NOW</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>

          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full border border-zinc-300 bg-white text-black flex items-center justify-center hover:border-black active:scale-90 transition-all sm:hidden shrink-0 shadow-sm"
            aria-label="Next card"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
