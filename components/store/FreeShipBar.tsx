'use client';

import React from 'react';
import { formatPrice } from '@/lib/format';
import { SHIPPING } from '@/lib/config';
import { Truck, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FreeShipBarProps {
  subtotal: number;
}

export function FreeShipBar({ subtotal }: FreeShipBarProps) {
  const threshold = SHIPPING.freeThreshold;
  const gap = Math.max(0, threshold - subtotal);
  const percentage = Math.min(100, Math.round((subtotal / threshold) * 100));
  const isFree = subtotal >= threshold;

  return (
    <div className="bg-surface-2/80 border border-border rounded-sm p-3.5 space-y-2 select-none">
      <div className="flex items-center justify-between text-xs font-mono">
        {isFree ? (
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>YOU UNLOCKED FREE DELIVERY!</span>
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
            <Truck className="w-4 h-4 text-accent shrink-0" />
            <span>
              ADD <strong className="text-white font-bold">{formatPrice(gap)}</strong> MORE FOR{' '}
              <strong className="text-accent font-bold">FREE DELIVERY</strong>
            </span>
          </span>
        )}
        <span className="text-[11px] font-bold text-muted">{percentage}%</span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 rounded-full bg-surface border border-border/80 overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-500 rounded-full',
            isFree ? 'bg-emerald-500' : 'bg-accent'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
