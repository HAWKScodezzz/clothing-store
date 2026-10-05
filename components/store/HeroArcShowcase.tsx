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

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[580px] sm:min-h-[720px] lg:min-h-[820px] bg-black overflow-hidden flex items-center justify-center select-none"
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

        {/* Subtle Dark Bottom Gradient for Text Legibility (No white haze) */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
      </motion.div>

      {/* Center Top Capsule */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
        <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.3em] text-white uppercase px-5 py-2 rounded-full bg-black/80 border border-zinc-700 backdrop-blur-md shadow-lg">
          BOTTOMS // ボトムス
        </span>
      </div>

      {/* Bottom Editorial Content & Quick Link Bar */}
      <div className="absolute bottom-8 sm:bottom-12 inset-x-0 z-20 max-w-[1440px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 text-red-500 font-mono text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>2026 SIGNATURE DROP</span>
          </div>
          <h1 className="font-mono font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-wider text-white drop-shadow-md">
            BARREL &amp; WIDE LEG BOTTOMS
          </h1>
        </div>

        <Link
          href="/collections/jeans"
          className="px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-red-700 hover:text-white transition-all duration-200 flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95 shrink-0"
        >
          <span>EXPLORE BOTTOMS</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
