import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SITE } from '@/lib/config';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light'; // dark = black logo for white bg; light = white logo for black bg
}

export function Logo({ className, size = 'md', variant = 'dark' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12',
  }[size];

  const isLight = variant === 'light';

  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-2.5 group select-none transition-transform duration-200 hover:scale-[1.02]', className)}
      aria-label={`${SITE.name} Homepage`}
    >
      {/* Official Geometric Circular Emblem & Wordmark */}
      <div className={cn(
        'flex items-center gap-2.5 transition-colors',
        isLight ? 'text-white group-hover:text-red-500' : 'text-black group-hover:text-red-600'
      )}>
        <svg
          viewBox="0 0 300 300"
          className={cn('w-auto aspect-square fill-current transition-transform duration-300 group-hover:rotate-6', sizeClasses)}
        >
          <circle cx="150" cy="150" r="142" fill="none" stroke="currentColor" strokeWidth="14" />
          <g transform="translate(150, 120)">
            <path d="M -55 -45 L 35 -45 L 55 -25 L 55 10 L 40 25 L 40 -15 L 25 -30 L -40 -30 L -40 25 L 20 25 L 20 40 L -55 40 Z" fill="currentColor" />
            <path d="M 55 45 L -35 45 L -55 25 L -55 -10 L -40 -25 L -40 15 L -25 30 L 40 30 L 40 -25 L -20 -25 L -20 -40 L 55 -40 Z" fill="currentColor" />
            <polygon points="-25,-7 30,-7 30,7 -25,7" fill="currentColor" />
          </g>
          <text
            x="150"
            y="235"
            textAnchor="middle"
            fill="currentColor"
            fontFamily="'Space Grotesk', sans-serif"
            fontSize="34"
            fontWeight="900"
            letterSpacing="4"
          >
            ELLANE
          </text>
        </svg>

        <div className="hidden sm:flex flex-col">
          <span className={cn(
            'font-display font-black text-xl lg:text-2xl tracking-[0.22em] uppercase leading-none transition-colors',
            isLight ? 'text-white group-hover:text-red-500' : 'text-black group-hover:text-red-600'
          )}>
            {SITE.name}
          </span>
          <span className={cn(
            'font-mono text-[9px] tracking-[0.3em] font-bold uppercase pt-0.5',
            isLight ? 'text-zinc-400' : 'text-zinc-600'
          )}>
            ELEVATE YOUR OUTFITS
          </span>
        </div>
      </div>
    </Link>
  );
}
