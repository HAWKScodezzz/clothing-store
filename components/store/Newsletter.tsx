'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const emailSchema = z.string().email('Please enter a valid email address');

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = emailSchema.safeParse(email.trim());
    if (!validation.success) {
      setError(validation.error.errors[0]?.message || 'Invalid email');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <section aria-label="Newsletter Subscription" className="bg-black border-t border-zinc-900 py-14 sm:py-20 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="max-w-md space-y-4">
          <h2 className="font-mono text-sm sm:text-base font-normal text-white uppercase tracking-wider">
            Subscribe to our emails
          </h2>

          {isSuccess ? (
            <div className="p-3 bg-zinc-900 border border-zinc-800 text-white font-mono text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
              <span>You are subscribed to ELLANE drops.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative flex items-center border border-zinc-800 bg-zinc-950/60 hover:border-zinc-600 transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder="Email"
                  className="w-full h-12 px-4 bg-transparent text-xs font-mono text-white placeholder:text-zinc-500 focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {error && <p className="text-red-400 font-mono text-[11px]">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
