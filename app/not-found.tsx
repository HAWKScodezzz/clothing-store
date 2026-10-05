import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] max-w-lg mx-auto px-4 py-20 flex flex-col items-center justify-center text-center space-y-6 select-none bg-white text-black">
      <div className="space-y-2">
        <span className="font-mono text-xs font-bold uppercase tracking-widest text-red-700">
          404 ERROR // ページが見つかりません
        </span>
        <h1 className="font-mono font-black text-3xl sm:text-5xl uppercase tracking-wider text-black">
          PAGE NOT FOUND
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600">
          The page or product you were looking for doesn&apos;t exist or has moved to a new collection.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button asChild variant="primary" className="font-mono text-xs uppercase bg-black text-white hover:bg-zinc-800">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO HOME</span>
          </Link>
        </Button>
        <Button asChild variant="secondary" className="font-mono text-xs uppercase border-zinc-300 text-black hover:bg-zinc-100">
          <Link href="/collections/all-products" className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <span>EXPLORE PRODUCTS</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
