import React from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/config';

export function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 text-zinc-400 font-mono select-none py-8 px-4 sm:px-8">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <span>&copy; {new Date().getFullYear()}, {SITE.name}</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
          <Link href="/policies/refund" className="hover:text-white transition-colors">
            Refund policy
          </Link>
          <Link href="/policies/privacy" className="hover:text-white transition-colors">
            Privacy policy
          </Link>
          <Link href="/policies/terms" className="hover:text-white transition-colors">
            Terms of service
          </Link>
          <Link href="/policies/shipping" className="hover:text-white transition-colors">
            Shipping policy
          </Link>
          <Link href="/policies/contact-information" className="hover:text-white transition-colors">
            Contact information
          </Link>
        </div>
      </div>
    </footer>
  );
}
