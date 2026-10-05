'use client';

import React from 'react';
import { useUIStore } from '@/store/ui';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ruler } from 'lucide-react';

export function SizeGuideDialog() {
  const { isSizeGuideOpen, closeSizeGuide, sizeGuideCategory } = useUIStore();

  const isBottoms = sizeGuideCategory === 'Jeans' || sizeGuideCategory?.toLowerCase().includes('jean');

  return (
    <Dialog open={isSizeGuideOpen} onOpenChange={(open) => !open && closeSizeGuide()}>
      <DialogContent className="max-w-xl bg-white border-zinc-200 text-black p-6">
        <DialogHeader className="pb-3 border-b border-zinc-200 text-left">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-red-700" />
            <DialogTitle className="font-display font-bold text-base sm:text-lg uppercase tracking-wider text-black">
              SIZE GUIDE // サイズガイド
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs text-zinc-500 font-mono">
            All measurements are body measurements. For an oversized streetwear fit, select your standard size.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={isBottoms ? 'bottoms' : 'tops'} className="w-full mt-2">
          <TabsList className="grid grid-cols-2 w-full bg-zinc-100 p-1 rounded-sm border border-zinc-200">
            <TabsTrigger value="tops" className="font-mono text-xs uppercase data-[state=active]:bg-white data-[state=active]:text-black font-bold">TOPS &amp; JACKETS</TabsTrigger>
            <TabsTrigger value="bottoms" className="font-mono text-xs uppercase data-[state=active]:bg-white data-[state=active]:text-black font-bold">JEANS &amp; PANTS</TabsTrigger>
          </TabsList>

          {/* Tops Chart */}
          <TabsContent value="tops" className="space-y-4 pt-2">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border border-zinc-200">
                <thead className="bg-zinc-100 text-zinc-800 uppercase">
                  <tr>
                    <th className="p-2.5 border-b border-zinc-200">SIZE</th>
                    <th className="p-2.5 border-b border-zinc-200">CHEST (IN)</th>
                    <th className="p-2.5 border-b border-zinc-200">LENGTH (IN)</th>
                    <th className="p-2.5 border-b border-zinc-200">SHOULDER (IN)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-700">
                  <tr>
                    <td className="p-2.5 font-bold text-black">S</td>
                    <td className="p-2.5">38 - 40</td>
                    <td className="p-2.5">27.5</td>
                    <td className="p-2.5">20.0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-black">M</td>
                    <td className="p-2.5">41 - 43</td>
                    <td className="p-2.5">28.5</td>
                    <td className="p-2.5">21.0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-black">L</td>
                    <td className="p-2.5">44 - 46</td>
                    <td className="p-2.5">29.5</td>
                    <td className="p-2.5">22.0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-black">XL</td>
                    <td className="p-2.5">47 - 49</td>
                    <td className="p-2.5">30.5</td>
                    <td className="p-2.5">23.0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-black">XXL</td>
                    <td className="p-2.5">50 - 52</td>
                    <td className="p-2.5">31.5</td>
                    <td className="p-2.5">24.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Bottoms Chart */}
          <TabsContent value="bottoms" className="space-y-4 pt-2">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border border-zinc-200">
                <thead className="bg-zinc-100 text-zinc-800 uppercase">
                  <tr>
                    <th className="p-2.5 border-b border-zinc-200">WAIST SIZE</th>
                    <th className="p-2.5 border-b border-zinc-200">HIP (IN)</th>
                    <th className="p-2.5 border-b border-zinc-200">LENGTH (IN)</th>
                    <th className="p-2.5 border-b border-zinc-200">THIGH (IN)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-700">
                  <tr>
                    <td className="p-2.5 font-bold text-black">28</td>
                    <td className="p-2.5">38.0</td>
                    <td className="p-2.5">40.5</td>
                    <td className="p-2.5">25.0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-black">30</td>
                    <td className="p-2.5">40.0</td>
                    <td className="p-2.5">41.0</td>
                    <td className="p-2.5">26.0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-black">32</td>
                    <td className="p-2.5">42.0</td>
                    <td className="p-2.5">41.5</td>
                    <td className="p-2.5">27.0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-black">34</td>
                    <td className="p-2.5">44.0</td>
                    <td className="p-2.5">42.0</td>
                    <td className="p-2.5">28.0</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-black">36</td>
                    <td className="p-2.5">46.0</td>
                    <td className="p-2.5">42.5</td>
                    <td className="p-2.5">29.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
