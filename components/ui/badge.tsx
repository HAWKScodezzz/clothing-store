import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center font-mono text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm transition-colors',
  {
    variants: {
      variant: {
        save: 'bg-accent text-white font-extrabold shadow-sm',
        soldOut: 'bg-surface-2 text-muted border border-border line-through',
        limited: 'bg-transparent text-amber-400 border border-amber-500/50',
        festive: 'bg-amber-500 text-black font-extrabold',
        new: 'bg-white text-black font-bold',
        outline: 'border border-border text-text bg-surface/50',
        success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
      },
    },
    defaultVariants: {
      variant: 'save',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
