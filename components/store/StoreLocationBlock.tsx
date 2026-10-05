import React from 'react';
import { SITE } from '@/lib/config';
import { ProductImage } from './ProductImage';
import { MapPin, Clock, Phone, MessageSquare } from 'lucide-react';

export function StoreLocationBlock() {
  return (
    <section aria-label="Visit the physical store" className="max-w-[1440px] mx-auto px-4 sm:px-8 py-10 sm:py-14 select-none bg-white text-black">
      <div className="rounded-md border border-zinc-200 bg-zinc-50 p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Top: Shopfront Visual */}
          <div className="lg:col-span-5 relative aspect-[4/3] rounded-md overflow-hidden bg-zinc-100 border border-zinc-200">
            <ProductImage
              src="/store/shopfront.svg"
              alt="ELLANE Flagship Store Bengaluru"
              fill
              className="object-cover"
            />
            <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded-full border border-zinc-700 text-[10px] font-mono uppercase font-bold text-red-400">
              PHYSICAL STORE // 実店舗
            </div>
          </div>

          {/* Right: Store Details, Timings & Contact CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-red-700">
                EXPERIENCE IN PERSON // 体験
              </span>
              <h2 className="font-mono font-black text-2xl sm:text-4xl uppercase tracking-wider text-black">
                VISIT THE ELLANE STORE
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Step into our retail space to try on baggy fits, check garment weights in person, and style complete looks with our in-store team.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-md bg-white border border-zinc-200 space-y-1">
                <div className="flex items-center gap-2 text-black font-mono text-xs font-bold uppercase">
                  <MapPin className="w-4 h-4 text-red-700" />
                  <span>STORE LOCATION</span>
                </div>
                <p className="text-xs text-zinc-600 pl-6">{SITE.address}</p>
              </div>

              <div className="p-4 rounded-md bg-white border border-zinc-200 space-y-1">
                <div className="flex items-center gap-2 text-black font-mono text-xs font-bold uppercase">
                  <Clock className="w-4 h-4 text-red-700" />
                  <span>OPERATING HOURS</span>
                </div>
                <p className="text-xs text-zinc-600 pl-6">{SITE.hours}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=Hi%20ELLANE,%20I%20need%20directions%20to%20your%20store`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-emerald-600 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-emerald-500 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CHAT ON WHATSAPP</span>
              </a>

              <a
                href={`tel:${SITE.phone}`}
                className="px-6 py-3 rounded-full bg-white border border-zinc-300 text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-black hover:text-white hover:border-black transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>CALL STORE</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
