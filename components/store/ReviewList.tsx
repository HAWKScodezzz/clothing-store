import React from 'react';
import { Review } from '@/types';
import { Star, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReviewListProps {
  reviews: Review[];
  rating: number;
  reviewsCount: number;
}

export function ReviewList({ reviews, rating, reviewsCount }: ReviewListProps) {
  // Compute histogram breakdown
  const counts = [5, 4, 3, 2, 1].map((stars) => {
    const match = reviews.filter((r) => r.rating === stars).length;
    const pct = reviews.length > 0 ? Math.round((match / reviews.length) * 100) : 0;
    return { stars, count: match, pct };
  });

  return (
    <section aria-label="Customer Reviews" className="py-8 space-y-8 select-none bg-white text-black">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-zinc-200 gap-6">
        <div>
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-red-700">
            FEEDBACK // レビュー
          </span>
          <h3 className="font-mono font-black text-xl sm:text-2xl uppercase tracking-wider text-black">
            CUSTOMER REVIEWS ({reviewsCount})
          </h3>
        </div>

        {/* Aggregate Score Card */}
        <div className="flex items-center gap-4 bg-zinc-50 p-4 rounded-md border border-zinc-200">
          <div className="text-3xl font-mono font-black text-black">
            {rating.toFixed(1)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={cn(
                    'w-4 h-4',
                    s <= Math.round(rating) ? 'fill-amber-500' : 'text-zinc-300'
                  )}
                />
              ))}
            </div>
            <span className="font-mono text-[11px] text-zinc-500 block">
              Based on {reviewsCount} verified reviews
            </span>
          </div>
        </div>
      </div>

      {/* Rating Histogram */}
      <div className="max-w-md space-y-2 font-mono text-xs">
        {counts.map(({ stars, count, pct }) => (
          <div key={stars} className="flex items-center gap-3">
            <span className="w-12 text-zinc-600">{stars} Stars</span>
            <div className="flex-1 h-2 rounded-full bg-zinc-100 overflow-hidden border border-zinc-200">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="w-8 text-right text-zinc-500">{count}</span>
          </div>
        ))}
      </div>

      {/* Individual Review Cards */}
      <div className="space-y-4 pt-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-md bg-zinc-50 border border-zinc-200 space-y-2.5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={cn(
                        'w-3.5 h-3.5',
                        s <= rev.rating ? 'fill-amber-500' : 'text-zinc-300'
                      )}
                    />
                  ))}
                </div>
                <span className="font-mono text-xs font-bold text-black uppercase">
                  {rev.title}
                </span>
              </div>

              <span className="font-mono text-[11px] text-zinc-500">{rev.date}</span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
              {rev.body}
            </p>

            <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-zinc-500">
              <span className="text-black font-semibold">{rev.author}</span>
              {rev.verified && (
                <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Buyer</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
