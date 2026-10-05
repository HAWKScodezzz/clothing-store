'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function HeroArcShowcase() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.touches[0].clientX - rect.left) / rect.width - 0.5;
      const y = (e.touches[0].clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    }
  };

  const handleEnd = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleEnd}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
      className="relative w-full min-h-[460px] sm:min-h-[640px] lg:min-h-[800px] bg-black overflow-hidden flex items-center justify-center select-none"
    >
      {/* Background Studio Layer with 3D Parallax */}
      <motion.div
        style={{ rotateX, rotateY, scale: 1.04 }}
        className="absolute inset-0 w-full h-full transform-gpu"
      >
        <Image
          src="/hero/bottoms-arc.jpg"
          alt="ELLANE Bottoms 3D Collection Showcase"
          fill
          priority
          className="object-cover object-center brightness-100 contrast-100"
        />

        {/* Subtle Dark Bottom Gradient for Text Legibility */}
        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-52 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
      </motion.div>

      {/* Center Top Capsule */}
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20">
        <span className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.25em] text-white uppercase px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-black/80 border border-zinc-700 backdrop-blur-md shadow-lg">
          BOTTOMS // ボトムス
        </span>
      </div>

      {/* Bottom Editorial Content & Quick Link Bar */}
      <div className="absolute bottom-6 sm:bottom-12 inset-x-0 z-20 max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-red-500 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>2026 SIGNATURE DROP</span>
          </div>
          <h1 className="font-mono font-black text-xl sm:text-3xl lg:text-5xl uppercase tracking-wider text-white drop-shadow-md">
            BARREL &amp; WIDE LEG BOTTOMS
          </h1>
        </div>

        <Link
          href="/collections/jeans"
          className="w-full sm:w-auto text-center px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-2xl hover:scale-105 active:scale-95 shrink-0"
        >
          <span>EXPLORE BOTTOMS</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
