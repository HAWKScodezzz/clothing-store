'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { OrderFixture } from '@/types';
import { TrackStepper } from '@/components/store/TrackStepper';
import { Button } from '@/components/ui/button';
import { Truck, Search, AlertCircle, Info, ExternalLink } from 'lucide-react';

const trackSchema = z.object({
  orderId: z.string().min(3, 'Enter order ID like #EL-1001'),
  contact: z.string().min(4, 'Enter registered phone or email'),
});

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [contact, setContact] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<OrderFixture | null>(null);

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setOrderData(null);

    const validation = trackSchema.safeParse({ orderId, contact });
    if (!validation.success) {
      setError(validation.error.errors[0]?.message || 'Invalid search parameters');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, contact }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Unable to locate order');
      } else {
        setOrderData(data.order);
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillDemo = (id: string, phone: string) => {
    setOrderId(id);
    setContact(phone);
    setError(null);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8 sm:py-12 select-none bg-white text-black">
      {/* Header */}
      <div className="space-y-2 pb-6 border-b border-zinc-200">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-700">
          SHIPMENT LOGISTICS // 配送追跡
        </span>
        <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-wider text-black">
          TRACK YOUR ORDER
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-xl font-mono">
          Enter your ELLANE Order ID and registered phone number or email to view real-time courier status and delivery updates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8 items-start">
        {/* Left Column: Tracking Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-md bg-zinc-50 border border-zinc-200 space-y-4 shadow-xl">
            <h2 className="font-display font-bold text-sm uppercase tracking-wider text-black flex items-center gap-2">
              <Truck className="w-4 h-4 text-red-700" />
              <span>ORDER LOOKUP</span>
            </h2>

            <form onSubmit={handleTrackSubmit} className="space-y-4">
              <div>
                <label className="font-mono text-[11px] uppercase font-bold text-zinc-700 block pb-1">
                  Order ID (e.g. #EL-1001)
                </label>
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="#EL-1001"
                  className="w-full h-11 px-3 rounded-sm bg-white border border-zinc-300 text-xs font-mono text-black placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div>
                <label className="font-mono text-[11px] uppercase font-bold text-zinc-700 block pb-1">
                  Phone Number or Email
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="7204154843 or customer@ellane.store"
                  className="w-full h-11 px-3 rounded-sm bg-white border border-zinc-300 text-xs font-mono text-black placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-300 rounded-sm text-xs font-mono text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="w-full h-12 text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center gap-2 bg-black text-white hover:bg-zinc-800"
              >
                <Search className="w-4 h-4" />
                <span>{isLoading ? 'SEARCHING LOGISTICS...' : 'TRACK SHIPMENT'}</span>
              </Button>
            </form>
          </div>

          {/* Quick Demo Fixture Buttons */}
          <div className="p-5 rounded-md bg-zinc-50 border border-zinc-200 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-1.5 text-zinc-800 font-bold uppercase">
              <Info className="w-4 h-4 text-red-700" />
              <span>TEST WITH DEMO ORDERS</span>
            </div>
            <p className="text-zinc-500 text-[11px]">
              Click any fixture to auto-fill sample order coordinates:
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleFillDemo('EL-1001', '7204154843')}
                className="p-2 rounded-sm bg-white border border-zinc-300 text-left hover:border-black hover:text-black transition-colors flex justify-between items-center text-zinc-800"
              >
                <span>#EL-1001 (Packed / Hub Dispatch)</span>
                <span className="text-[10px] text-red-700">Auto-fill &rarr;</span>
              </button>
              <button
                onClick={() => handleFillDemo('EL-1002', '9876543210')}
                className="p-2 rounded-sm bg-white border border-zinc-300 text-left hover:border-black hover:text-black transition-colors flex justify-between items-center text-zinc-800"
              >
                <span>#EL-1002 (In Transit / Blue Dart)</span>
                <span className="text-[10px] text-red-700">Auto-fill &rarr;</span>
              </button>
              <button
                onClick={() => handleFillDemo('EL-1003', 'customer@ellane.store')}
                className="p-2 rounded-sm bg-white border border-zinc-300 text-left hover:border-black hover:text-black transition-colors flex justify-between items-center text-zinc-800"
              >
                <span>#EL-1003 (Delivered / XpressBees)</span>
                <span className="text-[10px] text-red-700">Auto-fill &rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Tracking Visual Stepper & Event Log */}
        <div className="lg:col-span-7">
          {orderData ? (
            <TrackStepper order={orderData} />
          ) : (
            <div className="p-12 text-center rounded-md bg-zinc-50 border border-zinc-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto text-zinc-500">
                <Truck className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base uppercase tracking-wider text-black">
                  AWAITING ORDER DETAILS
                </h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto font-mono">
                  Submit your tracking details on the left to view stage-by-stage logistics progress and courier handover logs.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
