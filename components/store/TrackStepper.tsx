import React from 'react';
import { OrderFixture } from '@/types';
import { SITE } from '@/lib/config';
import { Check, Clock, ExternalLink, MessageSquare, Package, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackStepperProps {
  order: OrderFixture;
}

const STEPS = [
  'Order Placed',
  'Confirmed',
  'Packed',
  'In Transit',
  'Out for Delivery',
  'Delivered',
];

export function TrackStepper({ order }: TrackStepperProps) {
  const currentStep = order.status;

  return (
    <div className="space-y-8 select-none">
      {/* Visual Stepper (Desktop Horizontal / Mobile Vertical) */}
      <div className="p-6 sm:p-8 rounded-sm bg-surface border border-border space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-border flex-wrap gap-4">
          <div>
            <span className="font-mono text-[11px] font-bold text-accent uppercase tracking-widest block">
              CURRENT SHIPMENT STATUS
            </span>
            <h3 className="font-display font-black text-xl sm:text-2xl text-white uppercase tracking-wider">
              {STEPS[currentStep] || 'Processing'}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={order.courier.url}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-sm bg-surface-2 border border-border text-xs font-mono font-bold uppercase text-white hover:border-accent transition-colors flex items-center gap-2"
            >
              <span>{order.courier.name}</span>
              <ExternalLink className="w-3.5 h-3.5 text-accent" />
            </a>
          </div>
        </div>

        {/* Stepper Bar */}
        <div className="relative">
          {/* Desktop Horizontal Stepper */}
          <div className="hidden md:grid grid-cols-6 gap-2 relative">
            {STEPS.map((stepLabel, idx) => {
              const isCompleted = idx < currentStep;
              const isCurrent = idx === currentStep;

              return (
                <div key={stepLabel} className="flex flex-col items-center text-center space-y-2 relative">
                  {/* Connecting Line */}
                  {idx < STEPS.length - 1 && (
                    <div
                      className={cn(
                        'absolute top-4 left-1/2 w-full h-0.5 -z-0',
                        idx < currentStep ? 'bg-accent' : 'bg-border'
                      )}
                    />
                  )}

                  {/* Node Circle */}
                  <div
                    className={cn(
                      'relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all',
                      isCompleted
                        ? 'bg-accent text-white'
                        : isCurrent
                        ? 'bg-accent text-white ring-4 ring-accent/30 animate-pulse'
                        : 'bg-surface-2 border border-border text-muted'
                    )}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>

                  <span
                    className={cn(
                      'font-mono text-[11px] uppercase tracking-wider',
                      isCurrent
                        ? 'text-white font-bold'
                        : isCompleted
                        ? 'text-zinc-300 font-semibold'
                        : 'text-muted'
                    )}
                  >
                    {stepLabel}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Mobile Vertical Stepper */}
          <div className="md:hidden space-y-4 relative pl-4 border-l-2 border-border/80 ml-3">
            {STEPS.map((stepLabel, idx) => {
              const isCompleted = idx < currentStep;
              const isCurrent = idx === currentStep;

              return (
                <div key={stepLabel} className="relative flex items-center gap-3">
                  <div
                    className={cn(
                      'absolute -left-[23px] w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold',
                      isCompleted
                        ? 'bg-accent text-white'
                        : isCurrent
                        ? 'bg-accent text-white ring-4 ring-accent/30 animate-pulse'
                        : 'bg-surface border border-border text-muted'
                    )}
                  >
                    {isCompleted ? <Check className="w-3 h-3" /> : idx + 1}
                  </div>

                  <span
                    className={cn(
                      'font-mono text-xs uppercase tracking-wider',
                      isCurrent
                        ? 'text-white font-bold'
                        : isCompleted
                        ? 'text-zinc-300 font-semibold'
                        : 'text-muted'
                    )}
                  >
                    {stepLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tracking Events Timeline */}
      <div className="p-6 sm:p-8 rounded-sm bg-surface border border-border space-y-4">
        <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent" />
          <span>ACTIVITY TIMELINE</span>
        </h4>

        <div className="divide-y divide-border/60">
          {order.events.map((event, i) => (
            <div key={i} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono">
              <span className="text-zinc-200">{event.label}</span>
              <span className="text-muted text-[11px]">{event.at}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp Concierge Support */}
      <div className="p-5 rounded-sm bg-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h5 className="font-mono text-xs font-bold uppercase text-emerald-400">
            NEED ASSISTANCE WITH ORDER #{order.id}?
          </h5>
          <p className="text-xs text-muted">
            Our support desk is active daily to provide instant courier updates.
          </p>
        </div>

        <a
          href={`https://wa.me/${SITE.whatsapp}?text=Hi%20ELLANE,%20I%20need%20an%20update%20on%20my%20order%20%23${order.id}`}
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 rounded-sm bg-emerald-600 text-white font-mono text-xs font-bold uppercase hover:bg-emerald-500 transition-colors flex items-center gap-2 shrink-0"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WHATSAPP SUPPORT</span>
        </a>
      </div>
    </div>
  );
}
