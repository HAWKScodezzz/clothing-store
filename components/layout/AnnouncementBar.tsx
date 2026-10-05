'use client';

import React from 'react';
import Link from 'next/link';
import { ANNOUNCEMENT_MESSAGES, PROMO } from '@/lib/config';
import { Truck } from 'lucide-react';

export function AnnouncementBar() {
  const messages = [...ANNOUNCEMENT_MESSAGES];
  if (PROMO.enabled) {
    messages.unshift(`${PROMO.label} — ${PROMO.text}`);
  }

  return (
    <aside
      aria-label="Promotions and announcements"
      className="bg-black border-b border-zinc-800 text-white py-1.5 px-4 text-xs font-mono overflow-hidden select-none relative z-40"
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Continuous ticker with pause on hover */}
        <div className="flex-1 overflow-hidden group">
          <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused] gap-12 text-[11px] tracking-wider uppercase">
            {messages.concat(messages).map((msg, index) => (
              <span key={index} className="inline-flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block animate-pulse" />
                <span className="text-zinc-200 font-medium">{msg}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Right shortcut link (hidden on small mobile) */}
        <div className="hidden sm:flex items-center gap-4 pl-4 border-l border-zinc-800 shrink-0 text-[11px] tracking-wider uppercase text-zinc-400 hover:text-white transition-colors">
          <Link href="/track-order" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
            <Truck className="w-3.5 h-3.5 text-red-500" />
            <span>Track Order</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
